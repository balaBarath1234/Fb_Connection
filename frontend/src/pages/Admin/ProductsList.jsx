import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const ProductsList = () => {

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


    console.log(products);
    

    return (
        <div className=''>
            <table>
                <thead>
                    <tr>
                        <td>Title</td>
                        <td>Description</td>
                        <td>Price</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                  {
                    products?.map((item,index) => {
                        return <tr key={item._id}>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
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
