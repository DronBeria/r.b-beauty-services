'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, MessageCircle, Sparkle } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { cn } from '../lib/utils';
import { gsap } from 'gsap';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { getTotalItems } = useCartStore();
    const cartCount = getTotalItems();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (cartCount > 0) {
            const tl = gsap.timeline();
            tl.to('.cart-badge', { scale: 1.4, duration: 0.2, yoyo: true, repeat: 1 });
        }
    }, [cartCount]);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Our Story', href: '#story' },
        { name: 'Treatments', href: '#services' },
        { name: 'Portfolio', href: '#gallery' },
        { name: 'Contact', href: '#contact' },
    ];

    const toggleCart = () => {
        const panel = document.getElementById('cart-panel');
        if (panel) panel.classList.toggle('translate-x-full');
    };

    return (
        <>
            <nav className={cn(
                'fixed top-0 left-0 w-full z-[80] transition-all duration-700 px-6 md:px-12',
                scrolled ? 'translate-y-4' : 'py-8'
            )}>
                <div className={cn(
                    "max-w-7xl mx-auto flex items-center justify-between transition-all duration-500",
                    scrolled ? "glass-card !rounded-[2rem] px-8 py-3 shadow-2xl border-white/20" : "bg-transparent py-2"
                )}>
                    {/* Logo */}
                    <Link href="#home" className="flex flex-col group relative">
                        <div className="flex items-center gap-1">
                            <span className={cn(
                                "font-display text-2xl md:text-3xl font-bold tracking-tighter transition-colors duration-500",
                                scrolled ? "text-charcoal" : "text-white"
                            )}>
                                R.B <span className="italic font-light text-gradient">BEAUTY</span>
                            </span>
                        </div>
                        <span className={cn(
                            "text-[8px] uppercase tracking-[0.5em] font-black -mt-0.5 transition-all duration-500",
                            scrolled ? "text-soft-gray opacity-60" : "text-white/40"
                        )}>
                            Esthetics & Laser
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className={cn(
                        "hidden md:flex items-center space-x-10 text-[10px] uppercase tracking-[0.3em] font-sans font-black",
                        scrolled ? "text-charcoal" : "text-white"
                    )}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="relative py-2 group overflow-hidden"
                            >
                                <span className="relative z-10 hover:text-deep-rose transition-colors duration-300">{link.name}</span>
                                <span className="absolute bottom-0 left-0 w-0 h-px bg-deep-rose transition-all duration-500 group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 md:gap-6">
                        <button
                            className={cn(
                                "group relative p-2.5 rounded-full transition-all duration-500",
                                scrolled ? "hover:bg-deep-rose/5" : "hover:bg-white/10"
                            )}
                            onClick={toggleCart}
                        >
                            <ShoppingCart className={cn("w-5 h-5 transition-colors", scrolled ? "text-charcoal" : "text-white")} />
                            {cartCount > 0 && (
                                <span className="cart-badge absolute -top-1 -right-1 w-5 h-5 bg-deep-rose text-white text-[9px] flex items-center justify-center rounded-full font-bold shadow-lg border-2 border-ivory">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        <Link
                            href="https://wa.me/1234567890"
                            className={cn(
                                "hidden sm:flex items-center gap-2.5 px-6 py-3 rounded-full text-[10px] font-black tracking-widest transition-all duration-500 shadow-xl",
                                scrolled
                                    ? "bg-deep-rose text-white hover:bg-deep-rose-dark shadow-deep-rose/20"
                                    : "bg-white text-charcoal hover:bg-ivory shadow-black/10"
                            )}
                        >
                            <MessageCircle className="w-4 h-4" />
                            <span>RESERVE</span>
                        </Link>

                        {/* Mobile Toggle */}
                        <button
                            className={cn(
                                "md:hidden p-2.5 rounded-full transition-all duration-500",
                                scrolled ? "text-charcoal hover:bg-deep-rose/5" : "text-white hover:bg-white/10"
                            )}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={cn(
                'fixed inset-0 z-[100] transition-all duration-700 flex flex-col items-center justify-center',
                isOpen ? 'visible opacity-100' : 'invisible opacity-0'
            )}>
                {/* Backdrop Blur */}
                <div
                    className="absolute inset-0 bg-charcoal/90 backdrop-blur-3xl"
                    onClick={() => setIsOpen(false)}
                />

                {/* Close Button */}
                <button
                    className="absolute top-10 right-10 p-4 text-white hover:text-deep-rose transition-colors z-20"
                    onClick={() => setIsOpen(false)}
                >
                    <X className="w-10 h-10" />
                </button>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-8 w-full px-10">
                    <div className="flex flex-col items-center mb-8">
                        <Sparkle className="w-10 h-10 text-warm-gold mb-4 animate-spin-slow" />
                        <span className="font-display text-3xl md:text-5xl font-bold text-white tracking-tighter">
                            R.B <span className="italic font-light text-gradient">BEAUTY</span>
                        </span>
                    </div>

                    <div className="flex flex-col items-center gap-6 w-full max-w-sm">
                        {navLinks.map((link, i) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "font-display text-4xl hover:text-deep-rose transition-all text-white/90 transform hover:scale-110",
                                    isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                                )}
                                style={{ transitionDelay: `${i * 100}ms` }}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className={cn(
                        "mt-12 flex flex-col items-center transition-all duration-700 delay-500",
                        isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    )}>
                        <Link
                            href="https://wa.me/1234567890"
                            className="btn-primary"
                            onClick={() => setIsOpen(false)}
                        >
                            <MessageCircle className="w-5 h-5" />
                            <span>Request Appointment</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
