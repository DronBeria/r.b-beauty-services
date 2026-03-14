'use client';

import React from 'react';
import Image from 'next/image';
import { Clock, Check, ShoppingCart, Zap, Star, ShieldCheck } from 'lucide-react';
import { Service } from '../types';
import { useCartStore } from '../store/useCartStore';
import { cn } from '../lib/utils';
import { gsap } from 'gsap';

interface ServiceCardProps {
    service: Service;
    index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
    const { addItem, items } = useCartStore();
    const isInCart = items.some((item) => item.id === service.id);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isInCart) return;
        addItem(service);

        // Animation
        const target = e.currentTarget;
        gsap.to(target, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
        });
    };

    return (
        <div className="group relative glass-card !rounded-[3rem] overflow-hidden transition-all duration-700 flex flex-col h-full transform hover:-translate-y-3 hover:shadow-premium shadow-xl border-white/20">
            {/* Badges */}
            <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
                {service.isPopular && (
                    <div className="bg-warm-gold/90 backdrop-blur-md text-white text-[9px] tracking-widest uppercase font-black px-4 py-1.5 rounded-full flex items-center gap-2 shadow-xl animate-float">
                        <Star className="w-3 h-3 fill-current" />
                        Signature
                    </div>
                )}
                {service.category === 'Laser Treatments' && (
                    <div className="bg-charcoal/80 backdrop-blur-md text-white text-[9px] tracking-widest uppercase font-black px-4 py-1.5 rounded-full flex items-center gap-2 shadow-xl">
                        <Zap className="w-3 h-3 fill-current text-deep-rose-light" />
                        Clinical Elite
                    </div>
                )}
            </div>

            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden bg-ivory">
                <Image
                    src={`https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800`}
                    alt={service.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
                <div className="absolute inset-0 bg-deep-rose/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>

            {/* Content Area */}
            <div className="p-8 md:p-10 flex flex-col flex-grow relative">
                <div className="absolute inset-0 bg-noise pointer-events-none opacity-[0.02]" />

                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-display text-3xl md:text-3xl text-charcoal leading-[1.1] transition-colors duration-500 group-hover:text-deep-rose">
                        {service.name}
                    </h3>
                </div>

                <p className="text-soft-gray text-sm md:text-base leading-relaxed mb-6 font-sans line-clamp-3">
                    {service.description}
                </p>

                <div className="flex items-center gap-6 mb-8 text-[11px] font-black tracking-widest uppercase text-soft-gray/60 font-sans">
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-warm-gold" />
                        <span>{service.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-deep-rose text-lg font-display tracking-normal normal-case font-bold">{service.price}</span>
                    </div>
                </div>

                {/* Benefits List */}
                <ul className="space-y-3 mb-10 flex-grow">
                    {service.benefits.slice(0, 3).map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3 text-xs text-soft-gray font-sans leading-relaxed">
                            <div className="mt-1 rounded-full p-0.5 bg-deep-rose/5 text-deep-rose">
                                <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                            <span>{benefit}</span>
                        </li>
                    ))}
                </ul>

                {/* Refined Action Area */}
                <div className="mt-auto pt-6 border-t border-charcoal/5">
                    <button
                        onClick={handleAddToCart}
                        disabled={isInCart}
                        className={cn(
                            "w-full py-5 rounded-[2rem] font-black text-[10px] tracking-[0.3em] uppercase transition-all duration-700 flex items-center justify-center gap-3 relative overflow-hidden",
                            isInCart
                                ? "bg-ivory text-soft-gray border border-charcoal/10 cursor-default"
                                : "btn-primary group/btn !py-5 shadow-none hover:shadow-xl"
                        )}
                    >
                        {isInCart ? (
                            <>
                                <ShieldCheck className="w-5 h-5 text-deep-rose" />
                                <span>Secured in Booking</span>
                            </>
                        ) : (
                            <>
                                <ShoppingCart className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                                <span>Enhance Your Ritual</span>
                            </>
                        )}
                        {!isInCart && (
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
