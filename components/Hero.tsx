'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import { WHATSAPP_NUMBER } from '../constants/services';
import HeroSlideshow from './HeroSlideshow';

/* ── Sparkle dots scattered across the background ───────── */
const SPARKLES = [
    { top: '8%',  left: '6%',  size: 3, delay: 0 },
    { top: '14%', left: '38%', size: 2, delay: 0.8 },
    { top: '22%', left: '72%', size: 4, delay: 1.4 },
    { top: '35%', left: '18%', size: 2, delay: 0.4 },
    { top: '42%', left: '88%', size: 3, delay: 2.1 },
    { top: '55%', left: '5%',  size: 2, delay: 1.7 },
    { top: '60%', left: '52%', size: 3, delay: 0.6 },
    { top: '70%', left: '80%', size: 2, delay: 1.2 },
    { top: '78%', left: '28%', size: 4, delay: 0.3 },
    { top: '88%', left: '62%', size: 2, delay: 1.9 },
    { top: '5%',  left: '55%', size: 3, delay: 2.5 },
    { top: '48%', left: '44%', size: 2, delay: 0.9 },
];

/* ── Four-point star SVG ─────────────────────────────────── */
const StarSVG = ({ size, color }: { size: number; color: string }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <path d="M8 0 L9.4 6.6 L16 8 L9.4 9.4 L8 16 L6.6 9.4 L0 8 L6.6 6.6 Z" fill={color} />
    </svg>
);

/* ── Floral petal shape ──────────────────────────────────── */
const Petal = ({ style }: { style: React.CSSProperties }) => (
    <div className="absolute pointer-events-none" style={style}>
        <svg viewBox="0 0 80 120" fill="none" width="100%" height="100%">
            <ellipse cx="40" cy="60" rx="28" ry="55"
                fill="rgba(200,145,50,0.07)" stroke="rgba(200,145,50,0.12)" strokeWidth="0.8"
                transform="rotate(-15 40 60)" />
            <ellipse cx="40" cy="60" rx="16" ry="38"
                fill="rgba(240,195,100,0.05)"
                transform="rotate(-15 40 60)" />
        </svg>
    </div>
);

const Hero = () => {
    const sectionRef  = useRef<HTMLElement>(null);
    const slideshowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 1.3 });

            tl.fromTo('.hero-eyebrow',
                { y: 16, opacity: 0 },
                { y: 0,  opacity: 1, duration: 0.7 })
              .fromTo('.hero-line',
                { y: 80, opacity: 0, skewY: 3 },
                { y: 0,  opacity: 1, skewY: 0, duration: 1.1, stagger: 0.1 }, '-=0.2')
              .fromTo('.hero-divider',
                { scaleX: 0, opacity: 0 },
                { scaleX: 1, opacity: 1, duration: 0.8, ease: 'expo.out' }, '-=0.4')
              .fromTo('.hero-sub',
                { y: 20, opacity: 0 },
                { y: 0,  opacity: 1, duration: 0.8 }, '-=0.5')
              .fromTo('.hero-cta',
                { y: 20, opacity: 0 },
                { y: 0,  opacity: 1, duration: 0.8 }, '-=0.6')
              .fromTo(slideshowRef.current,
                { x: 60, opacity: 0 },
                { x: 0,  opacity: 1, duration: 1.6, ease: 'expo.out' }, '-=1.8');

            /* Sparkles twinkling */
            gsap.utils.toArray('.hero-sparkle').forEach((el, i) => {
                gsap.to(el as Element, {
                    opacity: 0.15,
                    scale: 0.5,
                    duration: 1.2 + (i % 5) * 0.4,
                    repeat: -1, yoyo: true,
                    ease: 'sine.inOut',
                    delay: (i % 6) * 0.3,
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative min-h-[100svh] w-full overflow-hidden pt-[80px]"
        >
            {/* ── Golden gradient background ───────────────────── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `
                        linear-gradient(
                            148deg,
                            #C8931A 0%,
                            #DBA93A 12%,
                            #ECC660 24%,
                            #F5DC8A 36%,
                            #FAF0C0 50%,
                            #FDF8E4 62%,
                            #FDFAF2 75%,
                            #FFFEF9 100%
                        )
                    `,
                    zIndex: 0,
                }}
            />

            {/* ── Deep radial warmth centre-left ───────────────── */}
            <div className="absolute pointer-events-none" style={{
                top: '10%', left: '-5%',
                width: '55%', height: '70%',
                background: 'radial-gradient(ellipse, rgba(210,150,30,0.18) 0%, rgba(230,180,60,0.08) 50%, transparent 75%)',
                filter: 'blur(60px)', zIndex: 1,
            }} />

            {/* ── Bright top-right glow ────────────────────────── */}
            <div className="absolute pointer-events-none" style={{
                top: '-15%', right: '-5%',
                width: '60%', height: '65%',
                background: 'radial-gradient(ellipse, rgba(255,235,150,0.35) 0%, rgba(255,210,90,0.15) 45%, transparent 70%)',
                filter: 'blur(55px)', zIndex: 1,
            }} />

            {/* ── Floral petal decorations ─────────────────────── */}
            <Petal style={{ top: '-4%', left: '-2%',  width: '110px', height: '160px', opacity: 0.9, transform: 'rotate(-20deg)' }} />
            <Petal style={{ top: '-4%', left: '2%',   width: '80px',  height: '120px', opacity: 0.6, transform: 'rotate(10deg)' }} />
            <Petal style={{ bottom: '-5%', right: '48%', width: '90px', height: '130px', opacity: 0.5, transform: 'rotate(30deg) scaleX(-1)' }} />
            <Petal style={{ top: '20%', right: '0%',  width: '70px',  height: '110px', opacity: 0.4, transform: 'rotate(-40deg)' }} />
            <Petal style={{ bottom: '5%', left: '30%', width: '60px', height: '100px', opacity: 0.35, transform: 'rotate(55deg)' }} />
            {/* Corner floral clusters */}
            {[0,1,2].map(i => (
                <Petal key={i} style={{
                    bottom: `${-2 + i * 3}%`, left: `${-1 + i * 2}%`,
                    width: `${75 - i * 12}px`, height: `${115 - i * 18}px`,
                    opacity: 0.5 - i * 0.1,
                    transform: `rotate(${40 + i * 25}deg)`,
                }} />
            ))}

            {/* ── Sparkle particles ────────────────────────────── */}
            {SPARKLES.map((s, i) => (
                <div
                    key={i}
                    className="hero-sparkle absolute pointer-events-none"
                    style={{ top: s.top, left: s.left, opacity: 0.7, zIndex: 2 }}
                >
                    <StarSVG
                        size={s.size * 3.5}
                        color={i % 3 === 0 ? 'rgba(180,120,20,0.65)' : i % 3 === 1 ? 'rgba(210,170,60,0.55)' : 'rgba(255,220,100,0.5)'}
                    />
                </div>
            ))}

            {/* ── Fine golden noise texture overlay ────────────── */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '180px', zIndex: 2 }}
            />

            {/* ── Main grid ────────────────────────────────────── */}
            <div className="relative z-10 w-full max-w-[1380px] mx-auto px-6 md:px-12 lg:px-16 min-h-[calc(100svh-80px)] grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-6 items-center py-14 lg:py-0">

                {/* ── LEFT: Text ───────────────────────────────── */}
                <div className="flex flex-col justify-center order-2 lg:order-1 lg:pr-6 xl:pr-14">

                    {/* Eyebrow */}
                    <div className="hero-eyebrow opacity-0 flex items-center gap-3 mb-6">
                        <div className="w-8 h-px bg-amber-700/40" />
                        <span className="text-[9.5px] font-black uppercase tracking-[0.55em] text-amber-800/60 font-sans">
                            Edmonton's Laser & Beauty Clinic
                        </span>
                        <div className="w-8 h-px bg-amber-700/40" />
                    </div>

                    {/* Headline */}
                    <div className="mb-3 space-y-0.5">
                        {[
                            { text: 'Advanced',       style: { fontWeight: 800, color: '#2C1A06' } },
                            { text: 'Beauty & Laser', gradient: true },
                            { text: 'Treatments in',  style: { fontWeight: 800, color: '#2C1A06' } },
                            { text: 'Edmonton.',      gradient: true },
                        ].map((item, i) => (
                            <div key={i} className="overflow-hidden">
                                <h1
                                    className="hero-line opacity-0 font-display text-[2.2rem] sm:text-[2.8rem] md:text-[3.2rem] lg:text-[3.6rem] xl:text-[4rem] leading-[1.0] tracking-[-0.02em] uppercase"
                                    style={item.gradient ? {
                                        background: 'linear-gradient(130deg, #8B5E0A 0%, #B8860B 35%, #C8931A 65%, #6B3A0A 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        fontWeight: 300,
                                        fontStyle: 'italic',
                                        textTransform: 'none',
                                    } : (item.style as React.CSSProperties)}
                                >
                                    {item.text}
                                </h1>
                            </div>
                        ))}
                    </div>

                    {/* Ornamental divider */}
                    <div className="hero-divider opacity-0 origin-left flex items-center gap-3 my-6">
                        <div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(to right, rgba(180,120,20,0.6), transparent)' }} />
                        <StarSVG size={10} color="rgba(180,120,20,0.5)" />
                        <div className="h-px flex-1 max-w-[40px]" style={{ background: 'linear-gradient(to right, rgba(180,120,20,0.3), transparent)' }} />
                    </div>

                    {/* Subtext */}
                    <p className="hero-sub opacity-0 text-amber-950/55 text-[15px] md:text-[16px] leading-relaxed max-w-[390px] mb-9 font-medium">
                        Personalized care for radiant skin — laser hair removal, facials, microneedling, and waxing for{' '}
                        <span className="text-amber-900/80 font-bold">men and women in Edmonton.</span>
                    </p>

                    {/* CTAs */}
                    <div className="hero-cta opacity-0 flex flex-wrap items-center gap-3">
                        <Link
                            href="#services"
                            className="inline-flex items-center gap-2.5 text-white px-7 py-4 rounded-full text-[12px] font-black uppercase tracking-[0.15em] transition-all duration-300 shadow-lg group active:scale-95 hover:scale-105"
                            style={{ background: 'linear-gradient(135deg, #8B5E0A, #B8860B, #C8931A)' }}
                        >
                            <span>Explore Services</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20R.D.%20Beauty%20%26%20Laser%20Clinic!%20I'd%20like%20to%20book%20a%20consultation.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 text-amber-900/70 px-7 py-4 rounded-full text-[12px] font-black uppercase tracking-[0.15em] transition-all duration-300 active:scale-95 hover:text-amber-900"
                            style={{ border: '1.5px solid rgba(140,90,10,0.25)', background: 'rgba(255,230,120,0.15)' }}
                        >
                            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'rgba(180,120,20,0.12)' }}>
                                <MessageCircle className="w-3.5 h-3.5" />
                            </div>
                            <span>Book Consult</span>
                        </a>
                    </div>
                </div>

                {/* ── RIGHT: Video carousel ─────────────────────── */}
                <div
                    ref={slideshowRef}
                    className="relative order-1 lg:order-2 opacity-0"
                    style={{ height: 'clamp(380px, 58vw, 640px)' }}
                >
                    <HeroSlideshow />
                </div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(253,250,245,0.9) 0%, transparent 100%)', zIndex: 10 }}
            />
        </section>
    );
};

export default Hero;
