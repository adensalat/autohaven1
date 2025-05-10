import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-5 mb-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-12">
              <h1 className="display-4 fw-bold">Find Your Dream Car</h1>
              <p className="lead">
                Browse our selection of quality pre-owned vehicles at unbeatable prices.
              </p>
              <Link to="/cars" className="btn btn-light btn-lg">
                Browse Cars
              </Link>
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
                src="https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG95b3RhJTIwY2Ftcnl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                className="card-img-top"
                alt="2022 Toyota Camry"
                style={{ height: '200px', objectFit: 'cover' }}
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
                src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVzbGElMjBtb2RlbCUyMDN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                className="card-img-top"
                alt="2023 Tesla Model 3"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">2023 Tesla Model 3</h5>
                <p className="text-primary h5">$45,000</p>
                <p className="card-text">
                  Nearly new Tesla Model 3 with autopilot capabilities. Features include premium interior, glass roof, and long-range battery.
                </p>
                <Link to="/cars/4" className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>

          {/* Car 3 */}
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9yZCUyMG11c3Rhbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                className="card-img-top"
                alt="2021 Ford Mustang"
                style={{ height: '200px', objectFit: 'cover' }}
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
