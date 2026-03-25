'use client';

import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants/services';
import { cn } from '../lib/utils';

const WhatsAppButton = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = () => {
        const text = encodeURIComponent("Hi R.D. Beauty! I'm interested in booking a service.");
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    };

    return (
        <button
            onClick={handleClick}
            className={cn(
                "fixed bottom-20 md:bottom-28 right-4 md:right-10 z-[400] w-12 h-12 md:w-14 md:h-14 bg-green-500 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 group overflow-hidden border border-white/20",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
            )}
            style={{
                boxShadow: '0 8px 32px rgba(34, 197, 94, 0.4)',
                background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)'
            }}
            aria-label="Chat on WhatsApp"
        >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <MessageCircle className="w-6 h-6 md:w-7 md:h-7 drop-shadow-md" />

            {/* Soft pulse effect */}
            <div className="absolute inset-0 rounded-full animate-ping bg-green-400/20 pointer-events-none" />
        </button>
    );
};

export default WhatsAppButton;
