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