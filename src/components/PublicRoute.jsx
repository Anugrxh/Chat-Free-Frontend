// src/components/PublicRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
  const { token } = useAuth();

  if (token) {
    // If the user IS authenticated, redirect them away from public pages (like login)
    return <Navigate to="/home" />;
  }

  // If not authenticated, render the child (Login, Signup)
  return children;
};

export default PublicRoute;