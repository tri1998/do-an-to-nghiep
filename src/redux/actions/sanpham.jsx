import * as types from '../constants/actionType'

export const actXemChiTiet=(sp)=>{
    return{
        type:types.XEM_CHI_TIET,
        sp
    }
}

export const actLuuMangSP=(mangSP)=>{
    return{
        type:types.LUU_MANGSP,
        mangSP,
    }
}

export const actSapXepSanPhamTheoGia=(option,khuyenMai)=>{
    return{
        type:types.SAP_XEP_SAN_PHAM_THEO_GIA,
        option,
        khuyenMai
    }
}

export const actUpdateTrangThai=(MaSP)=>{
    return{
        type:types.UPDATE_SANPHAM_TRANGTHAI,
        MaSP
    }
}

export const actRecoverTrangThai=(MaSP)=>{
    return{
        type:types.RECOVER_SANPHAM_TRANGTHAI,
        MaSP
    }
}

export const actThemSanPham = (sanPham)=>{
    return {
        type:types.THEM_SAN_PHAM,
        sanPham
    }
}

export const actChonSanPhamCapNhat = (sanPham)=>{
    return {
        type:types.SAN_PHAM_DUOC_CHON,
        sanPham
    }
}

export const actLuuSanPhamVuaXem = (sanPham)=>{
    return {
        type:types.SAN_PHAM_VUA_XEM,
        sanPham
    }
}
//act cap nhat thong tin san pham admin 
export const actCapNhatThongTinSanPham=(sanPham)=>{
    return{
        type:types.CAP_NHAT_SAN_PHAM,
        sanPham
    }
}
//act luu mang danh muc san pham
export const actLuuMangDanhMucSanPham=(sanPham)=>{
    return {
        type:types.LUU_MANG_DANH_MUC_SAN_PHAM,
        sanPham
    }
}

//act xoa danh muc san pham 
export const actXoaDanhMucSanPham=(maDanhMuc)=>{
    return {
        type:types.XOA_DANH_MUC_SAN_PHAM,
        maDanhMuc
    }
}
//act khoi phuc danh muc san pham 
export const actPhucHoiDanhMucSP=(maDanhMuc)=>{
    return {
        type:types.PHUC_HOI_DANH_MUC_SAN_PHAM,
        maDanhMuc
    }
}
//act them danh muc san pham moi
export const actThemDanhMucSP=(danhMuc)=>{
    return{
        type:types.THEM_DANH_MUC_SAN_PHAM,
        danhMuc
    }
}

export const actLuuMangSanPhamCanTim=(mangSP)=>{
    return{
        type:types.LUU_MANG_SAN_PHAM_CAN_TIM,
        mangSP
    }
}
//act sua thong tin danh muc 
export const actSuaDanhMuc=(maDM,danhMuc)=>{
    return{
        type:types.SUA_DANH_MUC,
        maDM,
        danhMuc
    }
}