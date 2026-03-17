'use client';

import React, { useEffect, useState } from 'react';

const Preloader = () => {
    const [progress, setProgress] = useState(0);
    const [fading, setFading] = useState(false);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        let current = 0;
        const interval = setInterval(() => {
            const increment = Math.random() * 14 + 4;
            current = Math.min(current + increment, 100);
            setProgress(current);

            if (current >= 100) {
                clearInterval(interval);
                setTimeout(() => setFading(true), 500);
                setTimeout(() => setHidden(true), 1300);
            }
        }, 110);

        return () => clearInterval(interval);
    }, []);

    if (hidden) return null;

    return (
        <div
            className="fixed inset-0 z-[300] flex flex-col items-center justify-center overflow-hidden"
            style={{
                background: '#0F0E12',
                opacity: fading ? 0 : 1,
                transition: 'opacity 0.8s cubic-bezier(0.77,0,0.175,1)',
                pointerEvents: fading ? 'none' : 'all',
            }}
        >
            {/* Ambient orbs */}
            <div
                className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full pointer-events-none"
                style={{ background: 'rgba(160,19,77,0.12)', filter: 'blur(160px)' }}
            />
            <div
                className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full pointer-events-none"
                style={{ background: 'rgba(154,123,79,0.07)', filter: 'blur(180px)' }}
            />
            <div
                className="absolute top-[40%] left-[40%] w-[400px] h-[400px] rounded-full pointer-events-none"
                style={{ background: 'rgba(160,19,77,0.05)', filter: 'blur(120px)' }}
            />

            {/* Logo + tagline */}
            <div className="relative z-10 flex flex-col items-center gap-10 w-full max-w-xs px-8">
                <div className="text-center space-y-3">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <div className="w-8 h-px" style={{ background: 'rgba(154,123,79,0.5)' }} />
                        <span style={{ color: 'rgba(154,123,79,0.7)', fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5em', fontFamily: 'var(--font-plus-jakarta)' }}>
                            The Clinic
                        </span>
                        <div className="w-8 h-px" style={{ background: 'rgba(154,123,79,0.5)' }} />
                    </div>
                    <h1
                        style={{
                            fontFamily: 'var(--font-playfair)',
                            fontSize: 'clamp(2.2rem, 6vw, 3rem)',
                            fontWeight: 700,
                            color: '#ffffff',
                            letterSpacing: '0.25em',
                            textTransform: 'uppercase',
                            lineHeight: 1.1,
                        }}
                    >
                        R.D. BEAUTY
                    </h1>
                    <p
                        style={{
                            color: 'rgba(255,255,255,0.2)',
                            fontSize: '9px',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '0.6em',
                            fontFamily: 'var(--font-plus-jakarta)',
                        }}
                    >
                        Advanced Beauty & Laser Clinic
                    </p>
                </div>

                {/* Progress bar */}
                <div className="w-full space-y-3">
                    <div
                        className="w-full rounded-full overflow-hidden"
                        style={{ height: '1px', background: 'rgba(255,255,255,0.08)' }}
                    >
                        <div
                            className="h-full rounded-full"
                            style={{
                                width: `${Math.min(progress, 100)}%`,
                                background: 'linear-gradient(90deg, #A0134D, #9A7B4F)',
                                transition: 'width 0.15s ease-out',
                                boxShadow: '0 0 12px rgba(160,19,77,0.6)',
                            }}
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <span
                            style={{
                                color: 'rgba(255,255,255,0.2)',
                                fontSize: '9px',
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                letterSpacing: '0.4em',
                                fontFamily: 'var(--font-plus-jakarta)',
                            }}
                        >
                            Preparing Your Experience
                        </span>
                        <span
                            style={{
                                fontFamily: 'var(--font-playfair)',
                                fontSize: '1.1rem',
                                color: 'rgba(255,255,255,0.5)',
                            }}
                        >
                            {Math.min(Math.round(progress), 100)}%
                        </span>
                    </div>
                </div>

                {/* Shimmer line decoration */}
                <div className="w-full flex items-center gap-4">
                    <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.04)' }} />
                    <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                            background: '#A0134D',
                            boxShadow: '0 0 8px rgba(160,19,77,0.8)',
                            animation: 'preloader-pulse 1.4s ease-in-out infinite',
                        }}
                    />
                    <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.04)' }} />
                </div>
            </div>

            <style>{`
                @keyframes preloader-pulse {
                    0%, 100% { opacity: 0.4; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.5); }
                }
            `}</style>
        </div>
    );
};

export default Preloader;
