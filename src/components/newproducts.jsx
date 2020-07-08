import React, { Component } from 'react'
import { Row, Col } from 'antd';
import { Button, Tooltip } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { Carousel } from 'antd';
import { createRef } from 'react';
import { connect } from 'react-redux';
import SanPham from './sanpham';
import axios from 'axios'
import { actLuuMangSP } from '../redux/actions/sanpham';

class newproducts extends Component {
    constructor(props) {
        super(props);
        this.carouselRef=createRef();
    }

    handlePrev =()=> this.carouselRef.current.prev();
    handleNext =()=> this.carouselRef.current.next();


    loadDSSP = () => {
        console.log('ok', this.props.DSSP)
        return this.props.DSSP.map((sp, index) => {
            console.log(sp, index)
            return (<SanPham key={index} sanPham={sp}></SanPham>)
        })
    }



    componentDidMount() {
        console.log(this.props.DSSP);
        axios({
            method: "GET",
            url: 'http://localhost:1234/api/sanpham'
        }).then(res => {
            this.props.onSaveDSSanPham(res.data);
        })
            .catch(error => console.log(error));
    }

    render() {
        
        return (
            <div>
                {this.props.DSSP.length!==0?
                <div className="newproduct">
                    
                    <Row>
                        <Col span={4} className="right">
                            <Button onClick={() => console.log(this.laySPChon)} shape="round" size="large">
                                HÀNG MỚI VỀ <RightOutlined />
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
                             this.loadDSSP()
                        }
                    </Carousel>
                </div>:null}
            </div>
        )
    }
    
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSaveDSSanPham: (danhsachsanpham) => {
            dispatch(actLuuMangSP(danhsachsanpham))
        }

    }
}

const mapStateToProp = (state) => {
    return {
        DSSP: state.DSSP.DanhSachSanPham
    }
}


export default connect(mapStateToProp, mapDispatchToProps)(newproducts);
