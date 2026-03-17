'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PRICING_DATA, PricingCategory } from '../constants/pricing';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../lib/utils';
import { Sparkles, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PricingSection = () => {
    const [activeCategory, setActiveCategory] = useState<PricingCategory>(PRICING_DATA[0]);
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

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
        if (contentRef.current) gsap.fromTo(contentRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' });
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
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-charcoal/50 font-sans">Service Menu</span>
                        <div className="w-10 h-px bg-charcoal/20" />
                    </div>
                    <h2 className="pricing-header-reveal font-display text-5xl md:text-7xl text-charcoal mb-6 leading-tight">
                        Our <span className="italic font-light text-gradient">Pricing</span>
                    </h2>
                    <p className="pricing-header-reveal text-soft-gray font-medium text-base max-w-lg mx-auto">
                        Transparent pricing for every treatment. Contact us to book your appointment.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
                    {/* Category tabs */}
                    <div className="lg:col-span-3 flex flex-col gap-1.5 p-2.5 bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-sm border border-black/5 lg:sticky lg:top-28">
                        {PRICING_DATA.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat)}
                                className={cn(
                                    'flex items-center gap-3 px-5 py-3.5 rounded-[1.5rem] transition-all duration-300 text-left group',
                                    activeCategory.id === cat.id
                                        ? 'bg-charcoal text-white shadow-lg'
                                        : 'text-charcoal/50 hover:bg-blush-pink hover:text-charcoal'
                                )}
                            >
                                <span className={cn('text-base transition-transform duration-300', activeCategory.id !== cat.id && 'grayscale opacity-50')}>{cat.icon}</span>
                                <span className="text-[11px] font-black uppercase tracking-widest">{cat.title}</span>
                            </button>
                        ))}
                    </div>

                    {/* Pricing Table */}
                    <div className="lg:col-span-9">
                        <div ref={contentRef} className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 shadow-sm border border-black/5">

                            <div className="flex items-center justify-between mb-8 pb-6 border-b border-black/[0.05]">
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-display text-charcoal">{activeCategory.title}</h3>
                                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-warm-gold mt-1">Beaumont, Alberta</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-ivory flex items-center justify-center border border-black/5">
                                    <Sparkles className="w-4 h-4 text-warm-gold" />
                                </div>
                            </div>

                            <div className="space-y-8">
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
                                            <table className="w-full text-left border-collapse min-w-[300px]">
                                                {section.columns && (
                                                    <thead>
                                                        <tr className="border-b border-black/5">
                                                            {section.columns.map((col, ci) => (
                                                                <th key={ci} className={cn('pb-3 text-[9px] font-black uppercase tracking-[0.2em] text-charcoal/35 font-sans', ci === 0 ? 'text-left' : 'text-right px-2')}>
                                                                    {col}
                                                                </th>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                )}
                                                <tbody className="divide-y divide-black/[0.035]">
                                                    {section.items.map((item, ri) => (
                                                        <tr key={ri} className="group hover:bg-ivory/50 transition-colors duration-200">
                                                            <td className="py-4 pr-4 align-middle">
                                                                <div className="flex flex-col gap-0.5">
                                                                    <span className="text-[14px] font-semibold text-charcoal tracking-tight">{item.name}</span>
                                                                    {item.description && <span className="text-[11px] text-soft-gray/70 italic">{item.description}</span>}
                                                                </div>
                                                            </td>

                                                            {item.perSession && (
                                                                <td className="py-4 px-2 text-right align-middle whitespace-nowrap">
                                                                    <span className="text-[14px] font-bold text-charcoal font-sans">{item.perSession}</span>
                                                                </td>
                                                            )}
                                                            {item.sixSessions && (
                                                                <td className="py-4 px-2 text-right align-middle whitespace-nowrap">
                                                                    <span className="text-[14px] font-bold text-charcoal font-sans">{item.sixSessions}</span>
                                                                </td>
                                                            )}
                                                            {item.savings && (
                                                                <td className="py-4 px-2 text-right align-middle whitespace-nowrap">
                                                                    <span className="text-[10px] font-bold text-[#1a9d82] bg-[#f0f9f7] border border-[#1a9d82]/15 px-2.5 py-1 rounded-full">
                                                                        {item.savings}
                                                                    </span>
                                                                </td>
                                                            )}
                                                            {item.price && !item.perSession && (
                                                                <td className="py-4 px-2 text-right align-middle whitespace-nowrap">
                                                                    <span className="text-[15px] font-bold text-charcoal font-sans">{item.price}</span>
                                                                </td>
                                                            )}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Trust strip */}
                            <div className="mt-8 pt-6 border-t border-black/[0.04] flex flex-wrap gap-5 items-center justify-center opacity-40">
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
