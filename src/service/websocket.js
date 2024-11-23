import { Client } from "@stomp/stompjs"


export const connectWebSocket = (onMessageReceived, detallePedido) => {

    const stompCliente = new Client({
        brokerURL: 'ws://localhost:8080/ws',
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        connectHeaders: {},
        debug: function (str) {
            console.log(str);

        },
        onConnect: () => {
            // Código de conexión y suscripción

            stompCliente.subscribe('/topic/pedidos', (messageOutput) => {
                const message = JSON.parse(messageOutput.body);


                onMessageReceived(message.body);

                console.log('Nuevo mensaje: ', message.body);


            });

            stompCliente.publish({
                destination: '/app/save',
                body: JSON.stringify(detallePedido)
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