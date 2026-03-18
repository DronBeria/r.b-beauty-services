'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PRICING_DATA, PricingCategory } from '../constants/pricing';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../lib/utils';
import { CheckCircle2 } from 'lucide-react';

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
        if (contentRef.current) {
            gsap.fromTo(contentRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
        }
    }, [activeCategory]);

    return (
        <section id="pricing" ref={sectionRef} className="section-padding bg-[#fafafa] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-deep-rose-light/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-warm-gold-light/5 blur-[120px] rounded-full -ml-64 -mb-64 pointer-events-none" />

            <div className="container-custom relative z-10">

                {/* Header */}
                <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
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

                {/* Horizontal Category Tabs */}
                <div className="pricing-header-reveal flex justify-center mb-10">
                    <div className="flex gap-1.5 p-1.5 bg-white border border-black/[0.06] rounded-full shadow-sm overflow-x-auto max-w-full">
                        {PRICING_DATA.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat)}
                                className={cn(
                                    'flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 whitespace-nowrap',
                                    'text-[10px] font-black uppercase tracking-widest font-sans',
                                    activeCategory.id === cat.id
                                        ? 'bg-charcoal text-white shadow-sm'
                                        : 'text-charcoal/40 hover:text-charcoal hover:bg-black/[0.03]'
                                )}
                            >
                                <span>{cat.icon}</span>
                                <span>{cat.title}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Pricing Card */}
                <div ref={contentRef} className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-black/[0.05]">

                        {activeCategory.sections.map((section, idx) => {
                            const isColumnLayout = section.items.some(i => i.perSession);

                            return (
                                <div key={idx} className={cn(idx > 0 && 'mt-10 pt-10 border-t border-black/[0.05]')}>

                                    {section.subtitle && (
                                        <div className="flex items-center gap-3 mb-7">
                                            <span className="text-[9px] font-black uppercase tracking-[0.5em] text-charcoal/30 font-sans shrink-0">{section.subtitle}</span>
                                            <div className="flex-1 h-px bg-charcoal/[0.07]" />
                                        </div>
                                    )}

                                    {isColumnLayout ? (
                                        /* Per-session + 6-session layout */
                                        <div className="overflow-x-auto -mx-1">
                                            <div className="min-w-[460px] px-1">
                                                {/* Column headers */}
                                                <div className="grid grid-cols-[1fr_100px_110px_80px] gap-x-4 pb-3 border-b border-black/[0.07]">
                                                    <span className="text-[9px] font-black uppercase tracking-[0.25em] text-charcoal/25 font-sans">Treatment</span>
                                                    <span className="text-[9px] font-black uppercase tracking-[0.25em] text-charcoal/25 font-sans text-right">Per Session</span>
                                                    <span className="text-[9px] font-black uppercase tracking-[0.25em] text-charcoal/25 font-sans text-right">6-Session</span>
                                                    <span className="text-[9px] font-black uppercase tracking-[0.25em] text-charcoal/25 font-sans text-right">Save</span>
                                                </div>

                                                {section.items.map((item, ri) => (
                                                    <div
                                                        key={ri}
                                                        className="grid grid-cols-[1fr_100px_110px_80px] gap-x-4 py-4 border-b border-black/[0.04] last:border-0 hover:bg-ivory/50 transition-colors duration-150 -mx-2 px-2 rounded-xl"
                                                    >
                                                        <span className="text-[13px] font-semibold text-charcoal self-center leading-snug">{item.name}</span>
                                                        <span className="text-[13px] font-bold text-charcoal font-sans self-center text-right">{item.perSession ?? '—'}</span>
                                                        <span className="text-[13px] font-bold text-charcoal font-sans self-center text-right">{item.sixSessions ?? '—'}</span>
                                                        <div className="self-center text-right">
                                                            {item.savings ? (
                                                                <span className="inline-block text-[9px] font-bold text-[#1a9d82] bg-[#f0f9f7] border border-[#1a9d82]/20 px-2 py-0.5 rounded-full whitespace-nowrap">
                                                                    {item.savings}
                                                                </span>
                                                            ) : (
                                                                <span className="text-charcoal/15">—</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        /* Simple name + price layout */
                                        <div>
                                            {section.items.map((item, ri) => (
                                                <div
                                                    key={ri}
                                                    className="flex items-baseline gap-3 py-4 border-b border-black/[0.04] last:border-0 hover:bg-ivory/50 transition-colors duration-150 -mx-2 px-2 rounded-xl"
                                                >
                                                    <span className="text-[14px] font-semibold text-charcoal shrink-0 leading-snug">{item.name}</span>
                                                    <div className="flex-1 border-b border-dotted border-charcoal/[0.12] mb-[3px]" />
                                                    <span className="text-[14px] font-bold text-charcoal font-sans shrink-0">{item.price}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {/* Trust strip */}
                        <div className="mt-10 pt-7 border-t border-black/[0.04] flex flex-wrap gap-5 items-center justify-center opacity-35">
                            {['Medical Grade Lasers', 'FDA Approved Tech', 'Hospital-Grade Safety'].map((t) => (
                                <div key={t} className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3 h-3 text-warm-gold" />
                                    <span className="text-[9px] font-black uppercase tracking-widest font-sans">{t}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default PricingSection;
