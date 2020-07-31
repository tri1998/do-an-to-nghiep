import * as types from '../constants/actionType';
export const actLuuMangChiTietKM=(mangCTKM)=>{
    return{
        type:types.LUU_CHI_TIET_KHUYEN_MAI,
        mangCTKM
    }
}

export const actLuuDanhSachDotKhuyenMai=(danhSachKM)=>{
    return {
        type:types.LUU_DANH_SACH_DOT_KHUYEN_MAI,
        danhSachKM
    }
}

export const actXoaChiTietKhuyenMai = (maSP)=>{
    return {
        type:types.XOA_CHI_TIET_KHUYEN_MAI,
        maSP
    }
}

export const actPhucHoiChiTietKhuyenMai = (maSP)=>{
    return {
        type:types.PHUC_HOI_CHI_TIET_KHUYEN_MAI,
        maSP
    }
}

export const actThemChiTietKhuyenMai = (khuyenMai)=>{
    return {
        type:types.THEM_CHI_TIET_KHUYEN_MAI,
        khuyenMai
    }
}

export const actCapNhatPhanTramKhuyenMai = (khuyenMai)=>{
    return {
        type:types.CAP_NHAT_PHAN_TRAM_KHUYEN_MAI,
        khuyenMai
    }
}

export const actXoaKhuyenMai = (maKhuyenMai)=>{
    return {
        type:types.XOA_KHUYEN_MAI,
        maKhuyenMai
    }
}

export const actPhucHoiKhuyenMai = (maKhuyenMai)=>{
    return {
        type:types.PHUC_HOI_KHUYEN_MAI,
        maKhuyenMai
    }
}

export const actThemDotKhuyenMai = (khuyenMai)=>{
    return {
        type:types.THEM_DOT_KHUYEN_MAI,
        khuyenMai
    }
}