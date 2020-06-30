import {combineReducers} from 'redux';
import sanPhamReducer from './reducers/sanpham';
import nguoiDungReducer from './reducers/nguoidung';
const rootReducer = combineReducers(
    {
        DSSP:sanPhamReducer,
        DSND:nguoiDungReducer
    }
)

export default rootReducer;