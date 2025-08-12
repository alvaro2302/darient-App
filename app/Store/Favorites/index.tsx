import Favorite from "@/app/helper/Favorite";
import { create } from "zustand";

interface FavoritesState {
    favorites: Favorite[];
    loading: boolean;
    error: string | null;
    setFavorites: (newFavorites: Favorite[]) => void;
    setLoading: (state: boolean) => void;
}

export const useFavoriteStore = create<FavoritesState>(( set) => ({
    favorites: [],
    loading: false,
    error: null,
    setFavorites: (newFavorites: Favorite[])=>{
        set({
            favorites: newFavorites,
            loading: false,
            error: null
        });
    },
    setLoading: (state: boolean) =>{
        set({
            loading: state
        });
    }
}));
