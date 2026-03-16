'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Star, Sparkles, CalendarCheck, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { WHATSAPP_NUMBER } from '../constants/services';

const STATS = [
    { value: '500+', label: 'Happy Clients' },
    { value: '10+', label: 'Years Experience' },
    { value: '5.0★', label: 'Client Rating' },
    { value: 'FDA', label: 'Approved Tech' },
];

const Hero = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const eyebrowRef = useRef<HTMLDivElement>(null);
    const line1Ref = useRef<HTMLDivElement>(null);
    const line2Ref = useRef<HTMLDivElement>(null);
    const line3Ref = useRef<HTMLDivElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLDivElement>(null);
    const badge1Ref = useRef<HTMLDivElement>(null);
    const badge2Ref = useRef<HTMLDivElement>(null);
    const orbRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 1.5 });

            // Background orb
            gsap.fromTo(orbRef.current,
                { scale: 0.6, opacity: 0 },
                { scale: 1, opacity: 1, duration: 2.5, ease: 'power2.out', delay: 1.3 }
            );

            // Staggered headline lines
            tl.fromTo(eyebrowRef.current,
                { y: 16, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7 }
            )
            .fromTo(line1Ref.current,
                { y: 60, opacity: 0, skewY: 4 },
                { y: 0, opacity: 1, skewY: 0, duration: 1 },
                '-=0.3'
            )
            .fromTo(line2Ref.current,
                { y: 60, opacity: 0, skewY: 4 },
                { y: 0, opacity: 1, skewY: 0, duration: 1 },
                '-=0.8'
            )
            .fromTo(line3Ref.current,
                { y: 60, opacity: 0, skewY: 4 },
                { y: 0, opacity: 1, skewY: 0, duration: 1 },
                '-=0.8'
            )
            .fromTo(subRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                '-=0.5'
            )
            .fromTo(ctaRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                '-=0.6'
            )
            .fromTo(statsRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                '-=0.5'
            )
            // Image entrance
            .fromTo(imgRef.current,
                { x: 60, opacity: 0, scale: 1.04 },
                { x: 0, opacity: 1, scale: 1, duration: 1.3, ease: 'expo.out' },
                '-=1.6'
            )
            .fromTo([badge1Ref.current, badge2Ref.current],
                { scale: 0.7, opacity: 0, y: 20 },
                { scale: 1, opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.7)', stagger: 0.15 },
                '-=0.8'
            );

            // Idle float for image
            gsap.to(imgRef.current, {
                y: '-=14',
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: 3.5,
            });

            // Idle float for badges
            gsap.to(badge1Ref.current, {
                y: '-=8',
                rotation: '+=1.5',
                duration: 3.2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: 3.8,
            });
            gsap.to(badge2Ref.current, {
                y: '-=6',
                rotation: '-=1',
                duration: 2.8,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: 4.2,
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative min-h-[100svh] w-full flex items-center overflow-hidden pt-[80px]"
            style={{
                background: 'linear-gradient(135deg, #FBF8F5 0%, #FDF6F8 40%, #F9F5FF 70%, #FBF8F5 100%)',
            }}
        >
            {/* Background orb */}
            <div
                ref={orbRef}
                className="absolute inset-0 pointer-events-none"
                style={{ opacity: 0 }}
            >
                <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(160,19,77,0.08) 0%, transparent 70%)' }} />
                <div className="absolute bottom-[-15%] left-[-8%] w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(154,123,79,0.07) 0%, transparent 70%)' }} />
                <div className="absolute top-[30%] left-[40%] w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(160,19,77,0.04) 0%, transparent 70%)' }} />
            </div>

            <div className="relative z-10 w-full max-w-[1360px] mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                {/* ── LEFT: Text ─────────────────────────────────────────── */}
                <div className="flex flex-col order-2 lg:order-1">

                    {/* Eyebrow */}
                    <div
                        ref={eyebrowRef}
                        className="inline-flex items-center gap-2.5 mb-8"
                        style={{ opacity: 0 }}
                    >
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                            ))}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/50 font-sans">
                            Toronto's #1 Laser Clinic
                        </span>
                    </div>

                    {/* Headline — 3 lines with overflow clip for smooth reveal */}
                    <div className="mb-8 space-y-1">
                        <div className="overflow-hidden">
                            <div ref={line1Ref} style={{ opacity: 0 }}>
                                <h1 className="font-display text-[3.2rem] sm:text-[4rem] md:text-[4.8rem] lg:text-[5.2rem] font-bold text-charcoal leading-[0.92] tracking-[-0.02em] uppercase">
                                    The Art
                                </h1>
                            </div>
                        </div>
                        <div className="overflow-hidden">
                            <div ref={line2Ref} style={{ opacity: 0 }}>
                                <h1 className="font-display text-[3.2rem] sm:text-[4rem] md:text-[4.8rem] lg:text-[5.2rem] font-light italic text-charcoal leading-[0.92] tracking-[-0.02em]"
                                    style={{ background: 'linear-gradient(135deg, #A0134D 0%, #C2185B 50%, #9A7B4F 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                                >
                                    of Radiance
                                </h1>
                            </div>
                        </div>
                        <div className="overflow-hidden">
                            <div ref={line3Ref} style={{ opacity: 0 }}>
                                <h1 className="font-display text-[3.2rem] sm:text-[4rem] md:text-[4.8rem] lg:text-[5.2rem] font-bold text-charcoal leading-[0.92] tracking-[-0.02em] uppercase">
                                    Redefined.
                                </h1>
                            </div>
                        </div>
                    </div>

                    {/* Subtext */}
                    <p
                        ref={subRef}
                        className="text-[15px] md:text-[16px] leading-relaxed text-charcoal/55 font-medium max-w-[400px] mb-10"
                        style={{ opacity: 0 }}
                    >
                        Premium laser hair removal, HydraFacials & clinical skin treatments — combining <span className="text-charcoal font-bold">medical precision</span> with luxury care.
                    </p>

                    {/* CTAs */}
                    <div
                        ref={ctaRef}
                        className="flex flex-wrap items-center gap-3 mb-12"
                        style={{ opacity: 0 }}
                    >
                        <Link
                            href="#services"
                            className="inline-flex items-center gap-2.5 bg-charcoal text-white px-7 py-4 rounded-full text-[13px] font-bold hover:bg-deep-rose transition-all duration-300 shadow-lg shadow-charcoal/15 hover:shadow-deep-rose/25 group active:scale-95"
                        >
                            <Sparkles className="w-4 h-4" />
                            <span>Explore Services</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20R.B%20Beauty!%20I'd%20like%20to%20book%20a%20consultation.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 border border-charcoal/20 text-charcoal px-7 py-4 rounded-full text-[13px] font-bold hover:bg-charcoal/5 transition-all duration-300 active:scale-95"
                        >
                            <CalendarCheck className="w-4 h-4" />
                            <span>Book Free Consult</span>
                        </a>
                    </div>

                    {/* Stats strip */}
                    <div
                        ref={statsRef}
                        className="flex flex-wrap gap-6 md:gap-8"
                        style={{ opacity: 0 }}
                    >
                        {STATS.map((s, i) => (
                            <div key={i} className="flex flex-col">
                                <span className="font-display text-xl md:text-2xl font-bold text-charcoal leading-none">{s.value}</span>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-charcoal/40 font-sans mt-1">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT: Image ────────────────────────────────────────── */}
                <div
                    ref={imgRef}
                    className="relative order-1 lg:order-2 flex justify-center lg:justify-end"
                    style={{ opacity: 0 }}
                >
                    {/* Main image */}
                    <div className="relative w-[300px] h-[380px] sm:w-[380px] sm:h-[480px] md:w-[420px] md:h-[530px]">
                        <div className="w-full h-full rounded-[3rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.12)] border-[6px] border-white ring-1 ring-black/[0.06]">
                            <img
                                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=90&auto=format&fit=crop"
                                alt="R.B Beauty Clinic"
                                className="w-full h-full object-cover"
                            />
                            {/* Subtle overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/15 to-transparent pointer-events-none" />
                        </div>

                        {/* Floating badge 1 — offer */}
                        <div
                            ref={badge1Ref}
                            className="absolute -left-8 top-[18%] w-[170px] rounded-[22px] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.08)] border border-white/80"
                            style={{
                                background: 'linear-gradient(135deg, rgba(160,19,77,0.85), rgba(154,123,79,0.85))',
                                backdropFilter: 'blur(20px)',
                                opacity: 0,
                            }}
                        >
                            <p className="text-[9px] font-bold uppercase tracking-widest text-white/70 mb-1">Packages From</p>
                            <p className="text-[28px] font-black text-white leading-none tracking-tight">$249</p>
                            <div className="flex items-center gap-1.5 mt-2">
                                <CheckCircle2 className="w-3 h-3 text-white/60" />
                                <span className="text-[9px] font-medium text-white/60">Free first consultation</span>
                            </div>
                        </div>

                        {/* Floating badge 2 — review */}
                        <div
                            ref={badge2Ref}
                            className="absolute -right-6 bottom-[22%] w-[158px] bg-white rounded-[20px] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.10)] border border-black/5"
                            style={{ opacity: 0 }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-ivory flex-shrink-0">
                                    <img src="https://i.pravatar.cc/60?u=rbbeauty1" alt="reviewer" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-amber-400 stroke-amber-400" />)}
                                </div>
                            </div>
                            <p className="text-[11px] font-bold text-charcoal leading-tight mb-1">"Pure clinical magic"</p>
                            <p className="text-[9px] text-soft-gray font-medium">— Sarah J., Toronto</p>
                        </div>

                        {/* Decorative ring */}
                        <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full border-2 border-deep-rose/15 animate-spin-slow pointer-events-none" />
                        <div className="absolute -bottom-3 -left-3 w-12 h-12 rounded-full border border-warm-gold/20 animate-pulse-soft pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-ivory/60 to-transparent pointer-events-none" />
        </section>
    );
};

export default Hero;
