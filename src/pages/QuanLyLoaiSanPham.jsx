import React, { Component } from 'react'
import {
    Table,
    Space,
    Button,
    Input,
    Form,
    Select,
    Modal,
    Drawer,
    Tooltip,
    notification
} from 'antd'
import {
    FormOutlined,
    CloseOutlined,
    RedoOutlined,
    PlusOutlined,
    PlusSquareOutlined,
    MinusSquareOutlined,
    SearchOutlined,
    SmileOutlined
  } from '@ant-design/icons';
import {connect} from 'react-redux';
import {port} from '../config/configAPI';
import axios from 'axios';
import Swal from 'sweetalert2';
import Highlighter from 'react-highlight-words';
import {actXoaDanhMucSanPham,actPhucHoiDanhMucSP,actThemDanhMucSP,actSuaDanhMuc} from '../redux/actions/sanpham'

const {Option} = Select;

const openNotification = () => {
  notification.open({
    message: 'SỬA DANH MỤC',
    description:
      'Thông tin danh mục sản phẩm đã được thay đổi thành công !',
    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
  });
};
class QuanLyLoanSanPham extends Component {

    constructor(props) {
        super(props);
        this.state = {
          visible: false,
          visible1:false,
          confirmLoading: false,
          danhMucDangXem:{}
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

    //Chuc nang them danh muc moi 
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

    //Sua thong tin danh muc 
    suaDanhMuc=(values)=>{
      const danhMuc = {
        LoaiSP:values.TenDanhMuc,
        LoaiSPurl:values.urlDanhMuc
      }
      axios({
        method:"PUT",
        url:`http://localhost:${port}/api/danhmucsanpham/suadanhmuc/${this.state.danhMucDangXem.MaDM}`,
        data:danhMuc
      })
      .then(res=>this.props.suaDanhMuc(this.state.danhMucDangXem.MaDM,danhMuc))
      .catch(err=>{console.log(err)})
      this.setState({
        visible1: false,
      })
      openNotification();
      
    }
    //Mo Modal
    showModal = () => {
        this.setState({
          visible: true,
        })
    };

    //Dong modal
    closeModal = () => {
        this.setState({
          visible: false,
        });
    };

    //Mo Drawer
    showDrawer = (record) => {
      console.log(record);
      this.setState({
        danhMucDangXem:record,
        visible1: true,
      });
      console.log(this.state.danhMucDangXem);
    };
  
    //Dong drawer
    onClose = () => {
      this.setState({
        visible1: false,
      });
    };

    //search theo column
    getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Tooltip title="0:Ngừng kinh doanh,1:Đang kinh doanh">
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
          </Tooltip>
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
          title: 'STT',
          dataIndex: 'MaDM',
          key: 'MaDM',
        },
        {
          title: 'Tên Loại Sản Phẩm',
          dataIndex: 'LoaiSP',
          key: 'LoaiSP',
          ...this.getColumnSearchProps('LoaiSP')
        },
        {
          title: 'Tình Trạng',
          dataIndex: 'TrangThai',
          key: 'TrangThai',
          ...this.getColumnSearchProps('TrangThai'),
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
                    onClick={()=>this.showDrawer(record)}
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
        const {visible,confirmLoading,visible1} = this.state;
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
                
                <Drawer
                  title="SỬA THÔNG TIN DANH MỤC"
                  width={300}
                  placement="right"
                  closable={false}
                  onClose={this.onClose}
                  visible={visible1}
                  key="left"
                  destroyOnClose={true}
                >
                  <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={this.suaDanhMuc}
                  >
                      <Form.Item
                      name="TenDanhMuc"
                      rules={[{ required: true, message: 'Nhập tên danh mục!' }]}
                      initialValue={this.state.danhMucDangXem.LoaiSP}
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
                      initialValue={this.state.danhMucDangXem.LoaiSPurl}
                      rules={[{ required: true, message: 'Nhập tên danh mục(không dấu)!' }]}
                      >
                      <Input 
                          size="large" 
                          prefix={<FormOutlined 
                          className="site-form-item-icon" />} 
                          placeholder="Tên danh mục(không dấu)" 
                      />
                      </Form.Item>
                      <br/>  
                      <Form.Item>
                          <Button 
                              block 
                              type="danger" 
                              htmlType="submit" 
                              className="login-form-button"
                          >
                              Sửa Danh Mục
                          </Button>            
                      </Form.Item>
                  </Form>
                </Drawer>
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
        },
        suaDanhMuc:(maDM,danhMuc)=>{
          dispatch(actSuaDanhMuc(maDM,danhMuc))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(QuanLyLoanSanPham)