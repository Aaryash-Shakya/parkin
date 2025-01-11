import { create } from "zustand";

export const useReservationStore = create((set) => ({
  reservation: {
    location: "",
    fromDateTime: "",
    toDateTime: "",
    numberPlate: "",
    vehicleType: "",
  },
  setReservation: (newReservation) =>
    set({ reservation: { ...newReservation } }),
  updateReservation: (key, value) =>
    set((state) => ({
      reservation: { ...state.reservation, [key]: value },
    })),
  clearReservation: () =>
    set({
      reservation: {
        location: "",
        fromDateTime: "",
        toDateTime: "",
        numberPlate: "",
        vehicleType: "",
      },
    }),
}));
