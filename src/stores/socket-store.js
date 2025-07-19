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
    const REACT_APP_API_BASE_URL = "http://ec2-44-198-165-219.compute-1.amazonaws.com:5000";
    
    const socket = io(REACT_APP_API_BASE_URL);

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
