import React, { Component } from 'react'

import Profile from '../../Components/Profile/Profile'


class ProfilePage extends Component{
    constructor (props){
        super(props);

    }
    render(){
        return(
            <div>
                <Profile />
            </div>
        )
    }
}

export default ProfilePage