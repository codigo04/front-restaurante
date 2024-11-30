import React, { createContext, useEffect, useState } from 'react'
import { connectWebSocket, sendMessage } from '../service/websocket';


export const WebSocketContext = createContext();


export const WebSocketProvider = ({ children }) => {

  const [messagesCocina, setMessagesCocina] = useState([]);
  const [messagesMozo, setMessagesMozo] = useState([]);
  const [messagesCaja, setMessagesCaja] = useState([]);

  const [detallePedido, setDetallePedido] = useState([]);

  const [isConnected, setIsConnected] = useState(false);

  // /app/mozo/cocina

  let stompCliente = null;


  const handleMessagesMozo = (message) => {
    setMessagesMozo([message]);
  };

  const handleMessagesCocina = (message) => {
    setMessagesCocina([message]);
  };

  const handleMessagesCaja = (message) => {
    setMessagesCaja( [message]);
  };
  

  useEffect(() => {

  
    stompCliente = connectWebSocket(
      handleMessagesMozo,
      handleMessagesCocina,
      handleMessagesCaja,
      () => {
        setIsConnected(true);
        console.log('Conexión WebSocket exitosa. isConnected:', true);
    }
    );

    // Limpiar la conexión WebSocket cuando el componente se desmonte
    return () => {
      if (stompCliente) {
        stompCliente.deactivate(); // Desactiva la conexión
        
        console.log('Conexión WebSocket desactivada.');
      }
    };
  }, [detallePedido]);



  const sendMessageToBackend = (destination, payload) => {
    if (isConnected && stompCliente) {
      sendMessage(stompCliente, destination, payload);
    } else {
      console.error('WebSocket no está conectado. Intenta más tarde.');
      
    }
  };

  return (
    <WebSocketContext.Provider value={{
      messagesCocina,
      messagesMozo,
      messagesCaja,
      setDetallePedido,
      sendMessageToBackend
    }}>
      {children}

    </WebSocketContext.Provider>
  )
}


