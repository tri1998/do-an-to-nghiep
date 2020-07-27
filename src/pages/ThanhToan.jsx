import React, { Component } from 'react'
import {
    Row,
    Col,
    Form,
    Input,
    Select,
    Radio,
    Button
} from 'antd';
import {
    CarOutlined,
    LeftOutlined
} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
const {Option} = Select;

class ThanhToan extends Component {

    constructor(props){
        super(props);
        this.state={
            idTinh:undefined,
            option:'tỉnh / thành',
            tinhThanh:[],
            idQuanHuyen:undefined,
            quanHuyen:[],
            phuongXa:[],
            radioOption:1,
            gioHang:sessionStorage.getItem('giohang')
        }
    }

    hoanTatDonHang=(values)=>{
        console.log(values);
    }

    componentDidMount(){
        axios({
            method:"GET",
            url:"https://cors-anywhere.herokuapp.com/https://thongtindoanhnghiep.co/api/city",
            
        })
        .then(res=>this.setState({tinhThanh:res.data.LtsItem}))
        .catch(err=>console.log(err))
    }


    chonQuanHuyen=(id)=>{
        axios({
            method:"GET",
            url:`https://cors-anywhere.herokuapp.com/https://thongtindoanhnghiep.co/api/city/${id}/district`,
            
        })
        .then(res=>this.setState({quanHuyen:res.data}))
        .catch(err=>console.log(err))
    }

    chonPhuongXa=(id)=>{
        axios({
            method:"GET",
            url:`https://cors-anywhere.herokuapp.com/https://thongtindoanhnghiep.co/api/district/${id}/ward`,
            
        })
        .then(res=>this.setState({phuongXa:res.data}))
        .catch(err=>console.log(err))
    }

    handleChangeTinh=(value)=> {
        this.setState({
            option:'quận / huyện',
            idTinh:parseInt(value)
        })
    }

    handleChangeQuanHuyen=(value)=>{
        this.setState({
            idQuanHuyen:parseInt(value)
        })
    }

    onChangeRadio = e => {
        console.log('radio checked', e.target.value);
        this.setState({
          radioOption: e.target.value,
        });
      };

    render() {
        const {tinhThanh,quanHuyen,phuongXa,option,gioHang} = this.state;
        let {tongTien,mangSanPham }= this.props;
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return (
            <div>
                <Row>
                    <Col span={14}>
                        <Row>
                            <Col span={4}></Col>
                            <Col span={18}>
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
                                                rules={[{ required: true, message: 'Chọn tỉnh thành !' }]}
                                            >
                                                <Select 
                                                    onChange={this.handleChangeTinh} 
                                                    placeholder="Chọn tỉnh / thành" 
                                                    style={{ width: '100%' }}
                                                >
                                                    {
                                                        tinhThanh.map((tt,index)=>{
                                                            return <Option key={index} value={tt.ID}>{tt.Title}</Option>
                                                        })
                                                    }
                                                </Select>
                                            </Form.Item>
                                        </Col>

                                        <Col span={8}>
                                            <Form.Item
                                            
                                                name="QuanHuyen"
                                                rules={[{ required: true, message: 'Chọn quận / huyện !' }]}
                                            >
                                                <Select 
                                                onChange={this.handleChangeQuanHuyen} 
                                                placeholder="Chọn quận / huyện" 
                                                onClick={
                                                ()=>this.chonQuanHuyen(this.state.idTinh)} style={{ width: '100%' }}
                                                >
                                                    {
                                                        quanHuyen.map((qh,index)=>{
                                                            return <Option key={index} value={qh.ID}>{qh.Title}</Option>
                                                        })
                                                    }
                                                </Select>
                                                
                                            </Form.Item>
                                        </Col>

                                        <Col span={8}>
                                            <Form.Item
                                                name="PhuongXa"
                                                rules={[{ required: true, message: 'Chọn phường / xã ' }]}
                                            >
                                                <Select 
                                                    onClick={()=>this.chonPhuongXa(this.state.idQuanHuyen)} 
                                                    placeholder="Chọn phường / xã" style={{ width: '100%' }}
                                                >
                                                    {
                                                        phuongXa.map((px,index)=>{
                                                            return <Option key={index} value={px.ID}>{px.Title}</Option>
                                                        })
                                                    }
                                                </Select>
                                            </Form.Item>
                                        </Col>

                                    </Row>
                                    <h2 style={{marginBottom:20,fontWeight:400}}>Phương thức vận chuyển</h2>
                                    <div className="vanChuyen">
                                        <CarOutlined style={{fontSize:'75px'}} />
                                        <h3>Vui lòng chọn {option} để có phương thức vận chuyển</h3>
                                    </div>

                                    <h2 style={{marginBottom:25,fontWeight:400}}>Phương thức thanh toán</h2>
                                    <Radio.Group size="large" onChange={this.onChangeRadio} value={this.state.radioOption}>
                                        <Radio style={radioStyle} value={1}>Thanh toán khi giao hàng(COD)</Radio>
                                        <Radio style={radioStyle} value={2}>Chuyển khoản ngân hàng</Radio>
                                    </Radio.Group>

                                    <Row style={{marginTop:25,marginBottom:'50px'}}>
                                        <Col span={3} style={{textAlign:"left"}}>
                                            <Link to="/giohang"><LeftOutlined />Giỏ hàng</Link>
                                        </Col>
                                        <Col span={21} style={{textAlign:"right"}}>
                                            <Button
                                                size="large"
                                                type="primary" 
                                                style={{borderRadius:'5px'}} 
                                            >Hoàn Tất Đơn Hàng</Button>
                                        </Col>
                                    </Row>
                                    <hr style={{border:'solid 0.5px lavender'}}/>

                                </Form>
                            </Col>
                            <Col span={2}></Col>
                        </Row>
                    </Col>
                    <Col className="checkoutright" span={10}>
                        <Row style={{marginTop:'50px'}}>
                            <Col span={2}></Col>
                            <Col span={16}>
                                {
                                    mangSanPham.map((sanPham,index)=>{
                                        return <Row key={index} style={{marginBottom:'20px'}}>
                                                <Col span={5}>
                                                    <div className="sanphamthumbnail">
                                                        <div className="sanphamthumbnail-wrapper">
                                                            <img className="sanphamthumbnail-img" src={sanPham.Hinh} alt={sanPham.TenSP}/>
                                                        </div>
                                                        <span className="sanphamthumbnail-soluong">{sanPham.SoLuong}</span>
                                                    </div>
                                                </Col>
                                                <Col span={15} style={{paddingTop:20}}>{sanPham.TenSP}</Col>
                                                <Col span={4}  style={{paddingTop:20}}>{sanPham.Gia.toLocaleString('vn-VN', {style : 'currency', currency : 'VND'})}</Col>
                                            </Row>
                                    })
                                }

                                <hr style={{border:'solid 0.5px gainsboro'}}/>
                                <Row style={{marginTop:'25px'}}>
                                    <Col span={12}>Tạm tính</Col>
                                    <Col span={12} style={{textAlign:'right'}}>
                                        {tongTien.toLocaleString('vn-VN', {style : 'currency', currency : 'VND'})}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>Phí vận chuyển</Col>
                                    <Col span={12} style={{textAlign:'right'}}>---</Col>
                                </Row>
                                <hr style={{border:'solid 0.5px gainsboro'}}/>
                                <Row style={{marginTop:'25px'}}>
                                    <Col span={12}>
                                        <span className="tongCong">Tổng cộng</span>
                                    </Col>
                                    <Col span={12} style={{textAlign:'right'}}>
                                            <span className="VND">VND</span>
                                            <span className="thanhToanTongTien">
                                                {tongTien.toLocaleString('vn-VN', {style : 'currency', currency : 'VND'})}
                                            </span>    
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={6}></Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        mangSanPham:state.DSSPMua.mangSanPham,
        tongTien:state.DSSPMua.tongTien
    }
}

export default connect(mapStateToProps,null)(ThanhToan);
