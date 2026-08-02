class ChatNotifier {
  constructor() {
    this.handlers = [];

    const isLocal =
    window.location.hostname === 'localhost';

    const websocketUrl = isLocal
    ? 'ws://localhost:4000'
    : `wss://${window.location.host}`;

    console.log(
        'Connecting WebSocket to:',
        websocketUrl
    );

    this.socket = new WebSocket(websocketUrl);

    this.socket.onopen = () => {
      console.log(
        'WebSocket connection opened'
      );
    };

    this.socket.onmessage = async (event) => {
      try {
        const message =
          JSON.parse(event.data);

        this.handlers.forEach((handler) => {
          handler(message);
        });
      } catch (error) {
        console.error(
          'Unable to parse WebSocket message:',
          error
        );
      }
    };

    this.socket.onclose = () => {
      console.log(
        'WebSocket connection closed'
      );
    };

    this.socket.onerror = (error) => {
      console.error(
        'WebSocket error:',
        error
      );
    };
  }

  addHandler(handler) {
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    this.handlers = this.handlers.filter(
      (currentHandler) =>
        currentHandler !== handler
    );
  }

  sendMessage(message) {
    if (
      this.socket.readyState !==
      WebSocket.OPEN
    ) {
      throw new Error(
        'WebSocket connection is not open'
      );
    }

    this.socket.send(
      JSON.stringify(message)
    );
  }
}

export const chatNotifier = new ChatNotifier();