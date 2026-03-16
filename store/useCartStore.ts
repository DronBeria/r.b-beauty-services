import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Service, CartItem } from '../types';

interface CartStore {
    items: CartItem[];
    toast: { name: string; price: string } | null;
    addItem: (service: Service) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    clearToast: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => string;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            toast: null,
            addItem: (service) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((item) => item.id === service.id);
                if (existingItem) return;
                set({
                    items: [...currentItems, { ...service, quantity: 1 }],
                    toast: { name: service.name, price: service.price },
                });
            },
            removeItem: (id) => {
                set({ items: get().items.filter((item) => item.id !== id) });
            },
            clearCart: () => set({ items: [] }),
            clearToast: () => set({ toast: null }),
            getTotalItems: () => get().items.length,
            getTotalPrice: () => {
                const total = get().items.reduce((acc, item) => {
                    const price = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
                    return acc + price;
                }, 0);
                return `$${total.toFixed(2)}`;
            },
        }),
        {
            name: 'rb-beauty-cart',
            partialize: (state) => ({ items: state.items }),
        }
    )
);
