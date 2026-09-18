import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  profileURL: string;
}

interface AuthState {
  user: User | null;
  setUser: (userData: User) => void;
  removeUser: () => void;
}

export const useUserStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  removeUser: () => set({ user: null }),
}));
