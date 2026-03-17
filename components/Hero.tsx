'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Star } from 'lucide-react';
import gsap from 'gsap';
import { WHATSAPP_NUMBER } from '../constants/services';
import HeroSlideshow from './HeroSlideshow';

const Hero = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const animRef = useRef<HTMLDivElement>(null);

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
                .fromTo(animRef.current,
                    { x: 50, opacity: 0 },
                    { x: 0, opacity: 1, duration: 1.4, ease: 'expo.out' },
                    '-=1.6'
                );
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
            <div className="w-full max-w-[1380px] mx-auto px-6 md:px-12 lg:px-16 min-h-[calc(100svh-80px)] grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-8 items-center py-12 lg:py-0">

                {/* ── LEFT: Text ──────────────────────────────────────────────── */}
                <div className="flex flex-col justify-center order-2 lg:order-1 lg:pr-8 xl:pr-14">

                    {/* Eyebrow */}
                    <div className="hero-eyebrow opacity-0 flex items-center gap-3 mb-7">
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400 stroke-amber-400" />)}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.45em] text-charcoal/45 font-sans">Edmonton's Laser & Beauty Clinic</span>
                    </div>

                    {/* Headline */}
                    <div className="mb-8 space-y-0.5">
                        <div className="overflow-hidden">
                            <h1 className="hero-line opacity-0 font-display text-[2.2rem] sm:text-[2.8rem] md:text-[3.2rem] lg:text-[3.6rem] xl:text-[4rem] font-bold text-charcoal leading-[1.05] tracking-[-0.02em] uppercase">
                                Advanced
                            </h1>
                        </div>
                        <div className="overflow-hidden">
                            <h1
                                className="hero-line opacity-0 font-display text-[2.2rem] sm:text-[2.8rem] md:text-[3.2rem] lg:text-[3.6rem] xl:text-[4rem] leading-[0.9] tracking-[-0.02em]"
                                style={{
                                    background: 'linear-gradient(135deg, #A0134D 0%, #C2185B 40%, #9A7B4F 100%)',
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
                            <h1 className="hero-line opacity-0 font-display text-[2.2rem] sm:text-[2.8rem] md:text-[3.2rem] lg:text-[3.6rem] xl:text-[4rem] font-bold text-charcoal leading-[0.9] tracking-[-0.02em] uppercase">
                                Treatments in
                            </h1>
                        </div>
                        <div className="overflow-hidden">
                            <h1
                                className="hero-line opacity-0 font-display text-[2.2rem] sm:text-[2.8rem] md:text-[3.2rem] lg:text-[3.6rem] xl:text-[4rem] leading-[0.9] tracking-[-0.02em]"
                                style={{
                                    background: 'linear-gradient(135deg, #A0134D 0%, #C2185B 40%, #9A7B4F 100%)',
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
                    <p className="hero-sub opacity-0 text-charcoal/50 text-[15px] md:text-[16px] leading-relaxed max-w-[390px] mb-9 font-medium">
                        Personalized care for radiant skin — laser hair removal, facials, microneedling, and waxing for{' '}
                        <span className="text-charcoal font-bold">men and women in Edmonton.</span>
                    </p>

                    {/* CTAs */}
                    <div className="hero-cta opacity-0 flex flex-wrap items-center gap-3">
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
                </div>

                {/* ── RIGHT: Animation ──────────────────────────────────────── */}
                <div
                    ref={animRef}
                    className="relative order-1 lg:order-2 flex justify-center lg:justify-end opacity-0"
                    style={{ height: 'clamp(340px, 52vw, 560px)' }}
                >
                    <div className="relative w-full h-full">
                        <HeroSlideshow />
                    </div>
                </div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-ivory/40 to-transparent pointer-events-none" />
        </section>
    );
};

export default Hero;
