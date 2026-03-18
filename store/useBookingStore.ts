import { create } from 'zustand';

interface BookingStore {
    isOpen: boolean;
    preselectedServiceId: string | null;
    openModal: (serviceId?: string) => void;
    closeModal: () => void;
}

export const useBookingStore = create<BookingStore>((set) => ({
    isOpen: false,
    preselectedServiceId: null,
    openModal: (serviceId) => set({ isOpen: true, preselectedServiceId: serviceId ?? null }),
    closeModal: () => set({ isOpen: false, preselectedServiceId: null }),
}));
