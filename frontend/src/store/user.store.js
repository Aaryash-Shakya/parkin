import { create } from "zustand";

export const useUserStore = create((set, get) => ({
  userData: {
    name: "",
    email: "",
    type: "",
    userId: "",
    isAuthenticated: false,
  },
  setUserData: (userData) =>
    set((state) => ({
      userData: { ...state.userData, ...userData },
    })),
  getUserData: () => get().userData,
  clearUserData: () =>
    set(() => ({
      userData: {
        name: "",
        phone: "",
        type: "",
        userId: "",
        isAuthenticated: false,
      },
    })),
}));
