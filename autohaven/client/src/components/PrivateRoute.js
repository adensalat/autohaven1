import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser || (children.props.requireAdmin && !currentUser.isAdmin)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;