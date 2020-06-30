import {LUU_MANGSP,XEM_CHI_TIET}from '../constants/actionType'
const stateDefault = {
    
    DanhSachSanPham:[],

    sanPhamDuocChon:{}
}

const sanPhamReducer = (state=stateDefault,action)=>{
    switch(action.type){
        case XEM_CHI_TIET:
        {
                state.sanPhamDuocChon=action.sp;
                console.log(state.sanPhamDuocChon);
                return {...state};
       }
       case LUU_MANGSP:
       {
            state.DanhSachSanPham=action.mangSP;
            return {...state}
       }
       default:return{...state}
    }
}

export default sanPhamReducer;