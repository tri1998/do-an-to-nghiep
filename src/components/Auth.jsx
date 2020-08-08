import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import Swal from 'sweetalert2'
const Auth=({path,Component})=>{
    return(
        <Route path={path} render={(routeProps)=>{
            if(sessionStorage.getItem('loginAdmin')!=null)
            {
                return <Component {...routeProps}/>
            }
            Swal.fire(
                '',
                'Vui lòng đăng nhập !',
                'warning'
            )
            return <Redirect to='/dangnhap'/>
        }}

        />
    );
};

export default Auth;

