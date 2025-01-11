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
        lat: 27.698865,
        lng: 85.297047,
    },
    endPosition: {
        lat: null,
        lng: null,
    },
    triggerSearch: false,

    // Set the new marker
    setNewMarker: (newMarker) => {
        console.log("New marker set:", newMarker);
        set({ newMarker: { lat: newMarker.lat, lng: newMarker.lng } });
    },

    // Set the search marker
    searchPointMarker: (searchMarker) => {
        console.log("Search marker set:", searchMarker);
        set({ searchMarker: { lat: searchMarker.lat, lng: searchMarker.lng } });
    },

    // Set start position
    setStartPosition: (startPosition) => {
        console.log("Start position set:", startPosition);
        set({ startPosition: { lat: startPosition.lat, lng: startPosition.lng } });
    },

    // Set end position
    setEndPosition: (endPosition) => {
        console.log("End position set:", endPosition);
        set({ endPosition: { lat: endPosition.lat, lng: endPosition.lng } });
    },

    // Clear all marker states
    clearMarker: () =>
        set({
            newMarker: { lat: null, lng: null },
            searchMarker: { lat: null, lng: null },
            startPosition: { lat: null, lng: null },
            endPosition: { lat: null, lng: null },
        }),

    // Toggle search state
    toggleSearch: () =>
        set((state) => ({
            triggerSearch: !state.triggerSearch,
        })),
}));
