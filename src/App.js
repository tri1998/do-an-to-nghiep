import React, { Fragment, Component } from 'react';
import "antd/dist/antd.css";
import Admin from './template/Admin';
import Auth from './HOCs/Auth.jsx';
import Added from './HOCs/Added.jsx';
import User from './template/User.jsx';
import ThanhToan from './pages/ThanhToan';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
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
      url: `http://localhost:${port}/api/sanpham`
    }).then(res => {
            this.props.luuMangSanPham(res.data);
    })
    .catch(error => console.log(error));

    axios({
      method:'GET',
      url: `http://localhost:${port}/api/danhmucsanpham`
    }).then(res=>{
      this.props.luuDanhSachLoai(res.data);
    })
    .catch(error=>console.log(error));

    axios({
      method:'GET',
      url: `http://localhost:${port}/api/khuyenmai/laydssanphamKM`
    }).then(res=>{
      this.props.luuDanhSachKhuyenMai(res.data);
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
              <Added path='/thanhtoan' Component={ThanhToan}></Added>
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
    luuMangSanPham: (danhsachsanpham) => {
      dispatch(actLuuMangSP(danhsachsanpham))
    },
    luuDanhSachLoai:(danhsachloaisanpham)=>{
      dispatch(actLuuMangDanhMucSanPham(danhsachloaisanpham))
    },
    luuDanhSachKhuyenMai:(danhsachkm)=>{
      dispatch(actLuuMangChiTietKM(danhsachkm))
    }
  }
}

export default connect(null, mapDispatchToProps)(App);

