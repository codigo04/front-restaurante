import React, { useContext } from 'react'
import { Saludo } from '../../components/Globals/Saludo'
import '../../assets/styles/cssAdmin/css.css'
import { Progress } from '../../components/adm/Progress';
import  pollo from '../../assets/img/adm/pollo.jpg';
import { AuthContext } from '../../context/AuthProvider';
import { useMediaQuery } from '@mui/material';


export const Dashboard = () => {
                     
   const { usuarios } = useContext(AuthContext);


    const isMobile = useMediaQuery('(max-width:600px)')
  const orders = [
    { client: 'Cliente 1', table: 5, date: '14/08/2001', time: '10:00' },
    { client: 'Cliente 2', table: 5, date: '14/08/2001', time: '10:00' }

  ];


  return (
    <>
     


      <section className='container-fluid' >

        <div className="row text-center my-4 " style={{gap: isMobile? '15px' : '0'}}>

          <div className="col-md-4">
            <div className="card-gradient">
              <h2>20</h2>
              <p>Total Órdenes</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card-gradient">
              <h2>s/ 499.00</h2>
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
          <div className="row" style={{gap: isMobile? '15px' : '0'}}>
            {/* Pedidos Recientes Solicitados */}
            <div className="col-md-6 container-color">
              <article className="">

                <h3>Pedidos Recientes Solicitados</h3>
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
                    {orders.map((order, index) => (
                      <tr key={index}>
                        <td>{order.client}</td>
                        <td>{order.table}</td>
                        <td>{order.date} - {order.time}</td>
                        <td><button className="btn  color-primario">Ver</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className="btn btn-warning color-primario">Ver Todos</button>
              </article>
            </div>

            {/* Ganancia Mensual */}
            <div className="col-md-6" style={{paddingRight:'0'}}>
              <div className="monthly-earnings container-color">
                <h3>Ganancia Mensual</h3>
                <div className="form-group mb-3">
                  <select className="form-select">
                    <option>Seleccionar un mes</option>
                    <option>Agosto 2024</option>
                    <option>Julio 2024</option>
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
            <div className="row" style={{gap: isMobile? '15px' : '0'}}>
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
      </section>
    </>
  )
}
