import React, { PureComponent } from 'react'
import { Button } from 'antd';
import { Card } from 'antd';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {actLuuSanPhamVuaXem} from '../redux/actions/sanpham';
import axios from 'axios'
class sanpham extends PureComponent {
    constructor(props){
        super(props);
    }

    handleXemChiTiet=(sanPham)=>{
        this.props.luuSPVuaXem(sanPham);
    }

    render() {
        let {MaSP,TenSP,Hinh,Gia} = this.props.sanPham;
        let khuyenMai = this.props.mangKM.find(km=>km.MaSP===MaSP);
        let GiaGoc = Gia.toLocaleString('vn-VN', {style : 'currency', currency : 'VND'});
        let GiaKM = khuyenMai!==undefined?(Gia-Gia*(khuyenMai.PhanTram/100)):0;
        return (
                    <Link to={`/sanpham/${MaSP}`}>
                    <Card
                    hoverable
                    style={{ width: 260 }}
                    cover={
                    <img className="hinhSP" alt="example" src={Hinh} />
                    }
                    >
                        {
                            khuyenMai!==undefined
                            ?<div className="giamgia">
                                <div>-{khuyenMai.PhanTram}%</div>
                            </div>
                            :null    
                        }

                        <div className="wrapprice">
                            <div className={khuyenMai!==undefined?"giakhuyenmai":"giathuong"}>{GiaGoc}</div>
                            {
                                khuyenMai!==undefined
                                ?<div className="giathuong">{GiaKM.toLocaleString('vn-VN', {style : 'currency', currency : 'VND'})}</div>
                                :null
                            }
                        </div>

                        <div className="tenSP">
                            <h3 className="tenSPCenter">{TenSP}</h3>
                        </div>
                        <div className="btn_sp">
                            <Button
                            onClick={()=>this.handleXemChiTiet(this.props.sanPham)}
                            shape="round" size="large"
                            >
                                <Link to={`/sanpham/${MaSP}`}>Mua Ngay</Link>
                            </Button>
                        </div>
                        
                        
                    </Card>
                    </Link>
                
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        mangKM:state.DSCTKhuyenMai.mangChiTietKhuyenMai,
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        luuSPVuaXem:(sp)=>{
            dispatch(actLuuSanPhamVuaXem(sp))
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(sanpham);
