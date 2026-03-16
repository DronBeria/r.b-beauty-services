'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../lib/utils';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
    {
        q: "How many sessions do I need for laser hair removal?",
        a: "Most clients achieve permanent results in 6–8 sessions spaced 4–6 weeks apart. Factors like hair colour, skin tone, and treatment area affect the exact number. We recommend a free consultation to build your personalized plan.",
    },
    {
        q: "Is laser hair removal painful?",
        a: "Our medical-grade diode lasers feature integrated cryo-cooling that makes sessions virtually pain-free. Most clients describe it as a mild warmth or light snap — significantly more comfortable than waxing.",
    },
    {
        q: "What skin types can be treated?",
        a: "We safely treat all skin types (Fitzpatrick I–VI). Our advanced lasers are precision-calibrated for every skin tone, making us one of the few Toronto clinics to deliver consistently excellent results on darker complexions.",
    },
    {
        q: "How does the WhatsApp booking system work?",
        a: "Add your desired services to your booking cart, then tap 'Book via WhatsApp'. A pre-filled message with all your selected services is sent straight to our team. We respond within 2 hours to confirm your date and time — no app download required.",
    },
    {
        q: "What is a HydraFacial and how often should I get one?",
        a: "A HydraFacial is a multi-step clinical facial that cleanses, exfoliates, extracts, and deeply hydrates in one 45–60 minute session. Most clients see optimal ongoing results with monthly treatments, though a single session delivers immediately visible glow.",
    },
    {
        q: "Is all equipment Health Canada and FDA approved?",
        a: "Yes. Every device at R.B Beauty is Health Canada and FDA approved. We invest exclusively in medical-grade technology and use only clinically-tested, pharmaceutical-grade skincare products throughout every treatment.",
    },
    {
        q: "Do you offer package deals or discounts?",
        a: "Absolutely. Our 6-session laser packages save you $60–$1,600 depending on the treatment area. We also offer curated bundles like The Radiance Pack from $249.99. Use code GLOW2024 for current seasonal savings.",
    },
    {
        q: "What should I do before and after a treatment?",
        a: "Before laser: avoid sun exposure and shaving 24 hours prior. Before facials: arrive with clean, makeup-free skin. After any treatment: apply SPF 50+, avoid hot showers for 24 hours, and follow the aftercare guide our team sends via WhatsApp post-session.",
    },
];

export default function FAQSection() {
    const [open, setOpen] = useState<number | null>(0);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.faq-header-reveal',
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    stagger: 0.12,
                    duration: 1.1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' }
                }
            );
            gsap.fromTo('.faq-item',
                { y: 24, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    stagger: 0.07,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: { trigger: '.faq-item', start: 'top 90%' }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="faq" className="section-padding bg-white relative overflow-hidden">
            {/* Ambient background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-warm-gold/5 blur-[120px] rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-deep-rose/5 blur-[100px] rounded-full translate-y-1/3 -translate-x-1/3 pointer-events-none" />

            <div className="container-custom relative z-10">
                <div className="max-w-3xl mx-auto">

                    {/* Header */}
                    <div className="text-center mb-14 md:mb-20">
                        <div className="faq-header-reveal opacity-0 inline-flex items-center gap-3 mb-5">
                            <div className="w-10 h-px bg-warm-gold/30" />
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-warm-gold font-sans">Common Questions</span>
                            <div className="w-10 h-px bg-warm-gold/30" />
                        </div>
                        <h2 className="faq-header-reveal opacity-0 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-charcoal leading-[0.9] mb-4">
                            Everything You <br />
                            <span className="italic font-light text-gradient">Need to Know</span>
                        </h2>
                        <p className="faq-header-reveal opacity-0 text-soft-gray font-sans text-base md:text-lg mt-4 max-w-lg mx-auto">
                            Can't find your answer? Chat with us on WhatsApp — we reply in under 2 hours.
                        </p>
                    </div>

                    {/* Accordion */}
                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className={cn(
                                    'faq-item opacity-0 rounded-[1.5rem] border transition-all duration-400 overflow-hidden',
                                    open === i
                                        ? 'bg-white border-deep-rose/20 shadow-[0_8px_40px_rgba(160,19,77,0.06)]'
                                        : 'bg-ivory/60 border-charcoal/[0.07] hover:bg-white hover:border-charcoal/12'
                                )}
                            >
                                <button
                                    onClick={() => setOpen(open === i ? null : i)}
                                    className="w-full flex items-center justify-between gap-4 px-6 py-5 md:px-8 md:py-6 text-left group"
                                >
                                    <span className={cn(
                                        'font-display text-base md:text-[1.1rem] leading-snug transition-colors duration-300',
                                        open === i ? 'text-deep-rose' : 'text-charcoal group-hover:text-deep-rose'
                                    )}>
                                        {faq.q}
                                    </span>
                                    <div className={cn(
                                        'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-400',
                                        open === i
                                            ? 'bg-deep-rose text-white rotate-0'
                                            : 'bg-charcoal/[0.06] text-charcoal group-hover:bg-charcoal/10'
                                    )}>
                                        {open === i
                                            ? <Minus className="w-3.5 h-3.5" />
                                            : <Plus className="w-3.5 h-3.5" />
                                        }
                                    </div>
                                </button>

                                {/* Answer with CSS height transition */}
                                <div
                                    className="overflow-hidden transition-all duration-500"
                                    style={{ maxHeight: open === i ? '400px' : '0px', opacity: open === i ? 1 : 0 }}
                                >
                                    <p className="px-6 md:px-8 pb-6 text-soft-gray font-sans text-sm md:text-base leading-relaxed">
                                        {faq.a}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-12 md:mt-16 text-center">
                        <a
                            href="https://wa.me/14160000000?text=Hi%20R.B%20Beauty!%20I%20have%20a%20question."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-charcoal text-white px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.25em] hover:bg-deep-rose transition-all duration-300 shadow-lg group active:scale-95"
                        >
                            <span>Ask Us on WhatsApp</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
