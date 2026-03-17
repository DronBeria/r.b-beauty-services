'use client';

import React, { useEffect, useRef, useState } from 'react';

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
        label: 'Threading',
    },
    {
        src: 'https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_30fps.mp4',
        poster: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=900&q=90&auto=format&fit=crop',
        label: 'Laser Hair Removal',
    },
];

const INTERVAL_MS = 6500;
const WIPE_MS     = 900;

const HeroSlideshow = () => {
    const [current,  setCurrent]  = useState(0);
    const [next,     setNext]     = useState<number | null>(null);
    const [wiping,   setWiping]   = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const goTo = (idx: number) => {
        if (wiping || idx === current) return;
        setNext(idx);
        setWiping(true);
        setTimeout(() => {
            setCurrent(idx);
            setNext(null);
            setWiping(false);
        }, WIPE_MS);
    };

    const advance = () => {
        setCurrent(prev => {
            const n = (prev + 1) % SLIDES.length;
            setNext(n);
            setWiping(true);
            setTimeout(() => {
                setCurrent(n);
                setNext(null);
                setWiping(false);
            }, WIPE_MS);
            return prev;
        });
    };

    useEffect(() => {
        intervalRef.current = setInterval(advance, INTERVAL_MS);
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, []);

    return (
        <div className="relative w-full h-full select-none overflow-visible">

            {/* ── Outer ambient glow ─── */}
            <div className="absolute -top-8 -right-8 w-[55%] h-[50%] pointer-events-none rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(255,210,100,0.22) 0%, transparent 70%)', filter: 'blur(45px)', zIndex: 0 }} />
            <div className="absolute -bottom-6 right-8 w-[45%] h-[40%] pointer-events-none rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(180,100,50,0.1) 0%, transparent 70%)', filter: 'blur(36px)', zIndex: 0 }} />

            {/* ── Video frame ───────── */}
            <div className="relative w-full h-full overflow-hidden rounded-[2.5rem]" style={{ zIndex: 1 }}>

                {/* Base — current video always visible */}
                <video
                    key={`base-${current}`}
                    src={SLIDES[current].src}
                    poster={SLIDES[current].poster}
                    autoPlay muted loop playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ zIndex: 1 }}
                />

                {/* Incoming video revealed by curtain wipe */}
                {next !== null && (
                    <video
                        key={`next-${next}`}
                        src={SLIDES[next].src}
                        poster={SLIDES[next].poster}
                        autoPlay muted loop playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{
                            zIndex: 2,
                            clipPath: wiping ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
                            transition: `clip-path ${WIPE_MS}ms cubic-bezier(0.77,0,0.18,1)`,
                        }}
                    />
                )}

                {/* Golden shimmer band that rides the wipe edge */}
                {next !== null && (
                    <div
                        className="absolute inset-y-0 w-[60px] pointer-events-none"
                        style={{
                            zIndex: 3,
                            background: 'linear-gradient(90deg, transparent, rgba(255,220,120,0.55), rgba(255,245,180,0.7), rgba(255,220,120,0.55), transparent)',
                            left: wiping ? 'calc(100% - 30px)' : '-60px',
                            transition: `left ${WIPE_MS}ms cubic-bezier(0.77,0,0.18,1)`,
                        }}
                    />
                )}

                {/* Sunlight bloom */}
                <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 4,
                    background: 'radial-gradient(ellipse 75% 45% at 65% -5%, rgba(255,220,120,0.28) 0%, rgba(255,185,70,0.12) 40%, transparent 70%)' }} />

                {/* Light rays */}
                <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 4,
                    background: `conic-gradient(from -18deg at 68% -8%,
                        transparent 0deg, rgba(255,235,160,0.06) 7deg, transparent 13deg,
                        rgba(255,220,130,0.045) 21deg, transparent 29deg,
                        rgba(255,240,170,0.055) 39deg, transparent 50deg)` }} />

                {/* Left fade to hero bg */}
                <div className="absolute inset-y-0 left-0 w-[28%] pointer-events-none" style={{ zIndex: 5,
                    background: 'linear-gradient(to right, rgba(253,246,230,0.82) 0%, transparent 100%)' }} />

                {/* Bottom fade */}
                <div className="absolute bottom-0 inset-x-0 h-[40%] pointer-events-none" style={{ zIndex: 5,
                    background: 'linear-gradient(to top, rgba(253,246,230,0.75) 0%, transparent 100%)' }} />

                {/* Currently playing pill */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-white/60 backdrop-blur-xl px-3.5 py-2 rounded-full border border-white/50 shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-deep-rose animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-charcoal/60">{SLIDES[current].label}</span>
                </div>
            </div>

            {/* ── Dot indicators ─── */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
                {SLIDES.map((_, i) => (
                    <button key={i} onClick={() => goTo(i)}
                        className="rounded-full transition-all duration-700"
                        style={{
                            width: i === current ? '26px' : '7px',
                            height: '7px',
                            background: i === current
                                ? 'linear-gradient(90deg,#A0134D,#C2185B)'
                                : 'rgba(160,19,77,0.2)',
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSlideshow;
