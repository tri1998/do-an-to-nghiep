import React, { Component } from 'react'
import { List, Avatar } from 'antd';
import moment from 'moment';
import axios from 'axios';
import {port} from '../config/configAPI';
import {Link} from 'react-router-dom';



export default class DanhSachBinhLuanMoi extends Component {
    constructor(props){
        super(props);
        this.state={
            danhSachBinhLuanMoi:[],
        }
    }
    componentDidMount(){
        axios({
            method:"GET",
            url:`http://localhost:${port}/api/binhluan/layDanhSachBinhLuanTheoNgay`
        })
        .then(res=>{
            console.log(res.data);
            this.setState({
                danhSachBinhLuanMoi:res.data
            })
        })
        .catch(err=>console.log(err));
    }
    render() {
        const {danhSachBinhLuanMoi} = this.state;
        return (
            <div>
                <List
                            itemLayout="horizontal"
                            dataSource={danhSachBinhLuanMoi}
                            renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<Link to={`/sanpham/${item.MaSP}`}>{item.HoTen}</Link>}
                                description={`${item.NoiDung}`}
                                />
                            </List.Item>
                            )}
                        />
            </div>
        )
    }
}
