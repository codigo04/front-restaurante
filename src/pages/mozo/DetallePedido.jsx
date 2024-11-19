import React, { useContext, useState } from 'react'
import { PedidoContext } from '../../context/PedidoProvider';
import { NavLink, useNavigate } from 'react-router-dom';
import { consultaDni } from '../../service/empleadosService';
import { saveCliente } from '../../service/clientesService';
import { MesasContext } from '../../context/MesasProvider';
import { savePedido } from '../../service/pedidoService';

export const DetallePedido = () => {

    const navigate = useNavigate()
 
    const { cambiarEstadoMesa,mostrarProductosMesa, mesasPedido,eliminarProducto, aumentarCantidad, disminuirCantidad } = useContext(PedidoContext)
    const { mesaSelect,cambiarEstado } = useContext(MesasContext);
    const [dni, setDni] = useState({
        dni: ''
    })
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [idCliente, setIdCliente] = useState('')

     
    const mesaSeleccionadaId = mesaSelect; // Cambia por el ID de la mesa que seleccionaste
    // Obtener la mesa seleccionada
    const mesaSeleccionada = mesasPedido.find((mesa) => mesa.idMesa === mesaSeleccionadaId);
    const productosMesa = mesaSeleccionada ? mesaSeleccionada.pedidos : [];

    const [pedido, setPedido] = useState({
        fechaPedido: '',
        horaPedido: '',
        estado: '',
        observaciones: '',
        idCliente: null,  // Valor inicial para el cliente
        idEmpleado: null, // Valor inicial para el empleado
        idMesa: null      // Valor inicial para la mesa
    });



    const deleteProducto = (id,mesaSelect) => {
       
        eliminarProducto(mesaSelect,id);

    }

    const handleSubmitPedido = (e) => {
        e.preventDefault();
    }


    const fetchEmployeeByDNI = async (dni) => {
        const tokenUser = localStorage.getItem('token');

        if (!tokenUser) {
            alert("Token no encontrado. Por favor, inicia sesión.");
            return;
        }

        try {
            const data = await saveCliente(dni);

            console.log(data)

            if (dni.dni === data.dni) {
                setNombre(data.nombre)
                setApellido(data.apellido)
                setIdCliente(data.idCliente)
            } else {
                alert("Empleado no encontrado");
            }
        } catch (error) {
            console.error("Error al buscar el empleado:", error);
            alert("Se produjo un error al buscar el empleado. Intenta nuevamente.");
        }
    };



    const handleSearchCliente = () => {
        fetchEmployeeByDNI(dni);
    }

    const obtenerFechaHora = () => {
        const ahora = new Date();

        const fecha = ahora.toISOString().split('T')[0];

        const hora = ahora.toTimeString().split(' ')[0].slice(0, 5);

        return { fecha, hora };
    };

    

    const handleConfirmarPedido = async () => {
        const { fecha, hora } = obtenerFechaHora();

        const nuevoPedido = {
            ...pedido,
            fechaPedido: fecha,
            horaPedido: hora,
            estado: 'PENDIENTE',
            observaciones: 'Sin gluten, mesa cerca de la ventana.',
            idCliente: idCliente,
            idEmpleado: 1,
            idMesa: mesaSelect
        };

        handleCambiarEstadoMesa()

        navigate('/mozo/mesas');
        // try {
        //     const pedidoCreate = await savePedido(nuevoPedido);

        //     console.log(pedidoCreate);

        //     navigate('/mozo/mesas');
        // } catch (error) {
        //     console.error(error);
        // }

    };

    const handleCambiarEstadoMesa=  () => {
        cambiarEstadoMesa(mesaSelect,"OCUPADA")
     }

    // return listaCompras.reduce((total, item) => total + item.price * item.cantidad, 0).toFixed(2);
    const calcularTotal = () => {

        const totalPrecioMesa = productosMesa.reduce(
            (total, producto) => total + (producto.precio || 0) * (producto.cantidad || 1),
            0
          );
         return totalPrecioMesa;
    };

    
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

                              
                                productosMesa.map(producto => (
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
                                        <td>{producto.nombre ? producto.nombre : producto.title}</td>

                                        <td className='' >
                                            <div className='d-flex flex-column align-items-center'>
                                                <div className='container-btns'>

                                                    <span
                                                        className=" btn-outline-danger "
                                                        onClick={() => disminuirCantidad(mesaSelect,producto.id)}
                                                        style={{ cursor: 'pointer' }}
                                                    >-</span>

                                                    <span
                                                        className=" btn-primary " >{producto.cantidad}
                                                    </span>

                                                    <span
                                                        className=" btn-outline-danger "
                                                        onClick={() => aumentarCantidad(mesaSelect,producto.id)}
                                                        style={{ cursor: 'pointer' }}
                                                    >+</span>




                                                </div>

                                                <div className='container-price'>
                                                    <span>s/{producto.price ? producto.price : producto.precio}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td >

                                            <div className='d-flex flex-column align-items-center container-btn-delete-pro' style={{ cursor: 'pointer' }}>
                                                <span onClick={() => deleteProducto(producto.id,mesaSelect)} className='btn-delete-pro'

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
                        <form className="col-md-8" onSubmit={handleSubmitPedido}>
                            <div className="d-flex align-items-end gap-2">
                                <div className="flex-grow-1">
                                    <label htmlFor="dniCliente" className="form-label">DNI del Cliente</label>
                                    <input
                                        type="text"
                                        placeholder="DNI del Cliente"
                                        className="form-control mb-3"
                                        id="dniCliente"
                                        name='dni'
                                        value={dni.dni}
                                        onChange={(e) => setDni({
                                            ...dni,
                                            dni: e.target.value
                                        })}
                                    />
                                </div>
                                <button onClick={() => handleSearchCliente()} className="btn color-primario mb-3">Buscar</button>
                            </div>

                            <label htmlFor="nombreCliente" className="form-label">Nombre del Cliente</label>
                            <input type="text" placeholder="Nombre del Cliente" className="form-control mb-3" id="nombreCliente"
                                name={nombre}
                                value={nombre}

                            />

                            <label htmlFor="nombreApellido" className="form-label">Apellido del Cliente</label>
                            <input type="text" placeholder="Apellido del Cliente" className="form-control" id="nombreApellido"
                                value={apellido}
                            />
                        </form>

                        {/* Detalle del Pedido */}
                        <div className="col-md-4 d-flex flex-column align-items-center justify-content-between">
                            <div className="text-center mb-4">
                                <label className="form-label">Subtotal del Pedido</label>
                                <h2 className="">s/{calcularTotal()}</h2>
                            </div>

                            <div className="d-grid gap-3 w-100">
                                <button className="btn btn-success color-primario" onClick={handleConfirmarPedido}>
                                    {/* <NavLink to="/mozo/mesas" >Confirmar Pedido</NavLink> */}
                                    Confirmar Pedido
                                </button>
                                <button className="btn btn-success color-primario" onClick={handleConfirmarPedido}>
                                    {/* <NavLink to="/mozo/mesas" className="btn btn-danger color-primario">Cancelar</NavLink> */}
                                    Cancelar
                                </button>


                            </div>
                        </div>
                    </div>

                </div>
            </div>




            <br />


        </>
    )
}


