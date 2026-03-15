'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Star, Plus, Play } from 'lucide-react';
import gsap from 'gsap';

const Hero = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const descRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const mainImgRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 } });

            // Entrance sequence: delayed until Navbar starts appearing
            tl.from(titleRef.current, { y: 60, opacity: 0, delay: 0.8 })
                .from(descRef.current, { y: 30, opacity: 0 }, '-=0.9')
                .from(ctaRef.current, { y: 20, opacity: 0 }, '-=1')
                .from(mainImgRef.current, {
                    x: 100,
                    opacity: 0,
                    rotation: 8,
                    scale: 1.1,
                    transformOrigin: 'right center'
                }, '-=1.2');

            // Slightly tilting entrance for the collage cards
            cardsRef.current.forEach((card, i) => {
                if (card) {
                    gsap.from(card, {
                        y: 80,
                        opacity: 0,
                        rotation: -12,
                        scale: 0.85,
                        delay: 1.2 + i * 0.15,
                        duration: 1.5,
                        ease: 'back.out(1.4)'
                    });
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const addToCards = (el: HTMLDivElement | null) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative h-[100vh] min-h-[700px] max-h-[1080px] flex items-center justify-center overflow-hidden bg-white"
        >
            {/* Background Image Layer */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000"
                style={{
                    backgroundImage: "url('/hero-bg.png')",
                    filter: "brightness(1.02) contrast(1.02)"
                }}
            />

            <div className="relative w-full h-full max-w-[1400px] mx-auto px-8 lg:px-12 flex flex-col z-10 pt-[80px]">
                {/* Content Container: Adjusted for 100vh fit */}
                <div className="flex-1 flex flex-col justify-center">

                    {/* Header Row */}
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:mb-12 relative">
                        <div ref={titleRef}>
                            <h1 className="font-display text-[2.8rem] sm:text-[3.5rem] lg:text-[4.2rem] xl:text-[4.8rem] text-charcoal leading-[1.05] tracking-[-0.01em] uppercase max-w-[700px]">
                                CARE FOR YOUR SKIN,
                                <br />
                                <span className="text-charcoal/80">CARE FOR YOUR BEAUTY</span>
                            </h1>
                        </div>
                        <div ref={descRef} className="lg:max-w-[320px] lg:pt-3">
                            <p className="text-[15px] sm:text-[16px] text-charcoal/70 leading-relaxed font-body">
                                Our skin care clinic best dermatologists in Lahore and Islamabad offer premium aesthetics.
                            </p>
                        </div>
                    </div>

                    {/* CTAs */}
                    <div ref={ctaRef} className="flex flex-wrap items-center gap-4 mb-12">
                        <Link
                            href="#shop"
                            className="group relative inline-flex items-center gap-3 h-[56px] px-8 rounded-full bg-charcoal text-white text-[15px] font-bold overflow-hidden transition-all hover:scale-[1.02] shadow-lg hover:shadow-charcoal/30"
                        >
                            <span className="relative z-10">Shop Now</span>
                            <ArrowUpRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </Link>
                        <Link
                            href="#video"
                            className="inline-flex items-center gap-3 h-[56px] px-8 rounded-full bg-white/40 backdrop-blur-md border border-black/5 text-charcoal text-[15px] font-bold hover:bg-white/60 transition-all"
                        >
                            <span>Watch Video</span>
                            <div className="w-8 h-8 rounded-full bg-charcoal/5 flex items-center justify-center">
                                <Play className="w-3 h-3 fill-charcoal" />
                            </div>
                        </Link>
                    </div>

                    {/* Collage Section: Specifically scaled for 100vh fit */}
                    <div className="relative w-full flex-1 max-h-[500px] mt-4 lg:mt-0">

                        {/* Main Image Banner */}
                        <div
                            ref={mainImgRef}
                            className="absolute right-0 top-0 w-full lg:w-[62%] h-[85%] rounded-[40px] overflow-hidden shadow-2xl shadow-black/5"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=1200"
                                alt="Skincare Model"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-transparent" />
                        </div>

                        {/* Special Offer Card */}
                        <div
                            ref={addToCards}
                            className="absolute bottom-[2%] left-0 w-[240px] sm:w-[300px] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] z-20 group cursor-pointer"
                        >
                            <div className="relative p-7 bg-gradient-to-br from-[#5D7BFF] via-[#B68BFF] to-[#FFB9FF] text-white">
                                <div className="inline-block px-2.5 py-0.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider mb-4">
                                    Special Offer
                                </div>
                                <h3 className="font-display text-[1.8rem] sm:text-[2.2rem] leading-tight mb-2">
                                    Upto 20% off
                                </h3>
                                <p className="text-[12px] opacity-80 font-medium">
                                    Save this season: code Y2024
                                </p>
                            </div>
                            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <ArrowUpRight className="w-4 h-4 text-charcoal" />
                            </div>
                        </div>

                        {/* Testimonial Badge */}
                        <div
                            ref={addToCards}
                            className="absolute top-[8%] left-[32%] lg:left-[28%] w-[260px] p-5 bg-white/90 backdrop-blur-xl rounded-[24px] shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-white z-30 hidden sm:block"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 rounded-full bg-pink-100 overflow-hidden">
                                    <img src="https://i.pravatar.cc/100?u=skincare" alt="Ava" className="w-full h-full object-cover" />
                                </div>
                                <span className="font-bold text-charcoal text-[13px]">“I just love it”</span>
                            </div>
                            <p className="text-[12px] text-charcoal/60 leading-relaxed truncate">
                                This product is just wow. I love the...
                            </p>
                        </div>

                        {/* Product Spotlight */}
                        <div
                            ref={addToCards}
                            className="absolute bottom-[5%] left-[42%] lg:left-[35%] w-[240px] p-4 bg-white rounded-[26px] shadow-[0_20px_60px_rgba(0,0,0,0.1)] z-40 hidden sm:block"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-[18px] bg-[#F8F8FF] overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=200" alt="Cream" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-charcoal text-[14px] leading-tight">Brightening Facial</h4>
                                    <span className="text-[11px] text-charcoal/40">30 ml</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-display text-[18px] font-bold text-charcoal">$100.45</span>
                                <div className="flex items-center gap-0.5">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-[#FFC107] text-[#FFC107]" />)}
                                </div>
                            </div>
                        </div>

                        {/* Floating Interaction Button */}
                        <div
                            ref={addToCards}
                            className="absolute bottom-[35%] left-[48%] active:scale-90 transition-transform cursor-pointer"
                        >
                            <div className="w-11 h-11 rounded-full bg-[#2E4A2D] text-white flex items-center justify-center shadow-xl hover:rotate-90 transition-transform duration-500">
                                <Plus className="w-5 h-5" />
                            </div>
                        </div>

                        {/* Visual Badge (Top Right Image Corner) */}
                        <div
                            ref={addToCards}
                            className="absolute top-[5%] right-[2%] w-[80px] h-[80px] bg-white/95 backdrop-blur-md rounded-[32px] flex items-center justify-center shadow-xl border border-white hidden lg:flex"
                        >
                            <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center">
                                <ArrowUpRight className="w-8 h-8 text-charcoal stroke-[2.5px]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;


