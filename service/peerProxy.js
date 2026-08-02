const {
  WebSocketServer,
  WebSocket,
} = require('ws');

function peerProxy(httpServer, database) {
  const socketServer = new WebSocketServer({
    server: httpServer,
  });

  function broadcast(message) {
    const outgoing = JSON.stringify(message);

    socketServer.clients.forEach((client) => {
        if (
        client.readyState === WebSocket.OPEN
        ) {
        client.send(outgoing);
        }
    });
  }

  async function broadcastProfiles() {
    const profiles = await database.getProfiles();
    broadcast({
        type: 'profiles',
        profiles,
    });
  }   

  socketServer.on('connection', async (socket) => {
    socket.isAlive = true;

    console.log(
      'WebSocket client connected'
    );

    try {
      const profiles =
        await database.getProfiles();

      socket.send(
        JSON.stringify({
          type: 'profiles',
          profiles,
        })
      );
    } catch (error) {
      console.error(
        'Unable to load profiles:',
        error
      );
    }

    socket.on('message', async (data) => {
        try {
            const incoming =
            JSON.parse(data.toString());

            if (incoming.type !== 'chat') {
            return;
            }

            const savedMessage =
            await database.addMessage({
                type: 'chat',
                sender: incoming.sender,
                recipient: incoming.recipient,
                text: incoming.text,
                sentAt: new Date(),
            });

            broadcast({
            type: 'chat',
            ...savedMessage,
            });
        } catch (error) {
            console.error(
            'Unable to process WebSocket message:',
            error
            );

            if (socket.readyState === WebSocket.OPEN) {
            socket.send(
                JSON.stringify({
                type: 'error',
                message:
                    'Unable to save chat message',
                })
            );
            }
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

  return {
    broadcastProfiles,
  };
}

module.exports = {
  peerProxy,
};