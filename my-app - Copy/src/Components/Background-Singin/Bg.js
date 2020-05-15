import React from 'react';
import './bg.css';
import img_bg from './images/bg-sign.png';

function Bg(){
    return(
        <section className="bg-section">
            <img src={img_bg} alt=""/>
        </section>
    )
}
export default Bg;