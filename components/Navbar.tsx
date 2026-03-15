'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, Search, User } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { cn } from '../lib/utils';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { getTotalItems } = useCartStore();
    const cartCount = getTotalItems();

    const navLinks = [
        { name: 'Treatments', href: '#services' },
        { name: 'Shop', href: '#services' },
        { name: 'Offers', href: '#services' },
        { name: 'About us', href: '#story' },
    ];

    const toggleCart = () => {
        const panel = document.getElementById('cart-panel');
        if (panel) panel.classList.toggle('translate-x-full');
    };

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-[80] h-[72px] flex items-center bg-white/95 backdrop-blur-sm border-b border-black/[0.06]">
                <div className="w-full max-w-[1400px] mx-auto px-8 lg:px-12 flex items-center justify-between h-full">
                    {/* Left: 4 nav links — evenly spaced, medium gray */}
                    <div className="hidden md:flex items-center gap-10 flex-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-[15px] font-medium text-[#5a5a5a] hover:text-charcoal transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Center: Logo — condensed uppercase, darker */}
                    <Link
                        href="#home"
                        className="absolute left-1/2 -translate-x-1/2 font-sans text-[22px] font-semibold tracking-tight text-charcoal uppercase"
                    >
                        R.B Beauty
                    </Link>

                    {/* Right: 3 icons — search, cart, user */}
                    <div className="flex items-center justify-end gap-6 flex-1">
                        <button type="button" className="p-2 text-[#5a5a5a] hover:text-charcoal transition-colors" aria-label="Search">
                            <Search className="w-5 h-5" />
                        </button>
                        <button
                            type="button"
                            onClick={toggleCart}
                            className="relative p-2 text-[#5a5a5a] hover:text-charcoal transition-colors"
                            aria-label="Cart"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-charcoal text-white text-[10px] flex items-center justify-center rounded-full font-medium">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        <Link href="#contact" className="p-2 text-[#5a5a5a] hover:text-charcoal transition-colors" aria-label="Profile">
                            <User className="w-5 h-5" />
                        </Link>
                        <button
                            type="button"
                            className="md:hidden p-2 text-[#5a5a5a]"
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
                'fixed inset-0 z-[100] bg-white md:hidden transition-opacity duration-300',
                isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            )}>
                <div className="pt-24 px-8 flex flex-col gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-lg font-medium text-charcoal"
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
