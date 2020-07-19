import * as types from '../constants/actionType'

export const actThemVaoGio=(sanPham)=>{
    return{
        type:types.THEM_VAO_GIO,
        sanPham
    }
}

export const actXoaSanPham=(maSanPham)=>{
    return{
        type:types.XOA_SAN_PHAM,
        maSanPham
    }
}

export const actThemSanPhamDaTonTai=(maSanPham,soLuong)=>{
    return{
        type:types.THEM_VAO_GIO_DA_CO_SAN_PHAM,
        maSanPham,
        soLuong
    }
}

export const actCapNhatSoLuongSanPham=(maSanPham,soLuong)=>{
    return{
        type:types.CAP_NHAT_SO_LUONG_SAN_PHAM,
        maSanPham,
        soLuong
    }
}