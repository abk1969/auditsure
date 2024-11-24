import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: User | null;
  organization: any | null;
  setUser: (user: User | null) => void;
  setOrganization: (org: any | null) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      organization: null,
      setUser: (user) => set({ user }),
      setOrganization: (organization) => set({ organization }),
      signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null, organization: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);