import React, { Component } from 'react';
import './Table.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import moment from 'moment'
import Button from '../../Components/UI/Button/Button'
import { DATE_FORMAT, APP_DOMAIN } from '../../constants/constants'
import { PlusOutlined, DeleteOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import AddStudent from '../AddStudent/AddStudent'

import { Spin, Select } from 'antd';

const { Option } = Select;

toast.configure()


class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listStudent: [],
            showCreateStudent: false,
            isDataProgresing: false,
            currentPage: 1,
            pageSize: 10,
            isDisableNextPage: false,
            isDisablePrevPage: false
        }
    }


    componentDidMount() {
        const { currentPage, pageSize } = this.state;
        this.getListStudents(currentPage, pageSize);

    }
    formatDataForDisplay(data) {
        return data.map(item => {
            return {
                ...item,
                birthday: item.birthDate * 1000
            }
        })
    }

    getListStudents = (currentPage, pageSize) => {
        this.setState({ isDataProgresing: true });
        fetch(`${APP_DOMAIN}/students?page=${currentPage}&limit=${pageSize}`)
            .then(response => response.json())
            .then(data => {
                debugger;
                if (data.length == 0) {

                    this.setState({
                        isDisableNextPage: true,
                        isDataProgresing: false
                    });
                    return;
                }
                const formatedData = this.formatDataForDisplay(data);
                this.setState({
                    listStudent: formatedData,
                    isDataProgresing: false
                })
            }).catch((error) => {
                toast.error(error);
                this.setState({ isDataProgresing: false });
            });
    }


    addSucess = () => {
        return <div className="alert alert-primary" role="alert">
            This is a primary alert—check it out!
          </div>

    }


    addNewStudent = () => {
        let errorName, errorAge, errorBirthday, errorGender, errorEmail;
        const { studentName,
            studentAge,
            studentBirthday,
            studentGender,
            studentEmail,
            listStudent
        } = this.state

        const regEmail = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
        const checkingResult = regEmail.test(studentEmail);
        let isInputValid = false;
        let hasError = false;
        if (!studentName) {
            hasError = true;
            errorName = 'Please input name!'
        }
        if (!studentAge) {
            hasError = true;
            errorAge = 'Please input age!'

        }
        if (!studentBirthday) {
            hasError = true;
            errorBirthday = 'Please input birthday!'
        }
        if (!studentGender) {
            hasError = true;
            errorGender = 'Please choose gender!'
        }
        if (!studentEmail) {
            hasError = true;
            errorEmail = 'Please input email!'
        } else if (!checkingResult) {
            hasError = true;
            errorEmail = 'Please input the correct email!'
        }

        if (hasError) {
            this.setState({
                errorName,
                errorAge,
                errorBirthday,
                errorGender,
                errorEmail
            })
            return;
        }

        const newStudentApi = {
            'name': studentName,
            'age': studentAge,
            'gender': studentGender,
            'email': studentEmail,
            'birthDate': Math.floor(studentBirthday.valueOf() / 1000)
        }

        fetch(`${APP_DOMAIN}/students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newStudentApi),
        })
            .then(response => response.json())
            .then(data => {
                const newStudent = {
                    name: studentName,
                    age: studentAge,
                    birthday: studentBirthday,
                    gender: studentGender,
                    email: studentEmail
                }
                const newListStudent = [...listStudent];
                newListStudent.push(newStudent);
                this.setState({ listStudent: newListStudent })
                toast.success('Thêm thành công!', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
                this.setInput()
            })
            .catch((error) => {
                console.error('Error:', error);
            });


    }

    setInput = () => {
        this.setState({
            studentName: '',
            studentAge: '',
            studentBirthday: '',
            studentGender: '',
            studentEmail: ''
        })
    }

    clickDelete = (idx) => {
        const { listStudent } = this.state;
        listStudent.splice(idx, 1);
        this.setState({ listStudent });
    }

    deleteAllStudent = () => {
        const listStudent = [...this.state.listStudent];
        listStudent.splice(0, listStudent.length)
        this.setState({ listStudent })
    }

    handleChange = (date) => {

        this.setState({
            studentBirthday: date,
            errorBirthday: ''
        })
    }
    showModal = () => {
        this.setState({
            showCreateStudent: true,
        });
    };


    onCloseCreateStudent = () => {
        this.setState({
            showCreateStudent: false
        })
    }

    handleChangePageSize = (value) => {
        const { currentPage, pageSize } = this.state;
        this.getListStudents(currentPage, value);
        this.setState({
            pageSize: value
        })
    }


    onClickNextPage = () => {
        const { currentPage, pageSize } = this.state;
        this.getListStudents(currentPage + 1, pageSize);
        this.setState({ currentPage: currentPage + 1 });
    }

    onClickPrevPage = () => {
        const { currentPage, pageSize } = this.state;
        if(currentPage > 1){
            this.getListStudents(currentPage - 1, pageSize);
            this.setState({ currentPage: currentPage - 1 });
        }
    }

  
    render() {

        const { showCreateStudent, isDataProgresing, currentPage, pageSize } = this.state
        return (
            <Spin spinning={isDataProgresing}>
                <div className='student-container'>
                    <div className="wr-action">
                        <Button onClick={this.showModal} ><PlusOutlined /> Thêm sinh viên</Button>
                    </div>

                    <table className='listStudent'>
                        <thead>
                            <tr>
                                <th>Họ và tên</th>
                                <th>Tuổi</th>
                                <th>Ngày sinh</th>
                                <th>Giới tính</th>
                                <th>Email</th>
                                <th></th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.listStudent.map((cur, idx) => {
                                    return (
                                        <tr key={idx}>
                                            <td className='name'>{cur.name}</td>
                                            <td>{cur.age}</td>
                                            <td>{moment(cur.birthday).format(DATE_FORMAT)}</td>
                                            <td >{cur.gender} </td>
                                            <td>{cur.email}</td>
                                            <td>
                                                <button className='btn-delete' onClick={() => this.clickDelete(idx)}><DeleteOutlined /> Xóa</button>
                                            </td>

                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                    {
                        (this.state.listStudent.length === 0) &&
                        <div className='no-data'>
                            No data found!
                            </div>
                    }
                    <div className='wp-pagination'>
                        <div className='block-current-page'>
                            <button onClick={this.onClickPrevPage}>
                                <LeftOutlined />
                            </button>
                            <span className='page-number'>{currentPage}</span>
                            <button disabled={this.state.isDisableNextPage} onClick={this.onClickNextPage}>
                                <RightOutlined   />
                            </button>
                        </div>
                        <div className="wp-chose-page-size">
                            <Select value={pageSize} onChange={(value) => this.handleChangePageSize(value)}>
                                <Option value={10}>10/page</Option>
                                <Option value={20}>20/page</Option>
                                <Option value={30}>30/page</Option>
                            </Select>
                        </div>
                    </div>
                    <AddStudent
                        showCreateStudent={showCreateStudent}
                        onCloseCreateStudent={this.onCloseCreateStudent}
                    />
                </div>
            </Spin>
        )
    }

}


export default Table