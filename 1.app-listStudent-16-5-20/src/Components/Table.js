import React, { Component } from 'react';
import './Table.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Calendar from 'rc-calendar';
import 'rc-calendar/assets/index.css';
import DatePicker from 'rc-calendar/lib/Picker';
import moment from 'moment'


toast.configure()

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listStudent: [
                {

                    name: 'Hồ Nhất Sinh',
                    age: 23,
                    birthday: '06/11/1997',
                    gender: 'Male',
                    email: 'honhatsinh.0611@gmail.com'
                },
                {

                    name: 'Trần Thị Hồng Thắm',
                    age: 22,
                    birthday: '28/10/1998',
                    gender: 'Female',
                    email: 'tththam.2810@gamil.com'
                },
                {

                    name: 'Hồ Nhất Sinh',
                    age: 23,
                    birthday: '06/11/1997',
                    gender: 'Male',
                    email: 'honhatsinh.0611@gmail.com'
                },
                {
                    name: 'Trần Thị Hồng Thắm',
                    age: 22,
                    birthday: '28/10/1998',
                    gender: 'Female',
                    email: 'tththam.2810@gamil.com'
                }
            ],
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
            noData: ''
        }
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
        const newStudent = {
            name: studentName,
            age: studentAge,
            birthday: moment(studentBirthday).format("DD/MM/YYYY"),
            gender: studentGender,
            email: studentEmail
        }
        const newListStudent = [...listStudent];
        newListStudent.push(newStudent);
        this.setState({ listStudent: newListStudent })

        toast.success('Thêm thành công!', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })

        //this.myFormRef.reset();

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
            errorBirthday:''
        })
    }
    render() {
        const calendar = (<Calendar />);
        return (
            <div>

                <table className='listStudent'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Birthday</th>
                            <th>Gender</th>
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
                                        <td>{cur.birthday}</td>
                                        <td >{cur.gender} </td>
                                        <td>{cur.email}</td>
                                        <td>
                                            <button onClick={() => this.clickDelete(idx)}>Xóa</button>
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

                <form >
                    <div className="addStudent">
                        <div className='left'>
                            <label htmlFor="">Name:</label>
                            <input type="text" value={this.state.studentName} onChange={(e) => {
                                this.setState({
                                    studentName: e.target.value,
                                    errorName: ''
                                })
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
                            <label htmlFor="">Age:</label>
                            <input type='text' value={this.state.studentAge} onChange={(e) => {
                                const ageTxt= e.target.value.replace(/\D/, '')
                                this.setState({
                                    studentAge: ageTxt,
                                })
                                if(ageTxt==''){
                                    this.setState({
                                        errorAge:'Please input the correct age!'
                                    })
                                }else{
                                    this.setState({
                                        errorAge:''
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
                            <label htmlFor="">Birthday:</label>
                            <DatePicker
                                animation="slide-up"
                                value={moment(this.state.studentBirthday)}
                                disabled={false}
                                calendar={calendar}
                                onChange={this.handleChange}
                            >
                                {
                                    ({ value }) => {
                                        
                                        return (
                                            <input value={this.state.studentBirthday ? moment(value).format('DD/MM/YYYY') : 'dd/mm/yyyy'} />
                                           
                                        )
                                    }
                                }


                            </DatePicker>
                        </div>
                        {this.state.errorBirthday &&
                            <div className='txt-error'>
                                {this.state.errorBirthday}
                            </div>
                        }
                    </div>
                    {/* <DatePicker
                        animation="slide-up"
                        value={moment(this.state.studentBirthday)}
                        disabled={false}
                        calendar={calendar}
                        onChange = {this.handleChange}
                    >{
                            ({ value }) => {
                                return (
                                    <input value={moment(value).format('MM-DD-YYYY')} />
                                )
                            }
                        }</DatePicker> */}
                    <div className="addStudent">
                        <div className='left'>
                            <label htmlFor="">Gender:</label>
                            <div className='gender'>
                                <input type="radio" id="male" name="gender" defaultValue="Male" onChange={(e) => {
                                    this.setState({
                                        studentGender: e.target.value,
                                        errorGender: ''
                                    })
                                }} />
                                <label htmlFor="male">Male</label> <br />
                                <input type="radio" id="female" name="gender" defaultValue="Female" onChange={(e) => {
                                    this.setState({
                                        studentGender: e.target.value,
                                        errorGender: ''
                                    })
                                }} />
                                <label htmlFor="female">Female</label>
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

                <div className='add'>
                    <button className='btn-Add' onClick={(this.addNewStudent)}>Thêm sinh viên</button>
                </div>
                <div className="deteteAll">
                    <button className='btn-deleteAll' onClick={this.deleteAllStudent}>Xóa tất cả</button>
                </div>

            </div>
        )
    }

}


// function Appss(){
//     const notify = () => toast("Wow so easy !");

//     return (
//       <div>
//         <button onClick={notify}>Notify !</button>
//         <ToastContainer />
//       </div>
//     );
//   }

export default Table