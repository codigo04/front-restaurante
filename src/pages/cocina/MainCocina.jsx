import { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "../../context/WebSocketProvider";
import { Card } from "./Card/Card";
import pedidos from "./Card/pedidos";
import "./style-cocina.css";
import { toast } from "react-toastify";
import { MesaPedidoContext } from "../../context/MesaPedidoProvider";
import { PedidoContext } from "../../context/PedidoProvider";
import { actualizarEstadoPedido } from "../../service/pedidoService";
import { Typography } from "@mui/material";


export const MainCocina = () => {

	const { messagesCocina, setDetallePedido, sendMessageToBackend } = useContext(WebSocketContext);

	const [pedidosAllCocina, setPedidoAllCocina] = useState([])

	const { filtrados, getPedidoAllEstado } = useContext(PedidoContext);

	console.log("pedidos filtrados")
	console.log(filtrados)

	useEffect(() => {
		console.log("pedidos filtrados 2")
		getPedidoAllEstado("EN_PREPARACION");
		// Filtrar pedidos por estado
	}, []);

	useEffect(() => {
		if (messagesCocina.length > 0) {
			toast.success("Nuevo Pedido Recivido", {
				position: "top-right",
			});
		}

		setPedidoAllCocina((prevPedidoAll) => [
			...prevPedidoAll.filter(p => !messagesCocina.some(m => m.idPedido === p.idPedido)),
			...messagesCocina
		]);


	}, [messagesCocina]);


	useEffect(() => {
		if (filtrados.length > 0) {
			console.log("si entro")
			setPedidoAllCocina(filtrados);
		}
		console.log("no entro")

	}, [filtrados]);

	console.log("pedidos cocina")
	console.log(pedidosAllCocina)

	const handlePedido = async (pedido) => {
		console.log("trayendo el pedido XD")
		console.log(pedido)


		try {
			const pedidoActualizado = await actualizarEstadoPedido(pedido.idPedido, 'ENTREGADO')

			console.log("trayendo el pedido ACTUALIZAD")
			console.log(pedidoActualizado)

			setPedidoAllCocina((prevPedidos) =>
				prevPedidos.filter(p => p.idPedido !== pedido.idPedido)
			);


			sendMessageToBackend('/app/cocina/mozo', pedidoActualizado);
		} catch (error) {
			console.error(error)
		}

	}

	return (
		<>
			<section className=" row mx-4">
				<article className="col-12 my-3">
					<h2>Lista de pedidos</h2>
					<p className="fw-semibold subtitulo">Pedidos listados según orden de llegada</p>
				</article>

				<section className="col-12">
					<div className="flex flex-wrap justify-center sm:justify-start gap-6">
						{pedidosAllCocina.length === 0 ? (
							<Typography variant="body1" className="text-center text-gray-500 w-full mt-6">
								No hay pedidos en preparación.
							</Typography>
						) : (
							pedidosAllCocina.map((pedido) => (
								<Card
									key={pedido.pedidoId}
									pedido={pedido}
									handlePedido={handlePedido}
									className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 p-4"
								/>
							))
						)}
					</div>
				</section>


			</section>
		</>
	);
};
