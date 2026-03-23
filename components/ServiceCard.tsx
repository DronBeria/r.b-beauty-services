'use client';

import React from 'react';
import { Clock, Check, Zap, Star, ShieldCheck, Scissors, Sparkles, CalendarCheck } from 'lucide-react';
import { Service } from '../types';
import { cn } from '../lib/utils';

const SQUARE_BOOKING_URL = 'https://app.squareup.com/appointments/book/mfaodungeatf80/L15XQCCP0YC3D/start';

interface ServiceCardProps {
    service: Service;
    index: number;
}

const CATEGORY_CONFIG: Record<string, { icon: React.ElementType; accent: string; bg: string }> = {
    'Threading': { icon: Scissors, accent: '#A0134D', bg: 'rgba(160,19,77,0.06)' },
    'Waxing': { icon: Sparkles, accent: '#9A7B4F', bg: 'rgba(154,123,79,0.07)' },
    'Nufree Waxing': { icon: ShieldCheck, accent: '#1a9d82', bg: 'rgba(26,157,130,0.07)' },
    'Facial Treatments': { icon: Star, accent: '#C2185B', bg: 'rgba(194,24,91,0.06)' },
    'Laser Hair Removal': { icon: Zap, accent: '#1565C0', bg: 'rgba(21,101,192,0.07)' },
};

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
    const isLaser = service.category === 'Laser Hair Removal';
    const config = CATEGORY_CONFIG[service.category] || CATEGORY_CONFIG['Threading'];
    const CategoryIcon = config.icon;
    const badgeLabel = service.badge || (service.isPopular ? 'Popular' : null);

    return (
        <div className="group relative bg-white rounded-[1.75rem] overflow-hidden border border-charcoal/[0.07] shadow-sm hover:shadow-lg transition-all duration-500 flex flex-col">

            {/* Top accent bar */}
            <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${config.accent}, transparent)` }} />

            {/* Header area — icon + price */}
            <div className="px-6 pt-5 pb-4 flex items-start justify-between gap-3">
                <div
                    className="w-11 h-11 rounded-[0.875rem] flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:scale-105"
                    style={{ background: config.bg }}
                >
                    <CategoryIcon className="w-5 h-5" style={{ color: config.accent }} />
                </div>

                <div className="flex flex-col items-end gap-1">
                    <span className="font-display text-[1.35rem] font-bold leading-none" style={{ color: config.accent }}>
                        {service.price}
                    </span>
                    <div className="flex items-center gap-1 text-[9px] font-black tracking-wider text-charcoal/35 font-sans">
                        <Clock className="w-2.5 h-2.5 text-charcoal/30" />
                        <span className="whitespace-nowrap">{service.duration}</span>
                    </div>
                </div>
            </div>

            {/* Badge */}
            {badgeLabel && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2">
                    <span className={cn(
                        'text-white text-[8px] tracking-widest uppercase font-black px-2.5 py-1 rounded-full',
                        isLaser ? 'bg-[#1565C0]/80' : 'bg-warm-gold/80'
                    )}>
                        {badgeLabel}
                    </span>
                </div>
            )}

            {/* Content */}
            <div className="px-6 pb-6 flex flex-col flex-grow">
                <div className="w-full h-px bg-charcoal/[0.05] mb-4" />

                <h3 className="font-display text-[1.15rem] text-charcoal leading-tight mb-2">
                    {service.name}
                </h3>

                <p className="text-soft-gray text-[11.5px] leading-relaxed mb-4 font-sans line-clamp-2 flex-grow">
                    {service.description}
                </p>

                {/* Benefits */}
                <ul className="flex flex-col gap-1.5 mb-5">
                    {service.benefits.slice(0, 3).map((b, i) => (
                        <li key={i} className="flex items-center gap-2 text-[10.5px] text-charcoal/55 font-sans font-semibold">
                            <Check className="w-3 h-3 flex-shrink-0 stroke-[2.5]" style={{ color: config.accent }} />
                            {b}
                        </li>
                    ))}
                </ul>

                {/* Book button */}
                <a
                    href={SQUARE_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 hover:opacity-90 active:scale-95"
                    style={{ background: config.bg, color: config.accent, border: `1px solid ${config.accent}20` }}
                >
                    <CalendarCheck className="w-3.5 h-3.5" />
                    <span>Book This</span>
                </a>
            </div>
        </div>
    );
};

export default ServiceCard;
