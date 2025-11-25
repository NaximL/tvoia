import { create } from 'zustand';

export const useTabbarStore = create((set) => ({
  tabHeight: 60,
  setTabHeight: (v: number) => set({ tabHeight: v }),

  hide: false,
  setHide: (v: boolean) => set({ hide: v }),
}));