import { useContext, useEffect } from "react";
import { WebSocketContext } from "../../context/WebSocketProvider ";
import { Card } from "./Card/Card";
import pedidos from "./Card/pedidos";
import "./style-cocina.css";
import { toast } from "react-toastify";

export const MainCocina = () => {

	const { messages } = useContext(WebSocketContext);

	useEffect(() => {
        if (messages.length > 0) {
            toast.success("Nuevo Pedido Recivido", {
                position: "top-right",
            });
        }
    }, [messages]);
	
	return (
		<>
			<section className="row mx-4">
				<article className="col-12 my-3">
					<h2>Lista de pedidos</h2>
					<p className="fw-semibold subtitulo">Pedidos listados según orden de llegada</p>
				</article>

				<section className="col-12">
					<div className="d-flex justify-content-between flex-wrap">
						{messages.map((pedido) => (
							<Card key={pedido.pedidoId} pedido={pedido} />
						))}
					</div>
				</section>
			</section>
		</>
	);
};
