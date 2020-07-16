import * as types from '../constants/actionType'
const stateDefault = {
    
    DanhSachSanPham:[],
    DanhSachLoaiSanPham:[],
    sanPhamDuocChon:{},
    sanPhamChonAdmin:{},
    sanPhamVuaXem:localStorage.getItem('sanphamvuaxem'),
    sanPhamTimKiem:[]
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
        case types.LUU_MANG_DANH_MUC_SAN_PHAM:{
            state.DanhSachLoaiSanPham=action.sanPham;
            console.log(state.DanhSachLoaiSanPham);
            return{...state}
        }
        case types.XOA_DANH_MUC_SAN_PHAM:{
            let mangCapNhat = [...state.DanhSachLoaiSanPham];
            let viTri = mangCapNhat.findIndex(danhMuc=>danhMuc.MaDM===action.maDanhMuc);
            mangCapNhat[viTri].TrangThai=0;
            state.DanhSachLoaiSanPham=mangCapNhat;
            return {...state}
        }
        case types.PHUC_HOI_DANH_MUC_SAN_PHAM:{
            let mangCapNhat = [...state.DanhSachLoaiSanPham];
            let viTri = mangCapNhat.findIndex(danhMuc=>danhMuc.MaDM===action.maDanhMuc);
            mangCapNhat[viTri].TrangThai=1;
            state.DanhSachLoaiSanPham=mangCapNhat;
            return {...state}
        }
        case types.THEM_DANH_MUC_SAN_PHAM:{
            let mangDanhMucCapNhat=[...state.DanhSachLoaiSanPham];
            mangDanhMucCapNhat.push(action.danhMuc);
            state.DanhSachLoaiSanPham=mangDanhMucCapNhat;
            return {...state}
        }
        case types.TIM_KIEM_SAN_PHAM:{
            state.sanPhamTimKiem=[];
            let sanPhamTimKiem = action.infoSP;
            let mangSanPham = [...state.DanhSachSanPham];
            sanPhamTimKiem= parseInt(sanPhamTimKiem);
            mangSanPham.map((sp,index)=>{
                return sp.Gia>=sanPhamTimKiem?state.sanPhamTimKiem.push(sp):sp
            })
            console.log(state.sanPhamTimKiem);
            return {...state}
        }
       default:return{...state}
    }
}

export default sanPhamReducer;