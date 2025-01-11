import { create } from "zustand";

export const useUserStore = create((set, get) => ({
  userData: {
    name: "",
    email: "",
    type: "OPERATOR",
    userId: "677fcbc30ee7234c12752337",
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
    }
}))
}));
