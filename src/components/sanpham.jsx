import React, { PureComponent } from 'react'
import { Button } from 'antd';
import { Card } from 'antd';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {actXemChiTiet} from '../redux/actions/sanpham';
class sanpham extends PureComponent {

    render() {
        let {MaSP,TenSP,Hinh,Gia} = this.props.sanPham;

        return (
            
                    <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src={Hinh} />}
                    >
                        <div className="wrapprice">
                            <span>{Gia}Đ</span>
                        </div>
                            <h3>{TenSP}</h3>
                        <Button onClick={()=>this.props.xemChiTiet(this.props.sanPham)}shape="round" size="large"><Link to={`/${MaSP}`}>Mua Ngay</Link></Button>
                        
                    </Card>
                
        )
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        xemChiTiet:(sp)=>{
            dispatch(actXemChiTiet(sp))
        }
    }
}


export default connect(null,mapDispatchToProps)(sanpham);
