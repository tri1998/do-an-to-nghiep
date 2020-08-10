import React, { Component } from 'react'
import {
    Button,
    Tooltip,
    Modal,
    Form,
    Input,
    message
} from 'antd';
import axios from 'axios'
import {port} from '../config/configAPI';
let md5 = require('md5');
export default class AdminDoiMatKhau extends Component {
    constructor(props) {
        super(props);
        this.state = {
          visible: false,
        };
    
      }
    showModal = () => {
        this.setState({
          visible: true,
        })
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
          visible: false,
        });
      };

    thayDoiMatKhau=(values)=>{
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
              'access-token':sessionStorage.getItem('admintoken')},
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
                  this.setState({visible:false})
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
        const {visible} = this.state
        return (
            <div>
                <Button
                 type="primary"
                 style={{marginRight:'5px'}}
                 onClick={this.showModal}
                 danger
                 size="large"
                >
                    Đổi mật khẩu
                </Button>
                <Modal
                    title="THAY ĐỔI MẬT KHẨU"
                    visible={visible}
                    onCancel={this.handleCancel}
                    destroyOnClose={true}
                >
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.thayDoiMatKhau}
                    >
                        Mật khẩu cũ
            <Form.Item
                            name="MatKhauCu"
                            rules={[
                                { required: true, message: 'Nhập mật khẩu cũ !' },
                                { message: 'Mật khẩu trên 8 kí tự bao gồm số, chữ hoa, chữ thường !', pattern: '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})' }
                            ]}
                        >

                            <Input.Password placeholder="Nhập mật khẩu cũ" size="large" style={{ width: '100%' }} />
                        </Form.Item>

            Mật khẩu mới :
            <Form.Item
                            name="MatKhauMoi1"
                            rules={[
                                { required: true, message: 'Nhập mật khẩu mới !' },
                                { message: 'Mật khẩu trên 8 kí tự bao gồm số, chữ hoa, chữ thường !', pattern: '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})' }
                            ]}
                        >

                            <Input.Password placeholder="Nhập mật khẩu mới" size="large" style={{ width: '100%' }} />
                        </Form.Item>

            Nhập lại khẩu mới :
            <Form.Item
                            name="MatKhauMoi2"
                            rules={[
                                { required: true, message: 'Nhập lại mật khẩu mới !' },
                                { message: 'Mật khẩu trên 8 kí tự bao gồm số, chữ hoa, chữ thường !', pattern: '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})' }
                            ]}
                        >

                            <Input.Password placeholder="Nhập lại mật khẩu mới" size="large" style={{ width: '100%' }} />
                        </Form.Item>

                        <Button
                            type="primary"
                            danger
                            block
                            htmlType="submit"
                            style={{ borderRadius: '5px' }}
                        >
                            Cập Nhật Mật Khẩu
                </Button>
                    </Form>
                </Modal>
            </div>
        )
    }
}
