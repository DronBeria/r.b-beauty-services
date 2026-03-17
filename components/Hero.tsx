'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowRight, MessageCircle, Star } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants/services';

/* Images that are guaranteed beautiful + load fast */
const SLIDES = [
    { img: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=1100&q=95&auto=format&fit=crop&crop=faces', label: 'Facial Treatment'   },
    { img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1100&q=95&auto=format&fit=crop&crop=faces', label: 'Waxing & Skincare'  },
    { img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1100&q=95&auto=format&fit=crop&crop=faces', label: 'Threading'          },
    { img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1100&q=95&auto=format&fit=crop&crop=faces', label: 'Dermaplaning'       },
];

const Hero = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [active, setActive]   = useState(0);
    const [leaving, setLeaving] = useState<number | null>(null);
    const [running, setRunning] = useState(false);

    /* Auto advance */
    useEffect(() => {
        const id = setInterval(() => {
            setActive(prev => {
                const next = (prev + 1) % SLIDES.length;
                setLeaving(prev);
                setRunning(true);
                setTimeout(() => { setLeaving(null); setRunning(false); }, 1200);
                return next;
            });
        }, 5500);
        return () => clearInterval(id);
    }, []);

    /* Entrance animations */
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 1.1 })
                .fromTo('.h-tag',   { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 })
                .fromTo('.h-h1',    { y: 70, autoAlpha: 0, skewY: 3 }, { y: 0, autoAlpha: 1, skewY: 0, stagger: 0.09, duration: 1 }, '-=0.2')
                .fromTo('.h-body',  { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, '-=0.4')
                .fromTo('.h-btns',  { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, '-=0.5')
                .fromTo('.h-proof', { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 }, '-=0.4')
                .fromTo('.h-img',   { x: 40, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1.4, ease: 'expo.out' }, '-=1.6');
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative w-full min-h-[100svh] overflow-hidden"
            style={{ background: '#FAF7F4' }}
        >
            {/* ── Very subtle warm blush bloom — top right only ── */}
            <div className="absolute pointer-events-none" style={{
                top: '-20%', right: '-10%', width: '60%', height: '70%',
                background: 'radial-gradient(ellipse, rgba(200,80,120,0.07) 0%, rgba(200,80,120,0.02) 50%, transparent 72%)',
                filter: 'blur(80px)',
            }} />

            {/* ── Layout ──────────────────────────────────────── */}
            <div className="flex min-h-[100svh] pt-[80px]">

                {/* LEFT — text */}
                <div className="flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-20 xl:px-28 py-16 lg:py-0 w-full lg:w-[48%] xl:w-[45%] flex-shrink-0 relative z-10">

                    {/* Stars + tag */}
                    <div className="h-tag flex items-center gap-2.5 mb-9" style={{ opacity: 0 }}>
                        <div className="flex gap-[2px]">
                            {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400 stroke-amber-400" />)}
                        </div>
                        <span className="text-[9.5px] font-black uppercase tracking-[0.5em] text-charcoal/40 font-sans">
                            Edmonton's Beauty & Laser Clinic
                        </span>
                    </div>

                    {/* Headline */}
                    <div className="mb-7 space-y-0">
                        {[
                            { t: 'Advanced',      g: false },
                            { t: 'Beauty',        g: true  },
                            { t: '& Laser Care',  g: false },
                        ].map((l, i) => (
                            <div key={i} className="overflow-hidden">
                                <h1
                                    className="h-h1 font-display leading-[0.95] tracking-[-0.025em]"
                                    style={{
                                        fontSize: 'clamp(2.8rem, 5.5vw, 5.8rem)',
                                        opacity: 0,
                                        ...(l.g ? {
                                            background: 'linear-gradient(125deg, #A0134D 0%, #C2185B 45%, #9A5B30 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            fontWeight: 300,
                                            fontStyle: 'italic',
                                        } : {
                                            color: '#0F0E12',
                                            fontWeight: 800,
                                            textTransform: 'uppercase' as const,
                                        }),
                                    }}
                                >
                                    {l.t}
                                </h1>
                            </div>
                        ))}
                    </div>

                    {/* Thin rose rule */}
                    <div className="h-body flex items-center gap-3 mb-6" style={{ opacity: 0 }}>
                        <div className="h-px w-10 bg-deep-rose/30" />
                        <div className="w-1 h-1 rounded-full bg-deep-rose/40" />
                        <div className="h-px w-5 bg-deep-rose/15" />
                    </div>

                    {/* Body */}
                    <p className="h-body text-charcoal/45 text-[15px] md:text-[15.5px] leading-[1.85] max-w-[350px] mb-9 font-sans" style={{ opacity: 0 }}>
                        Laser hair removal, facials, microneedling and waxing —
                        personalized for{' '}
                        <span className="text-charcoal/75 font-semibold">
                            men and women in Edmonton.
                        </span>
                    </p>

                    {/* CTAs */}
                    <div className="h-btns flex flex-wrap items-center gap-3 mb-10" style={{ opacity: 0 }}>
                        <Link
                            href="#services"
                            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-[11.5px] font-black uppercase tracking-[0.18em] text-white transition-all duration-300 active:scale-95 hover:shadow-xl hover:shadow-deep-rose/20"
                            style={{ background: 'linear-gradient(135deg, #A0134D 0%, #C2185B 100%)' }}
                        >
                            <span>Explore Services</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20R.D.%20Beauty!%20I'd%20like%20to%20book.`}
                            target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-[11.5px] font-black uppercase tracking-[0.18em] text-charcoal/60 border border-charcoal/12 hover:border-charcoal/25 hover:text-charcoal/80 transition-all duration-300 active:scale-95"
                        >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Book Consult</span>
                        </a>
                    </div>

                    {/* Proof strip */}
                    <div className="h-proof flex items-center gap-4" style={{ opacity: 0 }}>
                        <div className="flex -space-x-2">
                            {['#A0134D','#C2185B','#9A7B4F','#7A3A6A'].map((c, i) => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#FAF7F4] flex items-center justify-center text-[9px] font-black text-white" style={{ background: c }}>
                                    {['S','E','J','P'][i]}
                                </div>
                            ))}
                        </div>
                        <div className="h-8 w-px bg-charcoal/10" />
                        <div>
                            <p className="text-[10px] font-black text-charcoal/35 uppercase tracking-[0.3em]">
                                4.9 ★ · 200+ clients
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT — image, bleeds to top + right + bottom edges */}
                <div className="h-img hidden lg:block flex-1 relative" style={{ opacity: 0 }}>

                    {/* Image stack */}
                    <div className="absolute inset-0">

                        {/* Leaving image */}
                        {leaving !== null && (
                            <img
                                key={`l-${leaving}`}
                                src={SLIDES[leaving].img}
                                alt={SLIDES[leaving].label}
                                className="absolute inset-0 w-full h-full object-cover object-center"
                                style={{
                                    opacity: running ? 0 : 1,
                                    transform: running ? 'scale(1.04)' : 'scale(1)',
                                    transition: 'opacity 1.2s cubic-bezier(0.4,0,0.2,1), transform 1.2s cubic-bezier(0.4,0,0.2,1)',
                                    zIndex: 1,
                                }}
                            />
                        )}

                        {/* Active image — subtle Ken Burns */}
                        <img
                            key={`a-${active}`}
                            src={SLIDES[active].img}
                            alt={SLIDES[active].label}
                            className="absolute inset-0 w-full h-full object-cover object-center"
                            style={{
                                opacity: running ? 0 : 1,
                                transform: running ? 'scale(0.97)' : 'scale(1)',
                                transition: 'opacity 1.2s cubic-bezier(0.4,0,0.2,1), transform 1.2s cubic-bezier(0.4,0,0.2,1)',
                                animation: !running ? 'heroKB 5.5s ease-in-out forwards' : 'none',
                                zIndex: 2,
                            }}
                        />

                        {/* Warm color grade */}
                        <div className="absolute inset-0 pointer-events-none" style={{
                            zIndex: 3,
                            background: 'linear-gradient(160deg, rgba(160,19,77,0.06) 0%, transparent 45%)',
                        }} />

                        {/* Left blend → page bg */}
                        <div className="absolute inset-y-0 left-0 w-[25%] pointer-events-none" style={{
                            zIndex: 4,
                            background: 'linear-gradient(to right, #FAF7F4 0%, rgba(250,247,244,0.7) 45%, transparent 100%)',
                        }} />

                        {/* Bottom blend */}
                        <div className="absolute bottom-0 inset-x-0 h-28 pointer-events-none" style={{
                            zIndex: 4,
                            background: 'linear-gradient(to top, #FAF7F4 0%, transparent 100%)',
                        }} />

                        {/* Currently showing tag — bottom left of image */}
                        <div className="absolute bottom-10 left-8 z-10 flex items-center gap-2.5 bg-white/80 backdrop-blur-xl px-4 py-2.5 rounded-full border border-black/[0.06] shadow-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-deep-rose animate-pulse-soft" />
                            <span className="text-[9px] font-black uppercase tracking-[0.35em] text-charcoal/55">
                                {SLIDES[active].label}
                            </span>
                        </div>

                        {/* Slide indicators */}
                        <div className="absolute bottom-10 right-8 z-10 flex flex-col gap-2">
                            {SLIDES.map((_, i) => (
                                <div
                                    key={i}
                                    className="rounded-full transition-all duration-700"
                                    style={{
                                        width: '5px',
                                        height: i === active ? '22px' : '5px',
                                        background: i === active
                                            ? 'linear-gradient(180deg, #A0134D, #C2185B)'
                                            : 'rgba(15,14,18,0.15)',
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Ken Burns keyframe */}
            <style>{`
                @keyframes heroKB {
                    from { transform: scale(1.0); }
                    to   { transform: scale(1.06); }
                }
            `}</style>
        </section>
    );
};

export default Hero;
