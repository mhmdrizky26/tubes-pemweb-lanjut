import React from 'react'
import { Link } from 'react-router-dom';
import UserHeader from '../components/UserHeader'
import UserFooter from '../components/UserFooter'
import UserPreLoader from '../components/UserPreLoader'
import Slider from "react-slick";

const Page404 = () => {
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
                <p>Fresh and Organic</p>
                <h1>404 - Not Found</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- end breadcrumb section -->
      <!-- error section --> */}
      <div className="full-height-section error-section">
        <div className="full-height-tablecell">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 text-center">
                <div className="error-text">
                  <i className="far fa-sad-cry"></i>
                  <h1>Oops! Not Found.</h1>
                  <p>The page you requested for is not found.</p>
                  <a href="index.html" className="boxed-btn">Back to Home</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- end error section -->
      <!-- logo carousel --> */}
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

export default Page404
