'use client';

import React from 'react';
import Link from 'next/link';
import { MessageCircle, Award, Users, Zap } from 'lucide-react';

const Hero = () => {
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal"
        >
            {/* Background: single image, no zoom */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=2070')" }}
            />
            {/* Overlay: clean gradient for readability */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-charcoal/75 via-charcoal/50 to-charcoal/90" />

            <div className="relative z-20 container-custom text-center py-20">
                {/* Eyebrow */}
                <p className="text-warm-gold-light text-xs font-semibold tracking-[0.35em] uppercase mb-6 font-sans">
                    Premium Esthetics & Laser
                </p>

                {/* Headline */}
                <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.05] mb-6 max-w-4xl mx-auto">
                    Radiant{' '}
                    <span className="italic font-light bg-clip-text text-transparent bg-gradient-to-r from-deep-rose-light to-warm-gold">
                        Beauty
                    </span>
                    <br />
                    <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white/95 tracking-tight">
                        Tailored for You
                    </span>
                </h1>

                <p className="max-w-xl mx-auto text-white/85 text-base md:text-lg font-sans leading-relaxed mb-10">
                    Clinical care and luxury aesthetics. Sophisticated treatments for your most confident self.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                    <Link
                        href="https://wa.me/1234567890"
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        <MessageCircle className="w-5 h-5" />
                        Reserve Your Session
                    </Link>
                    <Link
                        href="#services"
                        className="px-8 py-4 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors duration-200 inline-flex items-center gap-2"
                    >
                        View Signature Menu
                    </Link>
                </div>

                {/* Trust strip: simple, no glass card */}
                <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 text-white/90">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-deep-rose-light">
                            <Users className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <span className="block font-display font-bold text-lg">500+</span>
                            <span className="text-[10px] uppercase tracking-wider text-white/70">Clients</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-warm-gold-light">
                            <Award className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <span className="block font-display font-bold text-lg">Expert</span>
                            <span className="text-[10px] uppercase tracking-wider text-white/70">Certified</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-deep-rose-light">
                            <Zap className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <span className="block font-display font-bold text-lg">Elite</span>
                            <span className="text-[10px] uppercase tracking-wider text-white/70">Technology</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll hint */}
            <a
                href="#services"
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors"
            >
                <span className="text-[9px] font-semibold uppercase tracking-widest">Scroll</span>
                <div className="w-6 h-9 border-2 border-current rounded-full flex justify-center pt-1.5">
                    <div className="w-1 h-1.5 bg-current rounded-full" />
                </div>
            </a>
        </section>
    );
};

export default Hero;
