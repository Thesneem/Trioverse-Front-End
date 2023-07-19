import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
//import jwtdecode from 'jwt-decode'
import toast from 'react-hot-toast'

const UserPrivateRoutes = ({ type }) => {
    // const Navigate = useNavigate()
    let token = localStorage.getItem("userToken") == null ? false : true;
    // const decode = jwtdecode(token)
    if (!token) {
        toast.error('Please login');
    }

    return (
        <>
            {token ? (
                < Outlet />) : (<Navigate to="/" />
            )}
        </>

    )
}

export default UserPrivateRoutes