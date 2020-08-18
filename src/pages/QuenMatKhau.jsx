import React, { Component } from 'react'
import {Row,Col,Form,Input,Button,message} from 'antd'
import {Link} from 'react-router-dom';
import { UserOutlined} from '@ant-design/icons';
import {connect} from 'react-redux';
import Swal from 'sweetalert2'
import axios from 'axios';
import {port} from '../config/configAPI';
import {actUpdateUserPassword} from '../redux/actions/nguoidung'
const validateMessages = {
    types: {
      number:'số điện thoại không hợp lệ',
      email: 'email không hợp lệ!'
    },
    
};

class QuenMatKhau extends Component {

    onFinish = (values)=>{
        axios({
            method:'GET',
            url:`http://localhost:${port}/api/taikhoan/layMatKhau/${values.Email}`
        })
        .then(res=>{
            if(res.data.messageErr)
            {
                message.error(res.data.messageErr);
            }
            else{
                message.success(res.data.MaTK);
            }
        })
        .catch(err=>console.log(err))
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={8}></Col>
                    <Col span={8} className="dangnhap">
                        <h1 className="center">QUÊN MẬT KHẨU ?</h1>
                        <Form
                        size="large"
                        name="normal_login"
                        className="login-form"
                        validateMessages={validateMessages}
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                        >
                        <Form.Item
                            name="Email"
                            rules={[{ required:true,message:'Nhập email !', type: 'email' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                        </Form.Item>

                        
                        <Button 
                        type="primary" 
                        htmlType="submit" 
                        className="login-form-button"
                        block
                        >
                        Gửi
                        </Button>
                        <Link to='/dangnhap'>
                            <Button
                            style={{marginTop:5}}
                            block
                            type="dashed"
                            danger
                            >
                                Quay Lại
                            </Button>
                        </Link>
                        
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
        DanhSachNguoiDung:state.DSND.DSND,
        UpdatePassword:state.DSND.userUpdatePassword
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        nguoiDungCapNhatPW:(email)=>{
            dispatch(actUpdateUserPassword(email))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(QuenMatKhau)
