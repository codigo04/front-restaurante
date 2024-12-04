import React, { useState, useEffect } from "react";
import { obtenerHistorialCierres } from "../../service/cajaService";
import { toast } from "react-toastify";

export const HistorialCierres = () => {
  const [cierres, setCierres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCierres = async () => {
      try {
        setIsLoading(true);
        const response = await obtenerHistorialCierres();
        setCierres(response.data);
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error al cargar el historial");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCierres();
  }, []);

  return (
    <div className="container mt-5">
      <h4 className="mb-4">Historial de Cierres de Caja</h4>

      {isLoading ? (
        <div className="text-center">Cargando...</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>Empleado</th>
                <th>Fecha Apertura</th>
                <th>Fecha Cierre</th>
                <th>Monto Inicial</th>
                <th>Monto Final</th>
                <th>Total Ventas</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {cierres.map((cierre) => (
                <tr key={cierre.id}>
                  <td>{`${cierre.empleado.nombres} ${cierre.empleado.apellidos}`}</td>

                  <td>{new Date(cierre.fechaApertura).toLocaleString()}</td>
                  <td>
                    {cierre.fechaCierre
                      ? new Date(cierre.fechaCierre).toLocaleString()
                      : "En curso"}
                  </td>
                  <td>S/ {cierre.montoInicial.toFixed(2)}</td>
                  <td>
                    {cierre.montoFinal
                      ? `S/ ${cierre.montoFinal.toFixed(2)}`
                      : "-"}
                  </td>
                  <td>
                    S/{" "}
                    {(cierre.montoInicial + cierre.montoFinal).toFixed(2) ||
                      "0.00"}
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        cierre.abierta ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {cierre.abierta ? "Abierta" : "Cerrada"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
