'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Star, CheckCircle2, Tag } from 'lucide-react';
import gsap from 'gsap';
import { WHATSAPP_NUMBER } from '../constants/services';

const Hero = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const imgRef = useRef<HTMLDivElement>(null);
    const badge1Ref = useRef<HTMLDivElement>(null);
    const badge2Ref = useRef<HTMLDivElement>(null);
    const promoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 1.3 });

            tl.fromTo('.hero-eyebrow',
                { y: 16, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6 }
            )
                .fromTo('.hero-line',
                    { y: 80, opacity: 0, skewY: 3 },
                    { y: 0, opacity: 1, skewY: 0, duration: 1.1, stagger: 0.1 },
                    '-=0.2'
                )
                .fromTo('.hero-sub',
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8 },
                    '-=0.5'
                )
                .fromTo('.hero-cta',
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8 },
                    '-=0.6'
                )
                .fromTo(promoRef.current,
                    { y: 24, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8 },
                    '-=0.5'
                )
                .fromTo(imgRef.current,
                    { x: 60, opacity: 0, scale: 1.04 },
                    { x: 0, opacity: 1, scale: 1, duration: 1.4, ease: 'expo.out' },
                    '-=1.8'
                )
                .fromTo([badge1Ref.current, badge2Ref.current],
                    { scale: 0.7, opacity: 0, y: 20 },
                    { scale: 1, opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.7)', stagger: 0.18 },
                    '-=0.9'
                );

            // Idle floats
            gsap.to(badge1Ref.current, { y: '-=8', duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 3.2 });
            gsap.to(badge2Ref.current, { y: '+=6', rotation: '+=0.8', duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 3.8 });
            gsap.to(promoRef.current, { y: '-=5', duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 4 });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative min-h-[100svh] w-full overflow-hidden pt-[80px]"
            style={{ background: 'linear-gradient(130deg, #FDFAF7 0%, #FBF6F8 45%, #F9F5FD 100%)' }}
        >
            <div className="w-full max-w-[1380px] mx-auto px-6 md:px-12 lg:px-16 min-h-[calc(100svh-80px)] grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-6 items-center py-12 lg:py-0">

                {/* ── LEFT: Text ──────────────────────────────────────────────── */}
                <div className="flex flex-col justify-center order-2 lg:order-1 lg:pr-8 xl:pr-14">

                    {/* Eyebrow */}
                    <div className="hero-eyebrow opacity-0 flex items-center gap-3 mb-7">
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400 stroke-amber-400" />)}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.45em] text-charcoal/45 font-sans">Beaumont's Premier Laser & Beauty Clinic</span>
                    </div>

                    {/* Headline — 4 lines matching reference */}
                    <div className="mb-8 space-y-0.5">
                        <div className="overflow-hidden">
                            <h1 className="hero-line opacity-0 font-display text-[2.8rem] sm:text-[3.5rem] md:text-[4.2rem] lg:text-[4.5rem] xl:text-[5rem] font-bold text-charcoal leading-[1.05] tracking-[-0.02em] uppercase">
                                Care for
                            </h1>
                        </div>
                        <div className="overflow-hidden">
                            <h1
                                className="hero-line opacity-0 font-display text-[2.8rem] sm:text-[3.5rem] md:text-[4.2rem] lg:text-[4.5rem] xl:text-[5rem] leading-[0.9] tracking-[-0.02em]"
                                style={{
                                    background: 'linear-gradient(135deg, #A0134D 0%, #C2185B 40%, #9A7B4F 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontWeight: 300,
                                    fontStyle: 'italic',
                                }}
                            >
                                your skin,
                            </h1>
                        </div>
                        <div className="overflow-hidden">
                            <h1 className="hero-line opacity-0 font-display text-[2.8rem] sm:text-[3.5rem] md:text-[4.2rem] lg:text-[4.5rem] xl:text-[5rem] font-bold text-charcoal leading-[0.9] tracking-[-0.02em] uppercase">
                                care for
                            </h1>
                        </div>
                        <div className="overflow-hidden">
                            <h1
                                className="hero-line opacity-0 font-display text-[2.8rem] sm:text-[3.5rem] md:text-[4.2rem] lg:text-[4.5rem] xl:text-[5rem] leading-[0.9] tracking-[-0.02em]"
                                style={{
                                    background: 'linear-gradient(135deg, #A0134D 0%, #C2185B 40%, #9A7B4F 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontWeight: 300,
                                    fontStyle: 'italic',
                                }}
                            >
                                your beauty.
                            </h1>
                        </div>
                    </div>

                    {/* Subtext */}
                    <p className="hero-sub opacity-0 text-charcoal/50 text-[15px] md:text-[16px] leading-relaxed max-w-[390px] mb-9 font-medium">
                        Advanced Beauty &amp; Laser Treatments for Men &amp; Women in Beaumont — where modern technology meets personalized skincare for{' '}
                        <span className="text-charcoal font-bold">visible, lasting results.</span>
                    </p>

                    {/* CTAs */}
                    <div className="hero-cta opacity-0 flex flex-wrap items-center gap-3 mb-10">
                        <Link
                            href="#services"
                            className="inline-flex items-center gap-2.5 bg-charcoal text-white px-7 py-4 rounded-full text-[12px] font-black uppercase tracking-[0.15em] hover:bg-deep-rose transition-all duration-300 shadow-lg hover:shadow-deep-rose/25 group active:scale-95"
                        >
                            <span>Explore Services</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20R.D.%20Beauty%20%26%20Laser%20Clinic!%20I'd%20like%20to%20book%20a%20consultation.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 border border-charcoal/20 text-charcoal px-7 py-4 rounded-full text-[12px] font-black uppercase tracking-[0.15em] hover:bg-charcoal/5 transition-all duration-300 active:scale-95"
                        >
                            <div className="w-7 h-7 rounded-full bg-charcoal/[0.07] flex items-center justify-center">
                                <Play className="w-3 h-3 fill-charcoal ml-0.5" />
                            </div>
                            <span>Book Consult</span>
                        </a>
                    </div>

                    {/* Promo badge */}
                    <div ref={promoRef} className="opacity-0 w-fit">
                        <div
                            className="flex items-center gap-4 rounded-[1.5rem] px-5 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.14)]"
                            style={{ background: '#1A1A1E' }}
                        >
                            <div
                                className="w-11 h-11 rounded-[0.875rem] flex items-center justify-center flex-shrink-0"
                                style={{ background: 'linear-gradient(135deg, #A0134D, #9A7B4F)' }}
                            >
                                <Tag className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="font-display text-[1.2rem] font-bold text-white leading-none">Up to 20% Off</p>
                                <p className="text-[10px] text-white/45 mt-0.5 font-sans">
                                    Save on holiday packages — code{' '}
                                    <span className="font-black" style={{ color: '#D4A843' }}>GLOW2024</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: Image ─────────────────────────────────────────────── */}
                <div
                    ref={imgRef}
                    className="relative order-1 lg:order-2 flex justify-center lg:justify-end opacity-0"
                    style={{ height: 'clamp(440px, 72vw, 700px)' }}
                >
                    <div className="relative w-full max-w-[520px] lg:max-w-none h-full">

                        {/* Main image */}
                        <div className="w-full h-full rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.10)] border-[5px] border-white ring-1 ring-black/[0.05]">
                            <img
                                src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=900&q=90&auto=format&fit=crop&crop=faces,top"
                                alt="R.D. Beauty & Laser Clinic"
                                className="w-full h-full object-cover object-top"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#FDFAF7]/25 to-transparent pointer-events-none" />
                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/15 to-transparent pointer-events-none" />
                        </div>

                        {/* Floating badge 1 — review */}
                        <div
                            ref={badge1Ref}
                            className="absolute top-[12%] left-2 sm:-left-10 opacity-0 z-10"
                        >
                            <div className="bg-white rounded-[1.25rem] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.10)] border border-black/[0.05] w-[170px]">
                                <div className="flex items-center gap-2 mb-2.5">
                                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#FDF6F8] flex-shrink-0">
                                        <img src="https://i.pravatar.cc/60?u=rbbeauty1" alt="reviewer" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-amber-400 stroke-amber-400" />)}
                                    </div>
                                </div>
                                <p className="text-[11px] font-bold text-charcoal leading-snug">"Skin has never looked better!"</p>
                                <p className="text-[9px] text-charcoal/35 font-medium mt-1 font-sans">— Sarah J., Toronto</p>
                            </div>
                        </div>

                        {/* Floating badge 2 — service card */}
                        <div
                            ref={badge2Ref}
                            className="absolute bottom-[18%] left-2 sm:-left-10 opacity-0 z-10"
                        >
                            <div className="bg-white rounded-[1.25rem] overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.10)] border border-black/[0.05] w-[185px]">
                                <div className="h-[70px] overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400&q=80&auto=format&fit=crop"
                                        alt="Brightening Facial"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-3.5">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-charcoal/35 mb-0.5 font-sans">Most Popular</p>
                                    <p className="font-display text-[14px] text-charcoal font-bold leading-tight">Brightening Facial</p>
                                    <div className="flex items-center justify-between mt-1.5">
                                        <span className="font-black text-[15px] text-deep-rose">$110</span>
                                        <div className="flex items-center gap-1">
                                            <CheckCircle2 className="w-3 h-3 text-[#1a9d82]" />
                                            <span className="text-[9px] text-charcoal/40 font-semibold font-sans">Available</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative rings */}
                        <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full border-2 border-deep-rose/15 animate-spin-slow pointer-events-none" />
                        <div className="absolute bottom-8 -right-2 w-10 h-10 rounded-full border border-warm-gold/25 animate-pulse-soft pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-ivory/40 to-transparent pointer-events-none" />
        </section>
    );
};

export default Hero;
