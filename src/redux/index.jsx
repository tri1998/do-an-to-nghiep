import {combineReducers} from 'redux';
import sanPhamReducer from './reducers/sanpham';
import nguoiDungReducer from './reducers/nguoidung';
import gioHangReducer from './reducers/giohang.jsx'
const rootReducer = combineReducers(
    {
        DSSP:sanPhamReducer,
        DSND:nguoiDungReducer,
        DSSPMua:gioHangReducer
    }
)

export default rootReducer;