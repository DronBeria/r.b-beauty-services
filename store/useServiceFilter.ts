import { create } from 'zustand';
import { Category } from '../types';

interface FilterStore {
    activeCategory: Category;
    setActiveCategory: (cat: Category) => void;
}

export const useServiceFilter = create<FilterStore>((set) => ({
    activeCategory: 'All Services',
    setActiveCategory: (cat) => set({ activeCategory: cat }),
}));
