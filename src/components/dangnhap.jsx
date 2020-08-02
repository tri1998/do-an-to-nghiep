import React, { Component } from 'react'
import { Form, Input, Button, Checkbox,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
import {Link} from 'react-router-dom';
import {actAdminDangNhap,actUserLogin,actSetUserLogIn, actLuuThongTinNguoiDung} from '../redux/actions/nguoidung'
import {connect} from 'react-redux'
import axios from 'axios';
import {port} from '../config/configAPI';
let md5=require('md5');
const validateMessages = {
    types: {
      number:'số điện thoại không hợp lệ',
      email: 'email không hợp lệ!'
    },
    
};


class dangnhap extends Component {

    constructor(props){
        super(props);
    }

    dangNhap=(values)=>{
        const user={
            Email:values.email,
            Password:md5(values.password)
        }
        axios({
            method:"POST",
            url:`http://localhost:${port}/api/dangnhap`,
            data:user
        }).then(res=>{
            console.log(res.data);
            if(res.data.message)
            {
                message.error('Tài khoản hoặc mật khẩu không chính xác !');
            }
            else{
                message.success('Đăng nhập thành công !');
                let roles = res.data.user[0].isAdmin;
                if(roles===1)
                {
                    sessionStorage.setItem('admintoken',res.data.token);
                    sessionStorage.setItem('userinfo',JSON.stringify(res.data.user[0]));
                    this.props.luuThongTinNguoiDung(res.data.user[0]);
                    this.props.history.push('/admin');
                }
                else
                {
                    sessionStorage.setItem('usertoken',res.data.token);
                    sessionStorage.setItem('userinfo',JSON.stringify(res.data.user[0]));
                    this.props.luuThongTinNguoiDung(res.data.user[0]);
                    this.props.history.push('/');
                }
            }
            
        })
        .catch(err=>console.log(err));

    }


   
    
    render() {
        return (
            <Row>
                <Col span={8}></Col>
                <Col span={8} className="dangnhap">
                    <h1 className="center">ĐĂNG NHẬP</h1>
                    <Form
                    size="large"
                    name="normal_login"
                    className="login-form"
                    validateMessages={validateMessages}
                    initialValues={{ remember: true }}
                    onFinish={this.dangNhap}
                    >
                    <Form.Item
                        name="email"
                        rules={[{ required:true,message:'Nhập email !', type: 'email' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Nhập mật khẩu!' }]}
                    >
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Mật Khẩu"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Lưu đăng nhập</Checkbox>
                        </Form.Item>

                        <Link to='/quenmatkhau'>Quên mật khẩu ?</Link>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        Đăng nhập
                        </Button>
                        hoặc <Link to='/dangky'>Đăng ký ngay!</Link>
                    </Form.Item>
                    </Form>
                </Col>
                <Col span={8}></Col>
            </Row>
        )}
}

const mapStateToProps=(state)=>{
    return{
        DanhSachNguoiDung:state.DSND.DSND
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        isAdminLogin:()=>{
            dispatch(actAdminDangNhap())
        },
        userLogin:(user)=>{
            dispatch(actUserLogin(user))
        },
        setUserLogin:()=>{
            dispatch(actSetUserLogIn())
        },
        luuThongTinNguoiDung:(user)=>{
            dispatch(actLuuThongTinNguoiDung(user))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(dangnhap);