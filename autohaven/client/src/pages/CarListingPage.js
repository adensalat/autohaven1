import React, { useState, useEffect } from 'react';
import CarCard from '../components/CarCard';
import SearchFilter from '../components/SearchFilter';

const CarListingPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredCars, setFilteredCars] = useState([]);

  // Sample car data (hardcoded)
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
      isAvailable: true
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
      isAvailable: true
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
      isAvailable: true
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
      isAvailable: true
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
      isAvailable: true
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
      isAvailable: true
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
      isAvailable: true
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
      isAvailable: true
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
      isAvailable: true
    }
  ];

  useEffect(() => {
    // Use the sample car data instead of fetching from API
    setCars(sampleCars);
    setFilteredCars(sampleCars);
    setLoading(false);
  }, []);

  const handleSearch = (filters) => {
    let results = [...cars];

    if (filters.make) {
      results = results.filter(car =>
        car.make.toLowerCase().includes(filters.make.toLowerCase())
      );
    }

    if (filters.priceMin) {
      results = results.filter(car => car.price >= Number(filters.priceMin));
    }

    if (filters.priceMax) {
      results = results.filter(car => car.price <= Number(filters.priceMax));
    }

    if (filters.yearMin) {
      results = results.filter(car => car.year >= Number(filters.yearMin));
    }

    if (filters.yearMax) {
      results = results.filter(car => car.year <= Number(filters.yearMax));
    }

    setFilteredCars(results);
  };

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

  return (
    <div>
      <h1 className="mb-4">Available Cars</h1>
      
      <SearchFilter onSearch={handleSearch} />
      
      {filteredCars.length === 0 ? (
        <div className="alert alert-info">
          No cars match your search criteria. Please try different filters.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredCars.map((car) => (
            <div className="col" key={car._id}>
              <CarCard car={car} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarListingPage;