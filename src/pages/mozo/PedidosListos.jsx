import React, { useContext, useEffect, useState } from 'react'
import { WebSocketContext } from '../../context/WebSocketProvider';
import { PedidoContext } from '../../context/PedidoProvider';
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { actualizarEstadoPedido } from '../../service/pedidoService';

export const PedidosListos = () => {

    const { messagesMozo, sendMessageToBackend, setDetallePedido } = useContext(WebSocketContext);


    const [pedidosAll, setPedidoAll] = useState([])

    const { filtrados, getPedidoAllEstado } = useContext(PedidoContext);


    console.log("pedidos filtrados")
    console.log(filtrados)

    useEffect(() => {
        getPedidoAllEstado("ENTREGADO"); // Filtrar pedidos por estado
        console.log("Pedidos cargados por estado:", filtrados);
    }, []);

    useEffect(() => {
      
        if (messagesMozo.length > 0) {
            toast.success("Mensaje de concina Pedido Recivido", {
                position: "top-right",
            });
        }

        setPedidoAll((prevPedidoAll) => [
            ...prevPedidoAll.filter(p => !messagesMozo.some(m => m.idPedido === p.idPedido)),
            ...messagesMozo
        ]);
    }, [messagesMozo]);


    useEffect(() => {
        if (filtrados.length > 0) {
            setPedidoAll(filtrados);
        }
    }, [filtrados]);





    const handleSubmitPruebaCaja = async (pedido) => {


        try {
            // Actualizar el estado del pedido en el backend
            const pedidoActualizado = await actualizarEstadoPedido(pedido.idPedido, "PENDIENTE");

            console.log("Pedido actualizado:");
            console.log(pedidoActualizado);

            // Actualizar la lista local eliminando el pedido actualizado
            setPedidoAll((prevPedidos) =>
                prevPedidos.filter((p) => p.idPedido !== pedido.idPedido)
            );

            // Enviar el pedido actualizado a través del WebSocket
            setDetallePedido(pedidoActualizado);
            sendMessageToBackend("/app/mozo/caja", pedidoActualizado);
           
            toast.success("Pedido enviado a caja correctamente", {
                position: "top-right",
            });
        } catch (error) {
            console.error(error)
        }



    }


    console.log("pedidos cocina")
    console.log(pedidosAll)
    return (
        <div className="container mt-5">
            <Grid container spacing={4}>
                {/* Lista de Mesas */}
                <Grid item xs={12} md={8}>
                    <Typography variant="h5" gutterBottom>
                        Pedidos Listos
                    </Typography>
                    {

                        pedidosAll.length === 0 ? (
                            <Typography variant="body1">No hay pedidos listos.</Typography>
                        ) : (
                            pedidosAll.map((pedido, index) => (
                                <Card
                                    key={index}
                                    sx={{
                                        mb: 2,
                                        borderRadius: 2,
                                        boxShadow: 3,
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        p: 2,
                                    }}
                                >
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            NUMERO DE MESA: {pedido.mesa.numeroMesa}
                                        </Typography>
                                        <Typography variant="body2">
                                            Nombre del Cliente : {pedido.cliente.nombre}
                                        </Typography>
                                    </Box>
                                    <Button
                                        variant="contained"
                                        sx={{ backgroundColor: "#ff6600", color: "#fff" }}

                                        onClick={() => handleSubmitPruebaCaja(pedido)}
                                    >
                                        S/ Enviar a Caja
                                    </Button>
                                </Card>
                            )))}
                </Grid>


            </Grid>
        </div>
    )
}


