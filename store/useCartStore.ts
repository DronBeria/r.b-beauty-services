import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Service, CartItem } from '../types';

interface CartStore {
    items: CartItem[];
    addItem: (service: Service) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => string;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (service) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((item) => item.id === service.id);

                if (existingItem) {
                    // If already in cart, we don't necessarily increment quantity for services
                    // but we can just leave it as is or show a message. 
                    // For services, usually it's one of each per appointment.
                    return;
                }

                set({ items: [...currentItems, { ...service, quantity: 1 }] });
            },
            removeItem: (id) => {
                set({ items: get().items.filter((item) => item.id !== id) });
            },
            clearCart: () => set({ items: [] }),
            getTotalItems: () => get().items.length,
            getTotalPrice: () => {
                // Since prices are strings like "From $120", we do a simple range estimation
                // This is a placeholder logic as per PRD requirements for "Estimated Total"
                const total = get().items.reduce((acc, item) => {
                    const price = parseInt(item.price.replace(/[^0-9]/g, '')) || 0;
                    return acc + price;
                }, 0);
                return `From $${total}`;
            },
        }),
        {
            name: 'rb-beauty-cart',
        }
    )
);
