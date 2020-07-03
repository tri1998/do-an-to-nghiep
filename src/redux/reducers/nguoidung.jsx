import {IS_USER_LOGIN,USER_LOGIN,DANG_KY,LUU_TAIKHOAN,THEM_TAI_KHOAN,ADMIN_LOGIN,ADMIN_LOGOUT} from '../constants/actionType';
const nguoiDungDefalut = {
    DSND:[],
    adminLogin:false,
    userLogin:{},
    isUserLogin:false
}

const nguoiDungReducer=(state=nguoiDungDefalut,action)=>{
    switch(action.type){
        case LUU_TAIKHOAN:{
            state.DSND=action.tk;
            return {...state};
        }
        case ADMIN_LOGIN:{
            state.adminLogin=!state.adminLogin;
            return{...state}
        }
        case ADMIN_LOGOUT:{
            state.adminLogin=!state.adminLogin;
            return{...state}
        }
        case USER_LOGIN:{
            state.userLogin=action.user;
            console.log(state.userLogin);
            return{...state}
        }
        case IS_USER_LOGIN:{
            state.isUserLogin=!state.isUserLogin;
            return{...state}
        }
        case DANG_KY:{
            let mangNguoiDungCapNhat = [...state.DSND];
            mangNguoiDungCapNhat.push(action.info);
            state.DSND=mangNguoiDungCapNhat;
            console.log(state.DSND)
            return {...state}
        }
        case THEM_TAI_KHOAN:{
            let mangNguoiDungCapNhat =state.DSND;
            mangNguoiDungCapNhat.push(action.tk);
            state.DSND=mangNguoiDungCapNhat;
            return {...state}
        }
        default: return {...state};
    }
}

export default nguoiDungReducer;