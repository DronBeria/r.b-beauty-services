'use client';

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeftRight, Sparkles, Star, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { WHATSAPP_NUMBER } from '../constants/services';

gsap.registerPlugin(ScrollTrigger);

const transformations = [
    {
        title: 'Laser Hair Removal',
        tag: 'Full Face · 6 Sessions',
        skinType: 'Fitzpatrick III–IV',
        before: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=700&q=88&auto=format&fit=crop&crop=face',
        after: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=700&q=88&auto=format&fit=crop&crop=face',
        tags: ['Laser Treatments'],
        result: 'Permanent hair-free skin',
    },
    {
        title: 'Signature HydraFacial',
        tag: 'Single Session · Instant Glow',
        skinType: 'Fitzpatrick I–II',
        before: 'https://images.unsplash.com/photo-1487412840181-b39ce5fa3ac9?w=700&q=88&auto=format&fit=crop&crop=face',
        after: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=700&q=88&auto=format&fit=crop&crop=face',
        tags: ['Facial Rituals'],
        result: 'Visibly plump, radiant skin',
    },
    {
        title: 'Dermal Rejuvenation',
        tag: 'Clinical Care · 4 Sessions',
        skinType: 'Fitzpatrick V–VI',
        before: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&q=88&auto=format&fit=crop&crop=face,top',
        after: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=700&q=88&auto=format&fit=crop&crop=face',
        tags: ['Clinical Care'],
        result: 'Even tone, renewed texture',
    },
];

// Clinic photo grid with varying sizes for a rich masonry feel
const clinicPhotos = [
    {
        src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=88&auto=format&fit=crop',
        label: 'Diode Laser Treatment',
        sub: 'Medical-Grade Technology',
        span: 'col-span-2 row-span-2',
    },
    {
        src: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=88&auto=format&fit=crop',
        label: 'Signature HydraFacial',
        sub: 'Deep Hydration',
        span: 'col-span-1 row-span-1',
    },
    {
        src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=88&auto=format&fit=crop',
        label: 'Facial Ritual',
        sub: 'Bespoke Care',
        span: 'col-span-1 row-span-1',
    },
    {
        src: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=88&auto=format&fit=crop&crop=face',
        label: 'Post-Treatment Glow',
        sub: 'Verified Client Result',
        span: 'col-span-1 row-span-2',
    },
    {
        src: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=88&auto=format&fit=crop',
        label: 'Dermaplaning',
        sub: 'Ultra-Smooth Finish',
        span: 'col-span-1 row-span-1',
    },
    {
        src: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=600&q=88&auto=format&fit=crop',
        label: 'Chemical Peel',
        sub: 'Cellular Renewal',
        span: 'col-span-1 row-span-1',
    },
];

const filters = ['All', 'Laser Treatments', 'Facial Rituals', 'Clinical Care'];

const Gallery = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeFilter, setActiveFilter] = useState('All');
    const [sliderPositions, setSliderPositions] = useState<number[]>(transformations.map(() => 50));

    const handleMouseMove = (e: React.MouseEvent | React.TouchEvent, index: number) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const pct = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 2), 98);
        setSliderPositions((prev) => prev.map((v, i) => (i === index ? pct : v)));
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.gallery-headline',
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.4, ease: 'power3.out', scrollTrigger: { trigger: '.gallery-headline', start: 'top 88%' } }
            );
            gsap.fromTo('.gallery-sub',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 0.15, scrollTrigger: { trigger: '.gallery-sub', start: 'top 90%' } }
            );
            gsap.fromTo('.gallery-card',
                { y: 50, opacity: 0, scale: 0.97 },
                { y: 0, opacity: 1, scale: 1, stagger: 0.14, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.gallery-cards-row', start: 'top 85%' } }
            );
            gsap.fromTo('.clinic-photo-item',
                { y: 40, opacity: 0, scale: 0.96 },
                { y: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: '.clinic-grid', start: 'top 88%' } }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const filtered = transformations.filter(
        (t) => activeFilter === 'All' || t.tags.includes(activeFilter)
    );

    return (
        <section id="gallery" ref={sectionRef} className="bg-[#0D0C10] relative overflow-hidden">

            {/* ── Section Header ── */}
            <div className="relative pt-24 md:pt-32 pb-16 md:pb-20 px-6 md:px-12 max-w-[1400px] mx-auto">
                {/* Decorative orbs */}
                <div className="absolute top-0 left-[-15%] w-[600px] h-[600px] bg-deep-rose/10 blur-[160px] rounded-full pointer-events-none" />
                <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-warm-gold/8 blur-[140px] rounded-full pointer-events-none" />

                <div className="relative z-10 max-w-3xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-px bg-warm-gold/50" />
                        <span className="text-[10px] font-black uppercase tracking-[0.55em] text-warm-gold font-sans">Verified Client Transformations</span>
                    </div>
                    <h2 className="gallery-headline opacity-0 font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] text-white leading-[0.88] mb-8">
                        Results In <br />
                        <span className="italic font-light text-gradient">High Definition</span>
                    </h2>
                    <p className="gallery-sub opacity-0 text-white/40 font-sans text-base md:text-lg leading-relaxed max-w-xl">
                        Drag each slider to reveal the real difference. Every transformation is photographed directly — no filters, no retouching.
                    </p>
                </div>
            </div>

            {/* ── Filter tabs ── */}
            <div className="px-6 md:px-12 max-w-[1400px] mx-auto mb-12 flex justify-start md:justify-start overflow-x-auto no-scrollbar">
                <div className="flex gap-2 p-1.5 rounded-full border border-white/8 bg-white/[0.04] backdrop-blur-xl">
                    {filters.map((f) => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={cn(
                                'whitespace-nowrap px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-400',
                                activeFilter === f
                                    ? 'bg-white text-charcoal shadow-lg'
                                    : 'text-white/40 hover:text-white/70'
                            )}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Before / After Cards ── */}
            <div className="gallery-cards-row px-6 md:px-12 max-w-[1400px] mx-auto pb-24 md:pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                    {filtered.map((item, index) => {
                        const globalIdx = transformations.indexOf(item);
                        return (
                            <div key={index} className="gallery-card opacity-0 group">
                                {/* Slider */}
                                <div
                                    className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden cursor-ew-resize select-none"
                                    style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }}
                                    onMouseMove={(e) => handleMouseMove(e, globalIdx)}
                                    onTouchMove={(e) => handleMouseMove(e, globalIdx)}
                                >
                                    {/* After (base) */}
                                    <img
                                        src={item.after}
                                        alt={`${item.title} after`}
                                        className="absolute inset-0 w-full h-full object-cover object-top"
                                    />
                                    {/* Subtle dark vignette */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                                    {/* Before (clipped) */}
                                    <div
                                        className="absolute inset-0 z-10 overflow-hidden"
                                        style={{ clipPath: `inset(0 ${100 - sliderPositions[globalIdx]}% 0 0)` }}
                                    >
                                        <img
                                            src={item.before}
                                            alt={`${item.title} before`}
                                            className="absolute inset-0 w-full h-full object-cover object-top"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                                        {/* Subtle desaturate feel */}
                                        <div className="absolute inset-0 bg-[#1a1a2e]/20" />
                                    </div>

                                    {/* Divider */}
                                    <div
                                        className="absolute inset-y-0 z-20 w-[1.5px] pointer-events-none"
                                        style={{ left: `${sliderPositions[globalIdx]}%`, background: 'rgba(255,255,255,0.8)', boxShadow: '0 0 16px rgba(255,255,255,0.4)' }}
                                    >
                                        {/* Handle */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-[0_4px_24px_rgba(0,0,0,0.4)] group-hover:scale-110 transition-transform duration-400">
                                            <ArrowLeftRight className="w-4.5 h-4.5 text-charcoal" />
                                        </div>
                                    </div>

                                    {/* Before / After pill labels */}
                                    <div className="absolute top-5 left-5 right-5 z-30 flex justify-between pointer-events-none">
                                        <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                                            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/70">Before</span>
                                        </div>
                                        <div className="px-3 py-1 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                                            style={{ background: 'rgba(160,19,77,0.5)', backdropFilter: 'blur(8px)' }}>
                                            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white">After</span>
                                        </div>
                                    </div>

                                    {/* Bottom info */}
                                    <div className="absolute bottom-0 left-0 right-0 z-30 p-6">
                                        <div className="flex items-end justify-between">
                                            <div>
                                                <h3 className="font-display text-white text-xl md:text-2xl leading-tight mb-1">{item.title}</h3>
                                                <p className="text-white/50 text-[10px] font-black uppercase tracking-widest">{item.tag}</p>
                                            </div>
                                            <div className="flex-shrink-0 bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline mr-1.5" />
                                                <span className="text-[9px] font-black text-white/70 uppercase tracking-wider">Verified</span>
                                            </div>
                                        </div>
                                        <div className="mt-3 pt-3 border-t border-white/10">
                                            <p className="text-[11px] font-semibold text-white/50 italic">{item.result} · Skin type: {item.skinType}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* "Drag to compare" hint */}
                <div className="mt-8 flex items-center justify-center gap-3 opacity-40">
                    <ArrowLeftRight className="w-3.5 h-3.5 text-white" />
                    <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white">Drag to compare · Touch works too</span>
                    <ArrowLeftRight className="w-3.5 h-3.5 text-white" />
                </div>
            </div>

            {/* ── Clinic Photo Grid ── */}
            <div className="bg-white">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-px bg-warm-gold/50" />
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-warm-gold font-sans">From Our Clinic</span>
                            </div>
                            <h3 className="font-display text-4xl md:text-5xl text-charcoal leading-[0.9]">
                                Where Science Meets <br />
                                <span className="italic font-light text-gradient">Luxury</span>
                            </h3>
                        </div>
                        <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20R.B%20Beauty!%20I'd%20like%20to%20book%20a%20consultation.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-charcoal text-white px-7 py-3.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-deep-rose transition-all duration-300 shrink-0 group"
                        >
                            <span>Book a Session</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    {/* Masonry-style photo grid */}
                    <div className="clinic-grid grid grid-cols-3 md:grid-cols-4 grid-rows-3 gap-3 md:gap-4 h-[520px] md:h-[640px]">
                        {/* Large photo — top left, spans 2×2 */}
                        <div className="clinic-photo-item opacity-0 col-span-2 row-span-2 relative rounded-[2rem] overflow-hidden group">
                            <img src={clinicPhotos[0].src} alt={clinicPhotos[0].label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute bottom-5 left-5 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                <p className="font-display text-white text-lg">{clinicPhotos[0].label}</p>
                                <p className="text-[9px] font-black uppercase tracking-widest text-white/50 mt-0.5">{clinicPhotos[0].sub}</p>
                            </div>
                        </div>

                        {/* Top-right: 2 stacked photos */}
                        <div className="clinic-photo-item opacity-0 col-span-1 md:col-span-1 row-span-1 relative rounded-[1.5rem] overflow-hidden group">
                            <img src={clinicPhotos[1].src} alt={clinicPhotos[1].label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <p className="absolute bottom-3 left-3 font-display text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">{clinicPhotos[1].label}</p>
                        </div>
                        <div className="clinic-photo-item opacity-0 hidden md:block col-span-1 row-span-1 relative rounded-[1.5rem] overflow-hidden group">
                            <img src={clinicPhotos[2].src} alt={clinicPhotos[2].label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <p className="absolute bottom-3 left-3 font-display text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">{clinicPhotos[2].label}</p>
                        </div>

                        {/* Bottom row: 3 equal photos */}
                        <div className="clinic-photo-item opacity-0 col-span-1 row-span-1 relative rounded-[1.5rem] overflow-hidden group">
                            <img src={clinicPhotos[3].src} alt={clinicPhotos[3].label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <p className="absolute bottom-3 left-3 font-display text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">{clinicPhotos[3].label}</p>
                        </div>
                        <div className="clinic-photo-item opacity-0 col-span-1 row-span-1 relative rounded-[1.5rem] overflow-hidden group">
                            <img src={clinicPhotos[4].src} alt={clinicPhotos[4].label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <p className="absolute bottom-3 left-3 font-display text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">{clinicPhotos[4].label}</p>
                        </div>
                        <div className="clinic-photo-item opacity-0 col-span-1 row-span-1 relative rounded-[1.5rem] overflow-hidden group">
                            <img src={clinicPhotos[5].src} alt={clinicPhotos[5].label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <p className="absolute bottom-3 left-3 font-display text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">{clinicPhotos[5].label}</p>
                        </div>
                    </div>
                </div>

                {/* Trust strip */}
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-16 border-t border-black/[0.05] mt-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex flex-wrap items-center gap-x-10 gap-y-4 justify-center md:justify-start">
                        {[
                            { icon: CheckCircle2, text: '300+ Verified Transformations', color: 'text-emerald-500' },
                            { icon: Star, text: '5.0 Client Rating', color: 'text-amber-500' },
                            { icon: Sparkles, text: 'No Filters · No Edits', color: 'text-deep-rose' },
                        ].map(({ icon: Icon, text, color }) => (
                            <div key={text} className="flex items-center gap-2">
                                <Icon className={cn('w-4 h-4', color)} />
                                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-charcoal/50">{text}</span>
                            </div>
                        ))}
                    </div>
                    <button className="btn-primary group shrink-0">
                        <span>Schedule Consultation</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
