import React, { Component } from 'react'

import './Header.scss';
import { Menu, Drawer, Button } from 'antd';
import { MenuUnfoldOutlined, ProfileOutlined, FundProjectionScreenOutlined } from '@ant-design/icons';
import hat from '../../images/hat-graduate.png';
import { Translation } from 'react-i18next';

import ChangeLocale from '../ChangeLocale/ChangeLocale'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
} from "react-router-dom";



class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }
    showDrawerLink = () => {
        this.setState({
            visible: true,
        });
    };

    onCloseDrawerLink = () => {
        this.setState({
            visible: false,
        });
    };

    handleClickMenu = e => {
        const {history} = this.props
        if(history){
            history.push(e.key)
        }
    };
    render() {
        const pathName =  window.location.pathname
        return (
            <div className="header">
                <div className="container">

                    <div className="nav-link">
                        <Button type="primary" onClick={this.showDrawerLink}>
                            <MenuUnfoldOutlined />
                        </Button>
                        <Drawer
                            title="Student manager"
                            width={200}
                            closable={false}
                            onClose={this.onCloseDrawerLink}
                            visible={this.state.visible}
                        >
                            <nav>
                                <ul>
                                    <li>
                                        <Link to="/">
                                            <Translation>
                                                {
                                                    t => <span>{t("home")}</span>
                                                }
                                            </Translation>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/project">
                                            <Translation>
                                                {
                                                    t => <span>{t("project")}</span>
                                                }
                                            </Translation>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </Drawer>
                    </div>
                    

                    <div className="logo">
                        <img className='img-logo' src={hat} alt="" />
                    </div>
                    <div className="link-page">
                        <Menu onClick={this.handleClickMenu} selectedKeys={[pathName]} mode="horizontal">
                            <Menu.Item key='/' icon={<ProfileOutlined />}>
                                <Translation>
                                    {
                                        t => <span>{t("home")}</span>
                                    }
                                </Translation>
                            </Menu.Item>

                            <Menu.Item key="/project" icon={<FundProjectionScreenOutlined />}>
                                <Translation>
                                    {
                                        t => <span>{t("project")}</span>
                                    }
                                </Translation>
                            </Menu.Item>
                        </Menu>
                    </div>
                    <ChangeLocale />
                </div>
            </div>
        )
    }
}

export default withRouter(Header) 