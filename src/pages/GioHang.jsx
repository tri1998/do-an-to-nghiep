import React, { Component} from 'react'
import {
    Table,
    Form,
    Input,
    Button,
    Space,
    Row,
    Col
}from 'antd'

import {
    DeleteOutlined,
    RightOutlined,
    ArrowLeftOutlined
  } from '@ant-design/icons';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {actXoaSanPham,actCapNhatSoLuongSanPham} from '../redux/actions/giohang'

const {TextArea} = Input;
class GioHang extends Component {
    constructor(props){
        super(props);
        this.state={
            soLuong:1,
            maSanPham:1,
        }
    }


    handleOnChange=(e)=>{
        this.setState({
            [e.target.name]:parseInt(e.target.value),
        },
        ()=>this.props.capNhatSoLuongSanPham(this.state.maSanPham,this.state.soLuong)
        )
    }

    xoaSanPham=(maSP)=>{
        this.props.xoaSanPhamGioHang(maSP);
    }

    updateSoLuong=(maSanPham)=>{
        console.log("Mã sp : "+ maSanPham);
    }

    columns = [
        {
          title: 'Sản phẩm',
          dataIndex: 'Hinh',
          key: 'Hinh',
          render:(text,record)=>(
            <Link to={`/${record.MaSP}`}><img className="hinhSPGioHang" src={record.Hinh} alt={record.TenSP}/></Link> 
          )
        },
        {
          title: 'Tên sản phẩm',
          dataIndex: 'TenSP',
          key: 'TenSP',
        },
        {
          title: 'Số lượng',
          dataIndex: 'address',
          key: 'address',
          render:(text,record)=>(
              <Space>
                <Input 
                    name="soLuong"
                    onMouseOver={()=>this.setState({maSanPham:record.MaSP})}
                    onChange={this.handleOnChange} 
                    defaultValue={record.SoLuong} 
                    type="number" 
                    min={1} 
                    max={50}
                />
              <Button 
                size="small"
                onClick={()=>this.xoaSanPham(record.MaSP)}
              >
                <DeleteOutlined />
              </Button>
              </Space>
          )
        },
        {
            title: 'Giá tiền',
            dataIndex: 'Gia',
            key: 'Gia',
            
        },
      ];

    render() {
        let data = this.props.danhSachSanPham;
        return (
            <div>
                {JSON.parse(sessionStorage.getItem('giohang'))!==null?
                <Form className="frmGioHang">
                    <Row>
                        <Col span={24}><h1 className="tieude">GIỎ HÀNG</h1></Col>
                        <Col span={24}>
                            <Table 
                                columns={this.columns}
                                dataSource={data}
                                rowKey={record=>record.TenSP}
                            />
                        </Col>
                    </Row>
                    <Row className="rowTongTien">
                        <Col span={20}><h2>Tổng tiền :</h2></Col>
                        <Col span={4}><span className="tongTien">{this.props.tongTien.toLocaleString('vn-VN', {style : 'currency', currency : 'VND'})}</span></Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <TextArea
                                placeholder="Ghi chú..."
                                style={{marginTop:5,marginBottom:5,marginLeft:5}}
                            />
                        </Col>
                        <Col span={12}>
                            
                        </Col>
                        <Col span={6}>
                            <Button 
                                size="large" 
                                type="primary" 
                                danger
                                style={{marginTop:5,marginBottom:5}}
                            >
                                Thanh toán<RightOutlined />
                            </Button>
                        </Col>
                    </Row>
                    
                </Form>
                :<div className="gioHangTrong">
                    <h1 >GIỎ HÀNG</h1>
                    <h4 >Không có sản phẩm nào trong giỏ hàng !</h4>
                    
                        <Link to="/trangchu">
                            <ArrowLeftOutlined />Tiếp tục mua hàng
                        </Link>
                </div>}

            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        danhSachSanPham:state.DSSPMua.mangSanPham,
        tongTien:state.DSSPMua.tongTien
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        xoaSanPhamGioHang:(maSanPham)=>{
            dispatch(actXoaSanPham(maSanPham))
        },
        capNhatSoLuongSanPham:(maSanPham,soLuong)=>{
            dispatch(actCapNhatSoLuongSanPham(maSanPham,soLuong))
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(GioHang);