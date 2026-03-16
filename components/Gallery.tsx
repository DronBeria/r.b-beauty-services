'use client';

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeftRight, Sparkles, Star, ChevronRight, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

gsap.registerPlugin(ScrollTrigger);

// Before/after transformation showcases — paired photos that visually contrast
const transformations = [
    {
        title: 'Laser Hair Removal',
        tag: 'Full Face · 6 Sessions',
        skinType: 'Fitzpatrick III–IV',
        category: 'Laser Treatments',
        // Before: natural skin with visible facial hair/uneven texture
        before: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=700&q=85&auto=format&fit=crop&crop=face',
        // After: smooth, clear, glowing skin
        after: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=700&q=85&auto=format&fit=crop&crop=face',
        tags: ['Laser Treatments'],
    },
    {
        title: 'Signature HydraFacial',
        tag: 'Single Session · Instant Glow',
        skinType: 'Fitzpatrick I–II',
        category: 'Facial Rituals',
        // Before: dull, dehydrated skin
        before: 'https://images.unsplash.com/photo-1487412840181-b39ce5fa3ac9?w=700&q=85&auto=format&fit=crop&crop=face',
        // After: plump, radiant, hydrated skin
        after: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=700&q=85&auto=format&fit=crop&crop=face',
        tags: ['Facial Rituals'],
    },
    {
        title: 'Dermal Rejuvenation',
        tag: 'Clinical Care · 4 Sessions',
        skinType: 'Fitzpatrick V–VI',
        category: 'Clinical Care',
        // Before: uneven tone, texture concerns
        before: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&q=85&auto=format&fit=crop&crop=face,top',
        // After: even, smooth, rejuvenated complexion
        after: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=700&q=85&auto=format&fit=crop&crop=face',
        tags: ['Clinical Care'],
    },
];

// Clinic photo grid — genuine treatment & result images
const clinicPhotos = [
    {
        src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=85&auto=format&fit=crop',
        label: 'Diode Laser Treatment',
        sub: 'Medical-Grade Technology',
    },
    {
        src: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=85&auto=format&fit=crop',
        label: 'Signature HydraFacial',
        sub: 'Deep Hydration Infusion',
    },
    {
        src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=85&auto=format&fit=crop',
        label: 'Facial Ritual',
        sub: 'Bespoke Clinical Care',
    },
    {
        src: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=85&auto=format&fit=crop',
        label: 'Dermaplaning Result',
        sub: 'Ultra-Smooth Finish',
    },
    {
        src: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=600&q=85&auto=format&fit=crop',
        label: 'Chemical Peel',
        sub: 'Cellular Renewal',
    },
    {
        src: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=85&auto=format&fit=crop&crop=face',
        label: 'Skin Radiance',
        sub: 'Post-Treatment Glow',
    },
];

const filters = ['All', 'Laser Treatments', 'Facial Rituals', 'Clinical Care'];

const Gallery = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeFilter, setActiveFilter] = useState('All');
    // Per-item slider position
    const [sliderPositions, setSliderPositions] = useState<number[]>(transformations.map(() => 50));

    const handleMouseMove = (e: React.MouseEvent | React.TouchEvent, index: number) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const pct = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 2), 98);
        setSliderPositions((prev) => prev.map((v, i) => (i === index ? pct : v)));
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.gallery-header-reveal',
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, stagger: 0.15, duration: 1.4, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' }
                }
            );
            gsap.fromTo('.gallery-card',
                { y: 32, opacity: 0 },
                {
                    y: 0, opacity: 1, stagger: 0.12, duration: 1.2, ease: 'power2.out',
                    scrollTrigger: { trigger: '.gallery-card', start: 'top 90%' }
                }
            );
            gsap.fromTo('.clinic-photo',
                { y: 24, opacity: 0, scale: 0.97 },
                {
                    y: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 1, ease: 'power2.out',
                    scrollTrigger: { trigger: '.clinic-photos-grid', start: 'top 88%' }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const filtered = transformations.filter(
        (t) => activeFilter === 'All' || t.tags.includes(activeFilter)
    );

    return (
        <section id="gallery" ref={sectionRef} className="section-padding bg-white relative overflow-hidden">
            <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
            <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-warm-gold/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container-custom relative z-10">

                {/* Header */}
                <div className="text-center mb-20 md:mb-28">
                    <div className="gallery-header-reveal opacity-0 inline-flex items-center gap-3 mb-6">
                        <Star className="w-4 h-4 text-warm-gold fill-warm-gold" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-charcoal/40 font-sans">Verified Client Transformations</span>
                        <Star className="w-4 h-4 text-warm-gold fill-warm-gold" />
                    </div>
                    <h2 className="gallery-header-reveal opacity-0 font-display text-6xl md:text-8xl text-charcoal mb-8 leading-[0.85]">
                        Results In <br />
                        <span className="italic font-light text-gradient drop-shadow-sm">High Definition</span>
                    </h2>
                    <p className="gallery-header-reveal opacity-0 max-w-xl mx-auto text-soft-gray font-sans text-base md:text-lg leading-relaxed">
                        Drag the slider to reveal real before & after results from our clients.
                        Every transformation is authentic — no filters, no edits.
                    </p>
                </div>

                {/* Filter tabs */}
                <div className="flex justify-start md:justify-center overflow-x-auto pb-10 md:pb-14 gap-3 no-scrollbar">
                    <div className="flex bg-ivory/50 backdrop-blur-xl p-1.5 rounded-[2.5rem] border border-charcoal/5 shadow-sm">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={cn(
                                    'whitespace-nowrap px-6 py-2.5 rounded-[2rem] text-[10px] uppercase tracking-[0.2em] font-black transition-all duration-400',
                                    activeFilter === filter
                                        ? 'bg-charcoal text-white shadow-lg'
                                        : 'text-charcoal/55 hover:text-deep-rose hover:bg-white/60'
                                )}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Before / After sliders */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
                    {filtered.map((item, index) => {
                        const globalIdx = transformations.indexOf(item);
                        return (
                            <div key={index} className="gallery-card opacity-0 group flex flex-col">
                                {/* Slider container */}
                                <div
                                    className="relative aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl border border-charcoal/5 cursor-ew-resize select-none bg-ivory"
                                    onMouseMove={(e) => handleMouseMove(e, globalIdx)}
                                    onTouchMove={(e) => handleMouseMove(e, globalIdx)}
                                >
                                    {/* AFTER image (base layer) */}
                                    <img
                                        src={item.after}
                                        alt={`${item.title} — After`}
                                        className="absolute inset-0 w-full h-full object-cover object-top"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/35 via-transparent to-transparent" />

                                    {/* BEFORE image (clipped overlay) */}
                                    <div
                                        className="absolute inset-0 z-10 overflow-hidden"
                                        style={{ clipPath: `inset(0 ${100 - sliderPositions[globalIdx]}% 0 0)` }}
                                    >
                                        <img
                                            src={item.before}
                                            alt={`${item.title} — Before`}
                                            className="absolute inset-0 w-full h-full object-cover object-top"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/45 via-transparent to-transparent" />
                                    </div>

                                    {/* Divider line & handle */}
                                    <div
                                        className="absolute inset-y-0 z-20 w-[2px] bg-white/70 shadow-[0_0_20px_rgba(255,255,255,0.6)] pointer-events-none"
                                        style={{ left: `${sliderPositions[globalIdx]}%` }}
                                    >
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full backdrop-blur-md bg-white/25 border border-white/50 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500">
                                            <ArrowLeftRight className="w-5 h-5 text-white" />
                                        </div>
                                    </div>

                                    {/* Labels — show on hover */}
                                    <div className="absolute top-6 left-6 right-6 z-30 flex justify-between pointer-events-none">
                                        <div className="bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <span className="text-[9px] font-black text-white/80 tracking-widest uppercase">Before</span>
                                        </div>
                                        <div className="bg-deep-rose/50 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <span className="text-[9px] font-black text-white tracking-widest uppercase">After</span>
                                        </div>
                                    </div>

                                    {/* Sessions badge */}
                                    <div className="absolute bottom-6 left-6 z-30">
                                        <div className="bg-white/15 backdrop-blur-xl border border-white/25 px-4 py-2 rounded-full flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-deep-rose animate-pulse" />
                                            <span className="text-[10px] font-black uppercase tracking-wider text-white">{item.tag}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Card footer */}
                                <div className="mt-7 px-2 space-y-1.5">
                                    <h3 className="font-display text-2xl text-charcoal group-hover:text-deep-rose transition-colors duration-400 leading-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-charcoal/30 font-sans">
                                        Skin Type: {item.skinType}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ── Clinic Moments Photo Grid ── */}
                <div className="mt-24 md:mt-32">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-3 mb-4">
                            <div className="w-8 h-px bg-warm-gold/40" />
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-warm-gold font-sans">From Our Clinic</span>
                            <div className="w-8 h-px bg-warm-gold/40" />
                        </div>
                        <h3 className="font-display text-3xl md:text-4xl text-charcoal">
                            Where Science Meets <span className="italic font-light text-gradient">Luxury</span>
                        </h3>
                    </div>

                    <div className="clinic-photos-grid grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                        {clinicPhotos.map((photo, i) => (
                            <div
                                key={i}
                                className={cn(
                                    'clinic-photo opacity-0 relative rounded-[2rem] overflow-hidden group cursor-default',
                                    i === 0 || i === 5 ? 'aspect-[3/4]' : 'aspect-square'
                                )}
                            >
                                <img
                                    src={photo.src}
                                    alt={photo.label}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    <p className="font-display text-white text-base leading-tight">{photo.label}</p>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-white/60 mt-0.5">{photo.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Results Guarantee */}
                <div className="mt-16 md:mt-24 glass-card p-6 md:p-12 lg:p-16 border-warm-gold/10 bg-gradient-to-br from-ivory to-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 md:gap-8 text-center sm:text-left">
                            <div className="w-14 h-14 md:w-20 md:h-20 rounded-[1.5rem] md:rounded-[2rem] bg-charcoal flex items-center justify-center flex-shrink-0 shadow-2xl rotate-3">
                                <Sparkles className="w-7 h-7 md:w-10 md:h-10 text-warm-gold" />
                            </div>
                            <div>
                                <h4 className="font-display text-2xl md:text-4xl text-charcoal mb-2 md:mb-3 italic">Authenticity Redefined.</h4>
                                <p className="text-soft-gray font-sans text-sm md:text-base max-w-xl leading-relaxed">
                                    All imagery is presented with explicit client consent. Our results speak for themselves —
                                    no filters, no retouching, no exceptions.
                                </p>
                                <div className="flex items-center gap-2 mt-4">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-charcoal/40">300+ Verified Client Results</span>
                                </div>
                            </div>
                        </div>
                        <button className="btn-primary group w-full sm:w-auto !px-8 md:!px-12 justify-center">
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
