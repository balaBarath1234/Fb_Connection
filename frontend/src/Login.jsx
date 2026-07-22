import React, { useState } from 'react';
import axios from "axios"
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Login = () => {

    const [formData , setFormData] = useState({
        name:"",
        email:"",
        password:""
    })

    const navigate = useNavigate()

    const loginUser = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post("http://localhost:5000/users/login",formData)
            alert (res.data.msg)
            localStorage.setItem("token",res.data.token)
            localStorage.setItem("user",JSON.stringify(res.data.data))

            navigate("/home")
            
        } catch (error) {
            console.log(error)
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