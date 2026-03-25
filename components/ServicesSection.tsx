'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { SERVICES } from '../constants/services';
import { Category } from '../types';
import ServiceCard from './ServiceCard';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../lib/utils';
import { Sparkles, ArrowRight, LayoutGrid, ChevronDown } from 'lucide-react';
import { useServiceFilter } from '../store/useServiceFilter';
const SQUARE_BOOKING_URL = 'https://app.squareup.com/appointments/book/mfaodungeatf80/L15XQCCP0YC3D/start';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES: Category[] = [
    'All Services',
    'Threading',
    'Waxing',
    'Nufree Waxing',
    'Facial Treatments',
    'Laser Hair Removal',
];

const INITIAL_VISIBLE = 6;

const ServicesSection = () => {
    const { activeCategory, setActiveCategory } = useServiceFilter();
    const [showAll, setShowAll] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    const filteredServices = useMemo(() => {
        if (activeCategory === 'All Services') return SERVICES;
        return SERVICES.filter((s) => s.category === activeCategory);
    }, [activeCategory]);

    const visibleServices = useMemo(() => {
        if (showAll) return filteredServices;
        return filteredServices.slice(0, INITIAL_VISIBLE);
    }, [filteredServices, showAll]);

    // Reset showAll when category changes
    useEffect(() => {
        setShowAll(false);
    }, [activeCategory]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.services-header-reveal',
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    stagger: 0.12,
                    duration: 1.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 85%',
                    }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const cards = gridRef.current?.children;
        if (cards) {
            gsap.fromTo(Array.from(cards),
                { opacity: 0, y: 32, scale: 0.96 },
                {
                    opacity: 1, y: 0, scale: 1,
                    duration: 0.65,
                    stagger: 0.07,
                    ease: 'power2.out',
                    overwrite: true,
                    clearProps: 'all',
                }
            );
        }
    }, [visibleServices]);

    return (
        <section
            id="services"
            ref={sectionRef}
            className="section-padding bg-white relative overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
            <div className="absolute -top-[10%] -left-[5%] w-[600px] h-[600px] bg-warm-gold/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-deep-rose/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container-custom relative z-10">
                {/* Header */}
                <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
                    <div className="services-header-reveal opacity-0 translate-y-10 inline-flex items-center gap-3 mb-6">
                        <div className="w-10 h-px bg-deep-rose/30" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-deep-rose font-sans">Our Services</span>
                        <div className="w-10 h-px bg-deep-rose/30" />
                    </div>
                    <h2 className="services-header-reveal opacity-0 translate-y-10 font-display text-5xl md:text-7xl lg:text-8xl text-charcoal mb-8 leading-[0.9]">
                        Treatments <br />
                        <span className="italic font-light text-gradient">for every</span> need
                    </h2>
                    <p className="services-header-reveal opacity-0 translate-y-10 max-w-xl mx-auto text-soft-gray font-sans text-lg leading-relaxed">
                        Browse our full menu of threading, waxing, facials, and laser services. Click any card to book your appointment instantly.
                    </p>
                </div>

                {/* Category Filter */}
                <div className="mb-14">
                    <div className="flex flex-col items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 text-charcoal/40 font-sans text-[10px] font-black uppercase tracking-widest">
                            <LayoutGrid className="w-4 h-4" />
                            <span>Filter by Category</span>
                        </div>
                        <div className="flex flex-wrap justify-center bg-ivory/80 backdrop-blur-xl p-2 rounded-[2.5rem] border border-charcoal/5 shadow-premium gap-1.5 max-w-full">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={cn(
                                        'whitespace-nowrap px-5 py-3 rounded-[2rem] text-[10px] uppercase tracking-[0.2em] font-black transition-all duration-400',
                                        activeCategory === cat
                                            ? 'bg-charcoal text-white shadow-lg -translate-y-0.5'
                                            : 'text-charcoal/60 hover:text-deep-rose hover:bg-white'
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Count indicator */}
                <div className="flex items-center mb-8 px-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-charcoal/30 font-sans">
                        {filteredServices.length} {activeCategory === 'All Services' ? 'Services Available' : `${activeCategory} services`}
                    </span>
                </div>

                {/* Services Grid */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {visibleServices.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </div>

                {/* Load More */}
                {filteredServices.length > INITIAL_VISIBLE && (
                    <div className="mt-12 flex justify-center">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className={cn(
                                'flex items-center gap-3 px-10 py-4 rounded-full border font-black text-[10px] uppercase tracking-[0.3em] transition-all duration-500',
                                showAll
                                    ? 'border-charcoal/20 text-charcoal/60 hover:bg-charcoal/5'
                                    : 'border-deep-rose/30 text-deep-rose hover:bg-deep-rose hover:text-white hover:border-deep-rose shadow-sm'
                            )}
                        >
                            <span>{showAll ? 'Show Less' : `Show All ${filteredServices.length} Services`}</span>
                            <ChevronDown
                                className={cn('w-4 h-4 transition-transform duration-500', showAll && 'rotate-180')}
                            />
                        </button>
                    </div>
                )}

                {/* Bottom CTA */}
                <div className="mt-24 text-center p-14 md:p-20 glass-card border-deep-rose/10 bg-gradient-to-br from-white to-ivory relative overflow-hidden">
                    <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
                    <div className="relative z-10">
                        <Sparkles className="w-9 h-9 text-warm-gold mx-auto mb-6 animate-pulse-soft" />
                        <h3 className="font-display text-3xl md:text-4xl text-charcoal mb-4">Not sure where to start?</h3>
                        <p className="text-soft-gray font-sans text-base mb-10 max-w-lg mx-auto">
                            Our specialists will build a personalized treatment plan during a free consultation.
                        </p>
                        <a
                            href={SQUARE_BOOKING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary mx-auto group inline-flex"
                        >
                            <span>Book a Free Consultation</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
