import React, { Component } from 'react'
import {
    Table,
    Space,
    Button,
    Modal,
    Form,
    Input,
    Select,
    Drawer,
    Row,
    Col,
    message
  } from 'antd';
import {
  FormOutlined,
  SearchOutlined,
  CloseOutlined,
  RedoOutlined,
  PictureOutlined 
} from '@ant-design/icons';
import {connect} from 'react-redux';
import axios from 'axios';
import {
  actUpdateTrangThai,
  actRecoverTrangThai,
  actThemSanPham,
  actChonSanPhamCapNhat,
  actCapNhatThongTinSanPham
} from '../redux/actions/sanpham'
import Highlighter from 'react-highlight-words';
import DanhSachAnh from '../components/DanhSachAnhTheoMaSP';
import CapNhatSanPham from '../components/CapNhatSanPham';
import 'react-quill/dist/quill.snow.css';
import {port} from '../config/configAPI';
import ReactQuill from 'react-quill';
const { Option } = Select;
class QuanLySanPham extends Component {
    constructor(props) {
        super(props);
        this.state = {
          visible: false,
          visibleDrawer:false,
          visibleThemAnh:false,
          confirmLoading: false,
          searchText: '',
          searchedColumn: '',
          loading: false,
          dangThemAnh:false,
          AnhSP:'',
          AnhCapNhat:null,
          AnhSPDaiDien:'',
          MaAnhSPLienQuan:'',
          AnhSPLienQuan:'',
          maSanPham:'',
          danhSachHangSX:[],
          danhSachKichThuoc:[]
        };
      }

      componentDidMount(){
        axios({
            method:"GET",
            url:`http://localhost:${port}/api/hangsx/layDSHangsx`
        })
        .then(res=>this.setState({
            danhSachHangSX:res.data
        }))
        .catch(err=>console.log(err))

        axios({
          method:"GET",
          url:`http://localhost:${port}/api/kichthuoc/layDSKT`
        })
        .then(res=>this.setState({
            danhSachKichThuoc:res.data
        }))
        .catch(err=>console.log(err))
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
          AnhCapNhat:null
        });
      };
    showModal = () => {
        this.setState({
          visible: true,
          dangThemAnh:!this.state.dangThemAnh
        })
    };

    showModalThemAnh=(MaSP,Hinh)=>{
      this.setState({
        MaAnhSPLienQuan:MaSP,
        visibleThemAnh: true,
        AnhSPDaiDien:Hinh
      })

    }

    themAnhSanPhamLienQuan(url)
    {
      let AnhSP={
        MaSP:this.state.MaAnhSPLienQuan,
        HinhAnh:url
      }
      axios({
        method:"POST",
        url:`http://localhost:${port}/api/sanpham/themAnhSP`,
        data:AnhSP
      })
      .then(res=>{
        this.setState({visibleThemAnh:false});
        message.success(res.data.message);
      })
      .catch(err=>console.log(err))
    }

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
          dangThemAnh:!this.state.dangThemAnh
        });
    };

    handleCancelThemAnh = () => {
      console.log('Clicked cancel button');
      this.setState({
        visibleThemAnh: false,
      });
  };

    //Them san pham
    themSanPham=(values)=>{
        let SanPham = [...this.props.DanhSachSanPham].pop();
        const sanPham = {
            MaSP:SanPham.MaSP,
            MaDM:parseInt(values.LoaiSP),
            MaHang:parseInt(values.HangSX),
            TenSP:values.TenSP,
            ThongTinSP:values.ThongTinSP,
            LuotBan:0,
            LuotXem:0,
            MaKT:parseInt(values.KichThuoc),
            SL:parseInt(values.SoLuong),
            TrangThai:1,
            Gia:parseInt(values.Gia),
            SanPham_Moi:parseInt(values.SPMoi),
            Hinh:this.state.AnhSP,
        }
        console.log(sanPham);
        axios({
          method:'POST',
          url:`http://localhost:${port}/api/sanpham/themSP`,
          data: sanPham
        })
        .then(res=>{
          axios({
            method:'POST',
            url:`http://localhost:${port}/api/sanpham/themCTSP`,
            data:sanPham
          })
          .then(res=>console.log(res.data))
          .catch(err=>console.log(err))
          this.props.themSanPham(sanPham);
        })
        .catch(err=>console.log(err))
        this.setState({
          visible:false,
          dangThemAnh:!this.state.dangThemAnh
        })
    }

    //Cap nhat thong tin san pham 
    capNhatThongTinSanPham = (values)=>{
      console.log(values);
      const sanPham = {
        MaSP:values.MaSP,
        MaDM:parseInt(values.MaDM),
        MaHang:parseInt(values.MaHang),
        TenSP:values.TenSP,
        LuotBan:0,
        LuotXem:0,
        ThongTinSP:values.ThongTinSP,
        TrangThai:parseInt(values.TrangThai),
        Gia:parseInt(values.Gia),
        SanPham_Moi:parseInt(values.SPMoi),
        Hinh: this.state.AnhCapNhat!==null?this.state.AnhCapNhat:values.Hinh,
      }
      axios({
        method:'PUT',
        url:`http://localhost:${port}/api/sanpham/capNhatThongTin/${sanPham.MaSP}`,
        data: sanPham
      })
      .then(res=>this.props.capNhatThongTinSanPham(sanPham))
      .catch(err=>console.log(err))
      console.log(sanPham);
      this.setState({
        visibleDrawer:false,
        AnhCapNhat:null
      })
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
                        onClick={()=>this.showDrawer1(record.MaSP)} 
                        type="primary"><FormOutlined style={{ fontSize: '20px' }} />

                    </Button>

                    <Button
                        disabled={record.TrangThai===0?true:false} 
                        onClick={()=>this.xoaSanPham(record.MaSP)} 
                        danger 
                        type="primary">
                        <CloseOutlined style={{ fontSize: '20px' }} />
                    </Button>

                    <Button
                        disabled={record.TrangThai===0?true:false} 
                        onClick={()=>this.showModalThemAnh(record.MaSP,record.Hinh)} 
                        ghost
                        type="primary">
                        <PictureOutlined style={{ fontSize: '20px' }} />
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

    showWidget = (widget)=>{
      widget.open();
    }

    modules = {
      toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
      ],
    }

    formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image'
    ]

    showDrawer1=(maSanPham)=>{
      console.log(maSanPham);
      this.setState({
        visibleDrawer: true,
        maSanPham:maSanPham
      });
    }
      
    render() {
        let data = this.props.DanhSachSanPham;
        const { visible, confirmLoading,visibleThemAnh,AnhSPDaiDien,maSanPham,danhSachKichThuoc } = this.state;
        let widget = window.cloudinary.createUploadWidget({
          cloudName:"dl9fnqrq3",
          uploadPreset:"qsg1ozry"},
          (error,result)=>!error && result && result.event === "success"?
              (this.state.dangThemAnh===true?this.setState({AnhSP:result.info.url})
              :this.setState({AnhCapNhat:result.info.url})):console.log(error)
        )

        let widget2 = window.cloudinary.createUploadWidget({
          cloudName:"dl9fnqrq3",
          uploadPreset:"qsg1ozry"},
          (error,result)=>!error && result && result.event === "success"?
              this.themAnhSanPhamLienQuan(result.info.url):console.log(error)
        )
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
                      title="THÊM ẢNH CHO SẢN PHẨM"
                      visible={visibleThemAnh}
                      onOk={this.handleOk}
                      confirmLoading={confirmLoading}
                      onCancel={this.handleCancelThemAnh}
                      destroyOnClose={true}
                    >
                      <div style={{width:'100%',height:'700px',textAlign:'center'}}>
                        <h1>ẢNH ĐẠI DIỆN</h1>
                        <img style={{width:'100%',height:'300px'}} src={AnhSPDaiDien} alt=""/>
                        <Button
                        type="primary"
                        size="large"
                        onClick={()=>this.showWidget(widget2)}
                        style={{borderRadius:'5px'}}
                        >
                          Thêm Ảnh
                        </Button>
                        <h1>DANH SÁCH ẢNH LIÊN QUAN</h1>

                          <DanhSachAnh MaSP={this.state.MaAnhSPLienQuan}></DanhSachAnh>
           
                      </div>
                    </Modal>


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
                        onFinish={this.themSanPham}
                    >
                        <Row>
                          <Col span={24}>
                            <Form.Item
                            hidden={true}
                            name="MaSP"
                            initialValue={data.length+1}
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                            <Input
                                disabled={true}
                                size="large" 
                                 
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
                                  {
                                      this.state.danhSachHangSX.map((hang,index)=>{
                                      return <Option key={index} value={hang.MaHang}>{hang.Tenhang}</Option>
                                      })
                                  }
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
                          <Col span={4}><h4>SỐ LƯỢNG :</h4></Col>
                          <Col span={20}>
                            <Form.Item
                              name="SoLuong"
                              hasFeedback
                              rules={[{ required: true, message: 'Nhập số lượng !' }]}
                            >
                                <Input type="number" min={1} max={100} placeholder="Nhập số lượng" />
                            </Form.Item>
                          </Col>
                        </Row>

                        <Row>
                          <Col span={4}><h4>KÍCH THƯỚC :</h4></Col>
                          <Col span={20}>
                            <Form.Item
                              name="KichThuoc"
                              initialValue={6}
                              hasFeedback
                              rules={[{ required: true, message: 'Chọn kích thước !' }]}
                            >
                                <Select placeholder="Chọn kích thước">
                                {
                                    danhSachKichThuoc.map((kt,index)=>{
                                        return <Option key={index} value={kt.MaKT}>{kt.TenKT}</Option>
                                    })
                                }
                                </Select>
                            </Form.Item>
                          </Col>
                        </Row>

                        <Row>
                          <Col span={4}><h4>Chi Tiết :</h4></Col>
                          <Col span={20}>
                            <Form.Item
                              name="ThongTinSP"
                            >
                              <ReactQuill 
                              modules={this.modules}
                              formats={this.formats}
                              value="..."
                              ></ReactQuill>
                            </Form.Item>
                            
                          </Col>
                        </Row>
                        
                        <Row>
                          <Col span={4}><h4>ẢNH SP :</h4></Col>
                          <Col span={20}>
                            <Form.Item
                              name="Hinh"
                              initialValue={this.state.AnhSP}
                            >
                              <Button type="primary" onClick={()=>this.showWidget(widget)}>Thêm ảnh</Button>
                              <div className="anhThem">
                                <img className="anhThem" src={this.state.AnhSP} alt=""/>
                              </div>
                            </Form.Item>
                          </Col>
                        </Row>
                            <Button block type="danger" htmlType="submit" className="login-form-button">
                                    Thêm Sản Phẩm
                            </Button>            
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
                      
                      <CapNhatSanPham maSanPham={maSanPham} danhSachHangSX={this.props.danhSachHangSX}/>
                      
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
        capNhatThongTinSanPham:(sanPham)=>{
          dispatch(actCapNhatThongTinSanPham(sanPham))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(QuanLySanPham);