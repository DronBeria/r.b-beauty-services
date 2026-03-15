'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { PRICING_DATA, PricingCategory } from '../constants/pricing';
import { gsap } from 'gsap';
import { cn } from '../lib/utils';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';

const PricingSection = () => {
    const [activeCategory, setActiveCategory] = useState<PricingCategory>(PRICING_DATA[0]);
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.pricing-header-reveal', {
                y: 40,
                opacity: 0,
                stagger: 0.1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (contentRef.current) {
            gsap.fromTo(contentRef.current,
                { opacity: 0, scale: 0.98, y: 10 },
                { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "power2.out" }
            );
        }
        if (imageRef.current) {
            gsap.fromTo(imageRef.current,
                { opacity: 0, scale: 1.1 },
                { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
            );
        }
    }, [activeCategory]);

    return (
        <section
            id="offers"
            ref={sectionRef}
            className="section-padding bg-[#fafafa] relative overflow-hidden"
        >
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-deep-rose-light/5 blur-[120px] rounded-full -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-warm-gold-light/5 blur-[120px] rounded-full -ml-64 -mb-64" />

            <div className="container-custom relative z-10">
                {/* Header */}
                <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
                    <div className="pricing-header-reveal inline-flex items-center gap-3 mb-6">
                        <div className="w-10 h-px bg-charcoal/20" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-charcoal/60 font-sans">Professional Price List</span>
                        <div className="w-10 h-px bg-charcoal/20" />
                    </div>
                    <h2 className="pricing-header-reveal font-display text-5xl md:text-7xl lg:text-8xl text-charcoal mb-8 leading-tight">
                        Transparent <br />
                        <span className="italic font-light text-gradient">Menu</span>
                    </h2>
                    <p className="pricing-header-reveal max-w-xl mx-auto text-soft-gray font-medium text-lg italic">
                        "Elegance is being as beautiful inside as outside." — Discover our tailored medical aesthetic rituals.
                    </p>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Navigation Sidebar */}
                    <div className="lg:col-span-4 flex flex-col gap-6 sticky top-32">
                        {/* Dynamic Category Preview */}
                        <div className="relative h-48 rounded-[2.5rem] overflow-hidden shadow-2xl group border-4 border-white">
                            <div ref={imageRef} className="absolute inset-0">
                                <img
                                    src={activeCategory.image}
                                    alt={activeCategory.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            </div>
                            <div className="absolute bottom-6 left-8 flex items-center gap-3">
                                <span className="text-3xl drop-shadow-lg">{activeCategory.icon}</span>
                                <h4 className="text-white font-display text-xl">{activeCategory.title}</h4>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5 p-3 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-sm border border-black/5">
                            {PRICING_DATA.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category)}
                                    className={cn(
                                        "flex items-center gap-4 px-6 py-4 rounded-[1.8rem] transition-all duration-300 group text-left",
                                        activeCategory.id === category.id
                                            ? "bg-charcoal text-white shadow-xl shadow-black/20 scale-[1.02]"
                                            : "text-charcoal/50 hover:bg-blush-pink hover:text-charcoal"
                                    )}
                                >
                                    <span className={cn(
                                        "text-lg group-hover:scale-125 transition-transform duration-500",
                                        activeCategory.id === category.id ? "grayscale-0" : "grayscale opacity-50"
                                    )}>{category.icon}</span>
                                    <span className={cn(
                                        "text-[12px] font-black uppercase tracking-widest",
                                        activeCategory.id === category.id ? "opacity-100" : "opacity-80"
                                    )}>
                                        {category.title}
                                    </span>
                                    {activeCategory.id === category.id && (
                                        <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Booking Prompt */}
                        <div className="p-8 bg-charcoal rounded-[2.5rem] text-white overflow-hidden relative group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-deep-rose/20 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-deep-rose/30 transition-colors" />
                            <h4 className="text-xl font-display mb-4 relative z-10">Instant Booking</h4>
                            <p className="text-white/40 text-[11px] mb-6 relative z-10 leading-relaxed font-sans uppercase tracking-widest">
                                Secure your preferred slot today. Consultations included with all first visits.
                            </p>
                            <Link
                                href="#contact"
                                className="inline-flex items-center gap-4 bg-white text-black px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-deep-rose-light hover:text-white transition-all transform hover:-translate-y-1 active:scale-95"
                            >
                                <span>Book Online</span>
                                <Calendar className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Pricing Detail Column */}
                    <div className="lg:col-span-8">
                        <div
                            ref={contentRef}
                            className="bg-white rounded-[3.5rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-black/5 min-h-[700px] relative"
                        >
                            <div className="absolute top-12 right-12 opacity-[0.03] pointer-events-none select-none">
                                <span className="text-9xl font-display uppercase tracking-tighter text-charcoal">{activeCategory.title}</span>
                            </div>

                            <div className="flex items-center justify-between mb-12 pb-8 border-b border-black/[0.03] relative z-10">
                                <div className="space-y-1">
                                    <h3 className="text-4xl font-display text-charcoal">{activeCategory.title}</h3>
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-warm-gold">Professional Clinical Standard</p>
                                </div>
                                <div className="w-16 h-16 rounded-full bg-ivory flex items-center justify-center border border-black/5">
                                    <Sparkles className="w-6 h-6 text-warm-gold" />
                                </div>
                            </div>

                            <div className="relative z-10">
                                {activeCategory.sections.map((section, idx) => (
                                    <div key={idx} className="mb-16 last:mb-0">
                                        {section.subtitle && (
                                            <div className="flex items-center gap-4 mb-8">
                                                <div className="w-8 h-px bg-charcoal/10" />
                                                <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-charcoal/30 font-sans">
                                                    {section.subtitle}
                                                </h4>
                                                <div className="flex-1 h-px bg-charcoal/10" />
                                            </div>
                                        )}

                                        <div className="overflow-x-auto overflow-y-visible">
                                            <table className="w-full text-left border-collapse">
                                                {section.columns && (
                                                    <thead>
                                                        <tr className="border-b border-black/5">
                                                            {section.columns.map((col, i) => (
                                                                <th key={i} className={cn(
                                                                    "py-6 text-[10px] font-black uppercase tracking-[0.2em] text-charcoal/50 font-sans",
                                                                    i > 0 ? "text-right" : "text-left"
                                                                )}>
                                                                    {col}
                                                                </th>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                )}
                                                <tbody className="divide-y divide-black/[0.03]">
                                                    {section.items.map((item, i) => (
                                                        <tr key={i} className="group hover:bg-ivory/30 transition-all duration-300">
                                                            <td className="py-7 pr-6 align-middle">
                                                                <div className="flex flex-col gap-1.5">
                                                                    <span className="text-[16px] font-bold text-charcoal tracking-tight group-hover:translate-x-1 transition-transform">{item.name}</span>
                                                                    {item.description && <span className="text-[11px] text-soft-gray leading-relaxed opacity-60 font-medium italic">{item.description}</span>}
                                                                </div>
                                                            </td>

                                                            {item.perSession && (
                                                                <td className="py-7 px-4 text-right align-middle">
                                                                    <span className="text-[14px] font-black text-charcoal font-sans">{item.perSession}</span>
                                                                </td>
                                                            )}
                                                            {item.sixSessions && (
                                                                <td className="py-7 px-4 text-right align-middle">
                                                                    <div className="inline-flex flex-col items-end">
                                                                        <span className="text-[14px] font-black text-black font-sans px-4 py-2 bg-charcoal/[0.03] rounded-2xl group-hover:bg-charcoal group-hover:text-white transition-all">
                                                                            {item.sixSessions}
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                            )}
                                                            {item.savings && (
                                                                <td className="py-7 pl-6 text-right align-middle">
                                                                    <span className="text-[10px] font-black uppercase text-[#1a9d82] bg-[#f0f9f7] border border-[#1a9d82]/10 px-3 py-1.5 rounded-full whitespace-nowrap shadow-sm">
                                                                        {item.savings}
                                                                    </span>
                                                                </td>
                                                            )}
                                                            {item.price && !item.perSession && (
                                                                <td className="py-7 pl-6 text-right align-middle">
                                                                    <span className="text-[16px] font-black text-charcoal font-sans group-hover:scale-110 transition-transform origin-right inline-block">{item.price}</span>
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

                            {/* Trust Footer */}
                            <div className="mt-16 pt-12 border-t border-black/[0.03] flex flex-wrap gap-8 items-center justify-center opacity-40">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-warm-gold" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Medical Grade Lasers</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-warm-gold" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">FDA Approved Technology</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-warm-gold" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Advanced Safety Protocols</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default PricingSection;
