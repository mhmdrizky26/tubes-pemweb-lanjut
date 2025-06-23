import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserHeader from '../components/UserHeader';
import UserFooter from '../components/UserFooter';
import UserPreLoader from '../components/UserPreLoader';
import Slider from "react-slick";
import axios from 'axios';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.id : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await axios.get('http://localhost:5000/products');
        const categoriesRes = await axios.get('http://localhost:5000/categories');
        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data produk/kategori.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(product => product.category?.category_name === activeCategory);

  const handleAddToCart = async (productId) => {
    if (!userId) {
      alert("Silakan login terlebih dahulu.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/carts', {
        user_id: userId,
        product_id: productId,
        quantity: 1
      });
      alert(response.data.message);
    } catch (err) {
      console.error("Gagal menambahkan ke keranjang:", err);
      alert(err.response?.data?.message || "Terjadi kesalahan.");
    }
  };

  if (loading) return <UserPreLoader />;
  if (error) return (
    <div>
      <UserHeader />
      <div className="product-section mt-150 mb-150">
        <div className="container text-center">
          <p className="alert alert-danger">{error}</p>
          <button onClick={() => window.location.reload()} className="btn btn-primary">Muat Ulang</button>
        </div>
      </div>
      <UserFooter />
    </div>
  );

  return (
    <div>
      <UserPreLoader />
      <UserHeader />

      {/* breadcrumb-section */}
      <div className="breadcrumb-section breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="breadcrumb-text">
                <p>Fresh and Organic</p>
                <h1>Shop</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* product section */}
      <div className="product-section mt-150 mb-150">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="product-filters">
                <ul>
                  <li
                    className={activeCategory === 'all' ? 'active' : ''}
                    onClick={() => setActiveCategory('all')}
                  >
                    All
                  </li>
                  {categories.map(cat => (
                    <li
                      key={cat.id}
                      className={activeCategory === cat.category_name ? 'active' : ''}
                      onClick={() => setActiveCategory(cat.category_name)}
                    >
                      {cat.category_name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="row product-lists">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <div className="col-lg-4 col-md-6 text-center" key={product.id}>
                  <div className="single-product-item">
                    <div className="product-image">
                      <Link to={`/product/${product.id}`}>
                        <img src={`http://localhost:5000${product.image_url}`} alt={product.product_name} />
                      </Link>
                    </div>
                    <h3>{product.product_name}</h3>
                    <p className="product-price"><span>Per Item</span> Rp{parseInt(product.price).toLocaleString()}</p>
                    <button onClick={() => handleAddToCart(product.id)} className="cart-btn">
                      <i className="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>Produk tidak ditemukan untuk kategori ini.</p>
              </div>
            )}
          </div>

          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="pagination-wrap">
                <ul>
                  <li><a href="#">Prev</a></li>
                  <li><a className="active" href="#">1</a></li>
                  <li><a href="#">2</a></li>
                  <li><a href="#">3</a></li>
                  <li><a href="#">Next</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* logo carousel */}
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

      <UserFooter />
    </div>
  );
};

export default Shop;
