import React from 'react';
import { Route, Navigate, Outlet  } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const ProtectedRoute = () => {
  const { authData } = useAuth();

  return (
    authData.isLoggedIn ? <Outlet/> : <Navigate to='/login'/>
  )
};

export default ProtectedRoute;