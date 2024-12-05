import React, { useEffect, useState } from "react";
import {
  abrirCaja,
  cerrarCaja,
  obtenerCajaActual,
  obtenerTotalVentasDesdeApertura,
} from "../../service/cajaService";
import { toast } from "react-toastify";

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

  return (
    <div className="container mt-6">
      <div className="row g-4">
        <div className="col-12">
          {!isCajaAbierta ? (
            <div className="card">
              <div className="card-body">
                <h5 className="mb-3">Apertura de Caja</h5>
                <div className="mb-3">
                  <label htmlFor="montoInicial" className="form-label">
                    Monto Inicial
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="montoInicial"
                    placeholder="0:00"
                    onChange={(e) => setMontoInicial(Number(e.target.value))}
                  />
                </div>
                <button
                  className="btn btn-primary"
                  onClick={handleAbrirCaja}
                  disabled={montoInicial <= 0}
                >
                  Abrir Caja
                </button>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="card-body">
                <h5 className="mb-3">Cierre de Caja</h5>
                <div className="alert alert-info mb-3">
                  <div>
                    <strong>Empleado:</strong> {cajaActual?.empleado?.nombres}{" "}
                    {cajaActual?.empleado?.apellidos}
                  </div>
                  <div>
                    <strong>Monto Inicial:</strong> S/{" "}
                    {Number(cajaActual?.montoInicial || 0).toFixed(2)}
                  </div>
                  <div>
                    <strong>Total Ventas del Día:</strong> S/
                    {Number(totalVentas || 0).toFixed(2)}
                  </div>
                  <div>
                    <strong>Total en Caja:</strong> S/{" "}
                    {(
                      Number(cajaActual?.montoInicial || 0) +
                      Number(totalVentas || 0)
                    ).toFixed(2)}
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="montoFinal" className="form-label">
                    Monto Final
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="montoFinal"
                    value={(
                      Number(cajaActual?.montoInicial || 0) +
                      Number(totalVentas || 0)
                    ).toFixed(2)}
                    onChange={(e) => setMontoFinal(Number(e.target.value))}
                  />
                </div>
                <button className="btn btn-danger" onClick={handleCerrarCaja}>
                  Cerrar Caja
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
