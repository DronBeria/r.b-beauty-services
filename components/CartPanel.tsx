'use client';

import React, { useRef, useEffect } from 'react';
import { ShoppingCart, X, MessageCircle, Trash2, Clock, Calendar, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { formatWhatsAppMessage, cn } from '../lib/utils';
import { WHATSAPP_NUMBER } from '../constants/services';
import Image from 'next/image';
import { gsap } from 'gsap';

const CartPanel = () => {
    const { items, removeItem, clearCart, getTotalPrice } = useCartStore();
    const panelRef = useRef<HTMLDivElement>(null);

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

    const totalItems = items.length;
    const totalPrice = getTotalPrice();

    return (
        <>
            <div
                id="cart-panel"
                className="fixed top-0 right-0 w-full md:w-[500px] h-screen bg-white z-[100] transition-transform duration-700 ease-expo transform translate-x-full shadow-[-20px_0_80px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col border-l border-charcoal/5"
            >
                {/* Visual Ambient Elements inside Panel */}
                <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-deep-rose/5 blur-[100px] rounded-full pointer-events-none" />

                {/* Header Container */}
                <div className="relative p-10 md:p-12 flex items-center justify-between border-b border-charcoal/5">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <div className="w-14 h-14 rounded-2xl bg-charcoal text-white flex items-center justify-center shadow-2xl shadow-charcoal/20">
                                <ShoppingCart className="w-6 h-6" />
                            </div>
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 w-7 h-7 bg-deep-rose text-white text-[11px] font-black rounded-full flex items-center justify-center border-4 border-white shadow-xl animate-pulse-soft">
                                    {totalItems}
                                </span>
                            )}
                        </div>
                        <div>
                            <h2 className="font-display text-4xl text-charcoal tracking-tight">Your Ritual</h2>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/30">Review Your Selection</span>
                        </div>
                    </div>
                    <button
                        onClick={togglePanel}
                        className="w-12 h-12 rounded-full border border-charcoal/10 flex items-center justify-center hover:bg-charcoal hover:text-white transition-all duration-500 hover:rotate-90"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Services List Area */}
                <div className="relative flex-grow overflow-y-auto p-10 md:p-12 space-y-6 scrollbar-none no-scrollbar">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-0 animate-fade-in-up">
                            <div className="w-24 h-24 rounded-[40%] bg-ivory border border-dotted border-charcoal/20 flex items-center justify-center mb-8 animate-float">
                                <Sparkles className="w-10 h-10 text-warm-gold" />
                            </div>
                            <h3 className="font-display text-4xl text-charcoal mb-4 italic">The Ritual Awaits</h3>
                            <p className="text-soft-gray font-sans text-base leading-relaxed mb-10 max-w-xs">
                                Your curation is empty. Explore our mastership to begin your transformation.
                            </p>
                            <button
                                onClick={togglePanel}
                                className="px-10 py-5 rounded-full border border-charcoal text-[10px] font-black uppercase tracking-[0.4em] hover:bg-charcoal hover:text-white transition-all"
                            >
                                Discover Services
                            </button>
                        </div>
                    ) : (
                        items.map((item, idx) => (
                            <div
                                key={item.id}
                                className="group relative glass-card !rounded-3xl p-6 flex items-center gap-6 shadow-sm hover:shadow-xl transition-all duration-700 bg-gradient-to-br from-white to-ivory border-charcoal/5"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg border border-charcoal/5">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h4 className="font-display text-2xl text-charcoal leading-tight mb-2 group-hover:text-deep-rose transition-colors">{item.name}</h4>
                                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-charcoal/40 font-sans">
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5 text-warm-gold" />
                                            <span>{item.duration}</span>
                                        </div>
                                        <div className="w-1 h-1 rounded-full bg-charcoal/10" />
                                        <span className="text-deep-rose text-sm font-display tracking-normal normal-case font-bold">{item.price}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="w-10 h-10 rounded-xl flex items-center justify-center text-charcoal/20 hover:text-deep-rose hover:bg-deep-rose/5 transition-all"
                                >
                                    <Trash2 className="w-4.5 h-4.5" />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer Analysis Area */}
                {items.length > 0 && (
                    <div className="relative p-10 md:p-12 border-t border-charcoal/5 bg-white/50 backdrop-blur-xl">
                        <div className="space-y-8">
                            <div className="flex items-end justify-between px-2">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/30">Estimated Total</span>
                                    <p className="font-display text-5xl text-charcoal tracking-tighter italic">{totalPrice}</p>
                                </div>
                                <div className="text-right pb-1">
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-deep-rose/40">Curation Count</span>
                                    <p className="font-display text-2xl text-charcoal">{totalItems} Services</p>
                                </div>
                            </div>

                            <div className="p-6 rounded-[2rem] bg-charcoal/[0.02] border border-charcoal/5 flex items-start gap-4 text-xs text-soft-gray font-sans leading-relaxed">
                                <ShieldCheck className="w-5 h-5 text-warm-gold flex-shrink-0 mt-0.5" />
                                <p>This selection serves as your treatment roadmap. A specialist will finalize clinical specifics during your digital intake.</p>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="btn-primary w-full group !py-7 !rounded-[2.5rem] shadow-deep-rose/20"
                            >
                                <MessageCircle className="w-6 h-6 animate-pulse-soft" />
                                <span className="text-sm">Initiate Digital Intake</span>
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-4 transition-transform" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartPanel;
