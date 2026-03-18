'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { X, Search, Check, ArrowRight, MessageCircle, Phone, User, ChevronDown, ChevronUp } from 'lucide-react';
import { SERVICES, WHATSAPP_NUMBER } from '../constants/services';
import { useBookingStore } from '../store/useBookingStore';
import { cn } from '../lib/utils';
import { Category } from '../types';

const CATEGORIES: Category[] = [
    'Threading',
    'Waxing',
    'Nufree Waxing',
    'Facial Treatments',
    'Laser Hair Removal',
];

const CATEGORY_EMOJI: Record<string, string> = {
    'Threading': '✂️',
    'Waxing': '✨',
    'Nufree Waxing': '🌿',
    'Facial Treatments': '💆',
    'Laser Hair Removal': '⚡',
};

export default function BookingModal() {
    const { isOpen, preselectedServiceId, closeModal } = useBookingStore();
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<string[]>([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set(CATEGORIES));
    const searchRef = useRef<HTMLInputElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    // Pre-select service when modal opens with a service id
    useEffect(() => {
        if (isOpen && preselectedServiceId) {
            setSelected([preselectedServiceId]);
            // Expand that service's category
            const svc = SERVICES.find(s => s.id === preselectedServiceId);
            if (svc) setExpandedCats(prev => new Set([...prev, svc.category]));
        }
        if (isOpen) {
            setTimeout(() => searchRef.current?.focus(), 200);
        }
        if (!isOpen) {
            setSearch('');
            setSelected([]);
            setName('');
            setPhone('');
            setExpandedCats(new Set(CATEGORIES));
        }
    }, [isOpen, preselectedServiceId]);

    // Lock body scroll when open
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const filteredServices = useMemo(() => {
        if (!search.trim()) return SERVICES;
        const q = search.toLowerCase();
        return SERVICES.filter(s =>
            s.name.toLowerCase().includes(q) ||
            s.category.toLowerCase().includes(q) ||
            s.description.toLowerCase().includes(q)
        );
    }, [search]);

    const toggleService = (id: string) => {
        setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const toggleCategory = (cat: string) => {
        setExpandedCats(prev => {
            const next = new Set(prev);
            if (next.has(cat)) next.delete(cat);
            else next.add(cat);
            return next;
        });
    };

    const selectedServices = SERVICES.filter(s => selected.includes(s.id));

    const buildWhatsAppMessage = () => {
        const greeting = `Hi R.D. Beauty & Laser Clinic! 😊`;
        const nameLine = name ? `\n\nMy name is ${name}.` : '';
        const phoneLine = phone ? `\nBest number to reach me: ${phone}.` : '';
        const services = selectedServices.length > 0
            ? `\n\nI'm interested in booking:\n${selectedServices.map(s => `• ${s.name} — ${s.price}`).join('\n')}`
            : '';
        const close = `\n\nLooking forward to booking with you! 🌸`;
        return encodeURIComponent(`${greeting}${nameLine}${phoneLine}${services}${close}`);
    };

    const handleSendWhatsApp = () => {
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage()}`, '_blank');
        closeModal();
    };

    const handleSkip = () => {
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi R.D. Beauty & Laser Clinic! I\'d like to book an appointment. 😊')}`, '_blank');
        closeModal();
    };

    // Group filtered services by category
    const grouped = useMemo(() => {
        return CATEGORIES.map(cat => ({
            category: cat,
            services: filteredServices.filter(s => s.category === cat),
        })).filter(g => g.services.length > 0);
    }, [filteredServices]);

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-[300] bg-black/40 backdrop-blur-sm"
                onClick={closeModal}
            />

            {/* Panel — slides up from bottom on mobile, centered on desktop */}
            <div
                ref={panelRef}
                className="fixed z-[310] inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center md:p-6 pointer-events-none"
            >
                <div className="pointer-events-auto w-full md:max-w-2xl md:max-h-[90vh] bg-white md:rounded-[2rem] rounded-t-[2rem] shadow-2xl flex flex-col overflow-hidden"
                    style={{ maxHeight: '92svh' }}
                >
                    {/* ── Header ── */}
                    <div className="flex-shrink-0 flex items-center justify-between px-6 pt-6 pb-4 border-b border-black/[0.06]">
                        <div>
                            <h2 className="font-display text-xl text-charcoal leading-tight">Book an Appointment</h2>
                            <p className="text-[10px] font-sans text-charcoal/40 mt-0.5 uppercase tracking-[0.25em]">
                                {selected.length > 0 ? `${selected.length} service${selected.length > 1 ? 's' : ''} selected` : 'Select services below'}
                            </p>
                        </div>
                        <button
                            onClick={closeModal}
                            className="w-9 h-9 rounded-full bg-black/[0.04] hover:bg-black/[0.08] flex items-center justify-center transition-colors"
                        >
                            <X className="w-4 h-4 text-charcoal/60" />
                        </button>
                    </div>

                    {/* ── Search ── */}
                    <div className="flex-shrink-0 px-6 py-3 border-b border-black/[0.04]">
                        <div className="relative">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30 pointer-events-none" />
                            <input
                                ref={searchRef}
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search services…"
                                className="w-full bg-[#f7f7f7] rounded-xl pl-10 pr-4 py-2.5 text-[13px] text-charcoal font-sans placeholder-charcoal/30 outline-none focus:ring-2 focus:ring-charcoal/10 transition-all"
                            />
                            {search && (
                                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/30 hover:text-charcoal">
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* ── Service list (scrollable) ── */}
                    <div className="flex-1 overflow-y-auto px-4 py-3" style={{ scrollbarWidth: 'none' }}>
                        {grouped.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-charcoal/30">
                                <Search className="w-8 h-8 mb-3 opacity-40" />
                                <p className="text-sm font-sans">No services found for "{search}"</p>
                            </div>
                        ) : (
                            grouped.map(({ category, services }) => (
                                <div key={category} className="mb-2">
                                    {/* Category header */}
                                    <button
                                        onClick={() => toggleCategory(category)}
                                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-black/[0.02] transition-colors group"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="text-base">{CATEGORY_EMOJI[category]}</span>
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-charcoal/50">{category}</span>
                                            {services.some(s => selected.includes(s.id)) && (
                                                <span className="w-1.5 h-1.5 rounded-full bg-deep-rose" />
                                            )}
                                        </div>
                                        {expandedCats.has(category)
                                            ? <ChevronUp className="w-3.5 h-3.5 text-charcoal/30" />
                                            : <ChevronDown className="w-3.5 h-3.5 text-charcoal/30" />
                                        }
                                    </button>

                                    {/* Services */}
                                    {expandedCats.has(category) && (
                                        <div className="mt-1 space-y-1 pl-2">
                                            {services.map(svc => {
                                                const isChecked = selected.includes(svc.id);
                                                return (
                                                    <button
                                                        key={svc.id}
                                                        onClick={() => toggleService(svc.id)}
                                                        className={cn(
                                                            'w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-left',
                                                            isChecked
                                                                ? 'bg-charcoal/[0.04] border border-charcoal/10'
                                                                : 'hover:bg-black/[0.02] border border-transparent'
                                                        )}
                                                    >
                                                        {/* Checkbox */}
                                                        <div className={cn(
                                                            'w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 transition-all',
                                                            isChecked
                                                                ? 'bg-charcoal border-charcoal'
                                                                : 'border-charcoal/20 bg-white'
                                                        )}>
                                                            {isChecked && <Check className="w-3 h-3 text-white stroke-[3]" />}
                                                        </div>

                                                        {/* Info */}
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-1.5 flex-wrap">
                                                                <span className={cn('text-[13px] font-semibold leading-tight', isChecked ? 'text-charcoal' : 'text-charcoal/75')}>
                                                                    {svc.name}
                                                                </span>
                                                                {svc.badge && (
                                                                    <span className="text-[8px] font-black uppercase tracking-wider text-deep-rose bg-deep-rose/8 px-1.5 py-0.5 rounded-full">
                                                                        {svc.badge}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <span className="text-[10px] text-charcoal/35 font-sans">{svc.duration}</span>
                                                        </div>

                                                        {/* Price */}
                                                        <span className={cn('text-[14px] font-bold flex-shrink-0', isChecked ? 'text-charcoal' : 'text-charcoal/50')}>
                                                            {svc.price}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>

                    {/* ── Name & Phone (optional) ── */}
                    <div className="flex-shrink-0 border-t border-black/[0.05] px-6 pt-4 pb-2 space-y-2.5">
                        <p className="text-[9px] font-black uppercase tracking-[0.35em] text-charcoal/35">Your details <span className="font-normal normal-case tracking-normal text-charcoal/25">(optional)</span></p>
                        <div className="flex gap-2.5">
                            <div className="relative flex-1">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-charcoal/25 pointer-events-none" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder="Your name"
                                    className="w-full bg-[#f7f7f7] rounded-xl pl-9 pr-3 py-2.5 text-[13px] text-charcoal font-sans placeholder-charcoal/25 outline-none focus:ring-2 focus:ring-charcoal/10 transition-all"
                                />
                            </div>
                            <div className="relative flex-1">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-charcoal/25 pointer-events-none" />
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    placeholder="Phone number"
                                    className="w-full bg-[#f7f7f7] rounded-xl pl-9 pr-3 py-2.5 text-[13px] text-charcoal font-sans placeholder-charcoal/25 outline-none focus:ring-2 focus:ring-charcoal/10 transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ── Actions ── */}
                    <div className="flex-shrink-0 px-6 pb-6 pt-3 space-y-2">
                        <button
                            onClick={handleSendWhatsApp}
                            className="w-full flex items-center justify-between px-5 py-3.5 rounded-[1.25rem] bg-charcoal text-white text-[11px] font-black uppercase tracking-[0.18em] hover:bg-deep-rose transition-all duration-300 shadow-md group"
                        >
                            <MessageCircle className="w-4 h-4 flex-shrink-0" />
                            <span>
                                {selected.length > 0 ? `Send ${selected.length} service${selected.length > 1 ? 's' : ''} via WhatsApp` : 'Send Booking via WhatsApp'}
                            </span>
                            <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                        <button
                            onClick={handleSkip}
                            className="w-full text-center py-2.5 text-[10px] font-bold text-charcoal/40 hover:text-charcoal/70 transition-colors tracking-wide"
                        >
                            Skip — Chat directly with us on WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
