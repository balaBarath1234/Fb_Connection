import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Navbar'
import Register from './Register'
import Login from './Login'
import Layout from './Layout'
import Home from './pages/Home'
import PrivateRoute from './PrivateRoute'
import PublicRoutes from './PublicRoutes'
import Products from './pages/Products'
import About from './pages/About'
import AdminRoutes from './AdminRoutes'
import Admin from './pages/Admin/Admin'
import Staff from './pages/Staff/Staff'
import StaffRoutes from './StaffRoutes'
import Addproducts from './pages/Admin/Addproducts'

function App() {
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
        <Route path='/staff' element={<PrivateRoute><StaffRoutes><Staff/></StaffRoutes></PrivateRoute>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
