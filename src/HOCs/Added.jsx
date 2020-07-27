import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import Swal from 'sweetalert2'
const Added=({path,Component})=>{
    return(
        <Route path={path} render={(routeProps)=>{
            if(sessionStorage.getItem('giohang')!=null)
            {
                return <Component {...routeProps}/>
            }
            Swal.fire(
                '',
                'Giỏ hàng rỗng !',
                'warning'
            )
            return <Redirect to='/giohang'/>
        }}

        />
    );
};

export default Added;