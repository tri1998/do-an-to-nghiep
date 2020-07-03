import React, { Component, Fragment } from 'react'
import Home from '../components/trangchu';
import Header from '../components/header';
import AoTTG from '../components/aottg';
import GamingGear from '../components/gaminggear';
import DangNhap from '../components/dangnhap';
import DangKy from '../components/dangky';
import ChiTiet from '../components/chitietsanpham';
import Footer from '../components/footer';
import { Row, Col } from 'antd';
import { BrowserRouter,Route, Switch } from 'react-router-dom'
import { UpCircleTwoTone  } from '@ant-design/icons';
import { BackTop,Button } from 'antd';

export default class NguoiDung extends Component {
    render() {
        return (
            <BrowserRouter>
                <Fragment>
                    <div className="nguoidung">
                        <Row>
                            <Col span={2}></Col>
                            <Col className="wrapper" span={20}>
                                <Header></Header>
                                <Switch>
                                    <Route path='/trangchu' component={Home}></Route>
                                    <Route path='/gaming-gear' component={GamingGear}></Route>
                                    <Route path='/aottg' component={AoTTG}></Route>
                                    <Route exact path='/' component={Home}></Route>
                                    <Route path='/dangnhap' component={DangNhap}></Route>
                                    <Route path='/dangky' component={DangKy}></Route>
                                    <Route path='/:MaSP' component={ChiTiet}></Route>
                                </Switch>
                                <BackTop>
                                    <Button type="primary" shape="circle" icon={<UpCircleTwoTone />} size="large"></Button>
                                </BackTop>
                                <Footer></Footer>

                            </Col>

                            <Col span={2}></Col>
                        </Row>
                        <BackTop></BackTop>
                    </div>
                </Fragment>
            </BrowserRouter>
        )
    }
}
