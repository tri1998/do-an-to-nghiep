import React, { Component } from 'react'
import { Row, Col } from 'antd';


export default class Infobank extends Component {
    render() {
        return (
            <div>
                <Col span={24} className="box">
                <p>Quí khách chuyển khoản qua ngân hàng với nội dung: Số điện thoại + Số đơn hàng.</p>
                <div className="box-mid">
                <p>VPBank chi nhánh Thành Công.</p>
                <p>Số tài khoản: 12312312321.</p>
                <p>Chủ tài khoản: Phạm Hoàng Ân.</p>
                </div>
                </Col>
            </div>
        )
    }
}