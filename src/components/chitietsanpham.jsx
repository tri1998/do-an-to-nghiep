import React, { Component } from 'react'
import {
    Row,
    Col,
    Input,
    Select,
    Button,
    Carousel,
    notification,
    Spin,
    Tag,
    message,
    Skeleton
} from 'antd'
import { 
    ShoppingCartOutlined,
    LeftOutlined,
    RightOutlined,
    FrownOutlined, 
} from '@ant-design/icons';
import SPLienQuan from './sanphamlienquan';
import BinhLuan from './BinhLuanSanPham';
import DanhSachAnh from '../pages/DanhSachAnhClient';
import { createRef } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {
    actThemVaoGio,
    actThemSanPhamDaTonTai
} from '../redux/actions/giohang';
import {port} from '../config/configAPI';
import axios from 'axios';
import {actXemChiTiet} from '../redux/actions/sanpham';
import {actLuuMangChiTietKM} from '../redux/actions/khuyenmai'
import sanpham from './sanpham';
//destructuring tu component Select cua antd de lay ra component Option
const { Option } = Select;
class chitietsanpham extends Component {
    constructor(props) {
        super(props);
        this.carouselRef=createRef();
        this.state={
            soLuong:1,
            isLoading:false,
            danhSachKT:[],
            kichThuoc:6
        }
    }
    componentDidMount(){
        let maSanPham = this.props.match.params.MaSP;
        axios({
            method:"GET",
            url:`http://localhost:${port}/api/sanpham/xemChiTietSP/${maSanPham}`
        })
        .then(res=>{
            this.props.xemChiTiet(res.data[0]);
            this.setState({isLoading:!this.state.isLoading});
        })
        .catch(err=>console.log(err));

        axios({
            method:"GET",
            url:`http://localhost:${port}/api/sanpham/layKichThuocSanPham/${maSanPham}`
        })
        .then(res=>{
            this.setState({danhSachKT:res.data});
        })
        .catch(err=>console.log(err));

    }

    //Thong bao nay duoc show ra khi nguoi dung nhap so luon < 1
    openNotification = () => {
        notification.open({
          message: 'Lỗi',
          description:
            'Số lượng sản phẩm phải lớn hơn 0 !',
          icon: <FrownOutlined style={{ color: '#108ee9' }} />,
        });
    };

    //Dom that toi method carousel cua antd
    handlePrev =()=> this.carouselRef.current.prev();
    handleNext =()=> this.carouselRef.current.next();


    //ham nay duoc goi khi moi lan so luong thay doi thi setState lai
    handleOnChange=(e)=>{
        this.setState({
            [e.target.name]:parseInt(e.target.value)
        })
        console.log(this.state.soLuong);
    }

    //Chuc nang them vao nhan vao la 1 object sanPham
    themVaoGio=(sanPham)=>{
        let {kichThuoc,danhSachKT} = this.state;
        let viTriSanPham=this.props.danhSachSanPham.findIndex(sp=>sp.MaSP===sanPham.MaSP && sp.kichThuoc===kichThuoc);
        let indexKT = danhSachKT.findIndex(kt=>kt.MaKT===kichThuoc)
        let giaKhuyenMai = sanPham.PhanTram===undefined
        ?sanPham.Gia
        :sanPham.Gia-(sanPham.Gia*sanPham.PhanTram/100);
        if(viTriSanPham===-1)
        {
            sanPham = {
                ...sanPham,
                SoLuong:this.state.soLuong,
                GiaCu:giaKhuyenMai,
                kichThuoc:kichThuoc,
                tenKichThuoc:danhSachKT[indexKT].TenKT
        }
            sanPham.Gia = giaKhuyenMai * sanPham.SoLuong;
            console.log(sanPham);
            this.props.themVaoGio(sanPham);
        }
        else
        {
            this.props.themVaoGioDaCoSanPham(sanPham.MaSP,this.state.soLuong,kichThuoc);
        }
        this.props.history.push('/giohang');
        
    }

    chonKichThuoc=(value)=>{
        this.setState({
            kichThuoc:value
        })
    }

    render() {
        let {TenSP,Gia,Hinh,MaKT,SL,ThongTinSP,PhanTram,MaSP,MaDM} = this.props.SPDuocChon;
        let {danhSachKT,kichThuoc} = this.state;
        let GiaKM=PhanTram===undefined?0:Gia-(Gia*PhanTram/100);
        const admintoken = sessionStorage.getItem('admintoken');
        return (
            <div>
              {this.state.isLoading===false?<Skeleton active/>:
              <Row>
                <Col xs={{span:24}} lg={{span:18}}>
                    <Row>
                        <Col lg={{span:10}} xs={{span:24}}  className="wrapanhctsp">
                            <div className="anhctsp">
                                <Carousel ref={this.carouselRef} dots={false} className="carouselchitiet">
                                <div>
                                    <img alt="sp" src={Hinh}/>
                                </div>
                                </Carousel>
                                <Button onClick={this.handlePrev} className="prevAnh" size="medium" icon={<LeftOutlined />} type="ghost"shape="circle" >
                                </Button>
                                <Button onClick={this.handleNext} className="nextAnh" size="medium" icon={<RightOutlined />} type="ghost" shape="circle">
                                </Button>
                            </div>

                            
                            <DanhSachAnh MaSP={MaSP} />
                                
                            
                        </Col>
                        
                        <Col xs={{span:24}} lg={{span:14}}>
                            <h1 className="tensanpham">{TenSP}</h1>
                            <hr/>
                            <Row className="thongtinsanpham">
                                <Col span={12}>
                                    <span className="fs16">Sản Phẩm: </span>
                                    {SL===0?<span style={{color:'red'}} className="fs16">Hết</span>
                                    :<span className="fs16" style={{color:'red'}}>Còn</span>}
                                    {MaKT===6 || danhSachKT.length===0?<div></div>:<Row>
                                        <Col span={24}>
                                            <Select 
                                                style={{width:'100%'}}
                                                onChange={this.chonKichThuoc}
                                                placeholder="Chọn Size"
                                            >
                                                {
                                                    danhSachKT.map((kt,index)=>{
                                                    return <Option

                                                            key={index} 
                                                            value={kt.MaKT}
                                                            >Size {kt.TenKT}
                                                           </Option>
                                                    })
                                                }
                                            </Select>
                                        </Col>
                                    </Row>} 
                                    <br/>
                                </Col>

                                <Col span={12} className="right">
                                    <Row>
                                        <Col span={16} className="right"><span className="fs16">Số lượng: </span></Col>
                                        <Col span={6}>
                                            <Input onChange={this.handleOnChange} name="soLuong" type="number" min={1} max={100} defaultValue={1}/>
                                        </Col>
                                        <Col span={2}></Col>
                                    </Row>
                                <br/>
                                    

                                </Col>
                                <Col span={12} style={{marginBottom:'-50px'}}>
                                    {PhanTram===undefined?null:<span 
                                    className={GiaKM!==0?"Gia":"GiaKM"}>
                                    {GiaKM.toLocaleString('vn-VN', {style : 'currency', currency : 'VND'})}
                                    </span>}

                                    <span 
                                    className={GiaKM!==0?"GiaKM":"Gia"}>
                                    {Gia.toLocaleString('vn-VN', {style : 'currency', currency : 'VND'})}
                                    </span>
                                </Col>

                                <Col span={12} style={{marginBottom:'-50px'}}>
                                <Button 
                                    onClick={
                                    ()=>this.state.soLuong>0
                                    ?MaDM===3&&kichThuoc===6?message.warning('Bạn chưa chọn size !'):this.themVaoGio(this.props.SPDuocChon)
                                    :this.openNotification()} 
                                    className="btnAddCart" danger type="primary" 
                                    shape="round" 
                                    size="large"
                                    disabled={SL===0 || admintoken!==null ?true:false}
                                    >
                                        <ShoppingCartOutlined />Thêm Vào Giỏ Hàng
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row style={{padding:'20px'}}>
                        <Col span={24}>
                            <Button 
                            size="large" 
                            shape="round"
                            style={{marginRight:'5px'}}
                            onClick={()=>this.setState({option:1})}
                            >
                                CHI TIẾT SẢN PHẨM
                            </Button>
                            <Button 
                            size="large" 
                            shape="round"
                            onClick={()=>this.setState({option:2})}
                            >
                                TAGS
                            </Button>      
                            {ThongTinSP!==null && this.state.option===1
                            ?<div  
                            dangerouslySetInnerHTML={{ __html:ThongTinSP}} 
                            className="chitietsanpham"
                            >
                            </div>:null}
                            {this.state.option===2
                            ?<div  
                            className="chitietsanpham"
                            >
                                <div>
                                    <Link><Tag color="magenta">Sản phẩm mới</Tag></Link>
                                    <Link to="/loaisanpham/aoin"><Tag color="red">Áo TTG</Tag></Link>
                                    <Link to="/loaisanpham/gaminggear"><Tag color="volcano">Gear</Tag></Link>
                                    <Link to="/loaisanpham/gundam"><Tag color="orange">Gundam</Tag></Link>
                                </div>
                            </div>:null}
                        </Col>
                    </Row>

                    <Row style={{padding:'20px'}}>
                        <Col span={24}>

                            <Button 
                            size="large" 
                            shape="round"
                            >BÌNH LUẬN
                            </Button>
                            <BinhLuan maSanPham={this.props.match.params.MaSP}></BinhLuan>
                        
                        </Col>
                    </Row>
                    
                    
                </Col>

                <Col xs={{span:24}} lg={{span:6}} className="center">
                    <SPLienQuan></SPLienQuan>
                </Col>
              </Row>}
            </div>
        )
    }
}
const mapStateToProp = (state)=>{
    return {
        SPDuocChon:state.DSSP.sanPhamDuocChon,
        danhSachSanPham:state.DSSPMua.mangSanPham,
        mangKM:state.DSCTKhuyenMai.mangChiTietKhuyenMai,
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        themVaoGio:(sanPham)=>{
            dispatch(actThemVaoGio(sanPham))
        },
        themVaoGioDaCoSanPham:(maSanPham,soLuong,kichThuoc)=>{
            dispatch(actThemSanPhamDaTonTai(maSanPham,soLuong,kichThuoc))
        },
        xemChiTiet:(sanPham)=>{
            dispatch(actXemChiTiet(sanPham))
        },
        onSaveChiTietKhuyenMai:(danhsachkm)=>{
            dispatch(actLuuMangChiTietKM(danhsachkm))
         }
    }
}

export default connect(mapStateToProp,mapDispatchToProps)(chitietsanpham);