'use client';

import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ServicesSection from '../components/ServicesSection';
import OurStory from '../components/OurStory';
import LaserEducation from '../components/LaserEducation';
import Gallery from '../components/Gallery';
import PricingSection from '../components/PricingSection';
import Footer from '../components/Footer';
import CartPanel from '../components/CartPanel';
import Preloader from '../components/Preloader';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../lib/utils';
import { MessageCircle, Star, ChevronUp, CheckCircle2, Award, ShieldCheck, Zap, Quote } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants/services';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Trust Section Stagger
            gsap.fromTo('.trust-reveal',
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    stagger: 0.12,
                    duration: 1.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.trust-section',
                        start: 'top 90%',
                    }
                }
            );

            // Testimonial Stagger
            gsap.fromTo('.testimonial-reveal',
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    stagger: 0.15,
                    duration: 1.4,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.testimonials-grid',
                        start: 'top 85%',
                    }
                }
            );

            // Floating CTA
            gsap.fromTo('.floating-cta',
                { y: 20, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    duration: 1,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: 'body',
                        start: 'top -15%',
                        toggleActions: 'play none none reverse',
                    }
                }
            );
        });

        return () => ctx.revert();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <main className="relative min-h-screen bg-ivory selection:bg-deep-rose selection:text-white overflow-hidden">
            <Preloader />
            <Navbar />
            <CartPanel />

            <Hero />

            {/* Trust / Stats Strip */}
            <section className="trust-section relative -mt-24 md:-mt-32 z-30 pb-24 md:pb-32">
                <div className="container-custom">
                    <div className="bg-white/85 backdrop-blur-3xl px-10 md:px-16 py-12 md:py-14 rounded-[3rem] shadow-[0_30px_80px_rgba(0,0,0,0.05)] border border-white/50 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-deep-rose/20 to-transparent" />

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 items-center">
                            {[
                                { icon: Award, value: '10+', label: 'Years Excellence', sub: 'Clinical experience in Toronto & Lahore', color: 'text-amber-600' },
                                { icon: Zap, value: 'FDA', label: 'Approved Tech', sub: 'Latest diode laser & medical-grade devices', color: 'text-blue-600' },
                                { icon: ShieldCheck, value: '100%', label: 'Sanitized Clinic', sub: 'Strict hospital-grade hygiene protocols', color: 'text-emerald-600' },
                                { icon: Star, value: '5.0', label: 'Client Rating', sub: 'Based on 300+ verified clinic reviews', color: 'text-rose-600' },
                            ].map((item, i) => (
                                <div key={i} className="trust-reveal flex flex-col items-center text-center px-2 group">
                                    <div className={cn(
                                        'w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3',
                                        'bg-[#fafafa] shadow-inner border border-black/[0.04]'
                                    )}>
                                        <item.icon className={cn('w-6 h-6', item.color)} />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-center gap-1">
                                            <span className="text-2xl font-display font-black text-charcoal">{item.value}</span>
                                            {i === 3 && <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />}
                                        </div>
                                        <h4 className="text-[11px] font-black uppercase tracking-[0.18em] text-charcoal/80 font-sans">{item.label}</h4>
                                        <p className="text-[10px] text-soft-gray font-sans font-medium leading-relaxed max-w-[140px] mx-auto opacity-60 italic">{item.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 pt-8 border-t border-black/[0.03] flex justify-center">
                            <div className="flex items-center gap-3 bg-black/[0.02] px-5 py-2 rounded-full border border-black/5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#1a9d82]" />
                                <span className="text-[9px] font-bold uppercase tracking-widest text-charcoal/50">Certified Dermal Practice • 2024</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main content sections */}
            <OurStory />
            <ServicesSection />
            <LaserEducation />
            <Gallery />
            <PricingSection />

            {/* Testimonials */}
            <section className="section-padding bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
                <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-warm-gold/5 blur-[150px] rounded-full pointer-events-none" />

                <div className="container-custom relative z-10">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-3 mb-5">
                            <div className="w-10 h-px bg-warm-gold/30" />
                            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-warm-gold font-sans">Client Stories</span>
                            <div className="w-10 h-px bg-warm-gold/30" />
                        </div>
                        <h2 className="font-display text-5xl md:text-7xl text-charcoal mb-8 leading-[0.9]">
                            Real Stories <br />
                            <span className="italic font-light text-gradient">of Transformation</span>
                        </h2>
                    </div>

                    <div className="testimonials-grid grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
                        {[
                            { name: 'Sarah J.', text: 'The most professional laser clinic in Toronto. Amazing results in just 3 sessions. The clinical expertise is evident in everything they do.', tag: 'Laser Hair Removal' },
                            { name: 'Elena R.', text: 'The HydraFacial was a life-saver for my wedding prep. My skin has never looked so smooth and glowing — everyone noticed!', tag: 'Facial Rituals' },
                            { name: 'Jessica M.', text: 'Highly recommend R.B Beauty! The staff are so knowledgeable and make you feel completely at ease throughout the entire journey.', tag: 'Skin Therapy' },
                        ].map((rev, i) => (
                            <div key={i} className="testimonial-reveal group">
                                <div className="glass-card !rounded-[2.5rem] p-10 md:p-12 h-full border-charcoal/5 hover:border-deep-rose/20 hover:bg-ivory/20 transition-all duration-700 relative">
                                    <Quote className="absolute top-8 right-8 w-10 h-10 text-charcoal/[0.04] group-hover:text-deep-rose/5 transition-colors" />
                                    <div className="flex gap-1 mb-8">
                                        {[...Array(5)].map((_, s) => <Star key={s} className="w-3.5 h-3.5 text-warm-gold fill-warm-gold" />)}
                                    </div>
                                    <p className="text-charcoal/65 font-sans text-base md:text-lg leading-relaxed mb-10 italic">
                                        "{rev.text}"
                                    </p>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-charcoal">{rev.name}</span>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-deep-rose/40 font-sans">{rev.tag}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 pt-10 border-t border-charcoal/5 flex justify-center">
                        <div className="flex items-center gap-4 bg-charcoal/4 px-7 py-3 rounded-full border border-charcoal/5">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            <span className="font-black text-[9px] uppercase tracking-[0.3em] text-charcoal/50">Verified Reviews • 4.9 / 5 Across 200+ Clients</span>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

            {/* Floating action buttons */}
            <div className="floating-cta fixed bottom-8 right-6 md:right-10 z-[90] flex flex-col gap-4 opacity-0">
                <button
                    onClick={scrollToTop}
                    className="w-14 h-14 bg-white/80 backdrop-blur-3xl text-charcoal rounded-full shadow-xl transition-all border border-charcoal/5 flex items-center justify-center group hover:-translate-y-1.5 active:scale-90"
                >
                    <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
                <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 bg-charcoal text-white rounded-[1.75rem] shadow-2xl transition-all transform hover:scale-110 active:scale-95 group relative flex items-center justify-center overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-deep-rose to-deep-rose-dark opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <MessageCircle className="w-7 h-7 relative z-10" />
                    <div className="absolute top-2 right-2 w-3.5 h-3.5 bg-deep-rose rounded-full border-2 border-white z-20" />
                </a>
            </div>

            {/* Global atmospheric orbs */}
            <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[700px] h-[700px] bg-deep-rose/[0.02] rounded-full blur-[180px] animate-float" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-warm-gold/[0.025] rounded-full blur-[200px] animate-pulse-soft" style={{ animationDelay: '3s' }} />
            </div>
        </main>
    );
}
