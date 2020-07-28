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
    FileExcelOutlined
} from '@ant-design/icons';

export default class adminTrangChu extends Component {
    render() {
        return (
            <div style={{ width:'100%',height:'400px',position:'relative',padding:'20px'}}>
                <Row gutter={[8]} className="adminInfomation">
                    <Col className="infoItem" span={6}>
                        <ShoppingCartOutlined 
                            style={{fontSize:'40px',color:'cornflowerblue'}}
                        />
                        <h1 id="sodonhang" className="solieu">120</h1>
                        <h5 className="solieuduoi">Đơn hàng</h5>
                    </Col>
                    <Col className="infoItem" span={6}>
                        <CommentOutlined 
                            style={{fontSize:'40px',color:'#E3B34B'}}
                        />
                        <h1 id="sobinhluan" className="solieu">120</h1>
                        <h5 className="solieuduoi">Bình luận</h5>
                    </Col>
                    <Col className="infoItem" span={6}>
                        <TeamOutlined 
                            style={{fontSize:'40px',color:'#3DBFAE'}}
                        />
                        <h1 id="songuoidangky" className="solieu">120</h1>
                        <h5 className="solieuduoi">người đăng ký</h5>
                    </Col>
                    <Col className="infoItem" span={6}>
                        <SearchOutlined
                            style={{fontSize:'40px',color:'#D3364D'}}
                        />
                        <h1 id="soluottimkiem" className="solieu">120</h1>
                        <h5 className="solieuduoi">lượt tìm kiếm</h5>
                    </Col>
                    <Col className="infoItem" span={6}>
                        <EyeOutlined 
                            style={{fontSize:'40px',color:'#7BAD41'}}
                        />
                        <h1 id="sodonhang" className="solieu">120</h1>
                        <h5 className="solieuduoi">Lượt xem sản phẩm</h5>
                    </Col>
                    <Col className="infoItem" span={6}>
                        <PlusSquareOutlined 
                            style={{fontSize:'40px',color:'#01BDD8'}}
                        />
                        <h1 id="sobinhluan" className="solieu">120</h1>
                        <h5 className="solieuduoi">Sản phẩm mới</h5>
                    </Col>
                    <Col className="infoItem" span={6}>
                        <FileDoneOutlined
                            style={{fontSize:'40px',color:'#ccbbde3'}}
                        />
                        <h1 id="songuoidangky" className="solieu">120</h1>
                        <h5 className="solieuduoi">Hóa đơn đã thanh toán</h5>
                    </Col>
                    <Col className="infoItem" span={6}>
                        <FileExcelOutlined
                            style={{fontSize:'40px',color:'red'}}
                        />
                        <h1 id="soluottimkiem" className="solieu">120</h1>
                        <h5 className="solieuduoi">Hóa đơn chưa thanh toán</h5>
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
