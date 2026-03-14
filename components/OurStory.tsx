'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Heart, Globe, Star, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const OurStory = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to('.counter', {
                innerText: (i: number, target: HTMLElement) => target.dataset.target || "0",
                duration: 2.5,
                snap: { innerText: 1 },
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.counter',
                    start: "top 95%",
                }
            });

            gsap.to('.story-reveal', {
                y: 0,
                opacity: 1,
                stagger: 0.15,
                duration: 1.2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const chapters = [
        {
            title: "Visionary Roots",
            icon: Heart,
            content: "Founded on the belief that everyone deserves clinical-grade care delivered with artisan precision and warmth."
        },
        {
            title: "Curated Excellence",
            icon: Globe,
            content: "We scour the globe for the most advanced technologies, bringing FDA-approved innovations to Canada."
        },
        {
            title: "Your Radiance, Defined",
            icon: Sparkles,
            content: "Personalized treatment plans crafted by experts who understand that your beauty profile is unique."
        }
    ];

    return (
        <section id="story" ref={sectionRef} className="section-padding bg-ivory overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-deep-rose/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
                    {/* Visual Side */}
                    <div className="relative group">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-[4rem] shadow-premium z-10 group-hover:shadow-2xl transition-all duration-700">
                            <Image
                                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1288"
                                alt="Clinic Story"
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
                        </div>

                        {/* Floating Stats Card */}
                        <div className="absolute -bottom-8 -right-8 glass-card p-10 shadow-2xl z-20 transform group-hover:-translate-y-4 transition-transform duration-700 border-white/40">
                            <div className="flex flex-col items-center justify-center">
                                <span className="font-display text-6xl md:text-7xl text-deep-rose font-bold block leading-none">
                                    <span className="counter" data-target="500">0</span>+
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/40 mt-2">Verified Transformations</span>
                            </div>
                        </div>

                        {/* Decorative Element */}
                        <div className="absolute top-10 -left-10 w-24 h-24 border border-deep-rose/20 rounded-full animate-spin-slow" />
                    </div>

                    {/* Narrative Side */}
                    <div className="space-y-16">
                        <div className="story-reveal reveal-hidden">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-px bg-warm-gold/40" />
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-warm-gold">Our Philosophy</span>
                            </div>
                            <h2 className="font-display text-6xl md:text-8xl text-charcoal leading-[0.85] mb-8">
                                A Heritage of <br />
                                <span className="italic font-light text-gradient">Luminous</span> Results
                            </h2>
                            <p className="text-soft-gray font-sans text-lg md:text-xl leading-relaxed max-w-xl">
                                We combine medical precision with a luxury boutique experience. Every treatment is an
                                investment in your long-term confidence and skin health.
                            </p>
                        </div>

                        <div className="space-y-12">
                            {chapters.map((chapter, index) => (
                                <div key={index} className="story-reveal reveal-hidden flex items-start gap-8 group/item">
                                    <div className="relative w-16 h-16 rounded-[2rem] bg-white shadow-xl flex items-center justify-center flex-shrink-0 group-hover/item:bg-deep-rose transition-all duration-500 transform group-hover/item:-translate-y-2 group-hover/item:rotate-6">
                                        <chapter.icon className="w-7 h-7 text-deep-rose group-hover/item:text-white transition-all" />
                                    </div>
                                    <div className="space-y-3 pt-2">
                                        <h3 className="font-display text-3xl text-charcoal group-hover/item:text-deep-rose transition-colors duration-300">{chapter.title}</h3>
                                        <p className="text-soft-gray text-base leading-relaxed font-sans max-w-sm">
                                            {chapter.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="story-reveal reveal-hidden pt-4">
                            <button className="btn-secondary !border-transparent !bg-transparent !p-0 hover:!text-deep-rose-dark group">
                                <span className="text-[11px] font-black uppercase tracking-[0.4em]">Learn Our Legacy</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-4 transition-transform text-deep-rose" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurStory;
