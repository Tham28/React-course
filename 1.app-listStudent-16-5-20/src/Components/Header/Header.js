import React, { Component } from 'react'

import './Header.scss';
import { Menu } from 'antd';
import {
    ProfileOutlined, FundProjectionScreenOutlined
} from '@ant-design/icons';
import hat from '../../images/hat-graduate.png';
import { Translation } from 'react-i18next';

import ChangeLocale from '../ChangeLocale/ChangeLocale'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentMenu: 'project',
        }
    }
    render() {
        return (
            <div className="header">
                <div className="container">
                    <div className="logo">
                        <img className='img-logo' src={hat} alt="" />
                        <div className="manage">student manager</div>
                    </div>
                    <div className="link-page">
                        {/* <Menu onChange={this.handleClickMenu} selectedKeys={[this.state.currentMenu]} mode="horizontal">
                    <Menu.Item key="home" icon={<ProfileOutlined />}>
                        <Translation>
                            {
                                t => <span>{t("home")}</span>
                            }
                        </Translation>
                    </Menu.Item>
                    <Menu.Item key="project" icon={<FundProjectionScreenOutlined />}>
                    <Translation>
                            {
                                t => <span>{t("project")}</span>
                            }
                        </Translation>
                    </Menu.Item>
                </Menu> */}
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/project">Project</Link>
                                </li>
                            </ul>
                        </nav>

                    </div>


                    <ChangeLocale />
                </div>
            </div>
        )
    }
}

export default Header