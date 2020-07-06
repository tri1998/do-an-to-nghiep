import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';
import { Row, Col } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { actThemTaiKhoan } from '../redux/actions/nguoidung'
import { connect } from 'react-redux'
import axios from 'axios'
let md5 = require('md5');
const validateMessages = {
    types: {
        number: 'số điện thoại không hợp lệ',
        email: 'email không hợp lệ!'
    },

};


class dangky extends Component {

    constructor(props) {
        super(props);
    }

    onFinish = (values) => {

        const newUser = {
            MaTK: values.MaTK,
            HoTen: values.HoTen,
            SDT: values.sodienthoai,
            Email: values.email,
            MatKhau: md5(values.password)
        }
        let index = this.props.MangNguoiDung.findIndex(nguoidung => nguoidung.Email === newUser.Email);
        console.log(newUser);
        console.log('index= ' + index);
        console.log(this.props.MangNguoiDung);
        if (index === -1) {
            this.props.themTaiKhoan(newUser);
            axios.post('http://localhost:5005/api/themtaikhoan', newUser)
                .then(res => {
                    setTimeout(() => Swal.fire(
                        'Chúc Mừng!',
                        'Bạn đã đăng ký thành công !',
                        'success'
                    ), 1000);
                    this.setState({ render: 1 })
                })
                .catch(error => console.log(error));
            setTimeout(() => this.props.history.push('/dangnhap'), 2000);
        }
        else setTimeout(() => Swal.fire(
            'Rất Tiếc!',
            'Email này đã tồn tại!',
            'error'
        ), 1000);



    }


    render() {
        let matk = this.props.MangNguoiDung.length;
        console.log(this.props.MangNguoiDung);
        return (
            <div>
                {this.props.MangNguoiDung.length !== 0 ?
                    (<Row>
                        <Col span={8}></Col>
                        <Col span={8} className="dangky">
                            <h1 className="center">ĐĂNG KÝ</h1>
                            <Form
                                size="large"
                                name="normal_login"
                                className="login-form"
                                initialValues={{ remember: true }}
                                onFinish={this.onFinish}
                                validateMessages={validateMessages}
                            >
                                <Form.Item
                                    hidden={true}
                                    initialValue={`TK${matk}`}
                                    name="MaTK"
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} />
                                </Form.Item>
                                <Form.Item
                                    name="HoTen"
                                    rules={[{ required: true, message: 'Nhập họ tên!'}]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Họ Tên" />
                                </Form.Item>

                                <Form.Item
                                    name="sodienthoai"
                                    rules={[{ required: true, message: 'số điện thoại không đúng !',pattern:'[0-9]{10,11}' }]}
                                >
                                    <Input prefix={<PhoneOutlined className="site-form-item-icon" />} type="number" placeholder="Số điện thoại" />
                                </Form.Item>

                                <Form.Item
                                    name="email"
                                    rules={[{ required: true, message: 'Nhập email !', type: 'email' }]}
                                >
                                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
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
                                    <Button type="danger" htmlType="submit" className="login-form-button">
                                        Đăng ký
                        </Button>
                                    <Link to='/dangnhap'>Quay lại</Link>
                                </Form.Item>
                            </Form>
                        </Col>
                        <Col span={8}></Col>
                    </Row>) : null}
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

