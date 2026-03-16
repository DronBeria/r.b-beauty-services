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
        image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800&auto=format&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1520333789090-1afc82db536a?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 'laser-full-body',
        name: 'Laser Hair Removal — Full Body',
        category: 'Laser Treatments',
        description: 'Complete body laser package — face to toes. Best value bundle.',
        price: 'From $350',
        duration: '3 hrs',
        benefits: ['Head-to-toe', 'Maximum value', 'Complete transformation'],
        image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 'ipl-photofacial',
        name: 'IPL Photofacial',
        category: 'Laser Treatments',
        description: 'Intense Pulsed Light therapy for pigmentation, sun damage and redness reduction.',
        price: 'From $150',
        duration: '45 min',
        benefits: ['Even tone', 'Sun repair', 'Collagen boost'],
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 'laser-resurfacing',
        name: 'Laser Skin Resurfacing',
        category: 'Laser Treatments',
        description: 'Stimulates collagen, reduces fine lines, improves skin texture and tone.',
        price: 'From $200',
        duration: '60 min',
        benefits: ['Anti-aging', 'Texture improvement', 'Glow'],
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 'tattoo-removal',
        name: 'Tattoo Removal',
        category: 'Laser Treatments',
        description: 'Multi-session Q-switched laser tattoo removal. Price per session by size.',
        price: 'From $75',
        duration: '15-30 min',
        benefits: ['Safe removal', 'All ink colors', 'Scar-free focus'],
        image: 'https://images.unsplash.com/photo-1598331668826-20cecc596b86?q=80&w=800&auto=format&fit=crop'
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
        image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=800&auto=format&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 'microneedling',
        name: 'Microneedling',
        category: 'Facial Treatments',
        description: 'Collagen induction therapy for anti-aging, scars, and skin texture refinement.',
        price: 'From $180',
        duration: '60 min',
        benefits: ['Scar reduction', 'Fine line repair', 'Firming'],
        image: 'https://images.unsplash.com/photo-1616391182219-e080b4d1043a?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 'anti-aging-facial',
        name: 'Anti-Aging Facial',
        category: 'Facial Treatments',
        description: 'Targeted treatment with peptides, retinol serums and facial massage.',
        price: 'From $110',
        duration: '60 min',
        benefits: ['Firming', 'Hydration', 'Wrinkle reduction'],
        image: 'https://images.unsplash.com/photo-1532413992378-f169ac26fff0?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 'brightening',
        name: 'Brightening Treatment',
        category: 'Facial Treatments',
        description: 'Vitamin C + niacinamide infusion for luminous, even-toned complexion.',
        price: 'From $95',
        duration: '45 min',
        benefits: ['Glow boost', 'Dark spot fade', 'Radiance'],
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop'
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
        image: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?q=80&w=800&auto=format&fit=crop'
    }

];

export const WHATSAPP_NUMBER = '1234567890'; // Replace with client's actual WhatsApp number
