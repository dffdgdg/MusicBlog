"use client";

import { create } from 'zustand';

interface UIStore {
  // Модальные окна
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
  
  // Действия
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  
  // Тема (для будущего)
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  // Состояние по умолчанию
  isModalOpen: false,
  modalContent: null,
  theme: 'dark',
  
  // Действия
  openModal: (content) => set({ isModalOpen: true, modalContent: content }),
  closeModal: () => set({ isModalOpen: false, modalContent: null }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
}));