import React, { useEffect, useState } from 'react';
import axios from "axios"
import { Link, useNavigate, useParams } from 'react-router-dom';

const Addproducts = () => {

    const navigate = useNavigate()

    const {id} = useParams()

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        count:""
    })

    const [mainImg,setMainImg] = useState(null)
    const [subImg,setSubImg] = useState([])
    const [existingMainimg,setExistingMainimg] = useState(null)
    const [existingSubImg,setExistingSubimg] = useState([])
    
console.log(formData);

   useEffect(() => {
    if(id){
        const getProductById = async () => {
            console.log(id);
            
            try {
                const res = await axios.get(`http://localhost:5000/products/getProductById/${id}`,{withCredentials:true})

                setFormData({
                    title:res.data.data.title,
                    description:res.data.data.description,
                    price:res.data.data.price,
                    count:res.data.data.count
                })

                setExistingMainimg(res.data.data.mainImage)
                setExistingSubimg(res.data.data.subImages)
            } catch (error) {
                
            }
        }
        getProductById()
    }
   },[])

    const addProduct = async (e) => {
        e.preventDefault()

        const data = new FormData()

        data.append("title",formData.title)
        data.append("description",formData.description)
        data.append("price",formData.price)
        data.append("count",formData.count)
        if(mainImg){
            data.append("mainImage",mainImg)
        }

        if(subImg?.length){
            for (let img of subImg){
                data.append("subImages",img)
            }
        }
        try {

            if(id){
                const res = await axios.put(`http://localhost:5000/products/updateProduct/${id}`, data,{withCredentials:true})
                alert(res.data.msg)
            }else{
                const res = await axios.post("http://localhost:5000/products/addProduct", data,{withCredentials:true})
                alert(res.data.msg)
            }

            setFormData({
                title: "",
                description: "",
                price: "",
                count:""
            })


            navigate("/productsList")
        } catch (error) {
            console.log(error)
        }
    }


    function handlechange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            
        })
    }

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
                <div className='inp'>
                    <label>Count</label>
                    <input type="number" name='count' value={formData.count} onChange={handlechange} />
                </div>
                <div className='inp'>
                    <label>Main Image</label>
                    <input type="file" name='mainImage' onChange={(e) => setMainImg(e.target.files[0])} />
                    <img src={`http://localhost:5000/uploads/${existingMainimg}`} alt="" width={"100px"} />
                </div>
                <div className='inp'>
                    <label>SubImages</label>
                    <input type="file" name='subImage' multiple onChange={(e) => setSubImg(e.target.files)} />
                    <div>
                        {
                            existingSubImg?.map((image) => {
                                return <img src={`http://localhost:5000/uploads/${image}`} width={"50px"}/>
                            })
                        }
                    </div>
                </div>
                <button>{id ? "Edit product" : "Add Product"}</button>
            </form>
        </div>
    );
}

export default Addproducts;