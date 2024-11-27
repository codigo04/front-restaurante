<<<<<<< HEAD
import React, { useState } from 'react'
import { Login } from './pages/Login'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Dashboard } from './pages/admin/Dashboard'
import { Layout } from './components/Layout'

import './assets/styles/index.css'

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
import { EmpleadosAdm } from './pages/admin/EmpleadosAdm'
import { MesasMoso } from './pages/mozo/MesasMoso'
import { ProductosMozo } from './pages/mozo/ProductosMozo'
import { ProductosProvider } from './context/ProductosProvider'
import { MesaPedidoProvider } from './context/MesaPedidoProvider'
import { DetallePedido } from './pages/mozo/DetallePedido'
import { MesasAdm } from './pages/admin/MesasAdm'
import { MesasProvider } from './context/MesasProvider'
import { AuthProvider } from './context/AuthProvider'
import { Cajero } from './pages/caja/Cajero'
import { Pedidos } from './pages/cocina/pedidos'
import { WebSocketProvider } from './context/WebSocketProvider '
import { PedidoProvider } from './context/PedidoProvider'

=======
import React, { useState } from "react";
import { Login } from "./pages/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/admin/Dashboard";
import { Layout } from "./components/Layout";
>>>>>>> jhonatan

import "./assets/styles/index.css";

import { Moso } from "./pages/Moso";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { NavBarAdmin } from "./components/NavBarAdmin";
import { NavBarMoso } from "./components/NavBarMoso";
import { NavBarCaja } from "./components/NavBarCaja";
import { ProdutosAdm } from "./pages/admin/ProdutosAdm";
import { OrdenesAdm } from "./pages/admin/OrdenesAdm";
import { ClientesAdm } from "./pages/admin/ClientesAdm";
import { IngresosAdm } from "./pages/admin/IngresosAdm";
import { EstadisticasAdm } from "./pages/admin/EstadisticasAdm";
import { EmpleadosAdm } from "./pages/admin/EmpleadosAdm";
import { MesasMoso } from "./pages/mozo/MesasMoso";
import { ProductosMozo } from "./pages/mozo/ProductosMozo";
import { ProductosProvider } from "./context/ProductosProvider";
import { PedidoProvider } from "./context/PedidoProvider";
import { DetallePedido } from "./pages/mozo/DetallePedido";
import { MesasAdm } from "./pages/admin/MesasAdm";
import { MesasProvider } from "./context/MesasProvider";
import { AuthProvider } from "./context/AuthProvider";
import { Cajero } from "./pages/caja/Cajero";
import { Pedidos } from "./pages/cocina/pedidos";
import CerrarCaja from "./pages/caja/CerrarCaja";
import HistorialCierres from "./pages/caja/HistorialCierres";

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userRole, setUserRole] = useState(null);

  const getSidebar = () => {
    // userRole
    switch (userRole) {
      case "ADMIN":
        return <NavBarAdmin></NavBarAdmin>;
      case "MOZO":
        return <NavBarMoso></NavBarMoso>;
      case "CAJA":
        return <NavBarCaja></NavBarCaja>;
      default:
        return null;
    }
  };

  return (
    <>
      <AuthProvider>
        <WebSocketProvider>
          <PedidoProvider>
            <MesasProvider>
              <MesaPedidoProvider>
                <ProductosProvider>

                  <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
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
                      <Route path='/admin/empleados' element={<EmpleadosAdm />}></Route>
                      <Route path='/admin/mesas' element={<MesasAdm />}></Route>
                      <Route path='/admin/estadisticas' element={<EstadisticasAdm />}></Route>


                      {/* mozo /mozo/pedido */}
                      <Route path='/mozo/mesas' element={<MesasMoso />}></Route>
                      <Route path='/mozo/productos' element={<ProductosMozo />}></Route>
                      <Route path='/mozo/pedido' element={<DetallePedido />}></Route>

                      {/* cocina */}
                      <Route path='/cocina/pedidos' element={<Pedidos />}></Route>

                      {/* caja */}
                      <Route path='/cajero/inicio' element={<Cajero />}></Route>
                      <Route
                    path="/cajero/cerrar-caja"
                    element={<CerrarCaja />}
                  ></Route>
                  <Route
                    path="/cajero/historial-cierres-caja"
                    element={<HistorialCierres />}
                  ></Route>


                    </Route>


                    <Route path="*" element={<Navigate to="/login" />} />
                  </Routes>

                </ProductosProvider>
              </MesaPedidoProvider>

            </MesasProvider>
          </PedidoProvider>
        </WebSocketProvider>
      </AuthProvider>
    </>
  );
};
