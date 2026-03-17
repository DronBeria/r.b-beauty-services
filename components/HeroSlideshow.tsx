'use client';

import React, { useEffect, useRef, useState } from 'react';

const SLIDES = [
    {
        src: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=900&q=90&auto=format&fit=crop&crop=faces',
        alt: 'Radiant skin close-up',
    },
    {
        src: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=900&q=90&auto=format&fit=crop&crop=faces',
        alt: 'Beauty treatment glow',
    },
    {
        src: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=900&q=90&auto=format&fit=crop&crop=faces',
        alt: 'Professional skincare',
    },
    {
        src: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=900&q=90&auto=format&fit=crop&crop=faces',
        alt: 'Laser beauty treatment',
    },
];

const INTERVAL_MS = 4500;
const FADE_MS = 1400;

const HeroSlideshow = () => {
    const [current, setCurrent] = useState(0);
    const [next, setNext] = useState<number | null>(null);
    const [transitioning, setTransitioning] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const advance = () => {
            const nextIndex = (current + 1) % SLIDES.length;
            setNext(nextIndex);
            setTransitioning(true);

            timerRef.current = setTimeout(() => {
                setCurrent(nextIndex);
                setNext(null);
                setTransitioning(false);
            }, FADE_MS);
        };

        const id = setInterval(advance, INTERVAL_MS);
        return () => {
            clearInterval(id);
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [current]);

    return (
        <div className="relative w-full h-full">

            {/* Decorative frame ring */}
            <div
                className="absolute pointer-events-none z-10"
                style={{
                    inset: '-12px',
                    borderRadius: '3rem',
                    border: '1px solid rgba(160,19,77,0.12)',
                }}
            />
            <div
                className="absolute pointer-events-none z-10"
                style={{
                    inset: '-24px',
                    borderRadius: '3.5rem',
                    border: '1px dashed rgba(154,123,79,0.10)',
                }}
            />

            {/* Image stack */}
            <div
                className="relative w-full h-full overflow-hidden"
                style={{ borderRadius: '2.5rem' }}
            >
                {/* Current image */}
                <img
                    key={`cur-${current}`}
                    src={SLIDES[current].src}
                    alt={SLIDES[current].alt}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    style={{
                        opacity: transitioning ? 0 : 1,
                        transition: `opacity ${FADE_MS}ms ease`,
                        zIndex: 1,
                    }}
                />

                {/* Next image fading in */}
                {next !== null && (
                    <img
                        key={`next-${next}`}
                        src={SLIDES[next].src}
                        alt={SLIDES[next].alt}
                        className="absolute inset-0 w-full h-full object-cover object-center"
                        style={{
                            opacity: transitioning ? 1 : 0,
                            transition: `opacity ${FADE_MS}ms ease`,
                            zIndex: 2,
                        }}
                    />
                )}

                {/* Gradient overlays for depth */}
                <div
                    className="absolute inset-0 pointer-events-none z-[3]"
                    style={{
                        background: 'linear-gradient(to bottom, rgba(253,250,247,0.12) 0%, transparent 30%, transparent 60%, rgba(253,250,247,0.18) 100%)',
                    }}
                />
                {/* Left edge fade to blend with page bg */}
                <div
                    className="absolute inset-y-0 left-0 w-16 pointer-events-none z-[3]"
                    style={{
                        background: 'linear-gradient(to right, rgba(253,250,247,0.35), transparent)',
                    }}
                />
            </div>

            {/* Dot indicators */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                {SLIDES.map((_, i) => (
                    <div
                        key={i}
                        className="rounded-full transition-all duration-700"
                        style={{
                            width: i === current ? '22px' : '6px',
                            height: '6px',
                            background: i === current ? '#A0134D' : 'rgba(160,19,77,0.22)',
                        }}
                    />
                ))}
            </div>

            {/* Subtle floating label */}
            <div
                className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-white/80 backdrop-blur-xl px-3.5 py-2 rounded-full border border-white/60 shadow-lg"
            >
                <div className="w-1.5 h-1.5 rounded-full bg-deep-rose animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-charcoal/60">R.D. Beauty</span>
            </div>
        </div>
    );
};

export default HeroSlideshow;
