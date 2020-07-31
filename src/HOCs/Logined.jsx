import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import Swal from 'sweetalert2';
const Logined=({path,Component})=>{
    return(
        <Route path={path} render={(routeProps)=>{
            if(sessionStorage.getItem('userinfo')===null)
            {
                return <Component {...routeProps}/>
            }
            Swal.fire(
                '',
                'Bạn đã đăng nhập !',
                'warning'
            )
            return <Redirect to=''/>
        }}

        />
    );
};

export default Logined;