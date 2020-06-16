import React, { Component } from 'react'
import './ProjectPage.scss'
import Table from '../../Components/Table/Table'


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