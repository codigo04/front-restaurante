import { useContext, useState } from "react";
import { WebSocketContext } from "../../../context/WebSocketProvider";
import { toast } from "react-toastify";

export const CardFooter = ({ estado, onCompletar, handlePedido, estadoProducto }) => {

  const [listoPedido, setListoPedido] = useState(false)


  const handleSubmitPrueba = (pedido) => {


    if (estadoProducto === true) {
      handlePedido(pedido)
      toast.success("El pedido ha sido enviado al mozo con éxito.", {
        position: "top-center",
      });

    } else {
      toast.error("El pedido no está completo. Marca todos los productos", {
        position: "top-center",
      });

    }



  }

  return (
    <footer>
      <div className="container card-footer d-flex">
        <button
          className={`btn ${estado === "completado" ? "btn-success" : "btn-danger"} mx-auto w-75`}
          onClick={() => handleSubmitPrueba(onCompletar)}
        >
          {estado === "completado" ? "Completado" : "Marcar Listo"}
        </button>
      </div>
    </footer>
  )
}
