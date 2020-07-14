import React, { Component } from 'react'
import {Row,Pagination} from 'antd'
import {connect} from 'react-redux'
import SanPham from './sanpham'
class all extends Component {

    constructor(props){
        super(props);
        this.state={
            current: 1,
        }
    }
    
    onChange = page => {
        console.log(page);
        this.setState({
          current: page,
        });
    };

    loadSanPhamAll=()=>{
        return this.props.DanhSachSanPham.map((sp,index)=>{
            return <SanPham key={index} sanPham={sp}></SanPham>
        })
    }

    render() {
        return (
            <div>
                <Row gutter={[0,16]}>
                        {this.loadSanPhamAll()}
                </Row>
                <Pagination defaultCurrent={this.state.current} onChange={this.onChange} defaultPageSize={12} total={50}></Pagination>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        DanhSachSanPham:state.DSSP.DanhSachSanPham
    }
}

export default connect(mapStateToProps,null)(all);
