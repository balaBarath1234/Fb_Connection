import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const ProductsList = () => {
    const navigate = useNavigate()

    const [products,setProducts] = useState([])

    const getProducts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/products/getProducts",{withCredentials:true})
            setProducts(res.data.data) 
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProducts()
    },[])

    function handleEdit (productId) {
        navigate(`/addProduct/${productId}`)
    }
    
    function handleDelete (productId) {
        const deleteProduct = async() => {
            try {
                const res = await axios.delete(`http://localhost:5000/products/deleteProduct/${productId}`,{withCredentials:true})
                alert(res.data.msg)

                setProducts(prev => prev.filter((item) => item._id !== productId))
            } catch (error) {
                console.log(error);
                
            }
        }
        deleteProduct()
    }

    return (
        <div className='table_con'>
            <h2>List</h2>
            <table className='table_list'>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    products?.map((item,index) => {
                        return <tr key={item._id}>
                            <td style={{textAlign:"center"}}>{index+1}</td>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                            <td className='btn_td'>
                                <button className='edit_btn' onClick={() => handleEdit(item._id)}>Edit</button>
                                <button className='del_btn' onClick={() => handleDelete(item._id)}>Delete</button>
                            </td>
                        </tr>
                    })
                  }
                </tbody>
            </table>
        </div>
    );
}

export default ProductsList;
