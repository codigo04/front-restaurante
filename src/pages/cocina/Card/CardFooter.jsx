import { useContext, useState } from "react";
import { WebSocketContext } from "../../../context/WebSocketProvider";

export const CardFooter = ({ estado, onCompletar,handlePedido }) => {

  const handleSubmitPrueba = (pedido) => {
    const detallePedido = {
      "idPedido": 182,
      "fechaPedido": "2024-11-28",
      "horaPedido": "14:45:00",
      "estado": "ENTREGADO",
      "observaciones": "Sin gluten, mesa cerca de la ventana.",
      "cliente": {
        "idCliente": 3,
        "nombre": "GIOBANI CALIXTO",
        "apellido": "MAMANI YUCRA",
        "dni": "71493800",
        "correo": null,
        "telefono": null,
        "direccion": null
      },
      "empleado": {
        "nombres": "adrian",
        "apellidos": "policio",
        "correo": "admin@gmail.com",
        "password": "$2a$10$/gRPoHb1cp2o9fFMvsNkFetG6fw0x6LioPmX4JI66iHdO/WAOywA.",
        "numDoc": "76778679"
      },
      "mesa": {
        "id": 1,
        "numeroMesa": "21",
        "capacidad": 0,
        "estado": "DISPONIBLE"
      },
      "detallePedidos": [
        {
          "idDetallePedido": 354,
          "cantidad": 1,
          "precio": 1.5,
          "idPedido": 182,
          "idProducto": null,
          "idCombo": 1,
          "producto": {
            "id": 1,
            "nombre": "Coca Cola",
            "precio": 1.5,
            "descripcion": "Bebida gaseosa refrescante",
            "imagen": "https://images.unsplash.com/photo-1667204651371-5d4a65b8b5a9?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvY2ElMjBjb2xhfGVufDB8fDB8fHww",
            "estado": "ACTIVO",
            "porcion": "",
            "stock": 100,
            "litros": "500",
            "idCategoria": null
          }
        },

      ]
    }

    handlePedido(pedido)
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
