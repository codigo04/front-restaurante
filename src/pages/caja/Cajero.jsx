import React, { useContext, useEffect, useState } from "react";
import { PedidoContext } from "../../context/PedidoProvider";
import { toast } from "react-toastify";
import { WebSocketContext } from "../../context/WebSocketProvider";
import { obtenerPedioPDF } from "../../service/reportes";
import { actualizarEstadoPedido } from "../../service/pedidoService";

export const Cajero = () => {
  const { messagesCaja } = useContext(WebSocketContext);
  const [pedidosAll, setPedidoAll] = useState([]);
  const { filtrados, getPedidoAllEstado } = useContext(PedidoContext);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] = useState(null);

  useEffect(() => {
    getPedidoAllEstado("PENDIENTE"); // Filtrar pedidos por estado
  }, []);

  useEffect(() => {
    if (filtrados.length > 0) {
      setPedidoAll(filtrados);
    }
  }, [filtrados]);

  useEffect(() => {
    if (messagesCaja.length > 0) {
      toast.success("Nuevo Pedido Recibido de mozo", {
        position: "top-right",
      });
    }

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
    await actualizarEstadoPedido(pedidoSeleccionado.idPedido, "ENTREGADO");
    setPedidoAll((prevPedidoAll) =>
      prevPedidoAll.filter(
        (pedido) => pedido.idPedido !== pedidoSeleccionado.idPedido
      )
    );

    setPedidoSeleccionado(null);
    setShowPaymentDetails(false);
    setMetodoPagoSeleccionado(null);
  };
  return (
    <div className="container mt-5">
      <div className="row g-4">
        {/* Lista de Mesas */}
        <div className="col-12 col-md-8">
          <h5 className="mb-3">Lista de Mesas por cobrar:</h5>
          {pedidosAll.map((pedido, index) => (
            <div key={index} className="card mb-3">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="fw-bold">
                    NUMERO DE MESA: {pedido.mesa.numeroMesa}
                  </h6>
                  <p className="mb-0">
                    Nombre del Cliente: {pedido.cliente?.nombre}
                  </p>
                </div>
                <button onClick={() => handleCobrar(pedido)}>Cobrar</button>
              </div>
            </div>
          ))}
        </div>

        {/* Detalle de Cobro */}
        {showPaymentDetails && (
          <div className="col-12 col-md-4">
            <h5 className="mb-3">Detalle de Cobro</h5>
            <div className="card">
              <div className="card-body">
                <h6 className="mb-3">Método de Pago:</h6>
                <div className="d-flex gap-2 mb-3">
                  {["Yape", "Efectivo", "Plin", "Visa"].map((metodo) => (
                    <button
                      key={metodo}
                      className={`btn ${
                        metodoPagoSeleccionado === metodo
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                      onClick={() => handleMetodoPago(metodo)}
                    >
                      <i className="material-icons">
                        {metodo === "Yape" ? "QR " : ""}
                      </i>
                      {metodo}
                    </button>
                  ))}
                </div>

                <h6 className="mb-3">Detalle:</h6>
                <ul className="list-group mb-3">
                  {pedidoSeleccionado?.detallePedidos.map((item, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <span className="fw-bold">{item.cantidad}x</span>{" "}
                        {item.producto.nombre}
                      </div>
                      <span>S/ {(item.cantidad * item.precio).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>

                {/* Totales */}
                {pedidoSeleccionado && (
                  <>
                    <p className="mb-1">
                      Subtotal: S/{" "}
                      {(
                        calcularTotal(pedidoSeleccionado.detallePedidos) / 1.18
                      ).toFixed(2)}
                    </p>
                    <p className="mb-1">
                      IGV (18%): S/{" "}
                      {(
                        calcularTotal(pedidoSeleccionado.detallePedidos) * 0.18
                      ).toFixed(2)}
                    </p>
                    <h6 className="fw-bold mb-3">
                      Total a Pagar: S/{" "}
                      {calcularTotal(pedidoSeleccionado.detallePedidos).toFixed(
                        2
                      )}
                    </h6>
                  </>
                )}

                <button
                  className="btn btn-warning text-white w-100"
                  disabled={!metodoPagoSeleccionado}
                  onClick={handlePrint}
                >
                  Imprimir Comprobante
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
