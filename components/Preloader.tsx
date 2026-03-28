'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

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
                background: 'linear-gradient(150deg, #100D08 0%, #1A1410 50%, #100D08 100%)',
                opacity: fading ? 0 : 1,
                transition: 'opacity 0.9s cubic-bezier(0.77, 0, 0.175, 1)',
                pointerEvents: fading ? 'none' : 'all',
            }}
        >
            {/* Ambient orbs */}
            <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full pointer-events-none"
                style={{ background: 'rgba(160,19,77,0.1)', filter: 'blur(160px)' }} />
            <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full pointer-events-none"
                style={{ background: 'rgba(168,136,60,0.07)', filter: 'blur(180px)' }} />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-[340px] px-8">

                {/* Logo */}
                <div className="flex flex-col items-center gap-5">
                    <div style={{ animation: 'preloader-float 3s ease-in-out infinite' }}>
                        <Image
                            src="/logo.png"
                            alt="R.D. Beauty & Laser Clinic"
                            width={280}
                            height={280}
                            priority
                            className="w-auto object-contain"
                            style={{
                                height: '160px',
                                filter: 'brightness(0) invert(1)',
                                opacity: 0.92,
                            }}
                        />
                    </div>

                    {/* Gold separator */}
                    <div className="flex items-center gap-3 w-full justify-center">
                        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(168,136,60,0.4))' }} />
                        <span style={{ color: 'rgba(168,136,60,0.6)', fontSize: '8px' }}>✦</span>
                        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(168,136,60,0.4), transparent)' }} />
                    </div>

                    <p style={{
                        color: 'rgba(255,255,255,0.22)',
                        fontSize: '8.5px',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '0.55em',
                        fontFamily: 'var(--font-inter)',
                        textAlign: 'center',
                    }}>
                        Beaumont · Alberta
                    </p>
                </div>

                {/* Progress bar */}
                <div className="w-full space-y-3">
                    <div className="w-full rounded-full overflow-hidden"
                        style={{ height: '1px', background: 'rgba(255,255,255,0.07)' }}>
                        <div
                            className="h-full rounded-full"
                            style={{
                                width: `${Math.min(progress, 100)}%`,
                                background: 'linear-gradient(90deg, #A8883C, #C4A050)',
                                transition: 'width 0.15s ease-out',
                                boxShadow: '0 0 10px rgba(168,136,60,0.5)',
                            }}
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <span style={{
                            color: 'rgba(255,255,255,0.18)',
                            fontSize: '8px',
                            fontWeight: 500,
                            textTransform: 'uppercase',
                            letterSpacing: '0.4em',
                            fontFamily: 'var(--font-inter)',
                        }}>
                            Loading
                        </span>
                        <span style={{
                            fontFamily: 'var(--font-playfair)',
                            fontSize: '1rem',
                            color: 'rgba(168,136,60,0.6)',
                        }}>
                            {Math.min(Math.round(progress), 100)}%
                        </span>
                    </div>
                </div>

                {/* Pulsing dot */}
                <div className="flex items-center gap-3">
                    <div className="w-6 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
                    <div style={{
                        width: 5, height: 5, borderRadius: '50%',
                        background: 'rgba(168,136,60,0.8)',
                        boxShadow: '0 0 8px rgba(168,136,60,0.6)',
                        animation: 'preloader-pulse 1.4s ease-in-out infinite',
                    }} />
                    <div className="w-6 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
                </div>
            </div>

            <style>{`
                @keyframes preloader-pulse {
                    0%, 100% { opacity: 0.4; transform: scale(1); }
                    50%       { opacity: 1;   transform: scale(1.6); }
                }
                @keyframes preloader-float {
                    0%, 100% { transform: translateY(0px); }
                    50%      { transform: translateY(-8px); }
                }
            `}</style>
        </div>
    );
};

export default Preloader;
