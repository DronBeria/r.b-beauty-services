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
                background: 'linear-gradient(160deg, #FAF7F2 0%, #F5EDE0 45%, #FAF7F2 100%)',
                opacity: fading ? 0 : 1,
                transition: 'opacity 0.9s cubic-bezier(0.77, 0, 0.175, 1)',
                pointerEvents: fading ? 'none' : 'all',
            }}
        >
            {/* Ambient orbs */}
            <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{ background: 'rgba(160,19,77,0.05)', filter: 'blur(140px)' }} />
            <div className="absolute bottom-[-15%] right-[-10%] w-[700px] h-[700px] rounded-full pointer-events-none"
                style={{ background: 'rgba(168,136,60,0.07)', filter: 'blur(150px)' }} />

            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-[460px] px-10">

                {/* Logo mark */}
                <div style={{ animation: 'preloader-float 3.5s ease-in-out infinite', marginBottom: '20px' }}>
                    <Image
                        src="/logo-v2.png"
                        alt="R.D. Beauty & Laser Clinic"
                        width={380}
                        height={380}
                        priority
                        className="w-auto object-contain"
                        style={{
                            height: '260px',
                            mixBlendMode: 'multiply',
                        }}
                    />
                </div>

                {/* Clinic name */}
                <div className="flex flex-col items-center gap-1 mb-8">
                    <h1 style={{
                        fontFamily: 'var(--font-playfair)',
                        fontSize: 'clamp(1.25rem, 4vw, 1.65rem)',
                        fontWeight: 700,
                        color: '#1A1610',
                        letterSpacing: '0.04em',
                        textAlign: 'center',
                        lineHeight: 1.2,
                    }}>
                        R.D. Beauty & Laser Clinic
                    </h1>
                    <div className="flex items-center gap-3 mt-2">
                        <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(168,136,60,0.45))' }} />
                        <span style={{
                            fontFamily: 'var(--font-inter)',
                            fontSize: '7.5px',
                            fontWeight: 600,
                            color: 'rgba(168,136,60,0.7)',
                            letterSpacing: '0.5em',
                            textTransform: 'uppercase',
                        }}>
                            Beaumont · Alberta
                        </span>
                        <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, rgba(168,136,60,0.45), transparent)' }} />
                    </div>
                </div>

                {/* Progress bar */}
                <div className="w-full space-y-3">
                    <div className="w-full rounded-full overflow-hidden"
                        style={{ height: '1px', background: 'rgba(26,22,16,0.1)' }}>
                        <div
                            className="h-full rounded-full"
                            style={{
                                width: `${Math.min(progress, 100)}%`,
                                background: 'linear-gradient(90deg, #A8883C, #C4A050)',
                                transition: 'width 0.15s ease-out',
                                boxShadow: '0 0 8px rgba(168,136,60,0.35)',
                            }}
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <span style={{
                            fontFamily: 'var(--font-inter)',
                            fontSize: '8px',
                            fontWeight: 600,
                            color: 'rgba(26,22,16,0.25)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.4em',
                        }}>
                            Loading
                        </span>
                        <span style={{
                            fontFamily: 'var(--font-playfair)',
                            fontSize: '1rem',
                            fontWeight: 700,
                            color: 'rgba(168,136,60,0.65)',
                        }}>
                            {Math.min(Math.round(progress), 100)}%
                        </span>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes preloader-float {
                    0%, 100% { transform: translateY(0px); }
                    50%      { transform: translateY(-10px); }
                }
            `}</style>
        </div>
    );
};

export default Preloader;
