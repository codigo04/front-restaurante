import { useContext, useState } from "react";
import SavingsIcon from "@mui/icons-material/Savings";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import "../../assets/styles/cssAdmin/css.css";
import { Progress } from "../../components/adm/Progress";
import pollo from "../../assets/img/adm/pollo.jpg";
import { AuthContext } from "../../context/AuthProvider";
import { useMediaQuery } from "@mui/material";

const orders = [
	{ client: "Cliente 1", table: 5, date: "14/08/2001", time: "10:00" },
	{ client: "Cliente 2", table: 5, date: "14/08/2001", time: "10:00" },
	{ client: "Cliente 3", table: 5, date: "14/08/2001", time: "10:00" },
	{ client: "Cliente 3", table: 5, date: "14/08/2001", time: "10:00" },
	{ client: "Cliente 3", table: 5, date: "14/08/2001", time: "10:00" },
	{ client: "Cliente 3", table: 5, date: "14/08/2001", time: "10:00" },
	{ client: "Cliente 3", table: 5, date: "14/08/2001", time: "10:00" },
	{ client: "Cliente 3", table: 5, date: "14/08/2001", time: "10:00" },
	{ client: "Cliente 3", table: 5, date: "14/08/2001", time: "10:00" },
	{ client: "Cliente 3", table: 5, date: "14/08/2001", time: "10:00" },
	{ client: "Cliente 3", table: 5, date: "14/08/2001", time: "10:00" },
	{ client: "Cliente 3", table: 5, date: "14/08/2001", time: "10:00" },
	{ client: "Cliente 3", table: 5, date: "14/08/2001", time: "10:00" },
	{ client: "Cliente 3", table: 5, date: "14/08/2001", time: "10:00" },
	{ client: "Cliente 3", table: 5, date: "14/08/2001", time: "10:00" },
	{ client: "Cliente 3", table: 5, date: "14/08/2001", time: "10:00" },
	{ client: "Cliente 3", table: 5, date: "14/08/2001", time: "10:00" },
];

const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Nobiembre", "Diciembre"];

export const Dashboard = () => {
	const { usuarios } = useContext(AuthContext);

	const [selectOrder, setSelectedOrde] = useState(null);
	const [selectMes, setSelectMes] = useState("");
	const isMobile = useMediaQuery("(max-width:600px)");

	const handleView = (orders) => {
		setSelectedOrde(orders);

		console.log(selectOrder);
	};

	const handleChange = (e) => {
		setSelectMes(e.target.value);

		console.log(e.target.value);
	};

	return (
		<>
			<section className="container-fluid">
				<div className="row text-center my-4 " style={{ gap: isMobile ? "15px" : "0" }}>
					<div className="col-md-4">
						<div className="card-gradient">
							<div className="text-card">
								<p>20</p>
								<h2>Total Órdenes</h2>
							</div>
							<div className="icon-card">
								<FastfoodIcon style={{ width: "3em", height: "3em", fill: "#EF8822" }} />
							</div>
						</div>
					</div>
					<div className="col-md-4">
						<div className="card-gradient">
							<div className="text-card">
								<p>s/ 499.00</p>
								<h2>Total Ingresos</h2>
							</div>
							<div className="icon-card">
								<SavingsIcon sx={{ width: "3em", height: "3em", fill: "#EF8822" }} />
							</div>
						</div>
					</div>
					<div className="col-md-4">
						<div className="card-gradient">
							<div className="text-card">
								<p>{usuarios.length}</p>
								<h2>Total Empleados</h2>
							</div>
							<div className="icon-card">
								<PeopleAltIcon style={{ width: "3em", height: "3em", fill: "#EF8822" }} />
							</div>
						</div>
					</div>
				</div>
				{/* pedidos recientes */}
				<div className="container-fluid  ">
					<div className="row" style={{ gap: isMobile ? "15px" : "0" }}>
						{/* Pedidos Recientes Solicitados */}
						<div className="col-md-6 container-color">
							<article className="">
								<h3>Pedidos Recientes Solicitados</h3>
								<div className="table-container">
									<table className="table table-striped">
										<thead>
											<tr>
												<th>Cliente</th>
												<th>Mesa</th>
												<th>Fecha - Hora</th>
												<th>Acción</th>
											</tr>
										</thead>
										<tbody>
											{orders.map((order, index) => (
												<tr key={index}>
													<td>{order.client}</td>
													<td>{order.table}</td>
													<td>
														{order.date} - {order.time}
													</td>
													<td>
														<button onClick={() => handleView(order)} className="btn color-primario">
															Ver
														</button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
								<button className="btn btn-warning color-primario">Ver Todos</button>
							</article>
						</div>

						{/* Ganancia Mensual */}
						<div className="col-md-6" style={{ paddingRight: "0" }}>
							<div className="monthly-earnings container-color">
								<h3>Ganancia Mensual</h3>
								<div className="form-group mb-3">
									<select
										id="mesSelect"
										className="form-select"
										value={selectMes} // Vincula el valor del select al estado
										onChange={handleChange} // Maneja el cambio
									>
										<option value="">Seleccionar un mes</option>
										{meses.map((mes, index) => (
											<option key={index} value={mes}>
												{mes}
											</option>
										))}
									</select>
								</div>

								<div className="earnings-bars">
									{/* Pollo a la brasa */}
									<Progress plato="Pollo a la brasa" porcentaje={100} />

									{/* Pollo broaster */}
									<Progress plato="Pollo broaster" porcentaje={75} />

									{/* Bebidas */}
									<Progress plato="Bebidas" porcentaje={47} />

									{/* Mostrito */}
									<Progress plato="Mostrito" porcentaje={30} />
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* productos en tendencia */}
				<div className="">
					<div className="my-4 container-fluid container-color">
						<h3>Productos en Tendencia</h3>
						<div className="row" style={{ gap: isMobile ? "15px" : "0" }}>
							<div className="col-md-3">
								<img src={pollo} className="img-fluid" alt="Producto 1" />
							</div>
							<div className="col-md-3">
								<img src={pollo} className="img-fluid" alt="Producto 2" />
							</div>
							<div className="col-md-3">
								<img src={pollo} className="img-fluid" alt="Producto 3" />
							</div>
							<div className="col-md-3">
								<img src={pollo} className="img-fluid" alt="Producto 4" />
							</div>
						</div>
					</div>
				</div>

				{selectOrder && (
					<div className="order-details-overlay">
						<div className="order-details">
							<div className="d-flex justify-content-between">
								<h3>Detalles de la Orden</h3>

								<button onClick={() => setSelectedOrde(null)} className="btn btn-secondary color-primario">
									<i className="bi bi-x" style={{ color: "white" }}></i>
								</button>
							</div>
							<div>
								<p>Cliente: {selectOrder.client}</p>
								<p>Mesa: {selectOrder.table}</p>
								<p>Fecha: {selectOrder.date}</p>
								<p>Hora: {selectOrder.time}</p>
							</div>
							<div>
								<table className="table table-striped">
									<thead>
										<tr>
											<th>Cliente</th>
											<th>Mesa</th>
											<th>Fecha - Hora</th>
											<th>Acción</th>
										</tr>
									</thead>
									{/* <tbody>
                      {orders.map((order, index) => (
                        <tr key={index}>
                          <td>{order.client}</td>
                          <td>{order.table}</td>
                          <td>{order.date} - {order.time}</td>
                          <td><button onClick={() => handleView(order)} className="btn  color-primario">Ver</button></td>
                        </tr>
                      ))}
                    </tbody> */}
								</table>
							</div>
						</div>
					</div>
				)}
			</section>
		</>
	);
};
