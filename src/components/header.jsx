import React, { Component } from 'react'
import { Button, Tooltip} from 'antd';
import { Row, Col } from 'antd';
import { UserOutlined, RightSquareOutlined, SearchOutlined, ShoppingCartOutlined, CloseOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import {Link} from 'react-router-dom';
import Menu1 from './Menu.jsx';
import {connect} from 'react-redux'
import {actSetUserLogIn} from '../redux/actions/nguoidung'
const { Search } = Input;

class header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            status:false,
            userStatus:localStorage.getItem('user')
    
        }
        console.log(this.state.userStatus);
    }

    render() {
        return (
            <Row>
                <Col span={4}>
                  <Link to="/trangchu">
                    <div className="logo">
                      <img src="./img/logo.png" />
                    </div>
                  </Link>

                </Col>
                <Col span={20}>
                  <Row>
                    <Col span={17}></Col>
                    <Col span={4}>
                    
                      {this.props.isUserLogIn===false?
                      
                      (<Button type="primary" shape="round" size="large">
                      <Link  to="/dangnhap"><RightSquareOutlined />Đăng nhập</Link>
                      </Button>)
                      :(<Button type="link" shape="round" size="large">
                      Chào {this.props.userLogIn.HoTen}
                    </Button>)}
                      
                    </Col>
                    <Col span={3}>
                      {this.props.isUserLogIn===false?
                      (<Button type="primary" shape="round" size="large">
                        <Link  to="/dangky"><UserOutlined />Đăng ký</Link>
                      </Button>)
                      :(<Button type="primary" onClick={()=>{
                        this.props.userLogOut();
                        }} type="link" shape="round" size="large">
                      Đăng Xuất
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
                        <span>(0)</span>
                      </Tooltip>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={18}></Col>
                    <Col span={6}>
                      {
                        this.state.status === false ?
                          '' :
                          <Search
                            placeholder="Tìm kiếm"
                            onSearch={value => console.log(value)}
                            enterButton
                          />

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
    userLogIn:state.DSND.userLogin,
    isUserLogIn:state.DSND.isUserLogin
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    userLogOut:()=>{
      dispatch(actSetUserLogIn())
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(header);