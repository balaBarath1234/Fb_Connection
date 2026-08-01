import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const StaffList = () => {
    const navigate = useNavigate()

    const [staff,setStaff] = useState([])

    const getStaff = async () => {
        try {
            const res = await axios.get("http://localhost:5000/users/getStaff",{withCredentials:true})
            setStaff(res.data.data) 
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getStaff()
    },[])

    function handleEdit (staffId) {
        navigate(`/addStaff/${staffId}`)
    }
    
    function handleDelete (staffId) {
        const deleteProduct = async() => {
            try {
                const res = await axios.delete(`http://localhost:5000/users/deleteUser/${staffId}`,{withCredentials:true})
                alert(res.data.msg)

                setStaff(prev => prev.filter((item) => item._id !== staffId))
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
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    staff?.map((item,index) => {
                        return <tr key={item._id}>
                            <td style={{textAlign:"center"}}>{index+1}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
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

export default StaffList;
