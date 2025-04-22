import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminDashboardPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    mileage: '',
    fuelType: '',
    transmission: '',
    imageUrl: '',
    description: '',
    features: '',
  });
  const [editing, setEditing] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Fetch cars on component mount
  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/cars');
      if (data.success) {
        setCars(data.data);
      }
    } catch (error) {
      setError('Failed to fetch cars');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.make.trim()) errors.make = 'Make is required';
    if (!formData.model.trim()) errors.model = 'Model is required';
    if (!formData.year) errors.year = 'Year is required';
    if (!formData.price) errors.price = 'Price is required';
    if (!formData.mileage) errors.mileage = 'Mileage is required';
    if (!formData.fuelType.trim()) errors.fuelType = 'Fuel type is required';
    if (!formData.transmission.trim()) errors.transmission = 'Transmission is required';
    if (!formData.imageUrl.trim()) errors.imageUrl = 'Image URL is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      setLoading(true);
      
      // Convert features from comma-separated string to array
      const carData = {
        ...formData,
        features: formData.features.split(',').map(feature => feature.trim()).filter(Boolean),
      };
      
      try {
        if (editing) {
          // Update existing car
          await axios.put(`/api/cars/${editing}`, carData);
        } else {
          // Create new car
          await axios.post('/api/cars', carData);
        }
        
        // Reset form
        setFormData({
          make: '',
          model: '',
          year: '',
          price: '',
          mileage: '',
          fuelType: '',
          transmission: '',
          imageUrl: '',
          description: '',
          features: '',
        });
        setEditing(null);
        setFormSubmitted(true);
        
        // Fetch updated car list
        fetchCars();
        
        setTimeout(() => {
          setFormSubmitted(false);
        }, 3000);
      } catch (error) {
        setError('Failed to save car');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (car) => {
    setEditing(car._id);
    setFormData({
      make: car.make,
      model: car.model,
      year: car.year,
      price: car.price,
      mileage: car.mileage,
      fuelType: car.fuelType,
      transmission: car.transmission,
      imageUrl: car.imageUrl,
      description: car.description,
      features: car.features.join(', '),
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        setLoading(true);
        await axios.delete(`/api/cars/${id}`);
        fetchCars();
      } catch (error) {
        setError('Failed to delete car');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h1 className="mb-4">Admin Dashboard</h1>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">{editing ? 'Edit Car' : 'Add New Car'}</h2>
          
          {formSubmitted && (
            <div className="alert alert-success">
              Car {editing ? 'updated' : 'added'} successfully!
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="make" className="form-label">Make</label>
                <input
                  type="text"
                  className={`form-control ${formErrors.make ? 'is-invalid' : ''}`}
                  id="make"
                  name="make"
                  value={formData.make}
                  onChange={handleChange}
                />
                {formErrors.make && <div className="invalid-feedback">{formErrors.make}</div>}
              </div>
              
              <div className="col-md-4 mb-3">
                <label htmlFor="model" className="form-label">Model</label>
                <input
                  type="text"
                  className={`form-control ${formErrors.model ? 'is-invalid' : ''}`}
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                />
                {formErrors.model && <div className="invalid-feedback">{formErrors.model}</div>}
              </div>
              
              <div className="col-md-4 mb-3">
                <label htmlFor="year" className="form-label">Year</label>
                <input
                  type="number"
                  className={`form-control ${formErrors.year ? 'is-invalid' : ''}`}
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                />
                {formErrors.year && <div className="invalid-feedback">{formErrors.year}</div>}
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="price" className="form-label">Price ($)</label>
                <input
                  type="number"
                  className={`form-control ${formErrors.price ? 'is-invalid' : ''}`}
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
                {formErrors.price && <div className="invalid-feedback">{formErrors.price}</div>}
              </div>
              
              <div className="col-md-4 mb-3">
                <label htmlFor="mileage" className="form-label">Mileage</label>
                <input
                  type="number"
                  className={`form-control ${formErrors.mileage ? 'is-invalid' : ''}`}
                  id="mileage"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleChange}
                />
                {formErrors.mileage && <div className="invalid-feedback">{formErrors.mileage}</div>}
              </div>
              
              <div className="col-md-4 mb-3">
                <label htmlFor="fuelType" className="form-label">Fuel Type</label>
                <select
                  className={`form-select ${formErrors.fuelType ? 'is-invalid' : ''}`}
                  id="fuelType"
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleChange}
                >
                  <option value=""></option>
                  <option value="">Select fuel type</option>
                  <option value="Gasoline">Gasoline</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
                {formErrors.fuelType && <div className="invalid-feedback">{formErrors.fuelType}</div>}
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="transmission" className="form-label">Transmission</label>
                <select
                  className={`form-select ${formErrors.transmission ? 'is-invalid' : ''}`}
                  id="transmission"
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleChange}
                >
                  <option value="">Select transmission</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                  <option value="CVT">CVT</option>
                </select>
                {formErrors.transmission && <div className="invalid-feedback">{formErrors.transmission}</div>}
              </div>
              
              <div className="col-md-8 mb-3">
                <label htmlFor="imageUrl" className="form-label">Image URL</label>
                <input
                  type="text"
                  className={`form-control ${formErrors.imageUrl ? 'is-invalid' : ''}`}
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                />
                {formErrors.imageUrl && <div className="invalid-feedback">{formErrors.imageUrl}</div>}
              </div>
            </div>
            
            <div className="mb-3">
              <label htmlFor="features" className="form-label">Features (comma separated)</label>
              <input
                type="text"
                className="form-control"
                id="features"
                name="features"
                value={formData.features}
                onChange={handleChange}
                placeholder="Leather seats, Sunroof, Bluetooth, etc."
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                className={`form-control ${formErrors.description ? 'is-invalid' : ''}`}
                id="description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
              {formErrors.description && <div className="invalid-feedback">{formErrors.description}</div>}
            </div>
            
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Saving...' : editing ? 'Update Car' : 'Add Car'}
              </button>
              
              {editing && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditing(null);
                    setFormData({
                      make: '',
                      model: '',
                      year: '',
                      price: '',
                      mileage: '',
                      fuelType: '',
                      transmission: '',
                      imageUrl: '',
                      description: '',
                      features: '',
                    });
                    setFormErrors({});
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      
      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-4">Manage Cars</h2>
          
          {loading && !editing ? (
            <div className="text-center py-3">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : cars.length === 0 ? (
            <div className="alert alert-info">No cars available. Add your first car above.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Make/Model</th>
                    <th>Year</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map((car) => (
                    <tr key={car._id}>
                      <td>
                        <img
                          src={car.imageUrl}
                          alt={`${car.make} ${car.model}`}
                          style={{ width: '60px', height: '40px', objectFit: 'cover' }}
                        />
                      </td>
                      <td>
                        {car.make} {car.model}
                      </td>
                      <td>{car.year}</td>
                      <td>${car.price.toLocaleString()}</td>
                      <td>
                        {car.isAvailable ? (
                          <span className="badge bg-success">Available</span>
                        ) : (
                          <span className="badge bg-danger">Sold</span>
                        )}
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <Link to={`/cars/${car._id}`} className="btn btn-outline-primary">
                            View
                          </Link>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => handleEdit(car)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleDelete(car._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;