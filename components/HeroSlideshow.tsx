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
const WIPE_MS = 1000;

const HeroSlideshow = () => {
    const [current,  setCurrent] = useState(0);
    const [next,     setNext]    = useState<number | null>(null);
    const [wiping,   setWiping]  = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const goTo = (idx: number) => {
        if (wiping || idx === current) return;
        setNext(idx); setWiping(true);
        setTimeout(() => { setCurrent(idx); setNext(null); setWiping(false); }, WIPE_MS);
    };

    const advance = () => {
        setCurrent(prev => {
            const n = (prev + 1) % SLIDES.length;
            setNext(n); setWiping(true);
            setTimeout(() => { setCurrent(n); setNext(null); setWiping(false); }, WIPE_MS);
            return prev;
        });
    };

    useEffect(() => {
        intervalRef.current = setInterval(advance, INTERVAL_MS);
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, []);

    return (
        <div className="relative w-full h-full select-none overflow-visible">

            {/* Outer golden halo bleeding beyond the frame */}
            <div className="absolute pointer-events-none" style={{
                inset: '-20px',
                background: 'radial-gradient(ellipse at 60% 40%, rgba(210,165,60,0.18) 0%, transparent 65%)',
                filter: 'blur(30px)', zIndex: 0,
                borderRadius: '3rem',
            }} />

            {/* Animated border glow */}
            <div className="absolute pointer-events-none" style={{
                inset: '-1.5px',
                borderRadius: '2.7rem',
                background: 'linear-gradient(135deg, rgba(210,165,60,0.5) 0%, rgba(180,100,130,0.3) 35%, rgba(210,165,60,0.4) 65%, rgba(160,19,77,0.3) 100%)',
                zIndex: 0,
            }} />

            {/* Frame */}
            <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: '2.5rem', zIndex: 1 }}>

                {/* Base video */}
                <video key={`base-${current}`} src={SLIDES[current].src} poster={SLIDES[current].poster}
                    autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 1 }} />

                {/* Incoming — curtain wipe left→right */}
                {next !== null && (
                    <video key={`next-${next}`} src={SLIDES[next].src} poster={SLIDES[next].poster}
                        autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover"
                        style={{
                            zIndex: 2,
                            clipPath: wiping ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
                            transition: `clip-path ${WIPE_MS}ms cubic-bezier(0.77,0,0.18,1)`,
                        }}
                    />
                )}

                {/* Gold shimmer band riding the wipe */}
                {next !== null && (
                    <div className="absolute inset-y-0 pointer-events-none" style={{
                        zIndex: 3, width: '80px',
                        background: 'linear-gradient(90deg, transparent, rgba(255,230,140,0.6), rgba(255,250,200,0.8), rgba(255,230,140,0.6), transparent)',
                        left: wiping ? 'calc(100% - 40px)' : '-80px',
                        transition: `left ${WIPE_MS}ms cubic-bezier(0.77,0,0.18,1)`,
                    }} />
                )}

                {/* Warm tone grade over video */}
                <div className="absolute inset-0 pointer-events-none" style={{
                    zIndex: 4,
                    background: 'linear-gradient(170deg, rgba(210,160,60,0.12) 0%, transparent 50%, rgba(120,40,70,0.15) 100%)',
                    mixBlendMode: 'multiply',
                }} />

                {/* Left blend into dark bg */}
                <div className="absolute inset-y-0 left-0 w-[22%] pointer-events-none" style={{
                    zIndex: 5,
                    background: 'linear-gradient(to right, rgba(10,7,5,0.92) 0%, rgba(10,7,5,0.5) 50%, transparent 100%)',
                }} />
                {/* Bottom blend */}
                <div className="absolute bottom-0 inset-x-0 h-[35%] pointer-events-none" style={{
                    zIndex: 5,
                    background: 'linear-gradient(to top, rgba(10,7,5,0.8) 0%, transparent 100%)',
                }} />

                {/* Currently playing label */}
                <div className="absolute bottom-5 left-5 z-10 flex items-center gap-2"
                    style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', border: '1px solid rgba(210,165,60,0.25)', borderRadius: '100px', padding: '6px 14px' }}>
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#D4A844' }} />
                    <span className="text-[8.5px] font-black uppercase tracking-[0.35em]" style={{ color: 'rgba(255,220,140,0.7)' }}>{SLIDES[current].label}</span>
                </div>
            </div>

            {/* Dot indicators */}
            <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
                {SLIDES.map((_, i) => (
                    <button key={i} onClick={() => goTo(i)} className="rounded-full transition-all duration-700" style={{
                        width: i === current ? '26px' : '7px', height: '7px',
                        background: i === current ? 'linear-gradient(90deg,#D4A844,#F0C870)' : 'rgba(210,165,60,0.2)',
                    }} />
                ))}
            </div>
        </div>
    );
};

export default HeroSlideshow;
