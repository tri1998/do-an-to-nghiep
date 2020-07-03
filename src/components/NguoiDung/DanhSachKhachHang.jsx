import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Table, Space,Button } from 'antd';
import {PlusOutlined,CloseOutlined} from '@ant-design/icons';
import KhachHang from '../NguoiDung/KhachHang'
const columns = [
    {
      title: 'STT',
      dataIndex: 'MaTK',
      key: 'MaTK',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Họ Tên',
      dataIndex: 'HoTen',
      key: 'HoTen',
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
    },
    
    {
      title: 'Thao Tác',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button danger><PlusOutlined /></Button>
          <Button type="primary"><CloseOutlined /></Button>
        </Space>
      ),
    },
  ];
  

class DanhSachKhachHang extends Component {
    loadDanhSachKhachHang=()=>{
      return this.props.DanhSachKhachHang.map(
          (kh,index)=>{
              return <KhachHang key={index} kh={kh}></KhachHang>
          }
      )
    }
    render() {
        let data = this.props.DanhSachKhachHang;
        return (
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        DanhSachKhachHang:state.DSND.DSND
    }
}

export default connect(mapStateToProps,null)(DanhSachKhachHang);