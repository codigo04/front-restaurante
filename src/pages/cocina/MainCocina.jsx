import { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "../../context/WebSocketProvider ";
import { Card } from "./Card/Card";
import pedidos from "./Card/pedidos";
import "./style-cocina.css";
import { toast } from "react-toastify";
import { PedidoContext } from "../../context/PedidoProvider";

export const MainCocina = () => {

	const { messages } = useContext(WebSocketContext);

	const [pedidoAll, setPedidoAll] = useState([])

	const { pedidosAll } = useContext(PedidoContext);

	useEffect(() => {
        if (messages.length > 0) {
            toast.success("Nuevo Pedido Recivido", {
                position: "top-right",
            });
        }

		setPedidoAll((prevPedidoAll) => [...prevPedidoAll, ...messages]);
    }, [messages]);


	useEffect(() => {
		if (pedidosAll.length > 0) {
			setPedidoAll(pedidosAll);
		}
    }, [pedidosAll]);

    console.log("pedidos cocina")
	console.log(pedidoAll)
	
	return (
		<>
			<section className="row mx-4">
				<article className="col-12 my-3">
					<h2>Lista de pedidos</h2>
					<p className="fw-semibold subtitulo">Pedidos listados según orden de llegada</p>
				</article>

				<section className="col-12">
					<div className="d-flex justify-content-between flex-wrap">
						{pedidoAll.map((pedido) => (
							<Card key={pedido.pedidoId} pedido={pedido} />
						))}
					</div>
				</section>
			</section>
		</>
	);
};
