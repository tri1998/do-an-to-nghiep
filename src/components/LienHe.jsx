import React, { Component } from 'react'
import { Result, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
export default class LienHe extends Component {
    render() {
        return (
            <div>
                <Result
                    icon={<SmileOutlined />}
                    title="Mọi thắc mắc xin quý khách liên hệ 0392921384 để được giải đáp !"
                    extra={<Button onClick={()=>this.props.history.push('/trangchu')} type="primary">Về trang chủ</Button>}
                />
            </div>
        )
    }
}
