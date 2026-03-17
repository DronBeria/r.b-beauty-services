'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag, ArrowRight, CalendarCheck, Zap, Sparkles, ShieldCheck, Package2, ChevronDown } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useServiceFilter } from '../store/useServiceFilter';
import { cn } from '../lib/utils';
import gsap from 'gsap';
import { WHATSAPP_NUMBER } from '../constants/services';
import { Category } from '../types';

const SERVICE_COLS: { title: string; icon: React.ElementType; color: string; items: { name: string; price: string; category: Category; badge?: string }[] }[] = [
    {
        title: 'Threading',
        icon: Sparkles,
        color: 'text-rose-500',
        items: [
            { name: 'Eyebrow Threading', price: '$12', category: 'Threading', badge: 'Popular' },
            { name: 'Upper Lip', price: '$8', category: 'Threading' },
            { name: 'Chin', price: '$8', category: 'Threading' },
            { name: 'Forehead', price: '$10', category: 'Threading' },
            { name: 'Full Face', price: '$35', category: 'Threading' },
        ],
    },
    {
        title: 'Waxing & Nufree',
        icon: ShieldCheck,
        color: 'text-emerald-500',
        items: [
            { name: 'Eyebrow Wax', price: '$15', category: 'Waxing' },
            { name: 'Brazilian Wax', price: '$55', category: 'Waxing', badge: 'Popular' },
            { name: 'Full Leg', price: '$55', category: 'Waxing' },
            { name: 'Nufree – Full Face', price: '$48', category: 'Nufree Waxing', badge: 'Organic' },
            { name: 'Nufree – Brazilian', price: '$65', category: 'Nufree Waxing' },
        ],
    },
    {
        title: 'Facial Treatments',
        icon: Zap,
        color: 'text-sky-500',
        items: [
            { name: 'HydraFacial', price: '$150', category: 'Facial Treatments', badge: 'Signature' },
            { name: 'Microneedling', price: '$175', category: 'Facial Treatments', badge: 'Anti-Ageing' },
            { name: 'Dermaplaning', price: '$85', category: 'Facial Treatments' },
            { name: 'Microdermabrasion', price: '$95', category: 'Facial Treatments' },
            { name: 'Classic Facial', price: '$75', category: 'Facial Treatments' },
        ],
    },
    {
        title: 'Laser Hair Removal',
        icon: Package2,
        color: 'text-amber-500',
        items: [
            { name: 'Upper Lip', price: '$35', category: 'Laser Hair Removal' },
            { name: 'Full Face', price: '$120', category: 'Laser Hair Removal', badge: 'Popular' },
            { name: 'Underarm', price: '$45', category: 'Laser Hair Removal' },
            { name: 'Brazilian', price: '$129', category: 'Laser Hair Removal', badge: 'Bestseller' },
            { name: 'Full Body', price: '$599', category: 'Laser Hair Removal' },
        ],
    },
];

const PRICING_LINKS: { name: string; category: Category }[] = [
    { name: 'Threading', category: 'Threading' },
    { name: 'Waxing', category: 'Waxing' },
    { name: 'Nufree Waxing', category: 'Nufree Waxing' },
    { name: 'Facial Treatments', category: 'Facial Treatments' },
    { name: 'Laser Hair Removal', category: 'Laser Hair Removal' },
];

const navLinks = [
    { name: 'Services', href: '#services', menu: 'services' },
    { name: 'Pricing', href: '#pricing', menu: 'pricing' },
    { name: 'Gallery', href: '#gallery', menu: '' },
    { name: 'Our Story', href: '#story', menu: '' },
    { name: 'Contact', href: '#contact', menu: '' },
];

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const { getTotalItems } = useCartStore();
    const { setActiveCategory } = useServiceFilter();
    const cartCount = getTotalItems();
    const navRef = useRef<HTMLElement>(null);

    const goToCategory = (cat: Category) => {
        setActiveCategory(cat);
        setActiveMenu(null);
        setMobileOpen(false);
        setMobileServicesOpen(false);
        // small delay so state propagates before scroll
        setTimeout(() => {
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
    };

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

    const openMenu = (name: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setActiveMenu(name);
    };

    const scheduleClose = () => {
        timeoutRef.current = setTimeout(() => setActiveMenu(null), 180);
    };

    const cancelClose = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    const toggleCart = () => {
        const panel = document.getElementById('cart-panel');
        if (panel) panel.classList.toggle('translate-x-full');
    };

    const closeMobileMenu = () => {
        setMobileOpen(false);
        setMobileServicesOpen(false);
    };

    return (
        <>
            <nav
                ref={navRef}
                className={cn(
                    'fixed top-0 left-0 w-full z-[150] transition-all duration-500',
                    scrolled
                        ? 'h-[66px] bg-white/95 backdrop-blur-xl shadow-sm border-b border-black/[0.06]'
                        : 'h-[80px] bg-transparent border-b border-transparent'
                )}
                onMouseLeave={scheduleClose}
            >
                <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-full">

                    {/* Logo */}
                    <Link href="#home" className="flex flex-col leading-none group shrink-0" onClick={closeMobileMenu}>
                        <span className="font-display text-lg md:text-xl font-bold tracking-[0.18em] text-charcoal uppercase group-hover:text-deep-rose transition-colors duration-300">
                            R.D. BEAUTY
                        </span>
                        <span className="text-[7px] font-black uppercase tracking-[0.5em] text-charcoal/30 font-sans">
                            & Laser Clinic
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-0.5">
                        {navLinks.map((link) => (
                            <div
                                key={link.name}
                                className="relative"
                                onMouseEnter={() => link.menu ? openMenu(link.menu) : undefined}
                                onMouseLeave={() => link.menu ? scheduleClose() : undefined}
                            >
                                <Link
                                    href={link.href}
                                    className={cn(
                                        'relative flex items-center gap-1 px-4 py-2.5 text-[10.5px] font-black uppercase tracking-[0.15em] transition-colors duration-300 rounded-full hover:bg-charcoal/[0.04]',
                                        activeMenu === link.menu && link.menu
                                            ? 'text-charcoal'
                                            : 'text-charcoal/55 hover:text-charcoal'
                                    )}
                                >
                                    {link.name}
                                    {link.menu && (
                                        <ChevronDown className={cn(
                                            'w-3 h-3 transition-transform duration-300',
                                            activeMenu === link.menu ? 'rotate-180 text-deep-rose' : ''
                                        )} />
                                    )}
                                </Link>

                                {/* Pricing dropdown — positioned under its nav item */}
                                {link.menu === 'pricing' && (
                                    <div
                                        className={cn(
                                            'absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-250 z-50',
                                            activeMenu === 'pricing'
                                                ? 'opacity-100 translate-y-0 pointer-events-auto'
                                                : 'opacity-0 -translate-y-1 pointer-events-none'
                                        )}
                                        onMouseEnter={cancelClose}
                                        onMouseLeave={scheduleClose}
                                    >
                                        <div className="w-52 bg-white rounded-2xl shadow-[0_16px_60px_rgba(0,0,0,0.18)] border border-black/[0.07] overflow-hidden p-1.5">
                                            <div className="h-px w-full bg-gradient-to-r from-transparent via-deep-rose/20 to-transparent mb-1.5" />
                                            {PRICING_LINKS.map((item) => (
                                                <button
                                                    key={item.name}
                                                    onClick={() => goToCategory(item.category)}
                                                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-ivory group transition-all duration-200 text-left"
                                                >
                                                    <span className="text-[11.5px] font-bold text-charcoal/65 group-hover:text-charcoal transition-colors">{item.name}</span>
                                                    <ArrowRight className="w-3 h-3 text-charcoal/20 group-hover:text-deep-rose group-hover:translate-x-0.5 transition-all" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
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
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20R.D.%20Beauty%20%26%20Laser%20Clinic!%20I'd%20like%20to%20book%20a%20consultation.`}
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
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Menu"
                        >
                            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Services Mega Menu */}
                <div
                    className={cn(
                        'absolute left-1/2 -translate-x-1/2 top-[90%] w-[95%] max-w-[1280px] transition-all duration-400 z-[160]',
                        activeMenu === 'services'
                            ? 'opacity-100 translate-y-3 pointer-events-auto'
                            : 'opacity-0 translate-y-0 pointer-events-none'
                    )}
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                >
                    <div className="max-w-[1400px] mx-auto px-4 pb-3">
                        <div className="bg-white rounded-[2.5rem] shadow-[0_24px_80px_rgba(0,0,0,0.18)] border border-black/[0.07] overflow-hidden">
                            <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-deep-rose/40 to-transparent" />

                            <div className="p-8 grid grid-cols-4 gap-8">
                                {SERVICE_COLS.map((col) => (
                                    <div key={col.title}>
                                        <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-black/[0.05]">
                                            <col.icon className={cn('w-3.5 h-3.5 flex-shrink-0', col.color)} />
                                            <span className="text-[9px] font-black uppercase tracking-[0.35em] text-charcoal/40">{col.title}</span>
                                        </div>
                                        <div className="space-y-0.5">
                                            {col.items.map((item) => (
                                                <button
                                                    key={item.name}
                                                    onClick={() => goToCategory(item.category)}
                                                    className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl hover:bg-ivory group transition-all duration-200 text-left"
                                                >
                                                    <div className="flex items-center gap-1.5 min-w-0">
                                                        <span className="text-[12px] font-semibold text-charcoal/65 group-hover:text-charcoal transition-colors truncate leading-tight">{item.name}</span>
                                                        {item.badge && (
                                                            <span className="flex-shrink-0 text-[7px] font-black uppercase tracking-wider text-deep-rose bg-deep-rose/8 border border-deep-rose/15 px-1.5 py-0.5 rounded-full">
                                                                {item.badge}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className="flex-shrink-0 text-[11px] font-black text-charcoal/35 group-hover:text-deep-rose transition-colors ml-2">{item.price}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="px-6 py-3 bg-[#fafafa] border-t border-black/[0.04] flex items-center justify-between">
                                <span className="text-[9px] text-charcoal/30 font-sans font-semibold uppercase tracking-widest">
                                    Threading · Waxing · Facials · Laser · Edmonton
                                </span>
                                <Link
                                    href="#services"
                                    onClick={() => setActiveMenu(null)}
                                    className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-deep-rose hover:text-charcoal transition-colors"
                                >
                                    View All Services <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile overlay */}
            <div className={cn(
                'fixed inset-0 z-[140] md:hidden transition-opacity duration-400',
                mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            )}>
                <div className="absolute inset-0 bg-charcoal/30 backdrop-blur-[2px]" onClick={closeMobileMenu} />

                <div className={cn(
                    'absolute top-0 right-0 w-[78vw] max-w-[320px] h-full bg-white flex flex-col shadow-2xl transition-transform duration-500',
                    mobileOpen ? 'translate-x-0' : 'translate-x-full'
                )}>
                    <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-black/5">
                        <div>
                            <span className="font-display text-lg font-bold tracking-[0.15em] text-charcoal uppercase">Menu</span>
                            <p className="text-[8px] font-black uppercase tracking-[0.4em] text-charcoal/30 font-sans">R.D. Beauty & Laser Clinic</p>
                        </div>
                        <button
                            onClick={closeMobileMenu}
                            className="w-9 h-9 rounded-full border border-charcoal/10 flex items-center justify-center hover:bg-charcoal hover:text-white transition-all duration-300 hover:rotate-90"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex flex-col px-5 py-5 gap-1 flex-grow overflow-y-auto">
                        {/* Services — expandable */}
                        <div>
                            <button
                                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                                className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-charcoal/65 hover:text-charcoal hover:bg-ivory transition-all duration-300"
                            >
                                <span className="text-sm font-black uppercase tracking-[0.18em]">Services</span>
                                <ChevronDown className={cn('w-4 h-4 transition-transform duration-300 text-charcoal/40', mobileServicesOpen && 'rotate-180')} />
                            </button>

                            {mobileServicesOpen && (
                                <div className="mt-1 ml-2 space-y-3 pl-3 border-l-2 border-charcoal/5 pb-2">
                                    {SERVICE_COLS.map((col) => (
                                        <div key={col.title}>
                                            <div className="flex items-center gap-2 px-2 py-1.5">
                                                <col.icon className={cn('w-3 h-3', col.color)} />
                                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-charcoal/35">{col.title}</span>
                                            </div>
                                            {col.items.map((item) => (
                                                <button
                                                    key={item.name}
                                                    onClick={() => goToCategory(item.category)}
                                                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-ivory group transition-all duration-200 text-left"
                                                >
                                                    <span className="text-[12px] font-semibold text-charcoal/60 group-hover:text-charcoal">{item.name}</span>
                                                    <span className="text-[10px] font-black text-charcoal/30">{item.price}</span>
                                                </button>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Other links */}
                        {navLinks.slice(1).map((link, i) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={closeMobileMenu}
                                className="flex items-center justify-between px-4 py-3.5 rounded-2xl text-charcoal/65 hover:text-charcoal hover:bg-ivory transition-all duration-300 group"
                                style={{ animationDelay: `${i * 50}ms` }}
                            >
                                <span className="text-sm font-black uppercase tracking-[0.18em]">{link.name}</span>
                                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300 text-deep-rose" />
                            </Link>
                        ))}
                    </div>

                    <div className="px-5 pb-8 space-y-2.5 border-t border-black/5 pt-5">
                        <button
                            onClick={() => { toggleCart(); closeMobileMenu(); }}
                            className="w-full flex items-center justify-center gap-2 border border-charcoal/15 text-charcoal py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-charcoal hover:text-white transition-all duration-300"
                        >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>My Booking {cartCount > 0 && `(${cartCount})`}</span>
                        </button>
                        <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20R.D.%20Beauty%20%26%20Laser%20Clinic!%20I'd%20like%20to%20book%20a%20consultation.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={closeMobileMenu}
                            className="w-full flex items-center justify-center gap-2 bg-deep-rose text-white py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-md"
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
