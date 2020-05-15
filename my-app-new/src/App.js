import React from 'react';

import './App.css';
import Product from './Components/Product'


var showInfoProduct = (person) => {
  if (person.status) {
    return <h4>
      name: {person.name} <br />
            age: {person.age} <br />
            status: {person.status ? 'Active' : 'Pending'}
    </h4>
  }
}

function App() {
  var a = 5;
  var b = 10;
  var person = {
    name: 'John',
    age: 30,
    status: true
  }
  var user = [
    {
      id: 1,
      name: 'Hồ Nhất Sinh',
      age: 23
    },
    {
      id: 2,
      name: 'Trần Thị Hồng Thắm',
      age: 22
    }
  ];
  var element = user.map((cur, index) => {
    return <div key={index}>
      <h3>Tên: {cur.name}</h3>
      <h4>Tuổi: {cur.age}</h4>
    </div>
  })

  var product = [
    {
      id: 1,
      name: 'Iphone 11',
      image: 'https://vuatao.vn/wp-content/uploads/2019/09/iphone11-white-select-2019.png',
      price: 22000000,
      status: true
    },
    {
      id: 2,
      name: 'Nokia X6',
      image: 'https://vuatao.vn/wp-content/uploads/2019/09/iphone11-white-select-2019.png',
      price: 2000000,
      status: true
    },
    {
      id: 1,
      image: 'https://vuatao.vn/wp-content/uploads/2019/09/iphone11-white-select-2019.png',
      name: 'Redmi',
      price: 5000000,
      status: false
    }
  ]
  var eleProduct = product.map((cur, index) => {
    var result = ''
    if (cur.status) {
      result = <Product key={index}
        name={cur.name}
        price={cur.price}
        image={cur.image}
      />
    }
    return result;
  })

  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <div className="content">
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown button
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </div>
      <div className="add">
        <h4>
          {a}
        </h4>
        <h4>
          {b}
        </h4>
        <h4>
          a + b= {a + b}
        </h4>
        {showInfoProduct(person)}
        <hr />
        <br />
        {/* {element} */}
      </div>
      <br />
     


      {eleProduct}
      <br />
      <button  onClick={handleClick}>
      Click me
    </button>
    </div>

  );
}

export default App;
