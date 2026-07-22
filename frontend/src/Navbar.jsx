import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from "./assets/logo.png"

const Navbar = () => {

    const navigate = useNavigate()

    function handleLogout () {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        navigate("/login")
    }
    return (
        <div className='navbar'>
            <div><img src={Logo} alt="w" style={{width:"50px",height:"100%"}} /></div>
            <div className='menu_con'>
                <NavLink to={"/home"} className={({isActive}) => isActive ? "active" : "inactive" }>Home</NavLink>
                <NavLink to={"/products"} className={({isActive}) => isActive ? "active" : "inactive" }>Products</NavLink>
                <NavLink to={"/about"} className={({isActive}) => isActive ? "active" : "inactive" }>About</NavLink>
            </div>
            <div><button onClick={handleLogout}>Logout</button></div>
        </div>
    );
}

export default Navbar;
