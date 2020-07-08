import * as types from '../constants/actionType';
const nguoiDungDefault = {
    DSND:[],
    adminLogin:false,
    userLogin:{},
    isUserLogin:false,
    userDuocChon:{}
}

const nguoiDungReducer=(state=nguoiDungDefault,action)=>{
    switch(action.type){
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
        case  types.DANG_KY:{
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
        default: return {...state};
    }
}

export default nguoiDungReducer;