import React, { Component } from 'react';

class Product extends Component {
    constructor(props) {
        super(props);
    }

    clickPurchase = () => {
        console.log('Mua thành công!')
    }
    addProduct =()=>{
        console.log(this.refs.name.value)
      }
    render() {
        return (
            <div className="col-sm-12 col-md-12">
                <div>
                    <h3>Thêm sản phẩm</h3>
                    <label htmlFor="">Thêm sản phẩm</label> <br />
                    <input type="text" ref="name" />
                    <button onClick={this.addProduct}>Thêm</button>
                </div>

                <a className="thumbnail">
                    <img alt="Generic placeholder thumbnail" src={this.props.image} width='200px' />
                </a>
                <div className="title">{this.props.name}</div>
                <div className="price">{this.props.price}</div>
                <button className='btn-purchase' onClick={this.clickPurchase}> Mua ngay</button>


            </div>
        )
    }
}

export default Product