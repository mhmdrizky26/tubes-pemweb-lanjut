// src/middleware/UserRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const UserRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    // Cek jika user tidak ada atau role bukan 2 (user)
    if (!user || user.role !== 2) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default UserRoute;
