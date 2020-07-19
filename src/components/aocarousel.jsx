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
                        <Col span={4} className="right">
                            <Button onClick={() => console.log(this.laySPChon)} shape="round" size="large">
                                ÁO TTG <RightOutlined />
                            </Button>
                        </Col>
                        <Col span={18} className="pdt12"><hr /></Col>
                        <Col span={1} className="right">
                            <Tooltip title="Prev" >
                                <Button onClick={this.handlePrev} shape="circle" size="medium" icon={<LeftOutlined />}></Button>
                            </Tooltip>
                        </Col>
                        <Col span={1}>
                            <Tooltip title="Next">
                                <Button onClick={this.handleNext} shape="circle" size="medium" icon={<RightOutlined />}></Button>
                            </Tooltip>
                        </Col>
                    </Row>
                    <br />
                     <Carousel ref={this.carouselRef} dots={false} autoplay className="items" slidesToScroll={1} slidesToShow={4} >
                        {
                            checkAo!==-1?this.loadDSAo():null
                        }
                    </Carousel>
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