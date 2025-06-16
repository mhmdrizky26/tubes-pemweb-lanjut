import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../LoginPage/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate(); // Hook untuk mengarahkan user ke halaman lain

  // --- STATE MANAGEMENT ---
  // State untuk form login
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // State untuk form sign up (registrasi)
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // --- EVENT HANDLERS ---
  // Handler untuk perubahan input pada form login
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Handler untuk perubahan input pada form sign up
  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  // --- FORM SUBMISSION ---
  // Fungsi untuk handle submit login
  const handleLoginSubmit = async (e) => {
    e.preventDefault(); // Mencegah refresh halaman
    try {
      // Kirim data ke backend
      const res = await axios.post('http://localhost:5000/api/auth/login', loginData);
      
      // Simpan token yang diterima dari backend ke localStorage
      localStorage.setItem('token', res.data.token);

      alert('Login berhasil!');
      navigate('/'); // Arahkan ke halaman utama/dashboard setelah login
    } catch (err) {
      // Tampilkan pesan error dari backend jika ada
      alert(err.response?.data?.msg || 'Login gagal, periksa kembali email dan password.');
    }
  };

  // Fungsi untuk handle submit sign up
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { 
        name: signupData.name, 
        email: signupData.email, 
        password: signupData.password 
      };
      await axios.post('http://localhost:5000/api/auth/register', signupData);
      alert('Registrasi berhasil! Silakan login.');
      
      // Mengembalikan kartu ke sisi login secara otomatis
      document.getElementById('reg-log').checked = false;
      
    } catch (err) {
      alert(err.response?.data?.msg || 'Registrasi gagal, mohon coba lagi.');
    }
  };


  return (
    <div>
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
                <h6 className="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
                <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                <label htmlFor="reg-log" />
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    {/* ========== KARTU DEPAN (LOGIN) ========== */}
                    <div className="card-front">
                      <div className="center-wrap">
                        <form onSubmit={handleLoginSubmit} className="section text-center">
                          <h4 className="mb-4 pb-3">Log In</h4>
                          <div className="form-group">
                            <input
                              type="email"
                              name="email" /* Diubah */
                              className="form-style"
                              placeholder="Your Email"
                              id="logemail"
                              autoComplete="off"
                              value={loginData.email} /* Tambahan */
                              onChange={handleLoginChange} /* Tambahan */
                            />
                            <i className="input-icon uil uil-at" />
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="password" /* Diubah */
                              className="form-style"
                              placeholder="Your Password"
                              id="logpass"
                              autoComplete="off"
                              value={loginData.password} /* Tambahan */
                              onChange={handleLoginChange} /* Tambahan */
                            />
                            <i className="input-icon uil uil-lock-alt" />
                          </div>
                          <button type="submit" className="btn mt-4">submit</button> {/* Diubah dari <a/> */}
                          <p className="mb-0 mt-3 text-center">
                            <span className="small-text">Belum punya akun? Aktifkan <label htmlFor="reg-log" className="link">Sign Up</label></span>
                          </p>
                        </form>
                      </div>
                    </div>
                    {/* ========== KARTU BELAKANG (SIGN UP) ========== */}
                    <div className="card-back">
                      <div className="center-wrap">
                        <form onSubmit={handleSignupSubmit} className="section text-center">
                          <h4 className="mb-4 pb-3">Sign Up</h4>
                          <div className="form-group">
                            <input
                              type="text"
                              name="name" /* Diubah */
                              className="form-style"
                              placeholder="Your Full Name"
                              id="signupname" /* Diubah */
                              autoComplete="off"
                              value={signupData.name} /* Tambahan */
                              onChange={handleSignupChange} /* Tambahan */
                            />
                            <i className="input-icon uil uil-user" />
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="email"
                              name="email" /* Diubah */
                              className="form-style"
                              placeholder="Your Email"
                              id="signupemail" /* Diubah */
                              autoComplete="off"
                              value={signupData.email} /* Tambahan */
                              onChange={handleSignupChange} /* Tambahan */
                            />
                            <i className="input-icon uil uil-at" />
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="password" /* Diubah */
                              className="form-style"
                              placeholder="Your Password"
                              id="signuppass" /* Diubah */
                              autoComplete="off"
                              value={signupData.password} /* Tambahan */
                              onChange={handleSignupChange} /* Tambahan */
                            />
                            <i className="input-icon uil uil-lock-alt" />
                          </div>
                          <button type="submit" className="btn mt-4">submit</button> {/* Diubah dari <a/> */}
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
    </div>
  )
}

export default LoginPage;