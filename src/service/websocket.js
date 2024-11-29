import { Client } from "@stomp/stompjs"


export const connectWebSocket = (onMessageReceivedMozo,onMessageReceivedCosina,onMessageReceivedCaja,onConnect) => {

    const stompCliente = new Client({
        brokerURL: 'ws://localhost:8080/ws',
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        connectHeaders: {},
        debug: function (str) {
            console.log("[DEBUG WebSocket]:", str);

        },
        onConnect: () => {
            // Código de conexión y suscripción
            console.log('Conexión WebSocket establecida.');
            onConnect && onConnect();

            stompCliente.subscribe('/topic/pedidos/cocina', (messageOutput) => {
                const message = JSON.parse(messageOutput.body);
                onMessageReceivedCosina(message.body);

                console.log('Nuevo mensaje: ', message.body);

            });

            stompCliente.subscribe('/topic/pedidos/mozo', (messageOutput) => {
                const message = JSON.parse(messageOutput.body);
                onMessageReceivedMozo(message.body);
                console.log('Nuevo mensaje: ', message.body);

            });



            stompCliente.subscribe('/topic/pedidos/caja', (messageOutput) => {
                const message = JSON.parse(messageOutput.body);
                onMessageReceivedCaja(message.body);
                console.log('Nuevo mensaje: ', message.body);

            });
            
            
         
        },
        onStompError: (frame) => {
            console.error('Error STOMP:', frame);
        },

        onWebSocketError: (error) => {
            console.error('Error de WebSocket:', error);
        },

    })
    stompCliente.activate();
    return stompCliente;
}



// Publicar mensajes a diferentes métodos del backend
export const sendMessage = (stompCliente, destination, payload) => {
    if (stompCliente && stompCliente.connected) {
        stompCliente.publish({
            destination: destination,
            body: JSON.stringify(payload),
        });
        console.log(`Mensaje enviado a ${destination}:`, payload);
    } else {
        console.error('El cliente WebSocket no está activo.');
    }
};