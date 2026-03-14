import { Service } from '../types';

export const SERVICES: Service[] = [
    // Laser Treatments
    {
        id: 'laser-full-legs',
        name: 'Laser Hair Removal — Full Legs',
        category: 'Laser Treatments',
        description: 'Permanent hair reduction using advanced diode laser. Suitable for all skin tones.',
        price: 'From $120',
        duration: '60 min',
        benefits: ['Smooth skin', 'No ingrowns', 'Long-lasting'],
        image: '/images/services/laser-legs.jpg',
        isPopular: true
    },
    {
        id: 'laser-brazilian',
        name: 'Laser Hair Removal — Brazilian',
        category: 'Laser Treatments',
        description: 'Full Brazilian laser for long-lasting smooth results. Includes consultation.',
        price: 'From $80',
        duration: '30 min',
        benefits: ['Precision target', 'Cooling tech', 'Hygienic'],
        image: '/images/services/laser-brazilian.jpg'
    },
    {
        id: 'laser-full-body',
        name: 'Laser Hair Removal — Full Body',
        category: 'Laser Treatments',
        description: 'Complete body laser package — face to toes. Best value bundle.',
        price: 'From $350',
        duration: '3 hrs',
        benefits: ['Head-to-toe', 'Maximum value', 'Complete transformation'],
        image: '/images/services/laser-body.jpg'
    },
    {
        id: 'ipl-photofacial',
        name: 'IPL Photofacial',
        category: 'Laser Treatments',
        description: 'Intense Pulsed Light therapy for pigmentation, sun damage and redness reduction.',
        price: 'From $150',
        duration: '45 min',
        benefits: ['Even tone', 'Sun repair', 'Collagen boost'],
        image: '/images/services/ipl.jpg'
    },
    {
        id: 'laser-resurfacing',
        name: 'Laser Skin Resurfacing',
        category: 'Laser Treatments',
        description: 'Stimulates collagen, reduces fine lines, improves skin texture and tone.',
        price: 'From $200',
        duration: '60 min',
        benefits: ['Anti-aging', 'Texture improvement', 'Glow'],
        image: '/images/services/resurfacing.jpg'
    },
    {
        id: 'tattoo-removal',
        name: 'Tattoo Removal',
        category: 'Laser Treatments',
        description: 'Multi-session Q-switched laser tattoo removal. Price per session by size.',
        price: 'From $75',
        duration: '15-30 min',
        benefits: ['Safe removal', 'All ink colors', 'Scar-free focus'],
        image: '/images/services/tattoo.jpg'
    },

    // Facial Treatments
    {
        id: 'hydrafacial',
        name: 'HydraFacial',
        category: 'Facial Treatments',
        description: 'Cleanses, exfoliates, and hydrates in one treatment. The celebrity favourite.',
        price: 'From $160',
        duration: '50 min',
        benefits: ['Instant glow', 'Zero downtime', 'Deep cleanse'],
        image: '/images/services/hydrafacial.jpg',
        isPopular: true
    },
    {
        id: 'chemical-peel',
        name: 'Chemical Peel — Lite',
        category: 'Facial Treatments',
        description: 'Glycolic or lactic acid peel for radiance boost and mild exfoliation.',
        price: 'From $90',
        duration: '30 min',
        benefits: ['Brightening', 'Exfoliation', 'Youthful skin'],
        image: '/images/services/peel.jpg'
    },
    {
        id: 'microneedling',
        name: 'Microneedling',
        category: 'Facial Treatments',
        description: 'Collagen induction therapy for anti-aging, scars, and skin texture refinement.',
        price: 'From $180',
        duration: '60 min',
        benefits: ['Scar reduction', 'Fine line repair', 'Firming'],
        image: '/images/services/microneedling.jpg'
    },
    {
        id: 'anti-aging-facial',
        name: 'Anti-Aging Facial',
        category: 'Facial Treatments',
        description: 'Targeted treatment with peptides, retinol serums and facial massage.',
        price: 'From $110',
        duration: '60 min',
        benefits: ['Firming', 'Hydration', 'Wrinkle reduction'],
        image: '/images/services/anti-aging.jpg'
    },
    {
        id: 'brightening',
        name: 'Brightening Treatment',
        category: 'Facial Treatments',
        description: 'Vitamin C + niacinamide infusion for luminous, even-toned complexion.',
        price: 'From $95',
        duration: '45 min',
        benefits: ['Glow boost', 'Dark spot fade', 'Radiance'],
        image: '/images/services/brightening.jpg'
    },

    // Waxing
    {
        id: 'full-body-wax',
        name: 'Full Body Waxing',
        category: 'Waxing',
        description: 'Complete hair removal from all desired body areas using premium soft/hard wax.',
        price: 'From $150',
        duration: '90 min',
        benefits: ['Silky smooth', 'Slow regrowth', 'Exfoliating'],
        image: '/images/services/waxing.jpg'
    }
];

export const WHATSAPP_NUMBER = '1234567890'; // Placeholder - user should update
