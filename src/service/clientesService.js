import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL; // Reemplaza con la URL real de tu API.
const token = localStorage.getItem('token')
const configToken = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    }
}
export const obtenerClientes = async () => {

    try {


        const response = await axios.get(`${BASE_URL}/api/v1/admin/clientes/todos`, configToken);
        //  console.log("Clientes recibidos:", response.data.data);
        return response;

    } catch (error) {
        console.error('Error al obtener los Clientes', error);
        // alert('CONCECTATE A TU SERVIDOR')
        throw error;
    }
};


export const saveCliente = async (dni) => {

    try {

        const response = await axios.post(`${BASE_URL}/api/v1/admin/clientes/crear`, dni,configToken);
        //  console.log("Clientes recibidos:", response.data.data);
        return response.data.data;

    } catch (error) {
        console.error('Error al obtener los Clientes', error);
        // alert('CONCECTATE A TU SERVIDOR')
        throw error;
    }
};





