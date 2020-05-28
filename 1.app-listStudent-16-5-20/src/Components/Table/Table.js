import React, { Component } from 'react';
import './Table.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import moment from 'moment'
import Button from '../../Components/UI/Button/Button'
import { DATE_FORMAT, APP_DOMAIN } from '../../constants/constants'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import AddStudent from '../AddStudent/AddStudent'

toast.configure()


class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listStudent: [],
            showCreateStudent: false
        }
    }


    componentDidMount() {
        this.getListStudents()

    }
    formatDataForDisplay(data) {
        return data.map(item => {
            return {
                ...item,
                birthday: item.birthDate * 1000
            }
        })
    }

    getListStudents = () => {
        fetch(`${APP_DOMAIN}/students`)
            .then(response => response.json())
            .then(data => {
                const formatedData = this.formatDataForDisplay(data)
                this.setState({
                    listStudent: formatedData
                })
            })
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


    onCloseCreateStudent =()=>{
        this.setState({
            showCreateStudent: false
        })
    }
    

    render() {
       
        const {showCreateStudent } = this.state
        return (
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

                

                {/* <div className='add'>
                    <button className='btn-Add' onClick={(this.addNewStudent)}>Thêm sinh viên</button>
                </div>
                <div className="deteteAll">
                    <button className='btn-deleteAll' onClick={this.deleteAllStudent}>Xóa tất cả</button>
                </div> */}

                <AddStudent 
                    showCreateStudent = {showCreateStudent}
                    onCloseCreateStudent ={this.onCloseCreateStudent}
                />

        
            </div>
        )
    }

}


export default Table