'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowRight, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants/services';

/* ─── Slides: portrait images + unique blob colour per slide ─ */
const SLIDES = [
    {
        img: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=700&q=95&auto=format&fit=crop&crop=top',
        tag: 'Facial Treatment',
        blob: 'radial-gradient(ellipse at 50% 40%, rgba(240,140,170,0.45) 0%, rgba(255,180,200,0.2) 55%, transparent 75%)',
    },
    {
        img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=700&q=95&auto=format&fit=crop&crop=top',
        tag: 'Waxing & Skincare',
        blob: 'radial-gradient(ellipse at 50% 40%, rgba(245,190,130,0.45) 0%, rgba(255,215,170,0.2) 55%, transparent 75%)',
    },
    {
        img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=700&q=95&auto=format&fit=crop&crop=top',
        tag: 'Threading & Brows',
        blob: 'radial-gradient(ellipse at 50% 40%, rgba(180,160,230,0.4) 0%, rgba(210,195,245,0.2) 55%, transparent 75%)',
    },
    {
        img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=700&q=95&auto=format&fit=crop&crop=top',
        tag: 'Dermaplaning',
        blob: 'radial-gradient(ellipse at 50% 40%, rgba(140,200,195,0.4) 0%, rgba(180,230,225,0.18) 55%, transparent 75%)',
    },
];

export default function Hero() {
    const sectionRef  = useRef<HTMLElement>(null);
    const blobRef     = useRef<HTMLDivElement>(null);
    const [active, setActive]         = useState(0);
    const [prev, setPrev]             = useState<number | null>(null);
    const [transitioning, setTrans]   = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const goTo = useCallback((idx: number) => {
        if (transitioning || idx === active) return;
        setPrev(active);
        setTrans(true);
        setTimeout(() => { setActive(idx); setPrev(null); setTrans(false); }, 700);
        if (intervalRef.current) { clearInterval(intervalRef.current); startInterval(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active, transitioning]);

    const startInterval = () => {
        intervalRef.current = setInterval(() => {
            setActive(cur => {
                const next = (cur + 1) % SLIDES.length;
                setPrev(cur); setTrans(true);
                setTimeout(() => { setActive(next); setPrev(null); setTrans(false); }, 700);
                return cur;
            });
        }, 4800);
    };

    useEffect(() => { startInterval(); return () => { if (intervalRef.current) clearInterval(intervalRef.current); }; }, []);

    /* GSAP entrance */
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.5 })
                .fromTo('.h-pill',    { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 })
                .fromTo('.h-line',   { y: 65, autoAlpha: 0, skewY: 2 }, { y: 0, autoAlpha: 1, skewY: 0, stagger: 0.09, duration: 1.0 }, '-=0.2')
                .fromTo('.h-sub',    { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, '-=0.4')
                .fromTo('.h-btns',   { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 }, '-=0.5')
                .fromTo('.h-proof',  { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 }, '-=0.4')
                .fromTo('.h-visual', { x: 44, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1.4, ease: 'expo.out' }, '-=1.3');
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const slide = SLIDES[active];
    const prevSlide = prev !== null ? SLIDES[prev] : null;

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative w-full min-h-[100svh] overflow-hidden flex items-center"
            /* Soft 3-stop gradient — light cream → blush → faint lavender */
            style={{ background: 'linear-gradient(130deg, #FEF6F0 0%, #FDF0F4 45%, #F6EFF8 100%)' }}
        >
            {/* ── Very faint noise grain for depth ─── */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: '160px',
            }} />

            {/* ── Content grid ────────────────────────── */}
            <div className="relative z-10 w-full max-w-[1300px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 min-h-[100svh] flex flex-col lg:flex-row items-center gap-10 lg:gap-6 pt-[90px] pb-10 lg:py-0">

                {/* ════════════════════════
                    LEFT — TEXT
                ════════════════════════ */}
                <div className="flex-1 flex flex-col justify-center order-2 lg:order-1">

                    {/* Pill */}
                    <div className="h-pill mb-8" style={{ opacity: 0 }}>
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.5em] font-sans"
                            style={{ background: 'rgba(160,19,77,0.07)', color: 'rgba(140,14,62,0.65)', border: '1px solid rgba(160,19,77,0.12)' }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-deep-rose/50 animate-pulse-soft" />
                            Edmonton · Beauty & Laser Clinic
                        </span>
                    </div>

                    {/* Headline */}
                    <div className="space-y-0 mb-8">
                        <div className="overflow-hidden">
                            <h1 className="h-line font-display uppercase tracking-[-0.025em] leading-[0.93]"
                                style={{ fontSize: 'clamp(2.8rem, 5.2vw, 5.4rem)', fontWeight: 800, color: '#1C0E14', opacity: 0 }}>
                                Beautiful
                            </h1>
                        </div>
                        <div className="overflow-hidden">
                            <h1 className="h-line font-display tracking-[-0.025em] leading-[0.93]"
                                style={{
                                    fontSize: 'clamp(2.8rem, 5.2vw, 5.4rem)',
                                    fontWeight: 300, fontStyle: 'italic',
                                    background: 'linear-gradient(125deg, #A0134D 0%, #C2185B 45%, #9A5B30 100%)',
                                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                    opacity: 0,
                                }}>
                                Skin Starts
                            </h1>
                        </div>
                        <div className="overflow-hidden">
                            <h1 className="h-line font-display uppercase tracking-[-0.025em] leading-[0.93]"
                                style={{ fontSize: 'clamp(2.8rem, 5.2vw, 5.4rem)', fontWeight: 800, color: '#1C0E14', opacity: 0 }}>
                                Here.
                            </h1>
                        </div>
                    </div>

                    {/* Thin divider */}
                    <div className="h-sub flex items-center gap-2.5 mb-5" style={{ opacity: 0 }}>
                        <div className="h-px w-8 bg-deep-rose/25" />
                        <div className="w-1 h-1 rounded-full bg-deep-rose/30" />
                        <div className="h-px w-4 bg-deep-rose/10" />
                    </div>

                    {/* Body */}
                    <p className="h-sub font-sans text-[15px] leading-[1.85] mb-10 max-w-[360px]"
                        style={{ color: 'rgba(28,14,20,0.43)', opacity: 0 }}>
                        Laser hair removal, HydraFacials, microneedling & waxing —
                        results-driven care for{' '}
                        <span style={{ color: 'rgba(28,14,20,0.7)', fontWeight: 600 }}>
                            everyone in Edmonton.
                        </span>
                    </p>

                    {/* CTAs */}
                    <div className="h-btns flex flex-wrap items-center gap-3 mb-9" style={{ opacity: 0 }}>
                        <Link href="#services"
                            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[11px] font-black uppercase tracking-[0.18em] text-white transition-all duration-300 hover:scale-105 hover:shadow-deep-rose/20 hover:shadow-xl active:scale-95"
                            style={{ background: 'linear-gradient(135deg,#A0134D,#C2185B)', boxShadow: '0 8px 24px rgba(160,19,77,0.2)' }}>
                            <span>Explore Services</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20R.D.%20Beauty!`}
                            target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[11px] font-black uppercase tracking-[0.18em] transition-all duration-300 hover:bg-black/5 active:scale-95"
                            style={{ border: '1.5px solid rgba(28,14,20,0.1)', color: 'rgba(28,14,20,0.48)' }}>
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Book Consult</span>
                        </a>
                    </div>

                    {/* Proof */}
                    <div className="h-proof flex items-center gap-3" style={{ opacity: 0 }}>
                        <div className="flex -space-x-2">
                            {['#A0134D','#C2185B','#9A7B4F','#7A3A6A'].map((c,i) => (
                                <div key={i} className="w-7 h-7 rounded-full border-2 text-[8px] font-black text-white flex items-center justify-center"
                                    style={{ borderColor:'#FEF6F0', background: c }}>
                                    {['S','E','J','P'][i]}
                                </div>
                            ))}
                        </div>
                        <span className="text-[10px] font-semibold font-sans" style={{ color:'rgba(28,14,20,0.35)' }}>
                            4.9 ★ · <span style={{ color:'rgba(28,14,20,0.55)' }}>200+ happy clients</span>
                        </span>
                    </div>
                </div>

                {/* ════════════════════════
                    RIGHT — IMAGE CAROUSEL
                ════════════════════════ */}
                <div className="h-visual order-1 lg:order-2 flex-shrink-0 flex flex-col items-center gap-5" style={{ opacity: 0 }}>

                    {/* ── Image card with floating blob ── */}
                    <div className="relative" style={{ width: 'clamp(280px, 34vw, 400px)', height: 'clamp(380px, 46vw, 540px)' }}>

                        {/* Blob — morphs colour per slide */}
                        <div
                            ref={blobRef}
                            className="absolute pointer-events-none"
                            style={{
                                inset: '-15%',
                                background: slide.blob,
                                transition: 'background 1.2s ease',
                                filter: 'blur(40px)',
                                borderRadius: '50%',
                                zIndex: 0,
                            }}
                        />

                        {/* Decorative thin ring */}
                        <div className="absolute pointer-events-none" style={{
                            inset: '-6%', borderRadius: '2.8rem',
                            border: '1px solid rgba(160,19,77,0.08)',
                            zIndex: 1,
                        }} />

                        {/* Outgoing image */}
                        {prevSlide && (
                            <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: '2.5rem', zIndex: 2 }}>
                                <img src={prevSlide.img} alt=""
                                    className="w-full h-full object-cover object-top"
                                    style={{
                                        opacity: transitioning ? 0 : 1,
                                        transform: transitioning ? 'scale(1.04) translateY(-8px)' : 'scale(1) translateY(0)',
                                        transition: 'opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)',
                                        mixBlendMode: 'multiply',
                                        filter: 'contrast(1.04) saturate(1.05)',
                                    }}
                                />
                            </div>
                        )}

                        {/* Active image */}
                        <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: '2.5rem', zIndex: 3, boxShadow: '0 24px 60px rgba(0,0,0,0.1), 0 8px 24px rgba(0,0,0,0.06)' }}>
                            <img
                                key={active}
                                src={slide.img}
                                alt={slide.tag}
                                className="w-full h-full object-cover object-top"
                                style={{
                                    opacity: transitioning ? 0 : 1,
                                    transform: transitioning ? 'scale(0.97) translateY(10px)' : 'scale(1) translateY(0)',
                                    transition: 'opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)',
                                    mixBlendMode: 'multiply',
                                    filter: 'contrast(1.04) saturate(1.05)',
                                }}
                            />

                            {/* Bottom fade so image dissolves into bg */}
                            <div className="absolute bottom-0 inset-x-0 h-[28%] pointer-events-none" style={{
                                background: 'linear-gradient(to top, rgba(254,246,240,0.9) 0%, transparent 100%)',
                            }} />

                            {/* Treatment tag chip */}
                            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full"
                                style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', whiteSpace: 'nowrap' }}>
                                <div className="w-1.5 h-1.5 rounded-full bg-deep-rose" />
                                <span className="text-[9px] font-black uppercase tracking-[0.35em] text-charcoal/65">{slide.tag}</span>
                            </div>
                        </div>

                        {/* Slide number — top right */}
                        <div className="absolute top-4 right-4 z-10 text-[9px] font-black tabular-nums"
                            style={{ color:'rgba(28,14,20,0.3)', letterSpacing:'0.08em' }}>
                            {String(active + 1).padStart(2,'0')} / {String(SLIDES.length).padStart(2,'0')}
                        </div>
                    </div>

                    {/* ── Carousel controls ── */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => goTo((active - 1 + SLIDES.length) % SLIDES.length)}
                            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                            style={{ border:'1.5px solid rgba(28,14,20,0.1)', color:'rgba(28,14,20,0.4)', background:'rgba(255,255,255,0.5)', backdropFilter:'blur(8px)' }}>
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-2">
                            {SLIDES.map((_, i) => (
                                <button key={i} onClick={() => goTo(i)} className="rounded-full transition-all duration-500" style={{
                                    width: i === active ? '26px' : '7px', height: '7px',
                                    background: i === active ? 'linear-gradient(90deg,#A0134D,#C2185B)' : 'rgba(28,14,20,0.1)',
                                }} />
                            ))}
                        </div>

                        <button
                            onClick={() => goTo((active + 1) % SLIDES.length)}
                            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                            style={{ border:'1.5px solid rgba(28,14,20,0.1)', color:'rgba(28,14,20,0.4)', background:'rgba(255,255,255,0.5)', backdropFilter:'blur(8px)' }}>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom section transition */}
            <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                style={{ background:'linear-gradient(to top, #FEF6F0 0%, transparent 100%)' }} />
        </section>
    );
}
