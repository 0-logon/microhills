import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectAuth } from '../store/slices/authSlice';

const GuestRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useSelector(selectAuth);

    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
}

export default GuestRoute