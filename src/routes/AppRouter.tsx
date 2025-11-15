import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Navbar from '../components/common/Navbar'

const AppRouter = () => {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/" element={ <Navbar/>}></Route>
          </Routes>
      </BrowserRouter>
  )
}

export default AppRouter