import React, { Component } from 'react'
import './Profile.scss'
import img_me from '../../images/tham.png'
import { Progress } from 'antd';
import {
    LaptopOutlined, HomeOutlined, MailOutlined, PhoneOutlined, StarOutlined,
    CameraOutlined, ReadOutlined, CoffeeOutlined, CustomerServiceOutlined, FacebookOutlined,
    ScheduleOutlined, RocketOutlined, FieldTimeOutlined, FormOutlined, GiftOutlined
} from '@ant-design/icons';
import { Translation } from 'react-i18next';



class Profile extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                <div className="profile">
                    <div className="container-profile">
                        <div className="left-profile">
                            <div className="card">
                                <div className="card-name">
                                    <img className='img-me' src={img_me} />
                                    <div className="text-card">
                                        <Translation>
                                            {
                                                t => <h2>{t("tham")}</h2>
                                            }
                                        </Translation>
                                    </div>
                                </div>
                                <div className="infor-content">
                                    <p><GiftOutlined style={{ color: 'rgb(245, 159, 0)' }} />
                                        <Translation>
                                            {
                                                t => <span>{t("birthMe")}</span>
                                            }
                                        </Translation></p>
                                    <p><HomeOutlined style={{ color: 'rgb(245, 159, 0)' }} />
                                        <Translation>
                                            {
                                                t => <span>{t("addressMe")}</span>
                                            }
                                        </Translation>
                                    </p>
                                    <p><MailOutlined style={{ color: 'rgb(245, 159, 0)' }} /> tththam.1998la@gmail.com</p>
                                    <p><PhoneOutlined style={{ color: 'rgb(245, 159, 0)' }} />0969132245</p>
                                    <hr />
                                    <p className="title-skill"><b><StarOutlined style={{ fontSize: '18px', color: 'rgb(245, 159, 0)' }} />
                                        <Translation>
                                            {
                                                t => <span>{t("skill")}</span>
                                            }
                                        </Translation>
                                    </b></p>
                                    <div className='skill'>Html</div>
                                    <Progress percent={80}
                                        strokeColor={{
                                            '0%': 'rgb(245, 159, 0)',
                                            '100%': 'rgb(245, 159, 0)',
                                        }}
                                        strokeWidth={15}
                                        status="active" />
                                    <div className='skill'>Css - scss</div>
                                    <Progress percent={80} strokeColor={{
                                        '0%': 'rgb(245, 159, 0)',
                                        '100%': 'rgb(245, 159, 0)',
                                    }}
                                        strokeWidth={15} status="active" />

                                    <div className='skill'>Javascript</div>
                                    <Progress percent={60} strokeColor={{
                                        '0%': 'rgb(245, 159, 0)',
                                        '100%': 'rgb(245, 159, 0)',
                                    }} strokeWidth={15} status="active" />


                                    <div className='skill'>Git</div>
                                    <Progress percent={50} strokeColor={{
                                        '0%': 'rgb(245, 159, 0)',
                                        '100%': 'rgb(245, 159, 0)',
                                    }} strokeWidth={15} status="active" />


                                    <div className='skill'>React</div>
                                    <Progress percent={50} strokeColor={{
                                        '0%': 'rgb(245, 159, 0)',
                                        '100%': 'rgb(245, 159, 0)',
                                    }} strokeWidth={15} status="active" />

                                    <br />
                                    <hr />

                                    <p className="text-lang"><b><FormOutlined style={{ color: 'rgb(245, 159, 0)' }} />
                                        <Translation>
                                            {
                                                t => <span>{t("languages")}</span>
                                            }
                                        </Translation>
                                    </b></p>
                                    <Translation>
                                        {
                                            t => <p>{t("listening")}</p>
                                        }
                                    </Translation>
                                    <Translation>
                                        {
                                            t => <p>{t("speaking")}</p>
                                        }
                                    </Translation>
                                    <br />
                                </div>
                            </div><br />
                            {/* End Left Column */}
                        </div>
                        {/* Right Column */}
                        <div className="right-profile">
                            <div className="edu-content">
                                <h2 className="txt-experience"><LaptopOutlined style={{ color: 'rgb(245, 159, 0)' }} />
                                <Translation>
                                        {
                                            t => <span>{t("project")}</span>
                                        }
                                    </Translation>
                                </h2>

                                <div className="infor-content">
                                    <h5 className="school">
                                    <Translation>
                                        {
                                            t => <b>{t("project_1")}</b>
                                        }
                                    </Translation>
                                    </h5>
                                    <h6 className="year">
                                    <Translation>
                                        {
                                            t => <span>{t("amazign")}</span>
                                        }
                                    </Translation> 
                                    </h6> 
                                    <li><a href='https://www.w3schools.com/w3css/tryw3css_templates_cv.htm'>https://www.w3schools.com/w3css/tryw3css_templates_cv.htm</a> 
                                    </li>
                                    <hr />

                                    <h5 className="school">
                                    <Translation>
                                        {
                                            t => <b>{t("project_2")}</b>
                                        }
                                    </Translation>
                                    </h5>
                                    <h6 className="year">
                                    <Translation>
                                        {
                                            t => <span>{t("pig_game")}</span>
                                        }
                                    </Translation>
                                       </h6> <li><a href='https://www.w3schools.com/w3css/tryw3css_templates_cv.htm'>https://www.w3schools.com/w3css/tryw3css_templates_cv.htm</a> </li>
                                    <hr />

                                    <h5 className="school">
                                    <Translation>
                                        {
                                            t => <b>{t("project_3")}</b>
                                        }
                                    </Translation>
                                    </h5>
                                    <h6 className="year">
                                    <Translation>
                                        {
                                            t => <span>{t("manage")}</span>
                                        }
                                    </Translation>
                                     </h6>
                                    <div className='infor-project'>
                                    <Translation>
                                        {
                                            t => <span>{t("technology")}</span>
                                        }
                                    </Translation>
                                     </div>
                                    <div className='infor-project'>
                                    <Translation>
                                        {
                                            t => <span>{t("description")}</span>
                                        }
                                    </Translation>
                                       </div>
                                    <li><a href='http://localhost:3000/project'>http://localhost:3000/project</a> </li>
                                </div>

                            </div>
                            <div className="edu-content">
                                <h2 className="txt-edu"><ScheduleOutlined style={{ color: 'rgb(245, 159, 0)' }} />
                                <Translation>
                                        {
                                            t => <span>{t("education")}</span>
                                        }
                                    </Translation>
                                </h2>

                                <div className="infor-content">
                                    <h5 className="school">
                                    <Translation>
                                        {
                                            t => <b>{t("school")}</b>
                                        }
                                    </Translation>
                                      </h5>
                                    <h6 className="year"><FieldTimeOutlined style={{ color: 'rgb(245, 159, 0)' }} />2016 - 2020</h6>
                                    <p className='student'>
                                    <Translation>
                                        {
                                            t => <span>{t("studentMe")}</span>
                                        }
                                    </Translation>
                                       </p>
                                    <div className='gpa'>GPA: 7.45</div>

                                </div>
                            </div>
                            <div className="work-content">
                                <h2 className="txt-experience"><RocketOutlined style={{ color: 'rgb(245, 159, 0)' }} />
                                <Translation>
                                        {
                                            t => <span>{t("interestes")}</span>
                                        }
                                    </Translation>
                                </h2>
                                <div className='inter'> <CameraOutlined /> <ReadOutlined /> <CoffeeOutlined /> <CustomerServiceOutlined /> <FacebookOutlined /> </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        )
    }
}

export default Profile