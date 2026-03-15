'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Star, Plus } from 'lucide-react';

const Hero = () => {
    return (
        <section
            id="home"
            className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden bg-[#FFF8F6] pt-[72px]"
        >
            {/* Left column: airy, editorial feel */}
            <div className="w-full lg:w-[45%] flex flex-col justify-center px-10 sm:px-16 lg:px-[72px] xl:px-[88px] py-16 lg:py-0 min-h-[50vh] lg:min-h-[calc(100vh-72px)] order-2 lg:order-1">
                <h1 className="font-display text-[2.6rem] sm:text-[3rem] lg:text-[3.3rem] xl:text-[3.6rem] text-charcoal leading-[1.18] tracking-[0.08em] uppercase max-w-[520px] mb-8">
                    CARE FOR YOUR SKIN,
                    <br />
                    CARE FOR YOUR BEAUTY
                </h1>
                <div className="flex flex-wrap items-center gap-4">
                    <Link
                        href="https://wa.me/1234567890"
                        className="inline-flex items-center gap-2 h-[52px] px-7 rounded-full bg-black text-white text-[15px] font-semibold hover:bg-[#111] transition-colors"
                    >
                        Shop Now
                        <ArrowUpRight className="w-5 h-5 shrink-0" />
                    </Link>
                    <Link
                        href="#story"
                        className="inline-flex items-center gap-2 h-[52px] px-7 rounded-full bg-[#EFEFEF] text-charcoal text-[15px] font-semibold hover:bg-[#E2E2E2] transition-colors"
                    >
                        Watch Video
                    </Link>
                </div>
            </div>

            {/* Right column: portrait with floating cards, softer gradients */}
            <div className="w-full lg:w-[55%] relative min-h-[60vh] lg:min-h-[calc(100vh-72px)] order-1 lg:order-2 flex items-center justify-center lg:justify-end">
                {/* Background wash at edges */}
                <div className="absolute inset-[-40px] bg-[radial-gradient(circle_at_top_left,#F6E3FF_0,#FFF8F6_45%,transparent_70%),radial-gradient(circle_at_bottom_left,#F5E0FF_0,#FFF8F6_45%,transparent_75%)] pointer-events-none" />

                {/* Main portrait */}
                <div
                    className="absolute right-[6%] top-[14%] bottom-[10%] w-[54%] rounded-[28px] overflow-hidden bg-center bg-cover shadow-[0_24px_80px_rgba(0,0,0,0.22)]"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1200')",
                    }}
                />

                {/* Clinic copy on top-right of hero, matching tone */}
                <p className="absolute top-[22%] left-[48%] right-[12%] max-w-[320px] text-[14px] text-[#373737] leading-relaxed z-10">
                    Our skin care clinic best dermatologists in Lahore and Islamabad offer premium aesthetics.
                </p>

                {/* Special offer gradient card (bottom left) */}
                <div className="absolute bottom-[10%] left-[8%] w-[240px] rounded-[26px] overflow-hidden shadow-[0_18px_60px_rgba(0,0,0,0.16)]">
                    <div className="relative h-full bg-gradient-to-br from-[#4765FF] via-[#9D6BFF] to-[#F5C5FF] px-6 py-7 text-white">
                        <p className="text-[11px] uppercase tracking-[0.18em] mb-4 opacity-90">Special Offer</p>
                        <p className="font-display text-[1.9rem] leading-none mb-3">Upto 20% off</p>
                        <p className="text-[11px] leading-snug opacity-90">
                            Save this holiday season using the code Y2024
                        </p>
                    </div>
                    {/* floating arrow circle on top-right of card */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] flex items-center justify-center">
                        <ArrowUpRight className="w-5 h-5 text-[#444]" />
                    </div>
                </div>

                {/* Testimonial card above product */}
                <div className="absolute top-[26%] left-[36%] w-[260px] rounded-[20px] bg-white shadow-[0_14px_40px_rgba(0,0,0,0.15)] border border-black/[0.04] p-4 z-20">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#F6D5C1] to-[#F7E6D5]" />
                        <div className="flex flex-col">
                            <span className="text-[13px] font-semibold text-charcoal">“I just love it”</span>
                            <span className="text-[11px] text-[#777]">Client review</span>
                        </div>
                    </div>
                    <p className="text-[11px] leading-relaxed text-[#666]">
                        This product is just wow. I love the fragrance, I love the aura, blew it.
                    </p>
                </div>

                {/* Product card aligned under testimonial */}
                <div className="absolute bottom-[11%] left-[40%] w-[230px] rounded-[20px] bg-white shadow-[0_18px_50px_rgba(0,0,0,0.18)] border border-black/[0.04] p-4 z-20">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-16 h-16 rounded-[14px] bg-gradient-to-br from-[#F6E8FF] to-[#FFE7F0]" />
                        <div className="flex-1">
                            <p className="font-display text-[15px] font-semibold text-charcoal leading-snug">
                                Brightening Facial
                            </p>
                            <p className="text-[11px] text-[#777]">30 ml</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-display text-[19px] font-semibold text-charcoal">$100.45</p>
                        <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star key={i} className="w-4 h-4 text-[#F2C94C] fill-[#F2C94C]" />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Circular arrow button floating over right edge of portrait */}
                <div className="absolute top-[30%] right-[10%] w-[72px] h-[72px] rounded-[24px] bg-white/90 backdrop-blur-sm shadow-[0_16px_48px_rgba(0,0,0,0.2)] flex items-center justify-center border border-white z-20">
                    <ArrowUpRight className="w-6 h-6 text-[#555]" />
                </div>

                {/* Plus button on image connecting to cart */} 
                <button
                    type="button"
                    onClick={() => document.getElementById('cart-panel')?.classList.toggle('translate-x-full')}
                    className="absolute bottom-[40%] left-[47%] w-11 h-11 rounded-full bg-[#2E4A2D] text-white flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                    aria-label="Add to cart"
                >
                    <Plus className="w-5 h-5" />
                </button>
            </div>
        </section>
    );
};

export default Hero;
