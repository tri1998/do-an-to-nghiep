import React, { Component } from 'react'
import {Row,Col} from 'antd'
import SanPham from '../components/sanpham';
import {connect} from 'react-redux'
class TimKiemSanPham extends Component {
    
    loadDSSP=()=>{
        return this.props.DSSP.map((sp,index)=>{
            return <Col key={index} xs={{span:12}} lg={{span:6}}><SanPham key={index} sanPham={sp}></SanPham></Col>
        })
    }
    
    render() {

        return (

            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={22}>
                    <Row gutter={[0,20]}>
                        <Col style={{textAlign:'center'}} span={24}>
                            <h1>TÌM KIẾM</h1>
                            <h3>Có {this.props.DSSP.length} kết quả tìm kiếm cho <span style={{fontWeight:'bold'}}>"{JSON.parse(localStorage.getItem('timkiem'))}"</span></h3>
                        </Col>
                    {
                        this.loadDSSP()
                    }
                </Row>
                    </Col>
                    <Col span={1}></Col>
                </Row>
                
                
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        DSSP:state.DSSP.sanPhamTimKiem
    }
}

export default connect(mapStateToProps,null)(TimKiemSanPham);
