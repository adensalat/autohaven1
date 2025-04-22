import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarCard from '../components/CarCard';
import SearchFilter from '../components/SearchFilter';

const CarListingPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await axios.get('api/cars');
        if (data.success) {
          setCars(data.data);
          setFilteredCars(data.data);
        }
      } catch (error) {
        setError('Failed to fetch cars. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
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