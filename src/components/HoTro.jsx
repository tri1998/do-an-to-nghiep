import React, { Component } from 'react'
import {Button,Result} from 'antd'
export default class HoTro extends Component {
    render() {
        return (
            <Result
                status="404"
                title="Hỗ Trợ"
                subTitle={
                <h3>
                    Quý khách có bât kì khiếu nại hay phản hồi, đánh giá về sản phẩm có 
                    thể gửi email trực tiếp đến địa chỉ email sau : 
                    <span style={{textDecoration:'underline'}}>
                        <i>tructiepgame@gmail.com</i>
                    </span><br/>
                    hoặc qua số điện thoại vào giờ hành chính : 0392921384
                </h3>
            }
                extra={<Button onClick={()=>this.props.history.push('/trangchu')} type="primary">Trang Chủ</Button>}
            />
        )
    }
}
