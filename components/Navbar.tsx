'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ArrowRight, CalendarCheck, Zap, Sparkles, ShieldCheck, Package2, ChevronDown } from 'lucide-react';
import { useServiceFilter } from '../store/useServiceFilter';
import { cn } from '../lib/utils';

const SQUARE_BOOKING_URL = 'https://app.squareup.com/appointments/book/mfaodungeatf80/L15XQCCP0YC3D/start';
import gsap from 'gsap';

import { Category } from '../types';

const SERVICE_COLS: { title: string; icon: React.ElementType; color: string; items: { name: string; price: string; category: Category; badge?: string }[] }[] = [
    {
        title: 'Threading',
        icon: Sparkles,
        color: 'text-rose-500',
        items: [
            { name: 'Eyebrow Threading', price: '$4', category: 'Threading', badge: 'Popular' },
            { name: 'Upper Lip', price: '$3', category: 'Threading' },
            { name: 'Chin', price: '$3', category: 'Threading' },
            { name: 'Forehead', price: '$3', category: 'Threading' },
            { name: 'Full Face', price: '$20', category: 'Threading', badge: 'Best Value' },
        ],
    },
    {
        title: 'Waxing',
        icon: ShieldCheck,
        color: 'text-emerald-500',
        items: [
            { name: 'Eyebrow Wax', price: '$8', category: 'Waxing' },
            { name: 'Underarms Wax', price: '$7', category: 'Waxing' },
            { name: 'Full Legs Wax', price: '$30', category: 'Waxing', badge: 'Popular' },
            { name: 'Full Arms Wax', price: '$20', category: 'Waxing' },
            { name: 'Full Body Wax', price: '$135', category: 'Waxing', badge: 'Best Value' },
        ],
    },
    {
        title: 'Nufree Waxing',
        icon: Sparkles,
        color: 'text-teal-500',
        items: [
            { name: 'Upper Lip Nufree', price: '$6', category: 'Nufree Waxing' },
            { name: 'Full Face Nufree', price: '$28', category: 'Nufree Waxing', badge: 'Organic' },
            { name: 'Brazilian Nufree', price: '$50', category: 'Nufree Waxing', badge: 'Popular' },
            { name: 'Full Legs Nufree', price: '$60', category: 'Nufree Waxing' },
            { name: 'Full Body Nufree', price: '$299', category: 'Nufree Waxing', badge: 'Premium' },
        ],
    },
    {
        title: 'Facial Treatments',
        icon: Zap,
        color: 'text-sky-500',
        items: [
            { name: 'HydraFacial', price: '$120', category: 'Facial Treatments', badge: 'Signature' },
            { name: 'Microneedling', price: '$175 / 3 for $400', category: 'Facial Treatments', badge: 'Anti-Aging' },
            { name: 'Radiance Brightening', price: '$130', category: 'Facial Treatments' },
            { name: 'Dermaplaning', price: '$75', category: 'Facial Treatments' },
            { name: "Classic Fernanda's", price: '$60', category: 'Facial Treatments' },
        ],
    },
    {
        title: 'Laser Hair Removal',
        icon: Package2,
        color: 'text-amber-500',
        items: [
            { name: 'Upper Lip', price: '$35', category: 'Laser Hair Removal' },
            { name: 'Full Face', price: '$120', category: 'Laser Hair Removal', badge: 'Popular' },
            { name: 'Underarms', price: '$35', category: 'Laser Hair Removal' },
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
    { name: 'Services', href: '/services', menu: 'services' },
    { name: 'Pricing', href: '/services#pricing', menu: 'pricing' },
    { name: 'Contact', href: '#contact', menu: '' },
];

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
    const [openServiceCats, setOpenServiceCats] = useState<Set<string>>(new Set());
    const [scrolled, setScrolled] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const { setActiveCategory } = useServiceFilter();
    const navRef = useRef<HTMLElement>(null);
    const router = useRouter();

    const goToCategory = (cat: Category) => {
        setActiveCategory(cat);
        setActiveMenu(null);
        setMobileOpen(false);
        setMobileServicesOpen(false);
        // Navigate to services page; if already there, scroll to section
        if (typeof window !== 'undefined' && window.location.pathname === '/services') {
            setTimeout(() => {
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
            }, 50);
        } else {
            router.push('/services');
        }
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

    const closeMobileMenu = () => {
        setMobileOpen(false);
        setMobileServicesOpen(false);
    };

    return (
        <>
            <nav
                ref={navRef}
                className={cn(
                    'fixed top-0 left-0 w-full z-[150] transition-all duration-500 backdrop-blur-xl border-b border-black/[0.06]',
                    scrolled ? 'h-[66px] shadow-sm' : 'h-[80px]'
                )}
                style={{ background: scrolled ? 'rgba(253,236,216,0.97)' : 'rgba(253,236,216,0.88)' }}
                onMouseLeave={scheduleClose}
            >
                <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-full">

                    {/* Logo */}
                    <Link href="/" className="flex items-center shrink-0 group" onClick={closeMobileMenu}>
                        <Image
                            src="/logo.png"
                            alt="R.D. Beauty & Laser Clinic"
                            width={220}
                            height={220}
                            priority
                            className="w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                            style={{
                                height: scrolled ? '52px' : '62px',
                                mixBlendMode: 'multiply',
                                transition: 'height 0.3s ease, transform 0.3s ease',
                            }}
                        />
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
                        <a
                            href={SQUARE_BOOKING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:inline-flex items-center gap-2 text-white px-5 py-2.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 active:scale-95 hover:opacity-90"
                            style={{
                                background: 'linear-gradient(135deg, #A8883C, #C4A050)',
                                boxShadow: '0 6px 20px rgba(168,136,60,0.35)',
                            }}
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

                            <div className="p-8 grid grid-cols-5 gap-6">
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
                                    Threading · Waxing · Nufree · Facials · Laser · Beaumont, Alberta
                                </span>
                                <Link
                                    href="/services"
                                    onClick={() => setActiveMenu(null)}
                                    className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-warm-gold hover:text-charcoal transition-colors"
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
                                <div className="mt-2 space-y-1 pb-2">
                                    {SERVICE_COLS.map((col) => {
                                        const isOpen = openServiceCats.has(col.title);
                                        const toggle = () => setOpenServiceCats((prev) => {
                                            const next = new Set(prev);
                                            isOpen ? next.delete(col.title) : next.add(col.title);
                                            return next;
                                        });
                                        return (
                                            <div key={col.title} className="rounded-2xl overflow-hidden border border-black/[0.05]">
                                                {/* Category header — tappable */}
                                                <button
                                                    onClick={toggle}
                                                    className="w-full flex items-center justify-between px-4 py-3.5 bg-ivory/60 hover:bg-ivory transition-colors duration-200"
                                                >
                                                    <div className="flex items-center gap-2.5">
                                                        <col.icon className={cn('w-4 h-4 flex-shrink-0', col.color)} />
                                                        <span className="text-[15px] font-black tracking-tight text-charcoal">{col.title}</span>
                                                    </div>
                                                    <ChevronDown className={cn('w-4 h-4 text-charcoal/30 transition-transform duration-300 flex-shrink-0', isOpen && 'rotate-180')} />
                                                </button>

                                                {/* Items */}
                                                {isOpen && (
                                                    <div className="bg-white divide-y divide-black/[0.04]">
                                                        {col.items.map((item) => (
                                                            <button
                                                                key={item.name}
                                                                onClick={() => goToCategory(item.category)}
                                                                className="w-full flex items-center justify-between px-5 py-3 hover:bg-ivory/70 group transition-colors duration-150 text-left"
                                                            >
                                                                <div className="flex items-center gap-2 min-w-0">
                                                                    <span className="text-[13px] font-semibold text-charcoal/75 group-hover:text-charcoal truncate">{item.name}</span>
                                                                    {item.badge && (
                                                                        <span className="flex-shrink-0 text-[7px] font-black uppercase tracking-wider text-deep-rose bg-deep-rose/8 border border-deep-rose/15 px-1.5 py-0.5 rounded-full">{item.badge}</span>
                                                                    )}
                                                                </div>
                                                                <span className="flex-shrink-0 text-[12px] font-black text-charcoal/40 group-hover:text-deep-rose ml-3 transition-colors">{item.price}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
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
                        <a
                            href={SQUARE_BOOKING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={closeMobileMenu}
                            className="w-full flex items-center justify-center gap-2 text-white py-3.5 rounded-2xl text-[10px] font-semibold uppercase tracking-widest hover:opacity-90 transition-all"
                            style={{
                                background: 'linear-gradient(135deg, #A8883C, #C4A050)',
                                boxShadow: '0 8px 24px rgba(168,136,60,0.35)',
                            }}
                        >
                            <CalendarCheck className="w-3.5 h-3.5" />
                            <span>Book Now</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
