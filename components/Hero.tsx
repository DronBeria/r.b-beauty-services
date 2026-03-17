'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowRight, MessageCircle, Zap, Sparkles, Scissors, Heart } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants/services';

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const VIDEOS = [
    { src: 'https://videos.pexels.com/video-files/3997992/3997992-hd_1920_1080_30fps.mp4',  poster: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=90&auto=format&fit=crop', label: 'Facial Treatment'    },
    { src: 'https://videos.pexels.com/video-files/5550210/5550210-hd_1920_1080_30fps.mp4',  poster: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=90&auto=format&fit=crop', label: 'Waxing & Skincare'   },
    { src: 'https://videos.pexels.com/video-files/4046457/4046457-hd_1920_1080_30fps.mp4',  poster: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=90&auto=format&fit=crop', label: 'Threading'           },
    { src: 'https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_30fps.mp4',  poster: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=90&auto=format&fit=crop', label: 'Laser Hair Removal'  },
];

const SERVICE_CARDS = [
    { Icon: Zap,      label: 'Laser Hair Removal', price: 'from $35',  color: '#7EB8F7', bg: 'rgba(126,184,247,0.08)', pos: { top: '10%',  left: '-8%'  } },
    { Icon: Sparkles, label: 'HydraFacial',         price: '$150',      color: '#F7C07E', bg: 'rgba(247,192,126,0.08)', pos: { top: '10%',  right: '-8%' } },
    { Icon: Heart,    label: 'Microneedling',        price: '$175',      color: '#F77EB8', bg: 'rgba(247,126,184,0.08)', pos: { bottom: '14%', right: '-8%' } },
    { Icon: Scissors, label: 'Threading',            price: 'from $8',   color: '#7EF7B8', bg: 'rgba(126,247,184,0.08)', pos: { bottom: '14%', left: '-8%'  } },
];

/* Fixed particle positions — no Math.random on render */
const PARTICLES = [
    { left:'8%',  top:'70%', size:3, dur:5.2, delay:0    },
    { left:'15%', top:'80%', size:2, dur:6.8, delay:0.7  },
    { left:'22%', top:'65%', size:4, dur:4.5, delay:1.4  },
    { left:'30%', top:'75%', size:2, dur:7.1, delay:0.3  },
    { left:'38%', top:'85%', size:3, dur:5.8, delay:2.0  },
    { left:'45%', top:'72%', size:2, dur:6.2, delay:0.9  },
    { left:'52%', top:'78%', size:4, dur:4.9, delay:1.6  },
    { left:'60%', top:'68%', size:2, dur:7.4, delay:0.5  },
    { left:'68%', top:'82%', size:3, dur:5.5, delay:2.3  },
    { left:'75%', top:'74%', size:2, dur:6.6, delay:1.1  },
    { left:'82%', top:'70%', size:3, dur:5.0, delay:0.2  },
    { left:'88%', top:'76%', size:2, dur:7.0, delay:1.8  },
    { left:'12%', top:'55%', size:2, dur:6.3, delay:2.6  },
    { left:'35%', top:'60%', size:3, dur:5.7, delay:0.8  },
    { left:'55%', top:'58%', size:2, dur:6.9, delay:1.3  },
    { left:'78%', top:'62%', size:4, dur:4.8, delay:2.1  },
    { left:'92%', top:'80%', size:2, dur:6.1, delay:0.6  },
    { left:'5%',  top:'88%', size:3, dur:5.3, delay:1.9  },
    { left:'48%', top:'92%', size:2, dur:7.2, delay:0.4  },
    { left:'70%', top:'88%', size:3, dur:5.6, delay:2.7  },
];

/* ─────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────── */
const Hero = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const archRef    = useRef<HTMLDivElement>(null);
    const [slide, setSlide] = useState(0);
    const [nextSlide, setNextSlide] = useState<number|null>(null);
    const [fading, setFading] = useState(false);

    /* Video cycling */
    useEffect(() => {
        const id = setInterval(() => {
            const n = (slide + 1) % VIDEOS.length;
            setNextSlide(n); setFading(true);
            setTimeout(() => { setSlide(n); setNextSlide(null); setFading(false); }, 1600);
        }, 6500);
        return () => clearInterval(id);
    }, [slide]);

    /* GSAP */
    useEffect(() => {
        const ctx = gsap.context(() => {

            /* ── Entrance ── */
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 1.1 });
            tl.fromTo('.h-eyebrow',  { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
              .fromTo('.h-line',     { y: 90, opacity: 0, skewY: 4 }, { y: 0, opacity: 1, skewY: 0, stagger: 0.1, duration: 1.1 }, '-=0.3')
              .fromTo('.h-rule',     { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.9, ease: 'expo.out' }, '-=0.4')
              .fromTo('.h-sub',      { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
              .fromTo('.h-cta',      { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
              .fromTo('.h-proof',    { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5')
              .fromTo('.h-arch',     { scale: 0.88, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.6, ease: 'expo.out' }, '-=1.8')
              .fromTo('.h-card',     { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'back.out(1.4)' }, '-=1.0');

            /* ── Arch gentle float ── */
            gsap.to(archRef.current, {
                y: -14, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut',
            });

            /* ── Cards stagger float ── */
            gsap.utils.toArray<Element>('.h-card').forEach((el, i) => {
                gsap.to(el, {
                    y: i % 2 === 0 ? -10 : 10,
                    duration: 3.5 + i * 0.6,
                    repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.9,
                });
            });

            /* ── Particle drift upward ── */
            gsap.utils.toArray<Element>('.h-particle').forEach((el, i) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 0 },
                    {
                        opacity: 0,
                        y: -(180 + i * 12),
                        duration: PARTICLES[i].dur,
                        delay: PARTICLES[i].delay,
                        repeat: -1,
                        ease: 'none',
                        keyframes: [
                            { opacity: 0,   y: 0,                  duration: 0   },
                            { opacity: 0.7, y: -(60 + i * 5),      duration: PARTICLES[i].dur * 0.3 },
                            { opacity: 0,   y: -(180 + i * 12),    duration: PARTICLES[i].dur * 0.7 },
                        ],
                    }
                );
            });

            /* ── Mouse parallax on arch ── */
            const onMove = (e: MouseEvent) => {
                const rect = sectionRef.current!.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
                const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
                gsap.to(archRef.current, {
                    rotationY:  x * 7,
                    rotationX: -y * 5,
                    duration: 1,
                    ease: 'power2.out',
                    transformPerspective: 1200,
                });
            };
            const onLeave = () => {
                gsap.to(archRef.current, { rotationY: 0, rotationX: 0, duration: 1.2, ease: 'power3.out' });
            };
            sectionRef.current?.addEventListener('mousemove', onMove);
            sectionRef.current?.addEventListener('mouseleave', onLeave);
            return () => {
                sectionRef.current?.removeEventListener('mousemove', onMove);
                sectionRef.current?.removeEventListener('mouseleave', onLeave);
            };

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative w-full min-h-[100svh] overflow-hidden flex items-center pt-[80px]"
            style={{ background: 'radial-gradient(ellipse at 68% 28%, #1C0A1C 0%, #0A0610 45%, #060409 100%)' }}
        >
            {/* ══════════════════════════════════════════════
                BACKGROUND LAYERS
            ══════════════════════════════════════════════ */}

            {/* Main rose atmosphere */}
            <div className="absolute pointer-events-none" style={{
                top:'-25%', right:'-10%', width:'65%', height:'85%',
                background:'radial-gradient(ellipse, rgba(160,30,100,0.35) 0%, rgba(100,10,70,0.12) 50%, transparent 72%)',
                filter:'blur(80px)',
            }} />
            {/* Gold warmth — bottom left */}
            <div className="absolute pointer-events-none" style={{
                bottom:'-20%', left:'-5%', width:'50%', height:'60%',
                background:'radial-gradient(ellipse, rgba(180,130,40,0.18) 0%, transparent 68%)',
                filter:'blur(70px)',
            }} />
            {/* Blue-cool accent — top left */}
            <div className="absolute pointer-events-none" style={{
                top:'5%', left:'5%', width:'30%', height:'40%',
                background:'radial-gradient(ellipse, rgba(60,40,120,0.2) 0%, transparent 70%)',
                filter:'blur(60px)',
            }} />

            {/* Fine grain texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.035]" style={{
                backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize:'180px',
            }} />

            {/* Particles */}
            {PARTICLES.map((p, i) => (
                <div key={i} className="h-particle absolute pointer-events-none rounded-full" style={{
                    left: p.left, top: p.top,
                    width:`${p.size}px`, height:`${p.size}px`,
                    background: i % 3 === 0
                        ? 'rgba(220,170,80,0.9)'
                        : i % 3 === 1
                        ? 'rgba(200,100,160,0.8)'
                        : 'rgba(180,210,255,0.7)',
                    opacity: 0,
                    boxShadow: `0 0 ${p.size * 3}px currentColor`,
                }} />
            ))}

            {/* ══════════════════════════════════════════════
                CONTENT
            ══════════════════════════════════════════════ */}
            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24 py-16 lg:py-0 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-4 items-center min-h-[calc(100svh-80px)]">

                {/* ── LEFT: TEXT ─────────────────────────────── */}
                <div className="flex flex-col justify-center order-2 lg:order-1 lg:pr-4 xl:pr-8">

                    {/* Eyebrow */}
                    <div className="h-eyebrow opacity-0 flex items-center gap-3 mb-8">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                            style={{ border:'1px solid rgba(220,170,80,0.2)', background:'rgba(220,170,80,0.05)' }}>
                            <div className="w-1 h-1 rounded-full bg-rose-400 animate-pulse" />
                            <span className="text-[9px] font-black uppercase tracking-[0.55em] font-sans"
                                style={{ color:'rgba(220,170,80,0.6)' }}>
                                Edmonton · Est. 2020
                            </span>
                        </div>
                    </div>

                    {/* Headline */}
                    <div className="space-y-[3px] mb-8">
                        {[
                            { text: 'Redefine',    italic: false },
                            { text: 'Your Beauty', italic: true  },
                            { text: '& Confidence', italic: false },
                        ].map((line, i) => (
                            <div key={i} className="overflow-hidden">
                                <h1
                                    className="h-line opacity-0 font-display leading-[0.97] tracking-[-0.025em]"
                                    style={{
                                        fontSize: 'clamp(2.6rem, 5.2vw, 5.2rem)',
                                        ...(line.italic ? {
                                            background: 'linear-gradient(125deg, #E8907A 0%, #D4708A 25%, #C870C0 50%, #9878E8 75%, #78B8F0 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            fontWeight: 300, fontStyle: 'italic',
                                        } : {
                                            color: 'rgba(255,248,244,0.93)',
                                            fontWeight: 800,
                                            textTransform: 'uppercase' as const,
                                        }),
                                    }}
                                >
                                    {line.text}
                                </h1>
                            </div>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="h-rule opacity-0 origin-left flex items-center gap-3 mb-8">
                        <div className="h-px w-12" style={{ background:'linear-gradient(to right, rgba(220,170,80,0.6), transparent)' }} />
                        <svg width="7" height="7" viewBox="0 0 14 14" fill="none">
                            <path d="M7 0L8.2 5.8L14 7L8.2 8.2L7 14L5.8 8.2L0 7L5.8 5.8Z" fill="rgba(220,170,80,0.55)" />
                        </svg>
                        <div className="h-px w-6" style={{ background:'rgba(220,170,80,0.15)' }} />
                    </div>

                    {/* Sub */}
                    <p className="h-sub opacity-0 text-[15px] leading-[1.8] max-w-[360px] mb-10 font-sans"
                        style={{ color:'rgba(255,230,220,0.38)' }}>
                        Advanced laser, facials, microneedling & waxing —
                        tailored for <span style={{ color:'rgba(255,230,220,0.65)', fontWeight:600 }}>
                            men and women in Edmonton.
                        </span>
                    </p>

                    {/* CTAs */}
                    <div className="h-cta opacity-0 flex flex-wrap items-center gap-3 mb-10">
                        <Link href="#services"
                            className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] overflow-hidden transition-all duration-500 active:scale-95"
                            style={{ background:'linear-gradient(135deg, #C2185B, #A0134D)', color:'#fff', boxShadow:'0 0 40px rgba(160,19,77,0.4), 0 4px 20px rgba(0,0,0,0.4)' }}>
                            <span className="relative z-10">Explore Services</span>
                            <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-1 transition-transform" />
                            {/* Shimmer on hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ background:'linear-gradient(135deg, #D4356E, #C2185B)' }} />
                        </Link>
                        <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20R.D.%20Beauty!%20I'd%20like%20to%20book%20a%20consultation.`}
                            target="_blank" rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 active:scale-95"
                            style={{ border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,220,200,0.55)', background:'rgba(255,255,255,0.03)', backdropFilter:'blur(10px)' }}
                            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)')}
                            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}>
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Book Consult</span>
                        </a>
                    </div>

                    {/* Social proof */}
                    <div className="h-proof opacity-0 flex items-center gap-4">
                        <div className="flex -space-x-2">
                            {['#A0134D','#C2185B','#8B1A6B','#D4608A'].map((c, i) => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-[9px] font-black text-white"
                                    style={{ borderColor:'rgba(10,6,14,0.8)', background:`linear-gradient(135deg, ${c}, rgba(0,0,0,0.4))` }}>
                                    {['S','E','J','P'][i]}
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className="flex items-center gap-1 mb-0.5">
                                {[...Array(5)].map((_,i) => (
                                    <svg key={i} width="10" height="10" viewBox="0 0 10 10" fill="#D4A844">
                                        <path d="M5 0L6.18 3.27L9.76 3.45L7.05 5.74L7.94 9.26L5 7.4L2.06 9.26L2.95 5.74L0.24 3.45L3.82 3.27Z"/>
                                    </svg>
                                ))}
                            </div>
                            <p className="text-[10px] font-semibold font-sans" style={{ color:'rgba(255,220,180,0.38)' }}>
                                Trusted by <span style={{ color:'rgba(255,220,180,0.65)' }}>200+</span> clients in Edmonton
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: ARCH VIDEO ──────────────────────── */}
                <div className="order-1 lg:order-2 flex items-center justify-center py-8 lg:py-0">
                    <div className="h-arch opacity-0 relative" style={{ width:'clamp(260px,32vw,400px)', perspective:'1200px' }}>

                        {/* Arch container with mouse tilt */}
                        <div ref={archRef} style={{ transformStyle:'preserve-3d' }}>

                            {/* Rotating text ring */}
                            <div className="absolute pointer-events-none animate-spin-slow"
                                style={{ inset:'-44px', zIndex:0 }}>
                                <svg viewBox="0 0 300 300" fill="none" width="100%" height="100%">
                                    <defs>
                                        <path id="ring-path" d="M150,150 m-130,0 a130,130 0 1,1 260,0 a130,130 0 1,1 -260,0"/>
                                    </defs>
                                    <text fontSize="7.5" letterSpacing="3.5" fill="rgba(220,170,80,0.2)" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">
                                        <textPath href="#ring-path">
                                            LASER · WAXING · THREADING · FACIALS · MICRONEEDLING · DERMAPLANING · HYDRAFACIAL ·
                                        </textPath>
                                    </text>
                                </svg>
                            </div>

                            {/* Outer glow ring */}
                            <div className="absolute pointer-events-none" style={{
                                inset:'-3px',
                                borderRadius:'9999px 9999px 60px 60px',
                                background:'linear-gradient(160deg, rgba(220,170,80,0.4) 0%, rgba(180,60,120,0.3) 50%, rgba(100,60,200,0.25) 100%)',
                                filter:'blur(6px)',
                                zIndex:0,
                            }} />

                            {/* Inner border */}
                            <div className="absolute pointer-events-none" style={{
                                inset:'-1px',
                                borderRadius:'9999px 9999px 56px 56px',
                                background:'linear-gradient(160deg, rgba(220,170,80,0.45) 0%, rgba(180,60,120,0.3) 50%, rgba(120,80,220,0.3) 100%)',
                                zIndex:1,
                            }} />

                            {/* Arch video frame */}
                            <div className="relative overflow-hidden" style={{
                                width:'100%',
                                aspectRatio:'3/4.2',
                                borderRadius:'9999px 9999px 52px 52px',
                                zIndex:2,
                            }}>

                                {/* Current video */}
                                <video key={`c-${slide}`} src={VIDEOS[slide].src} poster={VIDEOS[slide].poster}
                                    autoPlay muted loop playsInline
                                    className="absolute inset-0 w-full h-full object-cover object-top"
                                    style={{ zIndex:1, opacity: fading ? 0 : 1, transform: fading ? 'scale(1.05)' : 'scale(1)', transition:'opacity 1.6s ease, transform 1.6s ease' }}
                                />
                                {/* Next video */}
                                {nextSlide !== null && (
                                    <video key={`n-${nextSlide}`} src={VIDEOS[nextSlide].src} poster={VIDEOS[nextSlide].poster}
                                        autoPlay muted loop playsInline
                                        className="absolute inset-0 w-full h-full object-cover object-top"
                                        style={{ zIndex:2, opacity: fading ? 1 : 0, transform: fading ? 'scale(1)' : 'scale(1.04)', transition:'opacity 1.6s ease, transform 1.6s ease' }}
                                    />
                                )}

                                {/* Warm color grade */}
                                <div className="absolute inset-0 pointer-events-none" style={{
                                    zIndex:3,
                                    background:'linear-gradient(180deg, rgba(180,80,120,0.08) 0%, transparent 40%, rgba(80,40,140,0.15) 100%)',
                                }} />
                                {/* Top fade */}
                                <div className="absolute top-0 inset-x-0 h-[22%] pointer-events-none" style={{
                                    zIndex:3,
                                    background:'linear-gradient(to bottom, rgba(20,8,30,0.55) 0%, transparent 100%)',
                                }} />
                                {/* Bottom fade */}
                                <div className="absolute bottom-0 inset-x-0 h-[30%] pointer-events-none" style={{
                                    zIndex:3,
                                    background:'linear-gradient(to top, rgba(10,6,20,0.7) 0%, transparent 100%)',
                                }} />

                                {/* Slide label */}
                                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2"
                                    style={{ background:'rgba(255,255,255,0.06)', backdropFilter:'blur(16px)', border:'1px solid rgba(220,170,80,0.18)', borderRadius:'100px', padding:'5px 14px', whiteSpace:'nowrap' }}>
                                    <div className="w-1 h-1 rounded-full animate-pulse" style={{ background:'#D4A844' }} />
                                    <span className="text-[8px] font-black uppercase tracking-[0.4em]" style={{ color:'rgba(255,220,140,0.7)' }}>{VIDEOS[slide].label}</span>
                                </div>
                            </div>

                            {/* Reflection glow under arch */}
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 pointer-events-none" style={{
                                width:'70%', height:'30px',
                                background:'radial-gradient(ellipse, rgba(160,19,77,0.35) 0%, transparent 70%)',
                                filter:'blur(12px)',
                            }} />
                        </div>

                        {/* ── Floating service cards ──────────── */}
                        {SERVICE_CARDS.map(({ Icon, label, price, color, bg, pos }, i) => (
                            <div key={i} className="h-card opacity-0 absolute pointer-events-none"
                                style={{ ...pos, zIndex:20 }}>
                                <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl"
                                    style={{ background:'rgba(12,8,18,0.7)', backdropFilter:'blur(20px)', border:`1px solid ${color}22`, boxShadow:`0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${color}18`, whiteSpace:'nowrap' }}>
                                    <div className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                                        <Icon style={{ width:'14px', height:'14px', color }} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-[0.15em] leading-none mb-0.5" style={{ color:'rgba(255,245,240,0.8)' }}>{label}</p>
                                        <p className="text-[8px] font-semibold" style={{ color:'rgba(255,245,240,0.35)' }}>{price}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Dot indicators below arch */}
                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                            {VIDEOS.map((_, i) => (
                                <div key={i} className="rounded-full transition-all duration-700" style={{
                                    width: i === slide ? '22px' : '5px', height:'5px',
                                    background: i === slide ? 'linear-gradient(90deg,#C2185B,#E8607A)' : 'rgba(255,255,255,0.12)',
                                }} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom fade → site */}
            <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none z-20"
                style={{ background:'linear-gradient(to top, #FDFAF7 0%, rgba(253,250,247,0.7) 40%, transparent 100%)' }} />

            {/* Left edge accent */}
            <div className="absolute left-0 top-[20%] bottom-[20%] w-px pointer-events-none"
                style={{ background:'linear-gradient(to bottom, transparent, rgba(220,170,80,0.2) 30%, rgba(220,170,80,0.2) 70%, transparent)' }} />
        </section>
    );
};

export default Hero;
