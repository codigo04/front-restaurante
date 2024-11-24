import { useState } from "react";
import { CardFooter } from "./CardFooter";
import { CardHeader } from "./CardHeader";
import { CardMain } from "./CardMain";

export const Card = ({pedido}) => {

  const [estado, setEstado] = useState(pedido.estado)

  const cambiarEstado = () => {
    setEstado( (estado)=>(
      estado === 'completado' ? 'pendiente' : 'completado'
    ))
  }

  return (
    <>
      <div
        className="card text-white bg-card rounded-4 my-3 "
        style={{ maxWidth: "18rem" }}
      >
        <CardHeader numeroMesa={pedido.mesa.numeroMesa} horaPedido={pedido.horaPedido}/>
        <CardMain
          // imagenUrl={pedido.imagenUrl}
          platos={pedido.detallePedidos}
          estado={estado}
          cambiarEstado={cambiarEstado}
        />
        <CardFooter estado={estado} onCompletar={cambiarEstado}/>
      </div>
    </>
  );
};
