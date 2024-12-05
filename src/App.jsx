import React, { useState } from "react";
import { Login } from "./pages/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/admin/Dashboard";
import { Layout } from "./components/Layout";

import "./assets/styles/index.css";

import { ProtectedRoute } from "./components/ProtectedRoute";

import { ProdutosAdm } from "./pages/admin/ProdutosAdm";
import { OrdenesAdm } from "./pages/admin/OrdenesAdm";
import { ClientesAdm } from "./pages/admin/ClientesAdm";
import { IngresosAdm } from "./pages/admin/IngresosAdm";
import { EstadisticasAdm } from "./pages/admin/EstadisticasAdm";
import { EmpleadosAdm } from "./pages/admin/EmpleadosAdm";
import { MesasMoso } from "./pages/mozo/MesasMoso";
import { ProductosMozo } from "./pages/mozo/ProductosMozo";
import { ProductosProvider } from "./context/ProductosProvider";
import { MesaPedidoProvider } from "./context/MesaPedidoProvider";
import { DetallePedido } from "./pages/mozo/DetallePedido";
import { MesasAdm } from "./pages/admin/MesasAdm";
import { MesasProvider } from "./context/MesasProvider";
import { AuthProvider } from "./context/AuthProvider";
import { Cajero } from "./pages/caja/Cajero";
import { Pedidos } from "./pages/cocina/pedidos";
import { WebSocketProvider } from "./context/WebSocketProvider";
import { PedidoProvider } from "./context/PedidoProvider";

import "./assets/styles/index.css";

import { Moso } from "./pages/Moso";
import { CerrarCaja } from "./pages/caja/CerrarCaja";
import { HistorialCierres } from "./pages/caja/HistorialCierres";
import { PedidosListos } from "./pages/mozo/PedidosListos";
import { NieveComponente } from "./components/Globals/NieveComponente";

export const App = () => {
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

										<Route
											path="/login"
											element={
												<NieveComponente>
													<Login />
												</NieveComponente>
											}
										/>

										<Route
											path="/"
											element={
												// Comentar para probar el login
												<ProtectedRoute>
													<Layout />
												</ProtectedRoute>
											}
										>
											{/* Rutas protegidas */}

											<Route path="/cajero" element={<Cajero />} />
											<Route path="/moso" element={<Moso />} />

											{/* Rutas del admin */}
											<Route path="/admin/dashboard" element={<Dashboard />} />
											<Route path="/admin/productos" element={<ProdutosAdm />} />
											<Route path="/admin/ordenes" element={<OrdenesAdm />} />
											<Route path="/admin/clientes" element={<ClientesAdm />}></Route>
											<Route path="/admin/empleados" element={<EmpleadosAdm />}></Route>
											<Route path="/admin/mesas" element={<MesasAdm />}></Route>
											<Route path="/admin/estadisticas" element={<EstadisticasAdm />}></Route>

											{/* mozo /mozo/pedido */}
											<Route path="/mozo/mesas" element={<MesasMoso />}></Route>
											<Route path="/mozo/productos" element={<ProductosMozo />}></Route>
											<Route path="/mozo/pedido" element={<DetallePedido />}></Route>
											<Route path="/mozo/pedido/listos" element={<PedidosListos />}></Route>

											{/* cocina */}
											<Route path="/cocina/pedidos" element={<Pedidos />}></Route>

											{/* caja */}
											<Route path="/cajero/inicio" element={<Cajero />}></Route>
											<Route path="/cajero/cerrar-caja" element={<CerrarCaja />}></Route>
											<Route path="/cajero/historial-cierres-caja" element={<HistorialCierres />}></Route>
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
