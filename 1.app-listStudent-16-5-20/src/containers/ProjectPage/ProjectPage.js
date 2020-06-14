import React, { Component } from 'react'
import './ProjectPage.scss'
import Table from '../../Components/Table/Table'
import Header from '../../Components/Header/Header'


class ProjectPage extends Component{
    constructor (props){
        super(props);

    }
    render(){
        return(
            <div>
               
                <Table />
            </div>
        )
    }
}

export default ProjectPage