import React, { Component } from 'react'
import {
    Table,
    Space,
    Button,
    Input,
    Form,
    Select,
    Modal
} from 'antd'
import {
    FormOutlined,
    CloseOutlined,
    RedoOutlined,
    PlusOutlined,
    PlusSquareOutlined,
    MinusSquareOutlined
  } from '@ant-design/icons';
import {connect} from 'react-redux';
import {port} from '../config/configAPI';
import axios from 'axios';
import Swal from 'sweetalert2';
import {actXoaDanhMucSanPham,actPhucHoiDanhMucSP,actThemDanhMucSP} from '../redux/actions/sanpham'

const {Option} = Select;
class QuanLyLoanSanPham extends Component {

    constructor(props) {
        super(props);
        this.state = {
          visible: false,
          confirmLoading: false,
        };
    
      }

    xoaDanhMuc=(maDanhMuc)=>{
        Swal.fire({
            title: 'Xóa Danh Mục ',
            text: 'Bạn có muốn xóa danh mục sản phẩm này ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
          }).then((result) => {
            if (result.value) {
              axios({
                method: 'PUT',
                url: `http://localhost:${port}/api/danhmucsanpham/xoadanhmuc/${maDanhMuc}`,
              })
              .then(res => this.props.xoaDanhMuc(maDanhMuc))
              .catch(error => console.log(error));
              Swal.fire(
                'Đã Xóa',
                'Danh mục sản phẩm này đã được xóa !',
                'success'
              )
            }
          })

    }

    phucHoiDanhMuc=(maDanhMuc)=>{
        Swal.fire({
            title: 'Phục Hồi Danh Mục Sản Phẩm ',
            text: 'Bạn có muốn phục hồi danh mục sản phẩm này ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
          }).then((result) => {
            if (result.value) {
              axios({
                method: 'PUT',
                url: `http://localhost:${port}/api/danhmucsanpham/phuchoidanhmuc/${maDanhMuc}`,
              })
              .then(res => this.props.phucHoiDanhMuc(maDanhMuc))
              .catch(error => console.log(error));
              Swal.fire(
                'Đã Phục Hồi',
                'Danh mục sản phẩm này đã được phục hồi  !',
                'success'
              )
            }
          })

    }

    themDanhMuc=(values)=>{
        console.log(values);
        let MaDM=this.props.DanhSachLoai.length;
        MaDM++;
        const danhMucMoi={
            MaDM:MaDM,
            LoaiSP:values.TenDanhMuc,
            LoaiSPurl:values.urlDanhMuc,
            TrangThai:values.TrangThai
        }
        axios({
            method:'POST',
            url:`http://localhost:${port}/api/danhmucsanpham/themdanhmuc`,
            data:danhMucMoi
        })
        .then(res=>this.props.themDanhMuc(danhMucMoi))
        .catch(err=>console.log(err));
        this.setState({
            visible: false,
        });
    }

    showModal = () => {
        this.setState({
          visible: true,
        })
    };

    closeModal = () => {
        this.setState({
          visible: false,
        });
    };

    columns = [
        {
          title: 'STT',
          dataIndex: 'MaDM',
          key: 'MaDM',
        },
        {
          title: 'Tên Loại Sản Phẩm',
          dataIndex: 'LoaiSP',
          key: 'LoaiSP',
        },
        {
          title: 'Tình Trạng',
          dataIndex: 'TrangThai',
          key: 'TrangThai',
          render:(record)=>(
            record===1?<h4 className="trangthaitrue">Đang kinh doanh</h4>:<h4 className="trangthaifalse">Ngừng kinh doanh</h4>
          )
        },
        {
          title: 'Thao Tác',
          key:'ThaoTac',
          render:(record)=>(
            <Space>
                <Button 
                    disabled={record.TrangThai===1?false:true} 
                    type="primary"
                >
                    <FormOutlined/>
                </Button>
                <Button 
                    disabled={record.TrangThai===1?false:true} 
                    onClick={()=>this.xoaDanhMuc(record.MaDM)} 
                    type="primary" danger
                >
                    <CloseOutlined/>
                </Button>
                {record.TrangThai===0?
                <Button 
                    type="default" danger
                    onClick={()=>this.phucHoiDanhMuc(record.MaDM)}
                >
                    <RedoOutlined/>
                </Button>
                :null}
            </Space>
          )
        }
      ];

    render() {
        let data = this.props.DanhSachLoai;
        const {visible,confirmLoading} = this.state;
        return (
            <div>
                <Button 
                    type="primary" 
                    shape="round"
                    onClick={this.showModal} 
                ><PlusOutlined/>
                    Thêm Danh Mục Mới
                </Button>
                <Table 
                    dataSource={data}
                    columns={this.columns}
                    rowKey={record=>record.MaDM}
                >

                </Table>
                <Modal
                title="Thêm Danh Mục Mới"
                visible={visible}
                onOk={this.handleOk}
                confirmLoading={confirmLoading}
                onCancel={this.closeModal}
                destroyOnClose={true}
                >
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={this.themDanhMuc}
                >
                    <Form.Item
                    name="TenDanhMuc"
                    rules={[{ required: true, message: 'Nhập tên danh mục!' }]}
                    >
                    <Input 
                        size="large" 
                        prefix={<FormOutlined 
                        className="site-form-item-icon" />} 
                        placeholder="Tên danh mục(có dấu)" 
                    />
                    </Form.Item>

                    <Form.Item
                    name="urlDanhMuc"
                    rules={[{ required: true, message: 'Nhập tên danh mục(không dấu)!' }]}
                    >
                    <Input 
                        size="large" 
                        prefix={<FormOutlined 
                        className="site-form-item-icon" />} 
                        placeholder="Tên danh mục(không dấu)" 
                    />
                    </Form.Item>

                    <Form.Item
                    name="TrangThai"
                    rules={[{ required: true }]}
                    initialValue={1}
                    >
                    <Select size="large" >
                        <Option value={1}><PlusSquareOutlined /> Kinh doanh</Option>
                        <Option value={0}><MinusSquareOutlined /> Chưa kinh doanh </Option>
                    </Select>
                    </Form.Item>
                    <br/><br/><br/>    
                    <Form.Item>
                        <Button 
                            block 
                            type="danger" 
                            htmlType="submit" 
                            className="login-form-button"
                        >
                            Thêm Danh Mục
                        </Button>            
                    </Form.Item>
                </Form>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        DanhSachLoai:state.DSSP.DanhSachLoaiSanPham
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        xoaDanhMuc:(maDanhMuc)=>{
            dispatch(actXoaDanhMucSanPham(maDanhMuc))
        },
        phucHoiDanhMuc:(maDanhMuc)=>{
            dispatch(actPhucHoiDanhMucSP(maDanhMuc))
        },
        themDanhMuc:(danhMuc)=>{
            dispatch(actThemDanhMucSP(danhMuc))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(QuanLyLoanSanPham)