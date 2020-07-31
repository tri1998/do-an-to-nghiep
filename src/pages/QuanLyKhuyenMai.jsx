import React, { Component } from 'react'
import {
    Table,
    Button,
    Space,
    Tooltip,
    Modal,
    Form,
    DatePicker,
    Input
} from 'antd';
import {
    ReadOutlined,
    CloseOutlined
  } from '@ant-design/icons';
import {connect} from 'react-redux';
import axios from 'axios';
import {port} from '../config/configAPI';
import {
    actLuuDanhSachDotKhuyenMai,
    actXoaKhuyenMai,
    actPhucHoiKhuyenMai,
    actThemDotKhuyenMai
} from '../redux/actions/khuyenmai.jsx';
class QuanLyKhuyenMai extends Component {
    constructor(props){
        super(props);
        this.state={
            visible: false,
            NgayBD:undefined,
            NgayKT:undefined
        }
    }

    onChange1=(dateString,date)=> {
        console.log(dateString,date);
        this.setState({
            NgayBD:date,
        })
    }

    onChange2=(dateString,date)=> {
        console.log(dateString,date);
        this.setState({
            NgayKT:date
        })
    }

    showModal = () => {
        this.setState({
          visible: true,
        });
      };

    handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    
    handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };



    columns = [
        {
          title: 'Tên Đợt Khuyến Mại',
          dataIndex: 'TenDotKM',
          key: 'TenDotKM',
        },
        {
          title: 'Ngày Bắt Đầu',
          dataIndex: 'NgayBD',
          key: 'NgayBD',
        },
        {
          title: 'Ngày Kết Thúc',
          dataIndex: 'NgayKT',
          key: 'NgayKT',
        },
        {
            title: 'Thao Tác ',
            dataIndex: 'ThaoTac',
            key: 'ThaoTac',
            render:(text,record)=>(
                <Space>
                     <Tooltip title="Xem Chi Tiết">
                        <Button
                        disabled={record.TrangThai!==0?false:true}
                        type="primary"
                        onClick={()=>this.xemChiTiet(record.MaKM)}
                        >
                            <ReadOutlined style={{fontSize:20}}/>
                        </Button>
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <Button 
                        disabled={record.TrangThai!==0?false:true}
                        type="primary"
                        danger
                        onClick={()=>this.xoaKhuyenMai(record.MaKM)}
                        >
                            <CloseOutlined style={{fontSize:20}}/>
                        </Button>
                    </Tooltip>

                    {record.TrangThai===0?<Tooltip title="phục hồi">
                        <Button 
                        type="dashed"
                        danger
                        onClick={()=>this.phucHoiKhuyenMai(record.MaKM)}
                        >
                            <CloseOutlined style={{fontSize:20}}/>
                        </Button>
                     </Tooltip>:null}
                </Space>
            )
        },
      ];

    xoaKhuyenMai = (maKhuyenMai)=>{
        sessionStorage.setItem(`${maKhuyenMai}`,false);
        axios({
            method:"PUT",
            url:`http://localhost:${port}/api/khuyenmai/xoaKhuyenMai/${maKhuyenMai}`
        })
        .then(res=>this.props.xoaKhuyenMai(maKhuyenMai))
        .catch(err=>console.log(err));
    }

    themKhuyenMai=(values)=>{
        let danhSach=this.props.danhSachDotKM;
        let phanTuCuoi = danhSach.pop();
        const khuyenMai={
            MaKM:phanTuCuoi.MaKM+=1,
            TenDotKM:values.TenKM,
            NgayBD:this.state.NgayBD,
            NgayKT:this.state.NgayKT
        }
        console.log(khuyenMai);
        axios({
            method:"POST",
            url:`http://localhost:${port}/api/khuyenmai/themKhuyenMai`,
            data:khuyenMai
        })
        .then(res=>this.props.themDotKhuyenMai(khuyenMai))
        .catch(err=>console.log(err));

    }

    phucHoiKhuyenMai = (maKhuyenMai)=>{
        axios({
            method:"PUT",
            url:`http://localhost:${port}/api/khuyenmai/phucHoiKhuyenMai/${maKhuyenMai}`
        })
        .then(res=>this.props.phucHoiKhuyenMai(maKhuyenMai))
        .catch(err=>console.log(err));
    }
    
    xemChiTiet=(maKhuyenMai)=>{
        this.props.history.push(`/admin/chitietkhuyenmai/${maKhuyenMai}`)
    }

    componentDidMount(){
        axios({
            method:"GET",
            url:`http://localhost:${port}/api/khuyenmai/layDanhSachDotKM`
        })
        .then(res=>this.props.luuDanhSachDotKM(res.data))
        .catch(err=>console.log(err));
    }
    render() {
        let danhSachDotKM = this.props.danhSachDotKM;
        return (
            <div>
                <Button onClick={this.showModal} type="primary" shape="round">Thêm đọt khuyến mại</Button>
                <Modal
                    title="THÊM ĐỢT KHUYẾN MẠI"
                    visible={this.state.visible}
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
                            name="TenKM"
                            rules={[{ required: true, message: 'Nhập tên khuyến mại!' }]}
                        >
                            <Input min={1} max={99} placeholder="Nhập tên khuyến mại" />
                        </Form.Item>
                     
               
                            <Form.Item
                                name="NgayBD"
                                rules={[{ required: true, message: 'Chọn ngày bắt đầu' }]}
                            >
                                <DatePicker style={{width:'100%'}} onChange={this.onChange1} />
                            </Form.Item>

                            <Form.Item
                                name="NgayKT"
                                rules={[{ required: true, message: 'Chọn ngày kết thúc' }]}
                            >
                                <DatePicker style={{width:'100%'}} onChange={this.onChange2} />
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



                <Table 
                    columns={this.columns}
                    dataSource={danhSachDotKM}
                    rowClassName={record=>record.TrangThai===0?"disableRow":null}
                />
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        danhSachDotKM:state.DSCTKhuyenMai.danhSachKM
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        luuDanhSachDotKM:(danhSachDotKM)=>{
            dispatch(actLuuDanhSachDotKhuyenMai(danhSachDotKM))
        },
        xoaKhuyenMai:(maKhuyenMai)=>{
            dispatch(actXoaKhuyenMai(maKhuyenMai))
        },
        phucHoiKhuyenMai:(maKhuyenMai)=>{
            dispatch(actPhucHoiKhuyenMai(maKhuyenMai))
        },
        themDotKhuyenMai:(khuyenMai)=>{
            dispatch(actThemDotKhuyenMai(khuyenMai))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(QuanLyKhuyenMai);
