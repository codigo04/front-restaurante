import axios from "axios";



const BASE_URL = 'http://localhost:8080'; // Reemplaza con la URL real de tu API.


export const obtenerEmpledos = async (tokenUser) => {



    try {

        const configToken = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenUser}`,
            }
        }

        const response = await axios.get(`${BASE_URL}/api/v1/autenticacion/todos`, configToken);
        // console.log("Empleados recibidos:", response.data);
        return response;

    } catch (error) {
        console.error('Error al obtener los empleados', error);
        throw error;
    }
};



export const consultaDni = async (tokenUser) => {
    try {
        const configToken = {
            headers :{
                "Content-type":"application/json",
                bearer: `Bearer ${tokenUser}`,
            }
        }
      const response = await axios.get(`${BASE_URL}/api/v1/autenticacion/todos`, configToken)

      return response;
    } catch (error) {
        console.error('Error al obtener el empleado', error);
        throw error;
    }
}