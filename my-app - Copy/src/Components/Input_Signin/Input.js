import React from 'react';
import './input.css';
import img_arrow from './images/arrow-right.png';
import img_check from './images/check.png';
import img_required from './images/required.png';


function Input() {
    return (
        <section className="main-section">
            <div className="container-input">
                <div className="title-sign">
                    <div className="title">
                        <h2>Sign</h2>
                        <h2 className="in">in</h2>
                    </div>
                    <button className="btn-sign-in"> <a className='link-sign-up' href="">Sign up <img className='img-arrow' src={img_arrow} alt="" /></a></button>
                </div>
                <h4>Manage your profit today</h4>
                <form action="">
                    <label htmlFor="">Email <img src={img_required} alt="" /></label> <br/>
                    <input type="email" type='email' placeholder='Enter your email' />
                <p className="para-email"></p>
                <label htmlFor="">Password <img src={img_required} alt="" /></label>
                
                    <input id='username' className="pass" type="password" placeholder="Enter your password" />
                   
                <p className="para-pass"></p>
                <label htmlFor="">Merchant ID <img src={img_check} alt=""/></label> <br/>
                <input className='merchant-id' type="text" placeholder='Enter your merchant ID' />
                </form>

                <button className="btn-sign">Sign in</button>
                <div className="forgot">
                    <a href="">Forgot password?</a>
                    <a href="">Forgot merchant ID?</a>
                </div>
            </div>
        </section>
    )
}

export default Input;