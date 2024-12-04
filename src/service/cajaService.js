import axios from "axios";

const BASE_URL = "http://localhost:8080";

const token = localStorage.getItem("token");
const configToken = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

//Para abrir la caja
export const abrirCaja = async (montoInicial, empleadoId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/admin/caja/abrir`,
      { montoInicial, empleadoId },
      configToken
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Error al abrir la caja");
  }
};

//para cerrar la caja
export const cerrarCaja = async (montoFinal) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/admin/caja/cerrar`,
      { montoFinal },
      configToken
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Error al cerrar la caja");
  }
};

//Para obtener la caja actual
export const obtenerCajaActual = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/admin/caja/actual`,
      configToken
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Error al obtener la caja actual");
  }
};

//Para ver el historial de cierres
export const obtenerHistorialCierres = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/admin/caja/historial-cierres`,
      configToken
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Error al obtener el historial de cierres");
  }
};


export const obtenerTotalVentasDesdeApertura = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/admin/caja/ventas-desde-apertura`,
      configToken
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Error al obtener el total de ventas desde la apertura");
  }
};
