import Category from '@/app/helper/Category';
import { create } from 'zustand';

interface CategoryState {
    categories: Category[];
    loading: boolean;
    setCategories: (categories: Category[]) => void;
    setLoading:(state: boolean) => void;
}

export const useCategoryStore = create<CategoryState>() (set => ({
    categories: [],
    loading: false,
    setCategories: (categories) => set({ categories ,loading:false}),
    setLoading: (state) => set({ loading: state }),
}));
