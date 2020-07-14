import React, { Component } from 'react'
import { Menu } from 'antd';
import { HomeOutlined,CustomerServiceOutlined,SkinOutlined,RedditOutlined,ShoppingOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
const { SubMenu } = Menu;
export default class Menu1 extends Component {
    constructor(props){
      super(props);
    }
      state = {
        current: 'trangchu',
      };
    
      handleClick = e => {
        console.log('click ', e);
        this.setState({
          current: e.key,
        });
      };
    render() {
        return (
        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
        <Menu.Item key="trangchu" icon={<HomeOutlined />}>
          <Link to="/trangchu">
            TRANG CHỦ
          </Link>
        </Menu.Item>

        <Menu.Item key="sanpham"  icon={<ShoppingOutlined />}>
          SẢN PHẨM
        </Menu.Item>
        <Menu.Item key="gear"  icon={<CustomerServiceOutlined />}>
          <Link to="/loaisanpham">
              LOẠI SẢN PHẨM
          </Link>
        </Menu.Item>
        <Menu.Item key="gundam"  icon={<RedditOutlined />}>
          GUNDAM
        </Menu.Item>
        <Menu.Item key="ao"  icon={<SkinOutlined />}>
          <Link to="/aottg">
            ÁO TTG
          </Link>
        </Menu.Item>
        

      </Menu>
        )
    }
}
