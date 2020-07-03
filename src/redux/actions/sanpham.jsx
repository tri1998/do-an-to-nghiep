import {XEM_CHI_TIET,LUU_MANGSP} from '../constants/actionType'

export const actXemChiTiet=(sp)=>{
    return{
        type:XEM_CHI_TIET,
        sp
    }
}

export const actLuuMangSP=(mangSP)=>{
    return{
        type:LUU_MANGSP,
        mangSP
    }
}