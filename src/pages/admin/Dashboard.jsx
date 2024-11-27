import React, { useContext, useMemo, useState } from 'react'
import { Saludo } from '../../components/Globals/Saludo'
import '../../assets/styles/cssAdmin/css.css'
import { Progress } from '../../components/adm/Progress';
import pollo from '../../assets/img/adm/pollo.jpg';
import { AuthContext } from '../../context/AuthProvider';
import { useMediaQuery } from '@mui/material';

import { Navigate, useNavigate } from 'react-router-dom';
import { MesaPedidoContext } from '../../context/MesaPedidoProvider';
import { PedidoContext } from '../../context/PedidoProvider';

const meses = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Nobiembre',
  'Diciembre',
];

// Función para obtener la fecha actual en formato YYYY-MM-DD
const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0]; // Formato 'YYYY-MM-DD'
};

const calcularTotalPorFecha = (pedidos) => {
  const currentDate = getCurrentDate(); // Obtener la fecha actual en formato 'YYYY-MM-DD'

  // Filtrar los pedidos que coincidan con la fecha actual
  const pedidosDeHoy = pedidos.filter((pedido) => {
    console.log("Analizando pedido:", pedido);
    return pedido.fechaPedido === currentDate;
  });


  

  // Calcular el total de ingresos de los pedidos de hoy
  const totalIngresos = pedidosDeHoy.reduce((acumulador, pedido) => {
    const totalPedido = pedido.detallePedidos.reduce(
      (subtotal, detalle) => subtotal + detalle.cantidad * detalle.precio,
      0
    );
    console.log(`Total del pedido ID ${pedido.idPedido}:`, totalPedido);
    return acumulador + totalPedido;
  }, 0);

  console.log("Total ingresos de hoy:", totalIngresos);

  return totalIngresos;
};

export const Dashboard = () => {

  const { usuarios } = useContext(AuthContext);
  // const { pedidosAll } = useContext(MesaPedidoContext)
  const { pedidoAll } = useContext(PedidoContext)
  const [selectPedido, setSelectedPedido] = useState(null);
  const [selectMes, setSelectMes] = useState('')
  const isMobile = useMediaQuery('(max-width:600px)')
  const navigate = useNavigate();

  console.log(pedidoAll)

  const handleView = (pedido) => {
    setSelectedPedido(pedido)
    console.log("pedidos pasados")
    console.log("Pedido seleccionado:", pedido);
  }

  const handleChange = (e) => {
    setSelectMes(e.target.value)

    console.log(e.target.value)
  }


  const calcularTotal = (detallePedido) => {

    console.log(detallePedido)

    return detallePedido.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0);
  }

  const calcularTotalIngresos = () => {
    pedidoAll.map((total, item) => (
      pedido.reduce
    ))
  }

  const totalDeHoy = calcularTotalPorFecha(pedidoAll);
  return (
    <>



      <section className='container-fluid' >

        <div className="row text-center my-4 " style={{ gap: isMobile ? '15px' : '0' }}>

          <div className="col-md-4">
            <div className="card-gradient">
              <h2>{pedidoAll.length}</h2>
              <p>Total Pedidos</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card-gradient">
              <h2>s/ {totalDeHoy.toFixed(2)}</h2>
              <p>Total Ingresos</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card-gradient">
              <h2>{usuarios.length}</h2>
              <p>Total Empleados</p>
            </div>
          </div>
        </div>
        {/* pedidos recientes */}
        <div className="container-fluid  ">
          <div className="row" style={{ gap: isMobile ? '15px' : '0' }}>
            {/* Pedidos Recientes Solicitados */}
            <div className="col-md-6 container-color">
              <article className="">

                <h3>Pedidos Recientes Solicitados</h3>
                <div className='table-container'>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Cliente</th>
                        <th>Mesa</th>
                        <th>Fecha - Hora</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pedidoAll.slice(0, 3).map((pedido, index) => (
                        <tr key={index}>
                          <td>{pedido.cliente?.nombre}</td>
                          <td>{pedido.mesa.numeroMesa}</td>
                          <td>{pedido.fechaPedido}</td>
                          <td>
                            <button onClick={() => handleView(pedido)} className="btn color-primario">
                              Ver
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button className="btn btn-warning color-primario" onClick={() => navigate("/admin/ordenes")} >Ver Todos</button>
              </article>
            </div>

            {/* Ganancia Mensual */}
            <div className="col-md-6" style={{ paddingRight: '0' }}>
              <div className="monthly-earnings container-color">
                <h3>Ganancia Mensual</h3>
                <div className="form-group mb-3">
                  <select
                    id="mesSelect"
                    className="form-select"
                    value={selectMes} // Vincula el valor del select al estado
                    onChange={handleChange} // Maneja el cambio
                  >
                    <option value="">Seleccionar un mes</option>
                    {meses.map((mes, index) => (
                      <option key={index} value={mes}>
                        {mes}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="earnings-bars">
                  {/* Pollo a la brasa */}
                  <Progress plato="Pollo a la brasa" porcentaje={100} />

                  {/* Pollo broaster */}
                  <Progress plato="Pollo broaster" porcentaje={75} />

                  {/* Bebidas */}
                  <Progress plato="Bebidas" porcentaje={47} />

                  {/* Mostrito */}
                  <Progress plato="Mostrito" porcentaje={30} />
                </div>
              </div>
            </div>
          </div>



        </div>


        {/* productos en tendencia */}
        <div className=''>
          <div className="my-4 container-fluid container-color" >
            <h3>Productos en Tendencia</h3>
            <div className="row" style={{ gap: isMobile ? '15px' : '0' }}>
              <div className="col-md-3">
                <img src={pollo} className="img-fluid" alt="Producto 1" />
              </div>
              <div className="col-md-3">
                <img src={pollo} className="img-fluid" alt="Producto 2" />
              </div>
              <div className="col-md-3">
                <img src={pollo} className="img-fluid" alt="Producto 3" />
              </div>
              <div className="col-md-3">
                <img src={pollo} className="img-fluid" alt="Producto 4" />
              </div>
            </div>
          </div>
        </div>

        {
          selectPedido && (
            <div className="order-details-overlay">
              <div className="order-details">
                <div className='d-flex justify-content-between'>
                  <h3>Detalles de la Orden</h3>

                  <button onClick={() => setSelectedPedido(null)} className="btn btn-secondary color-primario">
                    <i class="bi bi-x" style={{ color: 'white' }} ></i>
                  </button>
                </div>
                <div>
                  <p>Cliente: {selectPedido.cliente?.nombre}</p>
                  <p>Mesa: {selectPedido.mesa.numeroMesa}</p>
                  <p>Fecha: {selectPedido.fechaPedido}</p>
                  <p>Hora: {selectPedido.horaPedido}</p>
                  <p>Total Venta: S/{calcularTotal(selectPedido.detallePedidos)}</p>
                </div>
                <div className='table-container'>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        {/* <th>Acción</th> */}
                      </tr>
                    </thead>
                    {<tbody>
                      {selectPedido.detallePedidos.map((pedido, index) => (
                        <tr key={index}>
                          <td>{pedido.producto.nombre}</td>
                          <td>{pedido.cantidad}</td>
                          <td>S/{pedido.producto.precio}</td>
                          {/* <td><button onClick={() => handleView(order)} className="btn  color-primario">Ver</button></td> */}
                        </tr>
                      ))}
                    </tbody>}
                  </table>
                </div>
              </div>
            </div>
          )
        }





      </section>
    </>
  )
}
