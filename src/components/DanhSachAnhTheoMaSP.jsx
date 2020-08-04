import React, { Component } from 'react'
import {Row,Col} from 'antd';
import axios from 'axios'
import {port} from '../config/configAPI';
export default class DanhSachAnhTheoMaSP extends Component {

    constructor(props){
        super(props);
        this.state={
            danhSachAnh:[]
        }
    }

    componentDidMount(){
        let MaSP = this.props.MaSP;
        axios({
            method:"GET",
            url:`http://localhost:${port}/api/sanpham/layDanhSachAnh/${MaSP}`
        })
        .then(res=>this.setState({danhSachAnh:res.data}))
        .catch(err=>console.log(err))
    }
    render() {
        let {danhSachAnh} = this.state;
        return (
            <Row>
                {
                    danhSachAnh===[]?null:danhSachAnh.map((anh,index)=>{
                        return <Col key={index} span={8}>
                            <img alt="sp" className="anhctspduoi" src={anh.HinhAnh}/>
                        </Col>
                    })
                }
            </Row>
        )
    }
}
