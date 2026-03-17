'use client';

import React, { useEffect, useRef, useState } from 'react';

const SLIDES = [
    {
        src: 'https://videos.pexels.com/video-files/3997992/3997992-hd_1920_1080_30fps.mp4',
        poster: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&q=90&auto=format&fit=crop',
        label: 'Signature Facial',
    },
    {
        src: 'https://videos.pexels.com/video-files/5550210/5550210-hd_1920_1080_30fps.mp4',
        poster: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=90&auto=format&fit=crop',
        label: 'Clinical Skincare',
    },
    {
        src: 'https://videos.pexels.com/video-files/4046457/4046457-hd_1920_1080_30fps.mp4',
        poster: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=900&q=90&auto=format&fit=crop',
        label: 'Precision Threading',
    },
    {
        src: 'https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_30fps.mp4',
        poster: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=900&q=90&auto=format&fit=crop',
        label: 'Laser Excellence',
    },
];

const INTERVAL_MS = 9000; // Slower interval for editorial feel
const FADE_MS = 2500;     // Softer crossfade

const HeroSlideshow = () => {
    const [current, setCurrent] = useState(0);
    const [prev, setPrev] = useState<number | null>(null);
    const [fading, setFading] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const advance = () => {
            const next = (current + 1) % SLIDES.length;
            setPrev(current);
            setFading(true);
            timerRef.current = setTimeout(() => {
                setCurrent(next);
                setFading(false);
                setPrev(null);
            }, FADE_MS);
        };
        const id = setInterval(advance, INTERVAL_MS);
        return () => { clearInterval(id); if (timerRef.current) clearTimeout(timerRef.current); };
    }, [current]);

    return (
        <div className="absolute inset-0 overflow-hidden bg-[#0C0908]">

            {/* ── Film Grain Overlay ────────────────────────── */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.035] z-[8]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    animation: 'grain 8s steps(10) infinite',
                }}
            />

            {/* ── Active Background Group ─────────────────── */}
            <div className="absolute inset-0 z-[1]">
                {/* Previous Slide */}
                {prev !== null && (
                    <video
                        key={`prev-${prev}`}
                        src={SLIDES[prev].src}
                        poster={SLIDES[prev].poster}
                        autoPlay muted loop playsInline
                        className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] brightness-90"
                        style={{
                            opacity: fading ? 0 : 0.85,
                            transform: fading ? 'scale(1.08) translate(0.5%, 0.5%)' : 'scale(1.04)',
                            transition: `opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                        }}
                    />
                )}

                {/* Current Slide */}
                <video
                    key={`cur-${current}`}
                    src={SLIDES[current].src}
                    poster={SLIDES[current].poster}
                    autoPlay muted loop playsInline
                    className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] brightness-95"
                    style={{
                        opacity: fading ? 0 : 0.85,
                        transform: fading ? 'scale(0.96)' : 'scale(1)',
                        transition: `opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                        animation: !fading ? `cinematicMotion ${INTERVAL_MS + 2000}ms ease-out forwards` : 'none',
                    }}
                />
            </div>

            {/* ── Editorial Color Grading ──────────────────── */}
            <div className="absolute inset-0 pointer-events-none z-[5]" style={{
                background: 'linear-gradient(135deg, rgba(253,236,216,0.12) 0%, transparent 40%, rgba(132,32,71,0.08) 100%)',
                mixBlendMode: 'soft-light',
            }} />

            {/* ── Cinematic Vignette & Fade ───────────────── */}
            <div className="absolute inset-0 pointer-events-none z-[6]" style={{
                background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(12,9,8,0.4) 100%)',
            }} />

            {/* Edge Blending (into the cream/dark layout) */}
            <div className="absolute inset-y-0 left-0 w-[25%] pointer-events-none z-[7]" style={{
                background: 'linear-gradient(to right, #fdecd8 0%, rgba(253,236,216,0.8) 20%, transparent 100%)',
                mixBlendMode: 'normal',
            }} />

            {/* ── Label & Indicators ───────────────────────── */}
            <div className="absolute bottom-12 right-12 z-[10] flex items-center gap-3 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full py-2 px-5 transition-all duration-700">
                <div className="w-1.5 h-1.5 rounded-full bg-[#A21D4E] animate-pulse" />
                <span className="text-[9px] font-bold text-white/50 uppercase tracking-[0.4em]">
                    {SLIDES[current].label}
                </span>
            </div>

            <style>{`
                @keyframes cinematicMotion {
                    0%   { transform: scale(1.0) translate(0, 0); filter: blur(2px) contrast(1.1); }
                    10%  { filter: blur(0) contrast(1.05); }
                    100% { transform: scale(1.08) translate(-1%, -0.5%); filter: blur(0) contrast(1.0); }
                }
                @keyframes grain {
                    0%, 100% { transform: translate(0, 0); }
                    10% { transform: translate(-5%, -10%); }
                    30% { transform: translate(-10%, 5%); }
                    50% { transform: translate(10%, 10%); }
                    70% { transform: translate(5%, -5%); }
                    90% { transform: translate(-5%, 0); }
                }
            `}</style>
        </div>
    );
};

export default HeroSlideshow;

