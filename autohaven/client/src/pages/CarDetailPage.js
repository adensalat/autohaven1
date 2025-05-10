import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const CarDetailPage = () => {
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sample car data (hardcoded) - same as in CarListingPage
  const sampleCars = [
    {
      _id: '1',
      make: 'Toyota',
      model: 'Camry',
      year: 2022,
      price: 25000,
      mileage: 15000,
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG95b3RhJTIwY2Ftcnl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      description: 'Well-maintained Toyota Camry with low mileage. Features include power windows, cruise control, and backup camera.',
      features: ['Backup Camera', 'Bluetooth', 'Cruise Control', 'Power Windows'],
      isAvailable: true,
      createdAt: new Date('2025-04-15').toISOString()
    },
    {
      _id: '2',
      make: 'Ford',
      model: 'Focus',
      year: 2021,
      price: 23500,
      mileage: 20000,
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
      description: 'Sporty Ford Focus with excellent handling and fuel efficiency. Features include SYNC infotainment, premium audio, and advanced driver assistance.',
      features: ['SYNC Infotainment', 'Premium Audio', 'Lane Keeping System', 'Adaptive Cruise Control'],
      isAvailable: true,
      createdAt: new Date('2025-04-20').toISOString()
    },
    {
      _id: '3',
      make: 'Ford',
      model: 'Mustang',
      year: 2020,
      price: 35000,
      mileage: 25000,
      fuelType: 'Gasoline',
      transmission: 'Manual',
      imageUrl: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9yZCUyMG11c3Rhbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      description: 'Sporty Ford Mustang with powerful engine. Comes with premium sound system, sport mode, and performance tires.',
      features: ['Premium Sound System', 'Sport Mode', 'Performance Tires', 'Rear Spoiler'],
      isAvailable: true,
      createdAt: new Date('2025-04-10').toISOString()
    },
    {
      _id: '4',
      make: 'Tesla',
      model: 'Model 3',
      year: 2023,
      price: 45000,
      mileage: 5000,
      fuelType: 'Electric',
      transmission: 'Automatic',
      imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVzbGElMjBtb2RlbCUyMDN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      description: 'Nearly new Tesla Model 3 with autopilot capabilities. Features include premium interior, glass roof, and long-range battery.',
      features: ['Autopilot', 'Premium Interior', 'Glass Roof', 'Long Range Battery'],
      isAvailable: true,
      createdAt: new Date('2025-05-01').toISOString()
    },
    {
      _id: '5',
      make: 'BMW',
      model: '3 Series',
      year: 2021,
      price: 38000,
      mileage: 18000,
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym13JTIwM3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
      description: 'Luxury BMW 3 Series with premium features. Includes heated seats, navigation system, and premium sound system.',
      features: ['Heated Seats', 'Navigation System', 'Premium Sound System', 'Parking Sensors'],
      isAvailable: true,
      createdAt: new Date('2025-04-25').toISOString()
    },
    {
      _id: '6',
      make: 'Mercedes-Benz',
      model: 'C-Class',
      year: 2022,
      price: 42000,
      mileage: 12000,
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      imageUrl: 'https://images.unsplash.com/photo-1583267746897-2cf415887172?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGV4dXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      description: 'Elegant Mercedes-Benz C-Class with luxury features. Includes leather interior, panoramic sunroof, and advanced driver assistance.',
      features: ['Leather Interior', 'Panoramic Sunroof', 'Driver Assistance Package', 'Ambient Lighting'],
      isAvailable: true,
      createdAt: new Date('2025-04-18').toISOString()
    },
    {
      _id: '7',
      make: 'Audi',
      model: 'A4',
      year: 2023,
      price: 39500,
      mileage: 8000,
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      imageUrl: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9uZGElMjBhY2NvcmR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      description: 'Sophisticated Audi A4 with cutting-edge technology. Features include virtual cockpit, premium sound system, and quattro all-wheel drive.',
      features: ['Virtual Cockpit', 'Premium Sound System', 'Quattro All-Wheel Drive', 'LED Headlights'],
      isAvailable: true,
      createdAt: new Date('2025-04-22').toISOString()
    },
    {
      _id: '8',
      make: 'Ferrari',
      model: '488',
      year: 2022,
      price: 325000,
      mileage: 5000,
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      imageUrl: 'https://images.unsplash.com/photo-1606220838315-056192d5e927?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
      description: 'Stunning Ferrari 488 with breathtaking performance and iconic Italian design. Features a twin-turbocharged V8 engine, carbon fiber components, and race-inspired cockpit.',
      features: ['Twin-Turbo V8 Engine', 'Carbon Fiber Components', 'Ceramic Brakes', 'Sport Exhaust System'],
      isAvailable: true,
      createdAt: new Date('2025-04-12').toISOString()
    },
    {
      _id: '9',
      make: 'Porsche',
      model: '911',
      year: 2021,
      price: 98000,
      mileage: 7500,
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      imageUrl: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9yc2NoZSUyMDkxMXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
      description: 'Iconic Porsche 911 with breathtaking performance and handling. Features include sport chrono package, premium sound system, and adaptive sport seats.',
      features: ['Sport Chrono Package', 'Bose Sound System', 'Adaptive Sport Seats', 'Sport Exhaust System'],
      isAvailable: true,
      createdAt: new Date('2025-04-05').toISOString()
    }
  ];

  // Handle buy button click
  const handleBuyClick = () => {
    if (!currentUser) {
      navigate('/login');
    } else {
      // If user is logged in, redirect to checkout page
      navigate('/checkout/' + id);
    }
  };

  // Handle test drive button click
  const handleTestDriveClick = () => {
    if (!currentUser) {
      navigate('/login');
    } else {
      // For now, we'll just show an alert
      // In a real app, this would open a modal or navigate to a scheduling page
      alert(`Test drive scheduled for ${car.year} ${car.make} ${car.model}! Our team will contact you shortly.`);
      // You could also implement a more sophisticated scheduling system here
    }
  };

  useEffect(() => {
    // Find the car with the matching ID from our sample data
    const foundCar = sampleCars.find(car => car._id === id);
    
    if (foundCar) {
      setCar(foundCar);
    } else {
      setError('Car not found.');
    }
    
    setLoading(false);
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
                <button 
                  className="btn btn-primary" 
                  onClick={handleBuyClick}
                >
                  {currentUser ? 'Buy Now' : 'Login to Buy'}
                </button>
                <button 
                  className="btn btn-outline-primary"
                  onClick={handleTestDriveClick}
                >
                  {currentUser ? 'Schedule Test Drive' : 'Login to Schedule'}
                </button>
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