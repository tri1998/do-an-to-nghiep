import React, { Component } from 'react'
import {
    Row,
    Col,
    Form,
    Input,
    Select,
} from 'antd';
import {Link} from 'react-router-dom';
import axios from 'axios';
const {Option} = Select;

export default class ThanhToan extends Component {

    constructor(props){
        super(props);
        this.state={
            tinhThanh:[]
        }
    }

    hoanTatDonHang=(values)=>{
        console.log(values);
    }


    chonTinhThanh=()=>{
        axios({
            method:"GET",
            url:"https://cors-anywhere.herokuapp.com/https://thongtindoanhnghiep.co/api/city",
            
        })
        .then(res=>this.setState({tinhThanh:res.data.LtsItem}))
        .catch(err=>console.log(err))
    }

    chonQuanHuyen=()=>{

    }

    render() {
        const {tinhThanh} = this.state;
        return (
            <div>
                <Row>
                    <Col span={14}>
                        <Row>
                            <Col span={4}></Col>
                            <Col span={16}>
                                <Link to=""><h1 style={{marginTop:50,fontWeight:"bold"}}>TTGSHOP</h1></Link>
                                <h4> <Link to="/giohang"> Giỏ hàng </Link> {'>'} Thông tin giao hàng </h4>
                                <h2 style={{marginTop:25,marginBottom:25,fontWeight:400}}>Thông tin giao hàng</h2>
                                <h3>Bạn đã có tài khoản ? <Link to="/dangnhap">Đăng nhập</Link></h3>
                                <Form
                                    name="frmThanhToan"
                                    className="login-form"
                                    initialValues={{ remember: true }}
                                    onFinish={this.hoanTatDonHang}
                                >
                                    <Form.Item
                                        name="HoTen"
                                        rules={[{ required: true, message: 'Nhập họ tên please...' }]}
                                    >
                                        <Input
                                            size="large"
                                            style={{width:'100%',borderRadius:5}}
                                            placeholder="Họ và tên"
                                        />
                                    </Form.Item>

                                    <Row gutter={[8]}>
                                        <Col span={16}>
                                            <Form.Item
                                                name="Email"
                                                rules={[{ required: true, message: 'Nhập email please...' }]}
                                            >
                                                <Input
                                                    size="large"
                                                    style={{width:'100%',borderRadius:5}}
                                                    placeholder="Email"
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col span={8}>
                                            <Form.Item
                                                name="SoDienThoai"
                                                rules={[{ required: true, message: 'Nhập số điện thoại please...' }]}
                                            >
                                                <Input
                                                    size="large"
                                                    style={{width:'100%',borderRadius:5}}
                                                    placeholder="Số điện thoại"
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Form.Item
                                        name="DiaChi"
                                        rules={[{ required: true, message: 'Nhập địa chỉ please...' }]}
                                    >
                                        <Input
                                            size="large"
                                            style={{width:'100%',borderRadius:5}}
                                            placeholder="Địa chỉ"
                                        />
                                    </Form.Item>

                                    <Row gutter={[8]}>
                                        <Col span={8}>
                                            <Form.Item
                                                name="TinhThanh"
                                                rules={[{ required: true, message: 'Nhập địa chỉ please...' }]}
                                            >
                                                <Select onClick={this.chonTinhThanh} placeholder="Chọn Tỉnh/Thành" style={{ width: '100%' }}>
                                                    {
                                                        tinhThanh.map((tt,index)=>{
                                                            return <Option key={index} value={tt.SolrID}>{tt.Title}</Option>
                                                        })
                                                    }
                                                </Select>
                                            </Form.Item>
                                        </Col>

                                        <Col span={8}>
                                            <Form.Item
                                                name="QuanHuyen"
                                                rules={[{ required: true, message: 'Nhập địa chỉ please...' }]}
                                            >
                                                <Select placeholder="Chọn Quận/Huyện" onClick={this.chonQuanHuyen} style={{ width: '100%' }}>
                                                    <Option value="jack">Jack</Option>
                                                    <Option value="lucy">Lucy</Option>
                                                    <Option value="disabled" disabled>
                                                        Disabled
                                                    </Option>
                                                    <Option value="Yiminghe">yiminghe</Option>
                                                </Select>
                                                
                                            </Form.Item>
                                        </Col>

                                        <Col span={8}>
                                            <Form.Item
                                                name="PhuongXa"
                                                rules={[{ required: true, message: 'Nhập địa chỉ please...' }]}
                                            >
                                                <Select defaultValue="lucy" style={{ width: '100%' }}>
                                                    <Option value="jack">Jack</Option>
                                                    <Option value="lucy">Lucy</Option>
                                                    <Option value="disabled" disabled>
                                                        Disabled
                                                    </Option>
                                                    <Option value="Yiminghe">yiminghe</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>

                                    </Row>

                                </Form>
                            </Col>
                            <Col span={2}>abc</Col>
                        </Row>
                    </Col>
                    <Col className="checkoutright" span={10}>
                        efg
                    </Col>
                </Row>
            </div>
        )
    }
}
