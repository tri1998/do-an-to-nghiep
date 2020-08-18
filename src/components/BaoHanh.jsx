import React, { Component } from 'react'

export default class BaoHanh extends Component {
    render() {
        return (
            <div>
                <h1 style={{textAlign:'center'}} >QUI ĐỊNH BẢO HÀNH</h1>
                <div style={{padding:30}}>
                    <h3>Trong thời gian sử dụng nếu gặp bất kỳ trục trặc, lỗi sản phẩm nào. Khách hàng mang trực tiếp sản phẩm đến trung tâm bảo hành của hãng.</h3>
                    <h3 style={{fontWeight:'bold'}}>1. Điều kiện bảo hành hợp lệ: </h3>
                    <h3>
                        Sản phẩm còn nguyên vẹn, không bị nứt vỡ,
                        không bị biến dạng do tác động của ngoại lực.<br/>
                        Sản phẩm không có dấu hiệu bị ẩm, vô nước dẫn đến gây chạm mạch.<br/>
                        Sản phẩm phải còn nguyên vẹn thông tin S/N và tem của nhà phân phối 
                        còn nguyên vẹn với đầy đủ thông tin thời gian bảo hành.<br/>
                        Sản phẩm phải còn trong thời gian bảo hành.<br/>
                    </h3>
                    <h3 style={{fontWeight:'bold'}}>1. Điều kiện từ chối bảo hành: </h3>
                    <h3>
                        Sản phẩm bị hư do thiên tai, hỏa hoạn, lụt lội, sét đánh, côn trùng, động vật vào.<br/>
                        Sản phẩm được đặt nơi bụi bẩn, ẩm ướt, bị vào nước, bị thấm nước.<br/>
                        Sản phẩm bị biến dạng do tác động nhiệt, tác động bên ngoài.<br/>
                        Sản phẩm có vết mốc, rỉ sét hoặc bị ăn mòn, oxy hóa bởi hóa chất.<br/>
                        Sản phẩm bị hư do dùng sai điện thế và dòng điện chỉ định.<br/>
                        Khách hàng gây nên những khuyết tật như biến dạng, nứt vỡ, trầy xước.<br/>
                        Sản phẩm hết hạn bảo hành.<br/>
                    </h3>
                </div>
            </div>
        )
    }
}
