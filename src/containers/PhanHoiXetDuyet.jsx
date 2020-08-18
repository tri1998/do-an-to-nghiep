import React, { Component } from 'react'
import { Table, Space, Button, Popconfirm,message } from 'antd';
import axios from 'axios';
import { port } from '../config/configAPI';
import moment from 'moment'
import {
    CheckOutlined
} from '@ant-design/icons';

export default class PhanHoiXetDuyet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            danhSachPhanHoi: []
        }
    }
    confirm = (MaCTBL) => {
        
        axios({
            method:"PUT",
            url:`http://localhost:${port}/api/binhluan/duyetPhanHoi/${MaCTBL}`
        })
        .then(res=>{
            if(res.data.messageSuccess)
            {
                let phanHoiCapNhat = [...this.state.danhSachPhanHoi];
                const viTri = phanHoiCapNhat.findIndex(ph=>ph.MaCTBL===MaCTBL);
                phanHoiCapNhat.splice(viTri,1);
                this.setState({
                    danhSachPhanHoi:phanHoiCapNhat
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
            url: `http://localhost:${port}/api/binhluan/layDanhSachPhanHoi`
        })
            .then(res => this.setState({danhSachPhanHoi: res.data }))
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
            title: 'Duyệt Phản Hồi',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">

                    <Popconfirm
                        title="Bạn muốn duyệt phản hồi này không ?"
                        onConfirm={()=>this.confirm(record.MaCTBL)}
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
        const { danhSachPhanHoi } = this.state;
        return (
            <div>
                <Table
                    rowKey={record => record.MaCTBL}
                    columns={this.columns}
                    dataSource={danhSachPhanHoi}
                />
            </div>
        )
    }
}
