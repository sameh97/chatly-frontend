import create from 'zustand';
import io from 'socket.io-client';

const useSocketStore = create((set) => ({
  socket: null,
  connect: () => {
    const socket = io('http://localhost:5000');

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      // Optionally, you can send user ID or other data after connecting
      // socket.emit('send-client-data', { userId: /* your user ID */ });
      set((state) => ({ ...state, socket }));
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
      set((state) => ({ ...state, socket: null }));
    });

    // Additional event listeners as needed

    // Clean up the socket connection when the store unmounts
    return () => {
      socket.disconnect();
    };
  },
}));

export default useSocketStore;
