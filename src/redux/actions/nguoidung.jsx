import * as types from '../constants/actionType'
export const actDangKy=(info)=>{
    return{
        type:types.DANG_KY,
        info
    }
}

export const actLuuTaiKhoan=(tk)=>{
    return{
        type:types.LUU_TAIKHOAN,
        tk
    }
}

export const actAdminDangNhap=()=>{
    return{
        type:types.ADMIN_LOGIN,
    }
}

export const actAdminLogOut=()=>{
    return{
        type:types.ADMIN_LOGIN,
    }
}

export const actUserLogin=(user)=>{
    return{
        type:types.USER_LOGIN,
        user
    }
}

export const actSetUserLogIn=()=>{
    return{
        type:types.IS_USER_LOGIN
    }
}

export const actUpdateTrangThaiUser=(MaTK)=>{
    return{
        type:types.USER_UPDATE_TRANGTHAI,
        MaTK
    }
}

export const actRecoverUser=(MaTK)=>{
    return{
        type:types.USER_RECOVER_TRANGTHAI,
        MaTK
    }
}

export const actSaveSelectedUser=(user)=>{
    return{
        type:types.USER_DUOCCHON,
        user
    }
}

export const actKiemTraDangKy=(email)=>{
    return{
        type:types.KIEM_TRA_DANG_KY,
        email
    }
}

export const actThemTaiKhoan=(tk)=>{
    return {
        type:types.THEM_TAI_KHOAN,
        tk
    }
}

export const actXoaUser=(maUser)=>{
    return {
        type:types.XOA_USER,
        maUser
    }
}

export const actUpdateUserInfo=(user)=>{
    return {
        type:types.UPDATE_USER,
        user
    }
}

export const actUpdateUserPassword=(email)=>{
    return{
        type:types.UPDATE_PASSWORD,
        email
    }
}

export const actTranferSTTOTP=(STT,OTP)=>{
    return{
        type:types.UPDATE_OTP,
        STT,
        OTP
    }
}

export const actUpdatePassWordUser=(USER)=>{
    return{
        type:types.UPDATE_PASSWORD_USER,
        USER
    }
}

//act luu thong tin nguoi dung 
export const actLuuThongTinNguoiDung=(user)=>{
    return{
        type:types.LUU_THONG_TIN_NGUOI_DUNG,
        user
    }
}

//act dang xuat nguoi dung 
export const actDangXuatNguoiDung = ()=>{
    return {
        type:types.DANG_XUAT_NGUOI_DUNG,
    }
}

//act cap nhat thong tin nguoi dung 
export const actCapNhatThongTin = (nguoiDung)=>{
    return{
        type:types.CAP_NHAT_THONG_TIN_NGUOI_DUNG,
        nguoiDung
    }
}