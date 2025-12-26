import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const location = useLocation();

  const publicRoutes = ["/login", "/signup", "/change-password"];


  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setAuth(true);
    }
  }, []);

  const checkAuth = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/user/check-auth",
        { withCredentials: true }
      );

      if (res.data.isAuthenticated) {
        setAuth(true);

        if (res.data.user) {
          setUser(res.data.user);
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }
      } else {
        setAuth(false);
        setUser(null);
        localStorage.removeItem("user");
      }
    } catch (error) {
      setAuth(false);
      setUser(null);
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
    if (publicRoutes.includes(location.pathname)) {
      setLoading(false);
      return;
    }
    checkAuth();
  }, [location.pathname]);
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

