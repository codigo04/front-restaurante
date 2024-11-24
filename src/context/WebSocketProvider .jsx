import React, { createContext, useEffect, useState } from 'react'
import { connectWebSocket } from '../service/websocket';


export const WebSocketContext = createContext();


export const WebSocketProvider  = ({ children }) => {

    const [messages, setMessages] = useState([]); 

    const [detallePedido, setDetallePedido] =useState([]);

    

    useEffect(() => {

        const onMessageReceived = (message) => {
            
            setMessages([message]);  // Cuando llega un mensaje, lo almacenamos en el estado
        };


        // Establecemos la conexión WebSocket y pasamos la función onMessageReceived
        const stompCliente = connectWebSocket(onMessageReceived, detallePedido);

        // Limpiar la conexión WebSocket cuando el componente se desmonte
        return () => {
             stompCliente.deactivate(); // Desactivamos la conexión WebSocket
        };
    }, [detallePedido]);

  return (
    <WebSocketContext.Provider  value={{
        messages,
        setDetallePedido
        }}>
        {children}
    </WebSocketContext.Provider>
  )
}


