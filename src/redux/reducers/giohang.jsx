import * as types from '../constants/actionType';

let tinhTongTien = sessionStorage.getItem('giohang')===null
?0
:JSON.parse(sessionStorage.getItem('giohang')).reduce((tongTien,sanPham,index)=>{
    tongTien+=sanPham.Gia;
    return tongTien;
},0);

const stateDefault = {
    mangSanPham: sessionStorage.getItem('giohang')===null?[]:JSON.parse(sessionStorage.getItem('giohang')),
    tongTien:tinhTongTien
    ,
    soLuongSanPhamCoTrongGio: sessionStorage.getItem('giohang')===null?0:JSON.parse(sessionStorage.getItem('giohang')).length
}

const gioHangReducer = (state=stateDefault,action)=>{
    switch(action.type){
        case types.THEM_VAO_GIO:{
            let mangSanPhamCapNhat = [...state.mangSanPham];
            let Gia = action.sanPham.Gia;
            mangSanPhamCapNhat.push(action.sanPham);
            state.mangSanPham=mangSanPhamCapNhat;
            state.tongTien+=Gia;
            sessionStorage.setItem('giohang',JSON.stringify(state.mangSanPham));
            state.soLuongSanPhamCoTrongGio +=1;
            return {...state};
        }
        case types.XOA_SAN_PHAM:{
            let maSanPham = action.maSanPham;
            let mangSanPhamCapNhat = [...state.mangSanPham];
            let viTriXoa = mangSanPhamCapNhat.findIndex(sp=>sp.MaSP===maSanPham);
            let Gia = mangSanPhamCapNhat[viTriXoa].Gia;
            mangSanPhamCapNhat.splice(viTriXoa,1);
            state.mangSanPham=mangSanPhamCapNhat;
            state.tongTien-=Gia;
            state.soLuongSanPhamCoTrongGio-=1;
            console.log(state.mangSanPham);
            sessionStorage.setItem('giohang',JSON.stringify(state.mangSanPham));
            return{...state};
        }
        case types.THEM_VAO_GIO_DA_CO_SAN_PHAM:{
            let mangSanPhamCapNhat=[...state.mangSanPham];
            let soLuong = parseInt(action.soLuong);
            let viTriSanPhamCanSua = mangSanPhamCapNhat.findIndex(sp=>sp.MaSP===action.maSanPham);
            mangSanPhamCapNhat[viTriSanPhamCanSua].SoLuong +=soLuong;
            mangSanPhamCapNhat[viTriSanPhamCanSua].Gia += mangSanPhamCapNhat[viTriSanPhamCanSua].GiaCu*action.soLuong;
            state.tongTien+=mangSanPhamCapNhat[viTriSanPhamCanSua].GiaCu*action.soLuong;
            sessionStorage.setItem('giohang',JSON.stringify(state.mangSanPham));
            state.mangSanPham=mangSanPhamCapNhat;
            return {...state}
        }
        case types.CAP_NHAT_SO_LUONG_SAN_PHAM:{
            let maSanPham = parseInt(action.maSanPham);//parse data nhan tu action tu string -> number de xu ly
            let soLuongMoi = parseInt(action.soLuong);//day la so luong moi khi nguoi dung chon tang giam so luong
            let mangSanPhamCapNhat = [...state.mangSanPham];
            let viTriSanPham=mangSanPhamCapNhat.findIndex(sp=>sp.MaSP===maSanPham);//Tim vi tri san pham can chinh sua so luong
            let soLuongCu=mangSanPhamCapNhat[viTriSanPham].SoLuong;//Tao 1 bien chua so luong cu cua san pham de thao tac
            let soLuongTongTien=0;//Day la so luong de tang giam tong tien
            soLuongMoi>soLuongCu//Neu so luong moi > so luong cu thi soLuongTongTien=soLuongMoi tru cho soLuongCu va nguoc lai
            ?soLuongTongTien=soLuongMoi-soLuongCu//Dieu kien dung 
            :soLuongTongTien=soLuongCu-soLuongMoi;//Dieu kien sai
            mangSanPhamCapNhat[viTriSanPham].SoLuong=soLuongMoi;//cap nhat so luong cua san pham thanh so luong moi
            mangSanPhamCapNhat[viTriSanPham].Gia = mangSanPhamCapNhat[viTriSanPham].GiaCu*action.soLuong;
            soLuongCu<soLuongMoi//so sanh 2 so luong de quyet dinh tang hoac giam tong tien
            ?state.tongTien +=mangSanPhamCapNhat[viTriSanPham].GiaCu*soLuongTongTien//dieu kien dung thi tang tongTien
            :state.tongTien -=mangSanPhamCapNhat[viTriSanPham].GiaCu*soLuongTongTien;//dieu kien sai thi giam tongTien
            state.mangSanPham=mangSanPhamCapNhat;//Gan mangSanPham trong state = mang moi thi javascript co tinh bat bien
            sessionStorage.setItem('giohang',JSON.stringify(state.mangSanPham));//luu tren session mangSanPham moi va tong tien moi
            return{...state}
        }

        default:return{...state};
    }
}

export default gioHangReducer;