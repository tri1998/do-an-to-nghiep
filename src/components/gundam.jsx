import React, { Component } from 'react'
import {Row,Col} from 'antd'
import {connect} from 'react-redux'
import SanPham from './sanpham'
class Gundam extends Component {

    loadDanhSachGundam=()=>{
        return this.props.DanhSachGundam.map((gundam,index)=>{
            return gundam.MaDM===2?<Col key={index} span={8}><SanPham sanPham={gundam}></SanPham></Col>:null
        })
    }

    render() {
        let checkGundam=this.props.DanhSachLoaiSanPham.findIndex(Gundam=>Gundam.MaDM===2&&Gundam.TrangThai===1);
        return (
            <div>
                <Row gutter={[0,16]}>
                        {checkGundam!==-1?this.loadDanhSachGundam():<div>Sản phẩm này đã ngừng kinh doanh</div>}
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        DanhSachGundam:state.DSSP.DanhSachSanPham,
        DanhSachLoaiSanPham:state.DSSP.DanhSachLoaiSanPham
    }
}

export default connect(mapStateToProps,null)(Gundam);