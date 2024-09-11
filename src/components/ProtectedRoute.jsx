import React from 'react'
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  
    const user = true; // Aquí iría la lógica real de autenticación

    if (!user) {
      // Si no hay un usuario autenticado, redirige al login
      return <Navigate to="/login" />;
    }
  
    return children;
}
