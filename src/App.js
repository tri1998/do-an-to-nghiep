import React, { Fragment, Component } from 'react';
import "antd/dist/antd.css";
import Admin from './template/Admin';
import Home from './components/trangchu';
import Header from './components/header';
import DangNhap from './components/dangnhap';
import DangKy from './components/dangky';
import GioHang from './pages/GioHang';
import ChiTiet from './components/chitietsanpham';
import Footer from './components/footer';
import Auth from './components/Auth';
import QuenMatKhau from './pages/QuenMatKhau';
import CapNhatMatKhau from './pages/CapNhatMatKhau';
import LoaiSanPham from './components/LoaiSanPham';
import { Row, Col } from 'antd';
import { UpCircleTwoTone } from '@ant-design/icons';
import { BackTop, Button } from 'antd';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import { actLuuTaiKhoan } from './redux/actions/nguoidung';
import { actLuuMangSP } from './redux/actions/sanpham'
import axios from 'axios';
import { connect } from 'react-redux';
import './App.css';


class App extends Component {

  constructor(props){
    super(props);
    
  }

  componentDidMount() {
    axios({
      method: "GET",
      url: 'http://localhost:5000/api/taikhoan'
    }).then(res => {
      this.props.onSaveDSNguoiDung(res.data);
    })
    .catch(error => console.log(error));

    axios({
      method: "GET",
      url: 'http://localhost:5000/api/sanpham'
    }).then(res => {
            this.props.onSaveDSSanPham(res.data);
    })
    .catch(error => console.log(error));

  }


  render() {
    return (
      
      <BrowserRouter>
        <Fragment>
          <div className="App">

            <Row>
              {sessionStorage.getItem('loginAdmin') === null ? <Col span={2}></Col> : null}
              <Col className="wrapper" span={sessionStorage.getItem('loginAdmin') === null ? 20 : 24}>
                {sessionStorage.getItem('loginAdmin') === null ? <Header></Header> : null}

                <Switch>
                  <Route path='/trangchu' component={Home}></Route>
                  <Auth  path='/admin' Component={Admin}></Auth>
                  <Route path='/dangnhap' component={DangNhap}></Route>
                  <Route path='/quenmatkhau' component={QuenMatKhau}></Route>
                  <Route path='/dangky' component={DangKy}></Route>
                  <Route path='/loaisanpham' component={LoaiSanPham}></Route>
                  <Route path='/giohang' component={GioHang}></Route>
                  <Route path='/capnhatmatkhau/:email' component={CapNhatMatKhau}></Route>
                  <Route path='/:MaSP' component={ChiTiet}></Route>
                  <Route exact path='/' component={Home}></Route>

                </Switch>

                {sessionStorage.getItem('loginAdmin') === null ? <Footer></Footer> : null}

              </Col>

              {sessionStorage.getItem('loginAdmin') === null ? <Col span={2}></Col> : null}
            </Row>
            <BackTop>
              <Button type="primary" shape="circle" icon={<UpCircleTwoTone />} size="large"></Button>
            </BackTop>

          </div>
        </Fragment>
      </BrowserRouter>

    );
  }
}


const mapStateToProps = (state) => {
  return {
    isAdminLogin: state.DSND.adminLogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveDSNguoiDung: (danhsachnguoidung) => {
      dispatch(actLuuTaiKhoan(danhsachnguoidung))
    },
    onSaveDSSanPham: (danhsachsanpham) => {
      dispatch(actLuuMangSP(danhsachsanpham))
  }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

