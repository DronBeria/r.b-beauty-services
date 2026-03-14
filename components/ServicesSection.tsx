'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { SERVICES } from '../constants/services';
import { Category } from '../types';
import ServiceCard from './ServiceCard';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../lib/utils';
import { Sparkles, ArrowRight, LayoutGrid } from 'lucide-react';

const CATEGORIES: Category[] = [
    'All Services',
    'Laser Treatments',
    'Facial Treatments',
    'Skincare',
    'Waxing',
    'Add-ons',
    'Packages'
];

const ServicesSection = () => {
    const [activeCategory, setActiveCategory] = useState<Category>('All Services');
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    const filteredServices = useMemo(() => {
        if (activeCategory === 'All Services') return SERVICES;
        return SERVICES.filter((service) => service.category === activeCategory);
    }, [activeCategory]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to('.services-header-reveal', {
                y: 0,
                opacity: 1,
                stagger: 0.15,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const cards = gridRef.current?.children;
        if (cards) {
            gsap.fromTo(cards,
                { opacity: 0, y: 40, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.08,
                    ease: "power2.out",
                    overwrite: true,
                    clearProps: "all"
                }
            );
        }
    }, [activeCategory]);

    return (
        <section
            id="services"
            ref={sectionRef}
            className="section-padding bg-white relative overflow-hidden"
        >
            {/* Background Noise & Glows */}
            <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
            <div className="absolute -top-[10%] -left-[5%] w-[600px] h-[600px] bg-warm-gold/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-deep-rose/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container-custom relative z-10">
                {/* Header Container */}
                <div className="max-w-4xl mx-auto text-center mb-20 md:mb-32">
                    <div className="services-header-reveal reveal-hidden inline-flex items-center gap-3 mb-6">
                        <div className="w-10 h-px bg-deep-rose/30" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-deep-rose font-sans">Our Signature Menu</span>
                        <div className="w-10 h-px bg-deep-rose/30" />
                    </div>

                    <h2 className="services-header-reveal reveal-hidden font-display text-6xl md:text-8xl lg:text-9xl text-charcoal mb-10 leading-[0.85]">
                        Artistry In <br />
                        <span className="italic font-light text-gradient drop-shadow-sm">Clinical</span> Precision
                    </h2>

                    <p className="services-header-reveal reveal-hidden max-w-2xl mx-auto text-soft-gray font-sans text-lg md:text-xl leading-relaxed">
                        We don't just provide treatments; we curate experiences that celebrate your natural radiance.
                        Select a category below to explore our world-class offerings.
                    </p>
                </div>

                {/* Filter Controls */}
                <div className="mb-20">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                        <div className="hidden md:flex items-center gap-2 text-charcoal/40 font-sans text-[10px] font-black uppercase tracking-widest mr-4">
                            <LayoutGrid className="w-4 h-4" />
                            <span>Filter by Chapter</span>
                        </div>

                        <div className="flex bg-ivory/80 backdrop-blur-xl p-2.5 rounded-[2.5rem] border border-charcoal/5 shadow-premium overflow-x-auto max-w-full scrollbar-none gap-2">
                            {CATEGORIES.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={cn(
                                        "whitespace-nowrap px-8 py-3.5 rounded-[2rem] text-[10px] uppercase tracking-[0.2em] font-black transition-all duration-500 relative group overflow-hidden",
                                        activeCategory === category
                                            ? "bg-charcoal text-white shadow-xl translate-y-[-2px]"
                                            : "text-charcoal/60 hover:text-deep-rose hover:bg-white"
                                    )}
                                >
                                    <span className="relative z-10">{category}</span>
                                    {activeCategory === category && (
                                        <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Services Grid */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16"
                >
                    {filteredServices.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </div>

                {/* Mobile Scroll Hint */}
                <div className="md:hidden flex flex-col items-center gap-3 mt-16 text-charcoal/40 font-sans">
                    <div className="w-16 h-px bg-charcoal/10" />
                    <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.4em]">
                        <span>Swipe Categories</span>
                        <ArrowRight className="w-3 h-3 animate-float horizontal" />
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-32 text-center p-20 glass-card border-deep-rose/10 bg-gradient-to-br from-white to-ivory relative overflow-hidden group">
                    <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
                    <div className="relative z-10">
                        <Sparkles className="w-10 h-10 text-warm-gold mx-auto mb-8 animate-pulse-soft" />
                        <h3 className="font-display text-4xl md:text-5xl text-charcoal mb-6">Unsure where to begin?</h3>
                        <p className="text-soft-gray font-sans text-lg mb-12 max-w-xl mx-auto">
                            Our skin specialists are here to guide you through a private consultation
                            to find the perfect treatment journey for your goals.
                        </p>
                        <button className="btn-primary mx-auto group">
                            <span>Book A Consultation</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-4 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
