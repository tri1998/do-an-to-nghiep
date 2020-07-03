import {IS_USER_LOGIN,USER_LOGIN,DANG_KY,LUU_TAIKHOAN,KIEM_TRA_DANG_KY,THEM_TAI_KHOAN,ADMIN_LOGIN,ADMIN_LOGOUT} from '../constants/actionType'
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

export const actAdminDangNhap=()=>{
    return{
        type:ADMIN_LOGIN,
    }
}

export const actAdminLogOut=()=>{
    return{
        type:ADMIN_LOGIN,
    }
}

export const actUserLogin=(user)=>{
    return{
        type:USER_LOGIN,
        user
    }
}

export const actSetUserLogIn=()=>{
    return{
        type:IS_USER_LOGIN
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