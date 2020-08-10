import React, { Component } from 'react'
import { Select } from 'antd';
import axios from 'axios';
import { port } from '../config/configAPI.js';
const {Option} = Select;

export default class HangSanXuat extends Component {
    constructor(props){
        super(props);
        this.state={
            danhSachHangSX:[]
        }
    }
    componentDidMount(){
        axios({
            method:"GET",
            url:`http://localhost:${port}/api/hangsx/layDSHangsx`
        })
        .then(res=>this.setState({
            danhSachHangSX:res.data
        }))
        .catch(err=>console.log(err))
    }
    render() {
        
        const {danhSachHangSX} = this.state;
        return (
            <Select placeholder="Chọn Hãng Sản Xuất !">
                {
                    danhSachHangSX.map((hang,index)=>{
                    return <Option key={index} value={hang.MaHang}>{hang.Tenhang}</Option>
                    })
                }
            </Select>
        )
    }
}
