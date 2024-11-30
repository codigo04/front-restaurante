import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

export const ProtectedRoute = ({ children }) => {
  const { isLoading, auth, setIsLoading } = useContext(AuthContext); // Usar directamente el contexto para verificar la autenticación
  const token = localStorage.getItem('token'); // Obtenemos el token de localStorage (si existe)

  const [loadingDelay, setLoadingDelay] = useState(true);
  // Si aún está cargando, muestra un indicador de carga
  // Simula el retraso de 3 segundos para la carga
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingDelay(false); // Después de 3 segundos, cambia el estado de carga
    }, 1000); 

    return () => clearTimeout(timer); // Limpiar el temporizador cuando el componente se desmonte
  }, []);

  console.log("isLodingf en ProtectedRoute: " + isLoading)
  if (loadingDelay) {
    return (
      <div className="d-flex justify-content-center flex-column align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border" style={{ color: '#FFA500' }} role="status">
         
        </div>
        <span style={{ color: 'black' }}>Cargando...</span>
      </div>
    );
  }

  // Si no hay token en el contexto ni en localStorage, redirige al login
  if (!auth && !token) {
    return <Navigate to="/login" />;
  }

  // Si está autenticado, renderiza los componentes hijos
  return children;
}
