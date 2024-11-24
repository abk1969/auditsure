import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Layout } from 'react-grid-layout';

interface LayoutState {
  layouts: Layout[];
  setLayouts: (layouts: Layout[]) => void;
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      layouts: [],
      setLayouts: (layouts) => set({ layouts }),
    }),
    {
      name: 'layout-storage',
    }
  )
);