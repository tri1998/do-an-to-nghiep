import React, { Component } from 'react'
import { Select } from 'antd';
import axios from 'axios';
import {port} from '../config/configAPI.js';
const {Option} = Select
export default class KichThuoc extends Component {
    constructor(props){
        super(props);
        this.state={
            danhSachKichThuoc:[]
        }
    }
    componentDidMount(){
        axios({
            method:"GET",
            url:`http://localhost:${port}/api/kichthuoc/layDSKT`
        })
        .then(res=>this.setState({
            danhSachKichThuoc:res.data
        }))
        .catch(err=>console.log(err))
    }
    render() {
        const {danhSachKichThuoc} = this.state;
        let MaKT = this.props.maKichThuoc;
        return (
            <Select defaultValue={MaKT} placeholder="Chọn kích thước">
            {
                danhSachKichThuoc.map((kt,index)=>{
                    return <Option key={index} value={kt.MaKT}>{kt.TenKT}</Option>
                })
            }
            </Select>
        )
    }
}
