'use client';

import React, { useEffect, useRef, useState } from 'react';

const SLIDES = [
    {
        src: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1000&q=95&auto=format&fit=crop&crop=faces,entropy',
        alt: 'Radiant skin close-up',
    },
    {
        src: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1000&q=95&auto=format&fit=crop&crop=faces,entropy',
        alt: 'Beauty treatment glow',
    },
    {
        src: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1000&q=95&auto=format&fit=crop&crop=faces,entropy',
        alt: 'Professional skincare',
    },
    {
        src: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=1000&q=95&auto=format&fit=crop&crop=faces,entropy',
        alt: 'Laser beauty treatment',
    },
];

const INTERVAL_MS = 5000;
const FADE_MS = 1800;

const HeroSlideshow = () => {
    const [current, setCurrent] = useState(0);
    const [prev, setPrev] = useState<number | null>(null);
    const [fading, setFading] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const advance = () => {
            const nextIndex = (current + 1) % SLIDES.length;
            setPrev(current);
            setFading(true);
            setTimeout(() => {
                setCurrent(nextIndex);
                setFading(false);
                setPrev(null);
            }, FADE_MS);
        };

        const id = setInterval(advance, INTERVAL_MS);
        return () => {
            clearInterval(id);
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [current]);

    return (
        <div className="relative w-full h-full overflow-visible">

            {/* ── Image stack — no border, no box ── */}
            <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: '0' }}>

                {/* Previous image fading out */}
                {prev !== null && (
                    <img
                        key={`prev-${prev}`}
                        src={SLIDES[prev].src}
                        alt={SLIDES[prev].alt}
                        className="absolute inset-0 w-full h-full object-cover object-top"
                        style={{
                            opacity: fading ? 0 : 1,
                            transition: `opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                            zIndex: 1,
                        }}
                    />
                )}

                {/* Current image fading in */}
                <img
                    key={`cur-${current}`}
                    src={SLIDES[current].src}
                    alt={SLIDES[current].alt}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    style={{
                        opacity: fading ? 0 : 1,
                        transition: `opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                        zIndex: 2,
                    }}
                />

                {/* ── Sunlight halo — warm radial glow from top-right ── */}
                <div
                    className="absolute pointer-events-none z-[3]"
                    style={{
                        inset: 0,
                        background: `
                            radial-gradient(ellipse 70% 55% at 72% -5%,
                                rgba(255, 220, 140, 0.38) 0%,
                                rgba(255, 190, 90, 0.18) 35%,
                                transparent 70%
                            )
                        `,
                    }}
                />

                {/* ── Light rays fanning down from top ── */}
                <div
                    className="absolute pointer-events-none z-[3]"
                    style={{
                        inset: 0,
                        background: `
                            conic-gradient(
                                from -20deg at 75% -10%,
                                transparent 0deg,
                                rgba(255,230,160,0.07) 8deg,
                                transparent 14deg,
                                rgba(255,220,130,0.05) 22deg,
                                transparent 30deg,
                                rgba(255,235,170,0.06) 40deg,
                                transparent 50deg
                            )
                        `,
                    }}
                />

                {/* ── Left-edge blend into page background ── */}
                <div
                    className="absolute inset-y-0 left-0 w-[38%] pointer-events-none z-[4]"
                    style={{
                        background: 'linear-gradient(to right, rgba(253,250,247,1) 0%, rgba(253,250,247,0.65) 40%, transparent 100%)',
                    }}
                />

                {/* ── Bottom edge blend ── */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-[4]"
                    style={{
                        background: 'linear-gradient(to top, rgba(253,250,247,0.55) 0%, transparent 100%)',
                    }}
                />

                {/* ── Top edge soft vignette ── */}
                <div
                    className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-[4]"
                    style={{
                        background: 'linear-gradient(to bottom, rgba(253,250,247,0.3) 0%, transparent 100%)',
                    }}
                />
            </div>

            {/* ── Warm ambient glow behind image (bleeds outside) ── */}
            <div
                className="absolute pointer-events-none"
                style={{
                    top: '-8%',
                    right: '-12%',
                    width: '60%',
                    height: '60%',
                    background: 'radial-gradient(circle, rgba(255,200,100,0.14) 0%, rgba(240,170,80,0.07) 50%, transparent 75%)',
                    filter: 'blur(40px)',
                    zIndex: 0,
                }}
            />
            <div
                className="absolute pointer-events-none"
                style={{
                    bottom: '10%',
                    right: '5%',
                    width: '45%',
                    height: '45%',
                    background: 'radial-gradient(circle, rgba(160,19,77,0.07) 0%, transparent 70%)',
                    filter: 'blur(50px)',
                    zIndex: 0,
                }}
            />

            {/* ── Dot indicators ── */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                {SLIDES.map((_, i) => (
                    <div
                        key={i}
                        className="rounded-full transition-all duration-700"
                        style={{
                            width: i === current ? '24px' : '6px',
                            height: '6px',
                            background: i === current
                                ? 'linear-gradient(90deg, #A0134D, #C2185B)'
                                : 'rgba(160,19,77,0.18)',
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSlideshow;
