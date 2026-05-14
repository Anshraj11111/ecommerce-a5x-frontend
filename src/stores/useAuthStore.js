import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(persist((set, get) => ({
  user: null,
  isAuthenticated: false,
  login: (userData) => set({ user: userData, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  signup: (userData) => set({ user: userData, isAuthenticated: true }),
}), { name: "a5x-auth" }));

export default useAuthStore;
