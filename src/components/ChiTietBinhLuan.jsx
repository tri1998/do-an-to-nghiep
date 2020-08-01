import React, { Component } from 'react'
import {
    Input,
    Select,
    Button,
    Comment,
    Avatar,
    List,
    Form,
    Popconfirm,
    message
} from 'antd'
import { connect } from 'react-redux';
import moment from 'moment';
import { port } from '../config/configAPI';
import axios from 'axios';

const { Option } = Select;
const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, value }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" onClick={onSubmit} type="primary">
                Thêm bình luận
        </Button>
        </Form.Item>
    </>
);

export default class ChiTietBinhLuan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            danhSachRepliedComments: [],
        }
    }

    componentDidMount(){
        //lay danh sach chi tiet binh luan theo ma binh luan
        let maComment = this.props.maComment;
        axios({
            method: "GET",
            url: `http://localhost:${port}/api/binhluan/layDanhSachCTBinhLuan/${maComment}`
        })
        .then(res => {
            this.setState({
                danhSachRepliedComments: res.data
            });
        })
        .catch(err => console.log(err));
    }

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };


    themChiTietBinhLuan(maBinhLuan,nguoiDung){
        if (!this.state.value) {
            return;
        }
        let checkAdmin = sessionStorage.getItem('admintoken');
        let ThoiGian = moment().format('YYYY-MM-DD HH:mm:ss');
        const binhLuan = {
            MaBL:maBinhLuan,
            MaTK: nguoiDung.MaTK,
            HoTen: nguoiDung.HoTen,
            NoiDung: this.state.value,
            ThoiGian: ThoiGian,
            TrangThai: 1
        }
        console.log(binhLuan);
        this.setState({
            danhSachRepliedComments: [...this.state.danhSachRepliedComments, binhLuan]
        })
        axios({
            method: "POST",
            url: `http://localhost:${port}/taikhoan/themchitietbinhluan`,
            headers: {
                'Content-Type': 'application/json',
                'access-token': checkAdmin === null
                    ? sessionStorage.getItem('usertoken')
                    : sessionStorage.getItem('admintoken')
            },
            data: binhLuan
        })
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }

    confirm = (index) => {
        console.log(index);
        let mangBinhLuanCapNhat = this.state.danhSachRepliedComments;
        let viTri = mangBinhLuanCapNhat.findIndex(bl => bl.CTBL === index);
        mangBinhLuanCapNhat.splice(viTri, 1);
        this.setState({
            danhSachRepliedComments: mangBinhLuanCapNhat
        })
        axios({
            method: "POST",
            url: `http://localhost:${port}/taikhoan/xoachitietbinhluan/${index}`,
            headers: {
                'Content-Type': 'application/json',
                'access-token': sessionStorage.getItem('admintoken')
            }
        })
        .then(res => message.success('xóa thành công !'))
        .catch(err => console.log(err))
    }

    cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    }
    render() {
        const {danhSachRepliedComments,value} = this.state;
        let maComment = this.props.maComment;
        let nguoiDung = this.props.nguoiDung;
        let adminOnline = sessionStorage.getItem('admintoken');
        let repliedData = danhSachRepliedComments.length === 0 ? []
            : danhSachRepliedComments.map((repliedcmt, index) => {
                return {
                    actions: [
                        adminOnline !== null
                        ?<Popconfirm
                            title="Bạn có muốn xóa bình luận này không ?"
                            onConfirm={() => this.confirm(repliedcmt.MaCTBL)}
                            onCancel={this.cancel}
                            okText="Có"
                            cancelText="Không"
                        >
                            <span key={`comment-list-reply-to-${index}`}>Xóa</span>
                        </Popconfirm> : null
                    ],
                    author: <span style={{ color: repliedcmt.MaTK === 'TK0' ? 'red' : null }}>{repliedcmt.HoTen}</span>,
                    avatar: repliedcmt.MaTK !== 'TK0' ? 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                        : 'https://res.cloudinary.com/dl9fnqrq3/image/upload/v1595492996/logo_mkwtqz.jpg',
                    content: (
                        <p>
                            {repliedcmt.NoiDung}
                        </p>
                    ),
                    datetime: (
                        <span>
                            {
                                moment(repliedcmt.ThoiGian).format('YYYY-MM-DD HH:mm:ss')
                            }
                        </span>
                    ),
                }
            })
        return (
            <div>
                <List
                            key="listComments"
                            className="comment-list"
                            header={`${repliedData.length} phản hồi`}
                            itemLayout="horizontal"
                            dataSource={repliedData}
                            renderItem={item => (
                                <li>
                                    <Comment
                                        actions={item.actions}
                                        author={item.author}
                                        avatar={item.avatar}
                                        content={item.content}
                                        datetime={item.datetime}
                                        children={item.children}
                                    >
                                    </Comment>
                                </li>
                            )}
                        />
                            <Comment
                                avatar={
                                    <Avatar
                                        src={adminOnline === null
                                            ? "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                            : 'https://res.cloudinary.com/dl9fnqrq3/image/upload/v1595404236/img/logo_klzcmr.jpg'}
                                        alt="Han Solo"
                                    />
                                }
                                content={
                                    <Editor
                                        onChange={this.handleChange}
                                        onSubmit={()=>nguoiDung !== null ? this.themChiTietBinhLuan(maComment,nguoiDung):this.p}
                                        value={value}
                                    />
                                }

                            />
            </div>
        )
    }
}
