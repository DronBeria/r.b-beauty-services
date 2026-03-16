'use client';

import React from 'react';
import { Star, ShieldCheck, Zap, Award, CheckCircle2, Sparkles, Heart, Clock } from 'lucide-react';

const items = [
    { icon: Star, text: "5.0 Star Rating" },
    { icon: Zap, text: "FDA Approved Technology" },
    { icon: Award, text: "10+ Years Excellence" },
    { icon: CheckCircle2, text: "500+ Happy Clients" },
    { icon: ShieldCheck, text: "Hospital-Grade Safety" },
    { icon: Sparkles, text: "Free First Consultation" },
    { icon: Heart, text: "Medical Grade Lasers" },
    { icon: Clock, text: "Same-Day Bookings Available" },
    { icon: Star, text: "Toronto's #1 Rated Clinic" },
    { icon: Zap, text: "Cryo-Cooling Comfort Tech" },
    { icon: Award, text: "Certified Dermal Practice" },
    { icon: CheckCircle2, text: "All Skin Types Welcome" },
];

// Triplicated for a seamless infinite loop
const repeated = [...items, ...items, ...items];

export default function MarqueeStrip() {
    return (
        <div
            className="relative overflow-hidden border-y"
            style={{
                background: 'linear-gradient(135deg, #0F0E12 0%, #1C1018 50%, #0F0E12 100%)',
                borderColor: 'rgba(255,255,255,0.04)',
            }}
        >
            {/* Subtle edge fades */}
            <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to right, #0F0E12, transparent)' }} />
            <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to left, #0F0E12, transparent)' }} />

            <div className="flex animate-marquee py-4 gap-0 w-max">
                {repeated.map((item, i) => (
                    <span
                        key={i}
                        className="inline-flex items-center gap-3 mx-8 shrink-0"
                    >
                        <item.icon
                            className="w-3.5 h-3.5 flex-shrink-0"
                            style={{ color: '#9A7B4F' }}
                        />
                        <span
                            className="text-[10px] font-black uppercase whitespace-nowrap"
                            style={{ letterSpacing: '0.3em', color: 'rgba(255,255,255,0.5)' }}
                        >
                            {item.text}
                        </span>
                        <span style={{ color: 'rgba(255,255,255,0.12)', marginLeft: '1rem' }}>◆</span>
                    </span>
                ))}
            </div>
        </div>
    );
}
