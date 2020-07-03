import React, { Component } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2'
import {actAdminDangNhap,actUserLogin,actSetUserLogIn} from '../redux/actions/nguoidung'
import {connect} from 'react-redux'
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

    kiemTraDangNhap=(email,matkhau)=>{
        let index = this.props.DanhSachNguoiDung.findIndex(
            nguoidung=>nguoidung.Email===email&&nguoidung.MatKhau===matkhau
        )
        if(index!==-1){
            return true;
        }
        else return false;
    }

    isAdmin=(email)=>{
        let index = this.props.DanhSachNguoiDung.findIndex(nguoidung=>nguoidung.Email===email&&nguoidung.isAdmin===1)
        if(index===-1)
        {
            return 0;
        }else return 1;
    }
    
    onFinish = (values) =>{
        const user = {
            Email:values.email,
            MatKhau:md5(values.password)
        };
        if(this.kiemTraDangNhap(user.Email,user.MatKhau)===true)
        {
            if(this.isAdmin(user.Email)===1)
            {
                console.log('day la tai khoan admin');
                this.props.isAdminLogin();

                localStorage.setItem('email',user.Email);
                setTimeout(()=>Swal.fire(
                    '',
                    'Đăng Nhập Thành Công !',
                    'success'
                ),1)
                setTimeout(()=>this.props.history.push('/admin'),1);
            }
            if(this.isAdmin(user.Email)===0)
            {
                let userLogIn=this.props.DanhSachNguoiDung.find(nd=>nd.Email===user.Email);
                this.props.userLogin(userLogIn);
                localStorage.setItem('user',true);
                this.props.setUserLogin();
                console.log(userLogIn);
                console.log('day la tai khoan user');
                setTimeout(()=>Swal.fire(
                    '',
                    'Đăng Nhập Thành Công !',
                    'success'
                ),1000)
                setTimeout(()=>this.props.history.push('/'),2000);
            }
        }
        else setTimeout(()=>Swal.fire(
            'Rất tiếc',
            'Bạn đã nhập sai tên tài khoản hoặc mật khẩu',
            'error'
        ),1000)
        
        

        
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
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
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

                        <a className="login-form-forgot" href="">
                        Quên mật khẩu ?
                        </a>
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
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(dangnhap);