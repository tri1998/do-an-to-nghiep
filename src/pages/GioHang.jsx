import React, { Component} from 'react'
import {
    Table,
    Form,
    Input,
    Button,
    Space,
    Row,
    Col,
    notification,
    Popconfirm
}from 'antd'

import {
    DeleteOutlined,
    RightOutlined,
    ArrowLeftOutlined,
    FrownOutlined
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
            kichThuoc:6
        }
    }

    //Thong bao nay duoc show ra khi nguoi dung nhap so luon < 1
    openNotification = () => {
        notification.open({
          message: 'Lỗi',
          description:
            'Số lượng sản phẩm phải lớn hơn 0 !',
          icon: <FrownOutlined style={{ color: '#108ee9' }} />,
        });
    };

    confirm =(MaSP,MaKT)=>{
        this.props.xoaSanPhamGioHang(MaSP,MaKT);
    }
      
    cancel = (e) => {
        console.log(e);
    }


    handleOnChange=(e)=>{
        this.setState({
            [e.target.name]:parseInt(e.target.value),
        },
        ()=>this.state.soLuong>0
        ?this.props.capNhatSoLuongSanPham(this.state.maSanPham,this.state.soLuong,this.state.kichThuoc)
        :this.openNotification()
        )
    }

    columns = [
        {
          title: 'Sản phẩm',
          dataIndex: 'Hinh',
          key: 'Hinh',
          render:(text,record)=>(
            <Link to={`/sanpham/${record.MaSP}`}><img className="hinhSPGioHang" src={record.Hinh} alt={record.TenSP}/></Link> 
          )
        },
        {
          title: 'Tên sản phẩm',
          dataIndex: 'TenSP',
          key: 'TenSP',
          render:(text,record)=>(
              <div className="tenSanPhamGioHang">
                  <h3>{record.TenSP}</h3>
                  {record.kichThuoc===6?<div></div>:<h3>Size {record.tenKichThuoc}</h3>}
              </div>
          )
        },
        {
          title: 'Số lượng',
          dataIndex: 'address',
          key: 'address',
          render:(text,record)=>(
              <Space>
                <Input 
                    name="soLuong"
                    onMouseOver={()=>this.setState({
                        maSanPham:record.MaSP,
                        kichThuoc:record.kichThuoc
                    })}
                    onChange={this.handleOnChange} 
                    defaultValue={record.SoLuong} 
                    type="number" 
                    min={1} 
                    max={50}
                />

            <Popconfirm
                title="Bạn muốn xóa sản phẩm này khỏi giỏ hàng ?"
                onConfirm={()=>this.confirm(record.MaSP,record.kichThuoc)}
                onCancel={this.cancel}
                okText="Có "
                cancelText="Không"
            >

              <Button 
                size="small"
              >
                <DeleteOutlined />
              </Button>

            </Popconfirm>
              
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
                {this.props.soLuongSanPham!==0?
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
                                onClick={()=>this.props.history.push('/thanhtoan')}
                                style={{marginTop:5,marginBottom:5}}
                            >
                                Thanh toán<RightOutlined />
                            </Button>
                        </Col>
                    </Row>
                    
                </Form>
                :<div className="gioHangTrong">
                    {
                        sessionStorage.removeItem('giohang')
                    }
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
        tongTien:state.DSSPMua.tongTien,
        soLuongSanPham:state.DSSPMua.soLuongSanPhamCoTrongGio
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        xoaSanPhamGioHang:(maSanPham,maKichThuoc)=>{
            dispatch(actXoaSanPham(maSanPham,maKichThuoc))
        },
        capNhatSoLuongSanPham:(maSanPham,soLuong,kichThuoc)=>{
            dispatch(actCapNhatSoLuongSanPham(maSanPham,soLuong,kichThuoc))
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(GioHang);