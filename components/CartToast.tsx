'use client';

import React, { useEffect } from 'react';
import { ShoppingBag, X, CheckCircle2 } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

const CartToast = () => {
    const { toast, clearToast, getTotalItems } = useCartStore();

    // Auto-dismiss after 3.5 seconds
    useEffect(() => {
        if (!toast) return;
        const timer = setTimeout(clearToast, 3500);
        return () => clearTimeout(timer);
    }, [toast, clearToast]);

    if (!toast) return null;

    return (
        <div
            className="fixed bottom-24 left-4 md:left-8 z-[250] max-w-[320px] w-[calc(100vw-2rem)] md:w-auto animate-toast-in"
            role="alert"
            aria-live="polite"
        >
            <div className="bg-white rounded-[1.25rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-black/[0.06] overflow-hidden">
                {/* Progress bar */}
                <div
                    className="h-[2px] w-full animate-toast-progress"
                    style={{ background: 'linear-gradient(90deg, #A0134D, #9A7B4F)' }}
                />
                <div className="flex items-start gap-3.5 p-4">
                    {/* Icon */}
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, rgba(160,19,77,0.1), rgba(154,123,79,0.1))' }}
                    >
                        <CheckCircle2 className="w-5 h-5 text-deep-rose" />
                    </div>
                    {/* Text */}
                    <div className="flex-grow min-w-0 pt-0.5">
                        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-charcoal/40 font-sans mb-0.5">
                            Added to Booking
                        </p>
                        <p className="font-display text-[15px] text-charcoal leading-tight truncate">
                            {toast.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-deep-rose font-black text-[13px]">{toast.price}</span>
                            <span className="text-[9px] text-charcoal/30 font-sans font-semibold uppercase tracking-wider">
                                · {getTotalItems()} service{getTotalItems() !== 1 ? 's' : ''} in cart
                            </span>
                        </div>
                    </div>
                    {/* Dismiss */}
                    <button
                        onClick={clearToast}
                        className="w-6 h-6 rounded-full bg-charcoal/[0.05] flex items-center justify-center flex-shrink-0 hover:bg-charcoal/10 transition-colors mt-0.5"
                        aria-label="Dismiss"
                    >
                        <X className="w-3 h-3 text-charcoal/40" />
                    </button>
                </div>
                <div className="px-4 pb-3.5 flex items-center gap-2 border-t border-black/[0.04] pt-2.5">
                    <ShoppingBag className="w-3 h-3 text-charcoal/30" />
                    <span className="text-[9px] font-semibold text-charcoal/30 font-sans uppercase tracking-widest">
                        Open cart to book via WhatsApp
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CartToast;
