import * as types from '../constants/actionType'
const stateDefault = {
    
    DanhSachSanPham:[],
    sanPhamDuocChon:{},
    sanPhamChonAdmin:{},
    sanPhamVuaXem:localStorage.getItem('sanphamvuaxem')
}

const sanPhamReducer = (state=stateDefault,action)=>{
    switch(action.type){
        case types.XEM_CHI_TIET:
        {
                state.sanPhamDuocChon=action.sp;
                console.log(state.sanPhamDuocChon);
                return {...state};
       }
       case types.LUU_MANGSP:
       {
            state.DanhSachSanPham=action.mangSP;
            return {...state}
       }
       case types.UPDATE_SANPHAM_TRANGTHAI:{
           let mangSanPhamCapNhat = [...state.DanhSachSanPham];
           let viTri = mangSanPhamCapNhat.findIndex(sp=>sp.MaSP===action.MaSP);
           mangSanPhamCapNhat[viTri].TrangThai=0;
           state.DanhSachSanPham=mangSanPhamCapNhat;
           return {...state}
       }
       case types.RECOVER_SANPHAM_TRANGTHAI:{
            let mangSanPhamCapNhat = [...state.DanhSachSanPham];
            let viTri = mangSanPhamCapNhat.findIndex(sp=>sp.MaSP===action.MaSP);
            mangSanPhamCapNhat[viTri].TrangThai=1;
            state.DanhSachSanPham=mangSanPhamCapNhat;
            return {...state}
        }
        case types.THEM_SAN_PHAM:{
            let mangSanPhamCapNhat = [...state.DanhSachSanPham];
            mangSanPhamCapNhat.push(action.sanPham);
            state.DanhSachSanPham=mangSanPhamCapNhat;
            return {...state}
        }
        case types.SAN_PHAM_DUOC_CHON:{
            state.sanPhamChonAdmin = action.sanPham;
            console.log(state.sanPhamChonAdmin);
            return {...state}
        }
        case types.SAN_PHAM_VUA_XEM:{
            state.sanPhamVuaXem=action.sanPham;
            return {...state}
        }
       default:return{...state}
    }
}

export default sanPhamReducer;