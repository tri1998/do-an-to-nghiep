import React, { Component } from 'react'
import {Row,Col,Input,Select,Button} from 'antd'
import { ShoppingCartOutlined,LeftOutlined,RightOutlined } from '@ant-design/icons';
import SPLienQuan from './sanphamlienquan'
import { Carousel } from 'antd';
import { createRef } from 'react';
import {connect} from 'react-redux';
import {actThemVaoGio,actThemSanPhamDaTonTai} from '../redux/actions/giohang';
const { Option } = Select;
class chitietsanpham extends Component {
    constructor(props) {
        super(props);
        this.carouselRef=createRef();
        this.state={
            soLuong:1
        }
    }

    handlePrev =()=> this.carouselRef.current.prev();
    handleNext =()=> this.carouselRef.current.next();

    handleOnChange=(e)=>{
        this.setState({
            [e.target.name]:parseInt(e.target.value)
        })
        console.log(this.state.soLuong);

    }

    themVaoGio=(sanPham)=>{
        let viTriSanPham=this.props.danhSachSanPham.findIndex(sp=>sp.MaSP===sanPham.MaSP);
        if(viTriSanPham===-1)
        {
            sanPham = {...sanPham,SoLuong:this.state.soLuong,GiaCu:sanPham.Gia}
            sanPham.Gia *=sanPham.SoLuong;
            this.props.themVaoGio(sanPham);
        }
        else
        {
            this.props.themVaoGioDaCoSanPham(sanPham.MaSP,this.state.soLuong);
        }

        this.props.history.push('/giohang');
        
    }
    
    render() {
        let {TenSP,Gia,Hinh} = this.props.SPDuocChon;
        Gia = Gia.toLocaleString('vn-VN', {style : 'currency', currency : 'VND'})
        return (
            <div>
              <Row>
                <Col span={18}>
                    <Row>
                        <Col span={10} className="wrapanhctsp">
                            <div className="anhctsp">
                                <Carousel ref={this.carouselRef} dots={false} className="carouselchitiet">
                                <div>
                                    <img alt="sp" src={Hinh}/>
                                </div>
                                <div>
                                    <img alt="sp" src="./img/volang.png"/>
                                </div>
                                <div>
                                    <img alt="sp" src="./img/taycammoi.png"/>
                                </div>
                                <div>
                                    <img alt="sp" src="./img/tainghe.png"/>
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
                                    <span className="fs16">Sản Phẩm: </span><span className="fs16">Còn</span><br/>
                                    <Row>
                                        <Col span={8}><span className="fs16">Bảo Hành: </span></Col>
                                        <Col span={16}>
                                            <Select defaultValue="6 Tháng" style={{width:105}}>
                                                <Option value="6 Tháng">6 Tháng</Option>
                                                <Option value="12 Tháng">12 Tháng</Option>
                                                <Option value="24 Tháng">24 Tháng</Option>
                                            </Select>
                                        </Col>

                                    </Row>
                                    <span className="Gia">{Gia}</span>
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
                                    onClick={()=>this.themVaoGio(this.props.SPDuocChon)} 
                                    className="btnAddCart" danger type="primary" 
                                    shape="round" size="large"
                                    >
                                        <ShoppingCartOutlined />Thêm Vào Giỏ Hàng
                                    </Button>

                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    
                    
                </Col>

                <Col span={6} className="center">
                    <SPLienQuan></SPLienQuan>
                </Col>
              </Row>
            </div>
        )
    }
}
const mapStateToProp = (state)=>{
    return {
        SPDuocChon:state.DSSP.sanPhamDuocChon,
        danhSachSanPham:state.DSSPMua.mangSanPham,
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
    }
}

export default connect(mapStateToProp,mapDispatchToProps)(chitietsanpham);