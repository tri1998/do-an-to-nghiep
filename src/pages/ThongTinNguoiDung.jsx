import React, { Component } from 'react'
import {
    Row,
    Col,
    Form,
    Input,
    Button
} from 'antd';
import axios from 'axios';
import {port} from '../config/configAPI';

export default class ThongTinNguoiDung extends Component {
    constructor(props){
        super(props);
        this.state={
            user:null
        }
    }

    onFinish=(values)=>{
        console.log(values)
        const capNhatUser = {
            HoTen:values.HoTen,
            SDT:values.SDT,
            DiaChi:values.DiaChi
        }

        axios({
            method:"PUT",
            url:`http://localhost:${port}/taikhoan/capnhatnguoidung`,
            headers:{
                'Content-Type':'application/json',
                'access-token':sessionStorage.getItem('usertoken')
            },
            data:capNhatUser
        })
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err))
    }

    componentDidMount(){
        axios({
            method:"GET",
            url:`http://localhost:${port}/taikhoan/laythongtinnguoidung`,
            headers:{
                'Content-Type':'application/json',
                'access-token':sessionStorage.getItem('usertoken')
            }
        })
        .then(res=>this.setState({user:res.data[0]}))
        .catch(err=>console.log(err))
    }
    render() {
        let user = this.state.user;
        return (
            <div>
                <Row>
                    <Col span={24} style={{textAlign:'center'}}>
                        <h1>THÔNG TIN NGƯỜI DÙNG</h1>
                    </Col>
                   
                        <Col span={8}></Col>
                        <Col span={8}>
                        {user!=null?<Form
                            
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={this.onFinish}
                        >
                            <Col span={24}>Email :</Col>
                            <Form.Item
                            name="Email"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                            initialValue={user.Email}
                            >

                                <Input disabled size="large" style={{width:'100%'}}/>
                            </Form.Item>

                            <Col span={24}>Họ và tên :</Col>
                            <Form.Item
                            
                            name="HoTen"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                            initialValue={user.HoTen}
                            >
                                <Input size="large" style={{width:'100%'}}/>
                            </Form.Item>

                            <Col span={24}>Số điện thoại :</Col>
                            <Form.Item
                            
                            name="SDT"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                            initialValue={user.SDT}
                            >
                                <Input size="large" style={{width:'100%'}}/>
                            </Form.Item>

                            <Col span={24}>Địa chỉ :</Col>
                            <Form.Item
                            
                            name="DiaChi"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                            initialValue={user.DiaChi}
                            >
                                <Input placeholder="Nhập địa chỉ..." size="large" style={{width:'100%'}}/>
                            </Form.Item>
                            
                                <Button 
                                type="primary" 
                                danger
                                block
                                htmlType="submit"
                                style={{borderRadius:'5px'}} 
                                >
                                    Cập Nhật Thông Tin
                                </Button>

                        </Form>:null}
                        </Col>
                        <Col span={8}></Col>
                    
                </Row>
                
            </div>
        )
    }
}
