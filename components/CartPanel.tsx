'use client';

import React from 'react';
import { ShoppingBag, X, MessageCircle, Trash2, Clock, Sparkles, ShieldCheck, ArrowRight, CalendarCheck } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { formatWhatsAppMessage, cn } from '../lib/utils';
import { WHATSAPP_NUMBER } from '../constants/services';

const CartPanel = () => {
    const { items, removeItem, clearCart, getTotalPrice } = useCartStore();

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
        <div
            id="cart-panel"
            className="fixed top-0 right-0 w-full md:w-[460px] h-screen bg-white z-[200] transition-transform duration-700 ease-in-out transform translate-x-full shadow-[-24px_0_80px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col border-l border-charcoal/5"
        >
            {/* Ambient */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-deep-rose/5 blur-[100px] rounded-full pointer-events-none" />

            {/* Header */}
            <div className="relative px-8 py-6 flex items-center justify-between border-b border-charcoal/5 flex-shrink-0">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-2xl bg-charcoal text-white flex items-center justify-center shadow-lg">
                            <ShoppingBag className="w-5 h-5" />
                        </div>
                        {totalItems > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-deep-rose text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                                {totalItems}
                            </span>
                        )}
                    </div>
                    <div>
                        <h2 className="font-display text-2xl text-charcoal tracking-tight leading-none">My Booking</h2>
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-charcoal/30 font-sans">
                            {totalItems > 0 ? `${totalItems} service${totalItems > 1 ? 's' : ''} selected` : 'No services yet'}
                        </span>
                    </div>
                </div>
                <button
                    onClick={togglePanel}
                    className="w-10 h-10 rounded-full border border-charcoal/10 flex items-center justify-center hover:bg-charcoal hover:text-white transition-all duration-400 hover:rotate-90"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* How it works strip */}
            <div className="flex-shrink-0 px-8 py-3 bg-ivory/60 border-b border-charcoal/5 flex items-center gap-2">
                <CalendarCheck className="w-3.5 h-3.5 text-warm-gold flex-shrink-0" />
                <p className="text-[10px] text-charcoal/50 font-sans font-semibold leading-tight">
                    Select services → Book via WhatsApp → We confirm your slot
                </p>
            </div>

            {/* Services list */}
            <div className="relative flex-grow overflow-y-auto px-6 py-5 space-y-3" style={{ scrollbarWidth: 'none' }}>
                {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-12">
                        <div className="w-20 h-20 rounded-[40%] bg-ivory border border-dashed border-charcoal/20 flex items-center justify-center mb-6 animate-float">
                            <Sparkles className="w-9 h-9 text-warm-gold" />
                        </div>
                        <h3 className="font-display text-2xl text-charcoal mb-3">No services yet</h3>
                        <p className="text-soft-gray font-sans text-sm leading-relaxed mb-8 max-w-[220px]">
                            Browse our services and tap "Add to Booking" to get started.
                        </p>
                        <button
                            onClick={togglePanel}
                            className="px-8 py-3 rounded-full border border-charcoal text-[10px] font-black uppercase tracking-[0.35em] hover:bg-charcoal hover:text-white transition-all duration-300"
                        >
                            Browse Services
                        </button>
                    </div>
                ) : (
                    items.map((item) => (
                        <div
                            key={item.id}
                            className="group flex items-center gap-4 p-4 rounded-2xl border border-charcoal/5 bg-ivory/50 hover:bg-white hover:shadow-md transition-all duration-400"
                        >
                            {/* Thumbnail */}
                            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-charcoal/5 shadow-sm">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            {/* Details */}
                            <div className="flex-grow min-w-0">
                                <h4 className="font-display text-base text-charcoal leading-tight mb-1 truncate group-hover:text-deep-rose transition-colors">
                                    {item.name}
                                </h4>
                                <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-wider text-charcoal/40 font-sans">
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3 text-warm-gold" />
                                        <span>{item.duration}</span>
                                    </div>
                                    <span className="text-deep-rose text-sm font-display tracking-normal normal-case font-bold leading-none">{item.price}</span>
                                </div>
                            </div>
                            {/* Remove */}
                            <button
                                onClick={() => removeItem(item.id)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-charcoal/20 hover:text-deep-rose hover:bg-deep-rose/5 transition-all flex-shrink-0"
                                aria-label="Remove"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Footer — shown only when cart has items */}
            {items.length > 0 && (
                <div className="flex-shrink-0 px-6 py-5 border-t border-charcoal/5 bg-white space-y-4">
                    {/* Total row */}
                    <div className="flex items-center justify-between px-1">
                        <div>
                            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-charcoal/30 font-sans block mb-0.5">Estimated Total</span>
                            <p className="font-display text-3xl text-charcoal italic leading-none">{totalPrice}</p>
                        </div>
                        <div className="text-right">
                            <span className="text-[9px] font-black uppercase tracking-[0.35em] text-deep-rose/40 font-sans block mb-0.5">Services</span>
                            <p className="font-display text-xl text-charcoal">{totalItems}</p>
                        </div>
                    </div>

                    {/* Trust note */}
                    <div className="flex items-start gap-3 p-3 rounded-2xl bg-ivory border border-charcoal/5 text-[10px] text-soft-gray font-sans leading-relaxed">
                        <ShieldCheck className="w-4 h-4 text-warm-gold flex-shrink-0 mt-0.5" />
                        <span>Your booking request is sent to our team via WhatsApp. We'll confirm your date & time directly.</span>
                    </div>

                    {/* Book via WhatsApp */}
                    <button
                        onClick={handleCheckout}
                        className="btn-primary w-full group !py-5 !rounded-2xl text-sm"
                    >
                        <MessageCircle className="w-5 h-5" />
                        <span>Book via WhatsApp</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform ml-auto" />
                    </button>

                    {/* Clear all */}
                    <button
                        onClick={clearCart}
                        className="w-full text-center text-[9px] font-black uppercase tracking-widest text-charcoal/25 hover:text-charcoal/50 transition-colors font-sans py-1"
                    >
                        Clear all
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartPanel;
