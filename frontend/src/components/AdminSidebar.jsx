import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTachometerAlt, FaUsers, FaTags, FaBox, FaMoneyBill, FaPercentage, FaGift, FaBullhorn } from 'react-icons/fa';

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: <FaTachometerAlt /> },
    { path: '/admin/user', label: 'Kelola User', icon: <FaUsers /> },
    { path: '/admin/kategori', label: 'Kelola Kategori', icon: <FaTags /> },
    { path: '/admin/produk', label: 'Kelola Produk', icon: <FaBox /> },
    { path: '/admin/transaksi', label: 'Kelola Transaksi', icon: <FaMoneyBill /> },
    { path: '/admin/promo', label: 'Kelola Promo', icon: <FaBullhorn /> },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <div
        className="bg-dark text-white p-3"
        style={{
          minHeight: '100vh',
          width: collapsed ? '70px' : '250px',
          transition: 'width 0.3s',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          onClick={toggleSidebar}
          style={{
            cursor: 'pointer',
            marginBottom: '1rem',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <FaBars />
          {!collapsed && <span>Menu</span>}
        </div>

        {!collapsed && (
          <Link to="/admin">
            <img src="/assets/img/logo.png" alt="logo" style={{ width: '100%' }} />
          </Link>
        )}

        <ul className="nav flex-column mt-3">
          {menuItems.map((item, index) => (
            <li className="nav-item mb-2" key={index}>
              <Link to={item.path} className="nav-link text-white d-flex align-items-center gap-2">
                {item.icon}
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
