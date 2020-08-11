import React, { Component } from 'react'
import {
    Col,
} from 'antd';
import axios from 'axios'
export default class LuotDangKy extends Component {
    render() {
        return (
            <Col className="infoItem" span={6}>
                <TeamOutlined
                    style={{ fontSize: '40px', color: '#3DBFAE' }}
                />
                <h1 id="songuoidangky" className="solieu">120</h1>
                <h5 className="solieuduoi">người đăng ký</h5>
            </Col>
        )
    }
}
