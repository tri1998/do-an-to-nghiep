import React, { Component } from 'react'
import {Carousel} from'antd'
import { Row, Col } from 'antd';
export default class carosel extends Component {
    render() {
        return (
                
                <Row>
                    <Col span={24}>
                        <Carousel dots={false} autoplay effect="fade">
                            <div>
                                <img src="./img/aocter.png" alt="ao"/>
                            </div>
                            <div>
                                <img src="./img/balocter.jpeg" alt="balo" />
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
                
                
            
        )
    }
}
