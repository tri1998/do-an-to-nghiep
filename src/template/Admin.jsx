import React, { Component, Fragment } from 'react'
import { Layout, Menu, Space,Badge,Popconfirm } from 'antd';
import {
    DesktopOutlined,
    LogoutOutlined,
    AppstoreOutlined,
    UserOutlined,
    FileAddOutlined,
    NotificationOutlined,
    MessageOutlined,
    LockOutlined
} from '@ant-design/icons';
import { Link} from 'react-router-dom';
import {Route, Switch } from 'react-router-dom'
import QuanLySanPham from '../pages/QuanLySanPham';
import QuanLyLoaiSanPham from '../pages/QuanLyLoaiSanPham'
import QuanLyKhachHang from '../pages/QuanLyKhachHang';
import QuanLyHoaDon from '../pages/QuanLyHoaDon';
import QuanLyBinhLuan from '../pages/QuanLyBinhLuan';
import ThongBao from '../components/thongbao';
import QuanLyKhuyenMai from '../pages/QuanLyKhuyenMai.jsx';
import ChiTietKhuyenMai from '../components/ChiTietKhuyenMai.jsx';
import TrangChu from '../containers/adminTrangChu';
import DoiMatKhau from '../pages/AdminDoiMatKhau';
import {actAdminLogOut,actDangXuatNguoiDung} from '../redux/actions/nguoidung.jsx'
import {connect} from 'react-redux'
import moment from 'moment';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Admin extends Component {
    state = {
        collapsed: false,
    };

    confirm=(e)=> {
        sessionStorage.removeItem('admintoken');
        this.props.dangXuat();
        this.props.history.push('/');
    }
      
    cancel =(e)=> {
        console.log(e);
    }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        let Ngay = moment().format('DD');
        let Thang = moment().format('MM');
        let Nam = moment().format('YYYY');
        return (
            <div>
                
                        <Layout style={{ minHeight: '100vh' }}>
                            <Sider width={230} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                                <div className="logo" />
                                <Menu theme="dark" mode="inline">
                                        <Menu.Item key="1" icon={<DesktopOutlined />}>
                                            <Link
                                            to={`${this.props.match.url}`}
                                            >
                                                Trang chủ
                                            </Link>
                                        </Menu.Item>
                                        <Menu.Item key="2" icon={<DesktopOutlined />}>
                                            <Link
                                            to={`${this.props.match.url}/quanlykhuyenmai`}
                                            >
                                                Quản lý khuyến mại
                                            </Link>
                                        </Menu.Item>

                                    <Menu.Item icon={<UserOutlined />} key="3">
                                        <Link to={`${this.props.match.url}/quanlykhachhang`}>
                                            Quản lý khách hàng
                                        </Link>
                                    </Menu.Item>

                                    <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Quản lý sản phẩm">
                                        <Menu.Item key="6"><Link to={`${this.props.match.url}/quanlysanpham`}>Sản phẩm</Link></Menu.Item>
                                        <Menu.Item key="8"><Link to={`${this.props.match.url}/quanlyloaisanpham`}>Loại sản phẩm</Link></Menu.Item>
                                    </SubMenu>

                                    <Menu.Item icon={<FileAddOutlined />}>
                                        <Link
                                            to={`${this.props.match.url}/quanlyhoadon`}
                                            >
                                                Quản lý hóa đơn
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item icon={<MessageOutlined />}>
                                        <Link
                                            to={`${this.props.match.url}/quanlybinhluan`}
                                            >
                                                Quản lý bình luận
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item icon={<NotificationOutlined />}>
                                        <Link to={`${this.props.match.url}/quanlythongbao`}>
                                            <Badge dot>
                                                Thông báo
                                            </Badge>
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item icon={<LockOutlined />}>
                                        <Link to={`${this.props.match.url}/thaydoimatkhau`}>
                                             Đổi mật khẩu
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="9" icon={<LogoutOutlined />}>
                                    <Popconfirm
                                        title="Bạn muốn đăng xuất ?"
                                        onConfirm={this.confirm}
                                        onCancel={this.cancel}
                                        okText="Có"
                                        cancelText="Hủy"
                                    >
                                        Đăng xuất
                                    </Popconfirm>
                                    </Menu.Item>
                                </Menu>
                            </Sider>
                            <Layout className="site-layout">
                                <Header className="site-layout-background" style={{ padding: 0 }} />
                                <Content style={{ margin: '0 16px' }}>
                                    <Space>
                                        <h1>Ngày {Ngay} Tháng {Thang} Năm {Nam}</h1>
                                    </Space>
                                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                                      <Fragment>
                                      <Switch>
                                        <Route path={`${this.props.match.url}/quanlykhachhang`} component={QuanLyKhachHang}></Route>
                                        <Route path={`${this.props.match.url}/quanlysanpham`} component={QuanLySanPham}></Route>
                                        <Route path={`${this.props.match.url}/quanlyloaisanpham`} component={QuanLyLoaiSanPham}></Route>
                                        <Route path={`${this.props.match.url}/quanlythongbao`} component={ThongBao}></Route>
                                        <Route path={`${this.props.match.url}/quanlykhuyenmai`} component={QuanLyKhuyenMai}></Route>
                                        <Route path={`${this.props.match.url}/quanlyhoadon`} component={QuanLyHoaDon}></Route>
                                        <Route path={`${this.props.match.url}/quanlybinhluan`} component={QuanLyBinhLuan}></Route>
                                        <Route path={`${this.props.match.url}/thaydoimatkhau`} component={DoiMatKhau}></Route>
                                        <Route path={`${this.props.match.url}/chitietkhuyenmai/:maKM`} component={ChiTietKhuyenMai}></Route>
                                        <Route exact path={`${this.props.match.url}/`} component={TrangChu}></Route>
                                      </Switch>
                                      </Fragment>
                                    </div>
                                </Content>
                                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                            </Layout>
                        </Layout>
                    
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        dangXuat:()=>{
            dispatch(actDangXuatNguoiDung())
        }
    }
}

export default connect(null,mapDispatchToProps)(Admin)