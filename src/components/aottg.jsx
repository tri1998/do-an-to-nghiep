import React, { Component } from 'react'
import {Row} from 'antd'
import {connect} from 'react-redux'
import SanPham from './sanpham'
class aottg extends Component {

    loadDanhSachAo=()=>{
        return this.props.DanhSachAo.map((ao,index)=>{
            return ao.MaDM===3? <SanPham key={index} sanPham={ao}></SanPham>:null
        })
    }

    render() {
        console.log(this.props.DanhSachAo);
        let checkAo=this.props.DanhSachLoaiSanPham.findIndex(ao=>ao.MaDM===3&&ao.TrangThai===1);
        return (
            <div>
                <Row gutter={[0,16]}>
                        { checkAo!==-1?this.loadDanhSachAo():<div>Sản phẩm này đã ngừng kinh doanh</div>}
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        DanhSachAo:state.DSSP.DanhSachSanPham,
        DanhSachLoaiSanPham:state.DSSP.DanhSachLoaiSanPham
    }
}

export default connect(mapStateToProps,null)(aottg);
