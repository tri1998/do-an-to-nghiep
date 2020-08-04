import React, { Component } from 'react'
import {Row,Col,Menu,Button,Select} from 'antd'
import SanPhamVuaXem from './sanphamvuaxem'
import All from './tatcasp';
import SanPham from './sanpham';
import {Switch,Route,Link} from 'react-router-dom'
import {connect} from 'react-redux';
const {Option} = Select;
class LoaiSanPham extends Component {

    loadSanPhamTheoLoai=()=>{
       return this.props.DanhSachLoai.map((loaiSP,index)=>{
            return <Route 
                        key={index} 
                        path={`${this.props.match.url}/${loaiSP.LoaiSPurl}`} 
                        render={()=>
                            <div>
                                <Row gutter={[0,16]}>
                                    {
                                        loaiSP.TrangThai===1?
                                        this.props.DanhSachSanPham.map((sp,index)=>{
                                            return sp.MaDM===loaiSP.MaDM&&sp.TrangThai===1
                                            ?<Col key={index} xs={{span:24}} xl={{span:8}}><SanPham sanPham={sp}></SanPham></Col>
                                            :null
                                        })
                                        :<h2>Loại sản phẩm này đã ngừng kinh doanh !</h2>
                                    }
                                </Row>
                            </div>
                        }
                    >
                    </Route>
        })
    }


    render() {
        return (
            <div>
                <Row>
                    <Col style={{paddingLeft:15}} xs={{span:24}} lg={{span:6}}>
                        <Button
                            size='large'
                            shape='round'
                        >
                            DANH MỤC SẢN PHẨM
                        </Button>
                        <Menu
                         mode='inline'
                        >
                            <Menu.Item>
                                <Link to={`${this.props.match.url}/all`}>Tất cả sản phẩm</Link>
                            </Menu.Item>
                            {
                                this.props.DanhSachLoai.map((loai,index)=>{
                                    return  <Menu.Item 
                                            
                                             key={index}
                                            >
                                                <Link 
                                                    to={`${this.props.match.url}/${loai.LoaiSPurl}`}
                                                >
                                                    {loai.LoaiSP}
                                                </Link>
                                            </Menu.Item>
                                })
                            }
        

                        </Menu>
                    </Col>
                    <Col xs={{span:24}} lg={{span:18}}>
                        <div>
                            <img width="100%" src="../img/aocter.png" alt="abc"/>
                        </div>
                        <Row>
                            <Col span={8}></Col>
                            <Col span={16}>
                                <span className="sapxep">Sắp Xếp Theo :</span>
                                <Select style={{width:170,margin:5}} size="middle" defaultValue="sanphamnoibat">
                                    <Option value="sanphamnoibat">Đang giảm giá</Option>
                                    <Option value="giatangdan">Giá: Tăng dần</Option>
                                    <Option value="giagiamdan">Giá: Giảm dần</Option>
                                    <Option value="tenaz">Tên: A-Z</Option>
                                    <Option value="tenza">Tên: Z-A</Option>
                                    <Option value="banchaynhat">Bán chạy nhất</Option>
                                </Select>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col style={{paddingLeft:15}} span={6}>
                        <SanPhamVuaXem></SanPhamVuaXem>
                    </Col>
                    <Col span={18}>
                            <br/><br/>
                            <Switch>
                                <Route  path={`${this.props.match.url}/all`} component={All}></Route>
                                {
                                    this.loadSanPhamTheoLoai()
                                }
                                <Route exact path={`${this.props.match.url}/`} component={All}></Route>
                            </Switch>
                        
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        DanhSachLoai:state.DSSP.DanhSachLoaiSanPham,
        DanhSachSanPham:state.DSSP.DanhSachSanPham
    }
}

export default connect(mapStateToProps,null)(LoaiSanPham);
