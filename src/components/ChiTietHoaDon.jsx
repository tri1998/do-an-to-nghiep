import React, { Component } from 'react'
import axios from 'axios'
import { port } from '../config/configAPI';
import { Table, Tag, Space } from 'antd';

export default class ChiTietHoaDon extends Component {
    constructor(props){
        super(props);
        this.state={
            danhSachCTHD:[]
        }
    }
    componentDidMount(){
        const MaHD = this.props.MaHD;
        axios({
            method:"GET",
            url:`http://localhost:${port}/api/chitietHD/layDDCTHD/${MaHD}`
        })
        .then(res=>this.setState({danhSachCTHD:res.data}))
        .catch(err=>console.log(err))
    }




    columns = [
        {
          title: 'Tên sản phẩm',
          dataIndex: 'TenSP',
          key: 'TenSP',
        },
        {
          title: 'Kích thước',
          dataIndex: 'TenKT',
          key: 'TenKT',
          render:(record)=>(
            record==='None'?null:<span>Size {record}</span>
          )
        },
        {
          title: 'Số lượng',
          dataIndex: 'SL',
          key: 'SL',
        },
        {
            title: 'Giá',
            dataIndex: 'Gia',
            key: 'Gia',
            render:(record)=>(
              (record).toLocaleString('vn-VN', {style : 'currency', currency : 'VND'})
            )
        },
        {
          title: 'Thành Tiền',
          render:(record)=>(
            (record.Gia*record.SL).toLocaleString('vn-VN', {style : 'currency', currency : 'VND'})
          )
      }
        
      ];




    render() {
        let {danhSachCTHD} = this.state;
        return (
            <div>
                <Table 
                columns={this.columns} 
                dataSource={danhSachCTHD}
                rowKey={record=>record.TenSP}
                 />
            </div>
        )
    }
}
