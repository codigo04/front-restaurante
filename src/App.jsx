import React, { useState } from 'react'
import { Login } from './pages/Login'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Dashboard } from './pages/admin/Dashboard'
import { Layout } from './components/Layout'

import './assets/styles/index.css'
import { Cajero } from './pages/Cajero'
import { Moso } from './pages/Moso'
import { ProtectedRoute } from './components/ProtectedRoute'
import { NavBarAdmin } from './components/NavBarAdmin'
import { NavBarMoso } from './components/NavBarMoso'
import { NavBarCaja } from './components/NavBarCaja'
import { ProdutosAdm } from './pages/admin/ProdutosAdm'
import { OrdenesAdm } from './pages/admin/OrdenesAdm'
import { ClientesAdm } from './pages/admin/ClientesAdm'
import { IngresosAdm } from './pages/admin/IngresosAdm'
import { EstadisticasAdm } from './pages/admin/EstadisticasAdm'



export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userRole, setUserRole] = useState(null);

  const getSidebar = () => {
    // userRole
    switch (userRole) {
      case 'admin':
        return <NavBarAdmin></NavBarAdmin>;
      case 'mozo':
        return <NavBarMoso></NavBarMoso>;
      case 'cajero':
        return <NavBarCaja></NavBarCaja>;
      default:
        return null;
    }
  };


  return (
    <>

      <Routes>
        <Route path="/login" element={<Login setUserRole={setUserRole} />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout sidebar={getSidebar()} />
            </ProtectedRoute>
          }
        >

          {/* Rutas protegidas */}

          <Route path='/cajero' element={<Cajero />} />
          <Route path='/moso' element={<Moso />} />

          {/* Rutas del admin */}
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/productos' element={<ProdutosAdm />} />
          <Route path='/admin/ordenes' element={<OrdenesAdm />} />
          <Route path='/admin/clientes' element={<ClientesAdm />}></Route>
          <Route path='/admin/ingresos' element={<IngresosAdm />}></Route>
          <Route path='/admin/estadisticas' element={<EstadisticasAdm />}></Route>


          {/* mozo */}
           <Route   path='/mozo/mesas' element={<Dashboard />}></Route>
          {/* caja */}
        <Route path='/cajero/inicio' element={<Dashboard />}></Route>
        </Route>
          

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

    </>

  )
}

