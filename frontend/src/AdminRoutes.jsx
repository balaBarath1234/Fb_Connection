import React from 'react'
import { Navigate } from 'react-router-dom'

const AdminRoutes = ({children}) => {

    const user = localStorage.getItem("user")
  return user.role === "admin" ? children : <Navigate to={"/login"}/>
}

export default AdminRoutes