const {
  WebSocketServer,
  WebSocket,
} = require('ws');

function peerProxy(httpServer) {
  const socketServer = new WebSocketServer({
    server: httpServer,
  });

  socketServer.on('connection', (socket) => {
    socket.isAlive = true;

    console.log(
      'WebSocket client connected'
    );

    socket.on('message', (data) => {
      try {
        const message = JSON.parse(
          data.toString()
        );

        const outgoingMessage = JSON.stringify({
          ...message,
          id: message.id || Date.now(),
          sentAt:
            message.sentAt ||
            new Date().toISOString(),
        });

        socketServer.clients.forEach(
          (client) => {
            if (
              client.readyState ===
              WebSocket.OPEN
            ) {
              client.send(outgoingMessage);
            }
          }
        );
      } catch (error) {
        console.error(
          'Invalid WebSocket message:',
          error
        );
      }
    });

    socket.on('pong', () => {
      socket.isAlive = true;
    });

    socket.on('close', () => {
      console.log(
        'WebSocket client disconnected'
      );
    });

    socket.on('error', (error) => {
      console.error(
        'WebSocket connection error:',
        error
      );
    });
  });

  const interval = setInterval(() => {
    socketServer.clients.forEach(
      (client) => {
        if (client.isAlive === false) {
          return client.terminate();
        }

        client.isAlive = false;
        client.ping();
      }
    );
  }, 10000);

  httpServer.on('close', () => {
    clearInterval(interval);
  });
}

module.exports = {
  peerProxy,
};