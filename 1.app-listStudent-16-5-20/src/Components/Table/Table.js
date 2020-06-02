import React, { Component } from 'react';
import './Table.scss'

import 'react-toastify/dist/ReactToastify.css';

import moment from 'moment'
import BtnAdd from '../../Components/UI/Button/BtnAdd'
import BtnDelete from '../../Components/UI/Button/BtnDelete'
import { DATE_FORMAT, APP_DOMAIN } from '../../constants/constants'
import { PlusOutlined, DeleteOutlined, LeftOutlined, RightOutlined, ThunderboltFilled, EditOutlined } from '@ant-design/icons';
import AddStudent from '../AddStudent/AddStudent'
import { Empty, Spin, Select } from 'antd';
import EditStudent from '../EditStudent/EditStudent';
import { toast } from 'react-toastify';

toast.configure()



const { Option } = Select;
class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listStudent: [],
            showCreateStudent: false,
            showEditStudent: false,
            isDataProgresing: false,
            currentPage: 1,
            pageSize: 10,
            isDisableNextPage: false,
            isDisablePrevPage: false
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
        this.setState({ isDataProgressing: true })
        fetch(`${APP_DOMAIN}/students?page=${currentPage}&limit=${pageSize}`)
            .then(response => response.json())
            .then(data => {
                if (data.length == 0) {
                    this.setState({
                        isDisableNextPage: true,
                        isDataProgresing: false
                    });
                    return;
                }
                const formatedData = this.formatDataForDisplay(data)
                this.setState({
                    listStudent: formatedData,
                    isDataProgressing: false
                })
            })
            .catch(error => {
                toast.error(error)
                this.setState({ isDataProgressing: true })
            })
    }



    deleteAllStudent = () => {
        const listStudent = [...this.state.listStudent];
        listStudent.splice(0, listStudent.length)
        this.setState({ listStudent })
        // fetch(`${APP_DOMAIN}/students`, {
        //     method: 'DELETE',
        // })
        //     .then(response => response.json())
    }

    deleteOneStudent = (id) => {
        const { currentPage, pageSize } = this.state
        fetch(`${APP_DOMAIN}/students/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                fetch(`${APP_DOMAIN}/students?page=${currentPage}&limit=${pageSize}`)
                    .then(response => response.json())
                    .then(data => {
                        this.setState({
                            listStudent: data,
                            open: false
                        })
                        toast.success('Xóa thành công!', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
                    })
            })
    }

    showModalAdd = () => {
        this.setState({
            showCreateStudent: true,

        });
    };
    showModalEdit = () => {
        this.setState({
            showEditStudent: true,

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
        this.getListStudents(currentPage - 1, pageSize);
        this.setState({
            currentPage: currentPage - 1
        })
    }


    render() {
        const { Option } = Select;
        const { showCreateStudent, showEditStudent, isDataProgressing, currentPage, pageSize } = this.state
        return (
            <Spin spinning={isDataProgressing}>
                <div className='student-container'>
                    <div className="wr-action">
                        <BtnAdd onClick={this.showModalAdd} ><PlusOutlined /> Thêm sinh viên</BtnAdd>
                        <BtnDelete onClick={this.deleteAllStudent}> <DeleteOutlined /> Xóa tất cả</BtnDelete>
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
                                        <tr key={cur.id}>
                                            <td className='name'>{cur.name}</td>
                                            <td>{cur.age}</td>
                                            <td>{moment(cur.birthday).format(DATE_FORMAT)}</td>
                                            <td >{cur.gender} </td>
                                            <td>{cur.email}</td>
                                            <td className='td-btn'>
                                                <button className='btn-edit' onClick={this.showModalEdit} ><EditOutlined /> Sửa</button>
                                                <button className='btn-delete' onClick={() => (this.deleteOneStudent(cur.id))}><DeleteOutlined /> Xóa</button>
                                            </td>

                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                    {
                        (this.state.listStudent.length === 0) &&
                        // <div className='no-data'>
                        //   <Empty />
                        //         </div>
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
                    // handleEditStudent ={this.handleEditStudent}
                    />


                </div>
            </Spin>

        )
    }

}


export default Table