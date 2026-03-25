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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const serviceStr = service ? `\n📌 Service: ${service}` : '';
        const msgStr = message ? `\n💬 Note: ${message}` : '';
        const full = `Hi R.D. Beauty & Laser Clinic! 😊\n\nMy name is ${name || 'a potential client'}.${serviceStr}${msgStr}\n\nBest number to reach me: ${phone || "I'll share in chat"}.\n\nLooking forward to booking with you! 🌸`;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(full)}`, '_blank');
    };

    return (
        <section ref={sectionRef} id="book" className="relative py-20 md:py-32 overflow-hidden" style={{ background: '#FDFAF7' }}>
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-deep-rose/5 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-warm-gold/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container-custom relative z-10">

                {/* Section header */}
                <div className="contact-reveal text-center mb-14 md:mb-20">
                    <div className="inline-flex items-center gap-3 mb-5">
                        <div className="w-10 h-px bg-deep-rose/30" />
                        <span className="text-[10px] font-black uppercase tracking-[0.55em] text-deep-rose font-sans">Book an Appointment</span>
                        <div className="w-10 h-px bg-deep-rose/30" />
                    </div>
                    <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-charcoal leading-[0.9] mb-5">
                        Get in Touch
                    </h2>
                    <p className="text-soft-gray font-sans text-base md:text-lg max-w-lg mx-auto leading-relaxed">
                        Fill in the form below and we'll respond via WhatsApp to confirm your booking.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-start">

                    {/* ── Contact Form ──────────────────────────────── */}
                    <div className="contact-reveal">
                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Name */}
                            <div className="relative">
                                <label className="block text-[9px] font-black uppercase tracking-[0.35em] text-charcoal/40 mb-1.5 font-sans">Your Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/25 pointer-events-none" />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        placeholder="e.g. Sarah Johnson"
                                        required
                                        className="w-full bg-white border border-black/[0.07] rounded-[1.25rem] pl-11 pr-4 py-3.5 text-[14px] text-charcoal font-sans placeholder-charcoal/25 outline-none focus:border-deep-rose/40 focus:ring-2 focus:ring-deep-rose/8 transition-all duration-300"
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="relative">
                                <label className="block text-[9px] font-black uppercase tracking-[0.35em] text-charcoal/40 mb-1.5 font-sans">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/25 pointer-events-none" />
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={e => setPhone(e.target.value)}
                                        placeholder="e.g. +1 780 000 0000"
                                        className="w-full bg-white border border-black/[0.07] rounded-[1.25rem] pl-11 pr-4 py-3.5 text-[14px] text-charcoal font-sans placeholder-charcoal/25 outline-none focus:border-deep-rose/40 focus:ring-2 focus:ring-deep-rose/8 transition-all duration-300"
                                    />
                                </div>
                            </div>

                            {/* Service */}
                            <div>
                                <label className="block text-[9px] font-black uppercase tracking-[0.35em] text-charcoal/40 mb-1.5 font-sans">Service Interested In</label>
                                <div className="relative">
                                    <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/25 pointer-events-none" />
                                    <select
                                        value={service}
                                        onChange={e => setService(e.target.value)}
                                        className="w-full bg-white border border-black/[0.07] rounded-[1.25rem] pl-11 pr-10 py-3.5 text-[14px] text-charcoal font-sans outline-none focus:border-deep-rose/40 focus:ring-2 focus:ring-deep-rose/8 transition-all duration-300 appearance-none cursor-pointer"
                                    >
                                        <option value="" className="text-charcoal/30">Select a service…</option>
                                        {SERVICES.map(s => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30 pointer-events-none" />
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-[9px] font-black uppercase tracking-[0.35em] text-charcoal/40 mb-1.5 font-sans">Message <span className="font-normal normal-case tracking-normal text-charcoal/25">(optional)</span></label>
                                <textarea
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                    placeholder="Any questions, preferences, or details you'd like us to know…"
                                    rows={3}
                                    className="w-full bg-white border border-black/[0.07] rounded-[1.25rem] px-4 py-3.5 text-[14px] text-charcoal font-sans placeholder-charcoal/25 outline-none focus:border-deep-rose/40 focus:ring-2 focus:ring-deep-rose/8 transition-all duration-300 resize-none"
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full flex items-center justify-between px-7 py-4 rounded-[1.5rem] bg-charcoal text-white text-[11px] font-black uppercase tracking-[0.2em] hover:bg-deep-rose transition-all duration-300 shadow-lg hover:shadow-deep-rose/20 active:scale-[0.98] group mt-2"
                            >
                                <MessageCircle className="w-4.5 h-4.5 flex-shrink-0" />
                                <span>Send via WhatsApp</span>
                                <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                            </button>

                            <p className="text-center text-[9px] text-charcoal/25 font-sans mt-1">
                                This will open WhatsApp with your details pre-filled. No emails.
                            </p>
                        </form>
                    </div>

                    {/* ── Map + Info ─────────────────────────────── */}
                    <div className="contact-reveal flex flex-col gap-5">

                        {/* Info cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                            <div className="flex items-start gap-4 bg-white rounded-2xl px-5 py-4 border border-black/[0.05] shadow-sm">
                                <div className="w-9 h-9 rounded-xl bg-deep-rose/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <MapPin className="w-4 h-4 text-deep-rose" />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-charcoal/35 mb-0.5">Location</p>
                                    <p className="text-[13.5px] font-bold text-charcoal leading-tight">3913 49 Ave</p>
                                    <p className="text-[13.5px] font-bold text-charcoal leading-tight">Beaumont, Alberta T4X 1Y7</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 bg-white rounded-2xl px-5 py-4 border border-black/[0.05] shadow-sm">
                                <div className="w-9 h-9 rounded-xl bg-warm-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Clock className="w-4 h-4 text-warm-gold" />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-charcoal/35 mb-0.5">Hours</p>
                                    <p className="text-[13px] font-bold text-charcoal leading-snug">Tue–Fri: 10am – 7pm</p>
                                    <p className="text-[13px] font-bold text-charcoal leading-snug">Sat: 11am – 7pm</p>
                                    <p className="text-[11px] text-charcoal/40 font-sans mt-0.5">Mon & Sun: Closed</p>
                                </div>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="relative rounded-[2rem] overflow-hidden shadow-xl border border-black/[0.06]" style={{ height: '300px' }}>
                            <iframe
                                title="R.D. Beauty & Laser Clinic — Beaumont, Alberta"
                                src="https://www.openstreetmap.org/export/embed.html?bbox=-113.45%2C53.33%2C-113.38%2C53.38&layer=mapnik&marker=53.357%2C-113.414"
                                className="w-full h-full border-0"
                                loading="lazy"
                                allowFullScreen
                            />
                            {/* Pin label overlay */}
                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                                <div className="flex items-center gap-2.5 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2.5 shadow-lg border border-black/[0.05]">
                                    <div className="w-2 h-2 rounded-full bg-deep-rose animate-pulse-soft flex-shrink-0" />
                                    <span className="text-[11px] font-black text-charcoal uppercase tracking-[0.2em]">R.D. Beauty — Beaumont, AB</span>
                                </div>
                                <a
                                    href="https://www.openstreetmap.org/?mlat=53.357&mlon=-113.414#map=15/53.357/-113.414"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-charcoal text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-2 rounded-full hover:bg-deep-rose transition-colors pointer-events-auto"
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
