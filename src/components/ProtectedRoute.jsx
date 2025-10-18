// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth(); // Use the token to check for authentication

  if (!token) {
    // If the user is not authenticated, redirect them to the login page
    return <Navigate to="/" />;
  }

  // If the user is authenticated, render the child component (e.g., Home, Profile)
  return children;
};

export default ProtectedRoute;