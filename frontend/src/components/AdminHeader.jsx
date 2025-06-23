import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-light px-4">
      <span className="navbar-brand">Admin Dashboard</span>
      <div className="ml-auto">
        <button onClick={handleLogout} className='btn btn-outline-danger btn-sm'>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Header;
