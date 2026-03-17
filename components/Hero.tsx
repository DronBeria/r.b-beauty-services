'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants/services';

/* ─── Slides — cycling index drives all 3 cards simultaneously ──────────── */
const SLIDES = [
    {
        img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=700&q=90&auto=format&fit=crop&crop=faces,top',
        tag: 'Laser Hair Removal',
    },
    {
        img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=700&q=90&auto=format&fit=crop&crop=faces,top',
        tag: 'HydraFacial',
    },
    {
        img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=700&q=90&auto=format&fit=crop&crop=top',
        tag: 'Waxing & Skincare',
    },
    {
        img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=700&q=90&auto=format&fit=crop&crop=top',
        tag: 'Dermaplaning',
    },
    {
        img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=700&q=90&auto=format&fit=crop&crop=top',
        tag: 'Threading & Brows',
    },
    {
        img: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=700&q=90&auto=format&fit=crop&crop=top',
        tag: 'Facial Treatment',
    },
];

const N = SLIDES.length;

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const [active, setActive]       = useState(0);
    const [fading, setFading]       = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    /* ── advance helper ── */
    const advance = useCallback((delta = 1) => {
        setFading(true);
        setTimeout(() => {
            setActive(cur => (cur + delta + N) % N);
            setFading(false);
        }, 600);
        if (intervalRef.current) { clearInterval(intervalRef.current); startInterval(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const startInterval = () => {
        intervalRef.current = setInterval(() => {
            setFading(true);
            setTimeout(() => { setActive(cur => (cur + 1) % N); setFading(false); }, 600);
        }, 5000);
    };

    useEffect(() => {
        startInterval();
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* ── GSAP entrance ── */
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.25 })
                .fromTo('.h-eyebrow',  { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 })
                .fromTo('.h-word',     { y: 100, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.1, duration: 1.1 }, '-=0.35')
                .fromTo('.h-rule',     { scaleX: 0, autoAlpha: 0 }, { scaleX: 1, autoAlpha: 1, duration: 0.8, transformOrigin: 'left' }, '-=0.3')
                .fromTo('.h-body',     { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, '-=0.5')
                .fromTo('.h-ctas',     { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 }, '-=0.5')
                .fromTo('.h-proof',    { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 }, '-=0.4')
                .fromTo('.h-card-a',   { x: 50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1.2, ease: 'expo.out' }, '-=1.2')
                .fromTo('.h-card-b',   { x: 70, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1.2, ease: 'expo.out' }, '-=1.0')
                .fromTo('.h-card-c',   { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, ease: 'expo.out' }, '-=0.8');
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    /* ── computed images ── */
    const imgA = SLIDES[active];
    const imgB = SLIDES[(active + 1) % N];
    const imgC = SLIDES[(active + 2) % N];

    const imgStyle = (offset = 0): React.CSSProperties => ({
        opacity:    fading ? 0 : 1,
        transform:  fading ? `scale(0.97) translateY(${offset}px)` : 'scale(1) translateY(0)',
        transition: `opacity 0.6s ease, transform 0.6s ease`,
        width: '100%', height: '100%',
        objectFit: 'cover',
        objectPosition: 'top center',
    });

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative w-full min-h-[100svh] overflow-hidden flex items-center"
            style={{ background: '#fdecd8' }}
        >
            <div className="relative z-10 w-full max-w-[1340px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 min-h-[100svh] flex flex-col lg:flex-row items-center gap-10 lg:gap-0 pt-[96px] pb-12 lg:py-0">

                {/* ══════════════════════════════════════════
                    LEFT — TEXT COLUMN
                ══════════════════════════════════════════ */}
                <div className="flex-1 flex flex-col justify-center order-2 lg:order-1 lg:pr-12 xl:pr-20 max-w-[540px]">

                    {/* Eyebrow */}
                    <div className="h-eyebrow flex items-center gap-3 mb-9" style={{ opacity: 0 }}>
                        <span className="w-5 h-px block" style={{ background: 'rgba(19,19,19,0.2)' }} />
                        <span className="font-sans text-[9.5px] font-bold uppercase tracking-[0.5em]"
                            style={{ color: 'rgba(19,19,19,0.36)' }}>
                            Edmonton · Beauty &amp; Laser Clinic
                        </span>
                    </div>

                    {/* Headline — large editorial stacked type */}
                    <div className="mb-9">
                        <div className="overflow-hidden">
                            <h1 className="h-word font-display tracking-[-0.03em]"
                                style={{
                                    fontSize: 'clamp(3.8rem, 6.8vw, 8rem)',
                                    lineHeight: 0.86,
                                    fontWeight: 300,
                                    fontStyle: 'italic',
                                    color: '#131313',
                                    opacity: 0,
                                }}>
                                Enhancing
                            </h1>
                        </div>
                        <div className="overflow-hidden">
                            <h1 className="h-word font-display tracking-[-0.03em]"
                                style={{
                                    fontSize: 'clamp(3.8rem, 6.8vw, 8rem)',
                                    lineHeight: 0.9,
                                    fontWeight: 800,
                                    color: '#131313',
                                    opacity: 0,
                                }}>
                                Beauty
                            </h1>
                        </div>
                    </div>

                    {/* Rule */}
                    <div className="h-rule h-px w-12 mb-7 origin-left" style={{ background: 'rgba(19,19,19,0.14)', opacity: 0 }} />

                    {/* Body */}
                    <p className="h-body font-sans leading-[1.9] mb-10 max-w-[360px]"
                        style={{ fontSize: '14.5px', color: 'rgba(19,19,19,0.42)', opacity: 0 }}>
                        Laser hair removal, HydraFacials, microneedling &amp; waxing —
                        expert care for{' '}
                        <span style={{ color: 'rgba(19,19,19,0.7)', fontWeight: 600 }}>every skin type.</span>
                    </p>

                    {/* CTAs */}
                    <div className="h-ctas flex flex-wrap items-center gap-3 mb-10" style={{ opacity: 0 }}>
                        <Link
                            href="#services"
                            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:opacity-80 active:scale-95"
                            style={{ background: '#131313', boxShadow: '0 8px 28px rgba(19,19,19,0.14)' }}>
                            <span>Explore Services</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20R.D.%20Beauty!`}
                            target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-black/[0.05] active:scale-95"
                            style={{ border: '1.5px solid rgba(19,19,19,0.15)', color: 'rgba(19,19,19,0.45)' }}>
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Book Consult</span>
                        </a>
                    </div>

                    {/* Social proof */}
                    <div className="h-proof flex items-center gap-4" style={{ opacity: 0 }}>
                        <div className="flex -space-x-2">
                            {['#A0134D', '#C2185B', '#9A7B4F', '#5C7A6A'].map((c, i) => (
                                <div key={i}
                                    className="w-7 h-7 rounded-full border-2 text-[7px] font-black text-white flex items-center justify-center"
                                    style={{ borderColor: '#fdecd8', background: c }}>
                                    {['S', 'E', 'J', 'P'][i]}
                                </div>
                            ))}
                        </div>
                        <span className="text-[11px] font-sans" style={{ color: 'rgba(19,19,19,0.36)' }}>
                            <strong style={{ color: 'rgba(19,19,19,0.6)', fontWeight: 700 }}>4.9 ★</strong>
                            {' '}· 200+ happy clients
                        </span>
                    </div>
                </div>

                {/* ══════════════════════════════════════════
                    RIGHT — THREE-CARD STAGGERED LAYOUT
                ══════════════════════════════════════════ */}
                <div className="order-1 lg:order-2 flex-shrink-0 flex flex-col items-center gap-7">

                    {/*
                        Desktop layout — absolute-positioned 3-card collage
                        Card A: left, taller, offset down 40px      (main)
                        Card B: right, shorter, at top               (secondary)
                        Card C: small square, centre-bottom, overlap (accent)
                    */}
                    <div
                        className="relative hidden lg:block"
                        style={{ width: '480px', height: '560px' }}
                    >
                        {/* ── Card A — left, tall ── */}
                        <div
                            className="h-card-a absolute overflow-hidden"
                            style={{
                                width: '258px', height: '380px',
                                left: 0, top: '48px',
                                borderRadius: '1.75rem',
                                zIndex: 2,
                                boxShadow: '0 28px 72px rgba(19,19,19,0.16), 0 8px 24px rgba(19,19,19,0.07)',
                                opacity: 0,
                            }}
                        >
                            <img key={`a-${active}`} src={imgA.img} alt={imgA.tag} style={imgStyle(6)} />

                            {/* Bottom cream fade */}
                            <div className="absolute bottom-0 inset-x-0 h-[30%] pointer-events-none"
                                style={{ background: 'linear-gradient(to top, rgba(253,236,216,0.7) 0%, transparent 100%)' }} />

                            {/* Treatment chip */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full"
                                style={{
                                    background: 'rgba(253,236,216,0.85)',
                                    backdropFilter: 'blur(14px)',
                                    border: '1px solid rgba(19,19,19,0.07)',
                                    whiteSpace: 'nowrap',
                                }}>
                                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#A0134D' }} />
                                <span className="text-[8.5px] font-black uppercase tracking-[0.32em]"
                                    style={{ color: 'rgba(19,19,19,0.56)' }}>
                                    {imgA.tag}
                                </span>
                            </div>
                        </div>

                        {/* ── Card B — right, medium ── */}
                        <div
                            className="h-card-b absolute overflow-hidden"
                            style={{
                                width: '200px', height: '300px',
                                right: 0, top: 0,
                                borderRadius: '1.75rem',
                                zIndex: 1,
                                boxShadow: '0 16px 48px rgba(19,19,19,0.12)',
                                opacity: 0,
                            }}
                        >
                            <img key={`b-${active}`} src={imgB.img} alt={imgB.tag} style={imgStyle(-6)} />
                        </div>

                        {/* ── Card C — small accent, bottom-centre overlap ── */}
                        <div
                            className="h-card-c absolute overflow-hidden"
                            style={{
                                width: '156px', height: '120px',
                                left: '50%', bottom: 0,
                                transform: 'translateX(-50%)',
                                borderRadius: '1.25rem',
                                zIndex: 3,
                                boxShadow: '0 8px 28px rgba(19,19,19,0.14)',
                                border: '3px solid #fdecd8',
                                opacity: 0,
                            }}
                        >
                            <img key={`c-${active}`} src={imgC.img} alt="" style={{ ...imgStyle(), objectPosition: '50% 30%' }} />
                        </div>

                        {/* ── Slide counter — top right of Card B ── */}
                        <div className="absolute top-4 right-4 z-10 text-[9px] font-bold tabular-nums"
                            style={{ color: 'rgba(19,19,19,0.3)', letterSpacing: '0.1em' }}>
                            {String(active + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(N).padStart(2, '0')}
                        </div>
                    </div>

                    {/* Mobile — single card only */}
                    <div className="lg:hidden relative overflow-hidden h-card-a"
                        style={{
                            width: 'clamp(280px, 80vw, 360px)',
                            height: 'clamp(340px, 56vw, 440px)',
                            borderRadius: '1.75rem',
                            boxShadow: '0 24px 64px rgba(19,19,19,0.14)',
                            opacity: 0,
                        }}>
                        <img key={`mob-${active}`} src={imgA.img} alt={imgA.tag} style={imgStyle()} />
                        <div className="absolute bottom-0 inset-x-0 h-[25%] pointer-events-none"
                            style={{ background: 'linear-gradient(to top, rgba(253,236,216,0.75) 0%, transparent 100%)' }} />
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full"
                            style={{ background: 'rgba(253,236,216,0.88)', backdropFilter: 'blur(14px)', border: '1px solid rgba(19,19,19,0.07)', whiteSpace: 'nowrap' }}>
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#A0134D' }} />
                            <span className="text-[8.5px] font-black uppercase tracking-[0.32em]" style={{ color: 'rgba(19,19,19,0.56)' }}>{imgA.tag}</span>
                        </div>
                    </div>

                    {/* ── Dot indicators ── */}
                    <div className="flex items-center gap-2">
                        {SLIDES.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => { if (!fading && i !== active) advance(i - active); }}
                                className="rounded-full transition-all duration-500"
                                style={{
                                    width:      i === active ? '24px' : '6px',
                                    height:     '6px',
                                    background: i === active ? '#131313' : 'rgba(19,19,19,0.15)',
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
