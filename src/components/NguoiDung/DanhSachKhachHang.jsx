import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Table, Space,Button } from 'antd';
import {PlusOutlined,CloseOutlined} from '@ant-design/icons';
import {actUpdateTrangThaiUser} from '../../redux/actions/nguoidung'
import axios from 'axios';
import Swal from 'sweetalert2'

  

class DanhSachKhachHang extends Component {

  constructor(props){
    super(props);
    this.state={
      reLoadUserArray:true
    }
  }

  deleteUser=(maUser)=>{
    Swal.fire({
      title: 'Bạn có muốn xóa người dùng này ?',
      text: "Sẽ không khôi phục lại được!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.value) {
        axios({
          method:'PUT',
          url:`http://localhost:5005/api/taikhoan/${maUser}`,
        })
        .then(res=>this.props.updateTrangThaiUser(maUser))
        .catch(error=>console.log(error));
        Swal.fire(
          'Đã xóa!',
          'Người dùng này đã bị xóa',
          'success'
        )

        
      }
    })
  }

  columns = [
    {
      title: 'Mã KH',
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
      title: 'Số Điện Thoại',
      dataIndex: 'SDT',
      key: 'SDT',
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
          <Button
           onClick={()=>record.isAdmin===1
           ?alert('Không thể xóa tai khoan admin')
           : this.deleteUser(record.MaTK) } 
           type="primary"><CloseOutlined />
           </Button>
        </Space>
      ),
    },
  ];


    render() {
        let data = this.props.DanhSachKhachHang;
        console.log(data);
        console.log(1);
        return (
            <div>
                <Table
                 columns={this.columns}
                 dataSource={data}
                 rowKey={record => record.MaTK}
                 rowClassName={record=>record.TrangThai===0?"disableRow":""}
                />
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        DanhSachKhachHang:state.DSND.DSND
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
      updateTrangThaiUser:(MaTK)=>{
        dispatch(actUpdateTrangThaiUser(MaTK));
      }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(DanhSachKhachHang);