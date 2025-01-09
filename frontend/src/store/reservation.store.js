import { create } from "zustand";

export const useReservationStore = create((set) => ({
  //   reservation: {
  //     display_name: "",
  //     lat: null,
  //     lon: null,
  //     place_id: null,
  //   },
  reservation: {
    display_name:
      "Kathmandu Metropolitan City, Kathmandu, Bagamati Province, Nepal",
    lat: 27.708317,
    lon: 85.3205817,
    place_id: 226228353,
  },
  setReservation: (newReservation) =>
    set({ reservation: { ...newReservation } }),
}));
