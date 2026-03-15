'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag, Search, User } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { cn } from '../lib/utils';
import gsap from 'gsap';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { getTotalItems } = useCartStore();
    const cartCount = getTotalItems();
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // Entrance animation
        gsap.from(navRef.current, {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.2
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
                className="fixed top-0 left-0 w-full z-[80] h-[80px] flex items-center bg-white border-b border-[#eee]"
            >
                <div className="w-full max-w-[1400px] mx-auto px-16 flex items-center justify-between h-full relative">
                    {/* Left: Nav links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-[14px] font-medium text-[#333] hover:text-black transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Center: Logo */}
                    <Link
                        href="#home"
                        className="absolute left-1/2 -translate-x-1/2 font-sans text-xl font-bold tracking-tight text-black uppercase"
                    >
                        CAREON
                    </Link>

                    {/* Right: Icons */}
                    <div className="flex items-center gap-5">
                        <button type="button" className="p-1 text-[#333] hover:text-black transition-colors" aria-label="Search">
                            <Search className="w-5 h-5" />
                        </button>
                        <button
                            type="button"
                            onClick={toggleCart}
                            className="relative p-1 text-[#333] hover:text-black transition-colors"
                            aria-label="Cart"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-black text-white text-[9px] flex items-center justify-center rounded-full font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        <Link href="#contact" className="p-1 text-[#333] hover:text-black transition-colors" aria-label="Profile">
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
                'fixed inset-0 z-[100] bg-white md:hidden transition-all duration-500 ease-expo',
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
            )}>
                <div className="pt-24 px-8 flex flex-col gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-2xl font-bold text-charcoal tracking-tight"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Navbar;


