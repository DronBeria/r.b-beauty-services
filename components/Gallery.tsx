'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeftRight, Sparkles, Star, ChevronRight, CheckCircle2, Waves } from 'lucide-react';
import { cn } from '../lib/utils';

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [sliderPos, setSliderPos] = useState(50);
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = ['All', 'Laser Treatments', 'Facial Rituals', 'Clinical Care'];

    const items = [
        {
            title: "Advanced Laser Transformation",
            sessions: 6,
            skinType: "Fitzpatrick IV",
            before: "/laser-demo.png",
            after: "/hero-main.png",
            tags: ['Laser Treatments']
        },
        {
            title: "Hydra-Luminous Ritual",
            sessions: 1,
            skinType: "Fitzpatrick II",
            before: "/facial-demo.png",
            after: "/hero-main.png",
            tags: ['Facial Rituals']
        },
        {
            title: "Dermal Repair Journey",
            sessions: 4,
            skinType: "Fitzpatrick VI",
            before: "/products-demo.png",
            after: "/hero-main.png",
            tags: ['Clinical Care']
        }
    ];


    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to('.gallery-header-reveal', {
                y: 0,
                opacity: 1,
                stagger: 0.15,
                duration: 1.4,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                }
            });

            gsap.to('.gallery-card', {
                y: 0,
                opacity: 1,
                stagger: 0.15,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.gallery-card',
                    start: "top 90%",
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const clientX = 'touches' in e
            ? e.touches[0].clientX
            : (e as React.MouseEvent).clientX;

        const x = clientX - rect.left;
        const width = rect.width;
        const percentage = (x / width) * 100;
        setSliderPos(Math.min(Math.max(percentage, 0), 100));
    };

    return (
        <section id="gallery" ref={sectionRef} className="section-padding bg-white relative overflow-hidden">
            <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
            <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-warm-gold/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container-custom relative z-10">
                {/* Header Container */}
                <div className="text-center mb-24 md:mb-32">
                    <div className="gallery-header-reveal reveal-hidden inline-flex items-center gap-3 mb-6">
                        <Star className="w-4 h-4 text-warm-gold fill-warm-gold" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-charcoal/40 font-sans">The Gallery of Radiance</span>
                        <Star className="w-4 h-4 text-warm-gold fill-warm-gold" />
                    </div>

                    <h2 className="gallery-header-reveal reveal-hidden font-display text-6xl md:text-8xl text-charcoal mb-8 leading-[0.85]">
                        Results In <br />
                        <span className="italic font-light text-gradient drop-shadow-sm">High Definition</span>
                    </h2>

                    <p className="gallery-header-reveal reveal-hidden max-w-2xl mx-auto text-soft-gray font-sans text-lg md:text-xl leading-relaxed">
                        Authentic dermal transformations demonstrating the efficacy of our clinical mastership.
                        A visual testament to the power of bespoke care.
                    </p>
                </div>

                {/* Refined Filter Tabs */}
                <div className="flex justify-start md:justify-center overflow-x-auto pb-16 scrollbar-none gap-3 no-scrollbar">
                    <div className="flex bg-ivory/50 backdrop-blur-xl p-2 rounded-[2.5rem] border border-charcoal/5 shadow-premium">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={cn(
                                    "whitespace-nowrap px-8 py-3 rounded-[2rem] text-[10px] uppercase tracking-[0.2em] font-black transition-all duration-500",
                                    activeFilter === filter
                                        ? "bg-charcoal text-white shadow-xl"
                                        : "text-charcoal/60 hover:text-deep-rose hover:bg-white/50"
                                )}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Masonry-style Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                    {items.filter(item => activeFilter === 'All' || item.tags.includes(activeFilter)).map((item, index) => (
                        <div key={index} className="gallery-card reveal-hidden group flex flex-col">
                            {/* Comparison Diagnostic Slider */}
                            <div
                                className="relative aspect-[3/4] rounded-[3.5rem] overflow-hidden shadow-2xl border border-charcoal/5 cursor-ew-resize select-none bg-ivory"
                                onMouseMove={handleMouseMove}
                                onTouchMove={handleMouseMove}
                            >
                                {/* After State (Base) */}
                                <Image src={item.after} alt="After" fill className="object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-60" />

                                {/* Before State (Layered) */}
                                <div
                                    className="absolute inset-0 z-10 overflow-hidden"
                                    style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                                >
                                    <Image src={item.before} alt="Before" fill className="object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-40" />
                                </div>

                                {/* Precision Divider Line */}
                                <div
                                    className="absolute inset-y-0 z-20 w-[2px] bg-white/50 shadow-[0_0_30px_rgba(255,255,255,0.8)] pointer-events-none"
                                    style={{ left: `${sliderPos}%` }}
                                >
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full backdrop-blur-md bg-white/20 border border-white/40 flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:scale-110">
                                        <ArrowLeftRight className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap glass-card py-2 px-4 border-white/40">
                                        <span className="text-[8px] font-black tracking-[0.4em] text-white uppercase">Compare Reveal</span>
                                    </div>
                                </div>

                                {/* Technical Specifications */}
                                <div className="absolute top-8 left-8 right-8 z-30 flex justify-between items-start pointer-events-none">
                                    <div className="glass-card !bg-charcoal/30 !backdrop-blur-md border-white/10 px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                        <span className="text-[9px] font-black text-white/60 tracking-widest uppercase">Before Treatment</span>
                                    </div>
                                    <div className="glass-card !bg-deep-rose/30 !backdrop-blur-md border-white/10 px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                        <span className="text-[9px] font-black text-white tracking-widest uppercase">Post Result</span>
                                    </div>
                                </div>

                                {/* Results Metadata */}
                                <div className="absolute bottom-8 left-8 z-30 flex flex-col gap-3">
                                    <div className="glass-card !rounded-2xl border-white/20 px-5 py-2.5 flex items-center gap-3 backdrop-blur-xl">
                                        <div className="w-2 h-2 rounded-full bg-deep-rose animate-pulse" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white">{item.sessions} Sessions</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 px-6 space-y-3">
                                <h3 className="font-display text-3xl text-charcoal group-hover:text-deep-rose transition-colors duration-500 leading-tight">
                                    {item.title}
                                </h3>
                                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-charcoal/30">
                                    <Waves className="w-3 h-3 text-warm-gold" />
                                    <span>Classification: {item.skinType}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Results Guarantee Section */}
                <div className="mt-32 glass-card p-12 md:p-16 border-warm-gold/10 bg-gradient-to-br from-ivory to-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="flex items-center gap-8 text-center md:text-left">
                            <div className="w-20 h-20 rounded-[2rem] bg-charcoal flex items-center justify-center flex-shrink-0 shadow-2xl rotate-3">
                                <Sparkles className="w-10 h-10 text-warm-gold" />
                            </div>
                            <div>
                                <h4 className="font-display text-4xl text-charcoal mb-3 italic">Authenticity Redefined.</h4>
                                <p className="text-soft-gray font-sans text-base max-w-xl leading-relaxed">
                                    All clinical imagery is presented with explicit consent. Our commitment to
                                    transparency is as profound as our dedication to your skin's health.
                                </p>
                            </div>
                        </div>
                        <button className="btn-primary group !px-12">
                            <span>Schedule Consultation</span>
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
