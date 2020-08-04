import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';
import { Row, Col,message } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { actThemTaiKhoan } from '../redux/actions/nguoidung'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';
import axios from 'axios'
import {port} from '../config/configAPI';
let md5 = require('md5');
const validateMessages = {
    types: {
        number: 'số điện thoại không hợp lệ',
        email: 'email không hợp lệ!'
    },

};


class dangky extends Component {

   
    dangKy=(values)=>{
        const newUser = {
            HoTen: values.HoTen,
            SDT: values.sodienthoai,
            Email: values.email,
            MatKhau:md5(values.password)
        }
        axios({
            method:"POST",
            url:`http://localhost:${port}/api/dangkytaikhoan`,
            data:newUser
        })
        .then(res=>{
            if(res.data.message==="Đăng kí thành công !")
            {
                message.success(res.data.message);
                this.props.history.push('/dangnhap');
            }
            else message.error(res.data.message);
            
        })
        .catch(err=>console.log(err))
    }


    render() {

        return (
            <div>
              
                    <Row>
                        <Col span={8}></Col>
                        <Col span={8} className="dangky">
                            <h1 className="center">ĐĂNG KÝ</h1>
                            <Form
                                size="large"
                                name="normal_login"
                                className="login-form"
                                initialValues={{ remember: true }}
                                onFinish={this.dangKy}
                                validateMessages={validateMessages}
                            >
                                <Form.Item
                                    name="HoTen"
                                    rules={[{ required: true, message: 'Nhập họ tên!'}]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Họ Tên" />
                                </Form.Item>

                                <Form.Item
                                    name="sodienthoai"
                                    rules={[
                                        {required: true, message: 'Nhập số điện thoại !' },
                                        {message: 'số điện thoại không đúng !',pattern:'[0-9]{10,11}'}
                                    ]}
                                >
                                    <Input maxLength={11} prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder="Số điện thoại" />
                                </Form.Item>

                                <Form.Item
                                    name="email"
                                    rules={[
                                        { required: true, message: 'Nhập email !', type: 'email' },
                                    ]}
                                >
                                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    rules={[
                                        { required: true, message: 'Nhập mật khẩu!' },
                                        {message:'Mật khẩu không đủ mạnh !',pattern:'(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})'},
                               
                                    ]}
                                >
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Mật Khẩu"
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Button type="danger" htmlType="submit" className="login-form-button">
                                        Đăng ký
                                    </Button>
                                    <Link to='/dangnhap'>Quay lại</Link>
                                </Form.Item>
                            </Form>
                        </Col>
                        <Col span={8}></Col>
                    </Row>)
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        themTaiKhoan: (info) => {
            dispatch(actThemTaiKhoan(info))
        },
    }
}

const mapStateToProps = (state) => {
    return {
        MangNguoiDung: state.DSND.DSND
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(dangky);

