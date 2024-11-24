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



export const obtenerPedido  =  (pedidoId) => {
    const detallePedido = {
        "idPedido": 1,
        "fechaPedido": "2024-10-15",
        "horaPedido": "12:30:00",
        "estado": "PENDIENTE",
        "observaciones": "Sin gluten, mesa cerca de la ventana.",
        "cliente": null,
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
          "estado": "OCUPADA"
        },
        "detallePedidos": [
          {
            "idDetallePedido": 42,
            "cantidad": 1,
            "precio": 12.0,
            "idPedido": 1,
            "idProducto": 4,
            "idCombo": 1
          },
          {
            "idDetallePedido": 43,
            "cantidad": 1,
            "precio": 21.0,
            "idPedido": 1,
            "idProducto": 5,
            "idCombo": 1
          },
          {
            "idDetallePedido": 67,
            "cantidad": 3,
            "precio": 9.99,
            "idPedido": 1,
            "idProducto": 1,
            "idCombo": 1
          }
        ]
      }
      

    // try {
    //     const response = await axios.post(`${BASE_URL}/api/v1/admin/detalle-pedidos/saveAll`, detallePedido, configToken);
    //     return response.data;
    // } catch (error) {
    //     console.error('Error al agregar el detaller pedido', error);
    //     // alert('CONÉCTATE A TU SERVIDOR')
    //     throw error; // Lanzamos el error para que lo maneje quien llame esta función
    // }


    return detallePedido;
}


export const getPedidos = async () => {

    try {
        const response = await axios.get(`${BASE_URL}/api/v1/admin/pedidos/todos`,configToken);
        return response.data;
    } catch (error) {
        console.error('Error al agregar el detaller pedido', error);
        // alert('CONÉCTATE A TU SERVIDOR')
        throw error; // Lanzamos el error para que lo maneje quien llame esta función
    }

}