import React from 'react';
import { Link } from 'react-router-dom';

const UserHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div>
      {/* Header */}
      <div className="top-header-area" id="sticker">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-sm-12 text-center">
              <div className="main-menu-wrap">
                {/* Logo */}
                <div className="site-logo">
                  <Link to='/'>
                    <img src="assets/img/logo.png" alt="Logo" />
                  </Link>
                </div>
                {/* Logo */}

                {/* Menu Start */}
                <nav className="main-menu">
                  <ul>
                    <li className="current-list-item">
                      <Link to='/'>Home</Link>
                    </li>
                    <li>
                      <Link to='/about'>About</Link>
                    </li>
                    <li>
                      <Link to='/contact'>Contact</Link>
                    </li>
                    <li>
                      <Link to='/shop'>Shop</Link>
                    </li>
                    <li>
                      <div className="header-icons">
                        <Link className="shopping-cart" to="/cart">
                          <i className="fas fa-shopping-cart"></i>
                        </Link>

                        {user ? (
                          <>
                            <Link to="/profile" className="boxed-btn mr-2">
                              Profile
                            </Link>
                            <button onClick={handleLogout} className="boxed-btn mr-2" style={{ borderRadius: '20px'}}>
                              Logout
                            </button>
                          </>
                        ) : (
                          <Link to="/login" className="boxed-btn">
                            Login
                          </Link>
                        )}
                      </div>
                    </li>
                  </ul>
                </nav>

                <div className="mobile-menu"></div>
                {/* Menu End */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Header */}
    </div>
  );
};

export default UserHeader;
