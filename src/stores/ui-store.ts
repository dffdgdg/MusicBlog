"use client";

import { create } from 'zustand';

interface UIStore {
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
  
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isModalOpen: false,
  modalContent: null,
  theme: 'dark',
  
  openModal: (content) => set({ isModalOpen: true, modalContent: content }),
  closeModal: () => set({ isModalOpen: false, modalContent: null }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
}));