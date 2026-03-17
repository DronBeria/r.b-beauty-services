'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowRight, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants/services';

/* ─── Slides ────────────────────────────────────────────────────────────── */
const SLIDES = [
    {
        img: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800&q=95&auto=format&fit=crop&crop=top',
        tag: 'Facial Treatment',
    },
    {
        img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=95&auto=format&fit=crop&crop=top',
        tag: 'Waxing & Skincare',
    },
    {
        img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=95&auto=format&fit=crop&crop=top',
        tag: 'Threading & Brows',
    },
    {
        img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=95&auto=format&fit=crop&crop=top',
        tag: 'Dermaplaning',
    },
];

export default function Hero() {
    const sectionRef  = useRef<HTMLElement>(null);
    const [active, setActive]           = useState(0);
    const [prev, setPrev]               = useState<number | null>(null);
    const [transitioning, setTrans]     = useState(false);
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

    useEffect(() => {
        startInterval();
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* ── GSAP entrance ── */
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.3 })
                .fromTo('.h-tag',   { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 })
                .fromTo('.h-word',  { y: 90, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.13, duration: 1.15 }, '-=0.3')
                .fromTo('.h-body',  { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, '-=0.5')
                .fromTo('.h-ctas',  { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 }, '-=0.5')
                .fromTo('.h-proof', { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 }, '-=0.4')
                .fromTo('.h-img',   { x: 60, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1.3, ease: 'expo.out' }, '-=1.2');
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const slide     = SLIDES[active];
    const prevSlide = prev !== null ? SLIDES[prev] : null;

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative w-full min-h-[100svh] overflow-hidden flex items-center"
            style={{ background: '#fdecd8' }}
        >
            {/* ── Content grid ── */}
            <div className="relative z-10 w-full max-w-[1340px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 min-h-[100svh] flex flex-col lg:flex-row items-center gap-12 lg:gap-0 pt-[100px] pb-12 lg:py-0">

                {/* ══════════════════════════════════
                    LEFT — TEXT
                ══════════════════════════════════ */}
                <div className="flex-1 flex flex-col justify-center order-2 lg:order-1 lg:pr-16 xl:pr-24">

                    {/* Location label */}
                    <div className="h-tag flex items-center gap-3 mb-10" style={{ opacity: 0 }}>
                        <div className="w-6 h-px" style={{ background: 'rgba(19,19,19,0.22)' }} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.45em] font-sans"
                            style={{ color: 'rgba(19,19,19,0.38)' }}>
                            Edmonton · Beauty & Laser Clinic
                        </span>
                    </div>

                    {/* Giant headline — Beauteza-style stacked editorial type */}
                    <div className="mb-10 space-y-0">
                        <div className="overflow-hidden">
                            <h1 className="h-word font-display leading-[0.88] tracking-[-0.025em]"
                                style={{
                                    fontSize: 'clamp(3.4rem, 6vw, 7rem)',
                                    fontWeight: 300,
                                    fontStyle: 'italic',
                                    color: '#131313',
                                    opacity: 0,
                                }}>
                                Enhancing
                            </h1>
                        </div>
                        <div className="overflow-hidden">
                            <h1 className="h-word font-display leading-[0.88] tracking-[-0.025em]"
                                style={{
                                    fontSize: 'clamp(3.4rem, 6vw, 7rem)',
                                    fontWeight: 800,
                                    color: '#131313',
                                    opacity: 0,
                                }}>
                                Your Beauty
                            </h1>
                        </div>
                    </div>

                    {/* Body */}
                    <p className="h-body font-sans text-[15px] leading-[1.9] mb-10 max-w-[380px]"
                        style={{ color: 'rgba(19,19,19,0.42)', opacity: 0 }}>
                        Laser hair removal, HydraFacials, microneedling &amp; waxing —
                        expert, results-driven care for{' '}
                        <span style={{ color: 'rgba(19,19,19,0.7)', fontWeight: 600 }}>
                            every skin type in Edmonton.
                        </span>
                    </p>

                    {/* CTAs */}
                    <div className="h-ctas flex flex-wrap items-center gap-3 mb-11" style={{ opacity: 0 }}>
                        <Link
                            href="#services"
                            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:opacity-85 hover:scale-[1.02] active:scale-95"
                            style={{ background: '#131313', boxShadow: '0 8px 28px rgba(19,19,19,0.16)' }}>
                            <span>Explore Services</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20R.D.%20Beauty!`}
                            target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-black/[0.04] active:scale-95"
                            style={{ border: '1.5px solid rgba(19,19,19,0.16)', color: 'rgba(19,19,19,0.48)' }}>
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Book Consult</span>
                        </a>
                    </div>

                    {/* Social proof */}
                    <div className="h-proof flex items-center gap-4" style={{ opacity: 0 }}>
                        <div className="flex -space-x-2.5">
                            {['#A0134D', '#C2185B', '#9A7B4F', '#5C7A6A'].map((c, i) => (
                                <div
                                    key={i}
                                    className="w-8 h-8 rounded-full border-2 text-[8px] font-black text-white flex items-center justify-center"
                                    style={{ borderColor: '#fdecd8', background: c }}>
                                    {['S', 'E', 'J', 'P'][i]}
                                </div>
                            ))}
                        </div>
                        <div className="h-px w-4" style={{ background: 'rgba(19,19,19,0.1)' }} />
                        <span className="text-[11px] font-sans" style={{ color: 'rgba(19,19,19,0.36)' }}>
                            <strong style={{ color: 'rgba(19,19,19,0.62)', fontWeight: 700 }}>4.9 ★</strong>
                            {' '}· 200+ happy clients
                        </span>
                    </div>
                </div>

                {/* ══════════════════════════════════
                    RIGHT — IMAGE CAROUSEL
                ══════════════════════════════════ */}
                <div className="h-img order-1 lg:order-2 flex-shrink-0 flex flex-col items-center gap-6"
                    style={{ opacity: 0 }}>

                    {/* Card */}
                    <div className="relative"
                        style={{ width: 'clamp(290px, 36vw, 460px)', height: 'clamp(390px, 50vw, 620px)' }}>

                        {/* Outgoing image */}
                        {prevSlide && (
                            <div className="absolute inset-0 overflow-hidden"
                                style={{ borderRadius: '2rem', zIndex: 1 }}>
                                <img
                                    src={prevSlide.img}
                                    alt=""
                                    className="w-full h-full object-cover object-top"
                                    style={{
                                        opacity:    transitioning ? 0 : 1,
                                        transform:  transitioning ? 'scale(1.04)' : 'scale(1)',
                                        transition: 'opacity 0.7s ease, transform 0.7s ease',
                                    }}
                                />
                            </div>
                        )}

                        {/* Active image */}
                        <div className="absolute inset-0 overflow-hidden"
                            style={{
                                borderRadius: '2rem',
                                zIndex: 2,
                                boxShadow: '0 32px 80px rgba(19,19,19,0.14), 0 8px 24px rgba(19,19,19,0.07)',
                            }}>
                            <img
                                key={active}
                                src={slide.img}
                                alt={slide.tag}
                                className="w-full h-full object-cover object-top"
                                style={{
                                    opacity:    transitioning ? 0 : 1,
                                    transform:  transitioning ? 'scale(0.97)' : 'scale(1)',
                                    transition: 'opacity 0.7s ease, transform 0.7s ease',
                                }}
                            />

                            {/* Bottom fade — dissolves photo into cream bg */}
                            <div className="absolute bottom-0 inset-x-0 h-[22%] pointer-events-none"
                                style={{ background: 'linear-gradient(to top, rgba(253,236,216,0.85) 0%, transparent 100%)' }} />

                            {/* Treatment chip */}
                            <div
                                className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5 rounded-full"
                                style={{
                                    background: 'rgba(253,236,216,0.88)',
                                    backdropFilter: 'blur(16px)',
                                    border: '1px solid rgba(19,19,19,0.07)',
                                    boxShadow: '0 4px 16px rgba(19,19,19,0.06)',
                                    whiteSpace: 'nowrap',
                                }}>
                                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#A0134D' }} />
                                <span className="text-[9px] font-black uppercase tracking-[0.35em]"
                                    style={{ color: 'rgba(19,19,19,0.58)' }}>
                                    {slide.tag}
                                </span>
                            </div>

                            {/* Slide counter */}
                            <div className="absolute top-5 right-5 text-[9px] font-bold tabular-nums"
                                style={{ color: 'rgba(253,236,216,0.6)', letterSpacing: '0.12em' }}>
                                {String(active + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
                            </div>
                        </div>

                        {/* ── Floating badge — clients (left) ── */}
                        <div
                            className="absolute -left-10 top-[20%] z-10 px-5 py-3.5 rounded-2xl"
                            style={{
                                background: '#fff',
                                boxShadow: '0 8px 32px rgba(19,19,19,0.1)',
                                border: '1px solid rgba(19,19,19,0.05)',
                            }}>
                            <div className="text-[22px] font-black font-display leading-none"
                                style={{ color: '#131313' }}>
                                200<span style={{ color: '#A0134D' }}>+</span>
                            </div>
                            <div className="text-[9px] font-bold uppercase tracking-[0.22em] mt-1"
                                style={{ color: 'rgba(19,19,19,0.36)' }}>
                                Happy Clients
                            </div>
                        </div>

                        {/* ── Floating badge — rating (right) ── */}
                        <div
                            className="absolute -right-8 bottom-[25%] z-10 px-5 py-3.5 rounded-2xl"
                            style={{
                                background: '#131313',
                                boxShadow: '0 8px 32px rgba(19,19,19,0.22)',
                            }}>
                            <div className="text-[22px] font-black font-display leading-none text-white">
                                4.9<span style={{ color: '#C2185B' }}>★</span>
                            </div>
                            <div className="text-[9px] font-bold uppercase tracking-[0.22em] mt-1"
                                style={{ color: 'rgba(255,255,255,0.36)' }}>
                                Star Rating
                            </div>
                        </div>
                    </div>

                    {/* ── Carousel controls ── */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => goTo((active - 1 + SLIDES.length) % SLIDES.length)}
                            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                            style={{
                                border: '1.5px solid rgba(19,19,19,0.14)',
                                color: 'rgba(19,19,19,0.44)',
                                background: 'rgba(255,255,255,0.55)',
                                backdropFilter: 'blur(8px)',
                            }}>
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-2">
                            {SLIDES.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i)}
                                    className="rounded-full transition-all duration-500"
                                    style={{
                                        width:      i === active ? '26px' : '7px',
                                        height:     '7px',
                                        background: i === active ? '#131313' : 'rgba(19,19,19,0.14)',
                                    }}
                                />
                            ))}
                        </div>

                        <button
                            onClick={() => goTo((active + 1) % SLIDES.length)}
                            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                            style={{
                                border: '1.5px solid rgba(19,19,19,0.14)',
                                color: 'rgba(19,19,19,0.44)',
                                background: 'rgba(255,255,255,0.55)',
                                backdropFilter: 'blur(8px)',
                            }}>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
