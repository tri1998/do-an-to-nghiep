import React from 'react'
import { Row, Col } from 'antd';
import {Link} from 'react-router-dom'
export default function category() {
    return (
        <Row gutter={8}>
            <Col className="category" xs={{span:24}} lg={{span:8}}>
                <img src="https://res.cloudinary.com/dl9fnqrq3/image/upload/v1595492994/smarthome.jpg" alt=""/>
            </Col>
            <Col className="category" xs={{span:24}} lg={{span:8}}>
                <Link to="/loaisanpham/gaminggear"><img src="https://res.cloudinary.com/dl9fnqrq3/image/upload/v1595492994/Gear.png" alt=""/></Link>
            </Col>
            <Col className="category" xs={{span:24}} lg={{span:8}}>
                <Link to="/loaisanpham/gundam"><img src="https://res.cloudinary.com/dl9fnqrq3/image/upload/v1595492995/Gundam.jpg" alt=""/></Link>
            </Col>
         </Row>
    )
}
