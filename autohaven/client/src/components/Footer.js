import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>AutoHaven</h5>
            <p>Your trusted source for quality pre-owned vehicles.</p>
          </div>
          <div className="col-md-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/cars" className="text-white">Cars</a></li>
              <li><a href="/contact" className="text-white">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Contact Us</h5>
            <address>
              <p>123 Car Street<br />Auto City, AC 12345</p>
              <p>Phone: (123) 456-7890<br />Email: info@autohaven.com</p>
            </address>
          </div>
        </div>
        <div className="row">
          <div className="col text-center pt-3">
            <p>&copy; {new Date().getFullYear()} AutoHaven. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;