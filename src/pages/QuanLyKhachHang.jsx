import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Table,
  Space,
  Button,
  Tooltip,
  Modal,
  Form,
  Input,
} from 'antd';
import {
  FormOutlined,
  CloseOutlined,
  RedoOutlined,
  UserOutlined,
  LockOutlined,
  HomeOutlined,
  PhoneOutlined,
  MailOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { 
  actUpdateTrangThaiUser,
  actRecoverUser,
  actSaveSelectedUser,
  actUpdateUserInfo } from '../redux/actions/nguoidung';
import axios from 'axios';
import Highlighter from 'react-highlight-words';
import Swal from 'sweetalert2';
import {port} from '../config/configAPI';
let md5 = require('md5');

class DanhSachKhachHang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false,
      searchText: '',
      searchedColumn: ''
    };

  }

  showModal = (user) => {
    this.props.saveSelectedUser(user);
    console.log(user);
    this.setState({
      visible: true,
    })
  };
  //Click OK tren modal
  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 1);

  };
  //dong modal nguoi dung
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };

  //Cap nhat thong tin nguoi dung
  onFinish = values => {
    console.log('Received values of form: ', values);
    const capNhatUser = {
      MaTK: values.MaTK,
      HoTen: values.HoTen,
      SoDienThoai: values.SoDienThoai,
      DiaChi:values.DiaChi,
      MatKhau: md5(values.MatKhau)
    }
    axios({
      method:'PUT',
      url:`http://localhost:${port}/api/taikhoan/capnhatTK/${capNhatUser.MaTK}`,
      data:capNhatUser
    })
    .then(res=>
      {
        this.props.updateUserInfo(capNhatUser);
        Swal.fire(
          'Cập Nhật Thành Công !',
          `Người dùng ${capNhatUser.HoTen} đã được cập nhật . `,
          'success'
        );
      }
      )
    .catch(err=>console.log(err))
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 1000);
    
  };


  //Xoa nguoi dung
  deleteUser = (maUser) => {
    Swal.fire({
      title: 'Bạn có muốn xóa người dùng này ?',
      text: "Sẽ không khôi phục lại được!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.value) {
        axios({
          method: 'PUT',
          url: `http://localhost:${port}/api/taikhoan/xoaTK/${maUser}`,
        })
          .then(res => this.props.updateTrangThaiUser(maUser))
          .catch(error => console.log(error));
        Swal.fire(
          'Đã xóa!',
          'Người dùng này đã bị xóa',
          'success'
        )
      }
    })
  }

  //Khoi phuc nguoi dung
  recoverUser = (maUser) => {
    Swal.fire({
      title: 'Bạn có muốn khôi phục lại người dùng này ?',
      text: "Xác nhận khôi phục!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.value) {
        axios({
          method: 'PUT',
          url: `http://localhost:${port}/api/taikhoan/khoiphucTK/${maUser}`,
        })
          .then(res => this.props.recoverTrangThaiUser(maUser))
          .catch(error => console.log(error));
        Swal.fire(
          'Đã khôi phục !',
          'Người dùng này đã được khôi phục',
          'success'
        )
      }
    })
  }

  //Tim kiem 
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Tìm ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };
  

  columns = [
    {
      title: 'Mã KH',
      dataIndex: 'MaTK',
      key: 'MaTK',
      render: text => <a>{text}</a>,
      ...this.getColumnSearchProps('MaTK')
    },
    {
      title: 'Họ Tên',
      dataIndex: 'HoTen',
      key: 'HoTen',
      ...this.getColumnSearchProps('HoTen')
    },
    {
      title: 'Số Điện Thoại',
      dataIndex: 'SDT',
      key: 'SDT',
      ...this.getColumnSearchProps('SDT')
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
      ...this.getColumnSearchProps('Email')
    },

    {
      title: 'Thao Tác',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="Sửa">
            <Button
              type="primary"
              danger
              disabled={record.TrangThai === 0 ? true : false}
              onClick={() => this.showModal(record)}>
              <FormOutlined style={{ fontSize: '20px' }} />
            </Button>
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              disabled={record.TrangThai === 0 ? true : false}
              onClick={() => record.isAdmin === 1
                ? alert('Không thể xóa tai khoan admin')
                : this.deleteUser(record.MaTK)}
              type="primary">
              <CloseOutlined style={{ fontSize: '20px' }} />
            </Button>
          </Tooltip>
          {record.TrangThai === 0
            ? <Tooltip title="Phục hồi">
              <Button 
                onClick={() => this.recoverUser(record.MaTK)} danger>
                <RedoOutlined style={{ fontSize: '20px' }} />
              </Button>
            </Tooltip>
            : null}
        </Space>
      ),
    },
  ];

  render() {
    let data = this.props.DanhSachKhachHang;
    let userDuocChon = this.props.KhachHangDuocChon;
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <Table
          columns={this.columns}
          dataSource={data}
          rowKey={record => record.MaTK}
          rowClassName={record =>record.TrangThai === 0 ? "disableRow" : (record.isAdmin===1?"admin":"")}
          
        />
        <Modal
          title="CẬP NHẬT THÔNG TIN NGƯỜI DÙNG"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="MaTK"
              rules={[{ required: true, message: 'Please input your Username!' }]}
              initialValue={userDuocChon.MaTK}
            >
              <Input 
                disabled={true} 
                size="large" 
                prefix={<FormOutlined 
                className="site-form-item-icon" />} 
                placeholder="Mã Tài Khoản" 
              />
            </Form.Item>

            <Form.Item
              name="HoTen"
              rules={[{ required: true, message: 'Please input your Username!' }]}
              initialValue={userDuocChon.HoTen}
            >
              <Input 
                size="large" 
                prefix={<UserOutlined className="site-form-item-icon" />} 
                placeholder="Họ Tên" 
              />
            </Form.Item>

            <Form.Item
              name="Email"
              rules={[{ required: true, message: 'Please input your Username!' }]}
              initialValue={userDuocChon.Email}
            >
              <Input  
                disabled={true} 
                size="large" 
                prefix={<MailOutlined className="site-form-item-icon" />} 
                placeholder="Email" 
              />
            </Form.Item>
            
            <Form.Item
              name="DiaChi"
              rules={[{ required: true, message: 'Please input your Username!' }]}
              initialValue={userDuocChon.DiaChi}
            >
              <Input 
                size="large" 
                prefix={<HomeOutlined className="site-form-item-icon" />} 
                placeholder="Địa Chỉ" 
              />
            </Form.Item>

            <Form.Item
              name="SoDienThoai"
              rules={[{ required: true, message: 'Please input your Username!',pattern:'[0-9]{10,11}' }]}
              initialValue={userDuocChon.SDT}
            >
              <Input 
                size="large" 
                prefix={<PhoneOutlined className="site-form-item-icon" />} 
                placeholder="Địa Chỉ" 
              />
            </Form.Item>

            <Form.Item
              name="MatKhau"
              initialValue={userDuocChon.MatKhau}
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                size="large"
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Mật Khẩu"
              />
            </Form.Item>
            <Form.Item>
               <Button block type="danger" htmlType="submit" className="login-form-button">
                    Cập Nhật
               </Button>            
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    DanhSachKhachHang: state.DSND.DSND,
    KhachHangDuocChon: state.DSND.userDuocChon
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateTrangThaiUser: (MaTK) => {
      dispatch(actUpdateTrangThaiUser(MaTK));
    },
    recoverTrangThaiUser: (MaTK) => {
      dispatch(actRecoverUser(MaTK));
    },
    saveSelectedUser: (user) => {
      dispatch(actSaveSelectedUser(user));
    },
    updateUserInfo:(user)=>{
      dispatch(actUpdateUserInfo(user))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(DanhSachKhachHang);