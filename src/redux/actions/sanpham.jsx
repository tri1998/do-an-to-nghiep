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
        mangSP
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