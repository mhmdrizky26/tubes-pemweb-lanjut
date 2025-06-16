import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // 🔒 Cek jika sudah login, langsung redirect
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user && window.location.pathname === '/login') {
      if (user.role === 1) {
        navigate('/admin', { replace: true });
      } else if (user.role === 2) {
        navigate('/', { replace: true });
      }
    }
  }, []);


  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', loginData);
      const { token, user } = res.data;

      if (!token || !user) throw new Error('Token atau user tidak valid');

      console.log('Login response:', res.data);

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({
          ...user,
          role: user.role_id // Pastikan ini angka 1 atau 2
      }));

      alert('Login berhasil!');

      // Redirect berdasarkan role_id (angka)
      if (user.role_id === 1) { // 1 = admin
          navigate('/admin');
      } else { // 2 = user
          navigate('/');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert(err.response?.data?.message || 'Login gagal, cek email/password.');
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', signupData);
      alert('Registrasi berhasil! Silakan login.');
      document.getElementById('reg-log').checked = false;
    } catch (err) {
      alert(err.response?.data?.message || 'Registrasi gagal.');
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div className="row full-height justify-content-center">
          <div className="col-12 text-center align-self-center py-5">
            <div className="logo-container">
              <Link to="/">
                <img src="/assets/img/logo.png" alt="logo" style={{ width: '25%' }} />
              </Link>
            </div>

            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              <h6 className="mb-0 pb-3"><span>Log In</span><span>Sign Up</span></h6>
              <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
              <label htmlFor="reg-log" />
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">

                  {/* LOGIN */}
                  <div className="card-front">
                    <div className="center-wrap">
                      <form onSubmit={handleLoginSubmit} className="section text-center">
                        <h4 className="mb-4 pb-3">Log In</h4>
                        <div className="form-group">
                          <input
                            type="email"
                            name="email"
                            className="form-style"
                            placeholder="Your Email"
                            autoComplete="off"
                            value={loginData.email}
                            onChange={handleLoginChange}
                          />
                          <i className="input-icon uil uil-at" />
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="password"
                            name="password"
                            className="form-style"
                            placeholder="Your Password"
                            autoComplete="off"
                            value={loginData.password}
                            onChange={handleLoginChange}
                          />
                          <i className="input-icon uil uil-lock-alt" />
                        </div>
                        <button type="submit" className="btn mt-4">Login</button>
                        <p className="mb-0 mt-3 text-center">
                          <span className="small-text">Belum punya akun? Aktifkan <label htmlFor="reg-log" className="link">Sign Up</label></span>
                        </p>
                      </form>
                    </div>
                  </div>

                  {/* REGISTER */}
                  <div className="card-back">
                    <div className="center-wrap">
                      <form onSubmit={handleSignupSubmit} className="section text-center">
                        <h4 className="mb-4 pb-3">Sign Up</h4>
                        <div className="form-group">
                          <input
                            type="text"
                            name="name"
                            className="form-style"
                            placeholder="Your Full Name"
                            autoComplete="off"
                            value={signupData.name}
                            onChange={handleSignupChange}
                          />
                          <i className="input-icon uil uil-user" />
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="email"
                            name="email"
                            className="form-style"
                            placeholder="Your Email"
                            autoComplete="off"
                            value={signupData.email}
                            onChange={handleSignupChange}
                          />
                          <i className="input-icon uil uil-at" />
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="password"
                            name="password"
                            className="form-style"
                            placeholder="Your Password"
                            autoComplete="off"
                            value={signupData.password}
                            onChange={handleSignupChange}
                          />
                          <i className="input-icon uil uil-lock-alt" />
                        </div>
                        <button
                          type="submit"
                          className="btn mt-4"
                          disabled={!signupData.name || !signupData.email || !signupData.password}
                        >
                          Sign Up
                        </button>
                      </form>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
