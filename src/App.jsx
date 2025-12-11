import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Products from './pages/Products'
import Cart from './pages/Cart'
import About from './pages/About'
import Signup from './pages/Signup'
import Login from './pages/Login'

function App() {
  return (
   <>
   <Navbar />
   <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/products' element={<Products />} />
    <Route path='/cart' element={<Cart />} />
    <Route path='/about-us' element={<About />} />
    <Route path='/signup' element={<Signup />} />
    <Route path="/login" element={<Login/>}/>
   </Routes>
   <Footer />
   </>
  )
}

export default App


