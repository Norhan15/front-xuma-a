// ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Adjust path as necessary

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  // Si no está autenticado, redirigir a login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si hay roles específicos requeridos
  if (allowedRoles && allowedRoles.length > 0) {
    const hasRole = user?.role && allowedRoles.includes(user.role);
    if (!hasRole) {
      // Redirigir a una página de acceso denegado o al home
      return <Navigate to="/home" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
