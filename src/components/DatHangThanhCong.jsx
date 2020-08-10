import React, { Component } from 'react'
import {
    Row,
    Col,
    Button
} from 'antd';
import {
    CheckCircleOutlined,
    QuestionCircleOutlined
} from '@ant-design/icons';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {actXoaGioHang} from '../redux/actions/giohang';

class DatHangThanhCong extends Component {
    constructor(props){
        super(props);
    }


    render() {
        let hoaDon = this.props.hoaDon;
        return (
            <div>
                <Row>
                    <Col span={8}>
                        <h2>Đặt hàng thành công</h2>
                        <h4>Mã đơn hàng #{hoaDon.MaHD}</h4>
                        <h4>Cám ơn bạn đã mua hàng !</h4>
                    </Col>
                    <Col span={16}>
                        <CheckCircleOutlined style={{fontSize:'60px',color:'#338DBC',paddingTop:'2%'}}/>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <h4>
                            Quý khách lưu ý! Với những đơn hàng có giá trị lớn như máy chơi game và Gundam,
                            Shop sẽ yêu cầu hình thức thanh toán là chuyển khoản trước để kích hoạt hình thức
                            Giao hàng đảm bảo với đối tác vận chuyển.
                        </h4>
                    </Col>
                </Row>
                <Row>
                    <Col className="thongTinDonHang" span={24}>
                        <h2>Thông tin đơn hàng</h2>
                        <p>Thông tin giao hàng</p>
                        <p>Họ tên : {hoaDon.HoTen}</p>
                        <p>Email : {hoaDon.Email}</p>
                        <p>Địa chỉ : {hoaDon.DiaChi}</p>
                        <p>Số điện thoại : {hoaDon.SDT}</p>
                        <p>Vietnam</p>
                        <p>Phương thúc thanh toán:
                            {hoaDon.PhuongThucTT===1?<span>Ship COD</span>:<span>Chuyển khoản ngân hàng</span>}
                            </p>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <QuestionCircleOutlined 
                          style={{fontSize:'20px',color:'grey',marginRight:'5px'}}
                        />Cần hỗ trợ ?
                    </Col>
                    <Col span={12} style={{textAlign:'right'}}>
                        <Button
                          size="large"
                          style={{borderRadius:'5px',background:'#338DBC'}}
                          type="primary"
                        ><Link onClick={()=>this.props.clearGioHang()} to="/">Tiếp tục mua hàng</Link>
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        clearGioHang:()=>{
            dispatch(actXoaGioHang())
        }
    }
}

export default connect(null,mapDispatchToProps)(DatHangThanhCong);
