import React, { Fragment, Component } from 'react';
import "antd/dist/antd.css";
import Admin from './pages/Admin';
import Home from './components/trangchu';
import Header from './components/header';
import AoTTG from './components/aottg';
import GamingGear from './components/gaminggear';
import DangNhap from './components/dangnhap';
import DangKy from './components/dangky';
import ChiTiet from './components/chitietsanpham';
import Footer from './components/footer';
import Auth from './components/Auth';
import { Row, Col } from 'antd';
import { UpCircleTwoTone } from '@ant-design/icons';
import { BackTop, Button } from 'antd';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import { actLuuTaiKhoan } from './redux/actions/nguoidung';
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
      url: 'http://localhost:5005/api/taikhoan'
    }).then(res => {
      this.props.onSaveDSNguoiDung(res.data);
    })
      .catch(error => console.log(error));

  }


  render() {
    return (
      
      <BrowserRouter>
        <Fragment>
          <div className="App">

            <Row>
              {localStorage.getItem('loginAdmin') === null ? <Col span={2}></Col> : null}
              <Col className="wrapper" span={localStorage.getItem('loginAdmin') === null ? 20 : 24}>
                {localStorage.getItem('loginAdmin') === null ? <Header></Header> : null}

                <Switch>
                  <Route path='/trangchu' component={Home}></Route>
                  <Route path='/gaming-gear' component={GamingGear}></Route>
                  <Route path='/aottg' component={AoTTG}></Route>
                  <Auth path='/admin' Component={Admin}></Auth>
                  <Route path='/dangnhap' component={DangNhap}></Route>
                  <Route path='/dangky' component={DangKy}></Route>
                  <Route path='/:MaSP' component={ChiTiet}></Route>
                  <Route exact path='/' component={Home}></Route>

                </Switch>

                {localStorage.getItem('loginAdmin') === null ? <Footer></Footer> : null}

              </Col>

              {localStorage.getItem('loginAdmin') === null ? <Col span={2}></Col> : null}
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

