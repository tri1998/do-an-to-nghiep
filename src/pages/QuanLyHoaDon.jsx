import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Table,
    Space,
    Button,
    Modal,
    Input,
    Tooltip
} from 'antd';
import {
    CloseOutlined,
    RedoOutlined,
    CheckOutlined,
    SearchOutlined,
    FileSearchOutlined
} from '@ant-design/icons';
import {
    actUpdateTrangThaiHD,
     actUpdateTrangThaiTT1,
      actUpdateTrangThaiTT0,
       actRecoverTrangThai,
        actUpdateTrangThaiGH1,
         actUpdateTrangThaiGH2,
          actUpdateTrangThaiGH3,
          actLuuMangHD
} from '../redux/actions/hoadon';
import ChiTietHoaDon from '../components/ChiTietHoaDon';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment'
import { port } from '../config/configAPI';
import { Switch } from 'antd';

class QuanLyHoaDon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            MaHD:0,
        };
    }

    showModal = (MaHD) => {
        console.log(MaHD);
        this.setState({
          visible: true,
          MaHD:MaHD
        });
      };
    
    handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    
    handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
    };

    componentDidMount() {
        axios({
            method: 'GET',
            url: `http://localhost:${port}/api/hoadon`
        }).then(res => {
            this.props.onSaveDSHoaDon(res.data);
        })
            .catch(error => console.log(error));
    }



    //Cap nhat trang thai san pham
    xoaHoaDon = (MaHD) => {
        Swal.fire({
            title: 'Xóa hóa đơn ',
            text: 'Bạn có muốn xóa đơn hàng này ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.value) {
                axios({
                    method: 'PUT',
                    url: `http://localhost:${port}/api/hoadon/capnhatHD/${MaHD}`
                })
                    .then(res => this.props.updateTrangThaiHD(MaHD))
                    .catch(error => console.log(error));
                Swal.fire(
                    'Đã Xóa',
                    'Đơn hàng này đã được xóa !',
                    'success'
                )

            }
        })
    }

    phucHoiHoaDon = (MaHD) => {
        Swal.fire({
            title: 'Phục Hồi Đơn Hàng ',
            text: 'Bạn có muốn phục hồi đơn hàng này ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.value) {
                axios({
                    method: 'PUT',
                    url: `http://localhost:${port}/api/hoadon/phuchoihoadon/${MaHD}`,
                })
                    .then(res => this.props.recoverTrangThai(MaHD))
                    .catch(error => console.log(error));
                Swal.fire(
                    'Đã Phục Hồi',
                    'Đơn hàng này đã được phục hồi  !',
                    'success'
                )

            }
        })

    }

    onXacNhanTT = (MaHD) => {
        Swal.fire({
            title: 'Trạng thái thanh toán ',
            text: 'Bạn có muốn điều chỉnh trạng thái thanh toán của đơn hàng này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.value) {


                axios({
                    method: 'PUT',
                    url: `http://localhost:${port}/api/hoadon/capnhatTTThanhtoan0/${MaHD}`
                })
                    .then(res => this.props.updateTrangThaiTT0(MaHD))
                    .catch(error => console.log(error));
                Swal.fire(
                    'Điều chỉnh thành công',
                    'Đơn hàng này chưa thanh  toán !',
                    'success'
                )
            }
        })
    }
    onHuyTT = (MaHD) => {
        Swal.fire({
            title: 'Trạng thái thanh toán ',
            text: 'Bạn có muốn điều chỉnh trạng thái thanh toán của đơn hàng này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.value) {
                axios({
                    method: 'PUT',
                    url: `http://localhost:${port}/api/hoadon/capnhatTTThanhtoan1/${MaHD}`
                })
                    .then(res => this.props.updateTrangThaiTT1(MaHD))
                    .catch(error => console.log(error));
                Swal.fire(
                    'Điều chỉnh thành công',
                    'Đơn hàng này đã thanh toán !',
                    'success'
                )
            }
        })
    }
    onUpdateGH1 = (MaHD) => {
        Swal.fire({
            title: 'Trạng thái giao hàng ',
            text: 'Bạn có muốn điều chỉnh trạng thái thanh toán của đơn hàng này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.value) {
                axios({
                    method: 'PUT',
                    url: `http://localhost:${port}/api/hoadon/capnhatTTGiaoHang1/${MaHD}`
                })
                    .then(res => this.props.updateGH1(MaHD))
                    .catch(error => console.log(error));
                Swal.fire(
                    'Đơn hàng đã chuyển đến kho vận chuyển',
                    'Đơn hàng đã chuyển đến kho vận chuyển !',
                    'success'
                )
            }
        })
    }
    onUpdateGH2 = (MaHD) => {
        Swal.fire({
            title: 'Trạng thái giao hàng ',
            text: 'Bạn có muốn điều chỉnh trạng thái thanh toán của đơn hàng này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.value) {
                axios({
                    method: 'PUT',
                    url: `http://localhost:${port}/api/hoadon/capnhatTTGiaoHang2/${MaHD}`
                })
                    .then(res => this.props.updateGH2(MaHD))
                    .catch(error => console.log(error));
                Swal.fire(
                    'Đơn hàng đã chuyển đến tay khách hàng',
                    'Đơn hàng đã chuyển đến tay khách hàng !',
                    'success'
                )
            }
        })
    }
    onUpdateGH3 = (MaHD) => {
        Swal.fire({
            title: 'Trạng thái giao hàng ',
            text: 'Bạn có muốn điều chỉnh trạng thái thanh toán của đơn hàng này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.value) {
                axios({
                    method: 'PUT',
                    url: `http://localhost:${port}/api/hoadon/capnhatTTGiaoHang3/${MaHD}`
                })
                    .then(res => this.props.updateGH3(MaHD))
                    .catch(error => console.log(error));
                Swal.fire(
                    'Đơn hàng đã chuyển đến tay khách hàng',
                    'Đơn hàng đã chuyển đến tay khách hàng !',
                    'success'
                )
            }
        })
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Tìm ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                Reset
              </Button>
            </Space>
          </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
          record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
        render: text =>
          this.state.searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[this.state.searchText]}
              autoEscape
              textToHighlight={text.toString()}
            />
          ) : (
            text
          ),
      });
    
      handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
          searchText: selectedKeys[0],
          searchedColumn: dataIndex,
        });
      };
    
      handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
      };



    columns = [
        {
            title: 'Mã hóa đơn',
            dataIndex: 'MaHD',
            key: 'MaHD',
            ...this.getColumnSearchProps('MaHD')
        },
        {
            title: 'Người mua hàng',
            dataIndex: 'HoTen',
            key: 'HoTen',
            ...this.getColumnSearchProps('HoTen')
        },
        {
            title: 'Ngày lập HĐ',
            dataIndex: 'NgayLapHD',
            key: 'NgayLapHD',
            render:(record)=>(
            <span>{moment(record).format('DD-MM-YYYY HH:mm:ss')}</span>
            )
        },
        {
            align: 'center',
            title: 'Thanh toán',

            key: 'TrangThai_TT',
            ...this.getColumnSearchProps('TrangThai_TT'),

            render: (record) => (
                <div className="temp">
                    <div>
                        {record.TrangThai_TT === 1 ? <Switch
                            disabled={record.TrangThai_GH===2?true:false}
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            checked={record.TrangThai_TT === 1 ? true : false}
                            onClick={() => this.onXacNhanTT(record.MaHD)}
                        /> : <Switch
                                disabled={record.TrangThai_GH===2?true:false}
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                                checked={record.TrangThai_TT === 1 ? true : false}
                                onClick={() => this.onHuyTT(record.MaHD)}
                            />}
                    </div>

                    {record.TrangThai_TT === 1 ? <h4 className="trangthaitrue">Đã thanh toán</h4> : <h4 className="trangthaifalse">Chưa thanh toán</h4>}
                </div>
            )
        },
        
        {
            align: 'center',
            title: 'Giao hàng',
            key: 'TrangThai_GH',
            render: (record) => (
                record.TrangThai_GH!=2?(record.PhuongThucTT>1?(record.TrangThai_TT===1?<Space>
                    <Button disabled={true} type="primary" danger>Chưa Giao</Button>
                    <Button disabled={record.TrangThai_GH>=1?true:false} onClick={()=>this.onUpdateGH1(record.MaHD)} type="primary" >Đang Giao</Button>
                    <Button onClick={()=>this.onUpdateGH2(record.MaHD)} disabled={record.TrangThai_GH>1?true:false} hidden={record.TrangThai_GH===0?true:false}   type="primary" className="styleDG">Đã Giao</Button>
               </Space>:''):<Space>
                  <Button disabled={true} type="primary" danger>Chưa Giao</Button>
                  <Button disabled={record.TrangThai_GH>=1?true:false} onClick={()=>this.onUpdateGH1(record.MaHD)} type="primary" >Đang Giao</Button>
                  <Button onClick={()=>this.onUpdateGH3(record.MaHD)} disabled={record.TrangThai_GH>1?true:false} hidden={record.TrangThai_GH===0?true:false}   type="primary" className="styleDG">Đã Giao</Button>
             </Space>):<h2 style={{color:'lightblue'}}>Hoàn tất !</h2>
            )
        },
        {
            title: 'Thao Tác',
            key: 'ThaoTac',
            render: (record) => (

                <Space>
                    <Button
                        disabled={record.TrangThai_TT === 1 ? true : false}
                        hidden={record.TrangThai === 1 ? false : true}
                        onClick={() => this.xoaHoaDon(record.MaHD)}
                        type="primary" danger
                    >
                        <CloseOutlined />
                    </Button>
                    {record.TrangThai === 0 ?
                        <Button
                            type="default" danger
                            onClick={() => this.phucHoiHoaDon(record.MaHD)}
                        >
                            <RedoOutlined />
                        </Button>
                        : null}

                    <Tooltip title="Xem hóa đơn">
                        <Button
                            type="primary"
                            onClick={()=>this.showModal(record.MaHD)}
                        ><FileSearchOutlined /></Button>
                    </Tooltip>
                    

                </Space>
            )
        }
    ];
    render() {
        let data = this.props.DanhSachHoaDon;
        const {MaHD} = this.state;
        return (
            <div>
                <Modal
                title={`CHI TIẾT HÓA ĐƠN : ${MaHD} `}
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                destroyOnClose={true}
                >
                    <ChiTietHoaDon MaHD={MaHD}></ChiTietHoaDon>
                </Modal>

                <Table
                    rowClassName={record => record.TrangThai === 0 ? "disableRow" : ""}
                    dataSource={data}
                    columns={this.columns}
                    rowKey={record => record.MaHD}
                >
                </Table>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        DanhSachHoaDon: state.DSHoaDon.DSHD,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSaveDSHoaDon:(danhsachmanghoadon)=>{
            dispatch(actLuuMangHD(danhsachmanghoadon))
        },
        updateTrangThaiHD: (MaHD) => {
            dispatch(actUpdateTrangThaiHD(MaHD));
        },
        updateTrangThaiTT1: (MaHD) => {
            dispatch(actUpdateTrangThaiTT1(MaHD));
        },
        updateTrangThaiTT0: (MaHD) => {
            dispatch(actUpdateTrangThaiTT0(MaHD));
        },
        recoverTrangThai: (MaHD) => {
            dispatch(actRecoverTrangThai(MaHD))
        },
        updateGH1: (MaHD) => {
            dispatch(actUpdateTrangThaiGH1(MaHD))
        },
        updateGH2: (MaHD) => {
            dispatch(actUpdateTrangThaiGH2(MaHD))
        },
        updateGH3: (MaHD) => {
            dispatch(actUpdateTrangThaiGH3(MaHD))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(QuanLyHoaDon);