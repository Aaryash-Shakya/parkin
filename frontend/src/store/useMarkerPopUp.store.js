import { create } from "zustand";

export const useMarkerPopUpStore = create((set) => ({
  showContent: false,
  setShowContent: (value) => set({ showContent: value }),
  toggleContent: () =>
    set((state) => ({ showContent: !state.showContent })),
  hideContent: () => set({ showContent: false }),
  clearContent: () => set({ showContent: false }),

  markerContent: {
    parkingId: null,
  },
  setMarkerContent: (markerContent) => {
    console.log("Marker content set:", markerContent);
    set({ markerContent });
  },
  clearMarkerContent: () =>
    set({
      markerContent: {
        parkingId: null
      },
    }),
}));
