import React, { Component } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
import {Link} from 'react-router-dom';

export default class dangnhap extends Component {
    
        onFinish = values =>{
            console.log('Received values of form: ', values);
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
                    onFinish={this.onFinish.bind(this)}
                    >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Nhập tài khoản!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tài khoản" />
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
