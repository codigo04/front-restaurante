import React, { useCallback, useContext, useEffect, useState } from 'react'
import { PedidoContext } from '../../context/PedidoProvider';
import { NavLink, useNavigate } from 'react-router-dom';
import { consultaDni } from '../../service/empleadosService';
import { saveCliente } from '../../service/clientesService';
import { MesasContext } from '../../context/MesasProvider';
import { obtenerPedido, saveDetallePedido, savePedido } from '../../service/pedidoService';
import { toast } from 'react-toastify';
import { connectWebSocket } from '../../service/websocket';
import { WebSocketContext } from '../../context/WebSocketProvider ';

export const DetallePedido = () => {

    const navigate = useNavigate()

    const { cambiarEstadoMesa, mostrarProductosMesa, mesasPedido, eliminarProducto, aumentarCantidad, disminuirCantidad } = useContext(PedidoContext)
    const { mesaSelect, cambiarEstado } = useContext(MesasContext);
    const { messages, setDetallePedido } = useContext(WebSocketContext);
    const [dni, setDni] = useState({
        dni: ''
    })
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [idCliente, setIdCliente] = useState('')
    const [idPedido, setIdPedido] = useState('')
    const [mensaje, setMensaje] = useState(null);
    const [detalleP, setDetalleP] = useState([])
    const mesaSeleccionadaId = mesaSelect; // Cambia por el ID de la mesa que seleccionaste
    // Obtener la mesa seleccionada
    const mesaSeleccionada = mesasPedido.find((mesa) => mesa.idMesa === mesaSeleccionadaId);
    const productosMesa = mesaSeleccionada ? mesaSeleccionada.pedidos : [];

    console.log(productosMesa)

    const [pedido, setPedido] = useState({
        fechaPedido: '',
        horaPedido: '',
        estado: '',
        observaciones: '',
        idCliente: null,  // Valor inicial para el cliente
        idEmpleado: null, // Valor inicial para el empleado
        idMesa: null      // Valor inicial para la mesa
    });



    const deleteProducto = (id, mesaSelect) => {

        eliminarProducto(mesaSelect, id);

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

        // Crear el pedido
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

        try {
            // Guardar el pedido en el backend y obtener el ID generado
        
            const { data: { idPedidoGenerado } } = await savePedido(nuevoPedido);

            // console.log("Pedido creado con ID:", idPedidoGenerado);

            // Preparar la lista de detalles del pedido
            const detallesPedido = productosMesa.map((producto) => ({
                cantidad: producto.cantidad,
                precio: producto.precio,
                idPedido: idPedidoGenerado,
                idProducto: producto.id,
                idCombo: 1
            }));

            setDetalleP(detallesPedido)
            console.log("los detalles")
            console.log(detallesPedido);

            // Guardar los detalles del pedido en el backend
            const detallePedidoCreate = await saveDetallePedido(detallesPedido);

            console.log("Detalles del pedido creados:", detallePedidoCreate);
            toast.success("Pedido Creado Correctamente", {
                position: "top-right",
            });
            // Cambiar el estado de la mesa
            mandarMozo()
            handleCambiarEstadoMesa();

            // Redirigir a la vista de mesas
            navigate('/mozo/mesas');
        } catch (error) {
            console.error("Error al confirmar el pedido:", error);
            alert("Hubo un error al confirmar el pedido. Intenta nuevamente.");
        }
    };

    const handleCambiarEstadoMesa = useCallback(() => {
        cambiarEstadoMesa(mesaSelect, "OCUPADA");
    }, [mesaSelect, cambiarEstadoMesa]);


    const handleCancelarPedido = () => {
        toast.success("Pedido Creado Correctamente", {
            position: "top-right",
        });
    }
    // return listaCompras.reduce((total, item) => total + item.price * item.cantidad, 0).toFixed(2);
    const calcularTotal = () => {

        const totalPrecioMesa = productosMesa.reduce(
            (total, producto) => total + (producto.precio || 0) * (producto.cantidad || 1),
            0
        );
        return totalPrecioMesa;
    };


    const mandarMozo = () => {
        const detallePedido = obtenerPedido()





        setDetallePedido(detallePedido)
    }

    const handleSocket = () => {

        const detallePedido = obtenerPedido()




        console.log(detallePedido)
        toast.success("Pedido Creado Correctamente", {
            position: "top-right",
        });
        // const detallePedido = {
        //     "pedidoId": "123",
        //     "mesa": mesaSelect,
        //     "hora": "2024-11-22T15:30:00",
        //     "productos": [
        //         {
        //             "nombre": "Hamburguesa con queso",
        //             "stock": 2,
        //             "observaciones": "Sin tomate"
        //         },
        //         {
        //             "nombre": "Papas fritas",
        //             "cantidad": 1
        //         },
        //         {
        //             "nombre": "Coca-Cola",
        //             "cantidad": 3
        //         }
        //     ],
        //     "estado": "Enviado a cocina",
        //     "observaciones": "Mesa junto a la ventana"
        // }



        setDetallePedido(detallePedido)
    }
    // sockets

    //    useEffect(() => {


    //      }, []); 





    console.log(messages)


    return (
        <>

            <div>
                <h1>Mensaje desde WebSocket</h1>

                {
                    messages.map(mesgg => (
                        <p>{mesgg.estado}</p>
                    ))
                }

            </div>
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
                                                        onClick={() => disminuirCantidad(mesaSelect, producto.id)}
                                                        style={{ cursor: 'pointer' }}
                                                    >-</span>

                                                    <span
                                                        className=" btn-primary " >{producto.cantidad}
                                                    </span>

                                                    <span
                                                        className=" btn-outline-danger "
                                                        onClick={() => aumentarCantidad(mesaSelect, producto.id)}
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
                                                <span onClick={() => deleteProducto(producto.id, mesaSelect)} className='btn-delete-pro'

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
                                <button className="btn btn-success color-primario" onClick={handleSocket}>
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


