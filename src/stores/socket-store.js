import create from 'zustand';
import io from 'socket.io-client';

const useSocketStore = create((set, get) => ({
  socket: null,
  connect: (currentUser) => {
    // Check if already connected
    if (get().socket) {
      console.log('Already connected');
      return;
    }

    const socket = io('http://localhost:5000');

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      // Emit user data when the socket is connected
      socket.emit("send-client-data", currentUser);
      set({ socket });
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
      set({ socket: null });
    });

    // Clean up socket connection on store unmount
    return () => {
      socket.disconnect();
      set({ socket: null });
    };
  },
  disconnect: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null });
      console.log('Socket manually disconnected');
    }
  },
}));

export default useSocketStore;
