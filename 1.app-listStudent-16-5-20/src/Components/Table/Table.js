import React, { Component } from 'react';
import './Table.scss'

import 'react-toastify/dist/ReactToastify.css';

import moment from 'moment'
import BtnAdd from '../../Components/UI/Button/BtnAdd'
import BtnDelete from '../../Components/UI/Button/BtnDelete'
import { DATE_FORMAT, APP_DOMAIN } from '../../constants/constants'
import { PlusOutlined, DeleteOutlined, LeftOutlined, RightOutlined, ThunderboltFilled, EditOutlined } from '@ant-design/icons';
import AddStudent from '../AddStudent/AddStudent'
import { Empty, Spin, Select, Checkbox , Modal } from 'antd';
import EditStudent from '../EditStudent/EditStudent';
import { toast } from 'react-toastify';

toast.configure()


const CheckboxGroup = Checkbox.Group;
const { Option } = Select;




class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listStudent: [],

            studentName: '',
            studentAge: '',
            studentBirthday: '',
            studentGender: '',
            studentEmail: '',
           

            showCreateStudent: false,
            showEditStudent: false,
            isDataProgresing: false,
            currentPage: 1,
            pageSize: 10,
            isDisableNextPage: false,
            isDisablePrevPage: false,
            listIdsChecked: [],

            checkAllStudents: false,
            indeterminate: true,
            checkedList: [],

            showConfirmDelete: false
        }
    }

    componentDidMount() {
        const { pageSize, currentPage } = this.state
        this.getListStudents(currentPage, pageSize)


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
        this.setState({ isDataProgresing: true })
        fetch(`${APP_DOMAIN}/students?page=${currentPage}&limit=${pageSize}`)
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    this.setState({
                        isDisableNextPage: true,
                        isDataProgresing: false
                    });
                    return;
                }
                const formatedData = this.formatDataForDisplay(data)
                this.setState({
                    listStudent: formatedData,
                    isDataProgresing: false
                })
            })
            .catch(error => {
                toast.error(error)
                this.setState({ isDataProgresing: false })
            })
    }




    showModalAdd = () => {
        this.setState({
            showCreateStudent: true,

        });
    };
    showModalEdit = (e, cur) => {
        this.setState({
            showEditStudent: true,
            studentName: cur.name,
            studentAge: cur.age,
            studentBirthday: cur.birthDate * 1000,
            studentGender: cur.gender,
            studentEmail: cur.email,
        });
    };


    onCloseCreateStudent = () => {
        this.setState({
            showCreateStudent: false
        })
    }
    onCloseEditStudent = () => {
        this.setState({
            showEditStudent: false
        })
    }

    onCloseDeleteStudent = () => {
        this.setState({
            showDeleteStudent: false
        })
    }
    handleChangePageSize = (value) => {
        const { currentPage, pageSize } = this.state;
        this.getListStudents(currentPage, value)
        this.setState({
            pageSize: value
        })
    }
    onClickNextPage = () => {
        const { currentPage, pageSize } = this.state;
        this.getListStudents(currentPage + 1, pageSize);
        this.setState({
            currentPage: currentPage + 1
        })
    }

    onClickPrevPage = () => {
        const { currentPage, pageSize } = this.state;
        if (currentPage > 1) {
            this.getListStudents(currentPage - 1, pageSize);
            this.setState({ currentPage: currentPage - 1 });
        }
    }

    handleCheckedRow = (e, user) => {
        const newListIdsChecked = [...this.state.listIdsChecked]
        if (e.target.checked) {
            newListIdsChecked.push(user.id)
        } else {
            const idx = newListIdsChecked.findIndex(item => item == user.id)
            if (idx > -1) {
                newListIdsChecked.splice(idx, 1)
            }
        }
        this.setState({ listIdsChecked: newListIdsChecked })
    }

    
    handleRemoveStudent = () => {
        this.setState({showConfirmDelete: true})
    }

    handleOkConfirm = e => {
        const { listIdsChecked, currentPage, pageSize } = this.state;
        Promise.all(listIdsChecked.map(id =>
            fetch(`${APP_DOMAIN}/students/${id}`, {
                method: 'DELETE',
            })))
            .then((res) => {
                toast.success('Xóa thành công!', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
                fetch(`${APP_DOMAIN}/students?page=${currentPage}&limit=${pageSize}`)
                    .then(response => response.json())
                    .then(data => {
                        this.setState({
                            listStudent: data,
                            open: false,
                            listIdsChecked: [],
                            showConfirmDelete: false,
                        })
                    })
            })
            .catch(error => {
                toast.error(error, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
                this.setState({ isDataProgresing: false });
            })

    };

    handleCancelConfirm = e => {
        this.setState({
            showConfirmDelete: false,
        });
    };

    onChangeChecked = checkedList => {
        const { listStudent } = this.state
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && checkedList.length < listStudent.length,
            checkAllStudents: checkedList.length === listStudent.length,
        });
    }

    onCheckAllChange = e => {
        const { listStudent } = this.state
        this.setState({
            checkedList: e.target.checked ? listStudent : [],
            indeterminate: false,
            checkAllStudents: e.target.checked,
        });

    };
    render() {
        const { Option } = Select;
        const { showCreateStudent, showEditStudent, isDataProgresing, currentPage, pageSize, listIdsChecked } = this.state


        return (
            <Spin spinning={isDataProgresing}>
                <div className='student-container'>
                    <div className="wr-action">
                        <BtnAdd onClick={this.showModalAdd} ><PlusOutlined /> Thêm sinh viên</BtnAdd>
                        {
                            listIdsChecked.length >= 1 &&
                            <BtnDelete onClick={this.handleRemoveStudent}

                            > <DeleteOutlined /> Xóa
                            </BtnDelete>


                        }
                    </div>

                    <table className='listStudent'>
                        <thead>
                            <tr>
                                <th>
                                    <Checkbox
                                        indeterminate={this.state.indeterminate}
                                        onChange={this.onCheckAllChange}
                                        checked={this.state.checkAllStudents}
                                    />
                                </th>
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
                                        <tr key={cur.id}>
                                            <td onChange={e => this.handleCheckedRow(e, cur)} >
                                                <Checkbox
                                                    options={this.state.listStudent}
                                                    value={this.state.checkedList}
                                                    onChange={this.onChangeChecked}
                                                />
                                            </td>
                                            <td className='name'>{cur.name}</td>
                                            <td>{cur.age}</td>
                                            <td>{moment(cur.birthday).format(DATE_FORMAT)}</td>
                                            <td >{cur.gender} </td>
                                            <td>{cur.email}</td>
                                            <td className='td-btn' >
                                                <button className='btn-edit' onClick={e => this.showModalEdit(e, cur)} ><EditOutlined /> Sửa</button>
                                            </td>

                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                    {
                        (this.state.listStudent.length === 0) &&
                        <Empty />
                    }

                    <div className="wp-pagination">
                        <div className="block-current-page">
                            <button disabled={this.state.isDisablePrevPage} onClick={this.onClickPrevPage} > <LeftOutlined /></button>
                            <span className='page-number'>{currentPage}</span>
                            <button disabled={this.state.isDisableNextPage} onClick={this.onClickNextPage}><RightOutlined /></button>
                        </div>
                        <div className="wp-chose-pageSize">
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

                    <EditStudent
                        showEditStudent={showEditStudent}
                        onCloseEditStudent={this.onCloseEditStudent}
                        studentName = {this.state.studentName}
                        studentAge ={this.state.studentAge}
                        studentBirthday ={this.state.studentBirthday}
                        studentEmail ={this.state.studentEmail}
                        studentGender ={this.state.studentGender}
                      
                    />
                    <Modal
                        title="Xác nhận xóa sinh viên!"
                        visible={this.state.showConfirmDelete}
                        onOk={this.handleOkConfirm}
                        onCancel={this.handleCancelConfirm}
                        okText ='Xóa'
                        cancelText ='Hủy'
                    >
                       <p>Xóa sinh viên đã chọn!</p>
                    </Modal>

                </div>
            </Spin>

        )
    }

}


export default Table