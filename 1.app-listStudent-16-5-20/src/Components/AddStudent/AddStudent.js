import React, { Component } from 'react'
import './AddStudent.scss'
import { DATE_FORMAT, APP_DOMAIN } from '../../constants/constants'
import moment from 'moment'
import { DatePicker } from 'antd';
import { Modal } from 'antd';
import { toast } from 'react-toastify';

toast.configure()
class AddStudent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listStudent: [],
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
        if (props.showCreateStudent !== state.open) {
            return {
                open: props.showCreateStudent
            }
        }
        return null;
    }

    // componentDidMount() {
    //   this.getListStudents()
    // }
  
    // formatDataForDisplay(data) {
    //     return data.map(item => {
    //         return {
    //             ...item,
    //             birthday: item.birthDate * 1000
    //         }
    //     })
    // }
    // getListStudents = () => {
    //     this.setState({ isDataProgresing: true })
    //     fetch(`${APP_DOMAIN}/students`)
    //         .then(response => response.json())
    //         .then(data => {
    //             const formatedData = this.formatDataForDisplay(data)
    //             this.setState({
    //                 listStudent: formatedData,
    //                 isDataProgresing: false
    //             })
    //         })
    //         .catch(error => {
    //             toast.error(error)
              
    //         })
    // }



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
                this.setState({ 
                    listStudent: newListStudent,
                })
                this.props.onCloseCreateStudent();

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
        const { open, studentBirthday, studentName } = this.state;
        return (
            <Modal
                title="Thêm sinh viên"
                visible={open}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText='Thêm'
                cancelText='Hủy'
                wrapClassName='create-student-modal-container'
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
                                onChange={this.handleChangeBirthday} 
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

export default AddStudent