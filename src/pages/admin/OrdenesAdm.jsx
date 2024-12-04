import React, { useContext, useState } from 'react'
import { TituloDescription } from '../../components/Globals/TituloDescription';
import { CuerpoModal } from '../../components/modals/CuerpoModal';
import { MesaPedidoContext } from '../../context/MesaPedidoProvider';
import { Button } from '@mui/material';

export const OrdenesAdm = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectPedido, setSelectedPedido] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEstado, setSelectedEstado] = useState("");

  const { pedidosAll } = useContext(MesaPedidoContext)

  const calcularTotal = (detallePedido) => {
    console.log(detallePedido)
    return detallePedido.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0);
  }

  console.log(pedidosAll)

  const filteredPedidos = pedidosAll.filter((pedido) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      pedido.cliente?.nombre.toLowerCase().includes(query) ||
      pedido.mesa.numeroMesa.toString().includes(query) ||
      pedido.estado.toLowerCase().includes(query) ||
      pedido.idPedido.toString().includes(query);

    const matchesEstado = selectedEstado === "" || pedido.estado === selectedEstado;

    return matchesSearch && matchesEstado;
  });


  const handleView = (pedido) => {
    setSelectedPedido(pedido)
    setIsModalOpen(true)
    console.log("pedidos pasados")
    console.log("Pedido seleccionado:", pedido);
  }


  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Puedes filtrar los resultados basados en la búsqueda
    console.log("Buscando:", e.target.value);
  };

  const handleEstadoChange = (e) => {
    setSelectedEstado(e.target.value);
  };

  return (
    <>
      <section className='container-fluid container-color'>
        <div>
          <TituloDescription titulo={'Gestión de Ordenes'} decripcion={'Buscar '}></TituloDescription>
          <div className=" mt-4">
            <div className="row">
              <div className="col-md-12 mb-3">
                <label htmlFor="search" className="form-label">Buscar</label>
                <input
                  type="search"
                  className="form-control"
                  id="search"
                  name="search"
                  placeholder="Buscar Orden..."
                  aria-label="Buscar"
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
              <h3 className="mb-0">Listado de Ordenes</h3>
              <select
                id="mesSelect"
                className="form-select w-auto"
                aria-label="Filtrar por estado"
                onChange={handleEstadoChange}
              >
                <option value="">Todos</option>
                <option value="PENDIENTE">PENDIENTE</option>
                <option value="COMPLETADO">COMPLETADO</option>
              </select>
            </div>
            <div className='table-container'>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Cliente</th>
                    <th>Mesa</th>
                    <th>Estado</th>
                    <th>Total</th>
                    <th>Hora </th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPedidos.map((pedido, index) => (

                    <tr key={index}>
                      <td>{pedido.idPedido}</td>
                      <td>{pedido.cliente?.nombre}</td>
                      <td>{pedido.mesa.numeroMesa}</td>
                      <td>{pedido.estado}</td>
                      <td>S/{calcularTotal(pedido.detallePedidos)}</td>
                      <td>{pedido.horaPedido}</td>
                      {/* <td>{pedido.cliente?.nombre}</td> */}

                      <td>
                        <Button

                          variant="contained"
                          sx={{ mt: 2, backgroundColor: "#ff6600", color: "#fff" }}
                          onClick={() => handleView(pedido)}
                        >
                          Ver detalles
                        </Button>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>


      {isModalOpen && (
        <CuerpoModal titulo="Detalles del Pedido" onClose={() => setIsModalOpen(false)}>
          <div>
            <p style={{ fontSize: "16px", margin: "8px 0", color: "#555" }}>
              <strong>Cliente:</strong> {selectPedido.cliente?.nombre}
            </p>
            <p style={{ fontSize: "16px", margin: "8px 0", color: "#555" }}>
              <strong>Mesa:</strong> {selectPedido.mesa.numeroMesa}
            </p>
            <p style={{ fontSize: "16px", margin: "8px 0", color: "#555" }}>
              <strong>Fecha:</strong> {selectPedido.fechaPedido}
            </p>
            <p style={{ fontSize: "16px", margin: "8px 0", color: "#555" }}>
              <strong>Hora:</strong> {selectPedido.horaPedido}
            </p>
            <p style={{ fontSize: "16px", margin: "8px 0", fontWeight: "bold", color: "#ff6600" }}>
              Total Venta: S/{calcularTotal(selectPedido.detallePedidos)}
            </p>
          </div>
          <div className='table-container'>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>selectPedido</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  {/* <th>Acción</th> */}
                </tr>
              </thead>
              <tbody>

                {

                  selectPedido.detallePedidos.map((pedido, index) => (
                    <tr key={index}>
                      <td>{pedido.producto.nombre}</td>
                      <td>{pedido.cantidad}</td>
                      <td>S/{pedido.producto.precio}</td>
                      {/* <td><button onClick={() => handleView(order)} className="btn  color-primario">Ver</button></td> */}
                    </tr>
                  ))

                }
              </tbody>
            </table>
          </div>
        </CuerpoModal>
      )}
    </>
  )
}
