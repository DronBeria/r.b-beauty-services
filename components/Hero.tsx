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
                .fromTo('.h-eyebrow',  { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 })
                .fromTo('.h-title',    { y: 60, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.2 }, '-=0.3')
                .fromTo('.h-rule',     { scaleX: 0, autoAlpha: 0 }, { scaleX: 1, autoAlpha: 1, duration: 0.8, transformOrigin: 'left center' }, '-=0.4')
                .fromTo('.h-body',     { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9 }, '-=0.5')
                .fromTo('.h-cta',      { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.75 }, '-=0.5')
                .fromTo('.h-proof',    { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.65 }, '-=0.4')
                .fromTo('.h-pills',    { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6  }, '-=0.3');
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative w-full min-h-[100svh] overflow-hidden flex items-center"
            style={{ background: 'linear-gradient(135deg, #FAF7F2 0%, #F5EFE6 50%, #FAF7F2 100%)' }}
        >
            {/* Decorative elements */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
                {/* Gold orb top-right */}
                <div style={{
                    position: 'absolute', top: '-10%', right: '-5%',
                    width: 600, height: 600, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(184,149,106,0.12) 0%, transparent 70%)',
                }} />
                {/* Soft rose orb bottom-left */}
                <div style={{
                    position: 'absolute', bottom: '-15%', left: '-8%',
                    width: 500, height: 500, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(160,19,77,0.06) 0%, transparent 70%)',
                }} />
                {/* Spinning dashed ring */}
                <div style={{
                    position: 'absolute', bottom: '12%', right: '8%',
                    width: 120, height: 120, borderRadius: '50%',
                    border: '1px dashed rgba(154,123,79,0.2)',
                    animation: 'spin-slow 32s linear infinite',
                }} />
                {/* Small ring */}
                <div style={{
                    position: 'absolute', top: '20%', left: '55%',
                    width: 48, height: 48, borderRadius: '50%',
                    border: '1px solid rgba(154,123,79,0.15)',
                    animation: 'spin-slow 20s linear infinite reverse',
                }} />
                {/* Sparkle dots */}
                <div style={{ position: 'absolute', top: '18%', right: '22%', fontSize: '11px', color: 'rgba(154,123,79,0.3)', animation: 'pulse-soft 4s ease-in-out infinite' }}>✦</div>
                <div style={{ position: 'absolute', bottom: '28%', left: '48%', fontSize: '8px', color: 'rgba(154,123,79,0.2)', animation: 'pulse-soft 5.5s ease-in-out infinite 1.5s' }}>✦</div>
                <div style={{ position: 'absolute', top: '40%', right: '5%', width: 5, height: 5, borderRadius: '50%', background: 'rgba(154,123,79,0.25)', animation: 'float 8s ease-in-out infinite' }} />
            </div>

            {/* Large background word for depth */}
            <div
                className="absolute right-[-2%] top-1/2 -translate-y-1/2 select-none pointer-events-none leading-none font-display font-black hidden lg:block"
                style={{
                    fontSize: 'clamp(12rem, 20vw, 26rem)',
                    color: 'transparent',
                    WebkitTextStroke: '1px rgba(154,123,79,0.08)',
                    letterSpacing: '-0.05em',
                    lineHeight: 1,
                }}>
                Radiance
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-[1340px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 min-h-[100svh] flex flex-col justify-center pt-[96px] pb-16">

                {/* Eyebrow label */}
                <div className="h-eyebrow flex items-center gap-3 mb-10" style={{ opacity: 0 }}>
                    <span className="w-8 h-px block" style={{ background: 'rgba(154,123,79,0.4)' }} />
                    <span className="font-sans text-[9.5px] font-semibold uppercase tracking-[0.55em]"
                        style={{ color: 'rgba(154,123,79,0.8)' }}>
                        Beaumont · Alberta
                    </span>
                    <span style={{ fontSize: '8px', color: 'rgba(154,123,79,0.4)' }}>✦</span>
                </div>

                {/* Main heading */}
                <div className="h-title overflow-visible mb-8 max-w-[860px]" style={{ opacity: 0 }}>
                    <h1 className="font-display leading-[0.88] tracking-[-0.03em]">
                        <span style={{
                            display: 'block',
                            fontSize: 'clamp(3.8rem, 7.5vw, 9rem)',
                            fontWeight: 300,
                            fontStyle: 'italic',
                            color: '#2C2420',
                        }}>
                            Reveal Your
                        </span>
                        <span style={{
                            display: 'block',
                            fontSize: 'clamp(3.8rem, 7.5vw, 9rem)',
                            fontWeight: 700,
                            color: '#1A1410',
                        }}>
                            Radiance
                        </span>
                    </h1>
                </div>

                {/* Gold rule */}
                <div className="h-rule h-px w-16 mb-8 origin-left" style={{ background: 'rgba(154,123,79,0.45)', opacity: 0 }} />

                {/* Body + CTAs */}
                <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-20">

                    {/* Intro text */}
                    <p className="h-body font-sans leading-[1.9] max-w-[420px]"
                        style={{ fontSize: '15.5px', color: 'rgba(44,36,32,0.52)', opacity: 0 }}>
                        Advanced laser hair removal, HydraFacials, microneedling &amp; more —
                        thoughtfully crafted for{' '}
                        <span style={{ color: 'rgba(44,36,32,0.78)', fontWeight: 500 }}>
                            your unique skin in Beaumont, Alberta.
                        </span>
                    </p>

                    {/* CTA buttons + social proof */}
                    <div className="flex flex-col gap-6">
                        <div className="h-cta flex flex-wrap items-center gap-3" style={{ opacity: 0 }}>
                            <a
                                href={SQUARE_BOOKING_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:opacity-90 active:scale-95"
                                style={{ background: 'linear-gradient(135deg, #9A7B4F, #B8956A)', boxShadow: '0 12px 36px rgba(154,123,79,0.35)' }}>
                                <CalendarCheck className="w-4 h-4" />
                                <span>Book Now</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </a>
                            <Link
                                href="/services"
                                className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-warm-gold/8 active:scale-95"
                                style={{ border: '1px solid rgba(154,123,79,0.35)', color: 'rgba(44,36,32,0.65)' }}>
                                <span>View Services</span>
                            </Link>
                        </div>

                        {/* Social proof */}
                        <div className="h-proof flex items-center gap-4" style={{ opacity: 0 }}>
                            <div className="flex -space-x-2">
                                {['#9A7B4F', '#A0134D', '#B8956A', '#7A5C35'].map((c, i) => (
                                    <div key={i}
                                        className="w-7 h-7 rounded-full border-2 text-[7px] font-bold text-white flex items-center justify-center"
                                        style={{ borderColor: '#FAF7F2', background: c }}>
                                        {['S', 'E', 'J', 'P'][i]}
                                    </div>
                                ))}
                            </div>
                            <span className="text-[11px] font-sans" style={{ color: 'rgba(44,36,32,0.38)' }}>
                                <strong style={{ color: 'rgba(44,36,32,0.6)', fontWeight: 600 }}>4.9 ★</strong>
                                {' '}· Trusted by 200+ clients in Beaumont
                            </span>
                        </div>
                    </div>
                </div>

                {/* Service pills — link to /services */}
                <div className="h-pills flex flex-wrap items-center gap-2 mt-14" style={{ opacity: 0 }}>
                    {['Laser Hair Removal', 'HydraFacial', 'Microneedling', 'Threading', 'Waxing', 'Dermaplaning'].map((s) => (
                        <Link key={s} href="/services"
                            className="px-4 py-1.5 rounded-full font-sans text-[10px] font-medium uppercase tracking-[0.18em] transition-all duration-200 hover:border-warm-gold/40 hover:text-warm-gold"
                            style={{ border: '1px solid rgba(154,123,79,0.2)', color: 'rgba(44,36,32,0.4)' }}>
                            {s}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
