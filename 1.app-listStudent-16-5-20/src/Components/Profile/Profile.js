import React, { Component } from 'react'
import './Profile.scss'
import img_me from '../../images/tham.png'
import { Progress } from 'antd';
import { LaptopOutlined, HomeOutlined, MailOutlined, PhoneOutlined, StarOutlined, 
    CameraOutlined,MessageOutlined, CoffeeOutlined, CustomerServiceOutlined, FacebookOutlined,
    ScheduleOutlined, RocketOutlined, FieldTimeOutlined, FormOutlined } from '@ant-design/icons';



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
                                        <h2>TRAN THI HONG THAM</h2>
                                    </div>
                                </div>
                                <div className="infor-content">
                                    <p><LaptopOutlined style={{ color: 'rgb(245, 159, 0)' }} /> Developer</p>
                                    <p><HomeOutlined style={{ color: 'rgb(245, 159, 0)' }} /> 791/1 Tran Xoan Soan Street, Tan Hung Ward, District 7, Ho Chi Minh City </p>
                                    <p><MailOutlined style={{ color: 'rgb(245, 159, 0)' }} /> tththam.1998la@gmail.com</p>
                                    <p><PhoneOutlined style={{ color: 'rgb(245, 159, 0)' }} />0969132245</p>
                                    <hr />
                                    <p className="title-skill"><b><StarOutlined style={{ fontSize: '18px', color: 'rgb(245, 159, 0)' }} />Skills</b></p>
                                    <div className='skill'>Html</div>
                                    <Progress percent={75}
                                        strokeColor={{
                                            '0%': 'rgb(245, 159, 0)',
                                            '100%': 'rgb(245, 159, 0)',
                                        }}
                                        strokeWidth={15}
                                        status="active" />
                                    <div className='skill'>Css</div>
                                    <Progress percent={75} strokeColor={{
                                        '0%': 'rgb(245, 159, 0)',
                                        '100%': 'rgb(245, 159, 0)',
                                    }}
                                    strokeWidth={15} status="active" />
                                    <div className='skill'>Javascript</div>
                                    <Progress percent={50} strokeColor={{
                                        '0%': 'rgb(245, 159, 0)',
                                        '100%': 'rgb(245, 159, 0)',
                                    }}  strokeWidth={15} status="active" />
                                    <div className='skill'>React</div>
                                    <Progress percent={50} strokeColor={{
                                        '0%': 'rgb(245, 159, 0)',
                                        '100%': 'rgb(245, 159, 0)',
                                    }}  strokeWidth={15} status="active" />

                                    <br />
                                    <hr />

                                    <p className="text-lang"><b><FormOutlined style={{ color: 'rgb(245, 159, 0)' }} />Languages</b></p>
                                    <p>Toeic: 545/990</p>

                                    <br />
                                </div>
                            </div><br />
                            {/* End Left Column */}
                        </div>
                        {/* Right Column */}
                        <div className="right-profile">
                            <div className="work-content">
                                <h2 className="txt-experience"><LaptopOutlined style={{ color: 'rgb(245, 159, 0)' }} />Work Experience</h2>
                            </div>
                            <div className="edu-content">
                                <h2 className="txt-edu"><ScheduleOutlined style={{ color: 'rgb(245, 159, 0)' }} />Education</h2>

                                <div className="infor-content">
                                    <h5 className="school"><b>Vietnam National University Ho Chi Minh City - University of Science</b></h5>
                                    <h6 className="year"><FieldTimeOutlined style={{ color: 'rgb(245, 159, 0)' }} />2016 - 2020</h6>
                                    <p className='student'>Student</p>
                                    <hr />
                                </div>
                            </div>  
                            <div className="work-content">
                                <h2 className="txt-experience"><RocketOutlined  style={{ color: 'rgb(245, 159, 0)' }} />Interestes</h2>
                                <div className='inter'> <CameraOutlined /> <MessageOutlined /> <CoffeeOutlined /> <CustomerServiceOutlined /> <FacebookOutlined /> </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        )
    }
}

export default Profile