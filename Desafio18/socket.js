import { Server } from 'socket.io'
import moment from 'moment'

import normalizar from './normalizr.js'
import logger from './logger.js'

let io;

let messages = {};
let products = [];

(async function () {
    try {
        const response = await fetch('http://localhost:8080/api/mensajes')
        const historialMensajes = await response.json();
        
        if (historialMensajes.length == 0) {
            mensajes.guardar({
                id: 'mensajes',
                mensajes: [{
                    email: "coder@house.com",
                    author: {
                        id: "coder@house.com",
                        nombre: 'Coder', 
                        apellido: 'House', 
                        edad: '0', 
                        alias: 'CoderHouse',
                        avatar: 'https://i.pinimg.com/280x280_RS/9b/20/ea/9b20ea6de7ec343daac5714717dc8cd2.jpg',
                    },
                    text: "Bienvenidos",
                    date: "01/01/2022 00:00:00",
                }]
            });
        }
        messages = historialMensajes;
    } catch (error) {
        logger.error(error.message);
    }
})();

function initSocket(httpServer) {
    try {
        io = new Server(httpServer);
        setEvents(io); 
    } catch (error) {
        logger.error(error.message);
    }
}

function setEvents(io) {
    io.on('connection', (socketClient) => {
        console.log('Se conecto un nuevo cliente con el id', socketClient.id);
        
        const messagesNormalizados = normalizar(messages);

        socketClient.emit('history-messages', messagesNormalizados);
        
        socketClient.emit('history-products', products);

        socketClient.on('new-message', (data) => {
            data.date = moment().format("DD/MM/YYYY HH:mm:ss");;
            messages[0].mensajes.push(data);
            saveNewMessage(data);
            io.emit('notification', data);
        })

        socketClient.on('new-product', (data) => {
            products.push(data);
            io.emit('table-update', data);
        })

        socketClient.on('disconnect', (socketClient) => {
            console.log('Se desconecto un cliente');
        })
    })
}

async function saveNewMessage (data) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }

    await fetch('http://localhost:8080/api/mensajes', requestOptions );
}

export {
    initSocket,
}