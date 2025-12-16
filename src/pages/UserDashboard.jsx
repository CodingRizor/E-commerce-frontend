import React from 'react'
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function UserDashboard() {
       const { auth, setAuth } = useContext(AuthContext);
   
  return (
    <>
    {
        auth ? <Outlet /> : <Navigate to={"/login"} />
    }
    </>
  )
}

export default UserDashboard