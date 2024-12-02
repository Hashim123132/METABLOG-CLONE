import React from 'react';
import { Navigate } from 'react-router-dom';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');  // Retrieve token from localStorage

  if (!token) {
    return <Navigate to="/Login" />;  // Redirect to Login if no token found
  }

  return children;  // Render children (e.g., Dashboard) if token exists
};

export default ProtectedRoute;