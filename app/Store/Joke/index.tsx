import Joke from "@/app/helper/Joke";
import { create } from "zustand";

interface JokeState {
  joke: Joke | null;
  loading: boolean;
  error: string | null;
  saveJoke: (joke: Joke) => void;
  setLoading: (loading: boolean) => void;
}

export const useJokeStore = create<JokeState>((set) => ({
  joke: null,
  loading: false,
  error: null,
  saveJoke:  (joke: Joke) => {
    set({
      joke,
      loading: false,
      error: null,
    });
  },
  setLoading: (loading: boolean) => set({ loading, error: null }),
}));