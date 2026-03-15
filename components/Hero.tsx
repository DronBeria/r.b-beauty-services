'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Play, Star, Plus } from 'lucide-react';

const Hero = () => {
    return (
        <section
            id="home"
            className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden bg-gradient-to-br from-[#F0EBF5] via-[#F8F4F8] to-[#FDF2EE] pt-[72px]"
        >
            {/* Left column: 42% — headline + CTAs, exact padding like reference */}
            <div className="w-full lg:w-[42%] flex flex-col justify-center px-12 sm:px-16 lg:px-[60px] xl:px-20 py-16 lg:py-0 min-h-[50vh] lg:min-h-[calc(100vh-72px)] order-2 lg:order-1">
                <h1 className="font-display text-[2.5rem] sm:text-[3rem] lg:text-[3.25rem] xl:text-[3.75rem] text-charcoal leading-[1.12] tracking-tight max-w-[520px] mb-10">
                    Care for your skin, care for your beauty.
                </h1>
                <div className="flex flex-wrap items-center gap-4">
                    <Link
                        href="https://wa.me/1234567890"
                        className="inline-flex items-center gap-2 h-[52px] px-8 rounded-[14px] bg-charcoal text-white text-[15px] font-semibold hover:bg-charcoal-light transition-colors"
                    >
                        Shop Now
                        <ArrowUpRight className="w-5 h-5 shrink-0" />
                    </Link>
                    <Link
                        href="#story"
                        className="inline-flex items-center gap-2 h-[52px] px-8 rounded-[14px] bg-[#e8e8e8] text-charcoal text-[15px] font-semibold hover:bg-[#ddd] transition-colors"
                    >
                        Watch Video
                        <ArrowUpRight className="w-5 h-5 shrink-0" />
                    </Link>
                </div>
            </div>

            {/* Right column: 58% — image + overlays */}
            <div className="w-full lg:w-[58%] relative min-h-[55vh] lg:min-h-[calc(100vh-72px)] order-1 lg:order-2 flex items-center justify-center lg:justify-end">
                {/* Soft gradient orbs in background */}
                <div className="absolute inset-0 bg-gradient-to-bl from-[#E8DCF5]/40 via-transparent to-[#FDF0ED]/50 pointer-events-none" />

                {/* Main image — fills right column, woman portrait */}
                <div
                    className="absolute inset-0 lg:left-[8%] lg:right-0 lg:top-0 lg:bottom-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1200')",
                    }}
                />

                {/* Descriptive text — above/left of face, small paragraph */}
                <p className="absolute top-[18%] left-[10%] right-[12%] lg:right-[35%] max-w-[280px] text-[13px] text-[#555] leading-relaxed z-10">
                    Our skin care clinic best dermatologists in Lahore and Islamabad offer premium aesthetics.
                </p>

                {/* Special Offer card — bottom left overlay, vertical gradient */}
                <div className="absolute bottom-[12%] left-[6%] w-[200px] p-5 rounded-[20px] bg-gradient-to-br from-[#B8D4EC] via-[#DCC8E8] to-[#F0E5EB] shadow-[0_12px_40px_rgba(0,0,0,0.08)] z-20">
                    <div className="flex justify-between items-start gap-2">
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-charcoal/80">Special Offer</p>
                            <p className="font-display text-[1.5rem] font-bold text-charcoal mt-1">Upto 20% off</p>
                            <p className="text-[11px] text-charcoal/75 mt-2 leading-snug">Save this holiday season using the code Y2024</p>
                        </div>
                        <Link href="#services" className="shrink-0 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white shadow-sm">
                            <ArrowUpRight className="w-5 h-5 text-charcoal" />
                        </Link>
                    </div>
                </div>

                {/* Product card — center bottom, white */}
                <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[220px] p-4 rounded-[20px] bg-white shadow-[0_12px_48px_rgba(0,0,0,0.1)] border border-black/[0.04] z-20">
                    <div className="aspect-[4/3] rounded-[12px] bg-gradient-to-br from-[#E8E0E8] to-[#F0E8E0] mb-3 flex items-center justify-center">
                        <span className="text-xs text-charcoal/40">Product</span>
                    </div>
                    <p className="font-display font-semibold text-charcoal text-[15px]">Brightening Facial</p>
                    <p className="text-[12px] text-[#666]">30 ml</p>
                    <p className="font-display font-bold text-charcoal text-[18px] mt-1">$100.45</p>
                    <div className="flex items-center gap-0.5 mt-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Star key={i} className="w-4 h-4 text-[#E6B800] fill-[#E6B800]" />
                        ))}
                    </div>
                </div>

                {/* Testimonial card — center top, horizontal */}
                <div className="absolute top-[14%] left-1/2 -translate-x-1/2 lg:left-[38%] lg:translate-x-0 w-[260px] p-4 rounded-[20px] bg-white shadow-[0_12px_48px_rgba(0,0,0,0.1)] border border-black/[0.04] z-20">
                    <p className="font-display font-semibold text-charcoal text-[15px]">&ldquo;I just love it&rdquo;</p>
                    <p className="text-[13px] text-[#555] leading-relaxed mt-1">This product is just wow. I love the fragrance I love the aura blew it</p>
                    <div className="flex items-center gap-3 mt-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-charcoal/20 to-charcoal/10" />
                        <span className="text-[12px] font-semibold text-charcoal">Client</span>
                    </div>
                </div>

                {/* Circular arrow button — top right overlay */}
                <Link
                    href="#services"
                    className="absolute top-[22%] right-[10%] w-12 h-12 rounded-full bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12)] flex items-center justify-center hover:bg-[#f8f8f8] transition-colors z-20 border border-black/[0.04]"
                >
                    <ArrowUpRight className="w-5 h-5 text-charcoal" />
                </Link>

                {/* Plus button — on image, bottom left of face area */}
                <button
                    type="button"
                    onClick={() => document.getElementById('cart-panel')?.classList.toggle('translate-x-full')}
                    className="absolute bottom-[38%] left-[14%] w-11 h-11 rounded-full bg-charcoal/90 text-white flex items-center justify-center hover:bg-charcoal transition-colors z-20 shadow-lg"
                    aria-label="Add to cart"
                >
                    <Plus className="w-5 h-5" />
                </button>
            </div>
        </section>
    );
};

export default Hero;
