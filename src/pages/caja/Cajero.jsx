import React, { useContext, useEffect, useState } from "react";
import { PedidoContext } from "../../context/PedidoProvider";
import { toast } from "react-toastify";
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

export const Cajero = () => {
  const { messagesCaja } = useContext(WebSocketContext);
  const [pedidosAll, setPedidoAll] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { filtrados, getPedidoAllEstado } = useContext(PedidoContext);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] = useState(null);

  useEffect(() => {
    const fetchPedidos = async () => {
      setIsLoading(true);
      await getPedidoAllEstado("PENDIENTE");
    };
    fetchPedidos();
  }, []);

  useEffect(() => {
    if (filtrados.length > 0) {
      setPedidoAll(filtrados);
    }
  }, [filtrados]);

  useEffect(() => {
    setPedidoAll((prevPedidoAll) => [...prevPedidoAll, ...messagesCaja]);
  }, [messagesCaja]);

  const handleCobrar = (pedido) => {
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

  return (
    <div className="container ">
      <div className="row g-4">
        {/* Lista de Mesas */}
        <div className="col-12 ">
          <div className="card shadow-sm">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0">Mesas por Cobrar</h5>
            </div>
            <div className="card-body p-0">
              {pedidosAll.length === 0 ? (
                <div className="text-center p-4 text-muted">
                  No hay mesas pendientes por cobrar
                </div>
              ) : (
                <div className="list-group list-group-flush">
                  {pedidosAll.map((pedido, index) => (
                    <div key={pedido.id || index} className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center py-2">
                        <div>
                          <div className="d-flex align-items-center gap-2">
                            <span className="badge bg-primary rounded-pill">
                              Mesa {pedido.mesa.numeroMesa}
                            </span>
                            <h6 className="mb-0">
                              {pedido.cliente?.nombre || "Cliente"}
                            </h6>
                          </div>
                        </div>
                        <button
                          className="btn btn-warning px-4"
                          onClick={() => handleCobrar(pedido)}
                        >
                          <MdOutlinePayment />
                          Cobrar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal de Cobro */}
        {showPaymentDetails && (
          <CuerpoModal
            titulo="Detalle de Cobro"
            onClose={() => setShowPaymentDetails(false)}
          >
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                {/* Métodos de Pago */}
                <div className="mb-4">
                  <h6 className="text-muted mb-3">Método de Pago</h6>
                  <div className="row g-2">
                    {["Yape", "Efectivo", "Plin", "Visa"].map((metodo) => (
                      <div key={metodo} className="col-6">
                        <button
                          className={`btn btn-lg w-100 ${
                            metodoPagoSeleccionado === metodo
                              ? "btn-primary"
                              : "btn-outline-primary"
                          }`}
                          onClick={() => handleMetodoPago(metodo)}
                        >
                          <div className="d-flex align-items-center justify-content-center gap-2">
                            {metodo === "Yape" && <FaQrcode />}
                            {metodo === "Efectivo" && <FaMoneyBillWave />}
                            {metodo === "Plin" && <FaMobileAlt />}
                            {metodo === "Visa" && <FaCreditCard />}
                            <span>{metodo}</span>
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="my-4" />

                {/* Detalle del Pedido */}
                <div className="mb-4">
                  <h6 className="text-muted mb-3">Detalle del Pedido</h6>
                  <div className="list-group">
                    {pedidoSeleccionado?.detallePedidos.map((item, index) => (
                      <div
                        key={index}
                        className="list-group-item d-flex justify-content-between align-items-center py-3"
                      >
                        <div className="d-flex align-items-center gap-2">
                          <span className="badge bg-primary rounded-pill">
                            {item.cantidad}x
                          </span>
                          <span className="fw-medium">
                            {item.producto.nombre}
                          </span>
                        </div>
                        <span className="fw-bold">
                          S/ {(item.cantidad * item.precio).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totales */}
                {pedidoSeleccionado && (
                  <div className="bg-light p-4 rounded-3">
                    <div className="row g-2">
                      <div className="col-6">
                        <span className="text-muted">Subtotal</span>
                      </div>
                      <div className="col-6 text-end">
                        <span>
                          S/{" "}
                          {(
                            calcularTotal(pedidoSeleccionado.detallePedidos) /
                            1.18
                          ).toFixed(2)}
                        </span>
                      </div>
                      <div className="col-6">
                        <span className="text-muted">IGV (18%)</span>
                      </div>
                      <div className="col-6 text-end">
                        <span>
                          S/{" "}
                          {(
                            calcularTotal(pedidoSeleccionado.detallePedidos) *
                            0.18
                          ).toFixed(2)}
                        </span>
                      </div>
                      <div className="col-12">
                        <hr className="my-2" />
                      </div>
                      <div className="col-6">
                        <span className="h5 mb-0">Total</span>
                      </div>
                      <div className="col-6 text-end">
                        <span className="h5 mb-0">
                          S/{" "}
                          {calcularTotal(
                            pedidoSeleccionado.detallePedidos
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Botón de Impresión */}
                <button
                  className="btn btn-success btn-lg w-100 mt-4 d-flex align-items-center justify-content-center gap-2"
                  disabled={!metodoPagoSeleccionado}
                  onClick={handlePrint}
                >
                  <LuPrinter />
                  <span>Imprimir Comprobante</span>
                </button>
              </div>
            </div>
          </CuerpoModal>
        )}
      </div>
    </div>
  );
};
