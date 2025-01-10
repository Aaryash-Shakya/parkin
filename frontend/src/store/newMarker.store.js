import { create } from "zustand";

export const useNewMarkerStore = create((set) => ({
    newMarker: {
        lat: null,
        lng: null,
    },
    setNewMarker: (newMarker) => {
        console.log("New marker set:", newMarker);
        set({ newMarker: { ...newMarker } })
    },
    clearNewMarker: () => set({ newMarker: { lat: null, lng: null } })
}))