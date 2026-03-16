'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag, ArrowRight, CalendarCheck } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { cn } from '../lib/utils';
import gsap from 'gsap';
import { WHATSAPP_NUMBER } from '../constants/services';

const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Our Story', href: '#story' },
    { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { getTotalItems } = useCartStore();
    const cartCount = getTotalItems();
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.fromTo(navRef.current,
            { y: -80, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 1.4 }
        );
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const toggleCart = () => {
        const panel = document.getElementById('cart-panel');
        if (panel) panel.classList.toggle('translate-x-full');
    };

    const closeMenu = () => setIsOpen(false);

    return (
        <>
            <nav
                ref={navRef}
                className={cn(
                    'fixed top-0 left-0 w-full z-[150] transition-all duration-500',
                    scrolled
                        ? 'h-[66px] bg-white/97 backdrop-blur-2xl shadow-sm border-b border-black/[0.06]'
                        : 'h-[80px] bg-white/65 backdrop-blur-xl border-b border-black/[0.04]'
                )}
            >
                <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-full">

                    {/* Logo */}
                    <Link href="#home" className="flex flex-col leading-none group shrink-0" onClick={closeMenu}>
                        <span className="font-display text-lg md:text-xl font-bold tracking-[0.18em] text-charcoal uppercase group-hover:text-deep-rose transition-colors duration-300">
                            R.B BEAUTY
                        </span>
                        <span className="text-[7px] font-black uppercase tracking-[0.5em] text-charcoal/30 font-sans">
                            The Clinic
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-0.5">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="relative px-4 py-2.5 text-[10.5px] font-black uppercase tracking-[0.15em] text-charcoal/55 hover:text-charcoal transition-colors duration-300 group rounded-full hover:bg-charcoal/[0.04]"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-2.5 shrink-0">
                        <button
                            type="button"
                            onClick={toggleCart}
                            className="relative p-2 text-charcoal/60 hover:text-charcoal transition-colors rounded-full hover:bg-charcoal/[0.05]"
                            aria-label="Booking"
                        >
                            <ShoppingBag className="w-[18px] h-[18px]" />
                            {cartCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-deep-rose text-white text-[9px] flex items-center justify-center rounded-full font-bold border-2 border-white animate-pulse-soft">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20R.B%20Beauty!%20I'd%20like%20to%20book%20a%20consultation.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:inline-flex items-center gap-2 bg-charcoal text-white px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] hover:bg-deep-rose transition-all duration-300 shadow-sm active:scale-95"
                        >
                            <CalendarCheck className="w-3.5 h-3.5" />
                            <span>Book Now</span>
                        </a>

                        <button
                            type="button"
                            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-charcoal/12 hover:bg-charcoal hover:text-white transition-all duration-300 text-charcoal"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Menu"
                        >
                            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile overlay */}
            <div className={cn(
                'fixed inset-0 z-[140] md:hidden transition-opacity duration-400',
                isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            )}>
                {/* Backdrop */}
                <div className="absolute inset-0 bg-charcoal/30 backdrop-blur-[2px]" onClick={closeMenu} />

                {/* Side panel */}
                <div className={cn(
                    'absolute top-0 right-0 w-[78vw] max-w-[320px] h-full bg-white flex flex-col shadow-2xl transition-transform duration-500',
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                )}>
                    {/* Header */}
                    <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-black/5">
                        <div>
                            <span className="font-display text-lg font-bold tracking-[0.15em] text-charcoal uppercase">Menu</span>
                            <p className="text-[8px] font-black uppercase tracking-[0.4em] text-charcoal/30 font-sans">R.B Beauty Clinic</p>
                        </div>
                        <button
                            onClick={closeMenu}
                            className="w-9 h-9 rounded-full border border-charcoal/10 flex items-center justify-center hover:bg-charcoal hover:text-white transition-all duration-300 hover:rotate-90"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Nav links */}
                    <div className="flex flex-col px-5 py-5 gap-1 flex-grow overflow-y-auto">
                        {navLinks.map((link, i) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={closeMenu}
                                className="flex items-center justify-between px-4 py-3.5 rounded-2xl text-charcoal/65 hover:text-charcoal hover:bg-ivory transition-all duration-300 group"
                                style={{ animationDelay: `${i * 50}ms` }}
                            >
                                <span className="text-sm font-black uppercase tracking-[0.18em]">{link.name}</span>
                                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300 text-deep-rose" />
                            </Link>
                        ))}
                    </div>

                    {/* CTA buttons */}
                    <div className="px-5 pb-8 space-y-2.5 border-t border-black/5 pt-5">
                        <button
                            onClick={() => { toggleCart(); closeMenu(); }}
                            className="w-full flex items-center justify-center gap-2 border border-charcoal/15 text-charcoal py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-charcoal hover:text-white transition-all duration-300"
                        >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>My Booking {cartCount > 0 && `(${cartCount})`}</span>
                        </button>
                        <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20R.B%20Beauty!%20I'd%20like%20to%20book%20a%20consultation.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={closeMenu}
                            className="w-full flex items-center justify-center gap-2 bg-deep-rose text-white py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-deep-rose-dark transition-all shadow-md"
                        >
                            <CalendarCheck className="w-3.5 h-3.5" />
                            <span>Book via WhatsApp</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
