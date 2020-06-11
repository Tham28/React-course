import React, { Component } from 'react'
import './AddStudent.scss'
import { DATE_FORMAT, APP_DOMAIN, MALE, FEMALE } from '../../constants/constants'
import moment from 'moment'
import { DatePicker, Radio } from 'antd';
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import { Translation } from 'react-i18next';

toast.configure()
class AddStudent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listStudent: [],
            studentName: '',
            studentAge: '',
            studentBirthday: null,
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
        if (props.showCreateStudent !== state.open) {
            return {
                open: props.showCreateStudent
            }
        }
        return null;
    }

    handleOk = e => {
        this.setState({
            open: false,
        });
        this.addNewStudent()
    };

    handleCancel = e => {
        this.setState({
            open: false,
        });
        this.props.onCloseCreateStudent();
    };
    handleChangeBirthday = (date) => {
        this.setState({
            studentBirthday: date,
            errorBirthday: '',

        })
    }
    addNewStudent = () => {
        let errorName, errorAge, errorBirthday, errorGender, errorEmail;
        const { studentName,
            studentAge,
            studentBirthday,
            studentGender,
            studentEmail,
            listStuden
        } = this.state

        const { getListStudents, currentPage, pageSize } = this.props

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

        const newStudent = {
            'name': studentName,
            'age': studentAge,
            'gender': studentGender,
            'email': studentEmail,
            'birthDate': Math.floor(studentBirthday.valueOf() / 1000)
        }


        fetch(`${APP_DOMAIN}/students?page=${currentPage}&limit=${pageSize}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newStudent),
        })
            .then(response => response.json())
            .then(data => {
                this.props.onCloseCreateStudent();
                if (getListStudents && typeof getListStudents == 'function') {
                    getListStudents(currentPage, pageSize)
                }
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
            studentEmail: '',
        })
    }
    render() {
        const { open, studentBirthday, studentName, studentGender } = this.state;
        return (
            <Modal
                title={<Translation>
                    {
                        t => <span>{t("addStudent")}</span>
                    }
                </Translation>}
                visible={open}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText={<Translation>
                    {
                        t => <span>{t("btnAdd")}</span>
                    }
                </Translation>}
                cancelText={<Translation>
                    {
                        t => <span>{t("btnCancel")}</span>
                    }
                </Translation>}
                wrapClassName='create-student-modal-container'
            >
                <form >
                    <div className="addStudent">
                        <div className='left'>
                            <label htmlFor="">
                                <Translation>
                                    {
                                        t => <span>{t("Fullname")}</span>
                                    }
                                </Translation></label>
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
                            <label htmlFor="">
                                <Translation>
                                    {
                                        t => <span>{t("age")}</span>
                                    }
                                </Translation></label>
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
                            <label htmlFor=""><Translation>
                                {
                                    t => <span>{t("birthday")}</span>
                                }
                            </Translation></label>
                            <DatePicker
                                format={DATE_FORMAT}
                                onChange={this.handleChangeBirthday}
                                value={studentBirthday}
                            />
                        </div>
                        {this.state.errorBirthday &&
                            <div className='txt-error'>
                                {this.state.errorBirthday}
                            </div>
                        }
                    </div>

                    <div className="addStudent">
                        <div className='left'>
                            <label htmlFor=""><Translation>
                                {
                                    t => <span>{t("gender")}</span>
                                }
                            </Translation></label>
                            <div className='gender'>
                                <Radio.Group onChange={(e) => {
                                    this.setState({
                                        studentGender: e.target.value,
                                        errorGender: ''
                                    })
                                }}
                                    value={studentGender}>
                                    <Radio value={MALE}>
                                        <Translation>
                                            {
                                                t => <span>{t("male")}</span>
                                            }
                                        </Translation>
                                    </Radio>
                                    <Radio value={FEMALE}>
                                        <Translation>
                                            {
                                                t => <span>{t("feMale")}</span>
                                            }
                                        </Translation>
                                    </Radio>
                                </Radio.Group>
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
                            <label htmlFor=""><Translation>
                                {
                                    t => <span>{t("email")}</span>
                                }
                            </Translation></label>
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

export default AddStudent