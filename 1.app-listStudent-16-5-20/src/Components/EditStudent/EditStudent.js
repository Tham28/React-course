import React, { Component } from 'react'
import './EditStudent.scss'
import { DATE_FORMAT, APP_DOMAIN } from '../../constants/constants'
import moment from 'moment'
import { DatePicker } from 'antd';
import { Modal } from 'antd';

class EditStudent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            studentName: '',
            studentAge: '',
            studentBirthday: '',
            studentGender: '',
            studentEmail: '',
            errorName: "",
            errorAge: "",
            errorBirthday: "",
            errorGender: "",
            errorEmail: "",
            open: false
        }
    }
    static getDerivedStateFromProps(props, state) {
        if (props.showEditStudent !== state.open) {
            return {
                open: props.showEditStudent
            }
        }
        return null;
    }

    handleOk = e => {
        this.setState({
            open: false,
        });
        this.props.onCloseEditStudent()
    };

    handleCancel = e => {
        this.setState({
            open: false,
        });
        this.props.onCloseEditStudent();
    };
    handleChange = (date) => {
        this.setState({
            studentBirthday: date,
            errorBirthday: ''
        })
    }

    render() {
        const { open, studentBirthday, studentName } = this.state;
        return (
            <Modal
                title="Sửa sinh viên"
                visible={open}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText='Sửa'
                cancelText='Hủy'
                wrapClassName='edit-student-modal-container'
            >
                <form >
                    <div className="addStudent">
                        <div className='left'>
                            <label htmlFor="">Họ và tên:</label>
                            <input type="text" minLength='8' value={this.state.studentName} onChange={(e) => {
                                const nameTxt = e.target.value.replace(/\d/, '')
                                this.setState({
                                    studentName: nameTxt,
                                    errorName: ''
                                })
                                if (studentName.length < 8) {
                                    this.setState({
                                        errorName: 'Please input at least 8 characters!'
                                    })
                                }
                            }} />
                        </div>
                        {this.state.errorName &&
                            <div className='txt-error'>
                                {this.state.errorName}
                            </div>
                        }
                    </div>
                    <div className="addStudent">
                        <div className='left'>
                            <label htmlFor="">Tuổi:</label>
                            <input type='text' value={this.state.studentAge} onChange={(e) => {
                                const ageTxt = e.target.value.replace(/\D/, '')

                                if (ageTxt == '') {
                                    this.setState({
                                        studentAge: ageTxt,
                                        errorAge: 'Please input the correct age!'
                                    })
                                } else if (parseInt(ageTxt) < 100) {
                                    this.setState({
                                        studentAge: ageTxt,
                                        errorAge: ''
                                    })
                                }
                            }}
                            />
                        </div>
                        {this.state.errorAge &&
                            <div className='txt-error'>
                                {this.state.errorAge}
                            </div>
                        }
                    </div>
                    <div className="addStudent">
                        <div className='left'>
                            <label htmlFor="">Ngày sinh:</label>
                            <DatePicker
                                format={DATE_FORMAT}
                                onChange={this.onChange} />
                        </div>
                        {this.state.errorBirthday &&
                            <div className='txt-error'>
                                {this.state.errorBirthday}
                            </div>
                        }
                    </div>

                    <div className="addStudent">
                        <div className='left'>
                            <label htmlFor="">Giới tính:</label>
                            <div className='gender'>
                                <input type="radio" id="male" name="gender" defaultValue="Nam" onChange={(e) => {
                                    this.setState({
                                        studentGender: e.target.value,
                                        errorGender: ''
                                    })
                                }} />
                                <label htmlFor="male">Nam</label> <br />
                                <input type="radio" id="female" name="gender" defaultValue="Nữ" onChange={(e) => {
                                    this.setState({
                                        studentGender: e.target.value,
                                        errorGender: ''
                                    })
                                }} />
                                <label htmlFor="female">Nữ</label>
                            </div>
                        </div>
                        {this.state.errorGender &&

                            <div className='txt-error'>

                                {this.state.errorGender}
                            </div>
                        }

                    </div>

                    <div className="addStudent">
                        <div className='left'>
                            <label htmlFor="">Email:</label>
                            <input type="text" value={this.state.studentEmail} onChange={(e) => {
                                this.setState({
                                    studentEmail: e.target.value,
                                    errorEmail: ''
                                })
                            }} />

                        </div>

                        {this.state.errorEmail &&
                            <div className='txt-error'>
                                {this.state.errorEmail}
                            </div>
                        }
                    </div>
                </form>
            </Modal>
        )
    }
}

export default EditStudent