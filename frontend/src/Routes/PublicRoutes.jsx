import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PublicRoutes = ({children}) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    const user = useSelector(state => state.auth.user) 


  return isAuthenticated ? 
  user?.role === "admin" || user?.role === "staff" ? <Navigate to="/addProduct"/> 
  : user?.role === "users" ? <Navigate to="/home"/>: children : children
}

export default PublicRoutes