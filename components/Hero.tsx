'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Star, Plus, Play } from 'lucide-react';

const Hero = () => {
    return (
        <section
            id="home"
            className="relative min-h-[95vh] flex flex-col items-center justify-center overflow-hidden bg-[#FBF9F7] pt-[80px]"
        >
            {/* Background Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#F3E8FF] rounded-full blur-[120px] opacity-40" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#FFE8E8] rounded-full blur-[120px] opacity-40" />
            </div>

            <div className="relative w-full max-w-[1400px] mx-auto px-8 lg:px-12 flex flex-col py-12 lg:py-20 h-full">
                {/* Header Text Row */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-16 relative z-10">
                    <h1 className="font-display text-[2.8rem] sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.8rem] text-charcoal leading-[1.1] tracking-[-0.01em] uppercase max-w-[700px]">
                        CARE FOR YOUR SKIN,
                        <br />
                        <span className="text-charcoal/90">CARE FOR YOUR BEAUTY</span>
                    </h1>
                    <div className="lg:max-w-[340px] pt-4">
                        <p className="text-[15px] sm:text-[16px] text-charcoal/70 leading-relaxed font-body">
                            Our skin care clinic best dermatologists in Lahore and Islamabad offer premium aesthetics.
                        </p>
                    </div>
                </div>

                {/* Primary CTA Row */}
                <div className="flex flex-wrap items-center gap-4 mb-20 relative z-10">
                    <Link
                        href="#shop"
                        className="group relative inline-flex items-center gap-3 h-[60px] px-8 rounded-full bg-charcoal text-white text-[16px] font-bold overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-charcoal/20"
                    >
                        <span>Shop Now</span>
                        <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </Link>
                    <Link
                        href="#video"
                        className="inline-flex items-center gap-3 h-[60px] px-8 rounded-full bg-[#F0F0F0] text-charcoal text-[16px] font-bold hover:bg-[#E5E5E5] transition-all"
                    >
                        <span>Watch Video</span>
                        <Play className="w-4 h-4 fill-charcoal" />
                    </Link>
                </div>

                {/* Collage Section */}
                <div className="relative w-full h-[500px] lg:h-[700px] mt-8">
                    {/* Main Image (Right-aligned large image) */}
                    <div className="absolute right-0 top-0 w-full lg:w-[60%] h-full rounded-[40px] overflow-hidden shadow-2xl shadow-black/10 transition-transform duration-1000 hover:scale-[1.01]">
                        <img
                            src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=1200"
                            alt="Skincare Clinic"
                            className="w-full h-full object-cover"
                        />
                        {/* Shimmer overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent opacity-60 pointer-events-none" />
                    </div>

                    {/* Special Offer Card (Bottom Left) */}
                    <div className="absolute bottom-[5%] left-[0%] lg:left-[5%] w-[260px] sm:w-[320px] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-20 group hover:-translate-y-2 transition-transform duration-500">
                        <div className="relative p-8 bg-gradient-to-br from-[#5D7BFF] via-[#B68BFF] to-[#FFB9FF] text-white">
                            <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[12px] font-bold uppercase tracking-wider mb-6">
                                Special Offer
                            </div>
                            <h3 className="font-display text-[2.2rem] sm:text-[2.6rem] leading-[1.1] mb-4">
                                Upto 20% off
                            </h3>
                            <p className="text-[13px] sm:text-[14px] leading-relaxed opacity-90 font-medium">
                                Save this holiday season using the code Y2024
                            </p>
                        </div>
                        {/* Floating arrow button on this card */}
                        <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg cursor-pointer group-hover:bg-charcoal group-hover:text-white transition-colors duration-300">
                            <ArrowUpRight className="w-5 h-5" />
                        </div>
                    </div>

                    {/* Testimonial Card (Top Middle) */}
                    <div className="hidden sm:block absolute top-[15%] left-[35%] lg:left-[30%] w-[280px] p-6 bg-white/80 backdrop-blur-xl rounded-[24px] shadow-[0_15px_40px_rgba(0,0,0,0.1)] border border-white/40 z-30 animate-float">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-200 to-orange-100 border-2 border-white overflow-hidden">
                                <img src="https://i.pravatar.cc/100?u=skincare" alt="Reviewer" className="w-full h-full object-cover" />
                            </div>
                            <h4 className="font-bold text-charcoal text-[15px]">“I just love it”</h4>
                        </div>
                        <p className="text-[13px] text-charcoal/60 leading-relaxed italic">
                            This product is just wow. I love the fragrance, I love the aura, blew it.
                        </p>
                    </div>

                    {/* Product Card (Bottom Left-Middle) */}
                    <div className="absolute bottom-[8%] left-[45%] lg:left-[38%] w-[220px] sm:w-[260px] p-5 bg-white rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] z-40 group hover:-rotate-2 transition-transform duration-500">
                        <div className="flex items-center gap-4 mb-5">
                            <div className="w-14 h-14 rounded-[20px] bg-[#F5F5FF] flex items-center justify-center overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=200" alt="Product" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h4 className="font-bold text-charcoal text-[15px] leading-tight">Brightening Facial</h4>
                                <span className="text-[12px] text-charcoal/40">30 ml</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="font-display text-[20px] font-bold text-charcoal">$100.45</span>
                            <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-3.5 h-3.5 fill-[#FFC107] text-[#FFC107]" />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Floating Plus Button */}
                    <button className="absolute bottom-[35%] right-[42%] w-12 h-12 rounded-full bg-[#2E4A2D] text-white flex items-center justify-center shadow-2xl z-40 transition-transform active:scale-95 group overflow-hidden">
                        <Plus className="w-5 h-5" />
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
                    </button>

                    {/* Floating Arrow Badge (Top Right) */}
                    <div className="absolute top-[10%] right-[5%] w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] bg-white/90 backdrop-blur-md rounded-[32px] sm:rounded-[40px] flex items-center justify-center shadow-2xl border border-white/50 z-30 transition-all hover:rotate-12">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-black/5 to-transparent flex items-center justify-center">
                            <ArrowUpRight className="w-8 h-8 sm:w-10 sm:h-10 text-charcoal stroke-[2.5px]" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Float Animation Keyframes (Inline for speed) */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
};

export default Hero;

