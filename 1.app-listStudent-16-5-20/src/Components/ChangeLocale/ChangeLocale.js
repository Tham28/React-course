import React, { Component } from 'react'
import './ChangeLocale.scss'
import { Select } from 'antd';
import vn from '../../images/vn.png'
import en from '../../images/en.png'
import i18n from '../../i18n'
import { CaretDownOutlined} from '@ant-design/icons';

const { Option } = Select;

class ChangeLocale extends Component {
    constructor(props) {
        super(props)
        this.state ={
            changeLocale: 'en'
        }
    }

    handleChangeLocale = (value) => {
        this.setState({
            changeLocale: value
        })
        i18n.changeLanguage(value)
    }
   
    render() {
        return (
            <div className="select-lang">
                <Select 
                value={this.state.changeLocale} 
                style={{ width: 120 }} 
                onChange={value => this.handleChangeLocale(value)}
                suffixIcon ={<CaretDownOutlined />}
                >
                    <Option value="en"><img className='img-lang' src={en} alt="" width='20px' /> English</Option>
                    <Option value="vi"> <img className='img-lang' src={vn} alt="" width='20px' /> Vietnamese</Option>
                </Select>
            </div>
        )
    }

}

export default ChangeLocale