import React, { Component } from 'react'
import {
    Table,
    Button,
    Space,
    Tooltip

} from 'antd';
import {
    ReadOutlined,
  } from '@ant-design/icons';
import {connect} from 'react-redux';
import axios from 'axios';
import {port} from '../config/configAPI';
import {actLuuDanhSachDotKhuyenMai} from '../redux/actions/khuyenmai.jsx';
class QuanLyKhuyenMai extends Component {
    constructor(props){
        super(props);
    }
     columns = [
        {
          title: 'Tên Đợt Khuyến Mại',
          dataIndex: 'TenDotKM',
          key: 'TenDotKM',
        },
        {
          title: 'Ngày Bắt Đầu',
          dataIndex: 'NgayBD',
          key: 'NgayBD',
        },
        {
          title: 'Ngày Kết Thúc',
          dataIndex: 'NgayKT',
          key: 'NgayKT',
        },
        {
            title: 'Thao Tác ',
            dataIndex: 'ThaoTac',
            key: 'ThaoTac',
            render:(text,record)=>(
                <Space>
                    <Tooltip title="Xem Chi Tiết">
                        <Button 
                        type="primary"
                        onClick={()=>this.xemChiTiet(record.MaKM)}
                        >
                            <ReadOutlined style={{fontSize:20}}/>
                        </Button>
                    </Tooltip>
                </Space>
            )
        },
      ];
    
    xemChiTiet=(maKhuyenMai)=>{
        this.props.history.push(`/admin/chitietkhuyenmai/${maKhuyenMai}`)
    }

    componentDidMount(){
        axios({
            method:"GET",
            url:`http://localhost:${port}/api/khuyenmai/layDanhSachDotKM`
        })
        .then(res=>this.props.luuDanhSachDotKM(res.data))
        .catch(err=>console.log(err));
    }
    render() {
        let danhSachDotKM = this.props.danhSachDotKM;
        return (
            <div>
                <Button type="primary" shape="round">Thêm đọt khuyến mại</Button>
                <Table 
                    columns={this.columns}
                    dataSource={danhSachDotKM}
                />
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        danhSachDotKM:state.DSCTKhuyenMai.danhSachKM
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        luuDanhSachDotKM:(danhSachDotKM)=>{
            dispatch(actLuuDanhSachDotKhuyenMai(danhSachDotKM))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(QuanLyKhuyenMai);
