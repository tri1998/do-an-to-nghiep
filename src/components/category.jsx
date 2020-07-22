import React from 'react'
import { Row, Col } from 'antd';
import {Link} from 'react-router-dom'
export default function category() {
    return (
        <Row gutter={8}>
            <Col className="category" span={8}>
                <img src="./img/banner1.png" alt=""/>
            </Col>
            <Col className="category" span={8}>
                <Link to="/loaisanpham/gaminggear"><img src="./img/banner2.png" alt=""/></Link>
            </Col>
            <Col className="category" span={8}>
                <Link to="/loaisanpham/gundam"><img src="./img/banner3.png" alt=""/></Link>
            </Col>
         </Row>
    )
}
