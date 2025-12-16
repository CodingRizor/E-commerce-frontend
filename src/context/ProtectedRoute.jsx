import { useContext } from "react"
import {AuthContext} from "./AuthContext.jsx"
import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({ children }) => {
  const { auth, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center mt-10">Checking authentication...</div>;
  }

  return auth ? children : <Navigate to="/login" replace />;
}