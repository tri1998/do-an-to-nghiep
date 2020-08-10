import React, { Component } from 'react'
import {
    Row,
    Col,
    Form,
    Input,
    Button,
    Avatar,
    message
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import {port} from '../config/configAPI';
import {connect} from 'react-redux'
import {
    actCapNhatThongTin
} from '../redux/actions/nguoidung'
let md5 = require('md5');
class ThongTinNguoiDung extends Component {
    constructor(props){
        super(props);
        this.state={
            user:null,
            option:1
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
        .then(res=>{
            message.success('Cập nhật thông tin thành công !');
            this.props.capNhatThongTin(capNhatUser);
            this.setState({option:1})
        })
        .catch(err=>console.log(err))
    }

    capNhatMatKhau = (values)=>{
        const password = {
            MatKhauCu:md5(values.MatKhauCu),
            MatKhauMoi1:md5(values.MatKhauMoi1),
            MatKhauMoi2:md5(values.MatKhauMoi2)
        }
        if(password.MatKhauMoi1!==password.MatKhauMoi2)
        {
            message.error('Nhập lại mật khẩu không trùng khớp !')
        }
        else
        {
            axios({
                method:"PUT",
                url:`http://localhost:${port}/taikhoan/capnhatmatkhau`,
                headers:{
                'Content-Type':'application/json',
                'access-token':sessionStorage.getItem('usertoken')},
                data:password
            })
            .then(res=>{
                if(res.data.message==='token khong hop le'||res.data.message==='Chua cung cap token.')
                {
                    message.error('Cập nhật mật khẩu thất bại !')
                }
                if(res.data.messageWarrning)
                {
                    message.warning(res.data.messageWarrning);
                }
                if(res.data.messageSuccess)
                {
                    message.success(res.data.messageSuccess);
                    this.setState({option:1})
                }
                if(res.data.messageError)
                {
                    message.error(res.data.messageError);
                }
            })
            .catch(err=>console.log(err));
        }


    }

    render() {
        let user = this.props.nguoiDung;
        console.log(user);
        return (
            <div>
                {user===null
                ?<div></div>
                :<Row>

                    <Col span={8}></Col>
                    {this.state.option===1?<Col span={8} style={{textAlign:'center'}}>
                        <Avatar size={64} shape="square" icon={<UserOutlined/>}/>
                        <h1>{user.HoTen}</h1>
                        <Row gutter={[0,8]}>
                            <Col span={24}>
                                <Button
                                 onClick={()=>this.setState({option:2})}
                                 size="large"
                                 type="primary"
                                 block
                                >Cập Nhật Thông Tin</Button>
                            </Col>
                            <Col span={24}>
                                <Button
                                onClick={()=>this.setState({option:3})}
                                size="large"
                                type="primary"
                                block
                                danger
                                >Thay Đổi Mật Khẩu</Button>
                            </Col>
                        </Row>
                    </Col>:null}


                    {this.state.option===2?<Col span={8}>
                        <Col span={24} style={{textAlign:'center'}}>
                            <h1>THÔNG TIN NGƯỜI DÙNG</h1>
                        </Col>
                        <Form
                            
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
                            rules={[
                                {required: true, message: 'Please input your Username!' },
                                {message: 'số điện thoại không đúng !',pattern:'[0-9]{10,11}'}
                            ]}
                            initialValue={user.SDT}
                            >
                                <Input maxLength={11} size="large" style={{width:'100%'}}/>
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


                        </Form>
                                    <Button
                                    onClick={()=>this.setState({option:1})}
                                    type="primary" 
                                    block
                                    style={{borderRadius:'5px',marginTop:'5px'}} 
                                    >
                                        Quay Lại
                                    </Button>
                        </Col>:null}

                        {this.state.option===3?
                        <Col span={8}>
                            <h1 style={{textAlign:'center'}}>THAY ĐỔI MẬT KHẨU</h1>
                            <Form
                            
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={this.capNhatMatKhau}
                        >

                            <Col span={24}>Mật khẩu cũ :</Col>
                            <Form.Item
                            name="MatKhauCu"
                            rules={[
                                { required: true, message: 'Nhập mật khẩu cũ !' },
                                {message:'Mật khẩu trên 8 kí tự bao gồm số, chữ hoa, chữ thường !',pattern:'(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})'}
                            ]}
                            >

                                <Input.Password placeholder="Nhập mật khẩu cũ" size="large" style={{width:'100%'}}/>
                            </Form.Item>

                            <Col span={24}>Mật khẩu mới :</Col>
                            <Form.Item
                            name="MatKhauMoi1"
                            rules={[
                                { required: true, message: 'Nhập mật khẩu mới !' },
                                {message:'Mật khẩu trên 8 kí tự bao gồm số, chữ hoa, chữ thường !',pattern:'(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})'}
                            ]}
                            >

                                <Input.Password placeholder="Nhập mật khẩu mới" size="large" style={{width:'100%'}}/>
                            </Form.Item>

                            <Col span={24}>Nhập lại khẩu mới :</Col>
                            <Form.Item
                            name="MatKhauMoi2"
                            rules={[
                                { required: true, message: 'Nhập lại mật khẩu mới !' },
                                {message:'Mật khẩu trên 8 kí tự bao gồm số, chữ hoa, chữ thường !',pattern:'(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})'}
                            ]}
                            >

                                <Input.Password  placeholder="Nhập lại mật khẩu mới" size="large" style={{width:'100%'}}/>
                            </Form.Item>

                                <Button 
                                type="primary" 
                                danger
                                block
                                htmlType="submit"
                                style={{borderRadius:'5px'}} 
                                >
                                    Cập Nhật Mật Khẩu
                                </Button>

                                

                        </Form>
                            <Button
                                onClick={()=>this.setState({option:1})}
                                type="primary" 
                                block
                                style={{borderRadius:'5px',marginTop:'5px'}} 
                                >
                                    Quay Lại
                            </Button>
                        </Col>:null}


                    <Col span={8}></Col>




                    
                        
                        
                        
                       
                        
                            
                        
                    
                </Row>}
                
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        nguoiDung:state.DSND.UserInformation
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        capNhatThongTin:(nguoiDung)=>{
            dispatch(actCapNhatThongTin(nguoiDung))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ThongTinNguoiDung);
