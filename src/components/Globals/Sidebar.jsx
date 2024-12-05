import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logito.svg";
import { AuthContext } from "../../context/AuthProvider";
import HamburgerButton from "./HamburgerButton";

export const Sidebar = () => {
	const rolUser = localStorage.getItem("rolUser");

	const { cerrarSesionAuth } = useContext(AuthContext);
	const links = [
		{ ruta: "/admin/dashboard", nombre: "Dashboard", rol: "ADMIN" },
		{ ruta: "/admin/productos", nombre: "Productos", rol: "ADMIN" },
		{ ruta: "/admin/ordenes", nombre: "Órdenes", rol: "ADMIN" },
		{ ruta: "/admin/clientes", nombre: "Clientes", rol: "ADMIN" },
		{ ruta: "/admin/empleados", nombre: "Empleados", rol: "ADMIN" },
		{ ruta: "/admin/mesas", nombre: "Mesas", rol: "ADMIN" },
		{ ruta: "/admin/estadisticas", nombre: "Estadísticas", rol: "ADMIN" },
		{ ruta: "/mozo/mesas", nombre: "Mesas", rol: "MOZO" },
		{ ruta: "/mozo/productos", nombre: "Productos", rol: "MOZO" },
		{ ruta: "/mozo/pedido", nombre: "Pedido", rol: "MOZO" },
		{ ruta: "/mozo/pedido/listos", nombre: "Pedidos listos", rol: "MOZO" },
		{ ruta: "/cocina/pedidos", nombre: "Pedidos", rol: "COCINERO" },
		{ ruta: "/cajero/inicio", nombre: "Cobrar", rol: "CAJA" },
		{ ruta: "/cajero/cerrar-caja", nombre: "Cerrar Caja", rol: "CAJA" },
		{ ruta: "/cajero/historial-cierres-caja", nombre: "Historial de cierres", rol: "CAJA" },
	];

	const [isOpen, setIsOpen] = useState(false);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};
	const sidebarWidth = "169px";
	return (
		<>
			{/* Overlay oscuro */}
			<div
				className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
				onClick={toggleSidebar}
				style={{ zIndex: "999" }}
			></div>

			{/* Botón de alternancia */}
			<aside
				className="sidebar bg-dark text-white transition-all duration-300 container-sidebar "
				style={{
					position: "fixed", // Añadir esta línea
					top: "0", // Asegura que el sidebar esté en la parte superior
					left: "0", // Asegura que el sidebar esté alineado a la izquierda
					height: "100%", // Asegura que el sidebar ocupe toda la altura de la pantalla
					width: isOpen ? sidebarWidth : "0",
					padding: "0",
					zIndex: "1000",
				}}
			>
				<div className="container catainer-responsy">
					<img src={logo} className="card-img-top mb-3" alt="logo" />

					{/* Botón de alternancia cerca del logo */}
					<a
						className="d-flex justify-content-center align-items-center icon-style boton-navbar"
						variant="outline-primary"
						onClick={toggleSidebar}
						style={{
							top: "5px",
							left: isOpen ? "157px" : "5px",
						}}
					>
						<HamburgerButton />
					</a>
				</div>

				<nav
					className="container container-navegacion"
					style={{
						overflow: "hidden",
						transition: "width 0.3s ease",
						visibility: isOpen ? "visible" : "hidden",
					}}
				>
					<ul className="list-unstyled">
						{links
							.filter((link) => link.rol === rolUser)
							.map((link) => (
								<li key={link.ruta} className="">
									<Link to={link.ruta} className="text-black" onClick={() => setIsOpen(false)}>
										{link.nombre}
									</Link>
								</li>
							))}
						<li onClick={cerrarSesionAuth} className="">
							<Link to="/login" className="text-black" style={{ color: "black" }}>
								Salir
							</Link>
						</li>
					</ul>
				</nav>
			</aside>
		</>
	);
};
