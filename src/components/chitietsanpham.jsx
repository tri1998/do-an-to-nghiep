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
    Tag
} from 'antd'
import { 
    ShoppingCartOutlined,
    LeftOutlined,
    RightOutlined,
    FrownOutlined, 
} from '@ant-design/icons';
import SPLienQuan from './sanphamlienquan';
import BinhLuan from './BinhLuanSanPham';
import KichThuoc from './KichThuoc';
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
//destructuring tu component Select cua antd de lay ra component Option
const { Option } = Select;
class chitietsanpham extends Component {
    constructor(props) {
        super(props);
        this.carouselRef=createRef();
        this.state={
            soLuong:1,
            isLoading:false,
            phanTramKhuyenMai:100,
            option:1
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



        //lay % khuyen mai theo ma san pham
        axios({
            method:"GET",
            url:`http://localhost:${port}/api/khuyenmai/layPhanTramKM/${maSanPham}`
          })
        .then(res=>this.setState({phanTramKhuyenMai:res.data[0]}))
        .catch(err=>console.log(err))
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
        let viTriSanPham=this.props.danhSachSanPham.findIndex(sp=>sp.MaSP===sanPham.MaSP);
        let giaKhuyenMai = this.state.phanTramKhuyenMai!==undefined?sanPham.Gia-(sanPham.Gia*this.state.phanTramKhuyenMai.PhanTram/100):0;
        if(viTriSanPham===-1)
        {
            sanPham = {...sanPham,SoLuong:this.state.soLuong,GiaCu:this.state.phanTramKhuyenMai!==undefined?giaKhuyenMai:sanPham.Gia}
            sanPham.Gia = (this.state.phanTramKhuyenMai!==undefined?giaKhuyenMai:sanPham.Gia) * sanPham.SoLuong;
            this.props.themVaoGio(sanPham);
        }
        else
        {
            this.props.themVaoGioDaCoSanPham(sanPham.MaSP,this.state.soLuong);
        }

        this.props.history.push('/giohang');
        
    }







    

    render() {
        let {TenSP,GIA,Hinh,MaKT,SL,ThongTinSP} = this.props.SPDuocChon;
        return (
            <div>
              {this.state.isLoading===false?<div><Spin/>Loadding...</div>:
              <Row>
                <Col span={18}>
                    <Row>
                        <Col span={10} className="wrapanhctsp">
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

                            <Row>
                                <Col span={6}>
                                    <img alt="sp" className="anhctspduoi" src={Hinh}/>
                                </Col>
                                
                            </Row>
                        </Col>
                        
                        <Col span={14}>
                            <h1 className="tensanpham">{TenSP}</h1>
                            <hr/>
                            <Row className="thongtinsanpham">
                                <Col span={12}>
                                    <span className="fs16">Sản Phẩm: </span>
                                    {SL===0?<span style={{color:'red'}} className="fs16">Hết</span>
                                    :<span className="fs16">Còn {SL} </span>}
                                    {MaKT===6?null:<Row>
                                        <Col span={8}><span className="fs16">Kích Thước: </span></Col>
                                        <Col span={16}>
                                            <KichThuoc maKichThuoc={MaKT}></KichThuoc>
                                        </Col>
                                    </Row>} 
                                    <br/><span className="Gia">{GIA.toLocaleString('vn-VN', {style : 'currency', currency : 'VND'})}</span>
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
                                    <Button 
                                    onClick={
                                    ()=>this.state.soLuong>0
                                    ?this.themVaoGio(this.props.SPDuocChon)
                                    :this.openNotification()} 
                                    className="btnAddCart" danger type="primary" 
                                    shape="round" 
                                    size="large"
                                    disabled={SL===0?true:false}
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

                <Col span={6} className="center">
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
        themVaoGioDaCoSanPham:(maSanPham,soLuong)=>{
            dispatch(actThemSanPhamDaTonTai(maSanPham,soLuong))
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