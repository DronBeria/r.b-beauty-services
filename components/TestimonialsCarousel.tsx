'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

const TESTIMONIALS = [
    { name: 'Sarah J.', text: 'The most professional laser clinic in Edmonton. Amazing results in just 3 sessions — smooth, hair-free skin and zero irritation. Absolutely love it!', tag: 'Laser Hair Removal' },
    { name: 'Elena R.', text: 'The HydraFacial was a life-saver for my wedding prep. My skin has never looked so smooth and glowing — everyone noticed the difference!', tag: 'HydraFacial' },
    { name: 'Jessica M.', text: 'Highly recommend R.D. Beauty & Laser Clinic! The staff are so knowledgeable and make you feel completely at ease. The environment is clean, relaxing, and professional.', tag: 'Skin Rejuvenation' },
    { name: 'Priya S.', text: "I've been going for threading and waxing for months now. Consistently great results, super gentle, and the booking via WhatsApp is so convenient!", tag: 'Threading & Waxing' },
    { name: 'Michelle T.', text: 'Microneedling has transformed my skin texture. After just two sessions I can already see a visible improvement in my pores and fine lines. Highly recommend!', tag: 'Microneedling' },
];

const TestimonialsCarousel = () => {
    const [active, setActive] = useState(0);
    const [fading, setFading] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const isPausedRef = useRef(false);

    const goTo = (index: number) => {
        if (index === active) return;
        setFading(true);
        setTimeout(() => {
            setActive(index);
            setFading(false);
        }, 400);
    };

    const advance = () => {
        if (isPausedRef.current) return;
        setFading(true);
        setTimeout(() => {
            setActive(prev => (prev + 1) % TESTIMONIALS.length);
            setFading(false);
        }, 400);
    };

    useEffect(() => {
        intervalRef.current = setInterval(advance, 5000);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const rev = TESTIMONIALS[active];

    return (
        <section className="section-padding bg-white relative overflow-hidden">
            <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
            <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-warm-gold/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="container-custom relative z-10">
                <div className="text-center mb-16 md:mb-20">
                    <div className="inline-flex items-center gap-3 mb-5">
                        <div className="w-10 h-px bg-warm-gold/30" />
                        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-warm-gold font-sans">Client Stories</span>
                        <div className="w-10 h-px bg-warm-gold/30" />
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-7xl text-charcoal mb-6 md:mb-8 leading-[0.9]">
                        Real Stories <br />
                        <span className="italic font-light text-gradient">of Transformation</span>
                    </h2>
                </div>

                {/* Card */}
                <div
                    className="max-w-3xl mx-auto"
                    onMouseEnter={() => { isPausedRef.current = true; }}
                    onMouseLeave={() => { isPausedRef.current = false; }}
                >
                    <div
                        className="glass-card !rounded-[2.5rem] p-8 md:p-14 relative border-charcoal/5"
                        style={{
                            opacity: fading ? 0 : 1,
                            transform: fading ? 'translateY(8px)' : 'translateY(0)',
                            transition: 'opacity 0.4s ease, transform 0.4s ease',
                        }}
                    >
                        <Quote className="absolute top-8 right-8 w-12 h-12 text-charcoal/[0.04]" />
                        <div className="flex gap-1 mb-8">
                            {[...Array(5)].map((_, s) => <Star key={s} className="w-4 h-4 text-warm-gold fill-warm-gold" />)}
                        </div>
                        <p className="text-charcoal/65 font-sans text-lg md:text-xl leading-relaxed mb-10 italic">
                            &ldquo;{rev.text}&rdquo;
                        </p>
                        <div className="flex flex-col gap-1">
                            <span className="text-[12px] font-black uppercase tracking-[0.3em] text-charcoal">{rev.name}</span>
                            <span className="text-[9px] font-black uppercase tracking-widest text-deep-rose/40 font-sans">{rev.tag}</span>
                        </div>
                    </div>

                    {/* Dot indicators */}
                    <div className="flex items-center justify-center gap-2.5 mt-8">
                        {TESTIMONIALS.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                className="transition-all duration-500 rounded-full"
                                style={{
                                    width: i === active ? '28px' : '8px',
                                    height: '8px',
                                    background: i === active ? '#A0134D' : 'rgba(160,19,77,0.2)',
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="mt-14 pt-10 border-t border-charcoal/5 flex justify-center">
                    <div className="flex items-center gap-4 bg-charcoal/4 px-7 py-3 rounded-full border border-charcoal/5">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="font-black text-[9px] uppercase tracking-[0.3em] text-charcoal/50">Verified Reviews • 4.9 / 5 Across 200+ Clients</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsCarousel;
