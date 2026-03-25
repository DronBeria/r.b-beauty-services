'use client';

import React, { useEffect, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';

// Above-fold — eager load
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Preloader from '../components/Preloader';

// Below-fold — lazy load to reduce initial bundle
const OurStory          = dynamic(() => import('../components/OurStory'),           { ssr: false });
const TestimonialsCarousel = dynamic(() => import('../components/TestimonialsCarousel'), { ssr: false });
const ContactSection    = dynamic(() => import('../components/ContactSection'),     { ssr: false });
const Footer            = dynamic(() => import('../components/Footer'),             { ssr: false });

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SectionPlaceholder = () => (
    <div className="w-full py-24 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-charcoal/10 border-t-warm-gold animate-spin" />
    </div>
);

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
                    },
                }
            );
        });
        return () => ctx.revert();
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <main className="relative min-h-screen bg-ivory selection:bg-deep-rose selection:text-white overflow-hidden">
            {/* Scroll progress bar */}
            <div
                className="fixed top-0 left-0 z-[500] h-[2px] transition-all duration-75 pointer-events-none"
                style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #9A7B4F, #B8956A, #A0134D)' }}
            />

            <Preloader />
            <Navbar />
            <Hero />

            {/* Below-fold */}
            <Suspense fallback={<SectionPlaceholder />}>
                <OurStory />
            </Suspense>
            <Suspense fallback={<SectionPlaceholder />}>
                <TestimonialsCarousel />
            </Suspense>
            <Suspense fallback={<SectionPlaceholder />}>
                <ContactSection />
            </Suspense>
            <Suspense fallback={null}>
                <Footer />
            </Suspense>

            {/* Scroll to top */}
            <div className="floating-cta fixed bottom-5 md:bottom-8 right-4 md:right-10 z-[90] opacity-0">
                <button
                    onClick={scrollToTop}
                    className="w-11 h-11 md:w-14 md:h-14 bg-white/80 backdrop-blur-3xl text-charcoal rounded-full shadow-xl transition-all border border-warm-gold/20 flex items-center justify-center group hover:-translate-y-1.5 active:scale-90"
                    aria-label="Scroll to top"
                >
                    <ChevronUp className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
            </div>

            {/* Atmospheric orbs */}
            <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
                <div className="absolute top-[-10%] left-[-10%] w-[700px] h-[700px] bg-warm-gold/[0.025] rounded-full blur-[180px] animate-float" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-deep-rose/[0.02] rounded-full blur-[200px] animate-pulse-soft" style={{ animationDelay: '3s' }} />
            </div>
        </main>
    );
}
