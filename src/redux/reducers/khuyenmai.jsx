import * as types from '../constants/actionType';
const stateDefault = {
    mangChiTietKhuyenMai:[],
    danhSachKM:[]
}

const khuyenMaiReducer=(state=stateDefault,action)=>{
    switch(action.type){
        case types.LUU_CHI_TIET_KHUYEN_MAI:{
            state.mangChiTietKhuyenMai=action.mangCTKM;
            return {...state}
        }
        case types.LUU_DANH_SACH_DOT_KHUYEN_MAI:{
            action.danhSachKM=action.danhSachKM.map((km,index)=>{
                km.NgayBD = km.NgayBD.split("T")[0];
                km.NgayKT = km.NgayKT.split("T")[0];
                return km;
            })
            state.danhSachKM=action.danhSachKM;
            console.log(state.danhSachKM);
            return {...state}
        }
        case types.XOA_CHI_TIET_KHUYEN_MAI:{
            let mangCapNhat = [...state.mangChiTietKhuyenMai];
            let viTri = mangCapNhat.findIndex(km=>km.MaSP===action.maSP)
            mangCapNhat[viTri].TrangThai=0;
            state.mangChiTietKhuyenMai=mangCapNhat;
            return {...state}
        }
        case types.PHUC_HOI_CHI_TIET_KHUYEN_MAI:{
            let mangCapNhat = [...state.mangChiTietKhuyenMai];
            let viTri = mangCapNhat.findIndex(km=>km.MaSP===action.maSP)
            mangCapNhat[viTri].TrangThai=1;
            state.mangChiTietKhuyenMai=mangCapNhat;
            return {...state}
        }
        case types.THEM_CHI_TIET_KHUYEN_MAI:{
            let mangCapNhat = [...state.mangChiTietKhuyenMai];
            mangCapNhat.push(action.khuyenMai);
            state.mangChiTietKhuyenMai=mangCapNhat;
            return {...state}
        }
        case types.CAP_NHAT_PHAN_TRAM_KHUYEN_MAI:{
            let khuyenMai = action.khuyenMai;
            let mangCapNhat = [...state.mangChiTietKhuyenMai];
            let viTri = mangCapNhat.findIndex(km=>km.MaSP===khuyenMai.MaSP);
            mangCapNhat[viTri].PhanTram = khuyenMai.PhanTram;
            state.mangChiTietKhuyenMai=mangCapNhat;
            return {...state}
        }
        case types.XOA_KHUYEN_MAI:{
            let mangCapNhat = [...state.danhSachKM];
            let viTri = mangCapNhat.findIndex(km=>km.MaKM===action.maKhuyenMai);
            mangCapNhat[viTri].TrangThai = 0;
            state.danhSachKM=mangCapNhat;
            return{...state}
        }
        case types.PHUC_HOI_KHUYEN_MAI:{
            let mangCapNhat = [...state.danhSachKM];
            let viTri = mangCapNhat.findIndex(km=>km.MaKM===action.maKhuyenMai);
            mangCapNhat[viTri].TrangThai = 1;
            state.danhSachKM=mangCapNhat;
            return{...state}
        }
        case types.THEM_DOT_KHUYEN_MAI:{
            let mangCapNhat = [...state.danhSachKM];
            mangCapNhat.push(action.khuyenMai);
            state.danhSachKM=mangCapNhat;
            return {...state}
        }

        default: return {...state};
    }
}

export default khuyenMaiReducer;

