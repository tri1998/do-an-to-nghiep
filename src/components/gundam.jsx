import React, { Component } from 'react'
import {Row} from 'antd'
import {connect} from 'react-redux'
import SanPham from './sanpham'
class Gundam extends Component {

    loadDanhSachGundam=()=>{
        return this.props.DanhSachGundam.map((gundam,index)=>{
            return gundam.MaDM===2? <SanPham key={index} sanPham={gundam}></SanPham>:null
        })
    }

    render() {
        return (
            <div>
                <Row gutter={[0,16]}>
                        {this.loadDanhSachGundam()}
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        DanhSachGundam:state.DSSP.DanhSachSanPham
    }
}

export default connect(mapStateToProps,null)(Gundam);