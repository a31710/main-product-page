import { create } from "zustand";

export type FilterState = {
  keyword: string;
  location: string;
  category: string;
  page: number;
  pageSize: number;
  setKeyword: (k: string) => void;
  setLocation: (l: string) => void;
  setCategory: (c: string) => void;
  setPage: (p: number) => void;
  setPageSize: (s: number) => void;
  reset: () => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  keyword: "",
  location: "",
  category: "",
  page: 1,
  pageSize: 5,
  setKeyword: (k) => set({ keyword: k, page: 1 }),
  setLocation: (l) => set({ location: l, page: 1 }),
  setCategory: (c) => set({ category: c, page: 1 }),
  setPage: (p) => set({ page: p }),
  setPageSize: (s) => set({ pageSize: s, page: 1 }),
  reset: () => set({ keyword: "", location: "", category: "", page: 1 }),
}));
