import { create } from "zustand";

const useAuthModalStore = create((set) => ({
  isOpen: false,
  redirectPath: null,
  open: (redirectPath = null) => set({ isOpen: true, redirectPath }),
  close: () => set({ isOpen: false, redirectPath: null }),
}));

export default useAuthModalStore;
