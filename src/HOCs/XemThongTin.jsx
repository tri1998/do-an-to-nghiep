import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import Swal from 'sweetalert2';
const XemThongTin=({path,Component})=>{
    return(
        <Route path={path} render={(routeProps)=>{
            if(sessionStorage.getItem('admintoken')===null)
            {
                if(sessionStorage.getItem('userinfo')!==null)
                {
                        return <Component {...routeProps}/>
                }
                Swal.fire(
                        '',
                        'Bạn chưa đăng nhập !',
                        'warning'
                )
                return <Redirect to='/dangnhap'/>
            }
            Swal.fire(
                '',
                'admin không thể xem thông tin !',
                'warning'
            )
            return <Redirect to=''/>
        }}

        />
    );
};

export default XemThongTin;