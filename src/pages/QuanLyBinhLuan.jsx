import React, { Component } from 'react'
import { Tabs,Select, Button,List, Avatar } from 'antd';
import moment from 'moment';
import axios from 'axios';
import {port} from '../config/configAPI';
import BinhLuan from '../components/BinhLuanSanPham.jsx';
import DanhSachBinhLuanMoi from '../components/DanhSachBinhLuanMoi';
import {connect} from 'react-redux';
const { TabPane } = Tabs;
const { Option } = Select;

class QuanLyBinhLuan extends Component {

    constructor(props){
        super(props);
        this.state={
            danhSachBinhLuanMoi:[],
            maSanPham:null
        }
    }

    componentDidMount(){
        let today = moment().format('YYYY-MM-DD');
        axios({
            method:"GET",
            url:`http://localhost:${port}/api/binhluan/layDanhSachBinhLuanTheoNgay/${today}`
        })
        .then(res=>{
            console.log(res.data);
            this.setState({
                danhSachBinhLuanMoi:res.data
            })
        })
        .catch(err=>console.log(err));
    }

    handleChange =(value) =>{
        this.setState({
            maSanPham:value
        })
    }



    render() {
        const {maSanPham} = this.state;
        const danhSachSanPham = this.props.danhSachSanPham;
        return (
            <div>
                <Tabs defaultActiveKey="1" centered="true">
                    <TabPane tab="Tất Cả Bình Luận" key="1">
                        Chọn sản phẩm : <Select style={{ width: '50%' }} onChange={this.handleChange}>
                                            {
                                                danhSachSanPham.map((sp,index)=>{
                                                    return <Option key={index} value={sp.MaSP}>
                                                            <img src={sp.Hinh} style={{width:'20px'}} alt={`${sp.TenSP}`}></img>
                                                            {sp.TenSP}
                                                          </Option>
                                                })
                                            }
                                        </Select>
                                        <Button type="primary" onClick={()=>this.setState({maSanPham:null})}>Clear</Button>
                        {maSanPham===null?null:<BinhLuan maSanPham={maSanPham}></BinhLuan>}
                    </TabPane>
                    <TabPane tab="Bình Luận Trong Ngày" key="2">
                        <DanhSachBinhLuanMoi></DanhSachBinhLuanMoi>
                    </TabPane>
                    
                </Tabs>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        danhSachSanPham:state.DSSP.DanhSachSanPham
    }
}

export default connect(mapStateToProps,null)(QuanLyBinhLuan)
