import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Navbar from '../../components/Navbar';

const ServicesSection   = dynamic(() => import('../../components/ServicesSection'),   { ssr: false });
const PricingSection    = dynamic(() => import('../../components/PricingSection'),     { ssr: false });
const Footer            = dynamic(() => import('../../components/Footer'),             { ssr: false });

export const metadata: Metadata = {
    title: 'Services & Pricing',
    description: 'Browse all beauty and laser services at R.D. Beauty & Laser Clinic in Beaumont, Alberta — threading, waxing, Nufree, facials, HydraFacial, microneedling, laser hair removal and more.',
};

const SectionPlaceholder = () => (
    <div className="w-full py-24 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-charcoal/10 border-t-warm-gold animate-spin" />
    </div>
);

export default function ServicesPage() {
    return (
        <main className="relative min-h-screen bg-ivory text-charcoal overflow-hidden">
            <Navbar />

            {/* Page header */}
            <section
                className="relative w-full pt-[120px] pb-16 md:pb-24 overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #FAF7F2 0%, #F5EFE6 60%, #FAF7F2 100%)' }}
            >
                {/* Decorative */}
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                    <div style={{
                        position: 'absolute', top: '-5%', right: '-3%',
                        width: 400, height: 400, borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(184,149,106,0.12) 0%, transparent 70%)',
                    }} />
                    <div style={{
                        position: 'absolute', bottom: '0', left: '-5%',
                        width: 300, height: 300, borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(160,19,77,0.05) 0%, transparent 70%)',
                    }} />
                </div>

                <div className="container-custom relative z-10 text-center">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <span className="w-8 h-px block" style={{ background: 'rgba(154,123,79,0.4)' }} />
                        <span className="font-sans text-[9.5px] font-semibold uppercase tracking-[0.55em]"
                            style={{ color: 'rgba(154,123,79,0.8)' }}>
                            R.D. Beauty & Laser Clinic
                        </span>
                        <span className="w-8 h-px block" style={{ background: 'rgba(154,123,79,0.4)' }} />
                    </div>
                    <h1 className="font-display leading-[0.9] tracking-[-0.03em] mb-5"
                        style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', color: '#1A1410' }}>
                        <span style={{ fontWeight: 300, fontStyle: 'italic' }}>Our </span>
                        <span style={{ fontWeight: 700 }}>Services</span>
                    </h1>
                    <p className="font-sans max-w-lg mx-auto leading-relaxed"
                        style={{ fontSize: '15.5px', color: 'rgba(44,36,32,0.52)' }}>
                        Full-service threading, waxing, facial treatments, and laser hair removal —
                        each tailored to your skin in Beaumont, Alberta.
                    </p>
                </div>
            </section>

            <Suspense fallback={<SectionPlaceholder />}>
                <ServicesSection />
            </Suspense>
            <Suspense fallback={<SectionPlaceholder />}>
                <PricingSection />
            </Suspense>
            <Suspense fallback={null}>
                <Footer />
            </Suspense>
        </main>
    );
}
