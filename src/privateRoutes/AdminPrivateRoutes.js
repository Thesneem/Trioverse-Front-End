import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
//import jwtdecode from 'jwt-decode'

const AdminPrivateRoutes = ({ type }) => {
    // const Navigate = useNavigate()
    let token = localStorage.getItem("adminToken") === null ? false : true;
    // const decode = jwtdecode(token)

    return (
        <>
            {token ? (
                < Outlet />) : (<Navigate to="/admin" />
            )}
        </>

    )
}

export default AdminPrivateRoutes