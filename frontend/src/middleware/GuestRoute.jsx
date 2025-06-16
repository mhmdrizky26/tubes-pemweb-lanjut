import React from 'react';
import { Navigate } from 'react-router-dom';

const GuestRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
        // Redirect berdasarkan role_id (angka)
        if (user.role === 1) { // 1 = admin
            return <Navigate to="/admin" replace />;
        } else { // 2 = user
            return <Navigate to="/" replace />;
        }
    }

    return children;
};

export default GuestRoute;
