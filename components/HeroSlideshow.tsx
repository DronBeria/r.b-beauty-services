'use client';

import React, { useEffect, useRef, useState } from 'react';

// Free Pexels beauty treatment videos — auto-loop, muted, no controls
const SLIDES = [
    {
        src: 'https://videos.pexels.com/video-files/3997992/3997992-hd_1920_1080_30fps.mp4',
        poster: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&q=90&auto=format&fit=crop',
        label: 'Facial Treatment',
    },
    {
        src: 'https://videos.pexels.com/video-files/5550210/5550210-hd_1920_1080_30fps.mp4',
        poster: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=90&auto=format&fit=crop',
        label: 'Waxing & Skincare',
    },
    {
        src: 'https://videos.pexels.com/video-files/4046457/4046457-hd_1920_1080_30fps.mp4',
        poster: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=900&q=90&auto=format&fit=crop',
        label: 'Spa & Relaxation',
    },
    {
        src: 'https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_30fps.mp4',
        poster: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=900&q=90&auto=format&fit=crop',
        label: 'Laser Hair Removal',
    },
];

export const SLIDE_COUNT = SLIDES.length;
const INTERVAL_MS = 6000;
const FADE_MS = 1200;

const HeroSlideshow = () => {
    const [current, setCurrent]       = useState(0);
    const [outgoing, setOutgoing]     = useState<number | null>(null);
    const [transitioning, setTrans]   = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const advance = (forceTo?: number) => {
        const next = forceTo !== undefined ? forceTo : (current + 1) % SLIDES.length;
        setOutgoing(current);
        setTrans(true);
        setTimeout(() => {
            setCurrent(next);
            setTrans(false);
            setOutgoing(null);
        }, FADE_MS);
    };

    useEffect(() => {
        intervalRef.current = setInterval(() => advance(), INTERVAL_MS);
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [current]);

    const reset = (i: number) => {
        if (i === current) return;
        if (intervalRef.current) clearInterval(intervalRef.current);
        advance(i);
        intervalRef.current = setInterval(() => advance(), INTERVAL_MS);
    };

    return (
        <div className="relative w-full h-full select-none">

            {/* ── Video stack ─────────────────────────────── */}
            <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: '2.8rem' }}>

                {/* Outgoing slide — fade + slow zoom out */}
                {outgoing !== null && (
                    <video
                        key={`out-${outgoing}`}
                        src={SLIDES[outgoing].src}
                        poster={SLIDES[outgoing].poster}
                        autoPlay muted loop playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{
                            zIndex: 1,
                            opacity: transitioning ? 0 : 1,
                            transform: transitioning ? 'scale(1.06)' : 'scale(1)',
                            transition: `opacity ${FADE_MS}ms cubic-bezier(0.4,0,0.2,1),
                                         transform ${FADE_MS}ms cubic-bezier(0.4,0,0.2,1)`,
                        }}
                    />
                )}

                {/* Active slide — fade in + slow Ken Burns zoom */}
                <video
                    key={`cur-${current}`}
                    src={SLIDES[current].src}
                    poster={SLIDES[current].poster}
                    autoPlay muted loop playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                        zIndex: 2,
                        opacity: transitioning ? 0 : 1,
                        transform: transitioning ? 'scale(0.96)' : 'scale(1)',
                        transition: `opacity ${FADE_MS}ms cubic-bezier(0.4,0,0.2,1),
                                     transform ${FADE_MS}ms cubic-bezier(0.4,0,0.2,1)`,
                        // Continuous slow Ken Burns while showing — via CSS animation
                        animation: !transitioning ? `kenBurns ${INTERVAL_MS}ms ease-in-out forwards` : 'none',
                    }}
                />

                {/* Warm sunlight bloom — top of video */}
                <div
                    className="absolute pointer-events-none"
                    style={{
                        inset: 0, zIndex: 3,
                        background: `
                            radial-gradient(ellipse 80% 50% at 60% -10%,
                                rgba(255,215,120,0.32) 0%,
                                rgba(255,180,70,0.14) 40%,
                                transparent 70%)`,
                    }}
                />

                {/* Light rays */}
                <div
                    className="absolute pointer-events-none"
                    style={{
                        inset: 0, zIndex: 3,
                        background: `conic-gradient(
                            from -18deg at 65% -8%,
                            transparent 0deg,
                            rgba(255,235,160,0.06) 7deg,
                            transparent 13deg,
                            rgba(255,220,130,0.045) 22deg,
                            transparent 30deg,
                            rgba(255,240,170,0.055) 40deg,
                            transparent 52deg)`,
                    }}
                />

                {/* Bottom fade — blends into hero bg */}
                <div
                    className="absolute bottom-0 inset-x-0 pointer-events-none"
                    style={{
                        height: '45%', zIndex: 4,
                        background: 'linear-gradient(to top, rgba(253,250,247,0.85) 0%, rgba(253,250,247,0.3) 50%, transparent 100%)',
                    }}
                />

                {/* Left-edge fade */}
                <div
                    className="absolute inset-y-0 left-0 pointer-events-none"
                    style={{
                        width: '30%', zIndex: 4,
                        background: 'linear-gradient(to right, rgba(253,250,247,0.75) 0%, transparent 100%)',
                    }}
                />
            </div>

            {/* ── Outer ambient glow (bleeds outside the card) ─ */}
            <div
                className="absolute -top-10 -right-10 pointer-events-none"
                style={{
                    width: '70%', height: '55%',
                    background: 'radial-gradient(circle, rgba(255,200,100,0.18) 0%, transparent 70%)',
                    filter: 'blur(50px)', zIndex: 0,
                }}
            />
            <div
                className="absolute -bottom-8 right-10 pointer-events-none"
                style={{
                    width: '55%', height: '40%',
                    background: 'radial-gradient(circle, rgba(160,19,77,0.09) 0%, transparent 70%)',
                    filter: 'blur(40px)', zIndex: 0,
                }}
            />

            {/* ── Currently playing label ───────────────────── */}
            <div
                className="absolute top-5 right-5 z-20 flex items-center gap-2
                            bg-white/70 backdrop-blur-xl px-3.5 py-2 rounded-full
                            border border-white/50 shadow-md"
            >
                <div className="w-1.5 h-1.5 rounded-full bg-deep-rose animate-pulse flex-shrink-0" />
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-charcoal/60 transition-all duration-700">
                    {SLIDES[current].label}
                </span>
            </div>

            {/* ── Dot indicators ────────────────────────────── */}
            <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
                {SLIDES.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => reset(i)}
                        className="rounded-full transition-all duration-700"
                        style={{
                            width: i === current ? '26px' : '7px',
                            height: '7px',
                            background: i === current
                                ? 'linear-gradient(90deg,#A0134D,#C2185B)'
                                : 'rgba(160,19,77,0.18)',
                        }}
                    />
                ))}
            </div>

            {/* Ken Burns keyframe injected once */}
            <style>{`
                @keyframes kenBurns {
                    0%   { transform: scale(1.0) translate(0%, 0%); }
                    100% { transform: scale(1.07) translate(-1%, -0.5%); }
                }
            `}</style>
        </div>
    );
};

export default HeroSlideshow;
