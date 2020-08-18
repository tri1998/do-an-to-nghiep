import React, { Component } from 'react'
import {Row,Pagination,Col} from 'antd'
import {connect} from 'react-redux'
import SanPham from './sanpham'
class all extends Component {

    constructor(props){
        super(props);
        this.state={
            current: 1,
            min:0,
            max:9
        }
    }

    
    onChange = page => {
        console.log(page);
        this.setState({
            min: (page - 1) * 9,
            max: page * 9
        })
    };

    loadSanPhamAll=()=>{
        return this.props.DanhSachSanPham.slice(this.state.min,this.state.max).map((sp,index)=>{
            return <Col span={8} key={index}><SanPham sanPham={sp}></SanPham></Col>
        })
    }

    render() {
        return (
            <div>
                <Row gutter={[0,16]}>
                        {
                        this.loadSanPhamAll()
                        }
                </Row>
                <Pagination 
                defaultCurrent={1} 
                onChange={this.onChange} 
                defaultPageSize={9} 
                total={this.props.DanhSachSanPham.length}>
                </Pagination>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        DanhSachSanPham:state.DSSP.sapXepSanPham
    }
}

export default connect(mapStateToProps,null)(all);
