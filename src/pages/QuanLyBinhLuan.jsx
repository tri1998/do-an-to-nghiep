import React, { Component } from 'react'
import { Tabs,Select, Button} from 'antd';
import BinhLuan from '../components/BinhLuanSanPham.jsx';
import DanhSachBinhLuanMoi from '../components/DanhSachBinhLuanMoi';
import BinhLuanXetDuyet from '../containers/BinhLuanXetDuyet';
import PhanHoiXetDuyet from '../containers/PhanHoiXetDuyet';
import {connect} from 'react-redux';
const { TabPane } = Tabs;
const { Option } = Select;

class QuanLyBinhLuan extends Component {

    constructor(props){
        super(props);
        this.state={
            maSanPham:null
        }
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

                    <TabPane tab="Bình Luận Chờ Xét Duyệt" key="3">
                        <BinhLuanXetDuyet/>
                    </TabPane>

                    <TabPane tab="Phản Hồi Chờ Xét Duyệt" key="4">
                        <PhanHoiXetDuyet/>
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
