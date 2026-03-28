'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    MapPin,
    PhoneCall,
    Mail,
    Clock,
    ChevronRight,
    MessageCircle,
    Award,
    ShieldCheck,
    CheckCircle2,
    Sparkles,
    ArrowUpRight,
    Instagram,
    Facebook
} from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants/services';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <footer id="contact" className="relative bg-charcoal text-white pt-16 md:pt-32 pb-10 md:pb-16 overflow-hidden">
                {/* Visual Ambient Flourishes */}
                <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-deep-rose/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-warm-gold/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />

                <div className="container-custom relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 lg:gap-16 mb-14 md:mb-20 lg:mb-24">
                        {/* Brand Identity Area */}
                        <div className="space-y-10">
                            <Link href="/" className="group inline-block">
                                <Image
                                    src="/logo.png"
                                    alt="R.D. Beauty & Laser Clinic"
                                    width={280}
                                    height={280}
                                    className="w-auto object-contain transition-all duration-500 group-hover:scale-105"
                                    style={{
                                        height: '140px',
                                        filter: 'brightness(0) invert(1)',
                                        opacity: 0.88,
                                    }}
                                />
                            </Link>
                            <p className="text-white/50 font-sans text-base leading-relaxed max-w-xs">
                                Advanced laser and professional skincare treatments for men and women. Clean, comfortable, and results-driven care you can trust.
                            </p>
                            <div className="flex items-center gap-4">
                                {[
                                    { icon: Instagram, href: '#', label: 'Instagram' },
                                    { icon: Facebook, href: '#', label: 'Facebook' },
                                ].map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-deep-rose hover:border-deep-rose transition-all group"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Curated Pathways */}
                        <div className="space-y-10">
                            <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-warm-gold/60">Therapeutic Rituals</h3>
                            <ul className="space-y-5">
                                {[
                                    { name: 'Laser Hair Removal', href: '/services' },
                                    { name: 'HydraFacial Treatment', href: '/services' },
                                    { name: 'Microneedling (CIT)', href: '/services' },
                                    { name: 'Nufree Organic Waxing', href: '/services' },
                                    { name: 'Full Face Threading', href: '/services' },
                                    { name: 'Korean Glow Facial', href: '/services' }
                                ].map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.href} className="text-white/40 hover:text-white transition-all flex items-center gap-3 group text-sm font-sans">
                                            <div className="w-1.5 h-[1px] bg-deep-rose/30 group-hover:w-4 group-hover:bg-deep-rose transition-all duration-500" />
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Dermal Intake & Contact */}
                        <div className="space-y-10">
                            <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-warm-gold/60">Clinic Access</h3>
                            <div className="space-y-8">
                                <div className="flex items-start gap-5 group">
                                    <div className="mt-1 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-charcoal-light transition-all border border-white/5">
                                        <MapPin className="w-4 h-4 text-warm-gold" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-white/60 text-sm font-sans leading-relaxed">
                                            3913 49 Ave <br />
                                            Beaumont, Alberta T4X 1Y7
                                        </p>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-deep-rose/40">Our Clinic</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-5">
                                    <a href="tel:+16478904871" className="flex items-center gap-4 text-white/40 hover:text-warm-gold transition-colors text-sm font-sans italic">
                                        <PhoneCall className="w-4 h-4" />
                                        <span>+1 (647) 890-4871</span>
                                    </a>
                                    <a href="mailto:info@rbbeauty.ca" className="flex items-center gap-4 text-white/40 hover:text-warm-gold transition-colors text-sm font-sans italic">
                                        <Mail className="w-4 h-4" />
                                        <span>info@rbbeauty.ca</span>
                                    </a>
                                </div>


                                <Link
                                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                                    className="inline-flex items-center gap-4 bg-deep-rose/5 border border-deep-rose/20 px-6 py-4 rounded-2xl group transition-all hover:bg-deep-rose hover:border-deep-rose"
                                >
                                    <MessageCircle className="w-5 h-5 text-deep-rose group-hover:text-white transition-all" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80 group-hover:translate-x-1 transition-transform">Digital Concierge</span>
                                    <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white" />
                                </Link>
                            </div>
                        </div>

                        {/* Clinical Schedule */}
                        <div className="space-y-10">
                            <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-warm-gold/60">Intake Schedule</h3>
                            <div className="space-y-5">
                                {[
                                    { day: 'Monday', hours: 'Closed' },
                                    { day: 'Tuesday – Friday', hours: '10:00 – 19:00' },
                                    { day: 'Saturday', hours: '11:00 – 19:00' },
                                    { day: 'Sunday', hours: 'Closed' },
                                ].map((item) => (
                                    <div key={item.day} className="flex justify-between items-center text-sm font-sans border-b border-white/5 pb-3">
                                        <span className="text-white/40">{item.day}</span>
                                        <span className="font-bold text-warm-gold">{item.hours}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Clinical Accreditation */}
                            <div className="pt-8 grid grid-cols-4 gap-4">
                                {[CheckCircle2, Award, ShieldCheck, Sparkles].map((Icon, idx) => (
                                    <div key={idx} className="w-full aspect-square rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-all duration-500 hover:-translate-y-1">
                                        <Icon className="w-5 h-5 text-white/20" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Narrative Bar */}
                    <div className="pt-10 md:pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 text-white/20 text-[9px] font-black uppercase tracking-[0.5em] font-sans">
                        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 text-center md:text-left">
                            <p>© {currentYear} R.D. Beauty & Laser Clinic. All Rights Reserved.</p>
                            <div className="flex items-center gap-10">
                                <Link href="#" className="hover:text-white transition-colors">Privacy Protocol</Link>
                                <Link href="#" className="hover:text-white transition-colors">Service Terms</Link>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-px bg-white/10" />
                            <span className="text-white/30 italic font-light tracking-normal lowercase font-accent text-2xl">Dedicated to Radiance</span>
                            <div className="w-8 h-px bg-white/10" />
                        </div>
                    </div>
                </div>
            </footer>

            {/* Sub-footer — Arc WebWorks */}
            <div className="bg-[#07070A] border-t border-white/[0.05] py-4 px-6">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                    <span className="text-[8.5px] font-sans text-white/18 uppercase tracking-[0.45em]">Developed & managed by</span>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(168,136,60,0.4))' }} />
                        <a
                            href="https://arcwebworks.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[9px] font-semibold uppercase tracking-[0.45em] transition-all duration-300"
                            style={{ color: 'rgba(168,136,60,0.55)' }}
                            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(196,160,80,0.9)'}
                            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(168,136,60,0.55)'}
                        >
                            Arc WebWorks
                        </a>
                        <div className="w-4 h-px" style={{ background: 'linear-gradient(90deg, rgba(168,136,60,0.4), transparent)' }} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;
