'use client';

import React from 'react';
import Link from 'next/link';
import {
    Instagram,
    Linkedin,
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
    ArrowUpRight
} from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants/services';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer id="contact" className="relative bg-charcoal text-white pt-32 pb-16 overflow-hidden">
            {/* Visual Ambient Flourishes */}
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-deep-rose/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-warm-gold/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 lg:gap-24 mb-24 md:mb-32">
                    {/* Brand Identity Area */}
                    <div className="space-y-10">
                        <Link href="#home" className="flex flex-col group max-w-fit">
                            <span className="font-display text-5xl font-bold tracking-tighter text-gradient transition-all group-hover:scale-105 origin-left duration-500"> R.B BEAUTY </span>
                            <span className="text-[10px] uppercase tracking-[0.6em] font-sans text-white/40 -mt-1 group-hover:translate-x-2 transition-transform duration-500"> The Clinic </span>
                        </Link>
                        <p className="text-white/50 font-sans text-base leading-relaxed max-w-xs">
                            Dedicated to the science of radiance. We blend clinical precision with
                            luxury mastership to reveal your skin's true biological potential.
                        </p>
                        <div className="flex items-center gap-5">
                            <Link href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-deep-rose hover:border-deep-rose flex items-center justify-center transition-all duration-500 group">
                                <Instagram className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                            </Link>
                            <Link href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-deep-rose hover:border-deep-rose flex items-center justify-center transition-all duration-500 group">
                                <Linkedin className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                            </Link>
                        </div>
                    </div>

                    {/* Curated Pathways */}
                    <div className="space-y-10">
                        <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-warm-gold/60">Therapeutic Rituals</h3>
                        <ul className="space-y-5">
                            {[
                                'Laser Hair Removal',
                                'Dermal Brightening',
                                'Hydra-Luminous Therapy',
                                'Clinical Peels',
                                'Resurfacing Rituals',
                                'Gentlemen\'s Protocols'
                            ].map((item) => (
                                <li key={item}>
                                    <Link href="#services" className="text-white/40 hover:text-white transition-all flex items-center gap-3 group text-sm font-sans">
                                        <div className="w-1.5 h-[1px] bg-deep-rose/30 group-hover:w-4 group-hover:bg-deep-rose transition-all duration-500" />
                                        <span>{item}</span>
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
                                        123 Beauty Blvd, Suite 100 <br />
                                        Toronto, ON M5V 2L7
                                    </p>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-deep-rose/40">The Flagship</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-5">
                                <a href="tel:+14165550199" className="flex items-center gap-4 text-white/40 hover:text-warm-gold transition-colors text-sm font-sans italic">
                                    <PhoneCall className="w-4 h-4" />
                                    <span>+1 (416) 555-0199</span>
                                </a>
                                <a href="mailto:hello@rbbeauty.ca" className="flex items-center gap-4 text-white/40 hover:text-warm-gold transition-colors text-sm font-sans italic">
                                    <Mail className="w-4 h-4" />
                                    <span>hello@rbbeauty.ca</span>
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
                                { day: 'Monday – Friday', hours: '10:00 – 20:00' },
                                { day: 'Saturday', hours: '11:00 – 18:00' },
                                { day: 'Sunday', hours: 'Closed' }
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
                <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10 text-white/20 text-[9px] font-black uppercase tracking-[0.5em] font-sans">
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 text-center md:text-left">
                        <p>© {currentYear} R.B Beauty Clinic. All Rights Reserved.</p>
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
    );
};

export default Footer;
