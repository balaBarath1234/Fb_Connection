import React from 'react'
import Navbar from './Components/Navbar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="lay_div">
        <Navbar/>
        <Outlet/>
    </div>
  )
}
