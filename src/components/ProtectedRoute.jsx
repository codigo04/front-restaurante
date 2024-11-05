import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

export const ProtectedRoute = ({ children }) => {

 const { iniciarSession, decodToken, isLoading} = useContext(AuthContext); 
 
    const userLogin = isLoading; 

    if (!userLogin) {
      // Si no hay un usuario autenticado, redirige al login

    
      return <Navigate to="/login" />;
    }
  
    return children;
}
