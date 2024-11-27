import axios from "axios";

const BASE_URL = 'http://localhost:8080'; // Reemplaza con la URL real de tu API.
const token = localStorage.getItem('token')
const configToken = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }
}

export const savePedido = async (pedido) => {

  try {
    const response = await axios.post(`${BASE_URL}/api/v1/admin/pedidos/crear`, pedido, configToken);
    return response.data;
  } catch (error) {
    console.error('Error al agregar el pedido', error);
    // alert('CONÉCTATE A TU SERVIDOR')
    throw error; // Lanzamos el error para que lo maneje quien llame esta función
  }

}



export const saveDetallePedido = async (detallePedido) => {

  try {
    const response = await axios.post(`${BASE_URL}/api/v1/admin/detalle-pedidos/saveAll`, detallePedido, configToken);
    return response.data;
  } catch (error) {
    console.error('Error al agregar el detaller pedido', error);
    // alert('CONÉCTATE A TU SERVIDOR')
    throw error; // Lanzamos el error para que lo maneje quien llame esta función
  }

}



export const obtenerPedido = async (pedidoId) => {

  console.log(pedidoId)
  const detallePedido = {
    "idPedido": 53,
    "fechaPedido": "2024-11-25",
    "horaPedido": "11:33:00",
    "estado": "PENDIENTE",
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
        "idDetallePedido": 87,
        "cantidad": 1,
        "precio": 1.5,
        "idPedido": 53,
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
      }
    ]
  }


  try {
    const response = await axios.get(`${BASE_URL}/api/v1/admin/pedidos/${pedidoId}`, configToken);

     console.log("datos del back")

    console.log(response.data)

    console.log(response.data.data)
    return response.data.data;

  } catch (error) {
    console.error('Error al buscar el pedido', error);
    // alert('CONÉCTATE A TU SERVIDOR')
    throw error; // Lanzamos el error para que lo maneje quien llame esta función
  }



}


export const getPedidos = async () => {

  try {
    const response = await axios.get(`${BASE_URL}/api/v1/admin/pedidos/todos`, configToken);
    return response.data;
  } catch (error) {
    console.error('Error al agregar el detaller pedido', error);
    // alert('CONÉCTATE A TU SERVIDOR')
    throw error; // Lanzamos el error para que lo maneje quien llame esta función
  }

}