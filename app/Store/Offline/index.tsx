import { create } from "zustand";

interface OfflineState {
    isOffline: boolean;
    setIsOffline: (isOffline: boolean) => void;
}



export const useOfflineStore = create<OfflineState>((set) => ({
    isOffline: false,
    setIsOffline: (isOffline: boolean) => set({ isOffline }),
}))