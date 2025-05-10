import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const CheckoutPage = () => {
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
    address: '',
    city: '',
    postcode: '',
    country: 'Ireland'
  });
  const [orderComplete, setOrderComplete] = useState(false);
  
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
      createdAt: new Date('2025-04-05').toISOString()
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
      createdAt: new Date('2025-03-25').toISOString()
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
      createdAt: new Date('2025-03-20').toISOString()
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
      createdAt: new Date('2025-03-15').toISOString()
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
      createdAt: new Date('2025-03-10').toISOString()
    }
  ];

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    // Find the car with the matching ID from our sample data
    const foundCar = sampleCars.find(car => car._id === id);
    
    if (foundCar) {
      setCar(foundCar);
    } else {
      setError('Car not found.');
    }
    
    setLoading(false);
  }, [id, currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate payment processing
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setOrderComplete(true);
      
      // Save purchase to user's history in localStorage
      try {
        const purchases = JSON.parse(localStorage.getItem('purchases')) || [];
        purchases.push({
          id: Date.now().toString(),
          carId: car._id,
          carMake: car.make,
          carModel: car.model,
          price: car.price,
          purchaseDate: new Date().toISOString(),
          userId: currentUser.id
        });
        localStorage.setItem('purchases', JSON.stringify(purchases));
      } catch (error) {
        console.error('Failed to save purchase history:', error);
      }
    }, 2000);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Processing your request...</p>
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

  if (orderComplete) {
    return (
      <div className="card shadow">
        <div className="card-body text-center p-5">
          <div className="mb-4">
            <i className="bi bi-check-circle text-success" style={{ fontSize: '4rem' }}></i>
          </div>
          <h2 className="mb-4">Thank You for Your Purchase!</h2>
          <p className="lead mb-4">
            Your order for the {car.year} {car.make} {car.model} has been successfully processed.
          </p>
          <p className="mb-4">
            A confirmation email has been sent to {currentUser.email}. Our team will contact you shortly to arrange delivery.
          </p>
          <div className="d-grid gap-3 col-md-6 mx-auto">
            <Link to="/" className="btn btn-primary">
              Return to Home
            </Link>
            <Link to="/profile" className="btn btn-outline-primary">
              View Your Profile
            </Link>
          </div>
        </div>
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
      <h1 className="mb-4">Checkout</h1>
      
      <div className="row">
        <div className="col-md-8">
          <div className="card shadow mb-4">
            <div className="card-body">
              <h3 className="card-title">Payment Information</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <h5>Payment Method</h5>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="creditCard"
                      value="credit"
                      checked={paymentMethod === 'credit'}
                      onChange={handlePaymentMethodChange}
                    />
                    <label className="form-check-label" htmlFor="creditCard">
                      Credit Card
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="debitCard"
                      value="debit"
                      checked={paymentMethod === 'debit'}
                      onChange={handlePaymentMethodChange}
                    />
                    <label className="form-check-label" htmlFor="debitCard">
                      Debit Card
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="bankTransfer"
                      value="bank"
                      checked={paymentMethod === 'bank'}
                      onChange={handlePaymentMethodChange}
                    />
                    <label className="form-check-label" htmlFor="bankTransfer">
                      Bank Transfer
                    </label>
                  </div>
                </div>
                
                {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
                  <div className="card-details">
                    <div className="row mb-3">
                      <div className="col-md-12">
                        <label htmlFor="cardName" className="form-label">Name on Card</label>
                        <input
                          type="text"
                          className="form-control"
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="row mb-3">
                      <div className="col-md-12">
                        <label htmlFor="cardNumber" className="form-label">Card Number</label>
                        <input
                          type="text"
                          className="form-control"
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="XXXX XXXX XXXX XXXX"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label htmlFor="expDate" className="form-label">Expiration Date</label>
                        <input
                          type="text"
                          className="form-control"
                          id="expDate"
                          name="expDate"
                          placeholder="MM/YY"
                          value={formData.expDate}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="cvv" className="form-label">CVV</label>
                        <input
                          type="text"
                          className="form-control"
                          id="cvv"
                          name="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {paymentMethod === 'bank' && (
                  <div className="bank-details">
                    <div className="alert alert-info">
                      <h5>Bank Transfer Instructions</h5>
                      <p>Please transfer the full amount to the following account:</p>
                      <p>
                        <strong>Bank:</strong> AutoHaven Bank<br />
                        <strong>Account Name:</strong> AutoHaven Motors Ltd<br />
                        <strong>IBAN:</strong> IE29 AIBK 9311 5212 3456 78<br />
                        <strong>BIC:</strong> AIBKIE2D<br />
                        <strong>Reference:</strong> CAR-{id}-{currentUser.id}
                      </p>
                      <p>Your car will be reserved for 3 days pending payment confirmation.</p>
                    </div>
                  </div>
                )}
                
                <h5 className="mt-4">Billing Address</h5>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="city" className="form-label">City</label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="postcode" className="form-label">Postcode</label>
                    <input
                      type="text"
                      className="form-control"
                      id="postcode"
                      name="postcode"
                      value={formData.postcode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="row mb-4">
                  <div className="col-md-12">
                    <label htmlFor="country" className="form-label">Country</label>
                    <select
                      className="form-select"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                    >
                      <option value="Ireland">Ireland</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="France">France</option>
                      <option value="Germany">Germany</option>
                      <option value="Spain">Spain</option>
                      <option value="Italy">Italy</option>
                    </select>
                  </div>
                </div>
                
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Complete Purchase
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title">Order Summary</h3>
              
              <div className="mb-3">
                <img 
                  src={car.imageUrl} 
                  alt={`${car.year} ${car.make} ${car.model}`} 
                  className="img-fluid rounded"
                />
              </div>
              
              <h5>{car.year} {car.make} {car.model}</h5>
              <p className="text-muted">
                {car.mileage.toLocaleString()} miles | {car.fuelType} | {car.transmission}
              </p>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-2">
                <span>Vehicle Price:</span>
                <span>${car.price.toLocaleString()}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Documentation Fee:</span>
                <span>$100</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Registration Fee:</span>
                <span>$200</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Delivery Fee:</span>
                <span>$150</span>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-2 fw-bold">
                <span>Total:</span>
                <span>${(car.price + 450).toLocaleString()}</span>
              </div>
              
              <div className="alert alert-success mt-3">
                <i className="bi bi-shield-check me-2"></i>
                Your purchase is protected by our 30-day money-back guarantee.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
