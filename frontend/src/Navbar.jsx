import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from "./assets/logo.png"

const Navbar = () => {

    const user = JSON.parse(localStorage.getItem("user"))

    const navigate = useNavigate()

    function handleLogout () {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        navigate("/login")
    }

    const menuArray = [
        {name:"Home",path:"/home",access:["users"]},
        {name:"Products",path:"/products",access:["users"]},
        {name:"Add Product",path:"/addProduct",access:["staff","admin"]},
        {name:"Add Staff",path:"/addStaff",access:["admin"]},
        {name:"Products List",path:"/productsList",access:["staff","admin"]},
        {name:"About",path:"/about",access:["all"]},
    ]
    return (
        <div className='navbar'>
            <div><img src={Logo} alt="w" style={{width:"50px",height:"100%"}} /></div>
            <div className='menu_con'>
                {
                    menuArray.map((item,index) => {
                        return (
                            item.access.includes(user?.role) ? <NavLink to={item.path} className={({isActive}) => isActive ? "active" : "inactive" }>{item.name}</NavLink> 
                            : 
                            item.access.includes("all")&& <NavLink to={item.path} className={({isActive}) => isActive ? "active" : "inactive" }>{item.name}</NavLink>
                        )
                    })
                }
            </div>
            <div><button onClick={handleLogout}>Logout</button></div>
        </div>
    );
}

export default Navbar;
