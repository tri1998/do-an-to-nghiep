import React, { Component } from 'react'
import {Row,Col,Menu,Button,Select} from 'antd'
import SanPhamVuaXem from './sanphamvuaxem'
import AoTTG from './aottg';
import Gear from './gaminggear';
import Gundam from './gundam';
import All from './tatcasp';
import {Switch,Route,Link} from 'react-router-dom'
import {connect} from 'react-redux';
const {Option} = Select;
class LoaiSanPham extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col style={{paddingLeft:15}} span={6}>
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
                                    return <Menu.Item key={index}>
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
                    <Col span={18}>
                        <div>
                            <img width="100%" src="../img/aocter.png" alt="abc"/>
                        </div>
                        <Row>
                            <Col span={8}></Col>
                            <Col span={16}>
                                <span className="sapxep">Sắp Xếp Theo :</span>
                                <Select style={{width:170,margin:5}} size="middle" defaultValue="sanphamnoibat">
                                    <Option value="sanphamnoibat">Sản phẩm nổi bật</Option>
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
                                <Route  path={`${this.props.match.url}/gaminggear`} component={Gear}></Route>
                                <Route  path={`${this.props.match.url}/gundam`} component={Gundam}></Route>
                                <Route  path={`${this.props.match.url}/aottg`} component={AoTTG}></Route>
                                <Route  path={`${this.props.match.url}/banhmi`} render={()=><h1>Xin chào ạ</h1>} ></Route>
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
        DanhSachLoai:state.DSSP.DanhSachLoaiSanPham
    }
}

export default connect(mapStateToProps,null)(LoaiSanPham);
