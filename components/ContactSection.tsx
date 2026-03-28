'use client';

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, User, Phone, Sparkles, ArrowRight, MapPin, Clock, ChevronDown } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants/services';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
    'Eyebrow Threading',
    'Full Face Threading',
    'Eyebrow Waxing',
    'Brazilian Wax',
    'Full Leg Wax',
    'Nufree Waxing',
    'Classic Facial',
    'HydraFacial',
    'Microneedling',
    'Dermaplaning',
    'Microdermabrasion',
    'Laser Hair Removal – Face',
    'Laser Hair Removal – Body',
    'Other / Not Sure',
];

const inputBase: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(168,136,60,0.18)',
    borderRadius: '1.25rem',
    padding: '14px 16px 14px 44px',
    fontSize: '14px',
    color: 'rgba(255,255,255,0.82)',
    fontFamily: 'var(--font-inter)',
    outline: 'none',
    transition: 'border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
};

const ContactSection = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [service, setService] = useState('');
    const [message, setMessage] = useState('');
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.contact-reveal',
                { y: 36, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    stagger: 0.1,
                    duration: 1.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        e.currentTarget.style.borderColor = 'rgba(168,136,60,0.55)';
        e.currentTarget.style.background = 'rgba(168,136,60,0.06)';
        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(168,136,60,0.08)';
    };
    const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        e.currentTarget.style.borderColor = 'rgba(168,136,60,0.18)';
        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
        e.currentTarget.style.boxShadow = 'none';
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const serviceStr = service ? `\n📌 Service: ${service}` : '';
        const msgStr = message ? `\n💬 Note: ${message}` : '';
        const full = `Hi R.D. Beauty & Laser Clinic! 😊\n\nMy name is ${name || 'a potential client'}.${serviceStr}${msgStr}\n\nBest number to reach me: ${phone || "I'll share in chat"}.\n\nLooking forward to booking with you! 🌸`;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(full)}`, '_blank');
    };

    return (
        <section
            ref={sectionRef}
            id="book"
            className="relative py-20 md:py-32 overflow-hidden"
            style={{ background: 'linear-gradient(140deg, #0E0B07 0%, #181208 40%, #1C1510 100%)' }}
        >
            {/* Ambient orbs */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(160,19,77,0.09) 0%, transparent 65%)', filter: 'blur(80px)', transform: 'translate(30%, -30%)' }} />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(168,136,60,0.1) 0%, transparent 65%)', filter: 'blur(80px)', transform: 'translate(-30%, 30%)' }} />

            {/* Top border */}
            <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(168,136,60,0.25) 30%, rgba(196,160,80,0.4) 50%, rgba(168,136,60,0.25) 70%, transparent)' }} />

            {/* Sparkles */}
            <div className="absolute pointer-events-none select-none" aria-hidden="true">
                <div style={{ position: 'absolute', top: '12%', right: '10%', fontSize: '11px', color: 'rgba(168,136,60,0.25)', animation: 'pulse-soft 5s ease-in-out infinite' }}>✦</div>
                <div style={{ position: 'absolute', bottom: '18%', left: '8%', fontSize: '8px', color: 'rgba(168,136,60,0.18)', animation: 'pulse-soft 7s ease-in-out infinite 2s' }}>✦</div>
            </div>

            <div className="container-custom relative z-10">

                {/* Section header */}
                <div className="contact-reveal text-center mb-14 md:mb-20">
                    <div className="inline-flex items-center gap-3 mb-5">
                        <div className="w-10 h-px" style={{ background: 'rgba(168,136,60,0.4)' }} />
                        <span className="text-[10px] font-black uppercase tracking-[0.55em] font-sans" style={{ color: 'rgba(168,136,60,0.8)' }}>Book an Appointment</span>
                        <div className="w-10 h-px" style={{ background: 'rgba(168,136,60,0.4)' }} />
                    </div>
                    <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.9] mb-5" style={{ color: 'rgba(255,255,255,0.92)' }}>
                        Get in Touch
                    </h2>
                    <p className="font-sans text-base md:text-lg max-w-lg mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.38)' }}>
                        Fill in the form below and we'll respond via WhatsApp to confirm your booking.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-start">

                    {/* ── Contact Form ── */}
                    <div className="contact-reveal">
                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Name */}
                            <div>
                                <label className="block text-[9px] font-black uppercase tracking-[0.35em] mb-1.5 font-sans" style={{ color: 'rgba(255,255,255,0.3)' }}>Your Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'rgba(168,136,60,0.5)' }} />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        placeholder="e.g. Sarah Johnson"
                                        required
                                        style={{ ...inputBase }}
                                        onFocus={onFocus}
                                        onBlur={onBlur}
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-[9px] font-black uppercase tracking-[0.35em] mb-1.5 font-sans" style={{ color: 'rgba(255,255,255,0.3)' }}>Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'rgba(168,136,60,0.5)' }} />
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={e => setPhone(e.target.value)}
                                        placeholder="e.g. +1 780 000 0000"
                                        style={{ ...inputBase }}
                                        onFocus={onFocus}
                                        onBlur={onBlur}
                                    />
                                </div>
                            </div>

                            {/* Service */}
                            <div>
                                <label className="block text-[9px] font-black uppercase tracking-[0.35em] mb-1.5 font-sans" style={{ color: 'rgba(255,255,255,0.3)' }}>Service Interested In</label>
                                <div className="relative">
                                    <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'rgba(168,136,60,0.5)' }} />
                                    <select
                                        value={service}
                                        onChange={e => setService(e.target.value)}
                                        style={{ ...inputBase, cursor: 'pointer', appearance: 'none' }}
                                        onFocus={onFocus}
                                        onBlur={onBlur}
                                    >
                                        <option value="" style={{ background: '#1C1510', color: 'rgba(255,255,255,0.4)' }}>Select a service…</option>
                                        {SERVICES.map(s => (
                                            <option key={s} value={s} style={{ background: '#1C1510', color: 'rgba(255,255,255,0.85)' }}>{s}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'rgba(168,136,60,0.4)' }} />
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-[9px] font-black uppercase tracking-[0.35em] mb-1.5 font-sans" style={{ color: 'rgba(255,255,255,0.3)' }}>
                                    Message <span className="font-normal normal-case tracking-normal" style={{ color: 'rgba(255,255,255,0.18)' }}>(optional)</span>
                                </label>
                                <textarea
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                    placeholder="Any questions, preferences, or details you'd like us to know…"
                                    rows={3}
                                    style={{ ...inputBase, paddingLeft: '16px', resize: 'none' }}
                                    onFocus={onFocus}
                                    onBlur={onBlur}
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full flex items-center justify-between px-7 py-4 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 active:scale-[0.98] group mt-2"
                                style={{
                                    background: 'linear-gradient(135deg, #A8883C, #C4A050)',
                                    color: '#fff',
                                    boxShadow: '0 12px 32px rgba(168,136,60,0.3)',
                                }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 40px rgba(168,136,60,0.45)'; (e.currentTarget as HTMLElement).style.opacity = '0.92'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(168,136,60,0.3)'; (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                            >
                                <MessageCircle className="w-4 h-4 flex-shrink-0" />
                                <span>Send via WhatsApp</span>
                                <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                            </button>

                            <p className="text-center text-[9px] font-sans mt-1" style={{ color: 'rgba(255,255,255,0.2)' }}>
                                This will open WhatsApp with your details pre-filled. No emails.
                            </p>
                        </form>
                    </div>

                    {/* ── Map + Info ── */}
                    <div className="contact-reveal flex flex-col gap-4">

                        {/* Info cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                            <div className="flex items-start gap-4 rounded-2xl px-5 py-4"
                                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(168,136,60,0.15)' }}>
                                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                                    style={{ background: 'rgba(168,136,60,0.12)' }}>
                                    <MapPin className="w-4 h-4" style={{ color: 'rgba(196,160,80,0.9)' }} />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-[0.3em] mb-0.5" style={{ color: 'rgba(168,136,60,0.5)' }}>Location</p>
                                    <p className="text-[13.5px] font-bold leading-tight" style={{ color: 'rgba(255,255,255,0.8)' }}>3913 49 Ave</p>
                                    <p className="text-[13.5px] font-bold leading-tight" style={{ color: 'rgba(255,255,255,0.8)' }}>Beaumont, Alberta T4X 1Y7</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 rounded-2xl px-5 py-4"
                                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(168,136,60,0.15)' }}>
                                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                                    style={{ background: 'rgba(168,136,60,0.12)' }}>
                                    <Clock className="w-4 h-4" style={{ color: 'rgba(196,160,80,0.9)' }} />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-[0.3em] mb-0.5" style={{ color: 'rgba(168,136,60,0.5)' }}>Hours</p>
                                    <p className="text-[13px] font-bold leading-snug" style={{ color: 'rgba(255,255,255,0.8)' }}>Tue–Fri: 10am – 7pm</p>
                                    <p className="text-[13px] font-bold leading-snug" style={{ color: 'rgba(255,255,255,0.8)' }}>Sat: 11am – 7pm</p>
                                    <p className="text-[11px] font-sans mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>Mon & Sun: Closed</p>
                                </div>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="relative overflow-hidden"
                            style={{ height: '300px', borderRadius: '2rem', border: '1px solid rgba(168,136,60,0.18)', boxShadow: '0 24px 60px rgba(0,0,0,0.4)' }}>
                            <iframe
                                title="R.D. Beauty & Laser Clinic — Beaumont, Alberta"
                                src="https://www.openstreetmap.org/export/embed.html?bbox=-113.45%2C53.33%2C-113.38%2C53.38&layer=mapnik&marker=53.357%2C-113.414"
                                className="w-full h-full border-0"
                                loading="lazy"
                                allowFullScreen
                            />
                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                                <div className="flex items-center gap-2.5 backdrop-blur-sm rounded-full px-4 py-2.5 shadow-lg"
                                    style={{ background: 'rgba(20,15,10,0.85)', border: '1px solid rgba(168,136,60,0.2)' }}>
                                    <div className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse-soft" style={{ background: '#A8883C' }} />
                                    <span className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.8)' }}>R.D. Beauty — Beaumont, AB</span>
                                </div>
                                <a
                                    href="https://www.openstreetmap.org/?mlat=53.357&mlon=-113.414#map=15/53.357/-113.414"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-2 rounded-full pointer-events-auto transition-all duration-300"
                                    style={{ background: 'linear-gradient(135deg, #A8883C, #C4A050)', color: '#fff' }}
                                >
                                    Open Map
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
