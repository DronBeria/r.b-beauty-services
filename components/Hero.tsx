'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Star, Plus, Play } from 'lucide-react';
import gsap from 'gsap';

const Hero = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const bodyTextRef = useRef<HTMLDivElement>(null);
    const heroImgRef = useRef<HTMLDivElement>(null);
    const arrowBadgeRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 } });

            // Entrance sequence
            tl.from(titleRef.current, { y: 60, opacity: 0, delay: 0.8 })
                .from(bodyTextRef.current, { y: 20, opacity: 0 }, '-=0.9')
                .from(ctaRef.current, { y: 20, opacity: 0 }, '-=1')
                .from(heroImgRef.current, {
                    x: 60,
                    opacity: 0,
                    rotation: 5,
                    scale: 1.05
                }, '-=1.2')
                .from(arrowBadgeRef.current, { scale: 0, opacity: 0, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.5');

            // Slightly tilting entrance for the cards
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

                    // Subtle floating/tilting idle animation
                    gsap.to(card, {
                        y: '-=10',
                        rotation: '+=2',
                        duration: 2 + i * 0.5,
                        repeat: -1,
                        yoyo: true,
                        ease: 'sine.inOut'
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
            className="relative min-h-[100vh] w-full flex items-center pt-[80px] pb-[60px] px-8 lg:px-16 overflow-hidden"
            style={{
                background: `
                    radial-gradient(circle at 10% 20%, #f9c5c5 0%, transparent 50%),
                    radial-gradient(circle at 90% 10%, #d8c8f0 0%, transparent 50%),
                    radial-gradient(circle at 50% 90%, #c8d8f0 0%, transparent 60%),
                    #ffffff
                `
            }}
        >
            <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[48px] items-start">

                {/* LEFT COLUMN */}
                <div className="flex flex-col pt-[40px]">
                    <div ref={titleRef} className="z-10">
                        <h1 className="text-[3rem] md:text-[4rem] font-bold text-[#111] leading-[1.05] font-playfair uppercase tracking-tight">
                            R.B BEAUTY <br />
                            <span className="opacity-80 font-normal italic">THE ART OF RADIANCE</span>
                        </h1>
                    </div>

                    <div ref={ctaRef} className="flex flex-wrap items-center gap-[12px] mt-[32px] z-10">
                        <Link
                            href="#services"
                            className="bg-[#111] text-white px-[32px] py-[14px] rounded-full text-[15px] font-bold flex items-center gap-2 hover:bg-black transition-all group shadow-lg shadow-black/10"
                        >
                            Explore Rituals
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                        <button
                            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                            className="border-[1.5px] border-[#333]/20 text-[#333] bg-white/40 backdrop-blur-md px-[32px] py-[14px] rounded-full text-[15px] font-bold transition-all hover:bg-white/60"
                        >
                            View Pricing
                        </button>
                    </div>

                    {/* FLOATING CARD ROW */}
                    <div className="flex flex-wrap items-end gap-[16px] mt-[48px] z-20">
                        {/* CARD A — Special Offer card */}
                        <div
                            ref={addToCards}
                            className="w-[200px] h-[210px] rounded-[32px] p-[24px] relative shadow-[0_20px_50px_rgba(0,0,0,0.06)] backdrop-blur-xl flex flex-col justify-between overflow-hidden group cursor-pointer"
                            style={{
                                background: 'linear-gradient(135deg, rgba(160, 19, 77, 0.6) 0%, rgba(154, 123, 79, 0.6) 100%)',
                            }}
                        >
                            <div className="flex justify-between items-start">
                                <span className="bg-white/30 backdrop-blur-md px-[12px] py-[6px] rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                                    Clinic Offer
                                </span>
                                <div className="w-[32px] h-[32px] bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                    <ArrowUpRight className="w-[16px] h-[16px] text-black" />
                                </div>
                            </div>

                            <div className="text-white">
                                <p className="text-[12px] font-bold uppercase tracking-widest opacity-80">Packages From</p>
                                <p className="text-[32px] font-black leading-tight -mt-1 uppercase tracking-tighter">$299</p>
                                <div className="mt-2 space-y-0.5 opacity-70">
                                    <p className="text-[10px] font-medium leading-tight">Complete Glow Solution</p>
                                    <p className="text-[10px] font-medium leading-tight">Book Free Consultation</p>
                                </div>
                            </div>
                        </div>

                        {/* CARD B — Review + Product card */}
                        <div
                            ref={addToCards}
                            className="w-[180px] rounded-[32px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex flex-col relative group overflow-hidden"
                        >
                            {/* TOP SECTION: Review */}
                            <div className="p-[20px] pb-[12px]">
                                <div className="flex items-center gap-[10px] mb-[8px]">
                                    <div className="w-[32px] h-[32px] bg-pink-50 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden">
                                        <img src="https://i.pravatar.cc/100?u=rbbeauty" alt="avatar" className="w-full h-full object-cover" />
                                    </div>
                                    <span className="text-[13px] font-bold text-black tracking-tight">Pure Clinical Magic</span>
                                </div>
                                <p className="text-[11px] text-[#666] leading-[1.4] font-medium">
                                    My skin has never looked this radiant. The expertise at R.B is unmatched.
                                </p>
                            </div>

                            <div className="h-[1px] w-full bg-[#eee]" />

                            {/* BOTTOM SECTION: Product */}
                            <div className="p-[20px] pt-[12px] flex items-center gap-[10px]">
                                <div className="w-[44px] h-[54px] bg-[#F8F8FF] rounded-[12px] overflow-hidden flex-shrink-0 border border-black/5">
                                    <img
                                        src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=100&q=80&auto=format&fit=crop"
                                        alt="Product"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[12px] font-bold text-black leading-tight truncate w-[80px]">Dermal Repair</span>
                                    <span className="text-[10px] text-[#999] mb-[4px]">Advanced Formula</span>
                                    <div className="flex items-center gap-[0.5px]">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="w-[10px] h-[10px] fill-amber-400 stroke-amber-400" />)}
                                    </div>
                                </div>
                            </div>

                            {/* Plus Badge */}
                            <div
                                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                                className="absolute top-[50%] -right-[12px] -translate-y-1/2 w-[32px] h-[32px] bg-[#A0134D] rounded-full flex items-center justify-center text-white shadow-xl z-10 cursor-pointer active:scale-95 transition-transform hover:rotate-90 duration-300"
                            >
                                <Plus className="w-[18px] h-[18px]" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="flex flex-col pt-[40px] lg:items-end">
                    <div ref={bodyTextRef} className="mb-12 lg:text-right">
                        <p className="text-[15px] leading-relaxed text-[#555] max-w-[320px] font-medium">
                            Toronto's premier clinical mastership in <br />
                            <span className="text-black font-bold underline decoration-pink-200 underline-offset-4">Advanced Medical Aesthetics</span> and dermal rituals.
                        </p>
                    </div>

                    <div ref={heroImgRef} className="relative group self-center lg:self-end">
                        <div className="w-[300px] h-[340px] sm:w-[400px] sm:h-[440px] rounded-[40px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.1)] border-[8px] border-white ring-1 ring-black/5">
                            <img
                                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=85&auto=format&fit=crop"
                                alt="R.B Beauty Clinic Ritual"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* Arrow Badge */}
                        <div
                            ref={arrowBadgeRef}
                            className="absolute -top-[20px] -left-[20px] sm:-top-[30px] sm:-left-[30px] w-[60px] h-[60px] sm:w-[90px] sm:h-[90px] bg-white rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.1)] flex items-center justify-center z-10 border border-black/5"
                        >
                            <div className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] bg-[#eee] rounded-full flex items-center justify-center">
                                <ArrowUpRight className="w-[20px] h-[20px] sm:w-[32px] sm:h-[32px] text-black stroke-[3px]" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};


export default Hero;
