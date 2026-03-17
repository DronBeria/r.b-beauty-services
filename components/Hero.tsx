'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import { WHATSAPP_NUMBER } from '../constants/services';
import HeroSlideshow from './HeroSlideshow';

const Hero = () => {
    const sectionRef   = useRef<HTMLElement>(null);
    const slideshowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 1.2 });

            tl.fromTo('.hero-tag',
                { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
              .fromTo('.hero-line',
                { y: 80, opacity: 0, skewY: 3 },
                { y: 0, opacity: 1, skewY: 0, duration: 1.1, stagger: 0.1 }, '-=0.2')
              .fromTo('.hero-rule',
                { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.9, ease: 'expo.out' }, '-=0.4')
              .fromTo('.hero-sub',
                { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.5')
              .fromTo('.hero-cta',
                { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.6')
              .fromTo(slideshowRef.current,
                { opacity: 0 }, { opacity: 1, duration: 2, ease: 'power2.out' }, '-=1.8');
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative w-full min-h-[100svh] overflow-hidden"
            /* Single clean deep background — no layers, no gradients, just this */
            style={{ background: '#0C0908' }}
        >
            {/*
              ─── ONE ambient light source — top right, backing the video.
                  Just this. Nothing else on the background.
            ──────────────────────────────────────────────────────── */}
            <div
                className="absolute pointer-events-none"
                style={{
                    top: '-30%', right: '-15%',
                    width: '75%', height: '90%',
                    background: 'radial-gradient(ellipse at 50% 50%, rgba(160,19,77,0.28) 0%, rgba(110,10,50,0.12) 45%, transparent 70%)',
                    filter: 'blur(90px)',
                }}
            />

            {/* ─── GRID ──────────────────────────────────────────── */}
            <div className="relative z-10 flex min-h-[100svh] pt-[80px]">

                {/* LEFT — text column */}
                <div className="flex flex-col justify-center px-8 md:px-14 lg:px-20 xl:px-28 py-16 lg:py-0 w-full lg:w-[48%] flex-shrink-0">

                    {/* Thin gold accent bar */}
                    <div
                        className="hero-tag opacity-0 flex items-center gap-4 mb-10"
                    >
                        <div className="w-px h-8 flex-shrink-0"
                            style={{ background: 'linear-gradient(to bottom, transparent, rgba(210,165,60,0.6), transparent)' }} />
                        <span
                            className="text-[9px] font-black uppercase tracking-[0.65em] font-sans"
                            style={{ color: 'rgba(210,165,60,0.5)' }}
                        >
                            Edmonton's Laser & Beauty Clinic
                        </span>
                    </div>

                    {/* Headline — alternating weight */}
                    <div className="space-y-[1px] mb-8">
                        {[
                            { text: 'Advanced',       italic: false },
                            { text: 'Beauty & Laser', italic: true  },
                            { text: 'Treatments',     italic: false },
                            { text: 'in Edmonton.',   italic: true  },
                        ].map((line, i) => (
                            <div key={i} className="overflow-hidden">
                                <h1
                                    className="hero-line opacity-0 font-display leading-[1.0] tracking-[-0.025em]"
                                    style={{
                                        fontSize: 'clamp(2rem, 4.2vw, 4.2rem)',
                                        ...(line.italic
                                            ? {
                                                background: 'linear-gradient(120deg, #C8901A 0%, #E8BE58 40%, #F5D878 65%, #C08020 100%)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                fontWeight: 300,
                                                fontStyle: 'italic',
                                            }
                                            : {
                                                color: 'rgba(255,248,238,0.90)',
                                                fontWeight: 800,
                                                textTransform: 'uppercase' as const,
                                            }
                                        ),
                                    }}
                                >
                                    {line.text}
                                </h1>
                            </div>
                        ))}
                    </div>

                    {/* Thin horizontal rule */}
                    <div
                        className="hero-rule opacity-0 origin-left h-px w-20 mb-8"
                        style={{ background: 'linear-gradient(to right, rgba(210,165,60,0.45), transparent)' }}
                    />

                    {/* Subtext */}
                    <p
                        className="hero-sub opacity-0 text-[14.5px] leading-[1.75] max-w-[340px] mb-10 font-sans font-normal"
                        style={{ color: 'rgba(255,240,210,0.36)' }}
                    >
                        Laser hair removal, facials, microneedling & waxing —
                        personalized for{' '}
                        <span style={{ color: 'rgba(255,240,210,0.6)' }}>
                            men and women in Edmonton.
                        </span>
                    </p>

                    {/* CTAs */}
                    <div className="hero-cta opacity-0 flex flex-wrap items-center gap-3">
                        <Link
                            href="#services"
                            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 active:scale-95"
                            style={{
                                background: 'linear-gradient(135deg, #A07018, #C8901A, #DFB84A)',
                                color: '#0C0908',
                                boxShadow: '0 0 32px rgba(200,144,26,0.25)',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 48px rgba(200,144,26,0.45)')}
                            onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 32px rgba(200,144,26,0.25)')}
                        >
                            <span>Explore Services</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20R.D.%20Beauty%20%26%20Laser%20Clinic!%20I'd%20like%20to%20book%20a%20consultation.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 active:scale-95"
                            style={{
                                border: '1px solid rgba(210,165,60,0.18)',
                                color: 'rgba(255,230,160,0.5)',
                                background: 'transparent',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(210,165,60,0.4)')}
                            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(210,165,60,0.18)')}
                        >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Book Consult</span>
                        </a>
                    </div>
                </div>

                {/* RIGHT — video, bleeds to top + right edges, no border */}
                <div
                    ref={slideshowRef}
                    className="hidden lg:block opacity-0 flex-1 relative"
                >
                    <HeroSlideshow />
                </div>
            </div>

            {/* Thin gold line — left edge accent */}
            <div
                className="absolute left-0 top-[15%] bottom-[15%] w-px pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, transparent, rgba(210,165,60,0.25) 30%, rgba(210,165,60,0.25) 70%, transparent)' }}
            />

            {/* Bottom fade → next section bg */}
            <div
                className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-20"
                style={{ background: 'linear-gradient(to top, #FDFAF7 0%, rgba(253,250,247,0.5) 50%, transparent 100%)' }}
            />
        </section>
    );
};

export default Hero;
