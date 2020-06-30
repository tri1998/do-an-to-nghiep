import React, { Component } from 'react'

export default class KhachHang extends Component {
    render() {
        let {MATK,HOTEN,EMAIL,SODIENTHOAI}=this.props.kh;
        return (
            <div>
                mã tk = {MATK}
            </div>
        )
    }
}
