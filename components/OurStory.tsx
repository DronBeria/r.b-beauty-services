'use client';

import React, { useEffect, useRef } from 'react';
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
            title: "Personalized Care",
            icon: Heart,
            content: "Every treatment is carefully customized based on your skin type and concerns — because no two clients are the same."
        },
        {
            title: "Modern Technology",
            icon: Globe,
            content: "We use modern equipment and high-quality professional products to ensure safe, effective, and long-lasting results."
        },
        {
            title: "Comfortable Environment",
            icon: Sparkles,
            content: "A clean, relaxing space where clients receive professional treatments they can trust — designed around your comfort."
        }
    ];

    return (
        <section id="story" ref={sectionRef} className="section-padding bg-ivory overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-deep-rose/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center">
                    {/* Visual Side */}
                    <div className="relative group">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] md:rounded-[4rem] shadow-premium z-10 group-hover:shadow-2xl transition-all duration-700">
                            <img
                                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=85&auto=format&fit=crop"
                                alt="Clinic Story"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 absolute inset-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
                        </div>

                        {/* Floating Stats Card */}
                        <div className="absolute -bottom-4 -right-3 md:-bottom-8 md:-right-8 glass-card p-5 md:p-10 shadow-2xl z-20 transform group-hover:-translate-y-4 transition-transform duration-700 border-white/40">
                            <div className="flex flex-col items-center justify-center">
                                <span className="font-display text-4xl md:text-6xl lg:text-7xl text-deep-rose font-bold block leading-none">
                                    <span className="counter" data-target="500">0</span>+
                                </span>
                                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-charcoal/40 mt-1 md:mt-2">Verified Transformations</span>
                            </div>
                        </div>

                        {/* Decorative Element */}
                        <div className="hidden sm:block absolute top-10 -left-10 w-24 h-24 border border-deep-rose/20 rounded-full animate-spin-slow" />
                    </div>

                    {/* Narrative Side */}
                    <div className="space-y-10 md:space-y-16">
                        <div className="story-reveal reveal-hidden">
                            <div className="flex items-center gap-3 mb-5 md:mb-6">
                                <div className="w-12 h-px bg-warm-gold/40" />
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-warm-gold">About Our Clinic</span>
                            </div>
                            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-charcoal leading-[0.85] mb-6 md:mb-8">
                                Advanced Technology, <br />
                                <span className="italic font-light text-gradient">Visible Results</span>
                            </h2>
                            <p className="text-soft-gray font-sans text-base md:text-lg lg:text-xl leading-relaxed max-w-xl">
                                At R.D. Beauty & Laser Clinic, advanced technology and professional skincare come together
                                to deliver smoother skin, improved texture, and a more radiant complexion — for men and women in Beaumont.
                            </p>
                        </div>

                        <div className="space-y-8 md:space-y-12">
                            {chapters.map((chapter, index) => (
                                <div key={index} className="story-reveal reveal-hidden flex items-start gap-5 md:gap-8 group/item">
                                    <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-[1.5rem] md:rounded-[2rem] bg-white shadow-xl flex items-center justify-center flex-shrink-0 group-hover/item:bg-deep-rose transition-all duration-500 transform group-hover/item:-translate-y-2 group-hover/item:rotate-6">
                                        <chapter.icon className="w-5 h-5 md:w-7 md:h-7 text-deep-rose group-hover/item:text-white transition-all" />
                                    </div>
                                    <div className="space-y-2 md:space-y-3 pt-1 md:pt-2">
                                        <h3 className="font-display text-xl md:text-3xl text-charcoal group-hover/item:text-deep-rose transition-colors duration-300">{chapter.title}</h3>
                                        <p className="text-soft-gray text-sm md:text-base leading-relaxed font-sans max-w-sm">
                                            {chapter.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="story-reveal reveal-hidden pt-4">
                            <button className="btn-secondary !border-transparent !bg-transparent !p-0 hover:!text-deep-rose-dark group">
                                <span className="text-[11px] font-black uppercase tracking-[0.4em]">Book Your Appointment</span>
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
