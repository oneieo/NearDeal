import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  affiliation: string;
  setIsLoggedIn: (value: boolean) => void;
  setAffiliation: (value: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      affiliation: "",
      setIsLoggedIn: (value) => set({ isLoggedIn: value }),
      setAffiliation: (value) => set({ affiliation: value }),
      logout: () => set({ isLoggedIn: false, affiliation: "" }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
