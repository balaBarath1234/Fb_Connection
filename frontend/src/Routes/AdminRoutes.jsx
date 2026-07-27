import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AdminRoutes = ({children}) => {

  const user = useSelector(state => state.auth.user) 
  console.log(user);
  
  return user?.role === "admin" ? children : <Navigate to={"/login"}/>
}

export default AdminRoutes