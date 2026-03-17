'use client';

import React from 'react';
import { X, MessageCircle, Trash2, Clock, ShoppingBag, ArrowRight, ShieldCheck, Check, Scissors, Sparkles, Zap, Star } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { formatWhatsAppMessage, cn } from '../lib/utils';
import { WHATSAPP_NUMBER } from '../constants/services';
import { Category } from '../types';

const CATEGORY_ICONS: Record<Category, { icon: React.ElementType; color: string }> = {
    'All Services': { icon: Sparkles, color: '#9A7B4F' },
    'Threading': { icon: Scissors, color: '#A0134D' },
    'Waxing': { icon: Sparkles, color: '#9A7B4F' },
    'Nufree Waxing': { icon: ShieldCheck, color: '#1a9d82' },
    'Facial Treatments': { icon: Star, color: '#C2185B' },
    'Laser Hair Removal': { icon: Zap, color: '#1565C0' },
};

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
                className="fixed top-0 right-0 w-full sm:w-[400px] h-dvh bg-white z-[200] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] transform translate-x-full flex flex-col"
                style={{ boxShadow: '-24px 0 60px rgba(0,0,0,0.12)' }}
            >
                {/* ── Header ─────────────────────────────── */}
                <div className="flex-shrink-0 px-6 pt-6 pb-5 border-b border-black/[0.06]">
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-3">
                            <ShoppingBag className="w-4.5 h-4.5 text-charcoal/60" />
                            <h2 className="font-display text-[1.25rem] text-charcoal leading-none tracking-tight">Booking Summary</h2>
                        </div>
                        <button
                            onClick={togglePanel}
                            className="w-8 h-8 rounded-full bg-black/[0.04] hover:bg-black/[0.09] flex items-center justify-center transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-3.5 h-3.5 text-charcoal/60" />
                        </button>
                    </div>
                    <p className="text-[10px] font-semibold text-charcoal/35 font-sans ml-7">
                        {totalItems > 0 ? `${totalItems} service${totalItems !== 1 ? 's' : ''} selected` : 'No services selected yet'}
                    </p>
                </div>

                {/* ── How it works ───────────────────────── */}
                <div className="flex-shrink-0 mx-5 mt-4">
                    <div className="flex items-center gap-6 px-4 py-3 rounded-xl bg-[#fafafa] border border-black/[0.05]">
                        {['Browse', 'Add', 'Book'].map((step, i) => (
                            <React.Fragment key={step}>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-4 h-4 rounded-full bg-charcoal/8 flex items-center justify-center flex-shrink-0">
                                        <span className="text-[8px] font-black text-charcoal/40">{i + 1}</span>
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-charcoal/35">{step}</span>
                                </div>
                                {i < 2 && <div className="flex-1 h-px bg-charcoal/[0.08]" />}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* ── Items list ─────────────────────────── */}
                <div className="flex-grow overflow-y-auto px-5 py-4 space-y-2" style={{ scrollbarWidth: 'none' }}>
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-12">
                            <div className="w-16 h-16 rounded-2xl bg-[#fafafa] border border-dashed border-charcoal/10 flex items-center justify-center mb-4">
                                <ShoppingBag className="w-6 h-6 text-charcoal/20" />
                            </div>
                            <h3 className="font-display text-lg text-charcoal mb-1.5">Your booking is empty</h3>
                            <p className="text-charcoal/35 font-sans text-[13px] leading-relaxed max-w-[180px] mb-6">
                                Browse our services and add them here to get started.
                            </p>
                            <button
                                onClick={togglePanel}
                                className="px-6 py-2.5 rounded-full bg-charcoal text-white text-[10px] font-black uppercase tracking-[0.25em] hover:bg-deep-rose transition-colors duration-300"
                            >
                                Browse Services
                            </button>
                        </div>
                    ) : (
                        items.map((item) => {
                            const catConfig = CATEGORY_ICONS[item.category as Category] || CATEGORY_ICONS['Threading'];
                            const CatIcon = catConfig.icon;
                            return (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-3 p-3.5 rounded-xl border border-black/[0.05] bg-[#fafafa] hover:bg-white hover:border-black/[0.09] hover:shadow-sm transition-all duration-300 group"
                                >
                                    {/* Category icon */}
                                    <div
                                        className="w-9 h-9 rounded-[0.6rem] flex items-center justify-center flex-shrink-0"
                                        style={{ background: `${catConfig.color}12` }}
                                    >
                                        <CatIcon className="w-4 h-4" style={{ color: catConfig.color }} />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-grow min-w-0">
                                        <h4 className="font-sans font-bold text-[13.5px] text-charcoal leading-tight truncate mb-0.5">
                                            {item.name}
                                        </h4>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[12px] font-black" style={{ color: catConfig.color }}>{item.price}</span>
                                            <span className="w-px h-2.5 bg-charcoal/10" />
                                            <span className="flex items-center gap-1 text-[10px] text-charcoal/35 font-semibold font-sans">
                                                <Clock className="w-2.5 h-2.5" />
                                                {item.duration}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Remove */}
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="w-7 h-7 rounded-lg flex items-center justify-center text-charcoal/15 hover:text-rose-500 hover:bg-rose-50 transition-all flex-shrink-0"
                                        aria-label="Remove"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* ── Footer ─────────────────────────────── */}
                {items.length > 0 && (
                    <div className="flex-shrink-0 border-t border-black/[0.05] px-5 pt-4 pb-6 space-y-4">
                        {/* Totals row */}
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-[0.35em] text-charcoal/30 mb-0.5">Estimated Total</p>
                                <p className="font-display text-[1.7rem] text-charcoal leading-none">{totalPrice}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[9px] font-black uppercase tracking-[0.35em] text-charcoal/25 mb-0.5">Services</p>
                                <p className="font-display text-[1.7rem] text-charcoal/40 leading-none">{totalItems}</p>
                            </div>
                        </div>

                        {/* Confirmation note */}
                        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#fafafa] border border-black/[0.04]">
                            <Check className="w-3.5 h-3.5 text-[#1a9d82] flex-shrink-0 mt-0.5 stroke-[2.5]" />
                            <p className="text-[10px] text-charcoal/40 font-sans leading-relaxed">
                                We'll confirm your appointment date & time personally via WhatsApp after you submit.
                            </p>
                        </div>

                        {/* Book CTA */}
                        <button
                            onClick={handleCheckout}
                            className="w-full flex items-center justify-between px-5 py-3.5 rounded-xl text-white text-[11px] font-black uppercase tracking-[0.18em] transition-all duration-300 hover:opacity-90 active:scale-[0.98] group bg-charcoal hover:bg-deep-rose"
                        >
                            <MessageCircle className="w-4 h-4 flex-shrink-0" />
                            <span>Book via WhatsApp</span>
                            <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                        </button>

                        {/* Clear */}
                        <button
                            onClick={clearCart}
                            className="w-full text-center text-[9px] font-black uppercase tracking-widest text-charcoal/20 hover:text-charcoal/45 transition-colors"
                        >
                            Clear all
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartPanel;
