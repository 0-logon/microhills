import React from 'react'
import { useSelector } from 'react-redux';
import { selectAuth } from '../store/slices/authSlice';
import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useSelector(selectAuth);
  
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
  };
  
  export default ProtectedRoute;