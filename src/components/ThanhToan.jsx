import React, { Component} from 'react'
import {
    Table,
    Form,
    Input,
    Button,
    Row,    
    Col,
    Radio,
}from 'antd'
import {connect} from 'react-redux'
import { UserOutlined, PhoneOutlined, MailOutlined, HomeOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom'
import Infobank from './infobank';
import axios from 'axios';
import {port} from '../config/configAPI';
import Swal from 'sweetalert2';
import { actThemHoaDon } from '../redux/actions/hoadon';

    const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not validate email!',
      number: '${label} is not a validate number!',
    },
    number: {
      range: '${label} must be ${10}',
    },
    };

    
    
class ThanhToan extends Component {
    state = {
        flag:false,
        value: 1,
        thanhTien:this.props.tongTien+45000
    };
    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
        });
      };
      columns = [
        {
          title: 'Sản phẩm',
          dataIndex: 'Hinh',
          key: 'Hinh',
          render:(text,record)=>(
            <Link to={`/${record.MaSP}`}><img className="hinhSPGioHang" src={record.Hinh} alt={record.TenSP}/></Link> 
          )
        },
        {
          title: 'Tên sản phẩm',
          dataIndex: 'TenSP',
          key: 'TenSP',
        },
        {
          title: 'Số lượng',
          dataIndex: 'SL',
          key: 'SL',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'Gia',
            key: 'Gia',
            
        },
      ];
        
      onFinish = (values) => {
        
        const hoadon = {
            MaHD:values.MaHD,
            MaTK: values.MaTK,
            HoTen: values.HoTen,
            SDT: values.sodienthoai,
            DiaChi: values.Diachi,
            ThanhTien: this.state.thanhTien
        }
        //let index = this.props.MangHD.findIndex(hoadon => hoadon.MaHD === hoadon.MaHD);
            
            axios.post(`http://localhost:${port}/api/hoadon/themhoadon`, hoadon)
                .then(res => {
                    setTimeout(() => Swal.fire(
                        'Chúc Mừng!',
                        'Bạn đã mua hàng thành công !',
                        'success'
                    ), 1000);
                })
                .catch(error => console.log(error));
                this.props.themHoaDon(hoadon);
                setTimeout(() => this.props.history.push('/trangchu'), 2000);
    }
    
 
    render() {

        const { value } = this.state;
        let mahd = this.props.mangHD.length;    
        console.log(this.props.nguoidungLogin);  
           
        let data = this.props.danhSachSanPham;
        return (
            
            <div>
                { this.props.mangHD.length !== 0 ?(
                <Row>
                    <Col span={14}>
                        <div className="left">
                            <div className="section">
                                <Form 
                                size="large"
                                className="frmThongTinTT"
                                onFinish={this.onFinish}
                                >
                                    <Row>
                                        <Col span={24}><h1 className="tieude">TTG Shop</h1></Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}><h2>Thông tin giao hàng</h2></Col>
                                    </Row>
                                    <Form.Item
                                    hidden={true}
                                    initialValue={`HD${mahd}`}
                                    name="MaHD"
                                    >
                                    <Input />
                                    </Form.Item>
                                    <Form.Item
                                    hidden={true}
                                    initialValue={this.props.nguoidungLogin===false?'':this.props.nguoidungLogin.MaTK}
                                    name="MaTK"
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                    name="HoTen"
                                    initialValue={this.props.nguoidungLogin===false?'':this.props.nguoidungLogin.HoTen}
                                    rules={[{ required: true, message: 'Hãy nhập họ và tên!'}]}
                                    >
                                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Họ và Tên" />
                                    </Form.Item>
                                    <Row>
                                        <Col span={18}>
                                            <Form.Item
                                            name="Email"
                                            initialValue={this.props.nguoidungLogin===false?'':this.props.nguoidungLogin.Email}
                                            rules={[{type: 'email',required: true,message:'Hãy nhập email!'}]}
                                            >
                                                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                            name="sodienthoai"
                                            initialValue={this.props.nguoidungLogin===false?'':this.props.nguoidungLogin.SDT}
                                            rules={[{required: true, message: 'SĐT là dãy gồm 10 số!', min:9, max:9}]}
                                            >
                                                <Input type="number" message= "Số điện thoại không hợp lệ" prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder="Số điện thoại" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Form.Item
                                    name="Diachi"
                                    rules={[{ required: true, message: 'Hãy nhập địa chỉ!'}]}
                                    >
                                            <Input prefix={<HomeOutlined className="site-form-item-icon" />} placeholder="Địa chỉ" />
                                    </Form.Item>
                                    {/* <Form.Item >
                                    <Cascader
                                        options={[
                                        {
                                            value: 'asdasda',
                                            label: 'asdasdas',
                                            children: [
                                            {
                                                value: 'hangzhou',
                                                label: 'Hangzhou',
                                            },
                                            ],
                                        },
                                        ]}
                                    
                                        placeholder="Tỉnh/Thành phố"/>
                                    </Form.Item> */}
                                    <Row>
                                        <Col span={24}><h2>Phương thức thanh toán</h2></Col>
                                    </Row>
                                    <div className="content-box">
                                    <Radio.Group onChange={this.onChange} value={value} style={{width:"100%"}}>
                                        <Col span={24} className="box">
                                            <Radio value={1} onClick={()=>this.setState({flag:false})}>
                                            Thanh toán khi giao hàng (COD).
                                            </Radio>
                                        </Col>
                                        <Col span={24} className="box">
                                            <Radio value={2} onClick={()=>this.setState({flag:true})}>
                                            Chuyển khoản qua ngân hàng.
                                            </Radio>
                                        </Col>
                                        
                                        {
                                        this.state.flag === false ?'':<Infobank></Infobank>
                                        } 
                                        
                                    </Radio.Group>
                                    </div>
                                    <Form.Item>
                                        <Button className="btnThanhtoan" type="primary" htmlType="submit">
                                        Hoàn tất đơn hàng
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </Col>
                    
                    <Col span={10} className="right">
                        <div className="right">
                            <Col span={24}>
                                <Table
                                columns={this.columns}
                                dataSource={data}
                                rowKey={record=>record.TenSP}>
                                </Table>
                            </Col>
                            <hr/>
                            <Row>
                                <h2>Tạm tính: </h2  >
                                <h2 className="price">{this.props.tongTien.toLocaleString('vn-VN', {style : 'currency', currency : 'VND'})}</h2>
                            </Row>
                            <Row>
                                <h2>Phí vận chuyển: </h2>
                                <h2 className="price">45.000 &#8363;</h2>
                            </Row>
                            <hr/>
                            <Row>
                            <h1>Tổng cộng: </h1>
                                <h2 className="price">{this.state.thanhTien.toLocaleString('vn-VN', {style : 'currency', currency : 'VND'})}</h2>
                            </Row>
                        </div>
                    </Col>
                </Row> ) : null}
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return{
        danhSachSanPham:state.DSSPMua.mangSanPham,
        tongTien:state.DSSPMua.tongTien,
        mangHD:state.DSHoaDon.DSHD,
        nguoidungLogin:state.DSND.userLogin
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        themHoaDon:(hd)=>{
            dispatch(actThemHoaDon(hd))
        },
        
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ThanhToan);