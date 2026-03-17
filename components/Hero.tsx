'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowRight, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants/services';

/* ─── Carousel slides ──────────────────────────────────────── */
const SLIDES = [
    {
        img: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800&q=95&auto=format&fit=crop&crop=faces',
        tag: 'Facial Treatment',
        color: '#C2185B',
    },
    {
        img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=95&auto=format&fit=crop&crop=faces',
        tag: 'Waxing & Skincare',
        color: '#9A7B4F',
    },
    {
        img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=95&auto=format&fit=crop&crop=faces',
        tag: 'Threading',
        color: '#7A6B9A',
    },
    {
        img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=95&auto=format&fit=crop&crop=faces',
        tag: 'Dermaplaning',
        color: '#A05030',
    },
];

/* ─── Component ────────────────────────────────────────────── */
export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const [active, setActive]     = useState(0);
    const [direction, setDirection] = useState<'left'|'right'>('left');
    const [animating, setAnimating] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval>|null>(null);

    /* Navigate */
    const goTo = useCallback((idx: number, dir: 'left'|'right') => {
        if (animating) return;
        setDirection(dir);
        setAnimating(true);
        setTimeout(() => { setActive(idx); setAnimating(false); }, 550);
    }, [animating]);

    const next = useCallback(() => goTo((active + 1) % SLIDES.length, 'left'),  [active, goTo]);
    const prev = useCallback(() => goTo((active - 1 + SLIDES.length) % SLIDES.length, 'right'), [active, goTo]);

    /* Auto-advance */
    useEffect(() => {
        intervalRef.current = setInterval(next, 4500);
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [next]);

    /* Entrance */
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 1.0 })
                .fromTo('.h-label',  { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 })
                .fromTo('.h-title',  { y: 60, autoAlpha: 0, skewY: 2 }, { y: 0, autoAlpha: 1, skewY: 0, stagger: 0.1, duration: 1.0 }, '-=0.2')
                .fromTo('.h-body',   { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, '-=0.4')
                .fromTo('.h-ctas',   { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, '-=0.5')
                .fromTo('.h-carousel', { x: 50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1.2, ease: 'expo.out' }, '-=1.2');
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const slide = SLIDES[active];
    const nextSlide = SLIDES[(active + 1) % SLIDES.length];

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative w-full min-h-[100svh] overflow-hidden flex items-center"
            style={{ background: '#FFF8F5', paddingTop: '80px' }}
        >
            {/* Subtle blush bloom — doesn't compete */}
            <div className="absolute pointer-events-none" style={{
                top: '-10%', right: '0', width: '45%', height: '60%',
                background: 'radial-gradient(ellipse, rgba(194,24,91,0.055) 0%, transparent 70%)',
                filter: 'blur(60px)',
            }} />
            <div className="absolute pointer-events-none" style={{
                bottom: '0', left: '10%', width: '35%', height: '40%',
                background: 'radial-gradient(ellipse, rgba(154,123,79,0.05) 0%, transparent 70%)',
                filter: 'blur(50px)',
            }} />

            {/* ─── Grid ─────────────────────────────────────── */}
            <div className="w-full max-w-[1320px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 min-h-[calc(100svh-80px)] flex flex-col lg:flex-row items-center gap-12 lg:gap-8 py-14 lg:py-0">

                {/* ─── LEFT TEXT ──────────────────────────── */}
                <div className="flex-1 flex flex-col justify-center order-2 lg:order-1 max-w-[520px]">

                    {/* Label pill */}
                    <div className="h-label flex items-center gap-2.5 mb-8" style={{ opacity: 0 }}>
                        <span
                            className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.55em] px-4 py-2 rounded-full font-sans"
                            style={{ background: 'rgba(194,24,91,0.07)', color: 'rgba(160,19,77,0.7)', border: '1px solid rgba(160,19,77,0.1)' }}
                        >
                            <span className="w-1 h-1 rounded-full bg-deep-rose/60 animate-pulse-soft inline-block" />
                            Edmonton · Beauty & Laser Clinic
                        </span>
                    </div>

                    {/* Headline */}
                    <div className="space-y-1 mb-7">
                        <div className="overflow-hidden">
                            <h1
                                className="h-title font-display leading-[0.95] tracking-[-0.02em]"
                                style={{ fontSize: 'clamp(2.6rem, 5vw, 5rem)', fontWeight: 800, color: '#1A0E12', textTransform: 'uppercase', opacity: 0 }}
                            >
                                Beautiful
                            </h1>
                        </div>
                        <div className="overflow-hidden">
                            <h1
                                className="h-title font-display leading-[0.95] tracking-[-0.02em]"
                                style={{
                                    fontSize: 'clamp(2.6rem, 5vw, 5rem)',
                                    fontWeight: 300, fontStyle: 'italic',
                                    background: 'linear-gradient(120deg, #A0134D, #C2185B 50%, #9A5B30)',
                                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                    opacity: 0,
                                }}
                            >
                                Skin Starts
                            </h1>
                        </div>
                        <div className="overflow-hidden">
                            <h1
                                className="h-title font-display leading-[0.95] tracking-[-0.02em]"
                                style={{ fontSize: 'clamp(2.6rem, 5vw, 5rem)', fontWeight: 800, color: '#1A0E12', textTransform: 'uppercase', opacity: 0 }}
                            >
                                Here.
                            </h1>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-body flex items-center gap-2.5 mb-5" style={{ opacity: 0 }}>
                        <div className="h-px w-8" style={{ background: 'linear-gradient(to right, #A0134D44, transparent)' }} />
                        <div className="w-1 h-1 rounded-full" style={{ background: '#A0134D55' }} />
                    </div>

                    {/* Body */}
                    <p
                        className="h-body text-[15px] leading-[1.85] mb-9 font-sans"
                        style={{ color: 'rgba(26,14,18,0.45)', maxWidth: '360px', opacity: 0 }}
                    >
                        Laser hair removal, HydraFacials, microneedling & waxing —
                        results-driven care for{' '}
                        <span style={{ color: 'rgba(26,14,18,0.72)', fontWeight: 600 }}>
                            everyone in Edmonton.
                        </span>
                    </p>

                    {/* CTAs */}
                    <div className="h-ctas flex flex-wrap items-center gap-3 mb-10" style={{ opacity: 0 }}>
                        <Link
                            href="#services"
                            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[11px] font-black uppercase tracking-[0.18em] text-white transition-all duration-300 hover:opacity-90 active:scale-95"
                            style={{ background: 'linear-gradient(135deg,#A0134D,#C2185B)', boxShadow: '0 8px 28px rgba(160,19,77,0.22)' }}
                        >
                            <span>Explore Services</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20R.D.%20Beauty!`}
                            target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[11px] font-black uppercase tracking-[0.18em] transition-all duration-300 hover:bg-black/5 active:scale-95"
                            style={{ border: '1.5px solid rgba(26,14,18,0.1)', color: 'rgba(26,14,18,0.5)' }}
                        >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Book Consult</span>
                        </a>
                    </div>

                    {/* Stars proof */}
                    <div className="h-ctas flex items-center gap-3" style={{ opacity: 0 }}>
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_,i) => (
                                <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#F59E0B">
                                    <path d="M6 0L7.35 4.18L12 4.38L8.46 6.89L9.71 11.09L6 8.71L2.29 11.09L3.54 6.89L0 4.38L4.65 4.18Z"/>
                                </svg>
                            ))}
                        </div>
                        <span className="text-[10px] font-semibold font-sans" style={{ color: 'rgba(26,14,18,0.35)' }}>
                            4.9 · Trusted by <span style={{ color: 'rgba(26,14,18,0.55)' }}>200+ clients</span>
                        </span>
                    </div>
                </div>

                {/* ─── RIGHT: CAROUSEL ────────────────────── */}
                <div className="h-carousel order-1 lg:order-2 flex-shrink-0 flex flex-col items-center gap-6" style={{ opacity: 0 }}>

                    {/* Card stack */}
                    <div className="relative" style={{ width: 'clamp(260px, 36vw, 420px)', height: 'clamp(340px, 48vw, 560px)' }}>

                        {/* ── Ghost card behind (next image) ── */}
                        <div
                            className="absolute inset-0 overflow-hidden"
                            style={{
                                borderRadius: '2rem',
                                transform: 'scale(0.93) translateY(18px)',
                                transformOrigin: 'bottom center',
                                zIndex: 1,
                                filter: 'brightness(0.75)',
                            }}
                        >
                            <img
                                src={nextSlide.img}
                                alt=""
                                className="w-full h-full object-cover"
                                style={{ transform: 'scale(1.05)' }}
                            />
                        </div>

                        {/* ── Main card (active) ── */}
                        <div
                            className="absolute inset-0 overflow-hidden"
                            style={{
                                borderRadius: '2rem',
                                zIndex: 2,
                                boxShadow: '0 24px 60px rgba(0,0,0,0.14), 0 8px 24px rgba(0,0,0,0.08)',
                                opacity: animating ? 0 : 1,
                                transform: animating
                                    ? `translateX(${direction === 'left' ? '-8%' : '8%'}) scale(0.97)`
                                    : 'translateX(0) scale(1)',
                                transition: 'opacity 0.55s cubic-bezier(0.4,0,0.2,1), transform 0.55s cubic-bezier(0.4,0,0.2,1)',
                            }}
                        >
                            <img
                                src={slide.img}
                                alt={slide.tag}
                                className="w-full h-full object-cover"
                            />

                            {/* Warm overlay */}
                            <div className="absolute inset-0" style={{
                                background: 'linear-gradient(170deg, transparent 50%, rgba(10,4,8,0.45) 100%)',
                            }} />

                            {/* Treatment tag */}
                            <div className="absolute bottom-5 left-5 flex items-center gap-2"
                                style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(14px)', borderRadius: '100px', padding: '7px 14px', border: '1px solid rgba(255,255,255,0.25)' }}>
                                <div className="w-1.5 h-1.5 rounded-full" style={{ background: slide.color }} />
                                <span className="text-[9px] font-black uppercase tracking-[0.35em] text-white/85">{slide.tag}</span>
                            </div>

                            {/* Slide counter */}
                            <div className="absolute top-4 right-4 text-[9px] font-black tabular-nums"
                                style={{ color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em' }}>
                                {String(active + 1).padStart(2,'0')} / {String(SLIDES.length).padStart(2,'0')}
                            </div>
                        </div>
                    </div>

                    {/* ── Controls ──────────────────────────── */}
                    <div className="flex items-center gap-5">

                        {/* Prev */}
                        <button
                            onClick={prev}
                            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                            style={{ border: '1.5px solid rgba(26,14,18,0.12)', color: 'rgba(26,14,18,0.45)' }}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        {/* Dots */}
                        <div className="flex items-center gap-2">
                            {SLIDES.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i, i > active ? 'left' : 'right')}
                                    className="rounded-full transition-all duration-500"
                                    style={{
                                        width: i === active ? '28px' : '7px',
                                        height: '7px',
                                        background: i === active ? slide.color : 'rgba(26,14,18,0.12)',
                                    }}
                                />
                            ))}
                        </div>

                        {/* Next */}
                        <button
                            onClick={next}
                            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                            style={{ border: '1.5px solid rgba(26,14,18,0.12)', color: 'rgba(26,14,18,0.45)' }}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                style={{ background: 'linear-gradient(to top, #FFF8F5 0%, transparent 100%)' }} />
        </section>
    );
}
