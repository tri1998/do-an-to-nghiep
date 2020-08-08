import React, { Component } from 'react'
import {Row,Col} from 'antd'
import {connect} from 'react-redux'
import SanPham from './sanpham'
import {Button} from 'antd'
class GammingGear extends Component {

    loadDanhSachGear=()=>{
        return this.props.DanhSachGear.map((gear,index)=>{
            return gear.MaDM===1?<Col key={index} span={8}><SanPham sanPham={gear}></SanPham></Col>:null
        })
    }

    render() {
        let checkGear=this.props.DanhSachLoaiSanPham.findIndex(Gear=>Gear.MaDM===1&&Gear.TrangThai===1);
        return (
            <div>
                <Button onClick={()=>this.props.history.push('/admin')}>Click!</Button>
                <Row gutter={[0,16]}>
                        {checkGear!==-1?this.loadDanhSachGear():<div>Sản phẩm này đã ngừng kinh doanh</div>}
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        DanhSachGear:state.DSSP.DanhSachSanPham,
        DanhSachLoaiSanPham:state.DSSP.DanhSachLoaiSanPham
    }
}

export default connect(mapStateToProps,null)(GammingGear);