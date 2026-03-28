'use client';

import React from 'react';
import { Clock, Check, Zap, Star, ShieldCheck, Scissors, Sparkles, CalendarCheck } from 'lucide-react';
import { Service } from '../types';

const SQUARE_BOOKING_URL = 'https://app.squareup.com/appointments/book/mfaodungeatf80/L15XQCCP0YC3D/start';

interface ServiceCardProps {
    service: Service;
    index: number;
}

const CATEGORY_CONFIG: Record<string, {
    icon: React.ElementType;
    accent: string;
    accentRgb: string;
    bg: string;
}> = {
    'Threading':           { icon: Scissors,    accent: '#A0134D', accentRgb: '160,19,77',   bg: 'rgba(160,19,77,0.06)'  },
    'Waxing':              { icon: Sparkles,    accent: '#A8883C', accentRgb: '168,136,60',  bg: 'rgba(168,136,60,0.07)' },
    'Nufree Waxing':       { icon: ShieldCheck, accent: '#1a9d82', accentRgb: '26,157,130',  bg: 'rgba(26,157,130,0.07)' },
    'Facial Treatments':   { icon: Star,         accent: '#C2185B', accentRgb: '194,24,91',   bg: 'rgba(194,24,91,0.06)'  },
    'Laser Hair Removal':  { icon: Zap,          accent: '#1565C0', accentRgb: '21,101,192',  bg: 'rgba(21,101,192,0.07)' },
};

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
    const isLaser = service.category === 'Laser Hair Removal';
    const config = CATEGORY_CONFIG[service.category] || CATEGORY_CONFIG['Threading'];
    const CategoryIcon = config.icon;
    const badgeLabel = service.badge || (service.isPopular ? 'Popular' : null);

    return (
        <div
            className="group relative bg-white overflow-hidden flex flex-col"
            style={{
                borderRadius: '1.75rem',
                border: '1px solid rgba(168,136,60,0.1)',
                boxShadow: '0 4px 20px rgba(26,22,16,0.05)',
                transition: 'box-shadow 0.4s ease, border-color 0.4s ease, transform 0.4s ease',
            }}
            onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = `0 20px 56px rgba(${config.accentRgb},0.13), 0 4px 16px rgba(26,22,16,0.06)`;
                el.style.borderColor = `rgba(${config.accentRgb},0.22)`;
                el.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = '0 4px 20px rgba(26,22,16,0.05)';
                el.style.borderColor = 'rgba(168,136,60,0.1)';
                el.style.transform = 'translateY(0)';
            }}
        >
            {/* Top accent bar */}
            <div className="h-[3px] w-full flex-shrink-0" style={{
                background: `linear-gradient(90deg, ${config.accent} 0%, rgba(${config.accentRgb},0.08) 100%)`
            }} />

            {/* Header: icon + price */}
            <div className="px-5 sm:px-6 pt-5 pb-4 flex items-start justify-between gap-3">
                <div
                    className="w-11 h-11 rounded-[0.875rem] flex items-center justify-center flex-shrink-0"
                    style={{ background: config.bg }}
                >
                    <CategoryIcon className="w-5 h-5" style={{ color: config.accent }} />
                </div>
                <div className="flex flex-col items-end gap-1">
                    <span className="font-display text-xl font-bold leading-none" style={{ color: config.accent }}>
                        {service.price}
                    </span>
                    <div className="flex items-center gap-1.5 text-[9px] font-semibold tracking-wider text-charcoal/35 font-sans">
                        <Clock className="w-2.5 h-2.5" />
                        <span className="whitespace-nowrap">{service.duration}</span>
                    </div>
                </div>
            </div>

            {/* Badge */}
            {badgeLabel && (
                <div className="absolute top-[14px] left-1/2 -translate-x-1/2 z-10">
                    <span
                        className="text-white text-[7.5px] tracking-widest uppercase font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
                        style={{
                            background: isLaser
                                ? 'linear-gradient(135deg, #1565C0, #1976D2)'
                                : 'linear-gradient(135deg, #A8883C, #C4A050)',
                        }}
                    >
                        {badgeLabel}
                    </span>
                </div>
            )}

            {/* Body */}
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 flex flex-col flex-grow">
                <div className="w-full h-px mb-4" style={{ background: 'rgba(168,136,60,0.08)' }} />
                <h3 className="font-display text-[1.08rem] text-charcoal leading-tight mb-2">
                    {service.name}
                </h3>
                <p className="text-soft-gray text-[11.5px] leading-relaxed mb-4 font-sans line-clamp-2 flex-grow">
                    {service.description}
                </p>
                <ul className="flex flex-col gap-1.5 mb-4">
                    {service.benefits.slice(0, 3).map((b, i) => (
                        <li key={i} className="flex items-center gap-2 text-[10.5px] text-charcoal/55 font-sans">
                            <Check className="w-3 h-3 flex-shrink-0 stroke-[2.5]" style={{ color: config.accent }} />
                            {b}
                        </li>
                    ))}
                </ul>
                <a
                    href={SQUARE_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-2xl text-[10px] font-semibold uppercase tracking-widest active:scale-[0.97]"
                    style={{
                        background: config.bg,
                        color: config.accent,
                        border: `1px solid rgba(${config.accentRgb},0.15)`,
                        transition: 'background 0.25s ease, color 0.25s ease',
                    }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = config.accent; el.style.color = '#fff'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = config.bg; el.style.color = config.accent; }}
                >
                    <CalendarCheck className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Book This</span>
                </a>
            </div>
        </div>
    );
};

export default ServiceCard;
