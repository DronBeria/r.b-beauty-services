'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PRICING_DATA, PricingCategory, PricingItem } from '../constants/pricing';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../lib/utils';
import { Sparkles, ShoppingCart, ShieldCheck, CheckCircle2, MessageCircle } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { Service, Category } from '../types';

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_MAP: Record<string, Category> = {
    'laser-hair-removal': 'Laser Treatments',
    'facial-rituals': 'Facial Rituals',
    'clinical-care': 'Clinical Care',
    'packages': 'Packages',
};

function toService(item: PricingItem, category: PricingCategory): Service {
    const price = item.perSession ?? item.price ?? 'From $35';
    const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return {
        id: `pricing-${category.id}-${slug}`,
        name: item.name,
        category: CATEGORY_MAP[category.id] ?? 'Laser Treatments',
        description: item.description ?? '',
        price,
        duration: '45 mins',
        benefits: [],
        image: category.image,
    };
}

const PricingSection = () => {
    const [activeCategory, setActiveCategory] = useState<PricingCategory>(PRICING_DATA[0]);
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const { addItem, items } = useCartStore();

    const isInCart = (item: PricingItem, cat: PricingCategory) =>
        items.some((i) => i.id === toService(item, cat).id);

    const handleAdd = (item: PricingItem, cat: PricingCategory) => {
        const svc = toService(item, cat);
        if (!items.some((i) => i.id === svc.id)) addItem(svc);
    };

    const toggleCart = () => {
        const panel = document.getElementById('cart-panel');
        if (panel) panel.classList.toggle('translate-x-full');
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.pricing-header-reveal',
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (contentRef.current) gsap.fromTo(contentRef.current, { opacity: 0, y: 10, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out' });
        if (imageRef.current) gsap.fromTo(imageRef.current, { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' });
    }, [activeCategory]);

    return (
        <section id="pricing" ref={sectionRef} className="section-padding bg-[#fafafa] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-deep-rose-light/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-warm-gold-light/5 blur-[120px] rounded-full -ml-64 -mb-64 pointer-events-none" />

            <div className="container-custom relative z-10">
                {/* Header */}
                <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
                    <div className="pricing-header-reveal inline-flex items-center gap-3 mb-5">
                        <div className="w-10 h-px bg-charcoal/20" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-charcoal/50 font-sans">Professional Price List</span>
                        <div className="w-10 h-px bg-charcoal/20" />
                    </div>
                    <h2 className="pricing-header-reveal font-display text-5xl md:text-7xl text-charcoal mb-6 leading-tight">
                        Transparent <span className="italic font-light text-gradient">Menu</span>
                    </h2>
                    <p className="pricing-header-reveal text-soft-gray font-medium text-base max-w-lg mx-auto">
                        Tap any service to add it to your booking, then confirm your appointment via WhatsApp.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
                    {/* Sidebar */}
                    <div className="lg:col-span-4 flex flex-col gap-4 lg:sticky lg:top-28">
                        {/* Image preview */}
                        <div className="relative h-44 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white group">
                            <div ref={imageRef} className="absolute inset-0">
                                <img src={activeCategory.image} alt={activeCategory.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>
                            <div className="absolute bottom-5 left-6 flex items-center gap-2">
                                <span className="text-2xl drop-shadow-lg">{activeCategory.icon}</span>
                                <h4 className="text-white font-display text-lg">{activeCategory.title}</h4>
                            </div>
                        </div>

                        {/* Category buttons */}
                        <div className="flex flex-col gap-1.5 p-2.5 bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-sm border border-black/5">
                            {PRICING_DATA.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat)}
                                    className={cn(
                                        'flex items-center gap-3 px-5 py-3.5 rounded-[1.5rem] transition-all duration-300 text-left group',
                                        activeCategory.id === cat.id
                                            ? 'bg-charcoal text-white shadow-lg scale-[1.02]'
                                            : 'text-charcoal/50 hover:bg-blush-pink hover:text-charcoal'
                                    )}
                                >
                                    <span className={cn('text-base transition-transform duration-300 group-hover:scale-125', activeCategory.id !== cat.id && 'grayscale opacity-50')}>{cat.icon}</span>
                                    <span className="text-[11px] font-black uppercase tracking-widest">{cat.title}</span>
                                    {activeCategory.id === cat.id && <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
                                </button>
                            ))}
                        </div>

                        {/* Book CTA */}
                        <div className="p-6 bg-charcoal rounded-[2rem] text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-deep-rose/20 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-deep-rose/35 transition-colors" />
                            <h4 className="text-lg font-display mb-2 relative z-10">Ready to book?</h4>
                            <p className="text-white/40 text-[10px] mb-5 relative z-10 leading-relaxed font-sans uppercase tracking-widest">
                                Add services from the table, then send your booking.
                            </p>
                            <button
                                onClick={toggleCart}
                                className="inline-flex items-center gap-2.5 bg-white text-black px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-deep-rose hover:text-white transition-all active:scale-95"
                            >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>View My Booking</span>
                            </button>
                        </div>
                    </div>

                    {/* Pricing Table */}
                    <div className="lg:col-span-8">
                        <div ref={contentRef} className="bg-white rounded-[2rem] md:rounded-[3rem] p-4 md:p-8 lg:p-10 shadow-sm border border-black/5 relative overflow-hidden">
                            <div className="absolute top-8 right-8 opacity-[0.025] pointer-events-none select-none overflow-hidden max-w-[60%]">
                                <span className="text-7xl font-display uppercase text-charcoal whitespace-nowrap">{activeCategory.title}</span>
                            </div>

                            <div className="flex items-center justify-between mb-7 pb-5 border-b border-black/[0.04] relative z-10">
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-display text-charcoal">{activeCategory.title}</h3>
                                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-warm-gold mt-1">Clinical Standard Pricing</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-ivory flex items-center justify-center border border-black/5">
                                    <Sparkles className="w-4 h-4 text-warm-gold" />
                                </div>
                            </div>

                            <div className="relative z-10 space-y-8">
                                {activeCategory.sections.map((section, idx) => (
                                    <div key={idx}>
                                        {section.subtitle && (
                                            <div className="flex items-center gap-3 mb-5">
                                                <div className="w-6 h-px bg-charcoal/10" />
                                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/30 font-sans">{section.subtitle}</span>
                                                <div className="flex-1 h-px bg-charcoal/10" />
                                            </div>
                                        )}

                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left border-collapse min-w-[380px]">
                                                {section.columns && (
                                                    <thead>
                                                        <tr className="border-b border-black/5">
                                                            {section.columns.map((col, ci) => (
                                                                <th key={ci} className={cn('pb-3 text-[9px] font-black uppercase tracking-[0.2em] text-charcoal/35 font-sans', ci === 0 ? 'text-left' : 'text-right px-2')}>
                                                                    {col}
                                                                </th>
                                                            ))}
                                                            <th className="pb-3 text-right text-[9px] font-black uppercase tracking-[0.2em] text-charcoal/35 font-sans">Book</th>
                                                        </tr>
                                                    </thead>
                                                )}
                                                <tbody className="divide-y divide-black/[0.035]">
                                                    {section.items.map((item, ri) => {
                                                        const inCart = isInCart(item, activeCategory);
                                                        return (
                                                            <tr key={ri} className={cn('group transition-all duration-300', inCart ? 'bg-deep-rose/[0.02]' : 'hover:bg-ivory/50')}>
                                                                {/* Name */}
                                                                <td className="py-4 pr-3 align-middle">
                                                                    <div className="flex flex-col gap-0.5">
                                                                        <span className={cn('text-[14px] font-bold tracking-tight transition-colors duration-300', inCart ? 'text-deep-rose' : 'text-charcoal group-hover:text-deep-rose')}>
                                                                            {item.name}
                                                                        </span>
                                                                        {item.description && <span className="text-[10px] text-soft-gray opacity-60 italic">{item.description}</span>}
                                                                    </div>
                                                                </td>

                                                                {item.perSession && (
                                                                    <td className="py-4 px-2 text-right align-middle whitespace-nowrap">
                                                                        <span className="text-[13px] font-black text-charcoal font-sans">{item.perSession}</span>
                                                                    </td>
                                                                )}
                                                                {item.sixSessions && (
                                                                    <td className="py-4 px-2 text-right align-middle whitespace-nowrap">
                                                                        <span className="text-[13px] font-black font-sans px-3 py-1.5 rounded-xl bg-charcoal/[0.04] group-hover:bg-charcoal group-hover:text-white transition-all">
                                                                            {item.sixSessions}
                                                                        </span>
                                                                    </td>
                                                                )}
                                                                {item.savings && (
                                                                    <td className="py-4 px-2 text-right align-middle whitespace-nowrap">
                                                                        <span className="text-[9px] font-black uppercase text-[#1a9d82] bg-[#f0f9f7] border border-[#1a9d82]/15 px-2.5 py-1 rounded-full">
                                                                            {item.savings}
                                                                        </span>
                                                                    </td>
                                                                )}
                                                                {item.price && !item.perSession && (
                                                                    <td className="py-4 px-2 text-right align-middle whitespace-nowrap">
                                                                        <span className="text-[15px] font-black text-charcoal font-sans">{item.price}</span>
                                                                    </td>
                                                                )}

                                                                {/* Cart button */}
                                                                <td className="py-4 pl-2 text-right align-middle">
                                                                    <button
                                                                        onClick={() => handleAdd(item, activeCategory)}
                                                                        disabled={inCart}
                                                                        title={inCart ? 'Already in booking' : 'Add to booking'}
                                                                        className={cn(
                                                                            'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[9px] font-black uppercase tracking-wider transition-all duration-300 whitespace-nowrap',
                                                                            inCart
                                                                                ? 'bg-ivory text-soft-gray border border-charcoal/10 cursor-default'
                                                                                : 'bg-charcoal text-white hover:bg-deep-rose shadow-sm hover:shadow active:scale-95'
                                                                        )}
                                                                    >
                                                                        {inCart
                                                                            ? <><ShieldCheck className="w-3 h-3 text-deep-rose" /><span>Added</span></>
                                                                            : <><ShoppingCart className="w-3 h-3" /><span>Add</span></>}
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Trust strip */}
                            <div className="mt-8 pt-6 border-t border-black/[0.04] flex flex-wrap gap-5 items-center justify-center opacity-35">
                                {['Medical Grade Lasers', 'FDA Approved Tech', 'Hospital-Grade Safety'].map((t) => (
                                    <div key={t} className="flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3 h-3 text-warm-gold" />
                                        <span className="text-[9px] font-black uppercase tracking-widest">{t}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
