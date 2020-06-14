import React, {Component} from 'react'
import './App.css'
import Table from './Components/Table/Table'
import 'antd/dist/antd.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import HomePage from './containers/HomePage/HomePage'
import ProjectPage from './containers/ProjectPage/ProjectPage'
import Header from './Components/Header/Header';




class App extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <BrowserRouter>
      <div className='container'>
      <Header/>
      <Switch>
          <Route path="/project">
            <ProjectPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      
      </div>
      </BrowserRouter>
      
    )
  }
}

export default App