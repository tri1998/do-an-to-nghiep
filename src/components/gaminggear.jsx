import React, { Component } from 'react'
import {Row} from 'antd'
import {connect} from 'react-redux'
import SanPham from './sanpham'
class GammingGear extends Component {

    loadDanhSachGear=()=>{
        return this.props.DanhSachGear.map((gear,index)=>{
            return gear.MaDM===1? <SanPham key={index} sanPham={gear}></SanPham>:null
        })
    }

    render() {
        return (
            <div>
                <Row gutter={[0,16]}>
                        {this.loadDanhSachGear()}
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        DanhSachGear:state.DSSP.DanhSachSanPham
    }
}

export default connect(mapStateToProps,null)(GammingGear);