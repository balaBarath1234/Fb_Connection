import React from 'react'
import { Navigate } from 'react-router-dom'

const PublicRoutes = ({children}) => {
    const token = localStorage.getItem("token")

    const user = JSON.parse(localStorage.getItem("user"))

  return token ? 
  user?.role === "admin" ? <Navigate to="/addProduct"/> 
  : user?.role === "staff" ? <Navigate to="/staff"/> 
  : user?.role === "users" ? <Navigate to="/home"/>: children : children
}

export default PublicRoutes