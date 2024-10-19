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



export const consultaDni = async (tokenUser, dni) => {
    console.log(dni);
    console.log(tokenUser);
    try {
        const configToken = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${tokenUser}`,
            },
        };

        // Enviar el token y hacer el POST al endpoint correcto
        const response = await axios.post(`${BASE_URL}/api/v1/admin/empleado/${dni}`, null, configToken);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el empleado', error);
        throw error;
    }
};






export const saveAdmin= async (tokenUser, empleado) => {
    console.log(empleado);
    console.log(tokenUser);
    try {
        const configToken = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${tokenUser}`,
            },
        };

        // Enviar el token y hacer el POST al endpoint correcto
        const response = await axios.post(`${BASE_URL}/api/v1/autenticacion/signupadmin`, empleado,configToken);

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error al agregar ', error);
        throw error;
    }
};



export const saveCajero = async (tokenUser, empleado) => {
    console.log(empleado);
    console.log(tokenUser);
    try {
        const configToken = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${tokenUser}`,
            },
        };

        // Enviar el token y hacer el POST al endpoint correcto
        const response = await axios.post(`${BASE_URL}/api/v1/autenticacion/signupcajero`, empleado,configToken);

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error al agregar ', error);
        throw error;
    }
};



export const saveMoso = async (tokenUser, empleado) => {
    console.log(empleado);
    console.log(tokenUser);
    try {
        const configToken = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${tokenUser}`,
            },
        };

        // Enviar el token y hacer el POST al endpoint correcto
        const response = await axios.post(`${BASE_URL}/api/v1/autenticacion/signupmoso`, empleado,configToken);

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error al agregar ', error);
        throw error;
    }
};



export const saveCocinero = async (tokenUser, empleado) => {
    console.log(empleado);
    console.log(tokenUser);
    try {
        const configToken = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${tokenUser}`,
            },
        };

        // Enviar el token y hacer el POST al endpoint correcto
        const response = await axios.post(`${BASE_URL}/api/v1/autenticacion/signupcocinero`, empleado,configToken);

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error al agregar ', error);
        throw error;
    }
};






