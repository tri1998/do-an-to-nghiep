import React, { Component } from 'react'
import "antd/dist/antd.css";
import Home from '../components/trangchu';
import Header from '../components/header';
import DangNhap from '../components/dangnhap';
import DangKy from '../components/dangky';
import GioHang from '../pages/GioHang';
import ChiTiet from '../components/chitietsanpham';
import Footer from '../components/footer';
import QuenMatKhau from '../pages/QuenMatKhau';
import CapNhatMatKhau from '../pages/CapNhatMatKhau';
import LoaiSanPham from '../components/LoaiSanPham';
import TimKiem from '../pages/TimKiemSanPham';
import { Row, Col } from 'antd';
import { UpCircleTwoTone } from '@ant-design/icons';
import { BackTop, Button } from 'antd';
import {Route, Switch} from 'react-router-dom';

export default class User extends Component {
    render() {
        return (
            <div>
            <Row>
              <Col span={2}></Col>
              <Col className="wrapper" span={20}>
                <Header></Header>
                <Switch>
                  <Route path='/trangchu' component={Home}></Route>
                  <Route path='/dangnhap' component={DangNhap}></Route>
                  <Route path='/quenmatkhau' component={QuenMatKhau}></Route>
                  <Route path='/dangky' component={DangKy}></Route>
                  <Route path='/loaisanpham' component={LoaiSanPham}></Route>
                  <Route path='/giohang' component={GioHang}></Route>
                  <Route path='/timkiem' component={TimKiem}></Route>
                  <Route path='/capnhatmatkhau/:email' component={CapNhatMatKhau}></Route>
                  <Route path='/:MaSP' component={ChiTiet}></Route>
                  <Route exact path='/' component={Home}></Route>
                </Switch>
                <Footer></Footer>
              </Col>

              <Col span={2}></Col>
            </Row>
            <BackTop>
              <Button type="primary" shape="circle" icon={<UpCircleTwoTone />} size="large"></Button>
            </BackTop>
            </div>
        )
    }
}
