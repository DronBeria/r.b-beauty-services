import { Service } from '../types';

export const SERVICES: Service[] = [
    {
        id: '1',
        name: 'Laser Hair Removal',
        category: 'Laser Treatments',
        description: 'Advanced medical-grade laser technology for permanent hair reduction. Safe for all skin types with integrated cooling for maximum comfort.',
        price: '$149',
        duration: '45 mins',
        benefits: ['Permanent Results', 'All Skin Types', 'Pain-Free Technology'],
        image: '/laser-demo.png',
        isPopular: true,
    },
    {
        id: '2',
        name: 'Signature HydraFacial',
        category: 'Facial Rituals',
        description: 'A multi-step treatment that cleanses, exfoliates, and extracts impurities while infusing the skin with intense hydration and antioxidants.',
        price: '$195',
        duration: '60 mins',
        benefits: ['Instant Glow', 'Deep Hydration', 'Pore Refinement'],
        image: '/facial-demo.png',
        isPopular: true,
    },
    {
        id: '3',
        name: 'Dermal Rejuvenation',
        category: 'Clinical Care',
        description: 'Targeted therapy to stimulate collagen production and repair skin texture. Ideal for fine lines, scarring, and uneven pigmentation.',
        price: '$250',
        duration: '75 mins',
        benefits: ['Collagen Boost', 'Texture Repair', 'Even Tone'],
        image: '/hero-main.png',
    },
    {
        id: '4',
        name: 'Medical Peel',
        category: 'Clinical Care',
        description: 'Professional grade chemical exfoliation to accelerate cellular turnover and reveal fresh, radiant skin layers.',
        price: '$120',
        duration: '45 mins',
        benefits: ['Deep Exfoliation', 'Acne Control', 'Brightening'],
        image: '/products-demo.png',
    },
    {
        id: '5',
        name: 'Skin Consultation',
        category: 'Consultations',
        description: 'Comprehensive digital and physical skin analysis with our dermal experts to create your personalized treatment roadmap.',
        price: 'Free',
        duration: '30 mins',
        benefits: ['Expert Analysis', 'Custom Roadmap', 'Product Advice'],
        image: '/hero-main.png',
    },
];

export const WHATSAPP_NUMBER = '1234567890'; // Replace with client's actual WhatsApp number
