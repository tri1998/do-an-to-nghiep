import {DANG_KY,LUU_TAIKHOAN,KIEM_TRA_DANG_KY,THEM_TAI_KHOAN} from '../constants/actionType'
export const actDangKy=(info)=>{
    return{
        type:DANG_KY,
        info
    }
}

export const actLuuTaiKhoan=(tk)=>{
    return{
        type:LUU_TAIKHOAN,
        tk
    }
}

export const actKiemTraDangKy=(email)=>{
    return{
        type:KIEM_TRA_DANG_KY,
        email
    }
}

export const actThemTaiKhoan=(tk)=>{
    return {
        type:THEM_TAI_KHOAN,
        tk
    }
}