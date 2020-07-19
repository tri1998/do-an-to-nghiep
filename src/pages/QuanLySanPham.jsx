import React, { Component } from 'react'
import {
    Table,
    Space,
    Button,
    Modal,
    Form,
    Input,
    Select,
    Upload,
    message,
    Drawer,
    Row,
    Col
  } from 'antd';
import {
  FormOutlined,
  DollarOutlined,
  RadarChartOutlined,
  SearchOutlined,
  LoadingOutlined, 
  PlusOutlined,
  CloseOutlined,
  RedoOutlined
} from '@ant-design/icons';
import {connect} from 'react-redux';
import axios from 'axios';
import {
  actUpdateTrangThai,
  actRecoverTrangThai,
  actThemSanPham,
  actChonSanPhamCapNhat
} from '../redux/actions/sanpham'
import Highlighter from 'react-highlight-words';
import {port} from '../config/configAPI';
const { Option } = Select;
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
class QuanLySanPham extends Component {
    constructor(props) {
        super(props);
        this.state = {
          visible: false,
          visibleDrawer:false,
          confirmLoading: false,
          searchText: '',
          searchedColumn: '',
          loading: false,
        };
    
      }

      showDrawer = (sanPham) => {
        this.props.chonSanPham(sanPham);
        this.setState({
          visibleDrawer: true,
        });
      };

      onClose = () => {
        this.setState({
          visibleDrawer: false,
        });
      };


    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imageUrl,
              loading: false,
            }),
          );
        }
      };

    normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    };
    
    showModal = () => {
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

    //Them san pham
    onFinish=(values)=>{
        const sanPham = {
            MaSP:values.MaSP,
            LoaiSP:values.LoaiSP,
            HangSX:values.HangSX,
            TenSP:values.TenSP,
            LuotBan:0,
            LuotXem:0,
            Gia:values.Gia,
            SPMoi:values.SPMoi,
            Hinh:`../img/${values.Hinh[0].name}`,
        }
        console.log(sanPham);
        axios({
          method:'POST',
          url:`http://localhost:${port}/api/sanpham/themSP`,
          data: sanPham
        })
        .then(res=>this.props.themSanPham(sanPham))
        .catch(err=>console.log(err))
        this.setState({visible:false})
    }

    //Cap nhat trang thai san pham
    xoaSanPham=(MaSP)=>{
        console.log(MaSP);
        axios({
            method:'PUT',
            url:`http://localhost:${port}/api/sanpham/capnhatSP/${MaSP}`
        })
        .then(res=>this.props.updateTrangThai(MaSP))
        .catch(err=>console.log(err));
    }
    //Phuc hoi san pham
    khoiPhucSanPham=(MaSP)=>{
        axios({
            method: 'PUT',
            url: `http://localhost:${port}/api/sanpham/khoiphucSP/${MaSP}`,
          })
          .then(res => this.props.recoverTrangThai(MaSP))
          .catch(error => console.log(error));
    }

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

      //Cap nhat thong tin san pham 
      onUpdate = (values)=>{
        console.log(values);
        this.setState({
          visibleDrawer:false
        })
      }


     columns = [
        
        { 
            title: 'Hình Ảnh',
            dataIndex: 'Hinh',
            key: 'Hinh',
            render:(text,record)=>(<img alt={record.TenSP} className="hinh" src={`${record.Hinh}`}/>)
        },
        { 
            title: 'Tên Sản Phẩm',
            dataIndex: 'TenSP',
            key: 'TenSP',
            ...this.getColumnSearchProps('TenSP')
        },
        { 
            title: 'Giá', 
            dataIndex: 'Gia', 
            key: 'Gia',
            ...this.getColumnSearchProps('Gia')
        },
        {
          title: 'Thao Tác',
          dataIndex: '',
          key: 'x',
          render: (record) => (
                <Space>
                    <Button
                        disabled={record.TrangThai === 0 ? true : false}
                        onClick={()=>this.showDrawer(record)} 
                        type="primary"><FormOutlined style={{ fontSize: '20px' }} />

                    </Button>

                    <Button
                        disabled={record.TrangThai===0?true:false} 
                        onClick={()=>this.xoaSanPham(record.MaSP)} 
                        danger 
                        type="primary">
                        <CloseOutlined style={{ fontSize: '20px' }} />
                    </Button>
                    {record.TrangThai===0?
                    (<Button 
                        type="dashed"
                        onClick={()=>this.khoiPhucSanPham(record.MaSP)}
                    ><RedoOutlined style={{ fontSize: '20px' }} />
                    </Button>):null}
                </Space>
          )
        },
      ];
      
    render() {
        let data = this.props.DanhSachSanPham;
        let dataChonCapNhat = this.props.SanPhamDuocChon;
        console.log(dataChonCapNhat);
        const { visible, confirmLoading,imageUrl } = this.state;
        const uploadButton = (
            <div>
              {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div className="ant-upload-text">Upload</div>
            </div>
          );
        console.log(data);
        return (
            <div>
                <Button onClick={this.showModal} type="primary">Thêm Sản Phẩm</Button>
                <Table
                    columns={this.columns}
                    rowKey={record=>record.MaSP}
                    rowClassName={record=>record.TrangThai === 0?"disableRow":""}
                    expandable={{
                    expandedRowRender: record =>
                        <div>
                            <p style={{ margin: 0 }}>Mã Sản Phẩm: SP{record.MaSP}</p>
                            <p style={{ margin: 0 }}>Tên Sản Phẩm: {record.TenSP}</p>
                            <p style={{ margin: 0 }}>Lượt Bán: {record.LuotBan}</p>
                            <p style={{ margin: 0 }}>Lượt Xem: {record.LuotXem}</p>
                            <p style={{ margin: 0 }}>Giá: {record.Gia}</p>
                            <p style={{ margin: 0 }}>Thông Tin: {record.ThongTinSP}</p>
                        </div>
                    ,
                    rowExpandable: record => record.TrangThai !== 0,
                    }}
                    dataSource={data}
                />
                <Modal
                    title="THÊM SẢN PHẨM MỚI"
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
                        <Row>
                          <Col span={4}><h4>MÃ SP :</h4></Col>
                          <Col span={20}>
                            <Form.Item
                            name="MaSP"
                            initialValue={data.length+1}
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                            <Input
                                disabled={true}
                                size="large" 
                                prefix={<RadarChartOutlined className="site-form-item-icon" />} 
                                placeholder="Tên Sản Phẩm" 
                            />
                            </Form.Item>
                          </Col>
                        </Row>
                        
                        <Row>
                          <Col span={4}><h4>TÊN SP :</h4></Col>
                          <Col span={20}>
                            <Form.Item
                            name="TenSP"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                            <Input 
                                size="large" 
                                prefix={<RadarChartOutlined className="site-form-item-icon" />} 
                                placeholder="Tên Sản Phẩm" 
                            />
                            </Form.Item>
                          </Col>
                        </Row>
                        

                        <Row>
                          <Col span={4}><h4>GIÁ :</h4></Col>
                          <Col span={20}>
                            <Form.Item
                            name="Gia"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                            <Input
                                type="number"
                                size="large" 
                                prefix={<DollarOutlined className="site-form-item-icon" />} 
                                placeholder="Giá" 
                            />
                            </Form.Item>
                          </Col>
                        </Row>
                        
                        <Row>
                          <Col span={4}><h4>SP MỚI :</h4></Col>
                          <Col span={20}>
                            <Form.Item
                              name="SPMoi"
                              hasFeedback
                              rules={[{ required: true, message: 'Mời chọn !' }]}
                            >
                                <Select placeholder="Tình Trạng">
                                    <Option value={0}>Sản Phẩm Cũ</Option>
                                    <Option value={1}>Sản Phẩm Mới</Option>
                                </Select>
                            </Form.Item>
                          </Col>
                        </Row>
                        
                        <Row>
                          <Col span={4}><h4>HÃNG SX :</h4></Col>
                          <Col span={20}>
                            <Form.Item
                              name="HangSX"
                              hasFeedback
                              rules={[{ required: true, message: 'Mời chọn !' }]}
                            >
                                <Select placeholder="Chọn Hãng Sản Xuất !">
                                    <Option value={1}>Dare-U</Option>
                                    <Option value={2}>Logitech</Option>
                                    <Option value={3}>Steelseries</Option>
                                </Select>
                            </Form.Item>
                          </Col>
                        </Row>

                        <Row>
                          <Col span={4}><h4>LOẠI SP :</h4></Col>
                          <Col span={20}>
                            <Form.Item
                              name="LoaiSP"
                              hasFeedback
                              rules={[{ required: true, message: 'Mời chọn !' }]}
                            >
                                <Select placeholder="Chọn Loại Sản Phẩm !">
                                    {
                                      this.props.DanhSachLoaiSanPham.map((loaiSP,index)=>{
                                      return <Option value={loaiSP.MaDM} key={index}>{loaiSP.LoaiSP}</Option>
                                      })
                                    }
                                </Select>
                            </Form.Item>
                          </Col>
                        </Row>
                        
                        <Row>
                          <Col span={4}><h4>ẢNH SP :</h4></Col>
                          <Col span={20}>
                            <Form.Item
                              name="Hinh"
                              valuePropName="fileList"
                              getValueFromEvent={this.normFile}
                            >
                                <Upload
                                    name="Anh"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://http://localhost:3000/img"
                                    beforeUpload={beforeUpload}
                                    onChange={this.handleChange}
                                >
                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                            </Form.Item>
                          </Col>
                        </Row>


                        <Form.Item>
                            <Button block type="danger" htmlType="submit" className="login-form-button">
                                    Thêm Sản Phẩm
                            </Button>            
                        </Form.Item>
                    </Form>
                    </Modal>

                    <Drawer
                      title="CẬP NHẬT THÔNG TIN SẢN PHẨM"
                      width={720}
                      onClose={this.onClose}
                      visible={this.state.visibleDrawer}
                      bodyStyle={{ paddingBottom: 80 }}
                      destroyOnClose={true}
                      footer={
                        <div
                          style={{
                            textAlign: 'right',
                          }}
                        >
                          <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                            Cancel
                          </Button>
                          <Button onClick={this.onClose} type="primary">
                            Submit
                          </Button>
                        </div>
                      }
                    >
                      <Form 
                         layout="vertical" 
                         hideRequiredMark
                         onFinish={this.onUpdate}
                      >
                        <Row gutter={16}>
                          <Col span={12}>
                            <Form.Item
                              name="MaSP"
                              label="Mã Sản Phẩm"
                              rules={[{ required: true, message: 'Please enter user name' }]}
                              initialValue={dataChonCapNhat.MaSP}
                            >
                              <Input disabled placeholder="Mã Sản Phẩm" />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              name="TenSP"
                              label="Tên Sản Phẩm"
                              initialValue={dataChonCapNhat.TenSP}
                              rules={[{ required: true, message: 'Please enter url' }]}
                            >
                              <Input placeholder="Tên Sản Phẩm" />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col span={12}>
                            <Form.Item
                              name="LoaiSP"
                              label="Loại Sản Phẩm"
                              initialValue={dataChonCapNhat.MaDM}
                              rules={[{ required: true, message: 'Please select an owner' }]}
                            >
                              <Select placeholder="Please select an owner">
                                <Option value={1}>Gameming Gear</Option>
                                <Option value={2}>GunDam</Option>
                                <Option value={3}>Áo in</Option>
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              name="HangSX"
                              label="Hãng Sản Xuất"
                              initialValue={dataChonCapNhat.MaHang}
                              rules={[{ required: true, message: 'Please choose the type' }]}
                            >
                              <Select placeholder="Please choose the type">
                                <Option value={1}>Dare-U</Option>
                                <Option value={2}>Logitech</Option>
                                <Option value={3}>Steelserie</Option>
                              </Select>
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col span={12}>
                            <Form.Item
                              name="Gia"
                              label="Giá : "
                              initialValue={dataChonCapNhat.Gia}
                              rules={[{ required: true, message: 'Please choose the approver' }]}
                            >
                              <Input type="number" />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              name="TinhTrang"
                              label="Tình Trạng : "
                              initialValue={dataChonCapNhat.SanPham_Moi}
                            >
                              <Select  placeholder="Please choose the type">
                                <Option value={0}>Sản Phẩm Cũ</Option>
                                <Option value={1}>Sản Phẩm Mới</Option>

                              </Select>

                            </Form.Item>
                          </Col>
                        </Row>

                        <Row gutter={16}>
                          <Col span={12}>
                            <Form.Item
                              name="TrangThai"
                              label="Trạng Thái : "
                              initialValue={dataChonCapNhat.TrangThai}
                              rules={[{ required: true, message: 'Please choose the approver' }]}
                            >
                              <Select placeholder="Please choose the type">
                                <Option value={0}>Ngừng Bán</Option>
                                <Option value={1}>Đang Bán</Option>

                              </Select>
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              name="Hinh"
                              label="Hình Ảnh : "
                            
                            >
                              

                            </Form.Item>
                          </Col>
                        </Row>

                        <Row gutter={16}>
                          <Col span={24}>
                            <Form.Item
                              name="ThongTinSP"
                              label="Thông Tin Sản Phẩm"
                              rules={[
                                {
                                  required: true,
                                  message: 'please enter url description',
                                },
                              ]}
                            >
                              <Input.TextArea rows={4} placeholder="Nhập Thông Tin Sản Phẩm" />
                            </Form.Item>
                          </Col>
                        </Row>

                        <Row gutter={16}>
                          <Col span={24}>
                            <Button block type="danger" htmlType="submit">Cập Nhật</Button>
                          </Col>
                        </Row>
                      </Form>

                      
                    </Drawer>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        DanhSachSanPham:state.DSSP.DanhSachSanPham,
        SanPhamDuocChon:state.DSSP.sanPhamChonAdmin,
        DanhSachLoaiSanPham:state.DSSP.DanhSachLoaiSanPham,
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        updateTrangThai:(MaSP)=>{
            dispatch(actUpdateTrangThai(MaSP))
        },
        recoverTrangThai: (MaSP) => {
            dispatch(actRecoverTrangThai(MaSP));
        },
        themSanPham:(sanPham)=>{
          dispatch(actThemSanPham(sanPham))
        },
        chonSanPham:(sanPham)=>{
          dispatch(actChonSanPhamCapNhat(sanPham))
        },
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(QuanLySanPham);