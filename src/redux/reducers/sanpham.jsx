import * as types from '../constants/actionType'
const stateDefault = {
    
    DanhSachSanPham:[],
    DanhSachLoaiSanPham:[],
    sanPhamDuocChon:{},
    sanPhamChonAdmin:{},
    sanPhamVuaXem:localStorage.getItem('sanphamvuaxem'),
    sanPhamTimKiem:[],
    sapXepSanPham:[]
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
            state.sapXepSanPham=action.mangSP;
            return {...state}
       }
       case types.SAP_XEP_SAN_PHAM_THEO_GIA:
       {
           if(action.option===1)
           {
               let mangCapNhat = [...state.sapXepSanPham];
               mangCapNhat=mangCapNhat.sort((sp,spTiepTheo)=>{
                   let tenSP = sp.TenSP.toLowerCase();
                   let tenSPTiepTheo=spTiepTheo.TenSP.toLowerCase();
                   if(tenSP<tenSPTiepTheo)
                   {
                       return -1;
                   }
                   if(tenSPTiepTheo > tenSP)
                   {
                       return 1;
                   }
                   return 0;
               })
               state.sapXepSanPham=mangCapNhat;
           }
           //Sap sep san pham theo theo Gia tang dan
           if(action.option===2)
           {
            let mangCapNhat = [...state.sapXepSanPham];
            mangCapNhat = mangCapNhat.sort((sp,spKeTiep)=>{
                return sp.Gia - spKeTiep.Gia;
            })
            state.sapXepSanPham = mangCapNhat;
           }
           if(action.option===3)
           {
            let mangCapNhat = [...state.sapXepSanPham];
            mangCapNhat = mangCapNhat.sort((sp,spKeTiep)=>{
                return spKeTiep.Gia - sp.Gia
            })
            state.sapXepSanPham = mangCapNhat;
           }
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
        //Cap nhat lai thong tin cho san pham
        case types.CAP_NHAT_SAN_PHAM:{
            let MaSP=action.sanPham.MaSP;
            let sanPham=action.sanPham;
            let mangSanPhamCapNhat = [...state.DanhSachSanPham];
            let viTriSPUpdate = mangSanPhamCapNhat.findIndex(sp=>sp.MaSP===MaSP);
            mangSanPhamCapNhat[viTriSPUpdate].MaDM=sanPham.MaDM;
            mangSanPhamCapNhat[viTriSPUpdate].MaHang=sanPham.MaHang;
            mangSanPhamCapNhat[viTriSPUpdate].TenSP=sanPham.TenSP;
            mangSanPhamCapNhat[viTriSPUpdate].Gia=sanPham.Gia;
            mangSanPhamCapNhat[viTriSPUpdate].SanPham_Moi=sanPham.SanPham_Moi;
            mangSanPhamCapNhat[viTriSPUpdate].Hinh=sanPham.Hinh;
            state.DanhSachSanPham=mangSanPhamCapNhat;
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
        case types.LUU_MANG_SAN_PHAM_CAN_TIM:{
            state.sanPhamTimKiem=action.mangSP;
            console.log(state.sanPhamTimKiem);
            return {...state}
        }
        case types.SUA_DANH_MUC:{
            let danhMuc = action.danhMuc;
            let mangDanhMucCapNhat = [...state.DanhSachLoaiSanPham];
            let viTriDM = mangDanhMucCapNhat.findIndex(dm=>dm.MaDM===action.maDM);
            mangDanhMucCapNhat[viTriDM].LoaiSP=danhMuc.LoaiSP;
            mangDanhMucCapNhat[viTriDM].LoaiSPurl=danhMuc.LoaiSPurl;
            state.DanhSachLoaiSanPham=mangDanhMucCapNhat;
            return{...state}
        }
       default:return{...state}
    }
}

export default sanPhamReducer;