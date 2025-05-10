import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [message, setMessage] = useState({
    text: '',
    type: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      // Get all users from localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      
      // Find the current user and update their information
      const updatedUsers = users.map(user => {
        if (user.id === currentUser.id) {
          return { ...user, name: formData.name };
        }
        return user;
      });
      
      // Save updated users back to localStorage
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      // Update the current user in localStorage
      const updatedUserInfo = { ...currentUser, name: formData.name };
      localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
      
      setMessage({
        text: 'Profile updated successfully!',
        type: 'success'
      });
      
      // Refresh the page after 2 seconds to reflect changes
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    } catch (error) {
      setMessage({
        text: 'Failed to update profile. Please try again.',
        type: 'danger'
      });
    }
  };
  
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    // Validate password fields
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({
        text: 'New passwords do not match.',
        type: 'danger'
      });
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setMessage({
        text: 'New password must be at least 6 characters long.',
        type: 'danger'
      });
      return;
    }
    
    try {
      // Get all users from localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      
      // Find the current user
      const currentUserData = users.find(user => user.id === currentUser.id);
      
      // Verify current password
      if (currentUserData.password !== passwordData.currentPassword) {
        setMessage({
          text: 'Current password is incorrect.',
          type: 'danger'
        });
        return;
      }
      
      // Update the password
      const updatedUsers = users.map(user => {
        if (user.id === currentUser.id) {
          return { ...user, password: passwordData.newPassword };
        }
        return user;
      });
      
      // Save updated users back to localStorage
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      // Reset password fields
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      setMessage({
        text: 'Password updated successfully!',
        type: 'success'
      });
      
    } catch (error) {
      setMessage({
        text: 'Failed to update password. Please try again.',
        type: 'danger'
      });
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!currentUser) {
    return (
      <div className="text-center">
        <p>Please log in to view your profile.</p>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/login')}
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card shadow">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">My Profile</h2>
            
            {message.text && (
              <div className={`alert alert-${message.type}`}>
                {message.text}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
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
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  disabled
                />
                <small className="text-muted">Email cannot be changed</small>
              </div>
              
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Update Profile
                </button>
              </div>
            </form>
            
            <div className="mt-4">
              <h4>Account Information</h4>
              <p><strong>Account Created:</strong> {new Date().toLocaleDateString()}</p>
              <p><strong>Last Login:</strong> {new Date().toLocaleDateString()}</p>
            </div>
            
            <div className="mt-4">
              <h4>Change Password</h4>
              <form onSubmit={handlePasswordSubmit}>
                <div className="mb-3">
                  <label htmlFor="currentPassword" className="form-label">Current Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                    minLength="6"
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                    minLength="6"
                  />
                </div>
                
                <div className="d-grid">
                  <button type="submit" className="btn btn-secondary">
                    Update Password
                  </button>
                </div>
              </form>
            </div>
            
            <div className="mt-4">
              <h4>Saved Cars</h4>
              <p className="text-muted">You haven't saved any cars yet.</p>
            </div>
            
            <div className="mt-5 pt-3 border-top">
              <div className="d-grid gap-2">
                <button 
                  type="button" 
                  className="btn btn-outline-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
