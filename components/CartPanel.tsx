'use client';

import React from 'react';
import { X, MessageCircle, Trash2, Clock, ShoppingBag, ArrowRight, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { formatWhatsAppMessage, cn } from '../lib/utils';
import { WHATSAPP_NUMBER } from '../constants/services';

const CartPanel = () => {
    const { items, removeItem, clearCart, getTotalPrice, getTotalItems } = useCartStore();

    const togglePanel = () => {
        const panel = document.getElementById('cart-panel');
        if (panel) panel.classList.toggle('translate-x-full');
    };

    const handleCheckout = () => {
        const message = formatWhatsAppMessage(items);
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
        window.open(url, '_blank');
        clearCart();
        togglePanel();
    };

    const totalItems = getTotalItems();
    const totalPrice = getTotalPrice();

    return (
        <>
            {/* Backdrop */}
            <div
                id="cart-backdrop"
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[199] opacity-0 pointer-events-none transition-opacity duration-500"
                onClick={togglePanel}
            />

            <div
                id="cart-panel"
                className="fixed top-0 right-0 w-full sm:w-[420px] h-dvh bg-white z-[200] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] transform translate-x-full flex flex-col"
                style={{ boxShadow: '-32px 0 80px rgba(0,0,0,0.18)' }}
            >
                {/* ── Header ─────────────────────────────── */}
                <div className="flex-shrink-0 flex items-center justify-between px-6 py-5 border-b border-black/[0.06]">
                    <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-2xl flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, #A0134D, #9A7B4F)' }}>
                            <ShoppingBag className="w-4.5 h-4.5 text-white" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-charcoal text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white">
                                    {totalItems}
                                </span>
                            )}
                        </div>
                        <div>
                            <h2 className="font-display text-xl text-charcoal leading-none">My Booking</h2>
                            <p className="text-[9px] font-black uppercase tracking-[0.35em] text-charcoal/30 mt-0.5">
                                {totalItems > 0 ? `${totalItems} service${totalItems !== 1 ? 's' : ''} selected` : 'Empty'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={togglePanel}
                        className="w-9 h-9 rounded-full bg-black/[0.04] hover:bg-black/[0.08] flex items-center justify-center transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-4 h-4 text-charcoal/60" />
                    </button>
                </div>

                {/* ── How it works pill ──────────────────── */}
                <div className="flex-shrink-0 mx-5 mt-4 px-4 py-3 rounded-2xl flex items-center gap-2.5"
                    style={{ background: 'rgba(154,123,79,0.07)', border: '1px solid rgba(154,123,79,0.15)' }}>
                    <CheckCircle2 className="w-3.5 h-3.5 text-warm-gold flex-shrink-0" />
                    <p className="text-[10px] font-semibold text-charcoal/50 font-sans leading-tight">
                        Add services → Book via WhatsApp → We confirm your slot
                    </p>
                </div>

                {/* ── Items list ─────────────────────────── */}
                <div className="flex-grow overflow-y-auto px-5 py-4 space-y-2.5" style={{ scrollbarWidth: 'none' }}>
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-16">
                            <div className="w-20 h-20 rounded-[2rem] bg-ivory border-2 border-dashed border-charcoal/10 flex items-center justify-center mb-5">
                                <Sparkles className="w-8 h-8 text-warm-gold/60" />
                            </div>
                            <h3 className="font-display text-xl text-charcoal mb-2">Nothing here yet</h3>
                            <p className="text-charcoal/40 font-sans text-sm leading-relaxed max-w-[200px] mb-7">
                                Browse services and tap <strong>Add</strong> to build your booking.
                            </p>
                            <button
                                onClick={togglePanel}
                                className="px-7 py-2.5 rounded-full bg-charcoal text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-deep-rose transition-colors duration-300"
                            >
                                Browse Services
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-3.5 p-3.5 rounded-2xl border border-black/[0.05] bg-[#fafafa] hover:bg-white hover:border-black/10 hover:shadow-sm transition-all duration-300 group"
                            >
                                {/* Thumbnail */}
                                <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-black/[0.05]">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex-grow min-w-0">
                                    <h4 className="font-display text-[15px] text-charcoal leading-tight truncate mb-1 group-hover:text-deep-rose transition-colors duration-300">
                                        {item.name}
                                    </h4>
                                    <div className="flex items-center gap-2.5">
                                        <span className="text-deep-rose font-black text-sm">{item.price}</span>
                                        <span className="w-px h-3 bg-charcoal/10" />
                                        <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-charcoal/35">
                                            <Clock className="w-2.5 h-2.5" />
                                            {item.duration}
                                        </span>
                                    </div>
                                </div>

                                {/* Remove */}
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="w-7 h-7 rounded-lg flex items-center justify-center text-charcoal/20 hover:text-rose-500 hover:bg-rose-50 transition-all flex-shrink-0"
                                    aria-label="Remove service"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* ── Footer ─────────────────────────────── */}
                {items.length > 0 && (
                    <div className="flex-shrink-0 border-t border-black/[0.05] bg-white px-5 pt-4 pb-6 space-y-3">
                        {/* Total */}
                        <div className="flex items-end justify-between px-1 mb-1">
                            <div>
                                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-charcoal/30 block mb-0.5">Estimated Total</span>
                                <p className="font-display text-3xl text-charcoal leading-none">{totalPrice}</p>
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-charcoal/25 pb-1">
                                {totalItems} service{totalItems !== 1 ? 's' : ''}
                            </span>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-black/[0.04]" />

                        {/* Trust note */}
                        <div className="flex items-start gap-3 px-1">
                            <ShieldCheck className="w-4 h-4 text-warm-gold flex-shrink-0 mt-0.5" />
                            <p className="text-[10px] text-charcoal/40 font-sans leading-relaxed">
                                Your booking is sent via WhatsApp. We'll confirm your date & time personally.
                            </p>
                        </div>

                        {/* Book CTA */}
                        <button
                            onClick={handleCheckout}
                            className="w-full flex items-center justify-between px-6 py-4 rounded-2xl text-white text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-90 active:scale-[0.98] group"
                            style={{ background: 'linear-gradient(135deg, #A0134D 0%, #C2185B 50%, #9A7B4F 100%)' }}
                        >
                            <MessageCircle className="w-5 h-5" />
                            <span>Book via WhatsApp</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        {/* Clear all */}
                        <button
                            onClick={clearCart}
                            className="w-full text-center text-[9px] font-black uppercase tracking-widest text-charcoal/20 hover:text-charcoal/50 transition-colors py-1"
                        >
                            Clear all services
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartPanel;
