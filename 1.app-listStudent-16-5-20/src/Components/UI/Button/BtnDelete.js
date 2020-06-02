import React, {Component} from 'react'
import './Button.css'

const btnDelete =(props) =>(
    <button className ='btn-delete' {...props}>
        {props.children}
    </button>
)


export default btnDelete
