import { create } from "zustand";
import { persist } from "zustand/middleware";

const useWishlistStore = create(persist((set, get) => ({
  ids: [],
  toggle: (id) => set((s) => ({ ids: s.ids.includes(id) ? s.ids.filter((x) => x !== id) : [...s.ids, id] })),
  has: (id) => get().ids.includes(id),
}), { name: "a5x-wishlist" }));

export default useWishlistStore;
