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
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Sparkles, Star, ChevronUp, CheckCircle2, Award, ShieldCheck, Zap, ArrowRight, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Trust Section Stagger
      gsap.to('.trust-reveal', {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.trust-section',
          start: "top 90%",
        }
      });

      // Testimonial Stagger
      gsap.to('.testimonial-reveal', {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.testimonials-grid',
          start: "top 85%",
        }
      });

      // Floating CTA logic
      gsap.to('.floating-cta', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: 'body',
          start: "top -15%",
          toggleActions: "play none none reverse"
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="relative min-h-screen bg-ivory selection:bg-deep-rose selection:text-white overflow-hidden">
      <Navbar />
      <CartPanel />

      <Hero />

      {/* Trust Synthesis Section */}
      <section className="trust-section relative -mt-20 md:-mt-28 z-30 pb-24">
        <div className="container-custom">
          <div className="glass-card !bg-white/70 !backdrop-blur-3xl p-12 md:p-20 shadow-[0_50px_100px_rgba(0,0,0,0.06)] border-white/50">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12">
              {[
                { icon: Award, label: "Certified Precision", sub: "Canadian Dermal Standards" },
                { icon: Zap, label: "Quantum Technology", sub: "FDA & Health Canada Validated" },
                { icon: ShieldCheck, label: "Clinical Safety", sub: "Superior Hygiene Protocols" },
                { icon: Star, label: "Legacy of Care", sub: "200+ Verified 5-Star Outcomes" }
              ].map((item, i) => (
                <div key={i} className="trust-reveal reveal-hidden flex flex-col items-center md:items-start text-center md:text-left gap-5 group">
                  <div className="w-14 h-14 bg-ivory rounded-2xl flex items-center justify-center text-deep-rose shadow-inner group-hover:bg-charcoal group-hover:text-warm-gold transition-all duration-700 transform group-hover:-translate-y-2 group-hover:rotate-6">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-charcoal font-sans">{item.label}</h4>
                    <p className="text-xs text-soft-gray font-sans font-medium leading-relaxed opacity-70">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Containers */}
      <div className="space-y-0">
        <OurStory />
        <ServicesSection />
        <LaserEducation />
        <Gallery />
        <PricingSection />

        {/* Global Testimonials */}
        <section className="section-padding bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
          <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-warm-gold/5 blur-[150px] rounded-full pointer-events-none" />

          <div className="container-custom relative z-10">
            <div className="text-center mb-24">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-10 h-px bg-warm-gold/30" />
                <span className="text-[10px] font-black uppercase tracking-[0.6em] text-warm-gold font-sans">Client Chronicles</span>
                <div className="w-10 h-px bg-warm-gold/30" />
              </div>
              <h2 className="font-display text-6xl md:text-8xl text-charcoal mb-10 leading-[0.85]">
                Real Stories <br />
                <span className="italic font-light text-gradient drop-shadow-sm">of Transformation</span>
              </h2>
            </div>

            <div className="testimonials-grid grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
              {[
                { name: "Sarah J.", text: "The most professional laser clinic in Toronto. I've seen amazing results in just 3 sessions. The clinical mastership is evident.", tag: "Laser Hair Removal" },
                { name: "Elena R.", text: "The Hydra-Luminous ritual was a life-saver for my wedding prep. My skin has never looked so smooth and glowing.", tag: "Facial Rituals" },
                { name: "Jessica M.", text: "Highly recommend RB Beauty! The staff are so knowledgeable and make you feel totally at ease throughout the journey.", tag: "Skin Therapy" }
              ].map((rev, i) => (
                <div key={i} className="testimonial-reveal reveal-hidden group">
                  <div className="glass-card !rounded-[3.5rem] p-12 md:p-16 h-full border-charcoal/5 hover:border-deep-rose/20 hover:bg-ivory/30 transition-all duration-700 relative">
                    <Quote className="absolute top-10 right-10 w-12 h-12 text-charcoal/[0.03] group-hover:text-deep-rose/5 transition-colors" />
                    <div className="flex gap-1.5 mb-10">
                      {[...Array(5)].map((_, s) => <Star key={s} className="w-3.5 h-3.5 text-warm-gold fill-warm-gold" />)}
                    </div>
                    <p className="text-charcoal/70 font-sans text-lg md:text-xl leading-relaxed mb-12 italic relative z-10">
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

            <div className="mt-24 pt-10 border-t border-charcoal/5 flex flex-col items-center gap-6">
              <div className="flex items-center gap-4 bg-charcoal/5 px-8 py-3 rounded-full border border-charcoal/5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="font-black text-[10px] uppercase tracking-[0.3em] text-charcoal/60">Clinic Protocol Verified</span>
                </div>
                <div className="w-px h-4 bg-charcoal/10" />
                <span className="font-sans font-bold text-xs text-charcoal/80">4.9/5 Across 200+ Clinical Reviews</span>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      {/* Floating Precision Actions */}
      <div className="floating-cta fixed bottom-10 right-8 md:right-12 z-[90] flex flex-col gap-6 opacity-0 translate-y-20 pointer-events-auto">
        <button
          onClick={scrollToTop}
          className="w-16 h-16 bg-white/80 backdrop-blur-3xl text-charcoal rounded-full shadow-2xl transition-all border border-charcoal/5 flex items-center justify-center group transform hover:-translate-y-2 active:scale-90"
        >
          <ChevronUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
        </button>
        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="w-20 h-20 bg-charcoal text-white rounded-[2.5rem] shadow-2xl transition-all transform hover:scale-110 active:scale-95 group relative flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-deep-rose to-deep-rose-dark opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <MessageCircle className="w-8 h-8 relative z-10" />
          <div className="absolute top-2 right-2 w-4 h-4 bg-deep-rose rounded-full border-4 border-white z-20 group-hover:scale-125 transition-transform" />
        </a>
      </div>

      {/* Global Atmospheric Orbs */}
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-deep-rose/[0.02] rounded-full blur-[180px] animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[900px] h-[900px] bg-warm-gold/[0.03] rounded-full blur-[200px] animate-pulse-soft" style={{ animationDelay: '3s' }} />
      </div>
    </main>
  );
}
