import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Products from './pages/Products'
import Cart from './pages/Cart'
import About from './pages/About'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Settings from "./pages/Settings.jsx"
import { ProtectedRoute } from "./context/ProtectedRoute.jsx"
import UserDashboard from './pages/UserDashboard.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import ChangePassword from './pages/ChangePassword.jsx'

function App() {
  return (
    <>
      <div className="flex flex-col min-h-[70vh]">
        <main className="flex flex-col">
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<Products />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/about-us' element={<About />} />
            <Route path="/forgot-password" element={<ForgotPassword/>}/>
            <Route path="/change-password" element={<ChangePassword/>}/>

            <Route path='/user' element={
              <ProtectedRoute>
              <UserDashboard />
              </ProtectedRoute>
              }>
              <Route path='profile' element={<Profile />} />
            </Route>
            <Route path='/signup' element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/settings" element={
              <ProtectedRoute>
              <Settings />
              </ProtectedRoute>
              } />

          </Routes>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default App


