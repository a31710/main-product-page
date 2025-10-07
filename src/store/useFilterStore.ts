import { create } from "zustand";

export type FilterState = {
  keyword: string;
  location: string;
  type: string;
  page: number;
  pageSize: number;
  setKeyword: (k: string) => void;
  setLocation: (l: string) => void;
  setType: (t: string) => void;
  setPage: (p: number) => void;
  setPageSize: (s: number) => void;
  reset: () => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  keyword: "",
  location: "",
  type: "",
  page: 1,
  pageSize: 5,
  setKeyword: (k) => set({ keyword: k, page: 1 }),
  setLocation: (l) => set({ location: l, page: 1 }),
  setType: (t) => set({ type: t, page: 1 }),
  setPage: (p) => set({ page: p }),
  setPageSize: (s) => set({ pageSize: s, page: 1 }),
  reset: () => set({ keyword: "", location: "", type: "", page: 1 }),
}));
