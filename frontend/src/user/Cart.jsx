import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Tambah useNavigate jika perlu redirect
import UserHeader from '../components/UserHeader';
import UserFooter from '../components/UserFooter';
import UserPreLoader from '../components/UserPreLoader';
import Slider from "react-slick";
import axios from 'axios';

const Cart = () => {
  const shippingCost = 15000;

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [transactionId, setTransactionId] = useState(null);

  const navigate = useNavigate(); // Untuk redirect jika user belum login

  // Dapatkan ID pengguna dari localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.id : null;

  const handleCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/checkout', { user_id: userId });
      alert("Checkout berhasil! Transaksi ID: " + response.data.transaction_id);
      setTransactionId(response.data.transaction_id);
      setShowModal(true); // Tampilkan modal
      setCartItems([]); // Kosongkan cart di UI
    } catch (err) {
      console.error("Checkout gagal:", err);
      alert("Gagal checkout. Silakan coba lagi.");
    }
  };  

  useEffect(() => {
    // Redirect jika user belum login
    if (!userId) {
      alert("Please log in to view your cart.");
      navigate('/login');
      return; // Hentikan eksekusi useEffect jika tidak ada userId
    }

    const fetchCartItems = async () => {
      try {
        setLoading(true);
        // Mengambil keranjang berdasarkan user_id
        const response = await axios.get(`http://localhost:5000/carts/user/${userId}`);
        setCartItems(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching cart items:", err);
        if (err.response && err.response.status === 404) {
          setError("Your cart is empty."); // Pesan lebih spesifik untuk keranjang kosong
        } else {
          setError("Failed to load cart items. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [userId, navigate]); // Dependensi userId dan navigate

  const handleRemoveItem = async (cartItemId) => {
    try {
      await axios.delete(`http://localhost:5000/carts/${cartItemId}`);
      alert("Item removed from cart!");
      // Perbarui state keranjang setelah item dihapus
      setCartItems(cartItems.filter(item => item.id !== cartItemId));
    } catch (err) {
      console.error("Error removing item from cart:", err);
      alert("Failed to remove item from cart. Please try again.");
    }
  };

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return; // Jangan biarkan kuantitas kurang dari 1

    try {
      await axios.patch(`http://localhost:5000/carts/${cartItemId}`, { quantity: newQuantity });
      // Perbarui state kuantitas di frontend
      setCartItems(cartItems.map(item =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      ));
    } catch (err) {
      console.error("Error updating quantity:", err);
      alert("Failed to update quantity. Please try again.");
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = Number(item.product?.price) || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + shippingCost;
  };

  if (loading) {
    return <UserPreLoader />;
  }

  return (
    <div>
      <UserPreLoader /> {/* Ini akan disembunyikan otomatis oleh state loading */}
      <UserHeader />
      {/* */}
      <div className="breadcrumb-section breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="breadcrumb-text">
                <p>Fresh and Organic</p>
                <h1>Cart</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* */}

      {/* */}
      <div className="cart-section mt-150 mb-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="cart-table-wrap">
                {error ? (
                  <div className="alert alert-info text-center">{error}</div>
                ) : cartItems.length === 0 ? (
                  <div className="alert alert-info text-center">Your cart is empty. Start <Link to="/shop">shopping now</Link>!</div>
                ) : (
                  <table className="cart-table">
                    <thead className="cart-table-head">
                      <tr className="table-head-row">
                        <th className="product-remove"></th>
                        <th className="product-image">Product Image</th>
                        <th className="product-name">Product Name</th>
                        <th className="product-price">Price</th>
                        <th className="product-quantity">Quantity</th>
                        <th className="product-total">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map(item => (
                        <tr className="table-body-row" key={item.id}>
                          <td className="product-remove">
                            <button onClick={() => handleRemoveItem(item.id)}><i className="far fa-window-close"></i></button>
                          </td>
                          <td className="product-image">
                            <img src={`http://localhost:5000${item.product?.image_url || '/path/to/default/image.jpg'}`} alt={item.product?.product_name || 'Product Image'} />
                          </td>
                          <td className="product-name">{item.product?.product_name || 'N/A'}</td>
                          <td className="product-price">Rp{(Number(item.product?.price) || 0).toLocaleString()}</td>
                          <td className="product-quantity">
                            <input
                              type="number"
                              placeholder="0"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
                              min="1"
                            />
                          </td>
                          <td className="product-total">Rp{((Number(item.product?.price) || 0) * item.quantity).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>

                  </table>
                )}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="total-section">
                <table className="total-table">
                  <thead className="total-table-head">
                    <tr className="table-total-row">
                      <th>Total</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="total-data">
                      <td><strong>Subtotal: </strong></td>
                      <td>Rp{calculateSubtotal().toLocaleString()}</td>
                    </tr>
                    <tr className="total-data">
                      <td><strong>Shipping: </strong></td>
                      <td>Rp{shippingCost.toLocaleString()}</td>
                    </tr>
                    <tr className="total-data">
                      <td><strong>Total: </strong></td>
                      <td>Rp{calculateTotal().toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="cart-buttons">
                  <Link to="/shop" className="boxed-btn">Update Cart</Link> {/* Biasanya tombol ini untuk update quantity */}
                  <button onClick={handleCheckout} className="boxed-btn black">Check Out</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* */}

      {/* */}
      <div className="logo-carousel-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <Slider
                slidesToShow={5}
                slidesToScroll={1}
                autoplay={true}
                autoplaySpeed={2000}
                infinite={true}
                arrows={false}
                responsive={[
                  { breakpoint: 1024, settings: { slidesToShow: 3 } },
                  { breakpoint: 768, settings: { slidesToShow: 2 } },
                  { breakpoint: 480, settings: { slidesToShow: 1 } }
                ]}
              >
                {[...Array(5)].map((_, i) => (
                  <div className="single-logo-item" key={i}>
                    <img src="assets/img/logo.png" alt="logo" />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      {/* */}

      {showModal && (
        <div className="modal-backdrop" style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 9999
        }}>
          <div style={{
            backgroundColor: 'white', padding: '30px', borderRadius: '10px',
            width: '90%', maxWidth: '500px', textAlign: 'center'
          }}>
            <h3>Checkout Berhasil!</h3>
            <p>Terima kasih telah berbelanja.</p>
            <p><strong>ID Transaksi:</strong> {transactionId}</p>
            <p><strong>Total:</strong> Rp{calculateTotal().toLocaleString()}</p>
            <button onClick={() => setShowModal(false)} className="boxed-btn mt-3">OK</button>
          </div>
        </div>
      )}

      <UserFooter />
    </div>
  );
};

export default Cart;