import { create } from "zustand";

type ModalState = {
  isOpen: boolean;
  jobId?: string | null;
  open: (jobId?: string) => void;
  close: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  jobId: null,
  open: (jobId) => set({ isOpen: true, jobId }),
  close: () => set({ isOpen: false, jobId: null }),
}));
