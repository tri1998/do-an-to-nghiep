import React, { Fragment, Component } from 'react';
import "antd/dist/antd.css";
import Admin from './template/Admin';
import Auth from './components/Auth';
import User from './template/User.jsx';
import ThanhToan from './pages/ThanhToan';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { actLuuTaiKhoan } from './redux/actions/nguoidung';
import { actLuuMangSP,actLuuMangDanhMucSanPham} from './redux/actions/sanpham';
import { actLuuMangChiTietKM} from './redux/actions/khuyenmai'
import {port} from './config/configAPI';
import axios from 'axios';
import { connect } from 'react-redux';
import './App.css';


class App extends Component {

  componentDidMount() {
    axios({
      method: "GET",
      url: `http://localhost:${port}/api/taikhoan`
    }).then(res => {
      this.props.onSaveDSNguoiDung(res.data);
    })
    .catch(error => console.log(error));

    axios({
      method: "GET",
      url: `http://localhost:${port}/api/sanpham`
    }).then(res => {
            this.props.onSaveDSSanPham(res.data);
    })
    .catch(error => console.log(error));

    axios({
      method:'GET',
      url: `http://localhost:${port}/api/danhmucsanpham`
    }).then(res=>{
      this.props.onSaveDSLoaiSanPham(res.data);
    })
    .catch(error=>console.log(error));

    axios({
      method:'GET',
      url: `http://localhost:${port}/api/khuyenmai`
    }).then(res=>{
      this.props.onSaveChiTietKhuyenMai(res.data);
    })
    .catch(error=>console.log(error));



  }


  render() {
    return (
      <BrowserRouter >
        <Fragment>
          <div className="App">
            <Switch>
              <Auth path='/admin' Component={Admin}></Auth>
              <Route path='/thanhtoan' component={ThanhToan}></Route>
              <Route exact path='' component={User}></Route>
            </Switch>
          </div>
        </Fragment>
      </BrowserRouter>

    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    onSaveDSNguoiDung: (danhsachnguoidung) => {
      dispatch(actLuuTaiKhoan(danhsachnguoidung))
    },
    onSaveDSSanPham: (danhsachsanpham) => {
      dispatch(actLuuMangSP(danhsachsanpham))
    },
    onSaveDSLoaiSanPham:(danhsachloaisanpham)=>{
      dispatch(actLuuMangDanhMucSanPham(danhsachloaisanpham))
    },
    onSaveChiTietKhuyenMai:(danhsachkm)=>{
      dispatch(actLuuMangChiTietKM(danhsachkm))
    }
  }
}

export default connect(null, mapDispatchToProps)(App);

