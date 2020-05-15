import React, {Component} from 'react';
import './header.css';
import logo_m from './images/logo-m.png';
import logo_o from './images/logo-o.png';
import bg from './images/bg-sign.png'

class Header extends Component{
    constructor(props){
        super(props);
    }
    render(){
  
        return(
            <section className="header-section">
                <div className="container-header">
                    <div className="logo">
                        <img src={logo_m} />
                        <img src={logo_o} />
                    </div>
                </div>
            </section>
        )
  
       
    }
};

export default Header;
