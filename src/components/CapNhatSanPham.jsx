import React, { Component } from 'react'
import {
  Button,
  Select,
  Input,
  Row,
  Col,
  Form,
  message
} from 'antd';
import axios from 'axios';
import { port } from '../config/configAPI'
import ReactQuill, { Quill } from 'react-quill';
import HangSX from './HangSanXuat';
import { connect } from 'react-redux';
import { actCapNhatThongTinSanPham } from '../redux/actions/sanpham';
const { Option } = Select;
const modules = {

  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image'],
    ['clean']
  ],

}

class CapNhatSanPham extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SanPham: '',
      AnhSPMoi: '',
      danhSachHangSX:[]
    }
  }

  componentDidMount() {
    let maSanPham = this.props.maSanPham
    axios({
      method: "GET",
      url: `http://localhost:${port}/api/sanpham/xemChiTietSP/${maSanPham}`
    })
      .then(res => {
        this.setState({
          SanPham: res.data[0]
        })
      })
      .catch(err => console.log(err));

    axios({
        method:"GET",
        url:`http://localhost:${port}/api/hangsx/layDSHangsx`
    })
    .then(res=>this.setState({
        danhSachHangSX:res.data
    }))
    .catch(err=>console.log(err))
  }

  modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  }

  showWidget = (widget) => {
    widget.open();
  }


  capNhatSanPham = (values) => {
    const sanPham = {
      MaSP: values.MaSP,
      MaDM: parseInt(values.MaDM),
      MaHang: parseInt(values.MaHang),
      TenSP: values.TenSP,
      ThongTinSP: values.ThongTinSP,
      TrangThai: parseInt(values.TrangThai),
      Gia: parseInt(values.Gia),
      SanPham_Moi: parseInt(values.SanPham_Moi),
      Hinh: this.state.AnhSPMoi !== '' ? this.state.AnhSPMoi : values.Hinh,
    }
    axios({
      method: 'PUT',
      url: `http://localhost:${port}/api/sanpham/capNhatThongTin/${sanPham.MaSP}`,
      data: sanPham
    })
      .then(res => {
        this.props.capNhatThongTinSanPham(sanPham);
        message.success('Cập nhật thông tin sản phẩm thành công !');
      })
      .catch(err => console.log(err))
    console.log(sanPham);
  }

  render() {
    let { SanPham , danhSachHangSX} = this.state;
    let danhSanhLoai = this.props.DanhSachLoaiSanPham;
    let widget = window.cloudinary.createUploadWidget({
      cloudName: "dl9fnqrq3",
      uploadPreset: "qsg1ozry"
    },
      (error, result) => !error && result && result.event === "success" ?
        this.setState({ AnhSPMoi: result.info.url }) : console.log(error)
    )
    return (
      <div>
        {SanPham === '' ? <div></div> :
          <Form
            name="normal_login"
            className="login-form"
            layout="vertical"
            initialValues={{ remember: true }}
            hideRequiredMark
            onFinish={this.capNhatSanPham}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="MaSP"
                  label="Mã Sản Phẩm"
                  rules={[{ required: true, message: 'Please enter user name' }]}
                  initialValue={SanPham.MaSP}
                >
                  <Input disabled placeholder="Mã Sản Phẩm" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="TenSP"
                  label="Tên Sản Phẩm"
                  rules={[{ required: true, message: 'Please enter url' }]}
                  initialValue={SanPham.TenSP}
                >
                  <Input placeholder="Tên Sản Phẩm" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="MaDM"
                  label="Loại Sản Phẩm"
                  initialValue={SanPham.MaDM}
                  rules={[{ required: true, message: 'Please select an owner' }]}
                >
                  <Select placeholder="Please select an owner">
                    {
                      danhSanhLoai.map((loai, index) => {
                        return <Option key={index} value={loai.MaDM}>{loai.LoaiSP}</Option>
                      })
                    }
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="MaHang"
                  label="Hãng Sản Xuất"
                  initialValue={SanPham.MaHang}
                  rules={[{ required: true, message: 'Please choose the type' }]}
                >
                  <Select placeholder="Chọn Hãng Sản Xuất !">
                    {
                      danhSachHangSX.map((hang, index) => {
                        return <Option key={index} value={hang.MaHang}>{hang.Tenhang}</Option>
                      })
                    }
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="Gia"
                  label="Giá : "
                  initialValue={SanPham.Gia}
                  rules={[{ required: true, message: 'Please choose the approver' }]}
                >
                  <Input type="number" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="SanPham_Moi"
                  label="Tình Trạng : "
                  initialValue={SanPham.SanPham_Moi}
                >
                  <Select placeholder="Please choose the type">
                    <Option key="1bc" value={0}>Sản Phẩm Cũ</Option>
                    <Option key="456" value={1}>Sản Phẩm Mới</Option>

                  </Select>

                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="TrangThai"
                  label="Trạng Thái : "
                  initialValue={SanPham.TrangThai}
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
                  initialValue={SanPham.Hinh}
                >
                  <Button
                    onClick={() => this.showWidget(widget)}
                    type="primary"
                  >Thay ảnh</Button>
                  {this.state.AnhSPMoi === '' ? <div className="anhThem">
                    <img className="anhThem" src={SanPham.Hinh} alt={SanPham.TenSP} />
                  </div>
                    : <div className="anhThem">
                      <img className="anhThem" src={this.state.AnhSPMoi} alt={SanPham.TenSP} />
                    </div>}

                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="ThongTinSP"
                  label="Chi Tiết Sản Phẩm"
                  initialValue={`${SanPham.ThongTinSP}`}
                >
                  <ReactQuill
                    modules={modules}

                  >

                  </ReactQuill>

                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Button block type="danger" htmlType="submit">Cập Nhật</Button>
              </Col>
            </Row>
          </Form>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    DanhSachLoaiSanPham: state.DSSP.DanhSachLoaiSanPham,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    capNhatThongTinSanPham: (sanPham) => {
      dispatch(actCapNhatThongTinSanPham(sanPham))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CapNhatSanPham);
