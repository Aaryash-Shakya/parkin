import { create } from "zustand";

export const useMarkerStore = create((set) => ({
    newMarker: {
        lat: null,
        lng: null,
    },
    searchMarker: {
        lat: null,
        lng: null,
    },
    startPosition: {
        lat: null,
        lng: null,
    },
    endPosition: {
        lat: null,
        lng: null,
    },
    setNewMarker: (newMarker) => {
        console.log("New marker set:", newMarker);
        set({ newMarker: { ...newMarker } })
    },
    searchPointMarker: (searchMarker) => {
        console.log("Search marker set:", searchMarker);
        set({ newMarker: { ...searchMarker } })
    },
    setStartPosition: (startPosition) => {
        console.log("Start position set:", startPosition);
        set({ newMarker: { ...startPosition } })
    },
    setEndPosition: (endPosition) => {
        console.log("End position set:", endPosition);
        set({ newMarker: { ...endPosition } })
    },
    clearMarker: () => set({
        newMarker: { lat: null, lng: null },
        searchMarker: { lat: null, lng: null },
        startPosition: { lat: null, lng: null },
        endPosition: { lat: null, lng: null }
    }),
}))