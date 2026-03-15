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
            className="relative min-h-[100vh] w-full flex items-center pt-[80px] pb-[60px] px-[64px] overflow-hidden"
            style={{
                background: `
                    radial-gradient(circle at 10% 20%, #f9c5c5 0%, transparent 50%),
                    radial-gradient(circle at 90% 10%, #d8c8f0 0%, transparent 50%),
                    radial-gradient(circle at 50% 90%, #c8d8f0 0%, transparent 60%),
                    rgba(255, 255, 255, 0.9)
                `
            }}
        >
            <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[48px] items-start">

                {/* LEFT COLUMN */}
                <div className="flex flex-col pt-[40px]">
                    <div ref={titleRef} className="z-10">
                        <h1 className="text-[48px] font-bold text-[#111] leading-[1.1] font-playfair uppercase">
                            CARE FOR YOUR SKIN, <br />
                            CARE FOR YOUR BEAUTY
                        </h1>
                    </div>

                    <div ref={ctaRef} className="flex items-center gap-[12px] mt-[24px] z-10">
                        <Link
                            href="#shop"
                            className="bg-[#111] text-white px-[24px] py-[12px] rounded-full text-[14px] font-medium flex items-center gap-2 hover:bg-black transition-all group"
                        >
                            Shop Now
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                        <button
                            className="border-[1.5px] border-[#333] text-[#333] bg-transparent px-[24px] py-[12px] rounded-full text-[14px] font-medium transition-all hover:bg-black/5"
                        >
                            Watch Video
                        </button>
                    </div>

                    {/* FLOATING CARD ROW */}
                    <div className="flex items-end gap-[12px] mt-[40px] z-20">
                        {/* CARD A — Special Offer card */}
                        <div
                            ref={addToCards}
                            className="w-[180px] h-[190px] rounded-[16px] p-[16px] relative shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-xl flex flex-col justify-between overflow-hidden"
                            style={{
                                background: 'linear-gradient(135deg, rgba(216, 200, 240, 0.5) 0%, rgba(200, 216, 240, 0.5) 100%)',
                            }}
                        >
                            <div className="flex justify-between items-start">
                                <span className="bg-white/30 backdrop-blur-md px-[8px] py-[4px] rounded-full text-[11px] font-medium text-white">
                                    Special Offer
                                </span>
                                <div className="w-[28px] h-[28px] bg-white rounded-full flex items-center justify-center shadow-sm">
                                    <ArrowUpRight className="w-[14px] h-[14px] text-black" />
                                </div>
                            </div>

                            <div className="text-white mt-4">
                                <p className="text-[18px] font-bold leading-tight uppercase">Upto</p>
                                <p className="text-[28px] font-extrabold leading-tight -mt-1 uppercase">20% off</p>
                                <div className="mt-2 space-y-0.5 opacity-90">
                                    <p className="text-[11px]">Save this holiday season</p>
                                    <p className="text-[11px]">using the code Y2024</p>
                                </div>
                            </div>
                        </div>

                        {/* CARD B — Review + Product card */}
                        <div
                            ref={addToCards}
                            className="w-[160px] rounded-[16px] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] flex flex-col relative"
                        >
                            {/* TOP SECTION: Review */}
                            <div className="p-[12px] pb-[8px]">
                                <div className="flex items-center gap-[8px] mb-[6px]">
                                    <div className="w-[28px] h-[28px] bg-gray-200 rounded-full flex-shrink-0" />
                                    <span className="text-[13px] font-bold text-black">I just love it</span>
                                </div>
                                <p className="text-[11px] text-[#666] leading-[1.3]">
                                    This product is just wow I love the fragrance I love the aura blew it
                                </p>
                            </div>

                            <div className="h-[1px] w-full bg-[#eee]" />

                            {/* BOTTOM SECTION: Product */}
                            <div className="p-[12px] pt-[8px] flex items-center gap-[8px]">
                                <div className="w-[40px] h-[50px] bg-[#f8f8f8] rounded-[8px] overflow-hidden flex-shrink-0 border border-[#eee]">
                                    <img
                                        src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=200&auto=format&fit=crop"
                                        alt="Product"
                                        className="w-full h-full object-cover mix-blend-multiply"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[13px] font-bold text-black leading-tight">Brightening Facial</span>
                                    <span className="text-[11px] text-[#999] mb-[2px]">30 ml</span>
                                    <div className="flex items-center gap-[0.5px]">
                                        {[...Array(4)].map((_, i) => <Star key={i} className="w-[10px] h-[10px] fill-amber-400 stroke-amber-400" />)}
                                        <Star className="w-[10px] h-[10px] fill-gray-200 stroke-gray-200" />
                                    </div>
                                    <span className="text-[14px] font-bold text-black mt-[2px] leading-tight">$100.45</span>
                                </div>
                            </div>

                            {/* Plus Badge */}
                            <div className="absolute top-[50%] -right-[12px] -translate-y-1/2 w-[24px] h-[24px] bg-[#1a9d82] rounded-full flex items-center justify-center text-white shadow-md z-10 cursor-pointer hover:scale-110 transition-transform">
                                <Plus className="w-[14px] h-[14px]" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="flex flex-col pt-[40px]">
                    <div ref={bodyTextRef} className="mb-8">
                        <p className="text-[14px] leading-relaxed text-[#555] max-w-[320px] font-normal">
                            Our skin care clinic best dermatologists in <br />
                            Lahore and Islamabad offer premium aesthetics.
                        </p>
                    </div>

                    <div ref={heroImgRef} className="relative w-full max-w-[320px]">
                        <div className="w-full h-[340px] rounded-[20px] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                            <img
                                src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=800&auto=format&fit=crop"
                                alt="Skincare Portrait"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Arrow Badge Badge */}
                        <div
                            ref={arrowBadgeRef}
                            className="absolute -top-[26px] -right-[26px] w-[52px] h-[52px] bg-white rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.08)] flex items-center justify-center z-10"
                        >
                            <ArrowUpRight className="w-[20px] h-[20px] text-black" />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;


