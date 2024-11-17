import React from 'react';
import { Navigate } from 'react-router-dom';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');  
  
  if (!token) {
    return <Navigate to="/Login" />; 
  }

  return children;  
};

export default ProtectedRoute;