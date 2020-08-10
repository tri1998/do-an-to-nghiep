import * as types from '../constants/actionType';
const stateDefault = {
    DSHD:[],
}

const hoaDonReducer=(state=stateDefault,action)=>{
    switch(action.type){
        case types.LUU_HOADON:{
            state.DSHD=action.hd;
            return {...state};
        }
        case types.THEM_HD:{
            let mangHoaDoncapnhat=[...state.DSHD];
            mangHoaDoncapnhat.push(action.hd)
            state.DSHD=mangHoaDoncapnhat;
            return {...state};
        }
        case types.UPDATE_HOADON_TRANGTHAI:{
            let mangHoaDonCapNhat = [...state.DSHD];
            let viTri = mangHoaDonCapNhat.findIndex(hd=>hd.MaHD===action.hd);
            mangHoaDonCapNhat[viTri].TrangThai=0;
            state.DSHD=mangHoaDonCapNhat;
            return {...state}
        }
        case types.UPDATE_HOADON_THANHTOAN1:{
            let mangHoaDonCapNhat = [...state.DSHD];
            let viTri = mangHoaDonCapNhat.findIndex(hd=>hd.MaHD===action.hd);
            mangHoaDonCapNhat[viTri].TrangThai_TT=1;
            state.DSHD=mangHoaDonCapNhat;
            return {...state}
        }
        case types.UPDATE_HOADON_THANHTOAN0:{
            let mangHoaDonCapNhat = [...state.DSHD];
            let viTri = mangHoaDonCapNhat.findIndex(hd=>hd.MaHD===action.hd);
            mangHoaDonCapNhat[viTri].TrangThai_TT = 0;
            state.DSHD=mangHoaDonCapNhat;
            return {...state}
        }
        case types.RECOVER_HOADON_TRANGTHAI:{
            let mangHoaDonCapNhat = [...state.DSHD];
            let viTri = mangHoaDonCapNhat.findIndex(hd=>hd.MaHD===action.hd);
            mangHoaDonCapNhat[viTri].TrangThai=1;
            state.DSHD=mangHoaDonCapNhat;
            return {...state}
        }
        case types.UPDATE_HOADON_GIAOHANG1:{
            let mangHoaDonCapNhat = [...state.DSHD];
            let viTri = mangHoaDonCapNhat.findIndex(hd=>hd.MaHD===action.hd);
            mangHoaDonCapNhat[viTri].TrangThai_GH = 1;
            state.DSHD=mangHoaDonCapNhat;
            return {...state}
        }
        case types.UPDATE_HOADON_GIAOHANG2:{
            let mangHoaDonCapNhat = [...state.DSHD];
            let viTri = mangHoaDonCapNhat.findIndex(hd=>hd.MaHD===action.hd);
            mangHoaDonCapNhat[viTri].TrangThai_GH = 2;
            state.DSHD=mangHoaDonCapNhat;
            return {...state}
        }
        case types.UPDATE_HOADON_GIAOHANG3:{
            let mangHoaDonCapNhat = [...state.DSHD];
            let viTri = mangHoaDonCapNhat.findIndex(hd=>hd.MaHD===action.hd);
            mangHoaDonCapNhat[viTri].TrangThai_GH = 2;
            mangHoaDonCapNhat[viTri].TrangThai_TT=1;
            state.DSHD=mangHoaDonCapNhat;
            return {...state}
        }
        
        default: return {...state};
}
}
export default hoaDonReducer;