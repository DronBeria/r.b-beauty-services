'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { X, Search, Check, ArrowRight, MessageCircle, Phone, User, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
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

const CATEGORY_CONFIG: Record<string, { emoji: string; color: string; bg: string }> = {
    'Threading': { emoji: '✂️', color: '#A0134D', bg: 'rgba(160,19,77,0.06)' },
    'Waxing': { emoji: '✨', color: '#9A7B4F', bg: 'rgba(154,123,79,0.07)' },
    'Nufree Waxing': { emoji: '🌿', color: '#1a9d82', bg: 'rgba(26,157,130,0.07)' },
    'Facial Treatments': { emoji: '💆', color: '#C2185B', bg: 'rgba(194,24,91,0.06)' },
    'Laser Hair Removal': { emoji: '⚡', color: '#1565C0', bg: 'rgba(21,101,192,0.07)' },
};

export default function BookingModal() {
    const { isOpen, preselectedServiceId, closeModal } = useBookingStore();

    // Step 1 = choose services, Step 2 = enter details
    const [step, setStep] = useState<1 | 2>(1);
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<string[]>([]);
    const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set(CATEGORIES));
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
    const [submitted, setSubmitted] = useState(false);

    const searchRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);

    // On open
    useEffect(() => {
        if (isOpen) {
            setStep(1);
            if (preselectedServiceId) {
                setSelected([preselectedServiceId]);
                const svc = SERVICES.find(s => s.id === preselectedServiceId);
                if (svc) setExpandedCats(new Set([svc.category]));
            } else {
                setExpandedCats(new Set(CATEGORIES));
            }
            setTimeout(() => searchRef.current?.focus(), 250);
        } else {
            // Reset on close
            setSearch('');
            setSelected([]);
            setName('');
            setPhone('');
            setErrors({});
            setSubmitted(false);
            setExpandedCats(new Set(CATEGORIES));
        }
    }, [isOpen, preselectedServiceId]);

    // Focus name when stepping to step 2
    useEffect(() => {
        if (step === 2) setTimeout(() => nameRef.current?.focus(), 150);
    }, [step]);

    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const filteredServices = useMemo(() => {
        if (!search.trim()) return SERVICES;
        const q = search.toLowerCase();
        return SERVICES.filter(s =>
            s.name.toLowerCase().includes(q) ||
            s.category.toLowerCase().includes(q)
        );
    }, [search]);

    const grouped = useMemo(() =>
        CATEGORIES.map(cat => ({
            cat,
            services: filteredServices.filter(s => s.category === cat),
        })).filter(g => g.services.length > 0),
        [filteredServices]
    );

    const toggleService = (id: string) =>
        setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

    const toggleCategory = (cat: string) =>
        setExpandedCats(prev => {
            const next = new Set(prev);
            next.has(cat) ? next.delete(cat) : next.add(cat);
            return next;
        });

    const selectedServices = SERVICES.filter(s => selected.includes(s.id));

    const validate = () => {
        const e: { name?: string; phone?: string } = {};
        if (!name.trim()) e.name = 'Please enter your name';
        if (!phone.trim()) e.phone = 'Please enter your phone number';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSend = () => {
        setSubmitted(true);
        if (!validate()) return;

        const serviceList = selectedServices.length > 0
            ? `\n\nServices I'm interested in:\n${selectedServices.map(s => `• ${s.name} — ${s.price}`).join('\n')}`
            : '';

        const msg = encodeURIComponent(
            `Hi R.D. Beauty & Laser Clinic! 😊\n\nMy name is ${name.trim()}.` +
            `\nBest number to reach me: ${phone.trim()}.` +
            serviceList +
            `\n\nLooking forward to booking with you! 🌸`
        );
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
        closeModal();
    };

    const handleSkip = () => {
        window.open(
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi R.D. Beauty & Laser Clinic! I'd like to book an appointment. 😊")}`,
            '_blank'
        );
        closeModal();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-[300] bg-black/50 backdrop-blur-[2px]" onClick={closeModal} />

            {/* Sheet */}
            <div className="fixed z-[310] inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center md:p-6 pointer-events-none">
                <div
                    className="pointer-events-auto w-full md:max-w-xl bg-white md:rounded-[2.5rem] rounded-t-[2.5rem] shadow-2xl flex flex-col overflow-hidden"
                    style={{ maxHeight: '94svh' }}
                >

                    {/* ─── STEP INDICATOR ─── */}
                    <div className="flex-shrink-0 relative px-6 pt-5 pb-4">
                        {/* Step pills */}
                        <div className="flex items-center gap-2 mb-4">
                            {/* Step 1 pill */}
                            <div className={cn(
                                'flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[9.5px] font-black uppercase tracking-[0.2em] transition-all duration-300',
                                step === 1 ? 'bg-charcoal text-white' : 'bg-[#1a9d82] text-white'
                            )}>
                                {step === 1
                                    ? <span>1 — Choose Services</span>
                                    : <><Check className="w-3 h-3 stroke-[3]" /><span>Services</span></>
                                }
                            </div>
                            {/* Connector */}
                            <div className="flex-1 h-px bg-charcoal/10" />
                            {/* Step 2 pill */}
                            <div className={cn(
                                'flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[9.5px] font-black uppercase tracking-[0.2em] transition-all duration-300',
                                step === 2 ? 'bg-charcoal text-white' : 'bg-black/[0.05] text-charcoal/35'
                            )}>
                                <span>2 — Your Details</span>
                            </div>
                        </div>

                        {/* Header row */}
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                {step === 1 ? (
                                    <>
                                        <h2 className="font-display text-[1.4rem] text-charcoal leading-tight">Select Services</h2>
                                        <p className="text-[11px] text-charcoal/40 font-sans mt-0.5">
                                            {selected.length === 0 ? 'Pick one or more treatments to book' : `${selected.length} treatment${selected.length > 1 ? 's' : ''} selected`}
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <h2 className="font-display text-[1.4rem] text-charcoal leading-tight">Almost There</h2>
                                        <p className="text-[11px] text-charcoal/40 font-sans mt-0.5">Enter your details to confirm via WhatsApp</p>
                                    </>
                                )}
                            </div>
                            <button
                                onClick={closeModal}
                                className="w-9 h-9 rounded-full bg-black/[0.05] hover:bg-black/[0.09] flex items-center justify-center transition-colors flex-shrink-0 mt-0.5"
                            >
                                <X className="w-4 h-4 text-charcoal/60" />
                            </button>
                        </div>
                    </div>

                    {/* ═══════════════════════════════════════ */}
                    {/*  STEP 1 — SERVICE SELECTION             */}
                    {/* ═══════════════════════════════════════ */}
                    {step === 1 && (
                        <>
                            {/* Search */}
                            <div className="flex-shrink-0 px-6 pb-3">
                                <div className="relative">
                                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30 pointer-events-none" />
                                    <input
                                        ref={searchRef}
                                        type="text"
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                        placeholder="Search treatments…"
                                        className="w-full bg-[#f5f5f5] border border-transparent rounded-[0.875rem] pl-10 pr-9 py-2.5 text-[13px] text-charcoal font-sans placeholder-charcoal/30 outline-none focus:border-charcoal/15 transition-all"
                                    />
                                    {search && (
                                        <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/30 hover:text-charcoal/60">
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Service list */}
                            <div className="flex-1 overflow-y-auto px-4 pb-3" style={{ scrollbarWidth: 'none' }}>
                                {grouped.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-12 text-charcoal/30">
                                        <Search className="w-8 h-8 mb-3 opacity-30" />
                                        <p className="text-sm font-sans">No results for &quot;{search}&quot;</p>
                                    </div>
                                ) : (
                                    grouped.map(({ cat, services }) => {
                                        const cfg = CATEGORY_CONFIG[cat];
                                        const catSelected = services.filter(s => selected.includes(s.id)).length;
                                        return (
                                            <div key={cat} className="mb-1.5">
                                                {/* Category header */}
                                                <button
                                                    onClick={() => toggleCategory(cat)}
                                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-black/[0.02] transition-colors"
                                                >
                                                    <div
                                                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-base"
                                                        style={{ background: cfg.bg }}
                                                    >
                                                        {cfg.emoji}
                                                    </div>
                                                    <span className="flex-1 text-left text-[10.5px] font-black uppercase tracking-[0.25em] text-charcoal/55">{cat}</span>
                                                    {catSelected > 0 && (
                                                        <span
                                                            className="text-[9px] font-black px-2 py-0.5 rounded-full text-white"
                                                            style={{ background: cfg.color }}
                                                        >
                                                            {catSelected}
                                                        </span>
                                                    )}
                                                    {expandedCats.has(cat)
                                                        ? <ChevronUp className="w-3.5 h-3.5 text-charcoal/25 flex-shrink-0" />
                                                        : <ChevronDown className="w-3.5 h-3.5 text-charcoal/25 flex-shrink-0" />
                                                    }
                                                </button>

                                                {/* Services */}
                                                {expandedCats.has(cat) && (
                                                    <div className="mt-0.5 pl-3 space-y-0.5">
                                                        {services.map(svc => {
                                                            const isChecked = selected.includes(svc.id);
                                                            return (
                                                                <button
                                                                    key={svc.id}
                                                                    onClick={() => toggleService(svc.id)}
                                                                    className={cn(
                                                                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-left border',
                                                                        isChecked
                                                                            ? 'border-charcoal/12 bg-charcoal/[0.03]'
                                                                            : 'border-transparent hover:bg-black/[0.02]'
                                                                    )}
                                                                >
                                                                    {/* Checkbox */}
                                                                    <div className={cn(
                                                                        'w-[18px] h-[18px] rounded-md border-[1.5px] flex items-center justify-center flex-shrink-0 transition-all duration-200',
                                                                        isChecked ? 'border-charcoal bg-charcoal' : 'border-charcoal/20'
                                                                    )}>
                                                                        {isChecked && <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />}
                                                                    </div>

                                                                    {/* Name + badge */}
                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="flex items-center gap-1.5 flex-wrap">
                                                                            <span className={cn('text-[13px] font-medium leading-tight', isChecked ? 'text-charcoal' : 'text-charcoal/70')}>
                                                                                {svc.name}
                                                                            </span>
                                                                            {svc.badge && (
                                                                                <span className="text-[8px] font-black uppercase px-1.5 py-0.5 rounded-full"
                                                                                    style={{ color: cfg.color, background: cfg.bg }}>
                                                                                    {svc.badge}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                        <span className="text-[10px] text-charcoal/30 font-sans">{svc.duration}</span>
                                                                    </div>

                                                                    {/* Price */}
                                                                    <span className="text-[13px] font-bold flex-shrink-0" style={{ color: isChecked ? cfg.color : undefined }}>
                                                                        {svc.price}
                                                                    </span>
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                )}

                                                {/* Separator */}
                                                <div className="h-px bg-black/[0.04] mx-3 mt-1.5" />
                                            </div>
                                        );
                                    })
                                )}
                            </div>

                            {/* Step 1 Footer */}
                            <div className="flex-shrink-0 border-t border-black/[0.05] px-6 py-4 space-y-2.5">
                                {/* Selected summary */}
                                {selectedServices.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mb-1">
                                        {selectedServices.map(s => (
                                            <span key={s.id} className="inline-flex items-center gap-1 text-[10px] font-semibold bg-[#f3f3f3] text-charcoal/70 px-2.5 py-1 rounded-full">
                                                {s.name}
                                                <button onClick={() => toggleService(s.id)} className="ml-0.5 text-charcoal/40 hover:text-charcoal/70">
                                                    <X className="w-2.5 h-2.5" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <button
                                    onClick={() => setStep(2)}
                                    className="w-full flex items-center justify-between px-5 py-3.5 rounded-[1.25rem] bg-charcoal text-white text-[11px] font-black uppercase tracking-[0.18em] hover:bg-deep-rose transition-all duration-300 shadow-md group"
                                >
                                    <span className="flex-1 text-center">
                                        {selectedServices.length > 0 ? `Continue with ${selectedServices.length} service${selectedServices.length > 1 ? 's' : ''}` : 'Continue'}
                                    </span>
                                    <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                                </button>
                                <button onClick={handleSkip} className="w-full text-center py-1.5 text-[10px] text-charcoal/35 hover:text-charcoal/60 transition-colors">
                                    Skip — Chat directly on WhatsApp
                                </button>
                            </div>
                        </>
                    )}

                    {/* ═══════════════════════════════════════ */}
                    {/*  STEP 2 — YOUR DETAILS                  */}
                    {/* ═══════════════════════════════════════ */}
                    {step === 2 && (
                        <>
                            {/* Selected services summary */}
                            <div className="flex-shrink-0 mx-6 mb-4 p-4 bg-[#f7f7f7] rounded-[1.25rem] border border-black/[0.05]">
                                {selectedServices.length > 0 ? (
                                    <>
                                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-charcoal/40 mb-2.5">Your selected treatments</p>
                                        <div className="space-y-1.5">
                                            {selectedServices.map(s => {
                                                const cfg = CATEGORY_CONFIG[s.category];
                                                return (
                                                    <div key={s.id} className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm">{cfg?.emoji}</span>
                                                            <span className="text-[12.5px] font-medium text-charcoal/75">{s.name}</span>
                                                        </div>
                                                        <span className="text-[12.5px] font-bold text-charcoal/60">{s.price}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <button
                                            onClick={() => setStep(1)}
                                            className="mt-3 text-[9.5px] font-black uppercase tracking-wider text-deep-rose hover:underline"
                                        >
                                            ← Edit selection
                                        </button>
                                    </>
                                ) : (
                                    <div className="flex items-center justify-between">
                                        <p className="text-[12px] text-charcoal/45 font-sans italic">No treatments selected — we'll discuss in chat</p>
                                        <button onClick={() => setStep(1)} className="text-[9.5px] font-black uppercase tracking-wider text-deep-rose hover:underline">Edit</button>
                                    </div>
                                )}
                            </div>

                            {/* Divider */}
                            <div className="flex-shrink-0 flex items-center gap-3 px-6 mb-4">
                                <div className="flex-1 h-px bg-black/[0.05]" />
                                <span className="text-[9px] font-black uppercase tracking-[0.35em] text-charcoal/30">Your Details</span>
                                <div className="flex-1 h-px bg-black/[0.05]" />
                            </div>

                            {/* Fields */}
                            <div className="flex-1 overflow-y-auto px-6 pb-3 space-y-3" style={{ scrollbarWidth: 'none' }}>
                                {/* Name */}
                                <div>
                                    <label className="block text-[9px] font-black uppercase tracking-[0.3em] text-charcoal/40 mb-1.5">
                                        Full Name <span className="text-deep-rose">*</span>
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/25 pointer-events-none" />
                                        <input
                                            ref={nameRef}
                                            type="text"
                                            value={name}
                                            onChange={e => { setName(e.target.value); if (submitted) setErrors(p => ({ ...p, name: undefined })); }}
                                            placeholder="e.g. Sarah Johnson"
                                            className={cn(
                                                'w-full bg-[#f5f5f5] rounded-[0.875rem] pl-10 pr-4 py-3 text-[13.5px] text-charcoal font-sans placeholder-charcoal/25 outline-none border transition-all',
                                                errors.name ? 'border-red-400 focus:border-red-400' : 'border-transparent focus:border-charcoal/15'
                                            )}
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="flex items-center gap-1.5 mt-1.5 text-[10.5px] text-red-500 font-semibold">
                                            <AlertCircle className="w-3 h-3" />{errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-[9px] font-black uppercase tracking-[0.3em] text-charcoal/40 mb-1.5">
                                        Phone Number <span className="text-deep-rose">*</span>
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/25 pointer-events-none" />
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={e => { setPhone(e.target.value); if (submitted) setErrors(p => ({ ...p, phone: undefined })); }}
                                            placeholder="e.g. +1 780 000 0000"
                                            className={cn(
                                                'w-full bg-[#f5f5f5] rounded-[0.875rem] pl-10 pr-4 py-3 text-[13.5px] text-charcoal font-sans placeholder-charcoal/25 outline-none border transition-all',
                                                errors.phone ? 'border-red-400 focus:border-red-400' : 'border-transparent focus:border-charcoal/15'
                                            )}
                                        />
                                    </div>
                                    {errors.phone && (
                                        <p className="flex items-center gap-1.5 mt-1.5 text-[10.5px] text-red-500 font-semibold">
                                            <AlertCircle className="w-3 h-3" />{errors.phone}
                                        </p>
                                    )}
                                </div>

                                {/* Note */}
                                <p className="text-[10px] text-charcoal/30 font-sans leading-relaxed pt-1">
                                    This opens WhatsApp with your details pre-filled. We'll confirm your appointment personally.
                                </p>
                            </div>

                            {/* Step 2 Footer */}
                            <div className="flex-shrink-0 border-t border-black/[0.05] px-6 py-4 space-y-2.5">
                                <button
                                    onClick={handleSend}
                                    className="w-full flex items-center justify-between px-5 py-3.5 rounded-[1.25rem] bg-charcoal text-white text-[11px] font-black uppercase tracking-[0.18em] hover:bg-deep-rose transition-all duration-300 shadow-md group"
                                >
                                    <MessageCircle className="w-4 h-4 flex-shrink-0" />
                                    <span className="flex-1 text-center">Send Booking via WhatsApp</span>
                                    <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                                </button>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => { setStep(1); setErrors({}); setSubmitted(false); }}
                                        className="flex-1 text-center py-1.5 text-[10px] text-charcoal/40 hover:text-charcoal/65 transition-colors"
                                    >
                                        ← Back
                                    </button>
                                    <div className="w-px h-3 bg-charcoal/10" />
                                    <button onClick={handleSkip} className="flex-1 text-center py-1.5 text-[10px] text-charcoal/40 hover:text-charcoal/65 transition-colors">
                                        Skip — Chat directly
                                    </button>
                                </div>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </>
    );
}
