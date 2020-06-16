import React, { Component } from 'react'
import './LoginPage.scss'
import Login from '../../Components/Login/Login'


class LoginPage extends Component{
    constructor (props){
        super(props);

    }
    render(){
        return(
            <div>
                <Login />
            </div>
        )
    }
}

export default LoginPage