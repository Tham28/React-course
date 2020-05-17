import React, { Component } from 'react';
import './Table.css'

const initState = {
    errorName: "",
    errorAge: "",
    errorBirthday: "",
    errorGender: ""
}

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listStudent: [
                {

                    name: 'Hồ Nhất Sinh',
                    age: 23,
                    birthday: '1997-11-06',
                    gender: 'Male'
                },
                {

                    name: 'Trần Thị Hồng Thắm',
                    age: 22,
                    birthday: '1998-10-28',
                    gender: 'Female'
                },
                {

                    name: 'Hồ Nhất Sinh',
                    age: 23,
                    birthday: '1997-11-06',
                    gender: 'Male'
                },
                {
                    name: 'Trần Thị Hồng Thắm',
                    age: 22,
                    birthday: '1998-10-28',
                    gender: 'Female'
                }
            ],
            studentName: '',
            studentAge: '',
            studentBirthday: '',
            studentGender: '',
            initState 
        }
    }
    validate = () => {
        let errorName = '';
        let errorAge = '';
        let errorBirthday = '';
        let errorGender = '';
        if (!this.state.studentName) {
            errorName = 'Please enter name!'
        }
        if (!this.state.studentAge) {
            errorAge = 'Please enter age!'
        }
        if (!this.state.studentBirthday) {
            errorBirthday = 'Please enter birthday!'
        }
        if (!this.state.studentGender) {
            errorGender = 'Please choose gender!'
        }
        
        if (errorName || errorAge || errorBirthday || errorGender) {
            this.setState({ errorName, errorAge, errorBirthday, errorGender });
            return false;
        }
        return true
    }
    addNewStudent = () => {
        const isValid = this.validate();
       
        if (isValid) {  
            const newStudent = {
                name: this.state.studentName,
                age: this.state.studentAge,
                birthday: this.state.studentBirthday,
                gender: this.state.studentGender
            }
            const listStudent = [...this.state.listStudent];
            listStudent.push(newStudent);
            this.setState({ listStudent })
            this.setState(initState )
        }

    }

    clickDelete(idx) {
        const { listStudent } = this.state;
        listStudent.splice(idx, 1);
        this.setState({ listStudent });
    }
    render() {
        return (
            <div>

                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Birthday</th>
                            <th>Gender</th>
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
                                        <td>
                                            <button onClick={(this.clickDelete.bind(this, idx))}>Xóa</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                <div className="addStudent">
                    <label htmlFor="">Name:</label>
                    <input type="text" onChange={(e) => {
                        this.setState({
                            studentName: e.target.value
                        })
                    }} />
                    <div className='txt-error'>
                        {this.state.errorName}
                    </div>
                </div>
                <div className="addStudent">
                    <label htmlFor="">Age:</label>
                    <input type="number" min='1' onChange={(e) => {
                        this.setState({
                            studentAge: e.target.value
                        })
                    }} />
                    <div className='txt-error'>
                        {this.state.errorAge}
                    </div>
                </div>
                <div className="addStudent">
                    <label htmlFor="">Birthday:</label>
                    <input type="date" onChange={(e) => {
                        this.setState({
                            studentBirthday: e.target.value
                        })

                    }} />
                    <div className='txt-error'>
                        {this.state.errorBirthday}
                    </div>
                </div>
                <div className="addStudent">
                    <label htmlFor="">Gender:</label>
                    <div className='gender'>
                        <input type="radio" id="male" name="gender" defaultValue="Male" onChange={(e) => {
                            this.setState({
                                studentGender: e.target.value
                            })
                        }} />
                        <label htmlFor="male">Male</label> <br />
                        <input type="radio" id="female" name="gender" defaultValue="Female" onChange={(e) => {
                            this.setState({
                                studentGender: e.target.value
                            })
                        }} />
                        <label htmlFor="female">Female</label>
                    </div>
                    <div className='txt-error'>
                        {this.state.errorGender}
                    </div>


                </div>
                <div className='add'>
                    <button className='btn-Add' onClick={(this.addNewStudent)}>Thêm sinh viên</button>

                </div>

            </div>
        )
    }

}

export default Table