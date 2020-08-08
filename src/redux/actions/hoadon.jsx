import * as types from '../constants/actionType'

export const actThemHoaDon=(hd)=>{
    return{
        type:types.THEM_HD,
        hd
    }
}
export const actLuuMangHD=(hd)=>{
    return{
        type:types.LUU_HOADON,
        hd
    }
}
export const actUpdateTrangThaiHD=(hd)=>{
    return{
        type:types.UPDATE_HOADON_TRANGTHAI,
        hd
    }
}
export const actUpdateTrangThaiTT1=(hd)=>{
    return{
        type:types.UPDATE_HOADON_THANHTOAN1,
        hd
    }
}
export const actUpdateTrangThaiTT0=(hd)=>{
    return{
        type:types.UPDATE_HOADON_THANHTOAN0,
        hd
    }
}
export const actRecoverTrangThai=(hd)=>{
    return{
        type:types.RECOVER_HOADON_TRANGTHAI,
        hd
    }
}
export const actUpdateTrangThaiGH1=(hd)=>{
    return{
        type:types.UPDATE_HOADON_GIAOHANG1,
        hd
    }
}
export const actUpdateTrangThaiGH2=(hd)=>{
    return{
        type:types.UPDATE_HOADON_GIAOHANG2,
        hd
    }
}
export const actUpdateTrangThaiGH3=(hd)=>{
    return{
        type:types.UPDATE_HOADON_GIAOHANG3,
        hd
    }
}


