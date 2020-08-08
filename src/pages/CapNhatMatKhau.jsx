import React, { Component } from 'react'
import {Row,Col,Form,Input,Button} from 'antd'
import { LockOutlined,SafetyOutlined,UserOutlined} from '@ant-design/icons';
import {connect} from 'react-redux'
import {actUpdatePassWordUser} from '../redux/actions/nguoidung'
import Swal from 'sweetalert2'
let md5=require('md5');

class CapNhatMatKhau extends Component {

    capNhat=(values)=>{
        const USER = {
            Email:values.Email,
            password1:md5(values.password1),
            password2:md5(values.password2),
            OTP:values.OTP
        }
        let index = this.props.userCapNhat.findIndex(user=>user.OTP===USER.OTP);
        if(index===-1)
        {
            Swal.fire(
                'Lỗi',
                'Bạn đã nhập sai mã OTP, xin mời nhập lại !',
                'error'
            )
        }
        else{
            if(values.password1===values.password2)
            {
                this.props.updatePassword(USER);
                Swal.fire(
                    'Chúc mừng !',
                    'Bạn đã cập nhật mật khẩu thành công',
                    'success'
                );
                this.props.history.push('/dangnhap');
            }
            else {
                Swal.fire(
                    'Lỗi',
                    'Nhập lại mật khẩu không trùng khớp',
                    'error'
                )
            }
            
        }
    }

    render() {
        console.log(this.props.userCapNhat);
        return (
            <div>
                <Row>
                    <Col span={8}></Col>
                    <Col span={8} className="dangnhap">
                        <h1 className="center">CẬP NHẬT MẬT KHẨU</h1>
                        <Form
                        size="large"
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.capNhat}
                        >
                        
                        <Form.Item
                            name="Email"
                            rules={[{ required:true,message:'Nhập email !' }]}
                            initialValue={this.props.match.params.email}
                        >
                            <Input disabled prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nhập mật khẩu mới" />
                        </Form.Item>

                        <Form.Item
                            name="password1"
                            rules={[{ required:true,message:'Nhập mật khẩu mới !' }]}
                        >
                            <Input type="password" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Nhập mật khẩu mới" />
                        </Form.Item>

                        <Form.Item
                            name="password2"
                            rules={[{ required:true,message:'Nhập lại mật khẩu mới !'}]}
                            
                        >
                            <Input type="password" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Nhập lại mật khẩu mới" />
                        </Form.Item>

                        <Form.Item
                            name="OTP"
                            rules={[{ required:true,message:'Nhập mã OTP !' }]}
                            
                        >
                            <Input prefix={<SafetyOutlined className="site-form-item-icon" />} placeholder="Nhập mã OTP" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Cập nhật
                            </Button>
                        </Form.Item>
                        </Form>
                    </Col>
                    <Col span={8}></Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        userCapNhat: state.DSND.userUpdatePassword
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        updatePassword:(user)=>{
            dispatch(actUpdatePassWordUser(user))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CapNhatMatKhau)
