import React, { Component } from 'react'
import { Menu } from 'antd';
import { HomeOutlined,
  CustomerServiceOutlined,
  DropboxOutlined,
  WhatsAppOutlined,
  QuestionOutlined 
} from '@ant-design/icons';
import {Link} from 'react-router-dom';
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

        
        <Menu.Item key="loaisanpham"  icon={<CustomerServiceOutlined />}>
          <Link to="/loaisanpham">
           LOẠI SẢN PHẨM
          </Link>
        </Menu.Item>

        <Menu.Item key="gundam"  icon={<WhatsAppOutlined />}>
          <Link to="/lienhe">
           LIÊN HỆ
          </Link>
        </Menu.Item>

        <Menu.Item key="baohanh"  icon={<DropboxOutlined />}>
          <Link to="/baohanh">
           BẢO HÀNH
          </Link>
        </Menu.Item>

        <Menu.Item key="hotro"  icon={<QuestionOutlined/>}>
          <Link to="/hotro">
            HỖ TRỢ
          </Link>
        </Menu.Item>


        

      </Menu>
        )
    }
}
