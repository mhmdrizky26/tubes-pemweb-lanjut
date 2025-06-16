import React from 'react'
import { Link } from 'react-router-dom'
import UserHeader from '../components/UserHeader'
import UserFooter from '../components/UserFooter'
import UserPreLoader from '../components/UserPreLoader'
import Slider from "react-slick";

const About = () => {
  return (
    <div>
        <UserHeader></UserHeader>
        <UserPreLoader></UserPreLoader>
      	{/* <!-- breadcrumb-section --> */}
        <div className="breadcrumb-section breadcrumb-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 text-center">
                <div className="breadcrumb-text">
                  <p>We sale farming needs</p>
                  <h1>About Us</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end breadcrumb section --> */}

        {/* <!-- featured section --> */}
        <div className="feature-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <div className="featured-text">
                  <h2 className="pb-3">Why <span className="orange-text">FarmLink</span></h2>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 mb-4 mb-md-5">
                      <div className="list-box d-flex">
                        <div className="list-icon">
                          <i className="fas fa-shipping-fast"></i>
                        </div>
                        <div className="content">
                          <h3>Home Delivery</h3>
                          <p>sit voluptatem accusantium dolore mque laudantium, totam rem aperiam, eaque ipsa quae ab illo.</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 mb-5 mb-md-5">
                      <div className="list-box d-flex">
                        <div className="list-icon">
                          <i className="fas fa-money-bill-alt"></i>
                        </div>
                        <div className="content">
                          <h3>Best Price</h3>
                          <p>sit voluptatem accusantium dolore mque laudantium, totam rem aperiam, eaque ipsa quae ab illo.</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 mb-5 mb-md-5">
                      <div className="list-box d-flex">
                        <div className="list-icon">
                          <i className="fas fa-briefcase"></i>
                        </div>
                        <div className="content">
                          <h3>Custom Box</h3>
                          <p>sit voluptatem accusantium dolore mque laudantium, totam rem aperiam, eaque ipsa quae ab illo.</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="list-box d-flex">
                        <div className="list-icon">
                          <i className="fas fa-sync-alt"></i>
                        </div>
                        <div className="content">
                          <h3>Quick Refund</h3>
                          <p>sit voluptatem accusantium dolore mque laudantium, totam rem aperiam, eaque ipsa quae ab illo.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end featured section --> */}

        {/* <!-- shop banner --> */}
        <section className="shop-banner">
            <div className="container">
                <h3>December sale is on! <br/> with big <span className="orange-text">Discount...</span></h3>
                  <div className="sale-percent"><span>Sale! <br/> Upto</span>50% <span>off</span></div>
                  <Link to='/shop' className="cart-btn btn-lg">Shop Now</Link>
              </div>
          </section>
        {/* <!-- end shop banner --> */}

        {/* <!-- team section --> */}
        <div className="mt-150">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 text-center">
                <div className="section-title">
                  <h3>Our <span className="orange-text">Team</span></h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, fuga quas itaque eveniet beatae optio.</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="single-team-item">
                  <div className="team-bg team-bg-1"></div>
                  <h4>Jimmy Doe <span>Farmer</span></h4>
                  <ul className="social-link-team">
                    <li><a href="#" target="_blank"><i className="fab fa-facebook-f"></i></a></li>
                    <li><a href="#" target="_blank"><i className="fab fa-twitter"></i></a></li>
                    <li><a href="#" target="_blank"><i className="fab fa-instagram"></i></a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="single-team-item">
                  <div className="team-bg team-bg-2"></div>
                  <h4>Marry Doe <span>Farmer</span></h4>
                  <ul className="social-link-team">
                    <li><a href="#" target="_blank"><i className="fab fa-facebook-f"></i></a></li>
                    <li><a href="#" target="_blank"><i className="fab fa-twitter"></i></a></li>
                    <li><a href="#" target="_blank"><i className="fab fa-instagram"></i></a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 offset-md-3 offset-lg-0">
                <div className="single-team-item">
                  <div className="team-bg team-bg-3"></div>
                  <h4>Simon Joe <span>Farmer</span></h4>
                  <ul className="social-link-team">
                    <li><a href="#" target="_blank"><i className="fab fa-facebook-f"></i></a></li>
                    <li><a href="#" target="_blank"><i className="fab fa-twitter"></i></a></li>
                    <li><a href="#" target="_blank"><i className="fab fa-instagram"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end team section --> */}

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

export default About
