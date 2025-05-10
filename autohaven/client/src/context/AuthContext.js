import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      setCurrentUser(userInfo);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Get users from local storage or use empty array if none exist
      const users = JSON.parse(localStorage.getItem('users')) || [];
      
      // Find user with matching email and password
      const user = users.find(u => u.email === email);
      
      if (user && user.password === password) {
        // Create user data without password for security
        const userData = { id: user.id, name: user.name, email: user.email };
        localStorage.setItem('userInfo', JSON.stringify(userData));
        setCurrentUser(userData);
        return { success: true };
      } else {
        return {
          success: false,
          error: 'Invalid email or password',
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Failed to login',
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      // Get existing users or initialize empty array
      const users = JSON.parse(localStorage.getItem('users')) || [];
      
      // Check if email is already registered
      if (users.some(user => user.email === email)) {
        return {
          success: false,
          error: 'Email is already registered',
        };
      }
      
      // Create new user with unique ID
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password, // In a real app, this would be hashed
      };
      
      // Add to users array and save to localStorage
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Create user data without password for security
      const userData = { id: newUser.id, name: newUser.name, email: newUser.email };
      localStorage.setItem('userInfo', JSON.stringify(userData));
      setCurrentUser(userData);
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to register',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};