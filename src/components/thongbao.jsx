import React, { Component } from 'react'
import { Spin,Table,Button } from 'antd';
import {actTranferSTTOTP} from '../redux/actions/nguoidung'
import {connect} from 'react-redux'
var randomString = require('randomstring');

class thongbao extends Component {

    onRandom=(STT)=>{
        var OTP = randomString.generate(7);
        console.log(OTP);
        this.props.dispatchOTP(STT,OTP)
    }

    columns = [
        {
            title: 'STT',
            dataIndex: 'STT',
            key: 'STT',
        },
        {
          title: 'Email',
          dataIndex: 'Email',
          key: 'Email',
        },
        {
          title: 'Tên Yêu Cầu',
          dataIndex: 'YeuCau',
          key: 'YeuCau',
        },
        {
            title: 'Mã Xác Thực',
            dataIndex: 'OTP',
            key: 'OTP',
          },
        {
          title: 'Thao Tác',
          key: 'action',
          render:(text,record)=>(
              <Button onClick={()=>this.onRandom(record.STT)} type="primary">Lấy Mã Xác Thực</Button>
          )
        },
      ];


    render() {
        let data = this.props.mangUserUpdatePassword;
        return (
            <div>
                <Table rowKey={record=>record.STT} dataSource={data} columns={this.columns} />
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        mangUserUpdatePassword:state.DSND.userUpdatePassword
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        dispatchOTP:(stt,otp)=>{
            dispatch(actTranferSTTOTP(stt,otp));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(thongbao)
