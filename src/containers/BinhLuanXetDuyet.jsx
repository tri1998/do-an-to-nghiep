import React, { Component } from 'react'
import { Table, Space, Button, Popconfirm,message } from 'antd';
import axios from 'axios';
import { port } from '../config/configAPI';
import moment from 'moment'
import {
    CheckOutlined
} from '@ant-design/icons';

export default class BinhLuanXetDuyet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            danhSachBinhLuan: []
        }
    }

    confirm = (MaBL) => {
        
        axios({
            method:"PUT",
            url:`http://localhost:${port}/api/binhluan/duyetBinhLuan/${MaBL}`
        })
        .then(res=>{
            if(res.data.messageSuccess)
            {
                let binhLuanCapNhat = [...this.state.danhSachBinhLuan];
                const viTri = binhLuanCapNhat.findIndex(bl=>bl.MaBL===MaBL);
                binhLuanCapNhat.splice(viTri,1);
                this.setState({
                    danhSachBinhLuan:binhLuanCapNhat
                })
                message.success(res.data.messageSuccess);

            }
        })
        .catch(err=>console.log(err))


        
    }

    cancel = (e) => {

    }

    componentDidMount() {
        axios({
            method: "GET",
            url: `http://localhost:${port}/api/binhluan/layDSBL0`
        })
            .then(res => this.setState({ danhSachBinhLuan: res.data }))
            .catch(err => console.log(err))
    }

    columns = [
        {
            title: 'Mã tài khoản',
            dataIndex: 'MaTK',
            key: 'MaTK',
        },
        {
            title: 'Thời Gian',
            dataIndex: 'ThoiGian',
            key: 'ThoiGian',
            render: (record) => (
                moment(record).format('DD-MM-YYYY')
            )
        },
        {
            title: 'Nội Dung',
            dataIndex: 'NoiDung',
            key: 'NoiDung',
        },

        {
            title: 'Duyệt Bình Luận',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">

                    <Popconfirm
                        title="Bạn muốn duyệt bình luận này không ?"
                        onConfirm={()=>this.confirm(record.MaBL)}
                        onCancel={this.cancel}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button
                            type="primary"
                            size="middle"
                        ><CheckOutlined />
                        </Button>
                    </Popconfirm>
                    
                </Space>
            ),
        },
    ];


    render() {
        const { danhSachBinhLuan } = this.state;
        return (
            <div>
                <Table
                    rowKey={record => record.MaBL}
                    columns={this.columns}
                    dataSource={danhSachBinhLuan}
                />
            </div>
        )
    }
}
