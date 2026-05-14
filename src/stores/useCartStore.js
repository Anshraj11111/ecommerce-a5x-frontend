import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(persist((set, get) => ({
  open: false,
  items: [],
  toggle: () => set((s) => ({ open: !s.open })),
  add: (product) => set((s) => {
    const existing = s.items.find((i) => i.id === product.id);
    if (existing) {
      return { items: s.items.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i) };
    }
    return { items: [...s.items, { ...product, qty: 1 }] };
  }),
  remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
  inc: (id) => set((s) => ({ items: s.items.map((i) => i.id === id ? { ...i, qty: i.qty + 1 } : i) })),
  dec: (id) => set((s) => ({ items: s.items.map((i) => i.id === id && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i).filter((i) => i.qty > 0) })),
  subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
  clear: () => set({ items: [] }),
}), { name: "a5x-cart" }));

export default useCartStore;
