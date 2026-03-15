'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag, Search, User, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { cn } from '../lib/utils';
import gsap from 'gsap';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { getTotalItems } = useCartStore();
    const cartCount = getTotalItems();
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.from(navRef.current, {
            y: -100,
            opacity: 0,
            duration: 1.2,
            ease: 'expo.out',
            delay: 0.1
        });
    }, []);

    const navLinks = [
        { name: 'Products', href: '#products' },
        { name: 'Shop', href: '#shop' },
        { name: 'Offers', href: '#offers' },
        { name: 'About us', href: '#about' },
    ];

    const toggleCart = () => {
        const panel = document.getElementById('cart-panel');
        if (panel) panel.classList.toggle('translate-x-full');
    };

    return (
        <>
            <nav
                ref={navRef}
                className="fixed top-0 left-0 w-full z-[80] h-[80px] flex items-center bg-white/70 backdrop-blur-xl border-b border-black/5"
            >
                <div className="w-full max-w-[1400px] mx-auto px-8 md:px-16 flex items-center justify-between h-full relative">
                    {/* Left: Nav links */}
                    <div className="hidden md:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-[13px] font-bold text-charcoal/70 hover:text-black transition-all duration-300 relative group py-2"
                            >
                                <span className="relative z-10 uppercase tracking-widest">{link.name}</span>
                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    {/* Center: Logo */}
                    <Link
                        href="#home"
                        className="absolute left-1/2 -translate-x-1/2 font-sans text-2xl font-black tracking-[0.2em] text-black uppercase"
                    >
                        CAREON
                    </Link>

                    {/* Right: Icons */}
                    <div className="flex items-center gap-6">
                        <button type="button" className="p-1 text-charcoal/60 hover:text-black hover:scale-110 transition-all" aria-label="Search">
                            <Search className="w-5 h-5" />
                        </button>
                        <button
                            type="button"
                            onClick={toggleCart}
                            className="relative p-1 text-charcoal/60 hover:text-black hover:scale-110 transition-all"
                            aria-label="Cart"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-deep-rose text-white text-[9px] flex items-center justify-center rounded-full font-bold shadow-sm animate-pulse-soft">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        <Link href="#contact" className="hidden sm:block p-1 text-charcoal/60 hover:text-black hover:scale-110 transition-all" aria-label="Profile">
                            <User className="w-5 h-5" />
                        </Link>
                        <button
                            type="button"
                            className="md:hidden p-1 text-black"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Menu"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile menu */}
            <div className={cn(
                'fixed inset-0 z-[100] bg-white md:hidden transition-all duration-700 ease-expo',
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
            )}>
                <div className="pt-32 px-12 flex flex-col gap-8">
                    {navLinks.map((link, i) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-4xl font-display text-charcoal tracking-tight flex items-center justify-between group"
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >
                            <span className="group-hover:translate-x-4 transition-transform duration-500 uppercase">{link.name}</span>
                            <ArrowRight className="w-8 h-8 opacity-0 group-hover:opacity-100 -translate-x-8 group-hover:translate-x-0 transition-all duration-500" />
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};


export default Navbar;


