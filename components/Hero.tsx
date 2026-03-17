'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import { WHATSAPP_NUMBER } from '../constants/services';
import HeroSlideshow from './HeroSlideshow';

/* ── Twinkling star ──────────────────────────────────────── */
const Twinkle = ({ x, y, size, color }: { x: string; y: string; size: number; delay: number; color: string }) => (
    <div className="hero-twinkle absolute pointer-events-none" style={{ left: x, top: y }}>
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
            <path d="M10 0 L11.8 8.2 L20 10 L11.8 11.8 L10 20 L8.2 11.8 L0 10 L8.2 8.2 Z" fill={color} />
        </svg>
    </div>
);

const TWINKLES = [
    { x: '5%',  y: '12%', size: 10, delay: 0,    color: 'rgba(210,165,60,0.7)'  },
    { x: '14%', y: '35%', size: 6,  delay: 1.2,  color: 'rgba(255,210,100,0.5)' },
    { x: '8%',  y: '68%', size: 8,  delay: 0.6,  color: 'rgba(180,120,40,0.5)'  },
    { x: '22%', y: '82%', size: 5,  delay: 2.0,  color: 'rgba(210,165,60,0.4)'  },
    { x: '38%', y: '8%',  size: 7,  delay: 0.9,  color: 'rgba(255,220,120,0.45)'},
    { x: '42%', y: '90%', size: 5,  delay: 1.7,  color: 'rgba(210,165,60,0.35)' },
    { x: '55%', y: '15%', size: 9,  delay: 0.3,  color: 'rgba(255,200,80,0.3)'  },
    { x: '62%', y: '78%', size: 6,  delay: 1.5,  color: 'rgba(180,120,40,0.25)' },
    { x: '75%', y: '5%',  size: 7,  delay: 2.3,  color: 'rgba(210,165,60,0.25)' },
    { x: '88%', y: '22%', size: 5,  delay: 0.7,  color: 'rgba(255,220,120,0.2)' },
    { x: '3%',  y: '50%', size: 6,  delay: 1.1,  color: 'rgba(160,19,77,0.4)'   },
    { x: '30%', y: '55%', size: 4,  delay: 2.8,  color: 'rgba(210,165,60,0.3)'  },
];

const Hero = () => {
    const sectionRef   = useRef<HTMLElement>(null);
    const slideshowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            /* Entrance timeline */
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 1.2 });
            tl.fromTo('.hero-tag',     { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
              .fromTo('.hero-line',    { y: 90, opacity: 0, skewY: 4 }, { y: 0, opacity: 1, skewY: 0, duration: 1.2, stagger: 0.11 }, '-=0.2')
              .fromTo('.hero-rule',    { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 1, ease: 'expo.out' }, '-=0.5')
              .fromTo('.hero-sub',     { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.5')
              .fromTo('.hero-cta',     { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.6')
              .fromTo('.hero-badge',   { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
              .fromTo(slideshowRef.current,
                { x: 70, opacity: 0 }, { x: 0, opacity: 1, duration: 1.8, ease: 'expo.out' }, '-=1.9');

            /* Twinkling stars */
            gsap.utils.toArray('.hero-twinkle').forEach((el, i) => {
                gsap.to(el as Element, {
                    opacity: 0.08, scale: 0.4,
                    duration: 1.4 + (i % 5) * 0.35,
                    repeat: -1, yoyo: true, ease: 'sine.inOut',
                    delay: TWINKLES[i % TWINKLES.length].delay,
                });
            });

            /* Floating orbs subtle drift */
            gsap.to('.hero-orb-1', { y: -18, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
            gsap.to('.hero-orb-2', { y:  14, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 });
            gsap.to('.hero-orb-3', { y: -10, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 4 });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative min-h-[100svh] w-full overflow-hidden pt-[80px]"
            style={{ background: '#0A0705' }}
        >
            {/* ════════════════════════════════════
                BACKGROUND ATMOSPHERE
            ════════════════════════════════════ */}

            {/* Deep rose halo — top right */}
            <div className="hero-orb-1 absolute pointer-events-none" style={{
                top: '-20%', right: '-10%', width: '65%', height: '70%',
                background: 'radial-gradient(ellipse, rgba(160,19,77,0.38) 0%, rgba(120,10,55,0.15) 45%, transparent 70%)',
                filter: 'blur(80px)',
            }} />

            {/* Warm gold halo — center right */}
            <div className="hero-orb-2 absolute pointer-events-none" style={{
                top: '15%', right: '5%', width: '50%', height: '60%',
                background: 'radial-gradient(ellipse, rgba(210,160,50,0.22) 0%, rgba(180,120,30,0.08) 50%, transparent 72%)',
                filter: 'blur(70px)',
            }} />

            {/* Deep purple warmth — bottom left */}
            <div className="hero-orb-3 absolute pointer-events-none" style={{
                bottom: '-10%', left: '-8%', width: '55%', height: '55%',
                background: 'radial-gradient(ellipse, rgba(90,20,60,0.3) 0%, transparent 68%)',
                filter: 'blur(90px)',
            }} />

            {/* Champagne centre glow */}
            <div className="absolute pointer-events-none" style={{
                top: '30%', left: '20%', width: '45%', height: '40%',
                background: 'radial-gradient(ellipse, rgba(210,165,60,0.06) 0%, transparent 70%)',
                filter: 'blur(60px)',
            }} />

            {/* Fine noise grain for depth */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: '200px',
            }} />

            {/* Subtle horizontal scan lines — ultra-luxury texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.018]" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)',
                backgroundSize: '100% 3px',
            }} />

            {/* Twinkling stars */}
            {TWINKLES.map((t, i) => <Twinkle key={i} {...t} />)}

            {/* Thin golden arc — decorative top left */}
            <div className="absolute pointer-events-none" style={{ top: '5%', left: '-2%', width: '280px', height: '280px', zIndex: 2 }}>
                <svg viewBox="0 0 280 280" fill="none" width="100%" height="100%">
                    <circle cx="140" cy="140" r="130" stroke="rgba(210,165,60,0.08)" strokeWidth="0.8" strokeDasharray="4 8" />
                    <circle cx="140" cy="140" r="100" stroke="rgba(210,165,60,0.05)" strokeWidth="0.5" />
                </svg>
            </div>

            {/* Thin golden arc — bottom right */}
            <div className="absolute pointer-events-none" style={{ bottom: '2%', right: '38%', width: '200px', height: '200px', zIndex: 2 }}>
                <svg viewBox="0 0 200 200" fill="none" width="100%" height="100%">
                    <circle cx="100" cy="100" r="90" stroke="rgba(210,165,60,0.06)" strokeWidth="0.6" strokeDasharray="3 7" />
                </svg>
            </div>

            {/* ════════════════════════════════════
                CONTENT GRID
            ════════════════════════════════════ */}
            <div className="relative z-10 w-full max-w-[1380px] mx-auto px-6 md:px-12 lg:px-16 min-h-[calc(100svh-80px)] grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-6 items-center py-14 lg:py-0">

                {/* ── LEFT TEXT ──────────────────────────── */}
                <div className="flex flex-col justify-center order-2 lg:order-1 lg:pr-6 xl:pr-14">

                    {/* Tag */}
                    <div className="hero-tag opacity-0 flex items-center gap-3 mb-7">
                        <div className="h-px w-8" style={{ background: 'linear-gradient(to right, rgba(210,165,60,0.7), transparent)' }} />
                        <span className="text-[9px] font-black uppercase tracking-[0.6em] font-sans"
                            style={{ color: 'rgba(210,165,60,0.65)' }}>
                            Edmonton's Laser & Beauty Clinic
                        </span>
                        <div className="h-px w-4" style={{ background: 'rgba(210,165,60,0.2)' }} />
                    </div>

                    {/* Headline — alternating weight + gold italic */}
                    <div className="mb-2 space-y-[2px]">
                        {[
                            { text: 'Advanced',       italic: false },
                            { text: 'Beauty & Laser', italic: true  },
                            { text: 'Treatments in',  italic: false },
                            { text: 'Edmonton.',      italic: true  },
                        ].map((line, i) => (
                            <div key={i} className="overflow-hidden">
                                <h1
                                    className="hero-line opacity-0 font-display text-[2.4rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[3.9rem] xl:text-[4.4rem] leading-[1.0] tracking-[-0.02em]"
                                    style={line.italic ? {
                                        background: 'linear-gradient(120deg, #C8901A 0%, #E0B84A 30%, #F5D878 55%, #D4A030 80%, #B07820 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        fontWeight: 300, fontStyle: 'italic',
                                    } : {
                                        color: 'rgba(255,250,240,0.92)',
                                        fontWeight: 800, textTransform: 'uppercase',
                                    }}
                                >
                                    {line.text}
                                </h1>
                            </div>
                        ))}
                    </div>

                    {/* Ornamental rule */}
                    <div className="hero-rule opacity-0 origin-left flex items-center gap-3 my-7">
                        <div className="h-px w-16" style={{ background: 'linear-gradient(to right, rgba(210,165,60,0.6), rgba(210,165,60,0.1))' }} />
                        <svg width="8" height="8" viewBox="0 0 16 16" fill="none">
                            <path d="M8 0 L9.4 6.6 L16 8 L9.4 9.4 L8 16 L6.6 9.4 L0 8 L6.6 6.6 Z" fill="rgba(210,165,60,0.5)" />
                        </svg>
                        <div className="h-px w-8" style={{ background: 'linear-gradient(to right, rgba(210,165,60,0.2), transparent)' }} />
                    </div>

                    {/* Subtext */}
                    <p className="hero-sub opacity-0 text-[15px] md:text-[16px] leading-relaxed max-w-[390px] mb-10 font-medium font-sans"
                        style={{ color: 'rgba(255,240,210,0.42)' }}>
                        Personalized care for radiant skin — laser hair removal, facials, microneedling, and waxing for{' '}
                        <span style={{ color: 'rgba(255,240,210,0.72)', fontWeight: 600 }}>men and women in Edmonton.</span>
                    </p>

                    {/* CTAs */}
                    <div className="hero-cta opacity-0 flex flex-wrap items-center gap-3 mb-8">
                        <Link
                            href="#services"
                            className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-[12px] font-black uppercase tracking-[0.15em] transition-all duration-300 active:scale-95 hover:scale-[1.03]"
                            style={{
                                background: 'linear-gradient(135deg, #9A6A10, #C8901A, #E0B84A, #C08020)',
                                color: '#0A0705',
                                boxShadow: '0 0 40px rgba(210,165,60,0.25), 0 4px 20px rgba(0,0,0,0.4)',
                            }}
                        >
                            <span>Explore Services</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20R.D.%20Beauty%20%26%20Laser%20Clinic!%20I'd%20like%20to%20book%20a%20consultation.`}
                            target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-[12px] font-black uppercase tracking-[0.15em] transition-all duration-300 active:scale-95 hover:border-[rgba(210,165,60,0.5)]"
                            style={{
                                border: '1px solid rgba(210,165,60,0.22)',
                                color: 'rgba(255,230,160,0.65)',
                                background: 'rgba(210,165,60,0.05)',
                                backdropFilter: 'blur(8px)',
                            }}
                        >
                            <MessageCircle className="w-4 h-4" />
                            <span>Book Consult</span>
                        </a>
                    </div>

                    {/* Social proof badge */}
                    <div className="hero-badge opacity-0 flex items-center gap-3">
                        <div className="flex -space-x-1.5">
                            {['#A0134D','#C2185B','#D4A030','#8B5E0A'].map((c, i) => (
                                <div key={i} className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-[8px] font-bold text-white"
                                    style={{ borderColor: '#0A0705', background: c }}>
                                    {['S','E','J','P'][i]}
                                </div>
                            ))}
                        </div>
                        <div>
                            <p className="text-[10px] font-black" style={{ color: 'rgba(255,230,160,0.5)' }}>
                                ★★★★★ <span style={{ color: 'rgba(255,230,160,0.3)' }}>Trusted by 200+ clients in Edmonton</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: VIDEO ────────────────────────── */}
                <div
                    ref={slideshowRef}
                    className="relative order-1 lg:order-2 opacity-0"
                    style={{ height: 'clamp(400px, 60vw, 660px)' }}
                >
                    <HeroSlideshow />
                </div>
            </div>

            {/* Bottom fade to next section */}
            <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{
                background: 'linear-gradient(to top, #FDFAF7 0%, rgba(253,250,247,0.6) 40%, transparent 100%)',
                zIndex: 20,
            }} />
        </section>
    );
};

export default Hero;
