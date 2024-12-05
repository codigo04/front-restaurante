import React, { useContext, useEffect, useState } from "react";
import { PedidoContext } from "../../context/PedidoProvider";
import { WebSocketContext } from "../../context/WebSocketProvider";
import { obtenerPedioPDF } from "../../service/reportes";
import { actualizarEstadoPedido } from "../../service/pedidoService";
import { CuerpoModal } from "../../components/modals/CuerpoModal";
import { updateEstadoMesa } from "../../service/mesasService";
import { LuPrinter } from "react-icons/lu";
import { MdOutlinePayment } from "react-icons/md";
import {
  FaCreditCard,
  FaMobileAlt,
  FaMoneyBillWave,
  FaQrcode,
} from "react-icons/fa";
import { obtenerCajaActual } from "../../service/cajaService";
import { toast } from "react-toastify";

export const Cajero = () => {
  const { messagesCaja } = useContext(WebSocketContext);
  const [pedidosAll, setPedidoAll] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { filtrados, getPedidoAllEstado } = useContext(PedidoContext);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] = useState(null);
  const [isCajaAbierta, setIsCajaAbierta] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPedidos = async () => {
      setIsLoading(true);
      await getPedidoAllEstado("PENDIENTE");
    };
    fetchPedidos();
  }, [getPedidoAllEstado]);

  useEffect(() => {
    if (filtrados.length > 0) {
      setPedidoAll(filtrados);
    }
  }, [filtrados]);

  useEffect(() => {
    setPedidoAll((prevPedidoAll) => [...prevPedidoAll, ...messagesCaja]);
  }, [messagesCaja]);

  useEffect(() => {
    const verificarCaja = async () => {
      try {
        const response = await obtenerCajaActual();
        if (response.data.abierta) {
          setIsCajaAbierta(true);
        } else {
          setIsCajaAbierta(false);
          toast.warning("Debe aperturar la caja antes de cobrar.");
        }
      } catch (error) {
        console.error("Error al verificar el estado de la caja:", error);
      }
    };
    verificarCaja();
  }, []);

  const handleCobrar = (pedido) => {
    if (!isCajaAbierta) {
      toast.warning("Debe aperturar la caja antes de cobrar.");
      return;
    }
    setPedidoSeleccionado(pedido);
    setShowPaymentDetails(true);
  };
  const calcularTotal = (detallePedidos) => {
    return detallePedidos.reduce((total, item) => {
      return total + item.cantidad * item.precio;
    }, 0);
  };

  const handleMetodoPago = (metodo) => {
    setMetodoPagoSeleccionado(metodo);
  };
  const handlePrint = async () => {
    if (!pedidoSeleccionado) return;
    await obtenerPedioPDF(pedidoSeleccionado.idPedido);
    await actualizarEstadoPedido(pedidoSeleccionado.idPedido, "PAGADO");
    await updateEstadoMesa(
      { estado: "DISPONIBLE" },
      pedidoSeleccionado.mesa.idMesa
    );
    setPedidoSeleccionado(null);
    setShowPaymentDetails(false);
    setMetodoPagoSeleccionado(null);
  };

  const handleSearchPedido = (e) => {
    setSearch(e.target.value);
  };

  const filterPedidos = pedidosAll.filter((pedido) => {
    return (
      pedido.cliente?.nombre?.toLowerCase().includes(search.toLowerCase()) ||
      false
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Lista de Mesas */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4">
            <h5 className="text-xl font-semibold text-gray-800">
              Mesas por Cobrar
            </h5>
            <div>
              <input
                type="search"
                placeholder="Buscar..."
                onChange={handleSearchPedido}
                className="w-full p-2 rounded-lg border border-gray-300"
              />
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {pedidosAll.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No hay mesas pendientes por cobrar
              </div>
            ) : (
              filterPedidos.map((pedido, index) => (
                <div key={pedido.id || index} className="p-4 hover:bg-gray-100">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
                        Mesa {pedido.mesa.numeroMesa}
                      </span>
                      <h6 className="font-medium text-gray-900">
                        {pedido.cliente
                          ? `${pedido.cliente.nombre} ${pedido.cliente.apellido}`
                          : "Cliente"}
                      </h6>
                    </div>
                    <button
                      onClick={() => handleCobrar(pedido)}
                      className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                    >
                      <MdOutlinePayment className="mr-2" />
                      <span>Cobrar</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Modal de Cobro */}
        {showPaymentDetails && (
          <CuerpoModal
            titulo="Detalle de Cobro"
            onClose={() => setShowPaymentDetails(false)}
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              {/* Métodos de Pago */}
              <div className="space-y-4">
                <h6 className="text-gray-500 font-medium">Método de Pago</h6>
                <div className="grid grid-cols-2 gap-4">
                  {["Yape", "Efectivo", "Plin", "Visa"].map((metodo) => (
                    <button
                      key={metodo}
                      onClick={() => handleMetodoPago(metodo)}
                      className={`p-2 rounded-lg border-2 flex items-center justify-center space-x-2 transition-all
                        ${
                          metodoPagoSeleccionado === metodo
                            ? "bg-orange-600 text-white border-black-600"
                            : "border-gray-300 text-gray-700 hover:border-orange-600 hover:text-orange-600"
                        }`}
                    >
                      {metodo === "Yape" && <FaQrcode />}
                      {metodo === "Efectivo" && <FaMoneyBillWave />}
                      {metodo === "Plin" && <FaMobileAlt />}
                      {metodo === "Visa" && <FaCreditCard />}
                      <span>{metodo}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="my-3 border-t border-gray-200" />

              {/* Detalle del Pedido */}
              <div className="space-y-2">
                <h6 className="text-gray-500 font-medium">
                  Detalle del Pedido
                </h6>
                <div className="space-y-3">
                  {pedidoSeleccionado?.detallePedidos.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
                          {item.cantidad}x
                        </span>
                        <span className="font-medium">
                          {item.producto.nombre}
                        </span>
                      </div>
                      <span className="font-bold">
                        S/ {(item.cantidad * item.precio).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totales */}
              {pedidoSeleccionado && (
                <div className="mt-2 bg-gray-100 rounded-lg p-2 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span>
                      S/{" "}
                      {(
                        calcularTotal(pedidoSeleccionado.detallePedidos) / 1.18
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">IGV (18%)</span>
                    <span>
                      S/{" "}
                      {(
                        calcularTotal(pedidoSeleccionado.detallePedidos) * 0.18
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 my-2" />
                  <div className="flex justify-between text-sm font-semibold">
                    <span>Total</span>
                    <span>
                      S/{" "}
                      {calcularTotal(pedidoSeleccionado.detallePedidos).toFixed(
                        2
                      )}
                    </span>
                  </div>
                </div>
              )}

              {/* Botón de Impresión */}
              <button
                onClick={handlePrint}
                disabled={!metodoPagoSeleccionado}
                className={`mt-1 w-full py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors
                  ${
                    !metodoPagoSeleccionado
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-orange-600 hover:bg-orange-700 text-white"
                  }`}
              >
                <LuPrinter />
                <span>Imprimir Comprobante</span>
              </button>
            </div>
          </CuerpoModal>
        )}
      </div>
    </div>
  );
};
