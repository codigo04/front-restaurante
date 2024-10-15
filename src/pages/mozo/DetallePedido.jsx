import React, { useContext } from 'react'
import { PedidoContext } from '../../context/PedidoProvider';
import { NavLink } from 'react-router-dom';

export const DetallePedido = () => {


    const { listaPedido, eliminarProducto , aumentarCantidad, disminuirCantidad} = useContext(PedidoContext)



    const deleteProducto = (id) => {

        eliminarProducto(id);

    }

    // return listaCompras.reduce((total, item) => total + item.price * item.cantidad, 0).toFixed(2);
    const calcularTotal = () => {
        return listaPedido.reduce((total, item) => total + item.price * item.cantidad, 0).toFixed(2);
    }

    console.log(calcularTotal())
    return (
        <>

            <div className='container-fluid container-color  p-3'>


                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Imagen</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>








                        {
                            listaPedido.map(producto => (
                                <tr>

                                    <td>url</td>
                                    <td>{producto.title}</td>
                                    <td>
                                        <div className='container-btns'>
                                            <button
                                                className="btn btn-outline-danger btn-cantidad-mozo"
                                                onClick={() => aumentarCantidad(producto.id)}

                                            >+</button>
                                            <button
                                                className="btn btn-primary btn-cantidad-mozo" >{producto.cantidad}</button>
                                            <button
                                                className="btn btn-outline-danger btn-cantidad-mozo"
                                                onClick={() => disminuirCantidad(producto.id)}
                                            >-</button>
                                        </div>

                                        <div className='container-price'>
                                            <span>s/{producto.price}</span>
                                        </div>
                                    </td>
                                    <td><button onClick={() => deleteProducto(producto.id)} className='btn btn-danger btn-cantidad-mozo'

                                    > X</button></td>
                                </tr>


                            ))
                        }




                    </tbody>
                </table>

            </div>

            <br />


            <div className='container-fluid d-flex  justify-content-between container-color  p-4'>

                <div className='container d-flex justify-content-between container-detalle-pedido'>
                    <div className=''>
                        <label htmlFor="nombreCliente" className="form-label">Nombre del Cliente</label>
                        <input type="text" placeholder='Nombre Cliente' className="form-control" id="nombreCliente" />
                    </div>


                    <div className='d-flex gap-3'>
                        <div className=''>
                            <label htmlFor="nombreCliente" className="form-label">Subtotal del Pedido</label>
                            <h2>s/{calcularTotal()}</h2>
                        </div>

                        <div className='d-grid gap-2'>
                            <NavLink to='/mozo/mesas' className='btn btn-primary'>FINALIZAR PEDIDO</NavLink>
                            <NavLink to='/mozo/mesas' className='btn btn-primary'>CANCELAR</NavLink>
                        </div>
                    </div>
                </div>
            </div>



            <br />


        </>
    )
}


