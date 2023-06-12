import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
//import jwtdecode from 'jwt-decode'

const UserPrivateRoutes = ({ type }) => {
    // const Navigate = useNavigate()
    let token = localStorage.getItem("userToken") == null ? false : true;
    // const decode = jwtdecode(token)

    return (
        <>
            {token ? (
                < Outlet />) : (<Navigate to="/" />
            )}
        </>

    )
}

export default UserPrivateRoutes