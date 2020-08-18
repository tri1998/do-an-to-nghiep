import React, { Component, Fragment } from 'react'
import {
    Layout,
    Menu,
    Popconfirm,
    Button,
    Modal,
    Form,
    Input,
    message,
} from 'antd';
import {
    DesktopOutlined,
    LogoutOutlined,
    AppstoreOutlined,
    UserOutlined,
    FileAddOutlined,
    MessageOutlined,
    LockOutlined,
    HomeOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom'
import QuanLySanPham from '../pages/QuanLySanPham';
import QuanLyLoaiSanPham from '../pages/QuanLyLoaiSanPham'
import QuanLyKhachHang from '../pages/QuanLyKhachHang';
import QuanLyHoaDon from '../pages/QuanLyHoaDon';
import QuanLyBinhLuan from '../pages/QuanLyBinhLuan';
import ChiTietKhuyenMai from '../components/ChiTietKhuyenMai.jsx';
import TrangChu from '../containers/adminTrangChu';
import {actDangXuatNguoiDung } from '../redux/actions/nguoidung.jsx'
import { connect } from 'react-redux'
import axios from 'axios'
import { port } from '../config/configAPI';
let md5 = require('md5');
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Admin extends Component {
    state = {
        collapsed: false,
        visible: false,
    };

    showModal = () => {
        this.setState({
            visible: true,
        })
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };

    thayDoiMatKhau = (values) => {
        const password = {
            MatKhauCu: md5(values.MatKhauCu),
            MatKhauMoi1: md5(values.MatKhauMoi1),
            MatKhauMoi2: md5(values.MatKhauMoi2)
        }
        if (password.MatKhauMoi1 !== password.MatKhauMoi2) {
            message.error('Nhập lại mật khẩu không trùng khớp !')
        }
        else {
            axios({
                method: "PUT",
                url: `http://localhost:${port}/taikhoan/capnhatmatkhau`,
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': sessionStorage.getItem('admintoken')
                },
                data: password
            })
                .then(res => {
                    if (res.data.message === 'token khong hop le' || res.data.message === 'Chua cung cap token.') {
                        message.error('Cập nhật mật khẩu thất bại !')
                    }
                    if (res.data.messageWarrning) {
                        message.warning(res.data.messageWarrning);
                    }
                    if (res.data.messageSuccess) {
                        message.success(res.data.messageSuccess);
                        this.setState({ visible: false })
                    }
                    if (res.data.messageError) {
                        message.error(res.data.messageError);
                    }
                })
                .catch(err => console.log(err));
        }
    }

    confirm = (e) => {
        sessionStorage.removeItem('admintoken');
        this.props.dangXuat();
        this.props.history.push('/');
    }

    cancel = (e) => {
        console.log(e);
    }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        const { visible } = this.state;
        let {HoTen} = this.props.nguoiDung
        return (
            <div>

                <Layout style={{ minHeight: '100vh' }}>
                    <Sider width={230} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <div className="logo" />
                        <Menu theme="dark" mode="inline">
                            <Menu.Item key="1" icon={<HomeOutlined />}>
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
                                    Quản lý tài khoản
                                </Link>
                            </Menu.Item>

                            <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Quản lý sản phẩm">
                                <Menu.Item key="6">
                                    <Link to={`${this.props.match.url}/quanlysanpham`}>Sản phẩm</Link>
                                </Menu.Item>
                                <Menu.Item key="8">
                                    <Link to={`${this.props.match.url}/quanlyloaisanpham`}>Loại sản phẩm</Link>
                                </Menu.Item>
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
                            
                            <Menu.Item onClick={this.showModal} icon={<LockOutlined />}>
                                
                                Đổi mật khẩu
                                       
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
                        <Header className="site-layout-background" style={{ padding: 0,marginBottom:'25px' }}>
                        <Menu onClick={this.handleClick}  mode="horizontal">
                            <Menu.Item key="home" icon={<HomeOutlined />}>
                                <Link
                                    to={`${this.props.match.url}`}
                                >
                                    Trang chủ
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="app" icon={<DesktopOutlined/>}>
                                <Link
                                    to={`${this.props.match.url}/quanlykhuyenmai`}
                                >
                                    Quản lý khuyến mại
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="taikhoan" icon={<UserOutlined />}>
                                <Link to={`${this.props.match.url}/quanlykhachhang`}>
                                    Quản lý tài khoản
                                </Link>
                            </Menu.Item>
                            <SubMenu icon={<AppstoreOutlined />} title="Quản Lý Sản Phẩm">
                            
                                <Menu.Item key="setting:1">
                                    <Link to={`${this.props.match.url}/quanlysanpham`}>Sản phẩm</Link>
                                </Menu.Item>
                                <Menu.Item key="setting:2">
                                    <Link to={`${this.props.match.url}/quanlyloaisanpham`}>Loại sản phẩm</Link>
                                </Menu.Item>
                            
                            
                            </SubMenu>

                            <Menu.Item key="hoadon" icon={<FileAddOutlined />}>
                                <Link
                                    to={`${this.props.match.url}/quanlyhoadon`}
                                >
                                    Quản lý hóa đơn
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="binhluan" icon={<MessageOutlined />}>
                                <Link
                                    to={`${this.props.match.url}/quanlybinhluan`}
                                >
                                    Quản lý bình luận
                                </Link>
                            </Menu.Item>
                            
                            
                        </Menu>
                        </Header>
                        <Content style={{ margin: '0 16px' }}>
    
                            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                                <Fragment>
                                    <Switch>
                                        <Route path={`${this.props.match.url}/quanlykhachhang`} component={QuanLyKhachHang}></Route>
                                        <Route path={`${this.props.match.url}/quanlysanpham`} component={QuanLySanPham}></Route>
                                        <Route path={`${this.props.match.url}/quanlyloaisanpham`} component={QuanLyLoaiSanPham}></Route>
                            
                                        <Route path={`${this.props.match.url}/quanlykhuyenmai`} component={QuanLyKhuyenMai}></Route>
                                        <Route path={`${this.props.match.url}/quanlyhoadon`} component={QuanLyHoaDon}></Route>
                                        <Route path={`${this.props.match.url}/quanlybinhluan`} component={QuanLyBinhLuan}></Route>
                                        <Route path={`${this.props.match.url}/chitietkhuyenmai/:maKM`} component={ChiTietKhuyenMai}></Route>
                                        <Route exact path={`${this.props.match.url}/`} component={TrangChu}></Route>
                                    </Switch>
                                </Fragment>
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Layout>

                <Modal
                    title="THAY ĐỔI MẬT KHẨU"
                    visible={visible}
                    onCancel={this.handleCancel}
                    destroyOnClose={true}
                >
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.thayDoiMatKhau}
                    >
                        Mật khẩu cũ
                    <Form.Item
                            name="MatKhauCu"
                            rules={[
                                { required: true, message: 'Nhập mật khẩu cũ !' },
                                { message: 'Mật khẩu trên 8 kí tự bao gồm số, chữ hoa, chữ thường !', pattern: '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})' }
                            ]}
                        >

                            <Input.Password placeholder="Nhập mật khẩu cũ" size="large" style={{ width: '100%' }} />
                        </Form.Item>

                        Mật khẩu mới :
                        <Form.Item
                            name="MatKhauMoi1"
                            rules={[
                                { required: true, message: 'Nhập mật khẩu mới !' },
                                { message: 'Mật khẩu trên 8 kí tự bao gồm số, chữ hoa, chữ thường !', pattern: '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})' }
                            ]}
                        >

                            <Input.Password placeholder="Nhập mật khẩu mới" size="large" style={{ width: '100%' }} />
                        </Form.Item>

                            Nhập lại khẩu mới :
                            <Form.Item
                            name="MatKhauMoi2"
                            rules={[
                                { required: true, message: 'Nhập lại mật khẩu mới !' },
                                { message: 'Mật khẩu trên 8 kí tự bao gồm số, chữ hoa, chữ thường !', pattern: '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})' }
                            ]}
                        >

                            <Input.Password placeholder="Nhập lại mật khẩu mới" size="large" style={{ width: '100%' }} />
                        </Form.Item>

                        <Button
                            type="primary"
                            danger
                            block
                            htmlType="submit"
                            style={{ borderRadius: '5px' }}
                        >
                            Cập Nhật Mật Khẩu
                        </Button>
                            </Form>
                        </Modal>

            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        nguoiDung:state.DSND.UserInformation
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dangXuat: () => {
            dispatch(actDangXuatNguoiDung())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)