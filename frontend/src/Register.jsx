import React, { useState } from 'react';
import axios from "axios"
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData , setFormData] = useState({
        name:"",
        email:"",
        password:""
    })


    const registerUser = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post("http://localhost:5000/users/register",formData)

            setFormData({
                name:"",
                email:"",
                password:""               
            })

            alert (res.data.msg)
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
            <h1>Register</h1>
            <form className='form' onSubmit={registerUser}>
                <div className='inp'>
                    <label>Name</label>
                    <input type='text' name='name' value={formData.name} onChange={handlechange}/>
                </div>
                <div className='inp'>
                    <label>Email</label>
                    <input type="email" name='email' value={formData.email} onChange={handlechange}/>
                </div>
                <div className='inp'>
                    <label>Password</label>
                    <input type="Password" name='password' value={formData.password} onChange={handlechange}/>
                </div>
                <button>Register</button>
            </form>
            <p>Already have an account? <Link to={"/login"}>Login</Link></p>
        </div>
    );
}

export default Register;