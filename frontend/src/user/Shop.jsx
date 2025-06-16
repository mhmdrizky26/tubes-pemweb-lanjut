import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import UserHeader from '../components/UserHeader'
import UserFooter from '../components/UserFooter'
import UserPreLoader from '../components/UserPreLoader'
import Slider from "react-slick";
import axios from 'axios';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));

    axios.get('http://localhost:5000/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(product => product.category?.category_name === activeCategory);

  return (
    <div>
      <UserPreLoader></UserPreLoader>
      <UserHeader></UserHeader>
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

      <div className="product-section mt-150 mb-150">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="product-filters">
                <ul>
                  <li className={activeCategory === 'all' ? 'active' : ''} onClick={() => setActiveCategory('all')}>All</li>
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
            {filteredProducts.map(product => (
              <div className="col-lg-4 col-md-6 text-center" key={product.id}>
                <div className="single-product-item">
                  <div className="product-image">
                    <Link to={`/product/${product.id}`}><img src={`http://localhost:5000${product.image_url}`} alt={product.product_name} /></Link>
                  </div>
                  <h3>{product.product_name}</h3>
                  <p className="product-price"><span>Per Item</span> Rp{parseInt(product.price).toLocaleString()}</p>
                  <Link to="/cart" className="cart-btn"><i className="fas fa-shopping-cart"></i> Add to Cart</Link>
                </div>
              </div>
            ))}
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
                  {
                    breakpoint: 1024,
                    settings: { slidesToShow: 3 }
                  },
                  {
                    breakpoint: 768,
                    settings: { slidesToShow: 2 }
                  },
                  {
                    breakpoint: 480,
                    settings: { slidesToShow: 1 }
                  }
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

      <UserFooter></UserFooter>
    </div>
  )
}

export default Shop
