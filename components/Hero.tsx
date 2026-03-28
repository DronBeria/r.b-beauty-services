'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowRight, CalendarCheck } from 'lucide-react';

const SQUARE_BOOKING_URL = 'https://app.squareup.com/appointments/book/mfaodungeatf80/L15XQCCP0YC3D/start';

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.3 })
                .fromTo('.h-eyebrow', { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 })
                .fromTo('.h-title',   { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1 }, '-=0.3')
                .fromTo('.h-rule',    { scaleX: 0, autoAlpha: 0 }, { scaleX: 1, autoAlpha: 1, duration: 0.7, transformOrigin: 'left center' }, '-=0.3')
                .fromTo('.h-body',    { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9 }, '-=0.4')
                .fromTo('.h-cta',     { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.75 }, '-=0.4')
                .fromTo('.h-proof',   { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.65 }, '-=0.3')
                .fromTo('.h-pills',   { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6  }, '-=0.3');
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative w-full min-h-[100svh] overflow-hidden flex items-center"
            style={{ background: 'linear-gradient(140deg, #FAF7F2 0%, #F5EDE0 40%, #F8F0E6 70%, #FAF7F2 100%)' }}
        >
            {/* Subtle background texture image */}
            <div className="absolute inset-0 z-0" aria-hidden="true">
                <img
                    src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=1600&q=70&auto=format&fit=crop"
                    alt=""
                    className="w-full h-full object-cover"
                    style={{ opacity: 0.06 }}
                />
                <div className="absolute inset-0" style={{
                    background: 'linear-gradient(140deg, #FAF7F2 0%, rgba(250,247,242,0.55) 45%, rgba(245,237,224,0.85) 100%)'
                }} />
            </div>

            {/* Rich decorative background */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
                {/* Large atmospheric orbs */}
                <div style={{
                    position: 'absolute', top: '-10%', right: '-5%',
                    width: 700, height: 700, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(196,160,80,0.18) 0%, rgba(168,136,60,0.06) 45%, transparent 70%)',
                }} />
                <div style={{
                    position: 'absolute', bottom: '-15%', left: '-8%',
                    width: 580, height: 580, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(160,19,77,0.07) 0%, transparent 65%)',
                }} />
                <div style={{
                    position: 'absolute', top: '35%', right: '28%',
                    width: 280, height: 280, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(196,160,80,0.09) 0%, transparent 70%)',
                }} />

                {/* Gold vertical rule on far right — desktop only */}
                <div className="hidden lg:block" style={{
                    position: 'absolute', right: '7%', top: '18%', bottom: '18%',
                    width: '1px',
                    background: 'linear-gradient(180deg, transparent, rgba(168,136,60,0.2) 30%, rgba(196,160,80,0.35) 60%, transparent)',
                }} />

                {/* Spinning rings */}
                <div style={{
                    position: 'absolute', bottom: '14%', right: '8%',
                    width: 130, height: 130, borderRadius: '50%',
                    border: '1px dashed rgba(168,136,60,0.25)',
                    animation: 'spin-slow 32s linear infinite',
                }} />
                <div style={{
                    position: 'absolute', bottom: '13%', right: '8.7%',
                    width: 96, height: 96, borderRadius: '50%',
                    border: '1px solid rgba(168,136,60,0.1)',
                    animation: 'spin-slow 20s linear infinite reverse',
                }} />
                <div style={{
                    position: 'absolute', top: '22%', left: '54%',
                    width: 44, height: 44, borderRadius: '50%',
                    border: '1px solid rgba(168,136,60,0.14)',
                    animation: 'spin-slow 18s linear infinite reverse',
                }} />

                {/* Sparkle cluster */}
                <div style={{ position: 'absolute', top: '17%', right: '21%', fontSize: '13px', color: 'rgba(168,136,60,0.4)', animation: 'pulse-soft 4s ease-in-out infinite' }}>✦</div>
                <div style={{ position: 'absolute', top: '24%', right: '17%', fontSize: '7px', color: 'rgba(168,136,60,0.22)', animation: 'pulse-soft 5s ease-in-out infinite 0.8s' }}>✦</div>
                <div style={{ position: 'absolute', bottom: '30%', left: '47%', fontSize: '8px', color: 'rgba(168,136,60,0.22)', animation: 'pulse-soft 5.5s ease-in-out infinite 1.5s' }}>✦</div>
                <div style={{ position: 'absolute', top: '55%', right: '12%', fontSize: '10px', color: 'rgba(168,136,60,0.18)', animation: 'pulse-soft 6s ease-in-out infinite 2s' }}>✦</div>

                {/* Floating dots */}
                <div style={{ position: 'absolute', top: '42%', right: '4.5%', width: 6, height: 6, borderRadius: '50%', background: 'rgba(168,136,60,0.3)', animation: 'float 8s ease-in-out infinite' }} />
                <div style={{ position: 'absolute', top: '62%', right: '6%', width: 4, height: 4, borderRadius: '50%', background: 'rgba(196,160,80,0.22)', animation: 'float 11s ease-in-out infinite 2s' }} />
                <div style={{ position: 'absolute', top: '28%', left: '48%', width: 3, height: 3, borderRadius: '50%', background: 'rgba(168,136,60,0.28)', animation: 'float 9s ease-in-out infinite 1s' }} />

                {/* Diagonal gold stripe — subtle */}
                <div className="hidden lg:block" style={{
                    position: 'absolute', top: 0, right: 0,
                    width: '38%', height: '100%',
                    background: 'linear-gradient(135deg, transparent 60%, rgba(196,160,80,0.04) 100%)',
                }} />
            </div>

            {/* Large watermark word */}
            <div
                className="absolute right-[-2%] top-1/2 -translate-y-1/2 select-none pointer-events-none leading-none font-display font-black hidden lg:block"
                aria-hidden="true"
                style={{
                    fontSize: 'clamp(12rem, 20vw, 26rem)',
                    color: 'transparent',
                    WebkitTextStroke: '1px rgba(168,136,60,0.08)',
                    letterSpacing: '-0.05em',
                    lineHeight: 1,
                }}>
                Radiance
            </div>

            {/* ── Main content ── */}
            <div className="relative z-10 w-full max-w-[1340px] mx-auto px-5 sm:px-8 lg:px-16 xl:px-24 min-h-[100svh] flex flex-col justify-center pt-20 sm:pt-24 md:pt-[104px] pb-12 md:pb-16">

                {/* Eyebrow */}
                <div className="h-eyebrow flex items-center gap-2.5 mb-6 md:mb-9" style={{ opacity: 0 }}>
                    <span className="w-7 h-px block" style={{ background: 'rgba(168,136,60,0.5)' }} />
                    <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.55em]"
                        style={{ color: 'rgba(168,136,60,0.9)' }}>
                        Beaumont · Alberta
                    </span>
                    <span style={{ fontSize: '7px', color: 'rgba(168,136,60,0.45)' }}>✦</span>
                </div>

                {/* Heading */}
                <div className="h-title overflow-visible mb-6 md:mb-8 max-w-[860px]" style={{ opacity: 0 }}>
                    <h1 className="font-display tracking-[-0.03em]" style={{ lineHeight: 0.88 }}>
                        <span style={{
                            display: 'block',
                            fontSize: 'clamp(2.9rem, 7.5vw, 9rem)',
                            fontWeight: 300,
                            fontStyle: 'italic',
                            color: '#2C2010',
                        }}>
                            Reveal Your
                        </span>
                        <span style={{
                            display: 'block',
                            fontSize: 'clamp(2.9rem, 7.5vw, 9rem)',
                            fontWeight: 700,
                            color: '#1A1008',
                        }}>
                            Radiance
                        </span>
                    </h1>
                </div>

                {/* Gold rule */}
                <div className="h-rule h-px w-14 mb-6 md:mb-8 origin-left"
                    style={{ background: 'linear-gradient(90deg, rgba(168,136,60,0.7), rgba(196,160,80,0.3))', opacity: 0 }} />

                {/* Body + CTAs */}
                <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-20">

                    {/* Intro */}
                    <p className="h-body font-sans leading-[1.85] max-w-[400px]"
                        style={{ fontSize: '15px', color: 'rgba(44,32,16,0.54)', opacity: 0 }}>
                        Advanced laser hair removal, HydraFacials, microneedling &amp; more —
                        thoughtfully crafted for{' '}
                        <span style={{ color: 'rgba(44,32,16,0.78)', fontWeight: 500 }}>
                            your unique skin in Beaumont, Alberta.
                        </span>
                    </p>

                    {/* CTAs + proof */}
                    <div className="flex flex-col gap-5">
                        <div className="h-cta flex flex-wrap items-center gap-3" style={{ opacity: 0 }}>
                            <a
                                href={SQUARE_BOOKING_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:opacity-90 active:scale-[0.97]"
                                style={{
                                    background: 'linear-gradient(135deg, #A8883C, #C4A050)',
                                    boxShadow: '0 10px 32px rgba(168,136,60,0.38)',
                                }}>
                                <CalendarCheck className="w-4 h-4 flex-shrink-0" />
                                <span>Book Now</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                            </a>
                            <Link
                                href="/services"
                                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 active:scale-[0.97]"
                                style={{
                                    border: '1px solid rgba(168,136,60,0.3)',
                                    color: 'rgba(44,32,16,0.6)',
                                    background: 'rgba(168,136,60,0.04)',
                                }}>
                                <span>View Services</span>
                            </Link>
                        </div>

                        {/* Social proof */}
                        <div className="h-proof flex items-center gap-3" style={{ opacity: 0 }}>
                            <div className="flex -space-x-2">
                                {['#A8883C', '#A0134D', '#C4A050', '#7A5C25'].map((c, i) => (
                                    <div key={i}
                                        className="w-7 h-7 rounded-full border-2 text-[7px] font-bold text-white flex items-center justify-center"
                                        style={{ borderColor: '#FAF7F2', background: c }}>
                                        {['S', 'E', 'J', 'P'][i]}
                                    </div>
                                ))}
                            </div>
                            <span className="text-[11px] font-sans" style={{ color: 'rgba(44,32,16,0.4)' }}>
                                <strong style={{ color: 'rgba(44,32,16,0.62)', fontWeight: 600 }}>4.9 ★</strong>
                                {' '}· Trusted by 200+ clients
                            </span>
                        </div>
                    </div>
                </div>

                {/* Service pills */}
                <div className="h-pills flex flex-wrap items-center gap-2 mt-9 md:mt-14" style={{ opacity: 0 }}>
                    {['Laser Hair Removal', 'HydraFacial', 'Microneedling', 'Threading', 'Waxing', 'Dermaplaning'].map((s) => (
                        <Link key={s} href="/services"
                            className="px-3.5 py-1.5 rounded-full font-sans text-[9.5px] font-medium uppercase tracking-[0.16em] transition-all duration-200"
                            style={{
                                border: '1px solid rgba(168,136,60,0.2)',
                                color: 'rgba(44,32,16,0.42)',
                                background: 'rgba(255,255,255,0.5)',
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(168,136,60,0.5)';
                                (e.currentTarget as HTMLElement).style.color = 'rgba(168,136,60,0.9)';
                                (e.currentTarget as HTMLElement).style.background = 'rgba(168,136,60,0.06)';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(168,136,60,0.2)';
                                (e.currentTarget as HTMLElement).style.color = 'rgba(44,32,16,0.42)';
                                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.5)';
                            }}>
                            {s}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
