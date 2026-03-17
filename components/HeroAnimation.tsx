'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Zap, Sparkles, Scissors, Heart, ShieldCheck } from 'lucide-react';

const PILLS = [
    { top: 2,  left: 50, icon: Zap,         label: 'Laser Hair Removal', sub: 'from $35',  color: '#1565C0', bg: 'rgba(21,101,192,0.1)'  },
    { top: 22, left: 89, icon: Sparkles,     label: 'HydraFacial',        sub: '$150',       color: '#C2185B', bg: 'rgba(194,24,91,0.1)'   },
    { top: 68, left: 89, icon: Heart,        label: 'Microneedling',      sub: '$175',       color: '#9A7B4F', bg: 'rgba(154,123,79,0.1)'  },
    { top: 93, left: 50, icon: ShieldCheck,  label: 'Nufree Waxing',      sub: 'from $18',  color: '#1a9d82', bg: 'rgba(26,157,130,0.1)'  },
    { top: 46, left: 4,  icon: Scissors,     label: 'Threading',          sub: 'from $8',   color: '#A0134D', bg: 'rgba(160,19,77,0.1)'   },
];

const PARTICLES = [
    { top: 14, left: 30, size: 3, color: 'rgba(160,19,77,0.5)'  },
    { top: 8,  left: 70, size: 4, color: 'rgba(154,123,79,0.4)' },
    { top: 28, left: 14, size: 2, color: 'rgba(194,24,91,0.4)'  },
    { top: 35, left: 72, size: 3, color: 'rgba(160,19,77,0.35)' },
    { top: 58, left: 20, size: 4, color: 'rgba(154,123,79,0.4)' },
    { top: 62, left: 65, size: 2, color: 'rgba(26,157,130,0.5)' },
    { top: 78, left: 30, size: 3, color: 'rgba(160,19,77,0.4)'  },
    { top: 82, left: 72, size: 2, color: 'rgba(194,24,91,0.35)' },
    { top: 18, left: 50, size: 3, color: 'rgba(154,123,79,0.3)' },
    { top: 45, left: 35, size: 2, color: 'rgba(160,19,77,0.25)' },
    { top: 55, left: 58, size: 3, color: 'rgba(26,157,130,0.3)' },
    { top: 72, left: 48, size: 2, color: 'rgba(194,24,91,0.3)'  },
];

const HeroAnimation = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Pulsing center orb
            gsap.to('.hanim-orb', {
                scale: 1.06,
                duration: 3.8,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });

            // Outer glow pulse
            gsap.to('.hanim-glow', {
                opacity: 0.55,
                scale: 1.12,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: 0.5,
            });

            // Float pills independently
            gsap.utils.toArray('.hanim-pill').forEach((pill, i) => {
                gsap.to(pill as Element, {
                    y: i % 2 === 0 ? -13 : 13,
                    duration: 2.8 + i * 0.45,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: i * 0.55,
                });
            });

            // Particles oscillate opacity
            gsap.utils.toArray('.hanim-particle').forEach((p, i) => {
                gsap.to(p as Element, {
                    opacity: 0.15,
                    scale: 0.6,
                    duration: 1.4 + (i % 6) * 0.35,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: i * 0.12,
                });
            });

            // Slowly rotate outer dashed ring
            gsap.to('.hanim-ring-outer', {
                rotation: 360,
                duration: 40,
                repeat: -1,
                ease: 'none',
            });

            // Counter-rotate inner ring
            gsap.to('.hanim-ring-inner', {
                rotation: -360,
                duration: 25,
                repeat: -1,
                ease: 'none',
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-full select-none overflow-hidden">

            {/* ── Ambient background blobs ─────────────────── */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute rounded-full"
                    style={{
                        width: '65%', height: '65%',
                        top: '17%', left: '17%',
                        background: 'radial-gradient(circle, rgba(160,19,77,0.09) 0%, transparent 70%)',
                        filter: 'blur(32px)',
                    }} />
                <div className="absolute rounded-full"
                    style={{
                        width: '40%', height: '40%',
                        top: '5%', right: '10%',
                        background: 'radial-gradient(circle, rgba(154,123,79,0.1) 0%, transparent 70%)',
                        filter: 'blur(24px)',
                    }} />
                <div className="absolute rounded-full"
                    style={{
                        width: '35%', height: '35%',
                        bottom: '10%', left: '8%',
                        background: 'radial-gradient(circle, rgba(26,157,130,0.07) 0%, transparent 70%)',
                        filter: 'blur(20px)',
                    }} />
            </div>

            {/* ── Outer dashed ring ───────────────────────── */}
            <div className="hanim-ring-outer absolute rounded-full pointer-events-none"
                style={{
                    width: '82%', height: '82%',
                    top: '9%', left: '9%',
                    border: '1.5px dashed rgba(160,19,77,0.14)',
                }} />

            {/* ── Inner solid ring ────────────────────────── */}
            <div className="hanim-ring-inner absolute rounded-full pointer-events-none"
                style={{
                    width: '56%', height: '56%',
                    top: '22%', left: '22%',
                    border: '1px solid rgba(154,123,79,0.13)',
                }} />

            {/* ── Center outer glow ───────────────────────── */}
            <div className="hanim-glow absolute rounded-full pointer-events-none"
                style={{
                    width: '32%', height: '32%',
                    top: '34%', left: '34%',
                    background: 'radial-gradient(circle, rgba(160,19,77,0.22) 0%, rgba(154,123,79,0.1) 50%, transparent 70%)',
                    filter: 'blur(18px)',
                    opacity: 0.7,
                }} />

            {/* ── Center orb ──────────────────────────────── */}
            <div className="hanim-orb absolute rounded-full flex flex-col items-center justify-center"
                style={{
                    width: '24%', height: '24%',
                    top: '38%', left: '38%',
                    background: 'linear-gradient(135deg, #A0134D 0%, #C2185B 45%, #9A7B4F 100%)',
                    boxShadow: '0 0 48px rgba(160,19,77,0.42), 0 0 90px rgba(160,19,77,0.16), inset 0 1px 0 rgba(255,255,255,0.2)',
                }}>
                <span style={{
                    fontFamily: 'var(--font-playfair)',
                    fontWeight: 700,
                    color: 'white',
                    lineHeight: 1,
                    letterSpacing: '0.05em',
                    fontSize: 'clamp(9px, 1.8vw, 16px)',
                }}>
                    R.D.
                </span>
                <span style={{
                    color: 'rgba(255,255,255,0.55)',
                    fontSize: 'clamp(5px, 0.9vw, 8px)',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '0.22em',
                    marginTop: '2px',
                }}>
                    BEAUTY
                </span>
            </div>

            {/* ── Treatment pills ─────────────────────────── */}
            {PILLS.map((pill, i) => (
                <div
                    key={i}
                    className="hanim-pill absolute"
                    style={{
                        top: `${pill.top}%`,
                        left: `${pill.left}%`,
                        transform: 'translate(-50%, -50%)',
                        zIndex: 10,
                    }}
                >
                    <div
                        className="flex items-center gap-2 rounded-full bg-white border border-black/[0.05]"
                        style={{
                            padding: 'clamp(5px, 0.9vw, 8px) clamp(8px, 1.4vw, 14px)',
                            boxShadow: '0 6px 28px rgba(0,0,0,0.09), 0 1px 4px rgba(0,0,0,0.06)',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <div
                            className="rounded-full flex items-center justify-center flex-shrink-0"
                            style={{
                                width: 'clamp(20px, 2.4vw, 28px)',
                                height: 'clamp(20px, 2.4vw, 28px)',
                                background: pill.bg,
                            }}
                        >
                            <pill.icon style={{ width: 'clamp(9px, 1.1vw, 13px)', height: 'clamp(9px, 1.1vw, 13px)', color: pill.color }} />
                        </div>
                        <div>
                            <p style={{ fontSize: 'clamp(8px, 0.95vw, 11px)', fontWeight: 800, color: '#1C1C1F', lineHeight: 1 }}>
                                {pill.label}
                            </p>
                            <p style={{ fontSize: 'clamp(6px, 0.8vw, 9px)', fontWeight: 600, color: 'rgba(28,28,31,0.38)', lineHeight: 1, marginTop: '2px' }}>
                                {pill.sub}
                            </p>
                        </div>
                    </div>
                </div>
            ))}

            {/* ── Particles ───────────────────────────────── */}
            {PARTICLES.map((p, i) => (
                <div
                    key={i}
                    className="hanim-particle absolute rounded-full pointer-events-none"
                    style={{
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        top: `${p.top}%`,
                        left: `${p.left}%`,
                        background: p.color,
                    }}
                />
            ))}

            {/* ── Sparkle decorations ─────────────────────── */}
            {[
                { top: '10%', right: '14%', size: 14, color: '#A0134D', opacity: 0.3 },
                { top: '52%', right: '4%',  size: 10, color: '#C2185B', opacity: 0.2 },
                { bottom: '14%', left: '12%', size: 12, color: '#9A7B4F', opacity: 0.25 },
                { top: '38%', left: '18%', size: 8, color: '#1a9d82', opacity: 0.2 },
            ].map((s, i) => (
                <div key={i} className="absolute pointer-events-none" style={{ top: s.top, right: (s as any).right, bottom: s.bottom, left: (s as any).left, opacity: s.opacity }}>
                    <svg width={s.size} height={s.size} viewBox="0 0 16 16" fill="none">
                        <path d="M8 0 L9.2 6.8 L16 8 L9.2 9.2 L8 16 L6.8 9.2 L0 8 L6.8 6.8 Z" fill={s.color} />
                    </svg>
                </div>
            ))}
        </div>
    );
};

export default HeroAnimation;
