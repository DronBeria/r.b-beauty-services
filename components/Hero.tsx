'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

const BG_WORDS = ['Beauty', 'Radiance', 'Glow', 'Laser', 'Skin', 'Atelier'];

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const [wordIdx, setWordIdx] = useState(0);
    const [fading, setFading] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setFading(true);
            setTimeout(() => {
                setWordIdx((i: number) => (i + 1) % BG_WORDS.length);
                setFading(false);
            }, 700);
        }, 3200);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.2 })
                .fromTo('.h-eyebrow',  { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 })
                .fromTo('.h-word',     { y: 110, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.11, duration: 1.15 }, '-=0.3')
                .fromTo('.h-rule',     { scaleX: 0, autoAlpha: 0 }, { scaleX: 1, autoAlpha: 1, duration: 0.9, transformOrigin: 'left' }, '-=0.2')
                .fromTo('.h-body',     { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.85 }, '-=0.5')
                .fromTo('.h-ctas',     { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.75 }, '-=0.5')
                .fromTo('.h-proof',    { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.65 }, '-=0.4')
                .fromTo('.h-scroll',   { y: 8,  autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6  }, '-=0.3');
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative w-full min-h-[100svh] overflow-hidden flex items-center"
            style={{ background: '#fdecd8' }}
        >
            {/* ── Keyframe animations ── */}
            <style>{`
                @keyframes pulse-soft {
                    0%, 100% { opacity: 0.35; transform: scale(1); }
                    50%       { opacity: 0.9;  transform: scale(1.25); }
                }
                @keyframes float-a {
                    0%, 100% { transform: translateY(0px); }
                    50%      { transform: translateY(-13px); }
                }
                @keyframes float-b {
                    0%, 100% { transform: translateY(0px); }
                    50%      { transform: translateY(-19px); }
                }
                @keyframes float-c {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    50%      { transform: translateY(-9px) translateX(6px); }
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
            `}</style>

            {/* ── Decorative background accents ── */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
                {/* Floating dots */}
                <div style={{ position: 'absolute', top: '22%', left: '58%', width: 5, height: 5, borderRadius: '50%', background: 'rgba(19,19,19,0.07)', animation: 'float-a 7s ease-in-out infinite' }} />
                <div style={{ position: 'absolute', top: '70%', left: '76%', width: 3.5, height: 3.5, borderRadius: '50%', background: 'rgba(19,19,19,0.05)', animation: 'float-b 9s ease-in-out infinite 0.8s' }} />
                <div style={{ position: 'absolute', top: '44%', right: '5%', width: 6, height: 6, borderRadius: '50%', border: '1px solid rgba(19,19,19,0.08)', animation: 'float-c 8s ease-in-out infinite 0.3s' }} />
                {/* Slowly spinning dashed ring */}
                <div style={{ position: 'absolute', bottom: '11%', right: '10%', width: 96, height: 96, borderRadius: '50%', border: '1px dashed rgba(19,19,19,0.08)', animation: 'spin-slow 28s linear infinite' }} />
                {/* Small ✦ sparkle accents */}
                <div style={{ position: 'absolute', top: '16%', right: '23%', fontSize: '10px', color: 'rgba(19,19,19,0.09)', animation: 'pulse-soft 4.5s ease-in-out infinite 1s' }}>✦</div>
                <div style={{ position: 'absolute', bottom: '26%', left: '47%', fontSize: '8px',  color: 'rgba(19,19,19,0.07)', animation: 'pulse-soft 5.5s ease-in-out infinite 2s' }}>✦</div>
            </div>

            {/* ── Subtle large background text for depth ── */}
            <div
                className="absolute right-[-2%] top-1/2 -translate-y-1/2 select-none pointer-events-none leading-none font-display font-black hidden lg:block"
                style={{
                    fontSize: 'clamp(12rem, 22vw, 28rem)',
                    color: 'transparent',
                    WebkitTextStroke: '1.5px rgba(19,19,19,0.055)',
                    letterSpacing: '-0.05em',
                    lineHeight: 1,
                    opacity: fading ? 0 : 1,
                    transition: 'opacity 0.7s ease-in-out',
                }}>
                {BG_WORDS[wordIdx]}
            </div>

            {/* ── Content ── */}
            <div className="relative z-10 w-full max-w-[1340px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 min-h-[100svh] flex flex-col justify-center pt-[96px] pb-16">

                {/* Eyebrow */}
                <div className="h-eyebrow flex items-center gap-3 mb-10" style={{ opacity: 0 }}>
                    <span className="w-6 h-px block" style={{ background: 'rgba(19,19,19,0.2)' }} />
                    <span className="font-sans text-[9.5px] font-bold uppercase tracking-[0.55em]"
                        style={{ color: 'rgba(19,19,19,0.35)' }}>
                        Beaumont · Alberta
                    </span>
                    <span style={{ fontSize: '8px', color: 'rgba(19,19,19,0.22)', animation: 'pulse-soft 3.5s ease-in-out infinite' }}>✦</span>
                </div>

                {/* Headline */}
                <div className="mb-10 max-w-[820px]">
                    <div className="overflow-hidden">
                        <h1 className="h-word font-display tracking-[-0.03em]"
                            style={{
                                fontSize: 'clamp(4rem, 8vw, 9.5rem)',
                                lineHeight: 0.85,
                                fontWeight: 300,
                                fontStyle: 'italic',
                                color: '#131313',
                                opacity: 0,
                            }}>
                            Reveal Your
                        </h1>
                    </div>
                    <div className="overflow-hidden">
                        <h1 className="h-word font-display tracking-[-0.03em]"
                            style={{
                                fontSize: 'clamp(4rem, 8vw, 9.5rem)',
                                lineHeight: 0.88,
                                fontWeight: 800,
                                color: '#131313',
                                opacity: 0,
                            }}>
                            Radiance
                        </h1>
                    </div>
                </div>

                {/* Rule */}
                <div className="h-rule h-px w-14 mb-8 origin-left" style={{ background: 'rgba(19,19,19,0.15)', opacity: 0 }} />

                {/* Body + CTAs — side by side on md+ */}
                <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16">

                    {/* Body */}
                    <p className="h-body font-sans leading-[1.95] max-w-[400px]"
                        style={{ fontSize: '15px', color: 'rgba(19,19,19,0.44)', opacity: 0 }}>
                        Bespoke treatments — laser hair removal, HydraFacials,
                        microneedling &amp; more — thoughtfully crafted for{' '}
                        <span style={{ color: 'rgba(19,19,19,0.72)', fontWeight: 600 }}>
                            your unique skin in Beaumont, Alberta.
                        </span>
                    </p>

                    {/* CTAs + proof */}
                    <div className="flex flex-col gap-6">
                        <div className="h-ctas flex flex-wrap items-center gap-3" style={{ opacity: 0 }}>
                            <Link
                                href="#book"
                                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:opacity-80 active:scale-95"
                                style={{ background: '#131313', boxShadow: '0 8px 28px rgba(19,19,19,0.14)' }}>
                                <span>Book Now</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
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
                                <strong style={{ color: 'rgba(19,19,19,0.62)', fontWeight: 700 }}>4.9 ★</strong>
                                {' '}· Trusted by 200+ clients across Beaumont
                            </span>
                        </div>
                    </div>
                </div>

                {/* Services tags strip */}
                <div className="h-scroll flex flex-wrap items-center gap-2 mt-14" style={{ opacity: 0 }}>
                    {['Laser Hair Removal', 'HydraFacial', 'Microneedling', 'Threading', 'Waxing', 'Dermaplaning'].map((s) => (
                        <Link key={s} href="#services"
                            className="px-4 py-1.5 rounded-full font-sans text-[10px] font-semibold uppercase tracking-[0.2em] transition-all duration-200 hover:bg-black/[0.06]"
                            style={{ border: '1px solid rgba(19,19,19,0.12)', color: 'rgba(19,19,19,0.4)' }}>
                            {s}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
