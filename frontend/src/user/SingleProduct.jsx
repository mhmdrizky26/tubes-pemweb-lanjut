import React from 'react'
import { Link } from 'react-router-dom';
import UserHeader from '../components/UserHeader'
import UserFooter from '../components/UserFooter'
import UserPreLoader from '../components/UserPreLoader'
import Slider from "react-slick";

const SingleProduct = () => {
  return (
    <div>
      <UserPreLoader></UserPreLoader>
      <UserHeader></UserHeader>
      {/* <!-- breadcrumb-section --> */}
      <div className="breadcrumb-section breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="breadcrumb-text">
                <p>See more Details</p>
                <h1>Single Product</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- end breadcrumb section --> */}

      {/* <!-- single product --> */}
      <div className="single-product mt-150 mb-150">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div className="single-product-img">
                <img src="assets/img/products/product-img-5.jpg" alt=""/>
              </div>
            </div>
            <div className="col-md-7">
              <div className="single-product-content">
                <h3>Green apples have polyphenols</h3>
                <p className="single-product-pricing"><span>Per Kg</span> $50</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta sint dignissimos, rem commodi cum voluptatem quae reprehenderit repudiandae ea tempora incidunt ipsa, quisquam animi perferendis eos eum modi! Tempora, earum.</p>
                <div className="single-product-form">
                  <form action="index.html">
                    <input type="number" placeholder="0"/>
                  </form>

                  <Link to="/cart" className="cart-btn">
                    <i className="fas fa-shopping-cart"></i> Add to Cart
                  </Link>                  
                  <p><strong>Categories: </strong>Fruits, Organic</p>
                </div>
                <h4>Share:</h4>
                <ul className="product-share">
                  <li><a href=""><i className="fab fa-facebook-f"></i></a></li>
                  <li><a href=""><i className="fab fa-twitter"></i></a></li>
                  <li><a href=""><i className="fab fa-google-plus-g"></i></a></li>
                  <li><a href=""><i className="fab fa-linkedin"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- end single product --> */}

      {/* <!-- more products --> */}
      <div className="more-products mb-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="section-title">	
                <h3><span className="orange-text">Related</span> Products</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, fuga quas itaque eveniet beatae optio.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 text-center">
              <div className="single-product-item">
                <div className="product-image">
                  <a href="single-product.html"><img src="assets/img/products/product-img-1.jpg" alt=""/></a>
                </div>
                <h3>Strawberry</h3>
                <p className="product-price"><span>Per Kg</span> 85$ </p>
                <a href="cart.html" className="cart-btn"><i className="fas fa-shopping-cart"></i> Add to Cart</a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 text-center">
              <div className="single-product-item">
                <div className="product-image">
                  <a href="single-product.html"><img src="assets/img/products/product-img-2.jpg" alt=""/></a>
                </div>
                <h3>Berry</h3>
                <p className="product-price"><span>Per Kg</span> 70$ </p>
                <a href="cart.html" className="cart-btn"><i className="fas fa-shopping-cart"></i> Add to Cart</a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 offset-lg-0 offset-md-3 text-center">
              <div className="single-product-item">
                <div className="product-image">
                  <a href="single-product.html"><img src="assets/img/products/product-img-3.jpg" alt=""/></a>
                </div>
                <h3>Lemon</h3>
                <p className="product-price"><span>Per Kg</span> 35$ </p>
                <a href="cart.html" className="cart-btn"><i className="fas fa-shopping-cart"></i> Add to Cart</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- end more products --> */}

      {/* <!-- logo carousel --> */}
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
                  <div className="single-logo-item">
                    <img src="assets/img/logo.png" alt="" />
                  </div>
                  <div className="single-logo-item">
                    <img src="assets/img/logo.png" alt="" />
                  </div>
                  <div className="single-logo-item">
                    <img src="assets/img/logo.png" alt="" />
                  </div>
                  <div className="single-logo-item">
                    <img src="assets/img/logo.png" alt="" />
                  </div>
                  <div className="single-logo-item">
                    <img src="assets/img/logo.png" alt="" />
                  </div>
                </Slider>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- end logo carousel --> */}

      <UserFooter></UserFooter>
    </div>
  )
}

export default SingleProduct
