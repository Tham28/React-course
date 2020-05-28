import React, {Component} from 'react'
import './App.css'
import Table from './Components/Table/Table'
import 'antd/dist/antd.css';

import Ingredient from './Components/Ingredient/Ingredient'



class App extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className='contain'>
        <Table />

        {/* <Ingredient  ingredient= 'cheese'/> */}
      
      </div>
    )
  }
}

export default App