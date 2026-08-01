import React, { useEffect, useState } from 'react';
import axios from "axios"
import { Link, useNavigate, useParams } from 'react-router-dom';

const AddStaff = () => {
    const navigate = useNavigate()

    const {id} = useParams()

    const [formData , setFormData] = useState({
        name:"",
        email:"",
        password:""
    })

    const getUserById = async () =>{
        try {
            const res = await axios.get(`http://localhost:5000/users/userData/${id}`,{withCredentials:true})
            console.log(res.data);
            
            setFormData({
                name:res.data.data.name,
                email:res.data.data.email
            })
            
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getUserById()
    },[])


    const registerUser = async (e) => {
        e.preventDefault()

        try {

            if(id){
                const res = await axios.put(`http://localhost:5000/users/updateUser/${id}`,formData,{withCredentials:true})
                alert(res.data.msg)
            }else{
                const res = await axios.post("http://localhost:5000/users/register",formData,{withCredentials:true})
                alert(res.data.msg)
            }

            setFormData({
                name:"",
                email:"",
                password:""               
            })

            navigate("/stafflist")
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

  
    function handlechange(e){
        setFormData({
            ...formData,
            [e.target.name] : e.target.value,
            role:"staff"
        })
    }

    console.log(formData);
    
    return (
        <div className='form_con'>
            <h1>Add Staff</h1>
            <form className='form' onSubmit={registerUser}>
                <div className='inp'>
                    <label>Name</label>
                    <input type='text' name='name' value={formData.name} onChange={handlechange}/>
                </div>
                <div className='inp'>
                    <label>Email</label>
                    <input type="email" name='email' value={formData.email} onChange={handlechange}/>
                </div>
                {
                    !id ? 
                    <div className='inp'>
                        <label>Password</label>
                        <input type="Password" name='password' value={formData.password} onChange={handlechange}/>
                    </div>:
                    <></>
                }
                <button>{id ? "Update":"Register"}</button>
            </form>
        </div>
    );
}

export default AddStaff;
