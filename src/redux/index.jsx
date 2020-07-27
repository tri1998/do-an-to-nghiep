import {combineReducers} from 'redux';
import sanPhamReducer from './reducers/sanpham';
import nguoiDungReducer from './reducers/nguoidung';
import gioHangReducer from './reducers/giohang.jsx'
import khuyeMaiReducer from './reducers/khuyenmai';
const rootReducer = combineReducers(
    {
        DSSP:sanPhamReducer,
        DSND:nguoiDungReducer,
        DSSPMua:gioHangReducer,
        DSCTKhuyenMai:khuyeMaiReducer
    }
)

export default rootReducer;