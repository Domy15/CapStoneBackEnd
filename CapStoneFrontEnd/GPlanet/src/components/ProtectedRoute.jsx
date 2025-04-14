import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const profile = useSelector(state => state.profile);

  if (!allowedRoles.includes(profile.role)) {
    return <Navigate to="/" />; 
  }

  return children;
};

export default ProtectedRoute;