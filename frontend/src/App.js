import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './user/Home';
import About from './user/About';
import Page404 from './user/Page404';
import Cart from './user/Cart';
import Checkout from './user/Checkout';
import Contact from './user/Contact';
import Shop from './user/Shop';
import SingleProduct from './user/SingleProduct';
import LoginPage from './LoginPage/LoginPage';
import UserProfile from './user/UserProfile';

import Dashboard from './admin/Dashboard';
import IndexProduk from './admin/IndexProduk';
import IndexTransaksi from './admin/IndexTransaksi';
import IndexUser from './admin/IndexUser';
import IndexKategori from './admin/IndexKategori';
import IndexPromo from './admin/IndexPromo';

import AdminRoute from './middleware/AdminRoute';
import UserRoute from './middleware/UserRoute';
import GuestRoute from './middleware/GuestRoute';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/single-product' element={<SingleProduct />} />
        <Route path='/login' element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          } />
        <Route path='*' element={<Page404 />} />

        {/* User Protected Routes */}
        <Route path='/cart' element={<UserRoute><Cart /></UserRoute>} />
        <Route path='/checkout' element={<UserRoute><Checkout /></UserRoute>} />
        <Route path='/profile' element={<UserRoute><UserProfile /></UserRoute>} />

        {/* Admin Protected Routes */}
        <Route path='/admin' element={<AdminRoute><Dashboard /></AdminRoute>} />
        <Route path='/admin/produk' element={<AdminRoute><IndexProduk /></AdminRoute>} />
        <Route path='/admin/transaksi' element={<AdminRoute><IndexTransaksi /></AdminRoute>} />
        <Route path='/admin/user' element={<AdminRoute><IndexUser /></AdminRoute>} />
        <Route path='/admin/kategori' element={<AdminRoute><IndexKategori /></AdminRoute>} />
        <Route path='/admin/promo' element={<AdminRoute><IndexPromo /></AdminRoute>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
