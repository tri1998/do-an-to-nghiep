import React, { Component } from 'react'
import { Button, Tooltip} from 'antd';
import { Row, Col,Avatar, Badge } from 'antd';
import { UserOutlined,
  LoginOutlined,
    SearchOutlined
    , ShoppingCartOutlined,
     CloseOutlined,
     LogoutOutlined,
     UserAddOutlined
    } from '@ant-design/icons';
import { Input } from 'antd';
import {Link} from 'react-router-dom';
import Menu1 from './Menu.jsx';
import {connect} from 'react-redux'
import {actSetUserLogIn,actDangXuatNguoiDung} from '../redux/actions/nguoidung';
import {actLuuMangSanPhamCanTim} from '../redux/actions/sanpham';
import {port} from '../config/configAPI'
import axios from 'axios';

//Hàm kiểm tra chuỗi người dùng nhập vào là chuỗi hay là số
function kiemTraChuoi(n) {
   return !isNaN(parseFloat(n)) && !isNaN(n - 0) 
}
class header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status:false,
            userStatus:localStorage.getItem('user'),
            tensp:'',
            user:JSON.parse(sessionStorage.getItem('userinfo'))
        }
    }

    componentDidMount(){
      console.log(this.state.user);
    }

    timKiem=(value)=>{
      //Tao 1 bien de kiem tra gia tri nhap vao cua nguoi dung la chuoi hay so
      localStorage.removeItem('timkiem');
      localStorage.setItem('timkiem',JSON.stringify(value));
      let check = kiemTraChuoi(value);
      if(check===false)//truong hop la chuoi thi goi axios tim san pham theo ten
      {
        axios({
          method:"GET",
          url:`http://localhost:${port}/api/sanpham/timKiemSPTheoTen/${value}`
        })
        .then(res=>this.props.luuMangSPCanTim(res.data))
        .catch(err=>console.log(err))
      }
      if(check===true)//truong hop la so thi goi axios tim san pham theo gia
      {
        axios({
          method:"GET",
          url:`http://localhost:${port}/api/sanpham/timKiemSPTheoGia/${value}`
        })
        .then(res=>this.props.luuMangSPCanTim(res.data))
        .catch(err=>console.log(err))
      }
    }

    handleOnChange=(evt)=>{
      this.setState({
        [evt.target.name]:evt.target.value
      })
    }

    render() {
        let ThongTin = this.props.thongTinNguoiDung;
        let adminLogined = sessionStorage.getItem('admintoken');
        return (
            <Row>
                <Col style={{textAlign:'center'}} xs={{span:24}} lg={{span:4}}>
                  <Link to="/trangchu">
                    <div className="logo">
                      <img src="https://res.cloudinary.com/dl9fnqrq3/image/upload/v1595492996/logo_mkwtqz.jpg" />
                    </div>
                  </Link>

                </Col>
                <Col span={20}>
                  <Row>
                    <Col span={21} style={{textAlign:'right'}}>
                    
                      {ThongTin===null?
                      
                      (<Button type="primary" shape="round" size="large">
                      <Link  to="/dangnhap"><LoginOutlined />Đăng nhập</Link>
                      </Button>)
                      :(<Link to={adminLogined===null?`/thongtintaikhoan/${ThongTin.MaTK}`:"/admin"}><Button type="link" shape="round" size="large">
                        <span style={{marginRight:'10px'}} className="avatar-item">
                        <Badge count={1}>
                          <Avatar  size="small" shape="square" icon={<UserOutlined />} />
                        </Badge>
                      </span>
                        {ThongTin.HoTen}
                    </Button></Link>)}
                      
                    </Col>
                    <Col span={3}>
                      {ThongTin===null?
                      (<Button type="primary" shape="round" size="large">
                        <Link  to="/dangky"><UserAddOutlined />Đăng ký</Link>
                      </Button>)
                      :(<Button type="primary" onClick={()=>this.props.dangXuat()
                        } type="link" shape="round" size="large">
                      <LogoutOutlined /> Đăng xuất
                    </Button>)}
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col span={21}>
                      <Menu1></Menu1>
                    </Col>
                    <Col span={1}>
                      {
                        this.state.status === false ?
                          <Tooltip title="Tìm kiếm">
                            <Button onClick={() => this.setState({status:!this.state.status})} shape="circle" size="large" icon={<SearchOutlined />} />
                          </Tooltip> :
                          <Tooltip title="Đóng">
                            <Button onClick={() => this.setState({status:!this.state.status})} shape="circle" size="large" icon={<CloseOutlined />} />
                          </Tooltip>
                      }
                    </Col>
                    <Col className="cart" span={2}>
                      <Tooltip title="Giỏ hàng">
                        <Button shape="circle" size="large" icon={<ShoppingCartOutlined />} />
                        <span className="soLuongSP">({this.props.soLuongSPCoTrongGio})</span>
                      </Tooltip>
                    </Col>
                  </Row>
                  <Row>
                      
                    <Col span={18}></Col>
                    <Col span={4}>
                      {
                        this.state.status === false ?
                          '' :
                          
                          <Input
                            name="tensp"
                            placeholder="Tìm kiếm..."
                            onChange={this.handleOnChange}
                            
                          />
                          

                      }
                    </Col>
                    <Col span={2}>
                      { this.state.status === false ?
                          '' :
                      <Button
                        type="primary"
                        onClick={()=>this.timKiem(this.state.tensp)}
                      >
                       <Link to="/timkiem"><SearchOutlined/></Link>
                      </Button>
                      }   
                    </Col>
                  </Row>

                </Col>
              </Row>
        )
    }
}

const mapStateToProps=(state)=>{
  return{
    thongTinNguoiDung:state.DSND.UserInformation,
    userLogIn:state.DSND.userLogin,
    isUserLogIn:state.DSND.isUserLogin,
    soLuongSPCoTrongGio:state.DSSPMua.soLuongSanPhamCoTrongGio
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    userLogOut:()=>{
      dispatch(actSetUserLogIn())
    },
    luuMangSPCanTim:(mangSP)=>{
      dispatch(actLuuMangSanPhamCanTim(mangSP))
    },
    dangXuat:()=>{
      dispatch(actDangXuatNguoiDung());
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(header);