import React, { Component, createRef } from 'react'
import { Carousel } from 'antd';
import {Button} from 'antd'
import { LeftOutlined,RightOutlined } from '@ant-design/icons';
import SanPham from './sanpham'
import {connect} from 'react-redux'

class sanphamlienquan extends Component {
    constructor(props){
        super(props);
        this.carouselRef = createRef();
    }

    loadSanPhamLienQuan=()=>{
        let spChon = this.props.sanPhamDuocChon;
        return this.props.DSSPLienQuan.map((sp,index)=>{
            return sp.MaDM===spChon.MaDM?<SanPham key={index} sanPham={sp}></SanPham>:null
        })
    }

    handleNext = ()=>this.carouselRef.current.next();
    handlePrev = ()=>this.carouselRef.current.prev();

    render() {
        return (
            <div>
                <Button
                    size='large'
                    shape='round'
                >
                    SẢN PHẨM LIÊN QUAN
                </Button>
                <Carousel style={{marginTop:15}} dots={false} className="sanphamlienquan" autoplay ref={this.carouselRef}>
                    {
                        this.loadSanPhamLienQuan()
                    }
                </Carousel>
            <Button size="medium" icon={<LeftOutlined />} type="ghost"shape="circle" onClick={this.handlePrev}>
            </Button>
            <Button size="medium" icon={<RightOutlined />} type="ghost" shape="circle" onClick={this.handleNext}>
            </Button>
        </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        DSSPLienQuan:state.DSSP.DanhSachSanPham,
        sanPhamDuocChon:state.DSSP.sanPhamDuocChon
    }
}

export default connect(mapStateToProps,null)(sanphamlienquan)
