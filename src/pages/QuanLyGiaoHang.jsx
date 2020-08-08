import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Table,
  Space,
  Button,
  Radio
  
} from 'antd';
import {
  CloseOutlined,
  RedoOutlined,
  CheckOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { 
   } from '../redux/actions/hoadon';
import axios from 'axios';
import Swal from 'sweetalert2';
import {port} from '../config/configAPI';
import { Switch } from 'antd';


class QuanLyGiaoHang extends Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }
    //Cap nhat trang thai san pham
    
    columns = [
        {
          title: 'Mã hóa đơn',
          dataIndex: 'MaHD',
          key: 'MaHD',
        },
        {
          title: 'Người mua hàng',
          dataIndex: 'HoTen',
          key: 'HoTen',
          //...this.getColumnSearchProps('LoaiSP')
        },
        {
          title: 'Giao hàng',
          dataIndex: 'TrangThai_GH',
          key: 'TrangThai_GH',
          //...this.getColumnSearchProps('TrangThai'),
          render:(record)=>(
            record>0?(record>1?<h4 className="trangthaitrue">Đã Giao Hàng</h4>:<h4 className="trangthaitrue">Đang Giao Hàng</h4>):<h4 className="trangthaitrue">Chưa Giao Hàng</h4>
          )
        },
        {
          title: 'Thao Tác',
          key:'ThaoTac',
          render:(record)=>(
            <Space>
                
                
                
            </Space>
          )
        }
      ];
    render() {
    let data = this.props.DanhSachHoaDon;
    
      return (
        <div>
                
          <Table 
            rowClassName={record=>record.TrangThai === 0?"disableRow":""}
            dataSource={data}
            columns={this.columns}
            rowKey={record=>record.MaHD}
          >
          </Table>
          
      </div>
      )
    }
  }
  
  const mapStateToProps = (state) => {
    return {
      DanhSachHoaDon:state.DSHoaDon.DSHD,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      
    }
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(QuanLyGiaoHang);