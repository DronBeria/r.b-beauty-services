'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ServicesSection from '../components/ServicesSection';
import OurStory from '../components/OurStory';
import PricingSection from '../components/PricingSection';
import Footer from '../components/Footer';
import CartPanel from '../components/CartPanel';
import Preloader from '../components/Preloader';
import MarqueeStrip from '../components/MarqueeStrip';
import CartToast from '../components/CartToast';
import ContactSection from '../components/ContactSection';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../lib/utils';
import { MessageCircle, ChevronUp, Award, ShieldCheck, Sparkles, CheckCircle2, Star } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants/services';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const total = document.documentElement.scrollHeight - window.innerHeight;
            setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
            {/* Scroll progress bar */}
            <div
                className="fixed top-0 left-0 z-[500] h-[2px] transition-all duration-75 pointer-events-none"
                style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #A0134D, #C2185B, #9A7B4F)' }}
            />

            <Preloader />
            <Navbar />
            <CartPanel />
            <CartToast />

            <Hero />
            <MarqueeStrip />

            {/* Trust / Stats Strip */}
            <section className="trust-section relative z-30 py-16 md:py-24">
                <div className="container-custom">
                    <div className="bg-white/85 backdrop-blur-3xl px-5 sm:px-10 md:px-16 py-8 md:py-12 lg:py-14 rounded-[2rem] md:rounded-[3rem] shadow-[0_30px_80px_rgba(0,0,0,0.05)] border border-white/50 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-deep-rose/20 to-transparent" />

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 items-center">
                            {[
                                { icon: Award, value: 'Laser', label: 'Hair Removal', sub: 'Safe, effective laser for all skin types', color: 'text-amber-600' },
                                { icon: Sparkles, value: 'Facial', label: 'Treatments', sub: 'HydraFacial, microneedling, dermaplaning & more', color: 'text-blue-600' },
                                { icon: ShieldCheck, value: 'Waxing', label: '& Threading', sub: 'Nufree organic waxing & precision threading', color: 'text-emerald-600' },
                                { icon: Star, value: 'Book', label: 'Via WhatsApp', sub: 'Same-day appointments available for most services', color: 'text-rose-600' },
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
            <PricingSection />

            {/* Testimonials Carousel */}
            <TestimonialsCarousel />

            <ContactSection />
            <Footer />

            {/* Floating action buttons */}
            <div className="floating-cta fixed bottom-5 md:bottom-8 right-4 md:right-10 z-[90] flex flex-col gap-3 md:gap-4 opacity-0">
                <button
                    onClick={scrollToTop}
                    className="w-11 h-11 md:w-14 md:h-14 bg-white/80 backdrop-blur-3xl text-charcoal rounded-full shadow-xl transition-all border border-charcoal/5 flex items-center justify-center group hover:-translate-y-1.5 active:scale-90"
                >
                    <ChevronUp className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
                <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 md:w-16 md:h-16 bg-charcoal text-white rounded-[1.25rem] md:rounded-[1.75rem] shadow-2xl transition-all transform hover:scale-110 active:scale-95 group relative flex items-center justify-center overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-deep-rose to-deep-rose-dark opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <MessageCircle className="w-5 h-5 md:w-7 md:h-7 relative z-10" />
                    <div className="absolute top-1.5 right-1.5 md:top-2 md:right-2 w-3 h-3 md:w-3.5 md:h-3.5 bg-deep-rose rounded-full border-2 border-white z-20" />
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
