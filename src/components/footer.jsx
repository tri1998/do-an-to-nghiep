import React, { Component } from 'react'
import {Row,Col} from 'antd'
import { Input } from 'antd'
import {Button} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
export default class footer extends Component {
    
    render() {
        return (
            <div className="footer">
                <Row gutter={16}>
                    <Col span={6}>
                        <Row>ĐĂNG KÝ NHẬN TIN</Row>
                        <hr></hr>
                        <br/>
                        <Row>
                            <Col span={21}>
                                <Input placeholder="Nhập email của bạn" />
                            </Col>
                            <Col span={2}>
                                <Button type="danger" icon={<PlusOutlined />} size={"medium"} />
                            </Col>
                        </Row>
                        
                    </Col>
                    <Col span={4}>
                        <Row>HỖ TRỢ</Row>
                        <hr/>
                        <br/>
                        <Row>
                            <ul type="list">
                                <li><a>Chính Sách Đổi Trả</a><hr/></li>
                                <li><a>Chính Sách Bảo Mật</a><hr/></li>
                                <li><a>Quy Định Bảo Hành</a><hr/></li>
                                <li><a>Tài Khoản Ngân Hàng</a><hr/></li>
                                <li><a>Tìm Kiếm</a><hr/></li>
                            </ul>
                        </Row>
                    </Col>
                    <Col span={6}>
                        <Row>GIỚI THIỆU</Row>
                        <hr/>
                        <br/>
                        <Row>
                        <ul type="list">
                                <li>TTG Shop - Số 523 Nguyễn Tri Phương - 
                                    Q.10 - Hồ Chí Minh</li>
                                <li>Email:tructiepgame@gmail.com</li>
                                <li>Hotline: 0392921384</li>
                                <li>Chúng tôi đang ngày càng hoàn thiện sản phẩm và
                                    dịch vụ của mình nhằm không ngừng đáp ứng sự tin tưởng
                                    và niềm tin của khách hàng
                                </li>
                            </ul>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row>FACEBOOK</Row>
                        <hr/>
                    </Col>
                </Row>

            </div>
        )
    }
}
