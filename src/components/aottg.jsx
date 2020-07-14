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
        return (
            <div>
                <Row gutter={[0,16]}>
                        {this.loadDanhSachAo()}
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        DanhSachAo:state.DSSP.DanhSachSanPham
    }
}

export default connect(mapStateToProps,null)(aottg);
