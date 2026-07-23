import React, { useState } from 'react';
import axios from "axios"
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const Addproducts = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: ""
    })


    const registerUser = async (e) => {
        e.preventDefault()

        try {

            const token = localStorage.getItem("token");

            if (token) {
                const decoded = jwtDecode(token);
                console.log(decoded);
                if (decoded.role !== "admin") {

                    return alert("You are not authorized to add products.");

                }

            }


            const res = await axios.post("http://localhost:5000/products/addProduct", formData)

            setFormData({
                title: "",
                description: "",
                price: ""
            })

            alert(res.data.msg)
        } catch (error) {
            console.log(error)
        }
    }


    function handlechange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    console.log(formData);

    return (
        <div className='form_con'>
            <h1>Add Product</h1>
            <form className='form' onSubmit={registerUser}>
                <div className='inp'>
                    <label>Title</label>
                    <input type='text' name='title' value={formData.title} onChange={handlechange} />
                </div>
                <div className='inp'>
                    <label>Description</label>
                    <input type="text" name='description' value={formData.description} onChange={handlechange} />
                </div>
                <div className='inp'>
                    <label>Price</label>
                    <input type="number" name='price' value={formData.price} onChange={handlechange} />
                </div>
                <button>Add Product</button>
            </form>
        </div>
    );
}

export default Addproducts;