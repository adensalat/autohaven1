import React from 'react';
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
  // Add default image in case imageUrl is missing
  const defaultImage = 'https://via.placeholder.com/400x200?text=No+Image+Available';
  
  // Debug log to see what car data we're receiving
  console.log('Car data in CarCard:', car);
  
  // Check if car object is valid
  if (!car || typeof car !== 'object') {
    return (
      <div className="card h-100 shadow-sm">
        <div className="card-body text-center">
          <p className="text-danger">Invalid car data</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="card h-100 shadow-sm">
      <img
        src={car.imageUrl || defaultImage}
        className="card-img-top"
        alt={`${car.year || ''} ${car.make || ''} ${car.model || ''}`}
        style={{ height: '200px', objectFit: 'cover' }}
        onError={(e) => { e.target.src = defaultImage; }}
      />
      <div className="card-body">
        <h5 className="card-title">
          {car.year || 'N/A'} {car.make || 'Unknown'} {car.model || 'Model'}
        </h5>
        <div className="d-flex justify-content-between mb-3">
          <span className="h5 text-primary">
            ${typeof car.price === 'number' ? car.price.toLocaleString() : 'N/A'}
          </span>
          <span className="text-muted">
            {typeof car.mileage === 'number' ? car.mileage.toLocaleString() : 'N/A'} miles
          </span>
        </div>
        <div className="mb-3">
          {car.transmission && (
            <span className="badge bg-secondary me-2">{car.transmission}</span>
          )}
          {car.fuelType && (
            <span className="badge bg-secondary">{car.fuelType}</span>
          )}
        </div>
        <p className="card-text text-truncate">{car.description || 'No description available'}</p>
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