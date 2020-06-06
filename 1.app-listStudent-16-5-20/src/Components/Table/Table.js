import React, { Component } from 'react';
import './Table.scss'

import 'react-toastify/dist/ReactToastify.css';

import moment from 'moment'
import BtnAdd from '../../Components/UI/Button/BtnAdd'
import BtnDelete from '../../Components/UI/Button/BtnDelete'
import { DATE_FORMAT, APP_DOMAIN } from '../../constants/constants'
import { PlusOutlined, DeleteOutlined, LeftOutlined, RightOutlined, EditOutlined, ExclamationCircleOutlined, WarningOutlined } from '@ant-design/icons';
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
                birthday: item.birthDate * 1000,
                isChecked: false
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
        const {listStudent} = this.state
        const newListStudent = listStudent.map(item=>{
            if(item.id == user.id){
                if(e.target.checked){
                    item.isChecked = true
                }else{
                    item.isChecked = false
                }
            }
            return item
        })
        this.setState({
            listStudent: newListStudent
        })
    }

    
    handleRemoveStudent = () => {
        this.setState({showConfirmDelete: true})
        this.confirm()
    }

    handleOkConfirm = e => {
        const { currentPage, pageSize, listStudent } = this.state;
        let listIdsChecked = listStudent.filter(item => item.isChecked == true).map(cur => cur.id)

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

    isCheckedAll =()=>{
        const {listStudent} = this.state
        let isCheckedAll = true
        if(listStudent.length ==0){
            return false
        }
        listStudent.forEach(item => {
           if(!item.isChecked){
               isCheckedAll = false
           }
        })
        return isCheckedAll
    }

    handlecheckedAll =(e)=>{
        const {listStudent}= this.state
        if(e.target.checked){
           const newListStudent = listStudent.map(item =>{
               item.isChecked = true
               return item
           })
           this.setState({listStudent: newListStudent})
        }else{
            const newListStudent = listStudent.map(item =>{
                item.isChecked = false
                return item
            })
            this.setState({listStudent: newListStudent})
        }
    }

    showOrHideBtnDelete =()=>{
        const {listStudent} = this.state
        let showBtn = false
        if(listStudent.length >0){
            listStudent.forEach(item=>{
                if(item.isChecked){
                    showBtn= true
                }
            })
        }
        return showBtn
    }
     
    confirm =()=>{
        Modal.confirm({
            title: 'Xác nhận xóa sinh viên',
            icon: <WarningOutlined />,
            onOk: () => { this.handleOkConfirm() }, 
            onCancel: () => { this.handleCancelConfirm() }, 
            content: 'Sinh viên sẽ được xóa!',
            okText: 'Xóa',
            cancelText: 'Hủy',
            wrapClassName: 'modal-confirm-delete-student'
          });
    }
   
    
    render() {
        const { Option } = Select;
        const { showCreateStudent, showEditStudent, isDataProgresing, currentPage, pageSize, listIdsChecked } = this.state


        return (
            <Spin spinning={isDataProgresing}>
                <div className='student-container'>
                    <div className="wr-action">
                        <BtnAdd onClick={this.showModalAdd} currentPage={currentPage}  pageSize={pageSize} ><PlusOutlined /> Thêm sinh viên</BtnAdd>
                        {
                            this.showOrHideBtnDelete()  &&
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
                                        onChange={(e)=> this.handlecheckedAll(e)} 
                                        checked={this.isCheckedAll()}
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
                                            <td  >
                                                <Checkbox
                                                   onChange={e => this.handleCheckedRow(e, cur)}
                                                   checked ={cur.isChecked}
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
                       getListStudents ={this.getListStudents}
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

                </div>
            </Spin>

        )
    }

}


export default Table