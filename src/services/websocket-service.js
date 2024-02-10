import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const WebSocketService = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to the WebSocket server
    const newSocket = io('http://your-socket-io-server-url');

    // Set up event listeners for the WebSocket
    newSocket.on('connect', () => {
      console.log('Connected to WebSocket server');
      // Optionally, you can send user ID or other data after connecting
      // newSocket.emit('send-client-data', { userId: /* your user ID */ });
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    // Additional event listeners as needed

    // Set the socket state
    setSocket(newSocket);

    // Clean up the socket connection when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []); // Only run once when the component mounts

  // You can expose the socket to other components or use it internally
  return socket;
};

export default WebSocketService;
