'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { MessageCircle, ChevronDown, Award, Users, Zap, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

            tl.to('.hero-reveal', {
                y: 0,
                opacity: 1,
                stagger: 0.15,
                duration: 1.4,
                delay: 0.3
            });

            gsap.to(bgRef.current, {
                scale: 1.1,
                duration: 20,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            gsap.to(contentRef.current, {
                y: 100,
                opacity: 0.5,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="home"
            ref={heroRef}
            className="relative h-screen flex items-center justify-center overflow-hidden bg-charcoal"
        >
            {/* Background Image with Overlay */}
            <div
                ref={bgRef}
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=2070')" }}
            />
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-ivory" />

            {/* Ambient Glows */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-deep-rose/10 blur-[120px] rounded-full animate-float z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-warm-gold/5 blur-[100px] rounded-full animate-pulse-soft z-10" />

            <div
                ref={contentRef}
                className="relative z-20 container-custom text-center"
            >
                <div className="hero-reveal reveal-hidden mb-6 flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5 text-warm-gold" />
                    <span className="font-body text-warm-gold-light tracking-[0.4em] uppercase text-xs font-bold font-sans">Premium Esthetics & Laser</span>
                    <Sparkles className="w-5 h-5 text-warm-gold" />
                </div>

                <h1 className="hero-reveal reveal-hidden font-display text-7xl md:text-9xl lg:text-[11rem] mb-6 leading-[0.85] text-white">
                    Radiant <span className="italic font-light text-gradient drop-shadow-2xl">Beauty</span> <br />
                    <span className="text-5xl md:text-7xl lg:text-8xl tracking-widest font-light opacity-90">Tailored for You</span>
                </h1>

                <p className="hero-reveal reveal-hidden max-w-2xl mx-auto text-lg md:text-2xl font-body mb-12 text-white/80 font-sans leading-relaxed">
                    Experience the pinnacle of clinical care and luxury aesthetics.
                    Sophisticated treatments for your most confident self.
                </p>

                <div className="hero-reveal reveal-hidden flex flex-col sm:flex-row items-center justify-center gap-6 mb-24">
                    <Link
                        href="https://wa.me/1234567890"
                        className="btn-primary group"
                    >
                        <MessageCircle className="w-5 h-5" />
                        <span>Reserve Your Session</span>
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    </Link>
                    <Link
                        href="#services"
                        className="btn-secondary glass-card !rounded-full !py-4 !bg-white/10 !text-white !border-white/20 hover:!bg-white/20"
                    >
                        View Signature Menu
                    </Link>
                </div>

                {/* Trust Stats Card */}
                <div className="hero-reveal reveal-hidden glass-card max-w-4xl mx-auto p-12 border-white/20 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-noise pointer-events-none" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                        <div className="flex flex-col items-center gap-3 group/item">
                            <div className="p-3 rounded-2xl bg-deep-rose/5 text-deep-rose group-hover/item:scale-110 transition-transform">
                                <Users className="w-7 h-7" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-display font-bold text-charcoal">500+</span>
                                <span className="text-[10px] tracking-[0.2em] font-black uppercase text-soft-gray">Client Radiance</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-3 group/item">
                            <div className="p-3 rounded-2xl bg-warm-gold/5 text-warm-gold group-hover/item:scale-110 transition-transform">
                                <Award className="w-7 h-7" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-display font-bold text-charcoal">Expert</span>
                                <span className="text-[10px] tracking-[0.2em] font-black uppercase text-soft-gray">Certified Care</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-3 group/item">
                            <div className="p-3 rounded-2xl bg-deep-rose/5 text-deep-rose group-hover/item:scale-110 transition-transform">
                                <Zap className="w-7 h-7" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-display font-bold text-charcoal">Elite</span>
                                <span className="text-[10px] tracking-[0.2em] font-black uppercase text-soft-gray">Treatment Tech</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                <span className="text-[9px] font-black uppercase tracking-[0.5em] text-charcoal font-sans">Explore</span>
                <div className="w-6 h-10 border-2 border-charcoal rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-charcoal rounded-full animate-bounce" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
