import React, { Component } from 'react'
import {Row,Col} from 'antd'
import SanPham from '../components/sanpham';
import {connect} from 'react-redux'
class TimKiemSanPham extends Component {
    
    loadDSSP=()=>{
        return this.props.DSSP.map((sp,index)=>{
            return <Col span={6}><SanPham key={index} sanPham={sp}></SanPham></Col>
        })
    }
    
    render() {

        return (

            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={22}>
                    <Row gutter={[0,20]}>
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
