import React from 'react';
import { Link } from 'react-router-dom';
import UserHeader from '../components/UserHeader';
import UserFooter from '../components/UserFooter';
import UserPreLoader from '../components/UserPreLoader';

const Contact = () => {
  return (
    <div>
      <UserPreLoader />
      <UserHeader />

      {/* Breadcrumb */}
      <div className="breadcrumb-section breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="breadcrumb-text">
                <p>Get 24/7 Support</p>
                <h1>Contact Us</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-from-section py-0">
        <div className="px-0">
          <div className="card shadow p-4 " style={{ backgroundColor: '#fff' }}>
            <div className="row text-center">
              <div className="col-lg-4 col-md-6 mb-3 mb-lg-0">
                <div>
                  <h5 className="fw-bold text-warning">
                    <i className="fas fa-map-marker-alt me-2"></i>Alamat Toko
                  </h5>
                  <p className="mb-1">Jalan Raya Pertanian No. 123</p>
                  <p className="mb-0">Yogyakarta, Indonesia</p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 mb-3 mb-lg-0">
                <div>
                  <h5 className="fw-bold text-warning">
                    <i className="far fa-clock me-2"></i>Jam Operasional
                  </h5>
                  <p className="mb-1">Senin - Jumat: 08.00 - 20.00</p>
                  <p className="mb-0">Sabtu - Minggu: 09.00 - 18.00</p>
                </div>
              </div>

              <div className="col-lg-4 col-md-12">
                <div>
                  <h5 className="fw-bold text-warning">
                    <i className="fas fa-envelope me-2"></i>Kontak
                  </h5>
                  <p className="mb-1">Telepon: 0812 3456 7890</p>
                  <p className="mb-0">Email: support@marketagri.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Find Location */}
      <div className="find-location blue-bg py-">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center text-white">
              <p><i className="fas fa-map-marker-alt"></i> Temukan Lokasi Kami</p>
            </div>
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="embed-responsive embed-responsive-21by9">
        <iframe
          title="google-map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26432.42324808999!2d-118.34398767954286!3d34.09378509738966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bf07045279bf%3A0xf67a9a6797bdfae4!2sHollywood%2C%20Los%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2sbd!4v1576846473265!5m2!1sen!2sbd"
          width="100%"
          height="450"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          className="embed-responsive-item"
        ></iframe>
      </div>

      <UserFooter />
    </div>
  );
};

export default Contact;
