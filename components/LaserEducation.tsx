'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, HelpCircle, CheckCircle2, ChevronRight, Sparkles, ShieldCheck, Microscope, Info, ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';
import Link from 'next/link';
import { WHATSAPP_NUMBER } from '../constants/services';

gsap.registerPlugin(ScrollTrigger);

const LaserEducation = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [quizStep, setQuizStep] = useState(0);
    const [quizResult, setQuizResult] = useState(false);

    const steps = [
        {
            title: "Cellular Analysis",
            description: "Precision mapping of your skin's unique biological resonance and tone via the Fitzpatrick scale.",
            icon: Microscope
        },
        {
            title: "Bespoke Priming",
            icon: Sparkles,
            description: "Advanced clinical prep ensuring optimal skin hydration and receptor readiness for the light ritual."
        },
        {
            title: "Precision Pulse",
            icon: Zap,
            description: "Strategic photon delivery targeting follicles with sub-millimeter accuracy and integrated cryo-cooling."
        },
        {
            title: "Dermal Recovery",
            icon: ShieldCheck,
            description: "Post-ritual infusion of clinical-grade peptides to seal the radiance and accelerate cell synthesis."
        },
        {
            title: "Luminous Reveal",
            icon: CheckCircle2,
            description: "A profound transformation where texture, tone, and smoothness converge into pure skin excellence."
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to('.education-header-reveal', {
                y: 0,
                opacity: 1,
                stagger: 0.15,
                duration: 1.4,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                }
            });

            gsap.to('.step-item', {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.12,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.step-item',
                    start: "top 90%",
                }
            });

            gsap.to('.quiz-section-reveal', {
                scale: 1,
                opacity: 1,
                duration: 1.5,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: '.quiz-section-reveal',
                    start: "top 85%",
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleQuizNext = () => {
        if (quizStep < 2) {
            setQuizStep(quizStep + 1);
        } else {
            setQuizResult(true);
        }
    };

    return (
        <section ref={sectionRef} className="section-padding bg-ivory relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
            <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-deep-rose/5 blur-[150px] rounded-full pointer-events-none animate-float" />
            <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-warm-gold/5 blur-[120px] rounded-full pointer-events-none animate-pulse-soft" />

            <div className="container-custom relative z-10">
                {/* Scientific Header */}
                <div className="text-center mb-14 md:mb-24 lg:mb-32">
                    <div className="education-header-reveal reveal-hidden inline-flex items-center gap-3 mb-5 md:mb-6">
                        <div className="w-12 h-px bg-warm-gold/30" />
                        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-warm-gold font-sans">Scientific Radiance</span>
                        <div className="w-12 h-px bg-warm-gold/30" />
                    </div>
                    <h2 className="education-header-reveal reveal-hidden font-display text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-charcoal mb-6 md:mb-10 leading-[0.85]">
                        The Physics <br />
                        <span className="italic font-light text-gradient drop-shadow-sm">Behind the Glow</span>
                    </h2>
                    <p className="education-header-reveal reveal-hidden max-w-2xl mx-auto text-soft-gray font-sans text-base md:text-lg lg:text-xl leading-relaxed">
                        A clinical masterclass in dermal transformation. Explore how our five-stage
                        light ritual resets your skin's genetic narrative.
                    </p>
                </div>

                {/* Steps Narrative */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-10 lg:gap-14 mb-16 md:mb-32">
                    {steps.map((step, index) => (
                        <div key={index} className="step-item reveal-hidden flex flex-col items-center text-center group cursor-default">
                            <div className="relative mb-5 md:mb-10">
                                <div className="w-14 h-14 md:w-24 md:h-24 rounded-[40%] bg-white border border-charcoal/5 flex items-center justify-center shadow-premium group-hover:bg-charcoal transition-all duration-700 transform group-hover:-translate-y-3 group-hover:rotate-[15deg]">
                                    <step.icon className="w-6 h-6 md:w-10 md:h-10 text-deep-rose group-hover:text-warm-gold transition-all duration-500" />
                                </div>
                                <div className="absolute -bottom-2 -right-2 md:-bottom-3 md:-right-3 w-7 h-7 md:w-10 md:h-10 rounded-full bg-ivory text-charcoal font-black text-[9px] md:text-[10px] flex items-center justify-center border border-charcoal/5 shadow-xl group-hover:bg-deep-rose group-hover:text-white transition-colors">
                                    {String(index + 1).padStart(2, '0')}
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-12 -right-4 translate-x-1/2 w-12 h-px border-t border-dashed border-charcoal/10 pointer-events-none" />
                                )}
                            </div>
                            <h3 className="font-display text-sm md:text-2xl text-charcoal mb-2 md:mb-4 group-hover:text-deep-rose transition-colors duration-500">{step.title}</h3>
                            <p className="text-soft-gray text-[10px] md:text-sm leading-relaxed font-sans group-hover:text-charcoal transition-colors duration-500 hidden sm:block">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Interactive Diagnostic Tool */}
                <div className="quiz-section-reveal opacity-0 scale-95 w-full max-w-5xl mx-auto">
                    <div className="glass-card p-6 md:p-12 lg:p-20 relative overflow-hidden group/card shadow-[0_40px_100px_rgba(0,0,0,0.08)]">
                        <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-deep-rose/5 blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                        <div className="relative flex flex-col lg:flex-row items-center gap-8 md:gap-16 lg:gap-24">
                            {/* Visual Indicator */}
                            <div className="w-full lg:w-1/3 flex flex-col items-center">
                                <div className="relative w-32 h-32 md:w-48 md:h-48 flex items-center justify-center mb-4 md:mb-8">
                                    <svg className="w-full h-full -rotate-90" viewBox="0 0 192 192">
                                        <circle cx="96" cy="96" r="88" className="fill-none stroke-charcoal/5 stroke-[6]" />
                                        <circle
                                            cx="96" cy="96" r="88"
                                            className="fill-none stroke-deep-rose stroke-[6] transition-all duration-1000 ease-out"
                                            strokeDasharray="552.92"
                                            strokeDashoffset={552.92 - (quizStep / 3) * 552.92}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <HelpCircle className="w-8 h-8 md:w-12 md:h-12 text-warm-gold mb-1 md:mb-2 animate-pulse-soft" />
                                        <span className="text-2xl md:text-3xl font-display font-medium text-charcoal">{quizStep + 1}<span className="text-charcoal/20 mx-1">/</span>3</span>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-deep-rose">Digital Diagnostic</span>
                                    <p className="text-soft-gray/60 font-sans text-[10px] mt-1 md:mt-2 italic hidden sm:block">Real-time candidacy mapping</p>
                                </div>
                            </div>

                            {/* Tool Interface */}
                            <div className="w-full lg:w-2/3 min-h-[200px] md:min-h-[300px] flex flex-col justify-center">
                                {!quizResult ? (
                                    <div className="space-y-6 md:space-y-10">
                                        <div className="space-y-2 md:space-y-4">
                                            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-charcoal/40">Diagnostic Stage {quizStep + 1}</span>
                                            <h4 className="font-display text-2xl md:text-4xl lg:text-5xl text-charcoal leading-tight">
                                                {quizStep === 0 && "Define your target objective?"}
                                                {quizStep === 1 && "Current dermal state?"}
                                                {quizStep === 2 && "The desired transformation?"}
                                            </h4>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5">
                                            {(quizStep === 0 ? ["Facial Contour", "Full Body Ritual", "Precision Zones", "Intimate Areas"] :
                                                quizStep === 1 ? ["Unwanted Growth", "Pigment Variation", "Texture Irregularity", "Vascular Focus"] :
                                                    ["Permanent Silk", "Youthful Recall", "Clinical Clarity", "Radiant Evolution"]
                                            ).map((opt) => (
                                                <button
                                                    key={opt}
                                                    onClick={handleQuizNext}
                                                    className="group flex items-center justify-between p-4 md:p-6 bg-white rounded-2xl md:rounded-3xl border border-charcoal/5 hover:border-deep-rose/30 hover:bg-deep-rose/5 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-xl font-sans font-bold text-sm tracking-wide text-charcoal/80 active:scale-95"
                                                >
                                                    <span>{opt}</span>
                                                    <div className="p-1.5 md:p-2 rounded-full bg-charcoal/5 group-hover:bg-deep-rose group-hover:text-white transition-all flex-shrink-0">
                                                        <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-0.5 transition-transform" />
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6 md:space-y-10 animate-fade-in-up">
                                        <div className="inline-flex items-center gap-2 md:gap-3 bg-deep-rose/5 text-deep-rose px-4 md:px-6 py-2.5 md:py-3 rounded-full text-[10px] font-black uppercase tracking-[0.25em] border border-deep-rose/10 pointer-events-none">
                                            <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 animate-pulse-soft" />
                                            <span>Match Verified</span>
                                        </div>

                                        <div className="space-y-4 md:space-y-6">
                                            <h4 className="font-display text-3xl md:text-5xl lg:text-6xl text-charcoal leading-[0.9]">
                                                You Are Ready For <br />
                                                <span className="italic font-light text-gradient">The Luminous Shift.</span>
                                            </h4>
                                            <p className="text-soft-gray font-sans text-base md:text-lg lg:text-xl leading-relaxed max-w-xl">
                                                Diagnostic analysis confirms your candidacy for our advanced clinical protocols.
                                                A legacy of radiance awaits.
                                            </p>
                                        </div>

                                        <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-6 pt-2 md:pt-4">
                                            <Link href={`https://wa.me/${WHATSAPP_NUMBER}`} className="btn-primary group">
                                                <Zap className="w-5 h-5 fill-current" />
                                                <span>Begin Transformation</span>
                                                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </Link>
                                            <button
                                                onClick={() => { setQuizStep(0); setQuizResult(false); }}
                                                className="px-8 md:px-10 py-4 md:py-5 rounded-full border border-charcoal/10 text-[11px] font-black uppercase tracking-[0.3em] text-soft-gray hover:bg-white hover:text-charcoal transition-all"
                                            >
                                                Recalibrate
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LaserEducation;
