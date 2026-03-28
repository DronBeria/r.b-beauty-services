'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Heart, Globe, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const OurStory = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
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
        <section
            id="story"
            ref={sectionRef}
            className="section-padding overflow-hidden relative"
            style={{ background: 'linear-gradient(140deg, #140F0A 0%, #1C1510 50%, #140F0A 100%)' }}
        >
            {/* Ambient orbs */}
            <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(168,136,60,0.1) 0%, transparent 65%)', filter: 'blur(60px)' }} />
            <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(160,19,77,0.08) 0%, transparent 65%)', filter: 'blur(60px)' }} />

            {/* Top gold rule */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(168,136,60,0.3) 30%, rgba(196,160,80,0.5) 50%, rgba(168,136,60,0.3) 70%, transparent)' }} />

            {/* Sparkle accents */}
            <div className="absolute pointer-events-none select-none" aria-hidden="true">
                <div style={{ position: 'absolute', top: '15%', right: '8%', fontSize: '11px', color: 'rgba(168,136,60,0.3)', animation: 'pulse-soft 4s ease-in-out infinite' }}>✦</div>
                <div style={{ position: 'absolute', bottom: '20%', left: '6%', fontSize: '8px', color: 'rgba(168,136,60,0.2)', animation: 'pulse-soft 6s ease-in-out infinite 1.5s' }}>✦</div>
                <div style={{ position: 'absolute', top: '50%', left: '3%', width: 4, height: 4, borderRadius: '50%', background: 'rgba(168,136,60,0.25)', animation: 'float 9s ease-in-out infinite' }} />
            </div>

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center">

                    {/* Visual Side */}
                    <div className="relative group">
                        {/* Decorative gold frame behind image */}
                        <div className="absolute -top-4 -left-4 w-full h-full rounded-[3.5rem] pointer-events-none"
                            style={{ border: '1px solid rgba(168,136,60,0.15)', borderRadius: '4.5rem' }} />

                        <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] md:rounded-[4rem] z-10 group-hover:shadow-2xl transition-all duration-700"
                            style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(168,136,60,0.12)' }}>
                            <img
                                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=85&auto=format&fit=crop"
                                alt="Clinic Story"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 absolute inset-0"
                            />
                            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(20,15,10,0.6) 0%, transparent 50%)' }} />
                        </div>

                        {/* Info card */}
                        <div className="absolute -bottom-4 -right-3 md:-bottom-8 md:-right-8 z-20 transform group-hover:-translate-y-4 transition-transform duration-700 max-w-[200px]"
                            style={{
                                background: 'rgba(20,15,10,0.85)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(168,136,60,0.25)',
                                borderRadius: '1.5rem',
                                padding: '20px 24px',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                            }}>
                            <p className="text-[9px] font-black uppercase tracking-[0.3em] mb-1.5" style={{ color: 'rgba(168,136,60,0.6)' }}>Based in</p>
                            <p className="font-display text-[1.05rem] font-bold leading-tight" style={{ color: 'rgba(255,255,255,0.9)' }}>Beaumont, Alberta</p>
                            <p className="text-[10px] font-sans mt-1 leading-snug" style={{ color: 'rgba(255,255,255,0.35)' }}>Serving clients with personalized clinical care</p>
                        </div>

                        {/* Decorative ring */}
                        <div className="hidden sm:block absolute top-10 -left-10 w-24 h-24 rounded-full animate-spin-slow"
                            style={{ border: '1px dashed rgba(168,136,60,0.2)' }} />
                    </div>

                    {/* Narrative Side */}
                    <div className="space-y-10 md:space-y-16">
                        <div className="story-reveal reveal-hidden">
                            <div className="flex items-center gap-3 mb-5 md:mb-6">
                                <div className="w-12 h-px" style={{ background: 'rgba(168,136,60,0.5)' }} />
                                <span className="text-[10px] font-black uppercase tracking-[0.5em]" style={{ color: 'rgba(168,136,60,0.8)' }}>About Our Clinic</span>
                            </div>
                            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-8xl leading-[0.85] mb-6 md:mb-8"
                                style={{ color: 'rgba(255,255,255,0.92)' }}>
                                Advanced Technology,{' '}
                                <br />
                                <span className="italic font-light" style={{
                                    background: 'linear-gradient(135deg, #A8883C, #C4A050)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}>Visible Results</span>
                            </h2>
                            <p className="font-sans text-base md:text-lg lg:text-xl leading-relaxed max-w-xl" style={{ color: 'rgba(255,255,255,0.45)' }}>
                                At R.D. Beauty & Laser Clinic, advanced technology and professional skincare come together
                                to deliver smoother skin, improved texture, and a more radiant complexion — for men and women in Beaumont.
                            </p>
                        </div>

                        <div className="space-y-6 md:space-y-8">
                            {chapters.map((chapter, index) => (
                                <div key={index} className="story-reveal reveal-hidden flex items-start gap-5 md:gap-7 group/item">
                                    <div
                                        className="relative w-12 h-12 md:w-14 md:h-14 rounded-[1.5rem] flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover/item:scale-110"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(168,136,60,0.18), rgba(196,160,80,0.08))',
                                            border: '1px solid rgba(168,136,60,0.25)',
                                            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                                        }}
                                    >
                                        <chapter.icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: 'rgba(196,160,80,0.9)' }} />
                                    </div>
                                    <div className="space-y-1.5 md:space-y-2 pt-1">
                                        <h3 className="font-display text-xl md:text-2xl transition-colors duration-300"
                                            style={{ color: 'rgba(255,255,255,0.88)' }}>
                                            {chapter.title}
                                        </h3>
                                        <p className="text-sm md:text-base leading-relaxed font-sans max-w-sm" style={{ color: 'rgba(255,255,255,0.38)' }}>
                                            {chapter.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="story-reveal reveal-hidden pt-2">
                            <a
                                href="https://app.squareup.com/appointments/book/mfaodungeatf80/L15XQCCP0YC3D/start"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-3"
                            >
                                <span className="text-[11px] font-black uppercase tracking-[0.4em]"
                                    style={{ color: 'rgba(168,136,60,0.8)' }}>Book Your Appointment</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-3 transition-transform" style={{ color: 'rgba(168,136,60,0.8)' }} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom gold rule */}
            <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(168,136,60,0.2) 30%, rgba(168,136,60,0.35) 50%, rgba(168,136,60,0.2) 70%, transparent)' }} />
        </section>
    );
};

export default OurStory;
