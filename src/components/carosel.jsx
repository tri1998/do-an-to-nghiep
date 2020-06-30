import React, { Component } from 'react'
import {Carousel} from'antd'
import { Row, Col } from 'antd';
export default class carosel extends Component {
    render() {
        return (
                <div>
                    <Row>
                    <Col span={24}>
                        <Carousel autoplay effect="fade">
                            <div>
                                <img src="./img/aocter.png" alt="ao"/>
                            </div>
                            <div>
                                <img src="./img/balocter.png" alt="balo" />
                            </div>
                            <div>
                                <img src="./img/mohinhcter.png" alt="mohinh" />
                            </div>
                            <div>
                                <img src="./img/logitech.png" alt="banphim" />
                            </div>
                        </Carousel>
                    </Col>
                </Row>
                </div>
                
            
        )
    }
}
