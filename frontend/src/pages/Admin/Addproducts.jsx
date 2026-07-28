import React, { useEffect, useState } from 'react';
import axios from "axios"
import { Link, useNavigate, useParams } from 'react-router-dom';

const Addproducts = () => {

    const navigate = useNavigate()

    const {id} = useParams()

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: ""
    })

   useEffect(() => {
    if(id){
        const getProductById = async () => {
            console.log(id);
            
            try {
                const res = await axios.get(`http://localhost:5000/products/getProductById/${id}`,{withCredentials:true})

                setFormData({
                    title:res.data.data.title,
                    description:res.data.data.description,
                    price:res.data.data.price
                })
            } catch (error) {
                
            }
        }
        getProductById()
    }
   },[])

    const addProduct = async (e) => {
        e.preventDefault()

        try {

            if(id){
                const res = await axios.put(`http://localhost:5000/products/updateProduct/${id}`, formData,{withCredentials:true})
                alert(res.data.msg)
            }else{
                const res = await axios.post("http://localhost:5000/products/addProduct", formData,{withCredentials:true})
                alert(res.data.msg)
            }


            setFormData({
                title: "",
                description: "",
                price: ""
            })


            navigate("/productsList")
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
            <form className='form' onSubmit={addProduct}>
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
                <button>{id ? "Edit product" : "Add Product"}</button>
            </form>
        </div>
    );
}

export default Addproducts;