import React, { Component, createRef } from 'react'
import { Carousel } from 'antd';
import {Button,Card} from 'antd'
import { LeftOutlined,RightOutlined } from '@ant-design/icons';

export default class sanphamlienquan extends Component {
    constructor(props){
        super(props);
        this.carouselRef = createRef();
    }

    handleNext = ()=>this.carouselRef.current.next();
    handlePrev = ()=>this.carouselRef.current.prev();

    render() {
        return (
            <div>
                <Carousel dots={false} className="sanphamlienquan" autoplay ref={this.carouselRef}>
                <div>
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="example" src="./img/tainghe.png" />}
                    >
                        <div className="wrapprice">
                            <span>590,000Đ</span>
                        </div>
                        <h3>TAI NGHE BLUTOOTH</h3>
                        <Button shape="round" size="large">MUA NGAY</Button>
                    </Card>
                </div>
                <div>
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="example" src="./img/aoteamdut.png" />}
                    >
                        <div className="wrapprice">
                            <span>290,000Đ</span>
                        </div>
                        <h3>ÁO TRỰC TIẾP GAME</h3>
                        <Button shape="round" size="large">MUA NGAY</Button>
                                
                    </Card>
                </div>
                <div>
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="example" src="./img/taycammoi.png" />}
                    >
                        <div className="wrapprice">
                            <span>290,000Đ</span>
                        </div>
                        <h3>ÁO TRỰC TIẾP GAME</h3>
                        <Button shape="round" size="large">MUA NGAY</Button>
                                
                    </Card>
                </div>
                <div>
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="example" src="./img/volang.png" />}
                    >
                        <div className="wrapprice">
                            <span>290,000Đ</span>
                        </div>
                        <h3>ÁO TRỰC TIẾP GAME</h3>
                        <Button shape="round" size="large">MUA NGAY</Button>
                                
                    </Card>
                </div>
            </Carousel>
            <Button size="medium" icon={<LeftOutlined />} type="ghost"shape="circle" onClick={this.handlePrev}>
            </Button>
            <Button size="medium" icon={<RightOutlined />} type="ghost" shape="circle" onClick={this.handleNext}>
            </Button>
        </div>
        )
    }
}
