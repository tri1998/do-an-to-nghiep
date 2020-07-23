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
                                <img src="https://res.cloudinary.com/dl9fnqrq3/image/upload/v1595492994/sieuphamaocter.png" alt="ao"/>
                            </div>
                            <div>
                                <img src="https://res.cloudinary.com/dl9fnqrq3/image/upload/v1595492993/balocter.jpg" alt="balo" />
                            </div>
                            <div>
                                <img src="https://res.cloudinary.com/dl9fnqrq3/image/upload/v1595492998/mohinhcter.png" alt="mohinh" />
                            </div>
                            <div>
                                <img src="https://res.cloudinary.com/dl9fnqrq3/image/upload/v1595492998/SP02.png" alt="banphim" />
                            </div>
                        </Carousel>
                    </Col>
                </Row>
                
                
            
        )
    }
}
