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
    Comment,
    Avatar,
    List,
    Form
} from 'antd'
import { 
    ShoppingCartOutlined,
    LeftOutlined,
    RightOutlined,
    FrownOutlined, 
} from '@ant-design/icons';
import SPLienQuan from './sanphamlienquan'
import { createRef } from 'react';
import {connect} from 'react-redux';
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
const { TextArea } = Input;

const CommentList = ({ comments }) => (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={props => <Comment {...props} />}
    />
  );
  
  const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </>
  );
class chitietsanpham extends Component {


    constructor(props) {
        super(props);
        this.carouselRef=createRef();
        this.state={
            soLuong:1,
            isLoading:false,
            phanTramKhuyenMai:100,
            comments: [],
            submitting: false,
            value: '',
        }
    }

    
      handleSubmit = () => {
        if (!this.state.value) {
          return;
        }
    
        this.setState({
          submitting: true,
        });
    
        setTimeout(() => {
          this.setState({
            submitting: false,
            value: '',
            comments: [
              {
                author: 'Han Solo',
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content: <p>{this.state.value}</p>,
              },
              ...this.state.comments,
            ],
          });
        }, 1000);
      };
    
      handleChange = e => {
        this.setState({
          value: e.target.value,
        });
      };


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
        let {TenSP,Gia,Hinh} = this.props.SPDuocChon;
        const { comments, submitting, value } = this.state;
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
                                    
                                    {
                                        this.state.phanTramKhuyenMai!==undefined
                                        ?<span className="Gia">{(Gia-(Gia*this.state.phanTramKhuyenMai.PhanTram/100)).toLocaleString('vn-VN', {style : 'currency', currency : 'VND'})}</span>
                                        :null
                                    }

                                    <span className={this.state.phanTramKhuyenMai!==undefined?"GiaKM":"Gia"}>
                                    {
                                        Gia.toLocaleString('vn-VN', {style : 'currency', currency : 'VND'})
                                    }
                                    </span>

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
                                    shape="round" size="large"
                                    >
                                        <ShoppingCartOutlined />Thêm Vào Giỏ Hàng
                                    </Button>

                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                        {comments.length > 0 && <CommentList comments={comments} />}
                        <Comment
                        avatar={
                            <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt="Han Solo"
                            />
                        }
                        content={
                            <Editor
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            submitting={submitting}
                            value={value}
                            />
                        }
                        />
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
        mangKM:state.DSCTKhuyenMai.mangChiTietKhuyenMai
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