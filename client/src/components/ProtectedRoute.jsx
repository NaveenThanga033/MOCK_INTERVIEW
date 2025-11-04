import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();
  const location = useLocation();

  // Show loading while authentication status is being determined
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  if (!isSignedIn) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;