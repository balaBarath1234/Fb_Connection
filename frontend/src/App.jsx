import { Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './Auth/Register'
import Login from './Auth/Login'
import Layout from './Layout'
import PublicRoutes from './Routes/PublicRoutes'
import PrivateRoute from './Routes/PrivateRoute'
import AdminRoutes from './Routes/AdminRoutes'
import StaffRoutes from './Routes/StaffRoutes'
import Home from "./pages/User/Home"
import Products from "./pages/User/Products"
import About from './pages/All/About'
import Addproducts from "./pages/Admin/Addproducts"
import Staff from "./pages/Staff/Staff"
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUser } from './redux/Slice/authSlice'
import AddStaff from './pages/Admin/AddStaff'
import ProductsList from './pages/Admin/ProductsList'
function App() {
  const dispatch = useDispatch()

  const [loading,setLoading] = useState(true)

  useEffect(() => {

    const getUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users/userData",{withCredentials:true})
        dispatch(setUser(res.data.data))
        console.log(res.data.data);
        
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    }
    getUser()
  },[])

  if(loading){
    return <h1>Loading...</h1>
  }

  return (
    <>
    <Routes>
      <Route path='/' element={<PublicRoutes><Register/></PublicRoutes>} />
      <Route path='/login' element={<PublicRoutes><Login/></PublicRoutes>}/>

      <Route element={<Layout/>}>
        <Route path='/home' element={<PrivateRoute><Home/></PrivateRoute>}/>
        <Route path='/products' element={<PrivateRoute><Products/></PrivateRoute>}/>
        <Route path='/about' element={<PrivateRoute><About/></PrivateRoute>}/>

        <Route path='/addProduct' element={<PrivateRoute><AdminRoutes><Addproducts/></AdminRoutes></PrivateRoute>}/>
        <Route path='/addProduct/:id' element={<PrivateRoute><AdminRoutes><Addproducts/></AdminRoutes></PrivateRoute>}/>
        <Route path='/addStaff' element={<PrivateRoute><AdminRoutes><AddStaff/></AdminRoutes></PrivateRoute>}/>
        <Route path='/productsList' element={<PrivateRoute><AdminRoutes><ProductsList/></AdminRoutes></PrivateRoute>}/>
        <Route path='/staff' element={<PrivateRoute><StaffRoutes><Addproducts/></StaffRoutes></PrivateRoute>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
