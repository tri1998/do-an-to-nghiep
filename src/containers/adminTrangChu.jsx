import React, { Component } from 'react'
import { 
    Spin,
    Row,
    Col,
} from 'antd';
import {
    ShoppingCartOutlined,
    CommentOutlined,
    TeamOutlined,
    SearchOutlined,
    EyeOutlined,
    PlusSquareOutlined,
    FileDoneOutlined,
    FileExcelOutlined,
    LoadingOutlined
} from '@ant-design/icons';
import {port} from '../config/configAPI';
import axios from 'axios';

export default class adminTrangChu extends Component {

    constructor(props){
        super(props);
        this.state={
            soLuongTK:0,
            soLuongHD:0,
            soLuongHD1:0,
            soLuongHD2:0,
            soLuotBL:0,
        }
    }

    componentDidMount(){
        axios({
            method:"GET",
            url:`http://localhost:${port}/api/thongke/luotdangky`
        })
        .then(res=>this.setState({soLuongTK:res.data[0].SOLUONG}))
        .catch(err=>console.log(err))

        axios({
            method:"GET",
            url:`http://localhost:${port}/api/thongke/soluongHD`
        })
        .then(res=>this.setState({soLuongHD:res.data[0].SOLUONG}))
        .catch(err=>console.log(err))

        axios({
            method:"GET",
            url:`http://localhost:${port}/api/thongke/soluongHD1`
        })
        .then(res=>this.setState({soLuongHD1:res.data[0].SOLUONG}))
        .catch(err=>console.log(err))

        axios({
            method:"GET",
            url:`http://localhost:${port}/api/thongke/soluongHD2`
        })
        .then(res=>this.setState({soLuongHD2:res.data[0].SOLUONG}))
        .catch(err=>console.log(err))

        axios({
            method:"GET",
            url:`http://localhost:${port}/api/thongke/soluongBL`
        })
        .then(res=>this.setState({soLuotBL:res.data[0].SOLUONG}))
        .catch(err=>console.log(err))
        
    }
    
    render() {
        const {soLuongTK,soLuongHD,soLuongHD1,soLuongHD2,soLuotBL} = this.state;
        return (
            <div style={{ width:'100%',height:'400px',position:'relative',padding:'20px'}}>
                <Row  gutter={[8]} className="adminInfomation">
                    <Col xs={{span:24}} className="infoItem" span={6}>
                        <ShoppingCartOutlined 
                            style={{fontSize:'40px',color:'cornflowerblue'}}
                        />
                        <h1 id="sodonhang" className="solieu">{soLuongHD===0?<LoadingOutlined/>:soLuongHD}</h1>
                        <h3 className="solieuduoi">Đơn hàng</h3>
                    </Col>
                    <Col xs={{span:24}} className="infoItem"  lg={{span:6}}>
                        <CommentOutlined 
                            style={{fontSize:'40px',color:'#E3B34B'}}
                        />
                        <h1 id="sobinhluan" className="solieu">{soLuotBL===0?<LoadingOutlined/>:soLuotBL}</h1>
                        <h3 className="solieuduoi">Bình luận</h3>
                    </Col>
                    <Col xs={{span:24}} className="infoItem"  lg={{span:6}}>
                        <TeamOutlined 
                            style={{fontSize:'40px',color:'#3DBFAE'}}
                        />
                        <h1 id="songuoidangky" className="solieu">{soLuongTK===0?<LoadingOutlined/>:soLuongTK}</h1>
                        <h3 className="solieuduoi">người đăng ký</h3>
                    </Col>
                    <Col xs={{span:24}} className="infoItem"  lg={{span:6}}>
                        <FileDoneOutlined
                            style={{fontSize:'40px',color:'#ccbbde3'}}
                        />
                        <h1 id="songuoidangky" className="solieu">{soLuongHD2===0?<LoadingOutlined/>:soLuongHD2}</h1>
                        <h3 className="solieuduoi">Hóa đơn đã thanh toán</h3>
                    </Col>
                    <Col xs={{span:24}} className="infoItem"  lg={{span:6}}>
                        <FileExcelOutlined
                            style={{fontSize:'40px',color:'red'}}
                        />
                        <h1 id="soluottimkiem" className="solieu">{soLuongHD1===0?<LoadingOutlined/>:soLuongHD1}</h1>
                        <h3 className="solieuduoi">Hóa đơn chưa thanh toán</h3>
                    </Col>
                </Row>




                <Spin style={{position:'absolute',top:0,left:0}}/>
                <Spin style={{position:'absolute',top:0,right:0}}/>
                <Spin style={{position:'absolute',bottom:0,left:0}}/>
                <Spin style={{position:'absolute',bottom:0,right:0}}/>
            </div>
        )
    }
}
