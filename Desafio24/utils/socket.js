import { Server } from 'socket.io'

import logger from './logger.js'

let io;

let messages = [];

(async function () {
    try {
        const response = await fetch('/chat')
        const historyMessages = await response.json();
        
        if (historyMessages.length == 0) {
            return;
        }
        messages = historyMessages;
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
        logger.info('New client connected with id', socketClient.id);

        socketClient.emit('history-messages', messages);

        socketClient.on('new-message', (data) => {
            messages.push(data);
            saveNewMessage(data);
            io.emit('notification', data);
        })

        socketClient.on('disconnect', (socketClient) => {
            logger.info('Client disconnected.');
        })
    })
}

async function saveNewMessage (data) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }

    await fetch('/chat', requestOptions );
}

export {
    initSocket,
}