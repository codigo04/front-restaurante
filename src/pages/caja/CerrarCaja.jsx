import React, { useEffect, useState } from "react";
import {
  abrirCaja,
  cerrarCaja,
  obtenerCajaActual,
  obtenerTotalVentasDesdeApertura,
} from "../../service/cajaService";
import { toast } from "react-toastify";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

export const CerrarCaja = () => {
  const [isCajaAbierta, setIsCajaAbierta] = useState(false);
  const [montoInicial, setMontoInicial] = useState(0);
  const [montoFinal, setMontoFinal] = useState(0);
  const [totalVentas, setTotalVentas] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [cajaActual, setCajaActual] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [cajaResponse, ventasDesdeAperturaResponse] = await Promise.all([
          obtenerCajaActual(),
          obtenerTotalVentasDesdeApertura(),
        ]);

        const ventasTotal = ventasDesdeAperturaResponse.data || 0;
        setTotalVentas(Number(ventasTotal));

        if (cajaResponse?.data?.abierta) {
          setIsCajaAbierta(true);
          setCajaActual(cajaResponse.data);
          setMontoInicial(cajaResponse.data.montoInicial || 0);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAbrirCaja = async () => {
    try {
      if (montoInicial <= 0) {
        toast.error("El monto inicial debe ser mayor a 0");
        return;
      }
      const empleadoId = "1";
      const response = await abrirCaja(montoInicial, empleadoId);
      setCajaActual(response);
      setIsCajaAbierta(true);
      setTotalVentas(0);
      toast.success("Caja abierta con éxito");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al abrir la caja");
    }
  };

  const handleCerrarCaja = async () => {
    try {
      await cerrarCaja(montoFinal);
      setIsCajaAbierta(false);
      setCajaActual(null);
      setTotalVentas(0);
      toast.success("Caja cerrada con éxito");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al cerrar la caja");
    }
  };
  if (isLoading) {
    return <div>Cargando...</div>;
  }

  const totalEnCaja =
    Number(cajaActual?.montoInicial || 0) + Number(totalVentas || 0);

  const data = {
    labels: ["Monto Inicial", "Total Ventas"],
    datasets: [
      {
        data: [Number(cajaActual?.montoInicial || 0), Number(totalVentas || 0)],
        backgroundColor: ["#4CAF50", "#FF9800"],
        hoverBackgroundColor: ["#45A049", "#FF8C00"],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className=" max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          {!isCajaAbierta ? (
            <div>
              <h5 className="text-2xl font-semibold mb-4">Apertura de Caja</h5>
              <div className="mb-4">
                <label
                  htmlFor="montoInicial"
                  className="text-sm font-medium block"
                >
                  Monto Inicial
                </label>
                <input
                  type="number"
                  className="mt-1 block text-sm font-medium shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:orange-opacity-500 rounded-md p-1"
                  id="montoInicial"
                  placeholder="0:00"
                  onChange={(e) => setMontoInicial(Number(e.target.value))}
                />
              </div>
              <button
                className=" w-full bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-md block"
                onClick={handleAbrirCaja}
                disabled={montoInicial <= 0}
              >
                Abrir Caja
              </button>
            </div>
          ) : (
            <div>
              <h5 className="text-2xl font-semibold mb-4">Cierre de Caja</h5>
              <div className="bg-blue-50 p-4 rounded-md mb-4">
                <div className="mb-2">
                  <strong>Empleado:</strong> {cajaActual?.empleado?.nombres}{" "}
                  {cajaActual?.empleado?.apellidos}
                </div>
                <div className="mb-2">
                  <strong>Monto Inicial:</strong> S/{" "}
                  {Number(cajaActual?.montoInicial || 0).toFixed(2)}
                </div>
                <div className="mb-2">
                  <strong>Total Ventas del Día:</strong> S/
                  {Number(totalVentas || 0).toFixed(2)}
                </div>
                <div className="mb-2">
                  <strong>Total en Caja:</strong> S/{" "}
                  {(
                    Number(cajaActual?.montoInicial || 0) +
                    Number(totalVentas || 0)
                  ).toFixed(2)}
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="montoFinal"
                  className="block text-sm font-medium "
                >
                  Monto Final
                </label>
                <input
                  type="number"
                  className="mt-1 block text-sm font-medium shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:orange-opacity-500 rounded-md p-1"
                  id="montoFinal"
                  value={(
                    Number(cajaActual?.montoInicial || 0) +
                    Number(totalVentas || 0)
                  ).toFixed(2)}
                  onChange={(e) => setMontoFinal(Number(e.target.value))}
                />
              </div>
              <button
                className="w-full bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-md block"
                onClick={handleCerrarCaja}
              >
                Cerrar Caja
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
