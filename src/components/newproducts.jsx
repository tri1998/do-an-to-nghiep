import React, { Component } from 'react'
import { Row, Col } from 'antd';
import { Button, Tooltip } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { Carousel } from 'antd';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { connect } from 'react-redux';
import SanPham from './sanpham';
import axios from 'axios'
import { actLuuMangSP } from '../redux/actions/sanpham';

class newproducts extends Component {


    loadDSSP = () => {
        console.log('ok', this.props.DSSP)
        return this.props.DSSP.map((sp, index) => {
            console.log(sp, index)
            return (<div><SanPham key={index} sanPham={sp}></SanPham></div>)
        })
    }



    componentDidMount() {
        console.log(this.props.DSSP);
        axios({
            method: "GET",
            url: 'http://localhost:7000/api/sanpham'
        }).then(res => {
            this.props.onSaveDSSanPham(res.data);
        })
            .catch(error => console.log(error));
    }

    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
          };
        return (
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
                                <Button shape="circle" size="medium" icon={<LeftOutlined />}></Button>
                            </Tooltip>
                        </Col>
                        <Col span={1}>
                            <Tooltip title="Next">
                                <Button shape="circle" size="medium" icon={<RightOutlined />}></Button>
                            </Tooltip>
                        </Col>
                    </Row>
                    <br />
                     <Carousel dots={false} autoplay className="items" slidesToScroll={1} slidesToShow={4} >
                        {
                            this.loadDSSP()
                        }
                    </Carousel>
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
