import React, { Component, Fragment } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    LogoutOutlined,
    AppstoreOutlined,
    UserOutlined,
    FileAddOutlined,
    
} from '@ant-design/icons';
import { Link} from 'react-router-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import QuanLySanPham from '../components/SanPham/QuanLySanPham'
import QuanLyLoaiSanPham from '../components/SanPham/QuanLyLoanSanPham'
import DanhSachKhachHang from '../components/NguoiDung/DanhSachKhachHang';
import {actAdminLogOut} from '../redux/actions/nguoidung.jsx'
import {connect} from 'react-redux'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const routes = [
    {
      path: 'index',
      breadcrumbName: 'Home',
    },
    {
      path: 'first',
      breadcrumbName: 'first',
      
    },
    {
      path: 'second',
      breadcrumbName: 'second',
    },
  ];

function itemRender(route, params, routes, paths) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
    );
  }

class Admin extends Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    adminLogOut=()=>{
        localStorage.removeItem('loginAdmin');
        this.props.adminLogOut();
        this.props.history.push('/');
    }
    render() {
        return (
            <div>
                
                        <Layout style={{ minHeight: '100vh' }}>
                            <Sider width={230} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                                <div className="logo" />
                                <Menu theme="dark" mode="inline">
                                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                                        Option 1
                                    </Menu.Item>
                                    <Menu.Item key="2" icon={<DesktopOutlined />}>
                                        Quản Lý Khuyến Mãi
                                    </Menu.Item>
                                    <SubMenu key="sub1" icon={<UserOutlined />} title="Quản Lý Người Dùng">
                                        <Menu.Item key="3">Nhân Viên</Menu.Item>
                                        <Menu.Item key="4"><Link to={`${this.props.match.url}/quanlykhachhang`}>Khách Hàng</Link></Menu.Item>
                                        <Menu.Item key="5">Quản Trị</Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Quản Lý Sản Phẩm">
                                        <Menu.Item key="6"><Link to={`${this.props.match.url}/quanlysanpham`}>Sản Phẩm</Link></Menu.Item>
                                        <Menu.Item key="8"><Link to={`${this.props.match.url}/quanlyloaisanpham`}>Loại Sản Phẩm</Link></Menu.Item>
                                    </SubMenu>
                                    <Menu.Item icon={<FileAddOutlined />}>
                                        Quản Lý Hóa Đơn
                                    </Menu.Item>
                                    <Menu.Item key="9" icon={<LogoutOutlined />} onClick={this.adminLogOut}>Đăng Xuất</Menu.Item>
                                </Menu>
                            </Sider>
                            <Layout className="site-layout">
                                <Header className="site-layout-background" style={{ padding: 0 }} />
                                <Content style={{ margin: '0 16px' }}>
                                    <Breadcrumb itemRender={itemRender} routes={routes} style={{ margin: '16px 0' }}>
                                        <Breadcrumb.Item>User</Breadcrumb.Item>
                                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                                    </Breadcrumb>
                                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                                      <Fragment>
                                      <Switch>
                                        <Route path={`${this.props.match.url}/quanlykhachhang`} component={DanhSachKhachHang}></Route>
                                        <Route path={`${this.props.match.url}/quanlysanpham`} component={QuanLySanPham}></Route>
                                        <Route path={`${this.props.match.url}/quanlyloaisanpham`} component={QuanLyLoaiSanPham}></Route>
                                        <Route exact path={`${this.props.match.url}/`} render={()=><h3>Xin Chào !</h3>}></Route>
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
        adminLogOut:()=>{
            dispatch(actAdminLogOut())
        }
    }
}

export default connect(null,mapDispatchToProps)(Admin)