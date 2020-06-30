import {DANG_KY,LUU_TAIKHOAN,THEM_TAI_KHOAN} from '../constants/actionType';
const nguoiDungDefalut = {
    DSND:[],
}

const nguoiDungReducer=(state=nguoiDungDefalut,action)=>{
    switch(action.type){
        case LUU_TAIKHOAN:{
            state.DSND=action.tk;
            return {...state};
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