import React, { Component } from 'react'
import {Row,Col, Button,Popconfirm,message} from 'antd';
import axios from 'axios'
import {port} from '../config/configAPI';
import {connect} from 'react-redux';
class DanhSachAnhTheoMaSP extends Component {

    constructor(props){
        super(props);
        this.state={
            danhSachAnh:[]
        }
    }

    componentDidMount(){
        let MaSP = this.props.MaSP;
        axios({
            method:"GET",
            url:`http://localhost:${port}/api/sanpham/layDanhSachAnh/${MaSP}`
        })
        .then(res=>this.setState({danhSachAnh:res.data}))
        .catch(err=>console.log(err))
    }

    //Xac nhan xoa anh nhan tham so dau vao la mot ID cua anh
    confirm = (ID) => {
        axios({
            method:"DELETE",
            url:`http://localhost:${port}/api/sanpham/xoaAnhSP/${ID}`
        })
        .then(res=>{
            if(res.data.message){
                let anhCapNhat = [...this.state.danhSachAnh];
                const viTri = anhCapNhat.findIndex(anh=>anh.ID===ID);
                anhCapNhat.splice(viTri,1);
                this.setState({danhSachAnh:anhCapNhat});
                message.success(res.data.message);
            }
        })
    }
      
    cancel = (e) => {
        
    }

    render() {
        let {danhSachAnh} = this.state;
        return (
            <Row gutter={[8,8]}>
                {
                    danhSachAnh===[]?null:danhSachAnh.map((anh,index)=>{
                        return <Col key={index} span={8}>
                            <img alt="sp" className="anhctspduoi" src={anh.HinhAnh}/>
                            <Popconfirm
                                title="Bạn muốn xóa ảnh này?"
                                onConfirm={()=>this.confirm(anh.ID)}
                                onCancel={this.cancel}
                                okText="Đồng ý"
                                cancelText="Không"
                            >
                                <Button 
                                type="primary"
                                style={{marginTop:'5px'}} 
                                danger
                                style={{display: this.props.nguoiDung.isAdmin?true:'none'}}
                                block >Xóa</Button>
                            </Popconfirm>
                        </Col>
                    })
                }
            </Row>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        nguoiDung:state.DSND.UserInformation
    }
}

export default connect(mapStateToProps,null)(DanhSachAnhTheoMaSP);
