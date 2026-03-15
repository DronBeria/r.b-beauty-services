'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PRICING_DATA, PricingCategory } from '../constants/pricing';
import { gsap } from 'gsap';
import { cn } from '../lib/utils';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';

const PricingSection = () => {
    const [activeCategory, setActiveCategory] = useState<PricingCategory>(PRICING_DATA[0]);
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

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
                { opacity: 0, x: 20 },
                { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
            );
        }
    }, [activeCategory]);

    return (
        <section
            id="offers"
            ref={sectionRef}
            className="section-padding bg-[#fafafa] relative overflow-hidden"
        >
            <div className="container-custom relative z-10">
                {/* Header */}
                <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
                    <div className="pricing-header-reveal inline-flex items-center gap-3 mb-6">
                        <div className="w-10 h-px bg-charcoal/20" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-charcoal/60 font-sans">Full Service Menu</span>
                        <div className="w-10 h-px bg-charcoal/20" />
                    </div>
                    <h2 className="pricing-header-reveal font-display text-5xl md:text-7xl lg:text-8xl text-charcoal mb-8 leading-tight">
                        Transparent <br />
                        <span className="italic font-light text-gradient">Self-Care</span>
                    </h2>
                    <p className="pricing-header-reveal max-w-xl mx-auto text-soft-gray font-medium text-lg">
                        Explore our comprehensive menu of clinical aesthetic services, tailored to your unique beauty journey.
                    </p>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Navigation Sidebar */}
                    <div className="lg:col-span-4 flex flex-col gap-2">
                        <div className="flex flex-col gap-1.5 p-2 bg-white rounded-[2.5rem] shadow-sm border border-black/5">
                            {PRICING_DATA.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category)}
                                    className={cn(
                                        "flex items-center gap-4 px-6 py-4 rounded-[1.8rem] transition-all duration-300 group text-left",
                                        activeCategory.id === category.id
                                            ? "bg-charcoal text-white shadow-lg shadow-black/10 scale-[1.02]"
                                            : "text-charcoal/60 hover:bg-ivory hover:text-charcoal"
                                    )}
                                >
                                    <span className="text-xl group-hover:scale-110 transition-transform">{category.icon}</span>
                                    <span className={cn(
                                        "text-[13px] font-bold tracking-tight",
                                        activeCategory.id === category.id ? "opacity-100" : "opacity-80"
                                    )}>
                                        {category.title}
                                    </span>
                                    {activeCategory.id === category.id && (
                                        <ArrowRight className="w-4 h-4 ml-auto opacity-50" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Booking Prompt */}
                        <div className="mt-6 p-8 bg-black rounded-[2.5rem] text-white overflow-hidden relative group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/10 transition-colors" />
                            <h4 className="text-xl font-display mb-4 relative z-10">Start Your Journey</h4>
                            <p className="text-white/60 text-sm mb-6 relative z-10 leading-relaxed font-sans"> Book a professional assessment to find the best treatment for your skin type.</p>
                            <button className="flex items-center gap-3 text-sm font-bold group/btn relative z-10">
                                <span className="underline decoration-white/20 underline-offset-8 group-hover/btn:decoration-white transition-all">Book Online</span>
                                <Calendar className="w-4 h-4 animate-pulse-soft" />
                            </button>
                        </div>
                    </div>

                    {/* Pricing Detail Column */}
                    <div className="lg:col-span-8">
                        <div
                            ref={contentRef}
                            className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-black/5 min-h-[600px]"
                        >
                            <div className="flex items-center justify-between mb-10 pb-6 border-b border-black/5">
                                <div className="flex items-center gap-4">
                                    <div className="text-3xl">{activeCategory.icon}</div>
                                    <h3 className="text-3xl font-display text-charcoal">{activeCategory.title}</h3>
                                </div>
                                <Sparkles className="w-6 h-6 text-warm-gold opacity-30" />
                            </div>

                            {activeCategory.sections.map((section, idx) => (
                                <div key={idx} className="mb-12 last:mb-0">
                                    {section.subtitle && (
                                        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-charcoal/40 mb-6 font-sans">
                                            {section.subtitle}
                                        </h4>
                                    )}

                                    {/* Responsive Table/List */}
                                    <div className="overflow-x-auto overflow-y-visible">
                                        <table className="w-full text-left border-collapse">
                                            {section.columns && (
                                                <thead>
                                                    <tr className="border-b border-black/5">
                                                        {section.columns.map((col, i) => (
                                                            <th key={i} className={cn(
                                                                "py-4 text-[11px] font-black uppercase tracking-wider text-charcoal/60 h-[50px] font-sans",
                                                                i > 0 ? "text-right" : "text-left"
                                                            )}>
                                                                {col}
                                                            </th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                            )}
                                            <tbody>
                                                {section.items.map((item, i) => (
                                                    <tr key={i} className="group border-b border-black/[0.03] last:border-0 hover:bg-[#fafafa] transition-colors">
                                                        <td className="py-5 pr-4 align-middle">
                                                            <div className="flex flex-col">
                                                                <span className="text-[15px] font-bold text-charcoal tracking-tight group-hover:text-black transition-colors">{item.name}</span>
                                                                {item.description && <span className="text-xs text-soft-gray mt-1 leading-relaxed opacity-70">{item.description}</span>}
                                                            </div>
                                                        </td>

                                                        {item.perSession && (
                                                            <td className="py-5 px-4 text-right align-middle">
                                                                <span className="text-[14px] font-bold text-charcoal font-sans">{item.perSession}</span>
                                                            </td>
                                                        )}
                                                        {item.sixSessions && (
                                                            <td className="py-5 px-4 text-right align-middle">
                                                                <span className="text-[14px] font-black text-black font-sans px-3 py-1 bg-ivory rounded-full group-hover:bg-charcoal group-hover:text-white transition-all cursor-default">
                                                                    {item.sixSessions}
                                                                </span>
                                                            </td>
                                                        )}
                                                        {item.savings && (
                                                            <td className="py-5 pl-4 text-right align-middle">
                                                                <div className="flex flex-col items-end">
                                                                    <span className="text-[11px] font-black uppercase text-[#1a9d82] bg-[#e6f4f1] px-2.5 py-1 rounded-full whitespace-nowrap">
                                                                        {item.savings}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                        )}
                                                        {item.price && !item.perSession && (
                                                            <td className="py-5 pl-4 text-right align-middle">
                                                                <span className="text-[15px] font-black text-charcoal font-sans">{item.price}</span>
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
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
