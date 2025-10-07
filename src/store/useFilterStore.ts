import { create } from "zustand";

export type FilterState = {
  keyword: string;
  location: string;
  type: string;
  page: number;
  pageSize: number;
  debouncedKeyword: string;
  debouncedLocation: string;
  setKeyword: (k: string) => void;
  setLocation: (l: string) => void;
  setType: (t: string) => void;
  setPage: (p: number) => void;
  setPageSize: (s: number) => void;
  setDebouncedKeyword: (k: string) => void;
  setDebouncedLocation: (l: string) => void;
  reset: () => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  keyword: "",
  location: "",
  type: "",
  page: 1,
  pageSize: 5,
  debouncedKeyword: "",
  debouncedLocation: "",
  setKeyword: (k) => set({ keyword: k }),
  setLocation: (l) => set({ location: l }),
  setType: (t) => set({ type: t, page: 1 }),
  setPage: (p) => set({ page: p }),
  setPageSize: (s) => set({ pageSize: s, page: 1 }),
  setDebouncedKeyword: (k) => set({ debouncedKeyword: k, page: 1 }),
  setDebouncedLocation: (l) => set({ debouncedLocation: l, page: 1 }),
  reset: () =>
    set({
      keyword: "",
      location: "",
      type: "",
      page: 1,
      debouncedKeyword: "",
      debouncedLocation: "",
    }),
}));
