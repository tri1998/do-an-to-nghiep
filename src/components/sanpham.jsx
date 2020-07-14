import React, { PureComponent } from 'react'
import { Button,Col } from 'antd';
import { Card } from 'antd';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {actXemChiTiet,actLuuSanPhamVuaXem} from '../redux/actions/sanpham';
class sanpham extends PureComponent {

    handleXemChiTiet=(sanPham)=>{
        this.props.xemChiTiet(sanPham);
        this.props.luuSPVuaXem(sanPham);
    }

    render() {
        let {MaSP,TenSP,Hinh,Gia} = this.props.sanPham;
        Gia = Gia.toLocaleString('vn-VN', {style : 'currency', currency : 'VND'});

        return (
                <Col span={8}>
                    <Card
                    hoverable
                    style={{ width: 260 }}
                    cover={<img className="hinhSP" alt="example" src={Hinh} />}
                    >
                        <div className="wrapprice">
                            <span>{Gia}</span>
                        </div>
                        <div className="tenSP">
                            <h3>{TenSP}</h3>
                        </div>
                        <div className="btn_sp">
                            <Button 
                            onClick={()=>this.handleXemChiTiet(this.props.sanPham)}
                            shape="round" size="large"
                            >
                                <Link to={`/${MaSP}`}>Mua Ngay</Link>
                            </Button>
                        </div>
                        
                        
                    </Card>
                </Col>
                
        )
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        xemChiTiet:(sp)=>{
            dispatch(actXemChiTiet(sp))
        },
        luuSPVuaXem:(sp)=>{
            dispatch(actLuuSanPhamVuaXem(sp))
        }
    }
}


export default connect(null,mapDispatchToProps)(sanpham);
