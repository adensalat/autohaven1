import React from 'react';
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
  return (
    <div className="card h-100 shadow-sm">
      <img
        src={car.imageUrl}
        className="card-img-top"
        alt={`${car.year} ${car.make} ${car.model}`}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body">
        <h5 className="card-title">
          {car.year} {car.make} {car.model}
        </h5>
        <div className="d-flex justify-content-between mb-3">
          <span className="h5 text-primary">${car.price.toLocaleString()}</span>
          <span className="text-muted">{car.mileage.toLocaleString()} miles</span>
        </div>
        <div className="mb-3">
          <span className="badge bg-secondary me-2">{car.transmission}</span>
          <span className="badge bg-secondary">{car.fuelType}</span>
        </div>
        <p className="card-text text-truncate">{car.description}</p>
      </div>
      <div className="card-footer bg-white">
        <Link to={`/cars/${car._id}`} className="btn btn-primary w-100">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CarCard;