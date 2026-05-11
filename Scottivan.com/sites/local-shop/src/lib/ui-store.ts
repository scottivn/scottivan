"use client";

import { create } from "zustand";

interface UIStore {
  cartDrawerOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

export const useUI = create<UIStore>((set) => ({
  cartDrawerOpen: false,
  openCart: () => set({ cartDrawerOpen: true }),
  closeCart: () => set({ cartDrawerOpen: false }),
  toggleCart: () => set((s) => ({ cartDrawerOpen: !s.cartDrawerOpen })),
}));
