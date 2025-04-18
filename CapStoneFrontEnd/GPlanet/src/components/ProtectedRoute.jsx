import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const profile = useSelector(state => state.profile);
  const loading = useSelector(state => state.loading);

  if (loading) {
    return <div className="text-center text-white mt-5"><div className="spinner-border" role="status" /></div>;
  }

  if (!allowedRoles.includes(profile.role)) {
    return <Navigate to="/" />; 
  }

  return children;
};

export default ProtectedRoute;