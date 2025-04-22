import React, { useState } from 'react';
import axios from 'axios';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState({
    submitted: false,
    error: false,
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data } = await axios.post('/api/contact', formData);
      
      if (data.success) {
        setStatus({
          submitted: true,
          error: false,
          message: 'Your message has been sent. We will get back to you soon!',
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus({
          submitted: true,
          error: true,
          message: 'Failed to send message. Please try again.',
        });
      }
    } catch (error) {
      setStatus({
        submitted: true,
        error: true,
        message: 'An error occurred. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="mb-4">Contact Us</h1>
      
      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="card-title">Get in Touch</h2>
              
              {status.submitted && (
                <div
                  className={`alert ${
                    status.error ? 'alert-danger' : 'alert-success'
                  }`}
                >
                  {status.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="col-lg-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="card-title">Our Location</h2>
              
              <div className="ratio ratio-16x9 mb-4">
                {/* Placeholder for map */}
                <div className="bg-light d-flex align-items-center justify-content-center">
                  <p className="text-muted">Map would be displayed here</p>
                </div>
              </div>
              
              <h4>AutoHaven Motors</h4>
              <address>
                <p>
                  123 Car Street<br />
                  Auto City, AC 12345
                </p>
                <p>
                  <strong>Phone:</strong> (123) 456-7890<br />
                  <strong>Email:</strong> info@autohaven.com
                </p>
              </address>
              
              <h4 className="mt-4">Business Hours</h4>
              <ul className="list-unstyled">
                <li>Monday - Friday: 9:00 AM - 8:00 PM</li>
                <li>Saturday: 10:00 AM - 6:00 PM</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;