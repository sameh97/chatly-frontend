import create from "zustand";
import { persistUserFromToken } from "../services/authentication-service";

const useUserStore = create((set) => ({
  currentUser: persistUserFromToken(), // Initialize with null or default user object
  setCurrentUser: (user) => set({ currentUser: user }),
  clearCurrentUser: () => set({ currentUser: null }),
}));

export default useUserStore;
