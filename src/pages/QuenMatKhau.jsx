import React, { Component } from 'react'
import {Row,Col,Form,Input,Button} from 'antd'
import {Link} from 'react-router-dom';
import { UserOutlined} from '@ant-design/icons';
import {connect} from 'react-redux';
import Swal from 'sweetalert2'
import {actUpdateUserPassword} from '../redux/actions/nguoidung'
const validateMessages = {
    types: {
      number:'số điện thoại không hợp lệ',
      email: 'email không hợp lệ!'
    },
    
};

class QuenMatKhau extends Component {

    onFinish = (values)=>{
        let checkEmail = this.props.DanhSachNguoiDung.findIndex(nd=>nd.Email===values.Email);
        checkEmail ===-1
        ?Swal.fire(
            'Lỗi !',
            'Email bạn nhập chưa đăng ký tài khoản trên hệ thống !',
            'error'
        )
        :(Swal.fire(
            'Thành công !',
            'Đã gửi mã xác thực vào email của bạn !',
            'success'
        ));
        if (checkEmail!==-1)
        {
            let soLuong = this.props.UpdatePassword.length;
            const userUpdatePassword = {
                STT:soLuong+1,
                Email:values.Email,
                YeuCau:'Cập nhật mật khẩu !',
                OTP:''
            }
            let vitri = this.props.UpdatePassword.findIndex(user=>user.Email===userUpdatePassword.Email);
            if(vitri!==-1){
                alert('Người dùng này đã có mã OTP');
            }
            else
            {
                this.props.nguoiDungCapNhatPW(userUpdatePassword);
            }
            this.props.history.push(`/capnhatmatkhau/${userUpdatePassword.Email}`);
            
        }
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

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                            Gửi
                            </Button>
                            hoặc <Link to='/dangnhap'>Quay lại</Link>
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
