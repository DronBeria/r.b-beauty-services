'use client';

import React from 'react';
import { Clock, Check, ShoppingCart, Zap, Star, ShieldCheck } from 'lucide-react';
import { Service } from '../types';
import { useCartStore } from '../store/useCartStore';
import { cn } from '../lib/utils';
import { gsap } from 'gsap';

interface ServiceCardProps {
    service: Service;
    index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
    const { addItem, items } = useCartStore();
    const isInCart = items.some((item) => item.id === service.id);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isInCart) return;
        addItem(service);
        const target = e.currentTarget;
        gsap.to(target, { scale: 0.93, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' });
    };

    const badgeLabel = service.badge || (service.isPopular ? 'Popular' : null);
    const isLaser = service.category === 'Laser Hair Removal';

    return (
        <div className="group relative bg-white rounded-[2rem] overflow-hidden border border-charcoal/[0.07] shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col transform hover:-translate-y-2">

            {/* Badge */}
            {badgeLabel && (
                <div className="absolute top-4 left-4 z-20">
                    <span className={cn(
                        'text-white text-[9px] tracking-widest uppercase font-black px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md',
                        isLaser
                            ? 'bg-charcoal/85 backdrop-blur-sm'
                            : 'bg-warm-gold/90 backdrop-blur-sm'
                    )}>
                        {isLaser
                            ? <Zap className="w-2.5 h-2.5 fill-deep-rose-light text-deep-rose-light" />
                            : <Star className="w-2.5 h-2.5 fill-current" />}
                        {badgeLabel}
                    </span>
                </div>
            )}

            {/* Image */}
            <div className="relative w-full overflow-hidden bg-ivory flex-shrink-0" style={{ height: '190px' }}>
                <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/25 to-transparent" />
                <div className="absolute inset-0 bg-deep-rose/8 opacity-0 group-hover:opacity-100 transition-opacity duration-600" />

                {/* Price pill */}
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow border border-white/50">
                    <span className="font-display text-base font-bold text-deep-rose leading-none">{service.price}</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-display text-[1.2rem] text-charcoal leading-tight group-hover:text-deep-rose transition-colors duration-400">
                        {service.name}
                    </h3>
                    <div className="flex items-center gap-1 shrink-0 text-[9px] font-black tracking-wider text-charcoal/40 font-sans mt-0.5">
                        <Clock className="w-3 h-3 text-warm-gold" />
                        <span className="whitespace-nowrap">{service.duration}</span>
                    </div>
                </div>

                <p className="text-soft-gray text-[11px] leading-relaxed mb-4 font-sans line-clamp-2">
                    {service.description}
                </p>

                {/* Benefits */}
                <ul className="flex flex-wrap gap-x-3 gap-y-1.5 mb-5 flex-grow">
                    {service.benefits.slice(0, 3).map((b, i) => (
                        <li key={i} className="flex items-center gap-1 text-[10px] text-charcoal/55 font-sans font-semibold">
                            <Check className="w-3 h-3 text-deep-rose shrink-0 stroke-[2.5]" />
                            {b}
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <button
                    onClick={handleAddToCart}
                    disabled={isInCart}
                    className={cn(
                        'w-full py-3 rounded-[1.5rem] font-black text-[9px] tracking-[0.25em] uppercase transition-all duration-400 flex items-center justify-center gap-2 relative overflow-hidden',
                        isInCart
                            ? 'bg-ivory text-soft-gray border border-charcoal/10 cursor-default'
                            : 'bg-charcoal text-white hover:bg-deep-rose shadow hover:shadow-lg'
                    )}
                >
                    {isInCart ? (
                        <>
                            <ShieldCheck className="w-3.5 h-3.5 text-deep-rose" />
                            <span>Added to Booking</span>
                        </>
                    ) : (
                        <>
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>Add to Booking</span>
                        </>
                    )}
                    {!isInCart && (
                        <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-600" />
                    )}
                </button>
            </div>
        </div>
    );
};

export default ServiceCard;
