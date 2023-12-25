import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const storedAuthData = localStorage.getItem('token')
    if(!storedAuthData) {
      return { isLoggedIn: false, userRole: null } 
    }
    const decodedToken = jwtDecode(JSON.stringify(storedAuthData));
    return decodedToken.role ? { isLoggedIn: true, userRole: decodedToken.role } : { isLoggedIn: false, userRole: null } 
  });
  const login = (token) => {
    const decodedToken = jwtDecode(token);
    setAuthData({
      isLoggedIn: true,
      userRole: decodedToken.role,
    });
  };

  const logout = () => {
    setAuthData({
      isLoggedIn: false,
      userRole: null,
    });
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};