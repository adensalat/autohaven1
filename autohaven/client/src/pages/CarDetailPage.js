import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const CarDetailPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const { data } = await axios.get(`/api/cars/${id}`);
        if (data.success) {
          setCar(data.data);
        }
      } catch (error) {
        setError('Failed to fetch car details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  if (!car) {
    return (
      <div className="alert alert-warning" role="alert">
        Car not found. <Link to="/cars">Go back to car listings</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/cars" className="btn btn-outline-primary mb-4">
        Back to Cars
      </Link>
      
      <div className="card mb-4">
        <div className="row g-0">
          <div className="col-md-6">
            <img
              src={car.imageUrl}
              className="img-fluid rounded-start"
              alt={`${car.year} ${car.make} ${car.model}`}
              style={{ maxHeight: '500px', width: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h2 className="card-title">
                {car.year} {car.make} {car.model}
              </h2>
              <h3 className="text-primary">${car.price.toLocaleString()}</h3>
              
              <div className="mb-3">
                <span className="badge bg-secondary me-2">{car.transmission}</span>
                <span className="badge bg-secondary me-2">{car.fuelType}</span>
                <span className="badge bg-secondary">{car.mileage.toLocaleString()} miles</span>
              </div>
              
              <hr />
              
              <h4>Description</h4>
              <p className="card-text">{car.description}</p>
              
              <hr />
              
              <h4>Features</h4>
              <ul>
                {car.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              
              <div className="d-grid gap-2 mt-4">
                <button className="btn btn-primary">Contact Seller</button>
                <button className="btn btn-outline-primary">Schedule Test Drive</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Vehicle Details</h4>
          <div className="row">
            <div className="col-md-6">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  <span>Make:</span>
                  <span className="fw-bold">{car.make}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Model:</span>
                  <span className="fw-bold">{car.model}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Year:</span>
                  <span className="fw-bold">{car.year}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Mileage:</span>
                  <span className="fw-bold">{car.mileage.toLocaleString()} miles</span>
                </li>
              </ul>
            </div>
            <div className="col-md-6">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  <span>Fuel Type:</span>
                  <span className="fw-bold">{car.fuelType}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Transmission:</span>
                  <span className="fw-bold">{car.transmission}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Availability:</span>
                  <span className="fw-bold">
                    {car.isAvailable ? (
                      <span className="text-success">Available</span>
                    ) : (
                      <span className="text-danger">Sold</span>
                    )}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Listed:</span>
                  <span className="fw-bold">
                    {new Date(car.createdAt).toLocaleDateString()}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;