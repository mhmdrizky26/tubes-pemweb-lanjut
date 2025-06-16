import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
  <nav className="navbar navbar-expand navbar-light bg-light px-4">
    <span className="navbar-brand">Admin Dashboard</span>
    <div className="ml-auto">
      <Link to="/" className='btn btn-outline-danger btn-sm'>Logout</Link>
    </div>
  </nav>
  );
};

export default Header;
