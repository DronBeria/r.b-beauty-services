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

const INTERVAL_MS = 7000;
const FADE_MS = 2000;

const HeroSlideshow = () => {
    const [current, setCurrent] = useState(0);
    const [prev,    setPrev]    = useState<number | null>(null);
    const [fading,  setFading]  = useState(false);
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
        /* Fills the flex-1 parent completely — no border, bleeds to all edges */
        <div className="absolute inset-0 overflow-hidden">

            {/* ── Previous video — Ken Burns out ───────────── */}
            {prev !== null && (
                <video
                    key={`prev-${prev}`}
                    src={SLIDES[prev].src}
                    poster={SLIDES[prev].poster}
                    autoPlay muted loop playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                        zIndex: 1,
                        opacity: fading ? 0 : 1,
                        transform: fading ? 'scale(1.06)' : 'scale(1)',
                        transition: `opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease`,
                    }}
                />
            )}

            {/* ── Active video — Ken Burns in ───────────────── */}
            <video
                key={`cur-${current}`}
                src={SLIDES[current].src}
                poster={SLIDES[current].poster}
                autoPlay muted loop playsInline
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                    zIndex: 2,
                    opacity: fading ? 0 : 1,
                    transform: fading ? 'scale(0.97)' : 'scale(1)',
                    transition: `opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease`,
                    animation: !fading ? `kenBurns ${INTERVAL_MS}ms ease-in-out forwards` : 'none',
                }}
            />

            {/* ── Warm color grade — makes any video feel cinematic */}
            <div className="absolute inset-0 pointer-events-none" style={{
                zIndex: 3,
                background: 'linear-gradient(160deg, rgba(200,144,26,0.08) 0%, transparent 50%, rgba(100,10,50,0.15) 100%)',
                mixBlendMode: 'screen',
            }} />

            {/* ── Left edge — seamless blend into dark bg ─── */}
            <div className="absolute inset-y-0 left-0 w-[18%] pointer-events-none" style={{
                zIndex: 4,
                background: 'linear-gradient(to right, #0C0908 0%, rgba(12,9,8,0.6) 40%, transparent 100%)',
            }} />

            {/* ── Bottom vignette ─────────────────────────── */}
            <div className="absolute bottom-0 inset-x-0 h-[30%] pointer-events-none" style={{
                zIndex: 4,
                background: 'linear-gradient(to top, rgba(12,9,8,0.7) 0%, transparent 100%)',
            }} />

            {/* ── Subtle top vignette ──────────────────────── */}
            <div className="absolute top-0 inset-x-0 h-[20%] pointer-events-none" style={{
                zIndex: 4,
                background: 'linear-gradient(to bottom, rgba(12,9,8,0.5) 0%, transparent 100%)',
            }} />

            {/* ── Label pill ───────────────────────────────── */}
            <div className="absolute bottom-8 right-8 z-10 flex items-center gap-2"
                style={{
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(210,165,60,0.2)',
                    borderRadius: '100px',
                    padding: '7px 16px',
                }}>
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#D4A844' }} />
                <span className="text-[8.5px] font-black uppercase tracking-[0.4em]"
                    style={{ color: 'rgba(255,220,140,0.6)' }}>
                    {SLIDES[current].label}
                </span>
            </div>

            {/* ── Dot indicators ───────────────────────────── */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                {SLIDES.map((_, i) => (
                    <div key={i} className="rounded-full transition-all duration-700" style={{
                        width: i === current ? '24px' : '6px',
                        height: '6px',
                        background: i === current
                            ? 'linear-gradient(90deg,#C8901A,#E8BE58)'
                            : 'rgba(210,165,60,0.2)',
                    }} />
                ))}
            </div>

            {/* Ken Burns keyframe */}
            <style>{`
                @keyframes kenBurns {
                    from { transform: scale(1.0) translate(0, 0); }
                    to   { transform: scale(1.07) translate(-0.8%, -0.4%); }
                }
            `}</style>
        </div>
    );
};

export default HeroSlideshow;
