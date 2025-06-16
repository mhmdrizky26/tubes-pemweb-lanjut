// src/middleware/AdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    // Cek jika user tidak ada atau role bukan 1 (admin)
    if (!user || user.role !== 1) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default AdminRoute;
