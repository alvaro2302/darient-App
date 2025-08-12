import SearchJokeResponse from "@/app/helper/SearchJokeResponse";
import { create } from "zustand";

interface JokeSearchState {
    search: string;
    resultSearch: SearchJokeResponse | null;
    loading: boolean;
    setLoading: (state: boolean) => void;
    setResultSearch: (newResultSearch: SearchJokeResponse) => void;
    setSearch: (newSearch: string) =>void;
}

export const useJokeSearchStore = create<JokeSearchState>((set) => ({
    search: '',
    resultSearch: null,
    loading: false,
    setLoading: (state: boolean) => {
        set({loading:state})
    },
    setResultSearch:  (newResultSearch: SearchJokeResponse) => {
        set({resultSearch: newResultSearch,loading: false})
    },
    setSearch: (newSearch: string) =>{
        set({search:newSearch,resultSearch: null})
    }

}))