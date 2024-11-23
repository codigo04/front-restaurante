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
        "pedidoId": "123",
        "mesa": "3",
        "hora": "2024-11-22T15:30:00",
        "productos": [
            {
                "nombre": "Hamburguesa con queso",
                "stock": 2,
                "observaciones": "Sin tomate"
            },
            {
                "nombre": "Papas fritas",
                "cantidad": 1
            },
            {
                "nombre": "Coca-Cola",
                "cantidad": 3
            }
        ],
        "estado": "Enviado a cocina",
        "observaciones": "Mesa junto a la ventana"
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