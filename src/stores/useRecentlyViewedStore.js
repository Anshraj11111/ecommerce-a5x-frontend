import { create } from "zustand";
import { persist } from "zustand/middleware";

const useRecentlyViewedStore = create(persist((set) => ({
  ids: [],
  add: (id) => set((s) => ({ ids: [id, ...s.ids.filter((x) => x !== id)].slice(0, 10) })),
}), { name: "a5x-recent" }));

export default useRecentlyViewedStore;
