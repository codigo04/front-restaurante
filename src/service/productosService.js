import axios from "axios";



const BASE_URL = 'http://localhost:8080';

export const saveBebidas = async (tokenUser, producto) => {
    console.log(producto);
    console.log(tokenUser);
    try {
        const configToken = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${tokenUser}`,
            },
        };

        // Enviar el token y hacer el POST al endpoint correcto
        const response = await axios.post(`${BASE_URL}/api/v1/admin/productos/crear`,producto,configToken);

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error al agregar ', error);
        throw error;
    }
};


export const geBebidas = async (tokenUser) => {

    try {
        const configToken = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenUser}`,
            }
        }
        const response = await axios.get(`${BASE_URL}/api/v1/admin/productos/todos`, configToken);
        // console.log("Empleados recibidos:", response.data);
        return response.data;

    } catch (error) {
        console.error('Error al obtener ', error);
        throw error;
    }
};