import React, { Component } from 'react'
import {
    Table,
    Button,
    Space,
    Tooltip,
    Select,
    Input,
    Form,
    Modal,
    message,
    Drawer
    
} from 'antd';
import {
    FormOutlined,
    CloseOutlined,
    RedoOutlined
} from '@ant-design/icons';
import axios from 'axios'
import {port} from '../config/configAPI';
import {connect} from 'react-redux';
import {
    actThemChiTietKhuyenMai,
    actXoaChiTietKhuyenMai,
    actPhucHoiChiTietKhuyenMai,
    actCapNhatPhanTramKhuyenMai
} from '../redux/actions/khuyenmai';
const { Option } = Select;



const timViTri = (maSP,mangSP)=>{
    let viTri = mangSP.findIndex(sp=>sp.MaSP===maSP);
    return viTri;
}

class ChiTietKhuyenMai extends Component {
    constructor(props){
        super(props);
        this.state={
            PhanTram: 1,
            visible: false,
            visibleDrawer: false,
            danhSachSanPhamChuaKM:[],
            DSSPKMTheoDot:[],
            khuyenMaiDuocChon:{}
        }
    }

    showDrawer = (CTKM) => {
        console.log(CTKM);
        this.setState({
            visibleDrawer: true,
            khuyenMaiDuocChon:CTKM
        });
      };
    
    onClose = () => {
        this.setState({
            visibleDrawer: false,
        });
      };

    success = () => {
        message.success('Thành công !');
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

    columns = [
        {
          title: 'Tên Sản Phẩm',
          dataIndex: 'TenSP',
          key: 'TenSP',
        },
        {
          title: '% ',
          dataIndex: 'PhanTram',
          key: 'PhanTram',
          render:(record)=>(
          <span>-{record}%</span>
          )
        },
        {
          title: 'Tình trạng',
          dataIndex: 'TrangThai',
          key: 'TrangThai',
          render:(record)=>(
            record===1
            ?<h4 className="trangthaitrue">Đang áp dụng</h4>
            :<h4 className="trangthaifalse">Ngừng áp dụng</h4>
          )
        },
        {
            title: 'Thao Tác ',
            dataIndex: 'ThaoTac',
            key: 'ThaoTac',
            render:(text,record)=>(
                <Space>
                    <Tooltip title="Cập nhật">
                            <Button
                            onClick={()=>this.showDrawer(record)}
                            type="primary"
                            disabled={record.TrangThai === 0 ? true : false}
                            >
                            <FormOutlined style={{ fontSize: '20px' }} />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Xóa">
                            <Button
                            type="primary"
                            danger
                            disabled={record.TrangThai === 0 ? true : false}
                            onClick={()=>this.xoaChiTietKhuyenMai(record.MaSP)}
                            >
                            <CloseOutlined style={{ fontSize: '20px' }} />
                        </Button>
                    </Tooltip>
                    {record.TrangThai === 0
                    ? <Tooltip title="Phục hồi">
                    <Button 
                        onClick={() => this.phucHoiChiTietKhuyenMai(record.MaSP)} danger>
                        <RedoOutlined style={{ fontSize: '20px' }} />
                    </Button>
                    </Tooltip>
                    : null}
                </Space>
            )
        },
    ]
    componentDidMount(){
        let MaKM = this.props.match.params.maKM;
        axios({
            method:"GET",
            url:`http://localhost:${port}/api/khuyenmai/layChiTietKhuyenMai/${MaKM}`
        })
        .then(res=>this.setState({DSSPKMTheoDot:res.data}))
        .catch(err=>console.log(err));

        axios({
            method:"GET",
            url:`http://localhost:${port}/api/khuyenmai/layDSSPChuaKM`
        })
        .then(res=>this.setState({danhSachSanPhamChuaKM:res.data}))
        .catch(err=>console.log(err))

    }


    onChange=(value) =>{
        console.log(`selected ${value}`);
    }
      
    onBlur=()=> {
        console.log('blur');
    }
      
    onFocus=()=> {
        console.log('focus');
    }
      
    onSearch=(val) =>{
        console.log('search:', val);
    }

    themKhuyenMai=(values)=>{
        let MaKM = this.props.match.params.maKM;
        let objKM = this.state.danhSachSanPhamChuaKM.find(km=>km.MaSP===values.MaSP);
        console.log(values);
        let CTKM = {
            MaKM:MaKM,
            MaSP:values.MaSP,
            PhanTram:parseInt(values.PhanTram),
            TrangThai:1
        }
        let CTKMTheoDot = {
            MaKM:MaKM,
            MaSP:values.MaSP,
            TenSP:objKM.TenSP,
            PhanTram:parseInt(values.PhanTram),
            TrangThai:1
        }
        axios({
            method:"POST",
            url:`http://localhost:${port}/api/khuyenmai/themCTKM/${MaKM}`,
            data:CTKM
        })
        .then(res=>{
            this.props.themChiTietKM(CTKM);
            this.success();
        })
        .catch(err=>console.log(err))
        let DSSPChuaKM = this.state.danhSachSanPhamChuaKM;
        let dSSPKMTheoDot = [...this.state.DSSPKMTheoDot];
        DSSPChuaKM.splice(timViTri(CTKM.MaSP,DSSPChuaKM),1);
        dSSPKMTheoDot.push(CTKMTheoDot);
        this.setState({
            danhSachSanPhamChuaKM:DSSPChuaKM,
            DSSPKMTheoDot:dSSPKMTheoDot,
            visible: false
        });
        

    }

    xoaChiTietKhuyenMai=(maSP)=>{
        axios({
            method:"PUT",
            url:`http://localhost:${port}/api/khuyenmai/capNhatChiTiet0/${maSP}`
        })
        .then(res=>{
            let capNhatMangKM = [...this.state.DSSPKMTheoDot];
            capNhatMangKM[timViTri(maSP,capNhatMangKM)].TrangThai=0;
            this.setState({DSSPKMTheoDot:capNhatMangKM});
            this.props.xoaChiTietKM(maSP);
        })
        .catch(err=>console.log(err))
    }

    phucHoiChiTietKhuyenMai=(maSP)=>{
        axios({
            method:"PUT",
            url:`http://localhost:${port}/api/khuyenmai/capNhatChiTiet1/${maSP}`
        })
        .then(res=>{
            let capNhatMangKM = [...this.state.DSSPKMTheoDot];
            capNhatMangKM[timViTri(maSP,capNhatMangKM)].TrangThai=1;
            this.setState({DSSPKMTheoDot:capNhatMangKM});
            this.props.phucHoiChiTietKM(maSP);
        })
        .catch(err=>console.log(err))
    }

    capNhatChiTietKhuyenMai=(values)=>{
        let MaKM = this.props.match.params.maKM;
        let khuyenMai={
            MaSP:parseInt(values.MaSP),
            TenSP:values.TenSP,
            PhanTram:parseInt(values.PhanTram)
        }
        console.log(khuyenMai);
        this.setState({
            visibleDrawer:false
        })

        axios({
            method:"PUT",
            url:`http://localhost:${port}/api/khuyenmai/capNhatCTKM/${MaKM}`,
            data:khuyenMai
        })
        .then(res=>{
            let capNhatMangKM = [...this.state.DSSPKMTheoDot];
            capNhatMangKM[timViTri(khuyenMai.MaSP,capNhatMangKM)].PhanTram=khuyenMai.PhanTram;
            this.setState({DSSPKMTheoDot:capNhatMangKM});
            this.props.capNhatPhanTramKhuyenMai(khuyenMai);
            this.success();

        })
        .catch(err=>console.log(err))
    }


    render() {
        let {visible,khuyenMaiDuocChon} = this.state;
        return (
            <div>
                    <Button
                        type="primary"
                        onClick={this.showModal}
                    >
                        Thêm khuyến mại
                    </Button>
                    <Modal
                    title="THÊM CHI TIẾT KHUYẾN MẠI"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    destroyOnClose={true}
                    >
                    <Form
                        name="frmThemChiTietKM"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.themKhuyenMai}
                    >
                        <Form.Item
                            name="MaSP"
                            rules={[{ required: true, message: 'Chọn tên sản phẩm!' }]}
                        >
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Chọn sản phẩm ..."
                                optionFilterProp="children"
                                onChange={this.onChange}
                                onFocus={this.onFocus}
                                onBlur={this.onBlur}
                                onSearch={this.onSearch}
                                filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {
                                    this.state.danhSachSanPhamChuaKM.map((sp,index)=>{
                                    return <Option key={index} value={sp.MaSP}>{sp.TenSP}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                     
               
                            <Form.Item
                                name="PhanTram"
                                rules={[{ required: true, message: 'Nhập % khuyến mại' }]}
                            >
                                <Input min={1} max={99} type="number" placeholder="Nhập % khuyến mại" />
                            </Form.Item> 

                            <Form.Item name="btnThem">
                                <Button
                                    block
                                    type="primary"
                                    danger 
                                    shape="round"
                                    htmlType="submit"
                                    className="login-form-button"
                                >Thêm khuyến mại
                                </Button>
                            </Form.Item> 
 
                </Form>
                </Modal>

                <Drawer
                    title="Sửa % khuyến mại"
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visibleDrawer}
                    key="drawerUpdate"
                    destroyOnClose={true}
                    >
                    <Form
                        name="frmCapNhat"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.capNhatChiTietKhuyenMai}
                    >
                        <Form.Item
                            name="MaSP"
                            initialValue={khuyenMaiDuocChon.MaSP}
                        >
                            <Input disabled type="number"></Input>
                        </Form.Item>

                        <Form.Item
                            name="TenSP"
                            initialValue={khuyenMaiDuocChon.TenSP}
                        >
                            <Input disabled type="text"></Input>
                        </Form.Item>

                        <Form.Item
                            name="PhanTram"
                            initialValue={khuyenMaiDuocChon.PhanTram}
                        >
                            <Input  min={1} max={99} type="number"></Input>
                        </Form.Item>

                        
                            <Button 
                                htmlType="submit" 
                                block 
                                danger 
                                type="primary" >Cập Nhật
                            </Button>
                

                    </Form>
                </Drawer>
                <Table
                    style={{marginTop:10}}
                    rowKey={record=>record.MaSP}
                    columns={this.columns}
                    dataSource={this.state.DSSPKMTheoDot}
                    rowClassName={record =>record.TrangThai === 0 ? "disableRow" : null}
                />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        themChiTietKM:(khuyenMai)=>{
            dispatch(actThemChiTietKhuyenMai(khuyenMai))
        },
        xoaChiTietKM:(maSP)=>{
            dispatch(actXoaChiTietKhuyenMai(maSP))
        },
        phucHoiChiTietKM:(maSP)=>{
            dispatch(actPhucHoiChiTietKhuyenMai(maSP))
        },
        capNhatPhanTramKhuyenMai:(khuyenMai)=>{
            dispatch(actCapNhatPhanTramKhuyenMai(khuyenMai))
        }
    }
}

export default connect(null,mapDispatchToProps)(ChiTietKhuyenMai);
