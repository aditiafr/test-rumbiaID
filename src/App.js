import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Product from './Pages/Product'
import Navbar from './Pages/layout/Navbar'
import FormProduct from './Pages/Product/form'

const App = () => {

  const AuthRoute = ({ element }) => {
    const dataAuth = JSON.parse(localStorage.getItem('AuthUser'));
    console.log(dataAuth);
    return dataAuth ? element : <Navigate to="/" />
  }


  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/*" element={
          <AuthRoute element={
            <>
              <Navbar />
              <Routes>
                <Route path="/product" element={<Product />} />
                <Route path="/product/form" element={<FormProduct />} />
                <Route path="/product/form/:code" element={<FormProduct />} />
              </Routes>
            </>
          }
          />
        }
        />
      </Routes>
    </>
  )
}

export default App