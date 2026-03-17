'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Star } from 'lucide-react';
import gsap from 'gsap';
import { WHATSAPP_NUMBER } from '../constants/services';
import HeroSlideshow, { VIDEO_SLIDES, INTERVAL_MS, FADE_MS } from './HeroSlideshow';

const LABELS = ['Facial Treatments', 'Waxing & Threading', 'Laser Hair Removal', 'Skin Rejuvenation'];

const Hero = () => {
    const sectionRef = useRef<HTMLElement>(null);

    const [current, setCurrent] = useState(0);
    const [prev, setPrev] = useState<number | null>(null);
    const [fading, setFading] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Auto-advance carousel
    useEffect(() => {
        const advance = () => {
            const next = (current + 1) % VIDEO_SLIDES.length;
            setPrev(current);
            setFading(true);
            timerRef.current = setTimeout(() => {
                setCurrent(next);
                setFading(false);
                setPrev(null);
            }, FADE_MS);
        };
        const id = setInterval(advance, INTERVAL_MS);
        return () => {
            clearInterval(id);
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [current]);

    // Text entrance
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 1.3 });
            tl.fromTo('.hero-eyebrow', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
              .fromTo('.hero-line',    { y: 80, opacity: 0, skewY: 3 }, { y: 0, opacity: 1, skewY: 0, duration: 1.1, stagger: 0.1 }, '-=0.2')
              .fromTo('.hero-sub',    { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
              .fromTo('.hero-cta',    { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
              .fromTo('.hero-labels', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5');
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative min-h-[100svh] w-full overflow-hidden"
        >
            {/* ── Video background ──────────────────────────────── */}
            <HeroSlideshow current={current} prev={prev} fading={fading} />

            {/* ── Cinematic overlays ───────────────────────────── */}

            {/* Dark base — heaviest on left for text legibility */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(105deg, rgba(10,8,6,0.78) 0%, rgba(10,8,6,0.55) 45%, rgba(10,8,6,0.22) 100%)',
                    zIndex: 3,
                }}
            />

            {/* Warm sunlight bloom — top-right */}
            <div
                className="absolute pointer-events-none"
                style={{
                    top: '-15%', right: '-8%',
                    width: '70%', height: '75%',
                    background: 'radial-gradient(ellipse, rgba(255,200,100,0.18) 0%, rgba(240,160,60,0.09) 40%, transparent 68%)',
                    filter: 'blur(70px)',
                    zIndex: 4,
                }}
            />

            {/* Rose glow — bottom-left */}
            <div
                className="absolute pointer-events-none"
                style={{
                    bottom: '-10%', left: '-5%',
                    width: '55%', height: '60%',
                    background: 'radial-gradient(ellipse, rgba(160,19,77,0.14) 0%, transparent 65%)',
                    filter: 'blur(80px)',
                    zIndex: 4,
                }}
            />

            {/* Light rays fanning from top-right */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `conic-gradient(
                        from -15deg at 80% -5%,
                        transparent 0deg,
                        rgba(255,230,150,0.055) 7deg,
                        transparent 13deg,
                        rgba(255,215,120,0.04) 21deg,
                        transparent 29deg,
                        rgba(255,235,160,0.05) 38deg,
                        transparent 48deg
                    )`,
                    zIndex: 4,
                }}
            />

            {/* Bottom fade to next section */}
            <div
                className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
                style={{
                    background: 'linear-gradient(to top, rgba(253,250,247,0.9) 0%, transparent 100%)',
                    zIndex: 5,
                }}
            />

            {/* Top vignette */}
            <div
                className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 100%)',
                    zIndex: 5,
                }}
            />

            {/* ── Content ──────────────────────────────────────── */}
            <div
                className="relative pt-[80px] min-h-[100svh] flex items-center"
                style={{ zIndex: 10 }}
            >
                <div className="w-full max-w-[1380px] mx-auto px-6 md:px-12 lg:px-20 py-16 lg:py-0">
                    <div className="max-w-[640px]">

                        {/* Eyebrow */}
                        <div className="hero-eyebrow opacity-0 flex items-center gap-3 mb-8">
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 fill-amber-300 stroke-amber-300" />
                                ))}
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.45em] text-white/50 font-sans">
                                Edmonton's Laser & Beauty Clinic
                            </span>
                        </div>

                        {/* Headline */}
                        <div className="mb-8 space-y-1">
                            <div className="overflow-hidden">
                                <h1 className="hero-line opacity-0 font-display text-[2.6rem] sm:text-[3.2rem] md:text-[3.8rem] lg:text-[4.4rem] xl:text-[5rem] font-bold text-white leading-[1.0] tracking-[-0.02em] uppercase">
                                    Advanced
                                </h1>
                            </div>
                            <div className="overflow-hidden">
                                <h1
                                    className="hero-line opacity-0 font-display text-[2.6rem] sm:text-[3.2rem] md:text-[3.8rem] lg:text-[4.4rem] xl:text-[5rem] leading-[0.9] tracking-[-0.02em]"
                                    style={{
                                        background: 'linear-gradient(135deg, #F2C07A 0%, #E8A44A 40%, #D4956A 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        fontWeight: 300,
                                        fontStyle: 'italic',
                                    }}
                                >
                                    Beauty & Laser
                                </h1>
                            </div>
                            <div className="overflow-hidden">
                                <h1 className="hero-line opacity-0 font-display text-[2.6rem] sm:text-[3.2rem] md:text-[3.8rem] lg:text-[4.4rem] xl:text-[5rem] font-bold text-white leading-[0.9] tracking-[-0.02em] uppercase">
                                    Treatments in
                                </h1>
                            </div>
                            <div className="overflow-hidden">
                                <h1
                                    className="hero-line opacity-0 font-display text-[2.6rem] sm:text-[3.2rem] md:text-[3.8rem] lg:text-[4.4rem] xl:text-[5rem] leading-[0.9] tracking-[-0.02em]"
                                    style={{
                                        background: 'linear-gradient(135deg, #F2C07A 0%, #E8A44A 40%, #D4956A 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        fontWeight: 300,
                                        fontStyle: 'italic',
                                    }}
                                >
                                    Edmonton.
                                </h1>
                            </div>
                        </div>

                        {/* Subtext */}
                        <p className="hero-sub opacity-0 text-white/55 text-[15px] md:text-[16px] leading-relaxed max-w-[400px] mb-10 font-medium">
                            Personalized care for radiant skin — laser hair removal, facials, microneedling, and waxing for{' '}
                            <span className="text-white/90 font-semibold">men and women in Edmonton.</span>
                        </p>

                        {/* CTAs */}
                        <div className="hero-cta opacity-0 flex flex-wrap items-center gap-3 mb-12">
                            <Link
                                href="#services"
                                className="inline-flex items-center gap-2.5 text-white px-7 py-4 rounded-full text-[12px] font-black uppercase tracking-[0.15em] transition-all duration-300 shadow-lg group active:scale-95"
                                style={{ background: 'linear-gradient(135deg, #A0134D, #C2185B)' }}
                            >
                                <span>Explore Services</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <a
                                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20R.D.%20Beauty%20%26%20Laser%20Clinic!%20I'd%20like%20to%20book%20a%20consultation.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2.5 border border-white/25 text-white px-7 py-4 rounded-full text-[12px] font-black uppercase tracking-[0.15em] hover:bg-white/10 hover:border-white/40 transition-all duration-300 active:scale-95 backdrop-blur-sm"
                            >
                                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                                    <Play className="w-3 h-3 fill-white ml-0.5" />
                                </div>
                                <span>Book Consult</span>
                            </a>
                        </div>

                        {/* Currently showing label */}
                        <div className="hero-labels opacity-0 flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-deep-rose animate-pulse" />
                            <span
                                className="text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-700"
                                style={{ color: 'rgba(255,255,255,0.35)' }}
                            >
                                {LABELS[current]}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Dot indicators — bottom-right ────────────────── */}
            <div
                className="absolute bottom-10 right-8 md:right-14 flex flex-col items-center gap-2.5"
                style={{ zIndex: 20 }}
            >
                {VIDEO_SLIDES.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            if (i === current) return;
                            setPrev(current);
                            setFading(true);
                            setTimeout(() => { setCurrent(i); setFading(false); setPrev(null); }, FADE_MS);
                        }}
                        className="rounded-full transition-all duration-700"
                        style={{
                            width: '6px',
                            height: i === current ? '24px' : '6px',
                            background: i === current
                                ? 'linear-gradient(180deg, #F2C07A, #E8A44A)'
                                : 'rgba(255,255,255,0.2)',
                        }}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;
