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
} from 'antd';
import ChiTietBinhLuan from './ChiTietBinhLuan';
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





class BinhLuanSanPham extends Component {

    constructor(props) {
        super(props);
        this.state = {
            submitting: false,
            value: '',
            danhSachComments: [],
            maComment: null,
            dangPhanHoi: false,
            min:0,
            max:5
        }
    }

    componentDidMount() {
        //lay danh sach binh luan theo ma san pham
        let maSanPham = parseInt(this.props.maSanPham);
        axios({
            method: "GET",
            url: `http://localhost:${port}/api/binhluan/layDanhSachBinhLuan/${maSanPham}`
        })
        .then(res => {
            this.setState({
                danhSachComments: res.data
            });
        })
        .catch(err => console.log(err));


    }

    //BINH LUAN HERE
    handleSubmit = (nguoiDung) => {

      
            if (!this.state.value) {
                return;
            }

            let checkAdmin = sessionStorage.getItem('admintoken');
            let ThoiGian = moment().format('YYYY-MM-DD HH:mm:ss');
            const binhLuan = {
                MaTK: nguoiDung.MaTK,
                HoTen: nguoiDung.HoTen,
                MaSP: parseInt(this.props.maSanPham),
                NoiDung: this.state.value,
                ThoiGian: ThoiGian,
                TrangThai: 1
            }
            this.setState({
                danhSachComments: [...this.state.danhSachComments, binhLuan]
            })
            axios({
                method: "POST",
                url: `http://localhost:${port}/taikhoan/thembinhluan`,
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
    };

    themChiTietBinhLuan(maBinhLuan,nguoiDung){
            if (!this.state.valuesReply) {
                return;
            }
            let checkAdmin = sessionStorage.getItem('admintoken');
            let ThoiGian = moment().format('YYYY-MM-DD HH:mm:ss');
            const binhLuan = {
                MaBL:maBinhLuan,
                MaTK: nguoiDung.MaTK,
                HoTen: nguoiDung.HoTen,
                NoiDung: this.state.valuesReply,
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

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    handleChangeReply = e => {
        this.setState({
            valuesReply: e.target.value,
        });
    }

    //Xoa Binh Luan Danh Cho Admin HERE !
    xoaBinhLuan = (index) => {


        let mangBinhLuanCapNhat = this.state.danhSachComments;
        let viTri = mangBinhLuanCapNhat.findIndex(bl => bl.MaBL === index);
        mangBinhLuanCapNhat.splice(viTri, 1);
        this.setState({
            danhSachComments: mangBinhLuanCapNhat
        })
        axios({
            method: "POST",
            url: `http://localhost:${port}/taikhoan/xoabinhluan/${index}`,
            headers: {
                'Content-Type': 'application/json',
                'access-token': sessionStorage.getItem('admintoken')
            }
        })
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    //Khi xac nhan viec xoa binh luan cua admin
    confirm = (index) => {
        console.log(index);
        let mangBinhLuanCapNhat = this.state.danhSachComments;
        let viTri = mangBinhLuanCapNhat.findIndex(bl => bl.MaBL === index);
        mangBinhLuanCapNhat.splice(viTri, 1);
        this.setState({
            danhSachComments: mangBinhLuanCapNhat
        })
        axios({
            method: "POST",
            url: `http://localhost:${port}/taikhoan/xoabinhluan/${index}`,
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

    taiThemBinhLuan=()=>{
        let gioihan=this.state.danhSachComments.length;
        let max = this.state.max+5;
        max>gioihan
        ?this.setState({
            max:gioihan
        })
        :this.setState({
            max:max
        })
    }


    render() {
        const { submitting, value, danhSachComments, maComment, dangPhanHoi,min,max } = this.state;
        let nguoiDung = this.props.nguoiDungDangNhap;
        let adminOnline = sessionStorage.getItem('admintoken');
        let data = danhSachComments.length !== 0
            ? danhSachComments.slice(min,max).map((cmt, index) => {
                return {
                    actions: [
                        <span onClick={() => nguoiDung===null
                            ?message.error('Bạn chưa đăng nhập !')
                            : this.setState({
                            dangPhanHoi: true,
                            maComment: cmt.MaBL
                        })} key={`comment-list-reply-to-${index}`}>Phản hồi</span>,
                        adminOnline !== null
                            ? <Popconfirm
                                title="Bạn có muốn xóa bình luận này không ?"
                                onConfirm={() => this.confirm(cmt.MaBL)}
                                onCancel={this.cancel}
                                okText="Có"
                                cancelText="Không"
                            >
                                <span key={`comment-list-reply-to-${index}`}>Xóa</span>
                            </Popconfirm> : null,
                            maComment === cmt.MaBL
                            ? <span onClick={() => this.setState({
                                dangPhanHoi: false,
                                maComment: null
                            })} key={`comment-list-reply-to-${index}`}>Ẩn phản hồi</span>
                            : null

                    ],
                    author: <span style={{ color: cmt.MaTK === 'TK0' ? 'red' : null }}>{cmt.HoTen}</span>,
                    avatar: cmt.MaTK !== 'TK0' ? 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                        : 'https://res.cloudinary.com/dl9fnqrq3/image/upload/v1595492996/logo_mkwtqz.jpg',
                    content: (
                        <p>
                            {cmt.NoiDung}
                        </p>
                    ),
                    datetime: (
                        <span>
                            {
                                moment(cmt.ThoiGian).format('YYYY-MM-DD HH:mm:ss')
                            }
                        </span>
                    ),
                    children: (
                            maComment === cmt.MaBL 
                            ?<ChiTietBinhLuan 
                              maComment={maComment}
                              nguoiDung={nguoiDung}
                            /> 
                            : null
                    )
                }
            })
            : []
        return (
            <div>
                <List
                    key="listComments"
                    className="comment-list"
                    header={`${danhSachComments.length} bình luận`}
                    itemLayout="horizontal"
                    dataSource={data}
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

                {dangPhanHoi===false?<Comment
                    avatar={
                        <Avatar
                            src={adminOnline === null
                                ? "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                : 'https://res.cloudinary.com/dl9fnqrq3/image/upload/v1595492996/logo_mkwtqz.jpg'}
                            alt="Han Solo"
                        />
                    }
                    content={
                        <Editor
                            onChange={this.handleChange}
                            onSubmit={() => nguoiDung !== null ? this.handleSubmit(nguoiDung) : message.error('Bạn chưa đăng nhập !')}
                            submitting={submitting}
                            value={value}
                        />
                    }

                />:null}
                {this.state.max>=danhSachComments.length?null:<Button
                block
                onClick={this.taiThemBinhLuan}
                >
                  Tải thêm bình luận
                </Button>}
            </div>
        )
    }
}

const mapStateToProp = (state) => {
    return {
        nguoiDungDangNhap: state.DSND.UserInformation
    }
}


export default connect(mapStateToProp, null)(BinhLuanSanPham);
