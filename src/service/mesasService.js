import axios from "axios";



const BASE_URL = 'http://localhost:8080'; // Reemplaza con la URL real de tu API.


export const obtenerMesas = async () => {
    const token = localStorage.getItem('token')
    const configToken = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }

    try {

        const response = await axios.get(`${BASE_URL}/api/v1/admin/mesas/todos`, configToken);
        return response.data;

    } catch (error) {
        console.error('Error al obtener las mesas', error);
        throw error;
    }
};



export const saveMesa = async (nuevaMesa) => {
    const token = localStorage.getItem('token')
    const configToken = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }


    try {

       
        const response = await axios.post(`${BASE_URL}/api/v1/admin/mesas/crear`, nuevaMesa, configToken);
        return response.data;
    } catch (error) {
        console.error('Error al agregar la mesa', error);
        // alert('CONCECTATE A TU SERVIDOR')
        throw error;
    }
};


// /actualizar/{id}
export const actualizarEstadoMesa = async (nuevaMesa, idMesa) => {

    try {
        const response = await axios.put(`${BASE_URL}/api/v1/admin/mesas/actualizar/${idMesa}`, nuevaMesa, configToken);
        return response.data; // Retorna la respuesta para que puedas usarla donde llames a la función
    } catch (error) {
        console.error('Error al actualizar la mesa', error);
        throw error; // Lanzar el error para manejarlo en el lugar donde se llame a la función
    }
}