import React, { Component, Fragment } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    ExportOutlined,
    AppstoreOutlined,
    UserOutlined,
    FileAddOutlined,
    
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import QuanLySanPham from '../components/SanPham/QuanLySanPham'
import QuanLyLoaiSanPham from '../components/SanPham/QuanLyLoanSanPham'
import DanhSachKhachHang from '../components/NguoiDung/DanhSachKhachHang';
import Client from '../pages/NguoiDung';
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

export default class Admin extends Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Fragment>
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
                                        <Menu.Item key="4"><Link to="/quanlykhachhang">Khách Hàng</Link></Menu.Item>
                                        <Menu.Item key="5">Quản Trị</Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Quản Lý Sản Phẩm">
                                        <Menu.Item key="6"><Link to="/quanlysanpham">Sản Phẩm</Link></Menu.Item>
                                        <Menu.Item key="8"><Link to="/quanlyloaisanpham">Loại Sản Phẩm</Link></Menu.Item>
                                    </SubMenu>
                                    <Menu.Item icon={<FileAddOutlined />}>
                                        Quản Lý Hóa Đơn
                                    </Menu.Item>
                                    <Menu.Item key="9" icon={<ExportOutlined />}><Link to="/trangchu">Đăng Xuất</Link></Menu.Item>
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
                                        <Switch>
                                            <Route path="/quanlysanpham" component={QuanLySanPham}></Route>
                                            <Route path="/quanlyloaisanpham" component={QuanLyLoaiSanPham}></Route>
                                            <Route path="/quanlykhachhang" component={DanhSachKhachHang}></Route>
                                            <Route exact path="/" component={Admin}></Route>
                                        </Switch>
                                    </div>
                                </Content>
                                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                            </Layout>
                        </Layout>
                    </Fragment>
                </BrowserRouter>
            </div>
        )
    }
}
