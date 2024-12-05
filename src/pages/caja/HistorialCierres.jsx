import React, { useState, useEffect } from "react";
import { obtenerHistorialCierres } from "../../service/cajaService";
import { toast } from "react-toastify";

export const HistorialCierres = () => {
  const [cierres, setCierres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

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

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const filteredCierres = cierres.filter((cierre) =>
    cierre.empleado.nombres.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto ">
      <div>
        <label className="block text-lg font-semibold mb-2">Buscar</label>
        <input
          type="search"
          placeholder="Escribe para buscar..."
          className="w-full p-2 mb-4 border border-gray-400 rounded-lg"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <h4 className="text-2xl font-semibold mb-4">
        Historial de Cierres de Caja
      </h4>

      {isLoading ? (
        <div className="text-center">Cargando...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-400">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="py-2 px-4">Empleado</th>
                <th className="py-2 px-4">Fecha Apertura</th>
                <th className="py-2 px-4">Fecha Cierre</th>
                <th className="py-2 px-4">Monto Inicial</th>
                <th className="py-2 px-4">Monto Final</th>
                <th className="py-2 px-4">Total Ventas</th>
                <th className="py-2 px-4">Estado</th>
              </tr>
            </thead>
            <tbody>
              {filteredCierres.map((cierre) => (
                <tr
                  key={cierre.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-2 px-4">{`${cierre.empleado.nombres} ${cierre.empleado.apellidos}`}</td>

                  <td className="py-2 px-4">
                    {new Date(cierre.fechaApertura).toLocaleString()}
                  </td>
                  <td className="py-2 px-4">
                    {cierre.fechaCierre
                      ? new Date(cierre.fechaCierre).toLocaleString()
                      : "En curso"}
                  </td>
                  <td className="py-2 px-4">
                    S/ {cierre.montoInicial.toFixed(2)}
                  </td>
                  <td className="py-2 px-4">
                    {cierre.montoFinal
                      ? `S/ ${cierre.montoFinal.toFixed(2)}`
                      : "-"}
                  </td>
                  <td className="py-2 px-4">
                    S/{" "}
                    {(cierre.montoInicial + cierre.montoFinal).toFixed(2) ||
                      "0.00"}
                  </td>
                  <td className="py-2 px-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                        cierre.abierta
                          ? "bg-green-500 text-white"
                          : "bg-gray-500 text-white"
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
