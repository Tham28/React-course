import React, { Component } from 'react';
import './Table.scss'

import 'react-toastify/dist/ReactToastify.css';

import moment from 'moment'
import BtnAdd from '../../Components/UI/Button/BtnAdd'
import BtnDelete from '../../Components/UI/Button/BtnDelete'
import { DATE_FORMAT, APP_DOMAIN, MALE, FEMALE } from '../../constants/constants'
import {
    PlusOutlined, DeleteOutlined, LeftOutlined, RightOutlined, EditOutlined, WarningOutlined,
    CaretUpOutlined, CaretDownOutlined, FilterOutlined, InfoCircleFilled, DownOutlined
} from '@ant-design/icons';
import AddStudent from '../AddStudent/AddStudent'
import { Empty, Spin, Select, Checkbox, Modal, Button, Menu, Dropdown } from 'antd';
import EditStudent from '../EditStudent/EditStudent';
import { toast } from 'react-toastify';


import i18n from '../../i18n'

import { Translation } from 'react-i18next';


toast.configure()
const { Option } = Select;
const { SubMenu } = Menu;

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originListStudent: [],
            listStudent: [],

            studentName: '',
            studentAge: '',
            studentBirthday: '',
            studentGender: '',
            studentEmail: '',
            studentIsSelected: '',

            showCreateStudent: false,
            showEditStudent: false,
            isDataProgresing: false,
            currentPage: 1,
            pageSize: 10,
            isDisableNextPage: false,
            isDisablePrevPage: false,
            listIdsChecked: [],

            showConfirmDelete: false,
            currentMenu: 'project',

            filterGender: 'All'

        }
    }

    componentDidMount() {
        const { pageSize, currentPage } = this.state
        this.getListStudents(currentPage, pageSize)
    }

    handleSortInc = () => {
        const newListStudent = [...this.state.listStudent]
        this.setState({
            listStudent: newListStudent.sort((a, b) => (a.age > b.age) ? 1 : ((b.age > a.age) ? -1 : 0))
        })
    }

    handleSortDec = () => {
        const newListStudent = [...this.state.listStudent]
        this.setState({
            listStudent: newListStudent.sort((a, b) => (a.age < b.age) ? 1 : ((b.age < a.age) ? -1 : 0))
        })
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
                        isDataProgresing: false,
                    });
                    return;
                }
                const formatedData = this.formatDataForDisplay(data)
                this.setState({
                    listStudent: formatedData,
                    originListStudent: formatedData,
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
            studentIsSelected: cur.id
        });
        console.log(this.state.studentIsSelected)
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
            currentPage: currentPage + 1,
            isDisableNextPage: false
        })
    }

    onClickPrevPage = () => {
        const { currentPage, pageSize } = this.state;
        if (currentPage > 1) {
            this.getListStudents(currentPage - 1, pageSize);
            this.setState({
                currentPage: currentPage - 1,
                isDisableNextPage: false
            });
        }
    }

    handleCheckedRow = (e, user) => {
        const { listStudent } = this.state
        const newListStudent = listStudent.map(item => {
            if (item.id == user.id) {
                if (e.target.checked) {
                    item.isChecked = true
                } else {
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
        this.setState({ showConfirmDelete: true })
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
                        this.getListStudents(currentPage, pageSize)

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

    isCheckedAll = () => {
        const { listStudent } = this.state
        let isCheckedAll = true
        if (listStudent.length == 0) {
            return false
        }
        listStudent.forEach(item => {
            if (!item.isChecked) {
                isCheckedAll = false
            }
        })
        return isCheckedAll
    }

    handlecheckedAll = (e) => {
        const { listStudent } = this.state
        if (e.target.checked) {
            const newListStudent = listStudent.map(item => {
                item.isChecked = true
                return item
            })
            this.setState({ listStudent: newListStudent })
        } else {
            const newListStudent = listStudent.map(item => {
                item.isChecked = false
                return item
            })
            this.setState({ listStudent: newListStudent })
        }
    }

    showOrHideBtnDelete = () => {
        const { listStudent } = this.state
        let showBtn = false
        if (listStudent.length > 0) {
            listStudent.forEach(item => {
                if (item.isChecked) {
                    showBtn = true
                }
            })
        }
        return showBtn
    }

    confirm = () => {
        Modal.confirm({
            title: <Translation>
                {
                    t => <span>{t("deleteStudent")}</span>
                }
            </Translation>,
            icon: <WarningOutlined />,
            onOk: () => { this.handleOkConfirm() },
            onCancel: () => { this.handleCancelConfirm() },
            content: <Translation>
                {
                    t => <span>{t("deleteContent")}</span>
                }
            </Translation>,
            okText: <Translation>
                {
                    t => <span>{t("delete")}</span>
                }
            </Translation>,
            cancelText: <Translation>
                {
                    t => <span>{t("btnCancel")}</span>
                }
            </Translation>,
            wrapClassName: 'modal-confirm-delete-student'
        });
    }

    handleFilterGender = (e) => {
        const { listStudent, originListStudent } = this.state
        let newListStudent = []
        newListStudent = [...originListStudent]
        if (e.key != 'All') {
            newListStudent = [...newListStudent].filter(item => item.gender == e.key)
        }
        this.setState({
            filterGender: e.key,
            listStudent: newListStudent

        })
    }


    render() {
        const { Option } = Select;
        const { showCreateStudent, showEditStudent, isDataProgresing, currentPage, pageSize, listIdsChecked } = this.state
        const menu = (
            <Menu onClick={this.handleFilterGender}>
                <Menu.Item key='Male'>
                    Male
              </Menu.Item>
                <Menu.Item key="Female">
                    Female
              </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="All">All</Menu.Item>
            </Menu>
        );
        return (
            <Spin spinning={isDataProgresing}>
                <div className='student-container'>
                    <div className="wr-action">
                        <BtnAdd onClick={this.showModalAdd} currentPage={currentPage} pageSize={pageSize} ><PlusOutlined />
                            <Translation>
                                {
                                    t => <span>{t("addStudent")}</span>
                                }
                            </Translation>
                        </BtnAdd>
                        {
                            this.showOrHideBtnDelete() &&
                            <BtnDelete onClick={this.handleRemoveStudent}
                            > <DeleteOutlined />
                                <Translation>
                                    {
                                        t => <span>{t("delete")}</span>
                                    }
                                </Translation>
                            </BtnDelete>
                        }
                    </div>
                    <div className='table-section'>
                        <table className='listStudent' cellspacing="0" cellpadding="0">
                            <thead>
                                <tr>
                                    <th>
                                        <Checkbox
                                            onChange={(e) => this.handlecheckedAll(e)}
                                            checked={this.isCheckedAll()}
                                        />
                                    </th>
                                    <th><Translation>
                                        {
                                            t => <span>{t("Fullname")}</span>
                                        }
                                    </Translation></th>
                                    <th className='th-wp'>
                                        <Translation>
                                            {
                                                t => <span className='age-wp'>{t("age")}</span>
                                            }
                                        </Translation>
                                        <div className="arrow">
                                            <Button onClick={this.handleSortInc} ><CaretUpOutlined style={{ fontSize: '12px', color: '#c5c3c3' }} /></Button>
                                            <Button onClick={this.handleSortDec}><CaretDownOutlined style={{ fontSize: '12px', color: '#c5c3c3' }} /></Button>

                                        </div>
                                    </th>
                                    <th><Translation>
                                        {
                                            t => <span>{t("birthday")}</span>
                                        }
                                    </Translation></th>
                                    <th className='th-wp'>
                                        <Translation>
                                            {
                                                t => <span className='age-wp gender-wp'>{t("gender")}</span>
                                            }
                                        </Translation>
                                        <div className="arrow">
                                            <Dropdown overlay={menu} trigger={['click']}>
                                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                                    <FilterOutlined style={{ color: '#c5c3c3' }} />
                                                </a>
                                            </Dropdown>
                                        </div>
                                    </th>
                                    <th><Translation>
                                        {
                                            t => <span>{t("email")}</span>
                                        }
                                    </Translation></th>
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
                                                        checked={cur.isChecked}
                                                    />
                                                </td>
                                                <td className='name'>{cur.name}</td>
                                                <td>{cur.age}</td>
                                                <td>{moment(cur.birthday).format(DATE_FORMAT)}</td>
                                                <td >{cur.gender} </td>
                                                <td>{cur.email}</td>
                                                <td className='td-btn' >
                                                    <button className='btn-edit' onClick={e => this.showModalEdit(e, cur)} ><EditOutlined />
                                                        <Translation>
                                                            {
                                                                t => <span>{t("edit")}</span>
                                                            }
                                                        </Translation>
                                                    </button>
                                                </td>

                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>

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
                    {
                        showCreateStudent &&
                        <AddStudent
                            showCreateStudent={showCreateStudent}
                            onCloseCreateStudent={this.onCloseCreateStudent}
                            getListStudents={this.getListStudents}
                            currentPage={this.state.currentPage}
                            pageSize={this.state.pageSize}
                        />
                    }


                    <EditStudent
                        showEditStudent={showEditStudent}
                        onCloseEditStudent={this.onCloseEditStudent}
                        studentName={this.state.studentName}
                        studentAge={this.state.studentAge}
                        studentBirthday={this.state.studentBirthday}
                        studentEmail={this.state.studentEmail}
                        studentGender={this.state.studentGender}
                        studentIsSelected={this.state.studentIsSelected}
                        getListStudents={this.getListStudents}
                        currentPage={this.state.currentPage}
                        pageSize={this.state.pageSize}

                    />

                </div>
            </Spin>

        )
    }

}


export default Table