import axios from "axios";


const BASE_URL = 'http://localhost:8080'; // Reemplaza con la URL real de tu API.
const token = localStorage.getItem('token')
const configToken = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    }
}
export const obtenerEmpledos = async () => {

    try {
        const configToken = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
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



export const consultaDni = async (dni) => {
    
    try {

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


// /actualizar/{id}
export const actualizarEmpleado =  (nuevoEmpleado) => {

    const token = localStorage.getItem('token')

    console.log('nuevos datos')
    console.log(nuevoEmpleado)

    console.log("token extraiodo  "+token)
    const configToken = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }

    // try {
    //     const response = await axios.put(`${BASE_URL}/api/v1/admin/mesas/actualizar/${idMesa}`, nuevaMesa, configToken);
    //     return response.data; // Retorna la respuesta para que puedas usarla donde llames a la función
    // } catch (error) {
    //     console.error('Error al actualizar la mesa', error);
    //     throw error; // Lanzar el error para manejarlo en el lugar donde se llame a la función
    // }
}




