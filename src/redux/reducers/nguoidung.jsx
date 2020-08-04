import * as types from '../constants/actionType';
const nguoiDungDefault = {
    DSND:[],
    adminLogin:false,
    userLogin:{},
    isUserLogin:false,
    userDuocChon:{},
    userUpdatePassword:[],
    UserInformation:JSON.parse(sessionStorage.getItem('userinfo'))
    
}

const nguoiDungReducer=(state=nguoiDungDefault,action)=>{
    switch(action.type){
        //Luu thong tin nguoi dung sau khi dang nhap jwt
        case types.LUU_THONG_TIN_NGUOI_DUNG:{
            state.UserInformation = action.user;
            return {...state};
        }
        //Dang xuat nguoi dung 
        case types.DANG_XUAT_NGUOI_DUNG:{
            sessionStorage.removeItem('admintoken');
            sessionStorage.removeItem('userinfo');
            sessionStorage.removeItem('usertoken');
            state.UserInformation=null;
            return {...state};
        }
        //Cap nhat thong tin nguoi dung dang nhap
        case types.CAP_NHAT_THONG_TIN_NGUOI_DUNG:{
            let nguoiDung = action.nguoiDung;
            let nguoiDungCapNhat = {...state.UserInformation};
            nguoiDungCapNhat.HoTen = nguoiDung.HoTen;
            nguoiDungCapNhat.SDT=nguoiDung.SDT;
            nguoiDungCapNhat.DiaChi=nguoiDung.DiaChi;
            state.UserInformation = nguoiDungCapNhat;
            sessionStorage.setItem('userinfo',JSON.stringify(state.UserInformation));
            return {...state};
        }

        case types.LUU_TAIKHOAN:{
            state.DSND=action.tk;
            return {...state};
        }
        case types.ADMIN_LOGIN:{
            state.adminLogin=!state.adminLogin;
            return{...state}
        }
        case types.ADMIN_LOGOUT:{
            state.adminLogin=!state.adminLogin;
            return{...state}
        }
        case  types.USER_LOGIN:{
            state.userLogin=action.user;
            console.log(state.userLogin);
            return{...state}
        }
        case  types.IS_USER_LOGIN:{
            state.isUserLogin=!state.isUserLogin;
            return{...state}
        }
        case  types.USER_UPDATE_TRANGTHAI:{
            let mangNguoiDungCapNhat=[...state.DSND];
            let index = mangNguoiDungCapNhat.findIndex(nguoidung=>nguoidung.MaTK===action.MaTK);
            mangNguoiDungCapNhat[index].TrangThai=0;
            state.DSND=mangNguoiDungCapNhat;
            return {...state}
        }
        case  types.USER_RECOVER_TRANGTHAI:{
            let mangNguoiDungCapNhat=[...state.DSND];
            let index = mangNguoiDungCapNhat.findIndex(nguoidung=>nguoidung.MaTK===action.MaTK);
            mangNguoiDungCapNhat[index].TrangThai=1;
            state.DSND=mangNguoiDungCapNhat;
            return {...state}
        }
        case types.UPDATE_USER:{
            let mangNguoiDungCapNhat=[...state.DSND];
            let user = action.user;
            let viTri=mangNguoiDungCapNhat.findIndex(nguoidung=>nguoidung.MaTK===user.MaTK)
            mangNguoiDungCapNhat[viTri].HoTen=user.HoTen;
            mangNguoiDungCapNhat[viTri].DiaChi=user.DiaChi;
            mangNguoiDungCapNhat[viTri].SDT=user.SoDienThoai;
            mangNguoiDungCapNhat[viTri].MatKhau=user.MatKhau;
            state.DSND=mangNguoiDungCapNhat;
            return {...state}
        }
        case types.USER_DUOCCHON:{
            state.userDuocChon=action.user;
            console.log(state.userDuocChon);
            return {...state}
        }
        case types.DANG_KY:{
            let mangNguoiDungCapNhat = [...state.DSND];
            mangNguoiDungCapNhat.push(action.info);
            state.DSND=mangNguoiDungCapNhat;
            console.log(state.DSND)
            return {...state}
        }
        case  types.THEM_TAI_KHOAN:{
            let mangNguoiDungCapNhat =state.DSND;
            mangNguoiDungCapNhat.push(action.tk);
            state.DSND=mangNguoiDungCapNhat;
            return {...state}
        }
        case types.UPDATE_PASSWORD:{
            let mangCapNhat = [...state.userUpdatePassword];
            mangCapNhat.push(action.email);
            state.userUpdatePassword=mangCapNhat;
            return {...state};
        }
        case types.UPDATE_OTP:{
            let mangCapNhat = [...state.userUpdatePassword];
            let index = mangCapNhat.findIndex(user=>user.STT===action.STT);
            mangCapNhat[index].OTP=action.OTP;
            state.userUpdatePassword=mangCapNhat;
            console.log(state.userUpdatePassword);
            return {...state}
        }
        case types.UPDATE_PASSWORD_USER:{
            let mangCapNhat = [...state.DSND];
            let index = mangCapNhat.findIndex(user=>user.Email===action.USER.Email)
            mangCapNhat[index].MatKhau=action.USER.password1;
            state.DSND=mangCapNhat;
            return {...state}
        }
        default: return {...state};
    }
}

export default nguoiDungReducer;