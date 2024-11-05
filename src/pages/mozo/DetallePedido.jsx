import React, { useContext, useState } from 'react'
import { PedidoContext } from '../../context/PedidoProvider';
import { NavLink } from 'react-router-dom';

export const DetallePedido = () => {


    const { listaPedido, eliminarProducto, aumentarCantidad, disminuirCantidad } = useContext(PedidoContext)

    const [dni, setDni] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')



    const deleteProducto = (id) => {

        eliminarProducto(id);

    }

const handleSubmit = (e) =>{
    e.preventDefault();
}
    
    const handleSearchCliente = (e) =>{
        console.log(dni)
    }

    // return listaCompras.reduce((total, item) => total + item.price * item.cantidad, 0).toFixed(2);
    const calcularTotal = () => {
        return listaPedido.reduce((total, item) => total + item.price * item.cantidad, 0).toFixed(2);
    }

    console.log(calcularTotal())
    return (
        <>

            <div className='container-fluid container-color  p-3'>


                <div className='table-container'>
                    <table className="table">
                        {/* <thead>
                            <tr>
                                <th scope="col">Imagen</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Eliminar</th>
                            </tr>
                        </thead> */}
                        <tbody>
                            {
                                listaPedido.map(producto => (
                                    <tr>

                                        <td>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                {/* <img
                                                    
                                                    alt={`${producto.title} - Imagen`}
                                                    style={{
                                                        width: '100%',
                                                        maxWidth: '150px',
                                                        height: 'auto',
                                                        borderRadius: '5px',
                                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                                        objectFit: 'cover' // Mantiene la proporción sin distorsionar la imagen
                                                    }}
                                                /> */}
                                            </div>
                                        </td>
                                        <td>{producto.title}</td>
                                        <td className='' >
                                            <div className='d-flex flex-column align-items-center'>
                                                <div className='container-btns'>

                                                    <span
                                                        className=" btn-outline-danger "
                                                        onClick={() => disminuirCantidad(producto.id)}
                                                        style={{ cursor: 'pointer' }}
                                                    >-</span>

                                                    <span
                                                        className=" btn-primary " >{producto.cantidad}
                                                    </span>

                                                    <span
                                                        className=" btn-outline-danger "
                                                        onClick={() => aumentarCantidad(producto.id)}
                                                        style={{ cursor: 'pointer' }}
                                                    >+</span>




                                                </div>

                                                <div className='container-price'>
                                                    <span>s/{producto.price}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td >

                                            <div className='d-flex flex-column align-items-center container-btn-delete-pro' style={{ cursor: 'pointer' }}>
                                                <span onClick={() => deleteProducto(producto.id)} className='btn-delete-pro'

                                                > X</span>
                                            </div>

                                        </td>
                                    </tr>


                                ))
                            }


                        </tbody>
                    </table>
                </div>
            </div>
            <br />


            <div className="container-fluid d-flex justify-content-center p-4 container-color">
                <div className="container-fluid container-detalle-pedido p-4 rounded shadow-lg">

                    {/* Información del Cliente */}
                    <div className="row mb-4">
                        <form className="col-md-8" onSubmit={handleSubmit}>
                            <div className="d-flex align-items-end gap-2">
                                <div className="flex-grow-1">
                                    <label htmlFor="dniCliente" className="form-label">DNI del Cliente</label>
                                    <input
                                        type="text"
                                        placeholder="DNI del Cliente"
                                        className="form-control mb-3"
                                        id="dniCliente"
                                        name='dni'
                                        value={dni}
                                        onChange={(e) => setDni(e.target.value)}
                                    />
                                </div>
                                <button onClick={()=> handleSearchCliente()} className="btn color-primario mb-3">Buscar</button>
                            </div>

                            <label htmlFor="nombreCliente" className="form-label">Nombre del Cliente</label>
                            <input type="text" placeholder="Nombre del Cliente" className="form-control mb-3" id="nombreCliente" />

                            <label htmlFor="nombreApellido" className="form-label">Apellido del Cliente</label>
                            <input type="text" placeholder="Apellido del Cliente" className="form-control" id="nombreApellido" />
                        </form>

                        {/* Detalle del Pedido */}
                        <div className="col-md-4 d-flex flex-column align-items-center justify-content-between">
                            <div className="text-center mb-4">
                                <label className="form-label">Subtotal del Pedido</label>
                                <h2 className="">s/{calcularTotal()}</h2>
                            </div>

                            <div className="d-grid gap-3 w-100">
                                <NavLink to="/mozo/mesas" className="btn btn-success color-primario">Confirmar Pedido</NavLink>
                                <NavLink to="/mozo/mesas" className="btn btn-danger color-primario">Cancelar</NavLink>
                            </div>
                        </div>
                    </div>

                </div>
            </div>




            <br />


        </>
    )
}


