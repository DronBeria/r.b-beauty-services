'use client';

import React from 'react';
import Link from 'next/link';
import { MessageCircle, ArrowUpRight, Play, Star, Plus } from 'lucide-react';

const Hero = () => {
    return (
        <section
            id="home"
            className="relative min-h-screen flex flex-col lg:flex-row items-stretch overflow-hidden bg-gradient-to-br from-[#F5F0F8] via-[#FAF5F8] to-[#FDF0ED]"
        >
            {/* Left: Headline + CTAs */}
            <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 xl:px-24 py-24 lg:py-0 order-2 lg:order-1">
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl text-charcoal leading-[1.1] mb-8 max-w-xl">
                    Care for your skin, care for your beauty.
                </h1>
                <div className="flex flex-col sm:flex-row items-start gap-4 mb-4">
                    <Link
                        href="https://wa.me/1234567890"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-charcoal text-white font-semibold hover:bg-charcoal-light transition-colors duration-200"
                    >
                        Book Now
                        <ArrowUpRight className="w-5 h-5" />
                    </Link>
                    <Link
                        href="#story"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/90 text-charcoal border border-charcoal/10 font-medium hover:bg-white hover:shadow-soft transition-all duration-200"
                    >
                        <Play className="w-5 h-5 text-deep-rose" />
                        Our Story
                    </Link>
                </div>
            </div>

            {/* Right: Image + floating cards */}
            <div className="flex-1 relative min-h-[60vh] lg:min-h-screen order-1 lg:order-2 flex items-center justify-center lg:justify-end pt-20 lg:pt-0">
                {/* Soft gradient orbs */}
                <div className="absolute top-1/4 right-0 w-[80%] h-[70%] bg-gradient-to-br from-deep-rose/5 to-warm-gold/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[60%] h-[50%] bg-gradient-to-tr from-champagne/30 to-transparent rounded-full blur-2xl pointer-events-none" />

                {/* Descriptive text above image (like reference) */}
                <p className="absolute top-12 left-6 lg:left-8 right-6 lg:right-auto max-w-xs text-sm text-soft-gray font-sans leading-relaxed z-10">
                    Our aesthetics clinic offers premium laser & skin care. Expert dermatology-grade treatments in Toronto.
                </p>

                {/* Main image container */}
                <div className="relative w-full max-w-lg xl:max-w-xl h-[50vh] sm:h-[60vh] lg:h-[85vh] mx-4 lg:mr-8 xl:mr-16">
                    <div
                        className="absolute inset-0 rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden bg-charcoal/5"
                        style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1200')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />

                    {/* Special Offer card (gradient) */}
                    <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-44 p-4 rounded-2xl bg-gradient-to-br from-[#C5D8F0] via-[#E8DCF5] to-[#F5E6F0] shadow-soft z-20">
                        <div className="flex items-start justify-between gap-2">
                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-charcoal/70">Special Offer</p>
                                <p className="font-display text-xl font-bold text-charcoal mt-0.5">Up to 20% off</p>
                                <p className="text-[10px] text-charcoal/70 mt-1">Save this season with code RBBEAUTY24</p>
                            </div>
                            <Link href="#services" className="shrink-0 w-9 h-9 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors">
                                <ArrowUpRight className="w-4 h-4 text-charcoal" />
                            </Link>
                        </div>
                    </div>

                    {/* Featured treatment card (white) */}
                    <div className="absolute bottom-4 right-4 left-auto hidden sm:block w-48 p-4 rounded-2xl bg-white shadow-premium border border-charcoal/5 z-20">
                        <div className="aspect-square rounded-xl bg-gradient-to-br from-blush-pink to-champagne/50 mb-3 flex items-center justify-center text-deep-rose/30">
                            <span className="text-xs font-medium">Treatment</span>
                        </div>
                        <p className="font-display font-semibold text-charcoal text-sm">Brightening Facial</p>
                        <p className="text-[10px] text-soft-gray uppercase tracking-wider">60 min</p>
                        <p className="font-display font-bold text-deep-rose mt-1">From $120</p>
                        <div className="flex items-center gap-0.5 mt-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star key={i} className="w-3.5 h-3.5 text-warm-gold fill-warm-gold" />
                            ))}
                        </div>
                    </div>

                    {/* Testimonial card */}
                    <div className="absolute top-24 right-4 sm:right-8 w-56 p-4 rounded-2xl bg-white shadow-premium border border-charcoal/5 z-20">
                        <p className="font-display font-semibold text-charcoal text-sm">&ldquo;I just love it&rdquo;</p>
                        <p className="text-xs text-soft-gray leading-relaxed mt-1">The results are amazing. My skin has never looked so radiant. Highly recommend.</p>
                        <div className="flex items-center gap-2 mt-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-deep-rose/20 to-warm-gold/20" />
                            <span className="text-[10px] font-semibold text-charcoal">Sarah M.</span>
                        </div>
                    </div>

                    {/* Circular arrow button (top right of image) */}
                    <Link
                        href="#services"
                        className="absolute top-1/2 -translate-y-1/2 right-2 lg:right-4 w-12 h-12 rounded-full bg-white shadow-premium flex items-center justify-center hover:bg-ivory transition-colors z-20 border border-charcoal/5"
                    >
                        <ArrowUpRight className="w-5 h-5 text-charcoal" />
                    </Link>

                    {/* Plus button (on image, bottom left of face area) */}
                    <button
                        type="button"
                        onClick={() => document.getElementById('cart-panel')?.classList.toggle('translate-x-full')}
                        className="absolute bottom-1/2 left-4 lg:left-6 w-11 h-11 rounded-full bg-charcoal/80 text-white flex items-center justify-center hover:bg-charcoal transition-colors z-20"
                        aria-label="Add to cart"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Scroll hint */}
            <a
                href="#services"
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-charcoal/40 hover:text-charcoal/70 transition-colors lg:left-8 lg:translate-x-0"
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
