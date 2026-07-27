import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const StaffRoutes = ({children}) => {

   const user = useSelector(state => state.auth.user) 

     return user?.role === "staff" ? children : <Navigate to={"/login"}/>
}

export default StaffRoutes;
