import { create } from "zustand";

export const useParkingStore = create((set, get) => ({
    parkings: [],
    markerParkingData: [],

    // Load parking data
    setParkings: (data) => set(() => ({ parkings: data })),

    // Add new parking
    addParking: (newParking) =>
        set((state) => ({
            parkings: [...state.parkings, newParking],
        })),

    // Remove parking by ID
    removeParking: (id) =>
        set((state) => ({
            parkings: state.parkings.filter((parking) => parking._id !== id),
        })),

    // Parking Data
    setMarkerParkingData: (data) =>
        set(() => ({ markerParkingData: data })),

    getMarkerParkingData: () => get().markerParkingData,
}));
