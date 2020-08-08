import React, { Component } from 'react'
import { Button} from 'antd'
import {connect} from 'react-redux';
import SanPham from './sanpham';
class sanphamvuaxem extends Component {


    render() {
        return (
            <div>
                {this.props.sanPhamVuaXem === null ?<div></div>:
                <div>
                <Button
                    size='large'
                    shape='round'
                    style={{marginBottom:10}}
                >
                    SẢN PHẨM VỪA XEM
                </Button>
                <SanPham sanPham={this.props.sanPhamVuaXem}></SanPham>
         
                </div>}
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        sanPhamVuaXem:state.DSSP.sanPhamVuaXem
    }
}

export default connect(mapStateToProps,null)(sanphamvuaxem)