import * as types from '../constants/actionType'

export const actThemVaoGio=(sanPham)=>{
    return{
        type:types.THEM_VAO_GIO,
        sanPham
    }
}

export const actXoaSanPham=(maSanPham,maKichThuoc)=>{
    return{
        type:types.XOA_SAN_PHAM,
        maSanPham,
        maKichThuoc
    }
}

export const actThemSanPhamDaTonTai=(maSanPham,soLuong,kichThuoc)=>{
    return{
        type:types.THEM_VAO_GIO_DA_CO_SAN_PHAM,
        maSanPham,
        soLuong,
        kichThuoc
    }
}

export const actCapNhatSoLuongSanPham=(maSanPham,soLuong,kichThuoc)=>{
    return{
        type:types.CAP_NHAT_SO_LUONG_SAN_PHAM,
        maSanPham,
        soLuong,
        kichThuoc
    }
}

export const actXoaGioHang = ()=>{
    return {
        type:types.XOA_GIO_HANG
    }
}