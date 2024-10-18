import axios from "axios";

const BASE_URL = 'http://localhost:8080'; 
export const obtenerClientes = async (tokenUser) => {



    try {

        const configToken = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenUser}`,
            }
        }

        const response = await axios.get(`${BASE_URL}/api/v1/admin/clientes/todos`, configToken);
        //  console.log("Clientes recibidos:", response.data.data);
        return response;

    } catch (error) {
        console.error('Error al obtener los Clientes', error);
        throw error;
    }
};