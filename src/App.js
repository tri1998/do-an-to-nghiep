import React, { Fragment,Component } from 'react';
import "antd/dist/antd.css";
import NguoiDung from './pages/NguoiDung';
import Admin from './pages/Admin';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux';

import './App.css';
import {actLuuMangSP} from './redux/actions/sanpham';
import {actLuuTaiKhoan} from './redux/actions/nguoidung'


class App extends Component {

  componentDidMount(){
    axios({
      method:"GET",
      url:'http://localhost:7000/api/taikhoan' 
    }).then(res=>{
          this.props.onSaveDSNguoiDung(res.data);
        })
      .catch(error=>console.log(error));
  
  }

  render(){
    return (
      <BrowserRouter>
      <div className="App">
       
          <Fragment>
            <Switch>
              <Route exact path="/" component={NguoiDung}></Route>
              <Route path="/admin" component={Admin}></Route>
            </Switch>
          </Fragment>
        
      </div>
      </BrowserRouter>

  );
}
}

const mapDispatchToProps = (dispatch)=>{
  return{
    onSaveDSNguoiDung:(danhsachnguoidung)=>{
      dispatch(actLuuTaiKhoan(danhsachnguoidung))
    },
    
  }
}


export default connect(null,mapDispatchToProps)(App);

