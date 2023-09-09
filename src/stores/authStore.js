// src/stores/authStore.js
import create from "zustand";
import { isAuthenticated } from "../services/authentication-service";

const useAuthStore = create((set) => ({
  isAuthenticated: isAuthenticated(),
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
}));

export default useAuthStore;
