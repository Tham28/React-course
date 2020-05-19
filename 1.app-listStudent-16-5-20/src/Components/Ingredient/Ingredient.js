import React, { Component } from 'react'
import salad from './images/salad.jpg'
import cheese from './images/cheese.jpg'
import meat from './images/meat.jpg'
import pizza from './images/pizza.jpg'


class Ingredient extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        const { ingredient } = this.props
        return (
            <div>
                {
                ingredient === 'salad' ? <img src={salad} /> :
                (ingredient === 'cheese' ? <img src={cheese} /> :  
                (ingredient === 'meat' ? <img src={meat} /> :  
                <img src={pizza}/>) )    
               }
            </div>
        )
    }
}


export default Ingredient