import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { connectWebSocket, sendMessage } from '../service/websocket';
import { AuthContext } from './AuthProvider';
import { TroubleshootOutlined } from '@mui/icons-material';


export const WebSocketContext = createContext();


export const WebSocketProvider = ({ children }) => {

  const [messagesCocina, setMessagesCocina] = useState([]);
  const [messagesMozo, setMessagesMozo] = useState([]);
  const [messagesCaja, setMessagesCaja] = useState([]);

  const [detallePedido, setDetallePedido] = useState([]);

  const [isConnected, setIsConnected] = useState(false);

  const { auth} = useContext(AuthContext);
  // /app/mozo/cocina

  const stompCliente = useRef(null);


  
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

  
    stompCliente.current = connectWebSocket(
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
      if (stompCliente.current) {
        stompCliente.current.deactivate(); // Desactiva la conexión
        
        console.log('Conexión WebSocket desactivada.');
      }
    };
  }, []);

  const reconnectWebSocket = () => {
    console.log('Intentando reconectar WebSocket...');
    setTimeout(() => {
      stompCliente.current = connectWebSocket(
        handleMessagesMozo,
        handleMessagesCocina,
        handleMessagesCaja,
        () => setIsConnected(true)
      );
    }, 5000); // Intenta reconectar cada 5 segundos
  }; 



  // useEffect(() => {
  //   if (!isConnected) {
  //     console.log('Conexión perdida, iniciando reconexión...');
  //     reconnectWebSocket();
  //   }
  // }, [isConnected]);
  

  const sendMessageToBackend = (destination, payload) => {
    if (isConnected && stompCliente) {
      sendMessage(stompCliente.current, destination, payload);
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


