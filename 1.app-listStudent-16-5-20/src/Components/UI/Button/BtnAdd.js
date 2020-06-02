import React, {Component} from 'react'
import './Button.css'

const button = (props) =>(
    <button className='btn-primary' {...props}> 
    {props.children}
    </button>
)


export default button
