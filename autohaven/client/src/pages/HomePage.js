import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-5 mb-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="display-4 fw-bold">Find Your Dream Car</h1>
              <p className="lead">
                Browse our selection of quality pre-owned vehicles at unbeatable prices.
              </p>
              <Link to="/cars" className="btn btn-light btn-lg">
                Browse Cars
              </Link>
            </div>
            <div className="col-md-6">
              <img
                src="https://via.placeholder.com/600x400"
                alt="Car showcase"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Cars Section */}
      <div className="container mb-5">
        <h2 className="text-center mb-4">Featured Cars</h2>
        <div className="row">
          {/* Car 1 */}
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src="https://via.placeholder.com/300x200"
                className="card-img-top"
                alt="Featured car"
              />
              <div className="card-body">
                <h5 className="card-title">2022 Toyota Camry</h5>
                <p className="text-primary h5">$25,999</p>
                <p className="card-text">
                  Low mileage, excellent condition, loaded with features.
                </p>
                <Link to="/cars/1" className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>

          {/* Car 2 */}
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src="https://via.placeholder.com/300x200"
                className="card-img-top"
                alt="Featured car"
              />
              <div className="card-body">
                <h5 className="card-title">2023 Honda Accord</h5>
                <p className="text-primary h5">$28,500</p>
                <p className="card-text">
                  Sleek design, fuel efficient, and packed with technology.
                </p>
                <Link to="/cars/2" className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>

          {/* Car 3 */}
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src="https://via.placeholder.com/300x200"
                className="card-img-top"
                alt="Featured car"
              />
              <div className="card-body">
                <h5 className="card-title">2021 Ford Mustang</h5>
                <p className="text-primary h5">$32,750</p>
                <p className="card-text">
                  Powerful engine, sporty design, and thrilling performance.
                </p>
                <Link to="/cars/3" className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <Link to="/cars" className="btn btn-outline-primary">
            View All Cars
          </Link>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-light py-5 mb-5">
        <div className="container">
          <h2 className="text-center mb-4">Why Choose AutoHaven?</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card border-0 bg-transparent">
                <div className="card-body text-center">
                  <i className="bi bi-shield-check display-4 text-primary mb-3"></i>
                  <h5 className="card-title">Quality Assurance</h5>
                  <p className="card-text">
                    All our vehicles undergo a rigorous 150-point inspection.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card border-0 bg-transparent">
                <div className="card-body text-center">
                  <i className="bi bi-cash-coin display-4 text-primary mb-3"></i>
                  <h5 className="card-title">Competitive Pricing</h5>
                  <p className="card-text">
                    We offer the best prices in the market, guaranteed.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card border-0 bg-transparent">
                <div className="card-body text-center">
                  <i className="bi bi-headset display-4 text-primary mb-3"></i>
                  <h5 className="card-title">Excellent Support</h5>
                  <p className="card-text">
                    Our customer service team is available 7 days a week.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
