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
import Success from '../components/DatHangThanhCong.jsx';
import axios from 'axios';
import {connect} from 'react-redux';
import {port} from '../config/configAPI'
const {Option} = Select;

class ThanhToan extends Component {

    constructor(props){
        super(props);
        this.state={
            option:'tỉnh / thành',
            idTinh:undefined,
            tenTinh:'',
            tinhThanh:[],
            idQuanHuyen:undefined,
            quanHuyen:[],
            phuongXa:[],
            done:false,
            radioOption:1,
            gioHang:sessionStorage.getItem('giohang'),
            shipFee:0,
            hoaDon:undefined,
            soLuongHoaDon:0,
            thanhTien:0,
            TrangThaiThanhToan:''
        }
    }


    hoanTatDonHang=(values)=>{
        let mangSanPham = this.props.mangSanPham;
        let hoaDon = {
            MaHD:values.MaHD,
            MaTK:values.MaTK===""?"":values.MaTK,
            HoTen:values.HoTen,
            Email:values.Email,
            SDT:values.SoDienThoai,
            DiaChi:values.DiaChi,
            ThanhTien:this.props.tongTien+this.state.shipFee,
            PhuongThucTT:values.PhuongThucTT
        }
        axios({
            method:"POST",
            url:`http://localhost:${port}/api/hoadon/themHoaDon`,
            data:hoaDon  
        })
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err));

        for(let i=0;i<mangSanPham.length;i++){
            let sanPham=mangSanPham[i];
            sanPham={...sanPham,MaHD:hoaDon.MaHD}
            axios({
                method:"POST",
                url:`http://localhost:${port}/api/hoadon/themCTHD`,
                data:sanPham
            })
            .then(res=>console.log(res.data))
            .catch(err=>console.log(err));
        }

        this.setState({
            done:true,
            hoaDon:hoaDon
        })
    }

    componentDidMount(){
        console.log('tao chay 1 lan duy nhat');
        axios({
            method:"GET",
            url:`http://localhost:${port}/api/hoadon/laySoLuongHoaDon`, 
        })
        .then(res=>this.setState({soLuongHoaDon:res.data[0].SOLUONG}))
        .catch(err=>console.log(err))

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
            done:true,
            shipFee:35000,
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
        let {tinhThanh,quanHuyen,phuongXa,option,shipFee,soLuongHoaDon} = this.state;
        const phiShip=shipFee;
        let {tongTien,mangSanPham }= this.props;
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        const user = JSON.parse(sessionStorage.getItem('userinfo'));
        console.log(user);
        return (
            <div>
                <Row>
                    <Col xs={{span:24}} lg={{span:14}}>
                        <Row>
                            <Col span={4}></Col>
                            <Col span={18}>
                                <Link to=""><h1 style={{marginTop:50,fontWeight:"bold"}}>TTGSHOP</h1></Link>
                                {this.state.hoaDon===undefined?
                                <div>
                                    <h4> <Link to="/giohang"> Giỏ hàng </Link> {'>'} Thông tin giao hàng </h4>
                                    <h2 style={{marginTop:25,marginBottom:25,fontWeight:400}}>Thông tin giao hàng</h2>
                                    {user===null?<h3>Bạn đã có tài khoản ? <Link to="/dangnhap">Đăng nhập</Link></h3>:null}
                                    <Form
                                        name="frmThanhToan"
                                        className="login-form"
                                        initialValues={{ remember: true }}
                                        onFinish={this.hoanTatDonHang}
                                    >
                                        {soLuongHoaDon!==0?
                                        <Form.Item
                                            hidden={true}
                                            name="MaHD"
                                            shouldUpdate
                                            initialValue={`HD0${soLuongHoaDon+=1}`}
                                        >
                                            <Input
                                                disabled
                                                size="large"
                                                style={{width:'100%',borderRadius:5}}
                                                placeholder="Mã Hóa Đơn"
                                            />
                                        </Form.Item>:null}

                                        <Form.Item
                                            hidden={true}
                                            name="MaTK"
                                            shouldUpdate
                                            initialValue={user!==null?user.MaTK:""}
                                        >
                                            <Input
                                                disabled
                                                size="large"
                                                style={{width:'100%',borderRadius:5}}
                                                placeholder="Mã Hóa Đơn"
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="HoTen"
                                            rules={[{ required: true, message: 'Nhập họ tên please...' }]}
                                            initialValue={user!==null?user.HoTen:""}
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
                                                    initialValue={user!==null?user.Email:""}
                                                    name="Email"
                                                    rules={[
                                                        { required: true, message: 'Nhập email please...' },
                                                        {
                                                            type: 'email',
                                                            message: 'Email nhập không hợp lệ !',
                                                        }
                                                    ]}
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
                                                    initialValue={user!==null?user.SDT:""}
                                                    name="SoDienThoai"
                                                    rules={[{ required: true, message: 'Nhập số điện thoại please...'},{pattern:'[0-9]{10,11}',message: 'Số điện thoại không đúng !'} ]}
                                                >
                                                    <Input
                                                        maxLength={11}
                                                        size="large"
                                                        style={{width:'100%',borderRadius:5}}
                                                        placeholder="Số điện thoại"
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Form.Item
                                            initialValue={user!==null?user.DiaChi:""}
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
                                                                return <Option key={index} ten={tt.Title} value={tt.ID}>{tt.Title}</Option>
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
                                        {this.state.done === false?
                                        <div className="vanChuyen">
                                            <CarOutlined style={{fontSize:'75px'}} />
                                            <h3>Vui lòng chọn {option} để có phương thức vận chuyển</h3>
                                        </div>

                                        :<Radio.Group defaultValue={1} className="radioThanhToan" size="large" >
                                            <Radio  style={radioStyle} value={1}>Giao hàng tận nơi <span>{phiShip.toLocaleString('vn-VN', {style : 'currency', currency : 'VND'})}</span></Radio>
                                            
                                        </Radio.Group>}

                                        <h2 style={{marginBottom:25,fontWeight:400}}>Phương thức thanh toán</h2>
                                        <Form.Item
                                            name="PhuongThucTT"
                                            rules={[{ required: true, message: 'Chọn phương thức thanh toán ! ' }]}
                                        >
                                            <Radio.Group className="radioThanhToan" size="large" onChange={this.onChangeRadio} value={this.state.radioOption}>
                                                <Radio 
                                                style={radioStyle} 
                                                value={1}
                                                >Thanh toán khi giao hàng(COD)
                                                </Radio>

                                                <Radio
                                                style={radioStyle} 
                                                value={2}
                                                >
                                                    Chuyển khoản ngân hàng
                                                </Radio>
                                            </Radio.Group>
                                        </Form.Item>

                                        {this.state.radioOption===2?
                                        <div className="chuyenKhoan">
                                            <h4 style={{color:'#7B7B7B'}}>Khách hàng chuyển khoản qua ngân hàng với nội dung: Số điện thoại + Số đơn hàng</h4>
                                            <h4 style={{color:'#7B7B7B'}}>ACB Bank chi nhánh Nguyễn Tri Phương<br></br>
                                                Số tài khoản: 4258307<br></br>
                                                Chủ tài khoản: Ngô Ngọc Trí</h4>
                                        </div>:null}

                                        

                                        <Row style={{marginTop:25,marginBottom:'50px'}}>
                                            <Col span={3} style={{textAlign:"left"}}>
                                                <Link to="/giohang"><LeftOutlined />Giỏ hàng</Link>
                                            </Col>
                                            <Col span={21} style={{textAlign:"right"}}>
                                                <Button
                                                    size="large"
                                                    type="primary" 
                                                    style={{borderRadius:'5px'}} 
                                                    htmlType="submit" 
                                                    className="login-form-button"
                                                >Hoàn Tất Đơn Hàng</Button>
                                            </Col>
                                        </Row>
                                        <hr style={{border:'solid 0.5px lavender'}}/>

                                    </Form>
                                </div>:<Success hoaDon={this.state.hoaDon}></Success>}
                                
                            </Col>
                            <Col span={2}></Col>
                        </Row>
                    </Col>
                    <Col className="checkoutright" xs={{span:24}} lg={{span:10}}>
                        <Row style={{marginTop:'55px'}}>
                            <Col xs={{span:4}} lg={{span:2}}></Col>
                            <Col xs={{span:18}} lg={{span:17}}>
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
                                                <Col span={15} style={{paddingTop:20}}>
                                                    <h4>{sanPham.TenSP}</h4>
                                                    {sanPham.kichThuoc!==6
                                                    ?<h5 style={{color:'#A3A3A3'}}>Size {sanPham.tenKichThuoc}</h5>
                                                    :<div></div>
                                                    }
                                                </Col>
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
                                    <Col span={12} style={{textAlign:'right'}}>
                                        {this.state.done===false?0:phiShip.toLocaleString('vn-VN', {style : 'currency', currency : 'VND'})}
                                    </Col>
                                </Row>
                                <hr style={{border:'solid 0.5px gainsboro'}}/>
                                <Row style={{marginTop:'25px'}}>
                                    <Col span={12}>
                                        <span className="tongCong">Tổng cộng</span>
                                    </Col>
                                    <Col span={12} style={{textAlign:'right'}}>
                                            <span className="VND">VND</span>
                                            <span className="thanhToanTongTien">
                                                {(tongTien+shipFee).toLocaleString('vn-VN', {style : 'currency', currency : 'VND'})}
                                            </span>    
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={{span:2}} lg={{span:5}}></Col>
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
