import React, { useState } from 'react';
import axios from "axios"
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/Slice/authSlice';

const Login = () => {
    const dispatch = useDispatch()
    const [formData , setFormData] = useState({
        email:"",
        password:""
    })

    const navigate = useNavigate()

    const loginUser = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post("http://localhost:5000/users/login",formData,{withCredentials:true})
            alert (res.data.msg)

                const getUser = async () => {
                    try {
                        const res = await axios.get("http://localhost:5000/users/userData",{withCredentials:true})
                       
                        console.log(res.data.data);

                        if(res.data.data.role === "admin"){
                            navigate("/addProduct")
                        }else if(res.data.data === "users"){  
                            navigate("/home")
                        }else if(res.data.data === "staff"){
                            navigate("/staff")
                        }
                         dispatch(setUser(res.data.data))
                        
                    } catch (error) {
                        console.log(error);
                    }
                    }
                getUser()

           
            
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }
    function handlechange(e){
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    console.log(formData);
    
    return (
        <div className='form_con'>
            <h1>Login</h1>
            <form className='form' onSubmit={loginUser}>
                <div className='inp'>
                    <label>Email</label>
                    <input type="email" name='email' value={formData.email} onChange={handlechange}/>
                </div>
                <div className='inp'>
                    <label>Password</label>
                    <input type="Password" name='password' value={formData.password} onChange={handlechange}/>
                </div>
                <button>Login</button>
            </form>
            <p>Already have an account? <Link to={"/"}>Register</Link></p>
        </div>
    );
}

export default Login;