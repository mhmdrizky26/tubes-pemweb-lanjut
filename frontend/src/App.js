import { BrowserRouter, Routes, Route } from 'react-router-dom';

import React from 'react'
import Home from './user/Home'
import About from './user/About'
import Page404 from './user/Page404'
import Cart from './user/Cart'
import Checkout from './user/Checkout'
import Contact from './user/Contact'
import Shop from './user/Shop'
import SingleProduct from './user/SingleProduct'
import LoginPage from './LoginPage/LoginPage'
import Dashboard from './admin/Dashboard'
import IndexProduk from './admin/IndexProduk'
import IndexTransaksi from './admin/IndexTransaksi'
import IndexUser from './admin/IndexUser'
import IndexKategori from './admin/IndexKategori'
import IndexPromo from './admin/IndexPromo'
import UserProfile from './user/UserProfile'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/404' element={<Page404 />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/single-product' element={<SingleProduct />} />
        <Route path='/login' element={<LoginPage></LoginPage>}></Route>
        <Route path='/profile' element={<UserProfile></UserProfile>}></Route>

        <Route path='/admin' element={<Dashboard></Dashboard>}></Route>
        <Route path='/admin/produk' element={<IndexProduk></IndexProduk>}></Route>
        <Route path='/admin/transaksi' element={<IndexTransaksi></IndexTransaksi>}></Route>
        <Route path='/admin/user' element={<IndexUser></IndexUser>}></Route>
        <Route path='/admin/kategori' element={<IndexKategori></IndexKategori>}></Route>
        <Route path='/admin/promo' element={<IndexPromo></IndexPromo>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

