import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from "../assets/logo.png"
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { removeUser } from '../redux/Slice/authSlice';

const Navbar = () => {

    const user = useSelector(state => state.auth.user)

    const dispatch = useDispatch()

    const navigate = useNavigate()
        const logOut = async () => {
            try {
                const res = await axios.post("http://localhost:5000/users/logout",{},{withCredentials:true  })
                dispatch(removeUser())
                navigate("/login")
            } catch (error) {
                console.log(error);
                
            }
        }

    const menuArray = [
        {name:"Home",path:"/home",access:["users"]},
        {name:"Products",path:"/products",access:["users"]},
        {name:"Add Product",path:"/addProduct",access:["staff","admin"]},
        {name:"Add Staff",path:"/addStaff",access:["admin"]},
        {name:"Products List",path:"/productsList",access:["staff","admin"]},
        {name:"Staff List",path:"/staffList",access:["admin"]},
        {name:"About",path:"/about",access:["all"]},
    ]
    return (
        <div className='navbar'>
            <div><img src={Logo} alt="w" style={{width:"50px",height:"100%"}} /></div>
            <div className='menu_con'>
                {
                    menuArray.map((item,index) => {
                        return (
                            <div key={index}>
                                {item.access.includes(user?.role) ? <NavLink to={item.path} className={({isActive}) => isActive ? "active" : "inactive" }>{item.name}</NavLink> 
                                : 
                                item.access.includes("all")&& <NavLink to={item.path} className={({isActive}) => isActive ? "active" : "inactive" }>{item.name}</NavLink>}
                            </div>
                        )
                    })
                }
            </div>
            <div><button onClick={logOut}>Logout</button></div>
        </div>
    );
}

export default Navbar;
