import { create } from "zustand";

const useCompareStore = create((set, get) => ({
  ids: [],
  toggle: (id) => set((s) => {
    if (s.ids.includes(id)) return { ids: s.ids.filter((x) => x !== id) };
    if (s.ids.length >= 3) return s;
    return { ids: [...s.ids, id] };
  }),
  clear: () => set({ ids: [] }),
  has: (id) => get().ids.includes(id),
}));

export default useCompareStore;
