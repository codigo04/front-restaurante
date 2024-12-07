import axios from "axios";


const BASE_URL =import.meta.env.VITE_BASE_URL; // Reemplaza con la URL real de tu API.
const token = localStorage.getItem('token')
const configToken = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    }
}
export const saveBebidas = async (producto) => {
    console.log(producto);
    console.log(token);
    try {

        // Enviar el token y hacer el POST al endpoint correcto
        const response = await axios.post(`${BASE_URL}/api/v1/admin/productos/crear`, producto, configToken);

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error al agregar ', error);
        throw error;
    }
};


export const geBebidas = async () => {

    try {

        const response = await axios.get(`${BASE_URL}/api/v1/admin/productos/todos`, configToken);
        // console.log("Empleados recibidos:", response.data);
        return response.data;

    } catch (error) {
        console.error('Error al obtener ', error);
        throw error;
    }
};



export const updateProductoService = async (idProducto,producto) => {

    try {

        const response = await axios.put(`${BASE_URL}/api/v1/admin/productos/actualizar/${idProducto}`, producto, configToken);
        return response.data;
    
    } catch (error) {
        console.error('Error al obtener ', error);
        throw error;
    }
};