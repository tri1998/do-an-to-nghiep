import React, { Component } from 'react'
import { Row, Col } from 'antd';
import { Button, Tooltip } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { Carousel } from 'antd';
import { createRef } from 'react';
import { connect } from 'react-redux';
import SanPham from './sanpham';

class aocarousel extends Component {
    constructor(props) {
        super(props);
        this.carouselRef=createRef();
        this.state={
            soLuong:4
        }
    }

    handlePrev =()=> this.carouselRef.current.prev();
    handleNext =()=> this.carouselRef.current.next();


    loadDSAo = () => {
        return this.props.DSSP.map((sp, index) => {
                return sp.TrangThai===1&&sp.MaDM===3?<SanPham key={index} sanPham={sp}></SanPham>:null
        })
    }

    render() {
        let checkAo=this.props.DanhSachLoaiSanPham.findIndex(ao=>ao.MaDM===3&&ao.TrangThai===1);
        return (
            <div>
                {this.props.DSSP.length!==0?
                <div className="newproduct">
                    
                    <Row>
                        <Col xs={{span:8}} lg={{span:4}} className="right">
                            <Button onClick={() => console.log(this.laySPChon)} shape="round" size="large">
                                ÁO IN TTG <RightOutlined />
                            </Button>
                        </Col>
                        <Col xs={{span:12}} lg={{span:18}}  className="pdt12"><hr style={{width:'100%'}} /></Col>
                        <Col xs={{span:2}} lg={{span:1}}  className="right">
                            <Tooltip title="Prev" >
                                <Button onClick={this.handlePrev} shape="circle" size="medium" icon={<LeftOutlined />}></Button>
                            </Tooltip>
                        </Col>
                        <Col xs={{span:2}} lg={{span:1}} >
                            <Tooltip title="Next">
                                <Button onClick={this.handleNext} shape="circle" size="medium" icon={<RightOutlined />}></Button>
                            </Tooltip>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col span={24}>
                            <Carousel responsive={[{breakpoint:600,settings:{slidesToShow:2}}]} ref={this.carouselRef} dots={false} autoplay className="items" slidesToScroll={1} slidesToShow={4} >
                            {
                                checkAo!==-1?this.loadDSAo():null
                            }
                            </Carousel>
                        </Col>
                    </Row>
                     
                </div>:null}
            </div>
        )
    }
}

const mapStateToProp = (state) => {
    return {
        DSSP: state.DSSP.DanhSachSanPham,
        DanhSachLoaiSanPham:state.DSSP.DanhSachLoaiSanPham
    }
}


export default connect(mapStateToProp,null)(aocarousel);
