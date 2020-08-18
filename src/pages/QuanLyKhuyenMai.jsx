import React, { Component } from 'react'
import {
    Table,
    Button,
    Space,
    Tooltip,
    Modal,
    Form,
    DatePicker,
    Input,
    message,
    Popconfirm
} from 'antd';
import {
    ReadOutlined,
    CloseOutlined
  } from '@ant-design/icons';
import {connect} from 'react-redux';
import axios from 'axios';
import {port} from '../config/configAPI';
import moment from 'moment';
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
          render:(text,record)=>(
              moment(record.NgayBD).format('DD-MM-YYYY')
          )
        },
        {
          title: 'Ngày Kết Thúc',
          dataIndex: 'NgayKT',
          key: 'NgayKT',
          render:(text,record)=>(
            moment(record.NgayKT).format('DD-MM-YYYY')
         )
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
                        onClick={()=>this.xemChiTiet(record.MaKM,record.TenDotKM)}
                        >
                            <ReadOutlined style={{fontSize:20}}/>
                        </Button>
                    </Tooltip>

                    <Popconfirm
                        title="Bạn ngưng đợt khuyến mại này ?"
                        onConfirm={()=>this.confirm(record.MaKM)}
                        onCancel={this.cancel}
                        okText="Đồng ý"
                        cancelText="Hủy"
                        disabled={record.TrangThai!==0?false:true}
                    >
                        <Tooltip title="Xóa">
                            <Button 
                            disabled={record.TrangThai!==0?false:true}
                            type="primary"
                            danger
                            >
                                <CloseOutlined style={{fontSize:20}}/>
                            </Button>
                        </Tooltip>
                    </Popconfirm>
                    

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
        let ngayHienTai = moment().format('YYYY-MM-DD');
        let ngayBatDau = moment(this.state.NgayBD).format('YYYY-MM-DD');
        let ngayKetThuc = moment(this.state.NgayKT).format('YYYY-MM-DD');
        if(ngayBatDau>=ngayHienTai)
        {
            if(ngayBatDau<ngayKetThuc)
            {
                let danhSach=this.props.danhSachDotKM;
                let cuoiCung = [...danhSach].pop();
                const khuyenMai={
                    MaKM:cuoiCung.MaKM+=1,
                    TenDotKM:values.TenKM,
                    NgayBD:ngayBatDau,
                    NgayKT:ngayKetThuc
                }
                console.log(khuyenMai);
                axios({
                    method:"POST",
                    url:`http://localhost:${port}/api/khuyenmai/themKhuyenMai`,
                    data:khuyenMai
                })
                .then(res=>{
                    message.success('Thêm khuyến mại thành công !');
                    this.props.themDotKhuyenMai(khuyenMai);
                    this.setState({visible:false})
                })
                .catch(err=>console.log(err));
            }
            else
            {
                message.warning('Ngày bắt đầu không thể trùng hoặc lớn hơn ngày kết thúc !')
            }
        }
        else 
        {
            message.warning('Ngày bắt đầu không được nhỏ hơn ngày hiện tại !');
        }
        

    }

    phucHoiKhuyenMai = (maKhuyenMai)=>{
        axios({
            method:"PUT",
            url:`http://localhost:${port}/api/khuyenmai/phucHoiKhuyenMai/${maKhuyenMai}`
        })
        .then(res=>this.props.phucHoiKhuyenMai(maKhuyenMai))
        .catch(err=>console.log(err));
    }
    
    xemChiTiet=(maKhuyenMai,tenDotKM)=>{
        sessionStorage.removeItem('tenDotKM');
        sessionStorage.setItem('tenDotKM',tenDotKM)
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

    confirm = (maKhuyenMai) => {
        sessionStorage.setItem(`${maKhuyenMai}`,false);
        axios({
            method:"PUT",
            url:`http://localhost:${port}/api/khuyenmai/xoaKhuyenMai/${maKhuyenMai}`
        })
        .then(res=>this.props.xoaKhuyenMai(maKhuyenMai))
        .catch(err=>console.log(err));
    }

    cancel = (e) => {
        console.log(e);
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
                    rowKey={record=>record.MaKM}
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
