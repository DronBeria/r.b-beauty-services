export interface PricingItem {
    name: string;
    description?: string;
    perSession?: string;
    sixSessions?: string;
    savings?: string;
    price?: string;
    priceRange?: string;
}

export interface PricingCategory {
    id: string;
    title: string;
    icon: string; // Emoji or Lucide icon name
    image: string; // Relief/lifestyle image for context
    sections: PricingSection[];
}

export interface PricingSection {
    subtitle?: string;
    items: PricingItem[];
    columns?: string[]; // For table headers if applicable
}

export const PRICING_DATA: PricingCategory[] = [
    {
        id: 'laser-hair-removal',
        title: 'Laser Treatments',
        icon: '✨',
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=85&auto=format&fit=crop',
        sections: [
            {
                items: [
                    { name: 'Lip', perSession: '$35', sixSessions: '$149.99', savings: 'Save $60' },
                    { name: 'Chin', perSession: '$35 & Up', sixSessions: '$149.99 & Up', savings: 'Save $60' },
                    { name: 'Lip & Chin', perSession: '$69.99', sixSessions: '$299.99', savings: 'Save $120' },
                    { name: 'Under Arm', perSession: '$35', sixSessions: '$149.99', savings: 'Save $60' },
                    { name: 'Full Face', perSession: '$120', sixSessions: '$499.99', savings: 'Save $220' },
                    { name: 'Brazilian', perSession: '$129.99', sixSessions: '$549.99', savings: 'Save $230' },
                    { name: 'Full Body', perSession: '$599.99', sixSessions: '$1,999.99', savings: 'Save $1,600' },
                ],
                columns: ['Treatment Area', 'Per Session', '6-Session Package', 'Savings']
            }
        ]
    },
    {
        id: 'facial-rituals',
        title: 'Facial Rituals',
        icon: '🧴',
        image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=85&auto=format&fit=crop',
        sections: [
            {
                subtitle: 'Glow & Hydration',
                items: [
                    { name: 'Signature HydraFacial', price: '$195' },
                    { name: 'Face Cleansing', price: '$40' },
                    { name: 'Microdermabrasion', price: '$85' },
                    { name: 'Dermaplaning', price: '$75' },
                    { name: 'Custom Ritual Facial', price: '$110' },
                ]
            }
        ]
    },
    {
        id: 'clinical-care',
        title: 'Clinical Care',
        icon: '💉',
        image: 'https://images.unsplash.com/photo-1616391182219-e080b4d1042a?w=800&q=85&auto=format&fit=crop',
        sections: [
            {
                subtitle: 'Advanced Repair',
                items: [
                    { name: 'Medical Peel', price: '$120' },
                    { name: 'Micro-Needling (Individual)', price: '$175' },
                    { name: 'Micro-Needling (Course of 3)', price: '$400' },
                    { name: 'Dermal Rejuvenation', price: '$250' }
                ]
            }
        ]
    },
    {
        id: 'packages',
        title: 'Packages',
        icon: '🎁',
        image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&q=85&auto=format&fit=crop',
        sections: [
            {
                items: [
                    {
                        name: 'The Radiance Pack (Face + Neck)',
                        perSession: '$249.99',
                        sixSessions: '$1,199.99',
                        savings: 'Save $300'
                    },
                    {
                        name: 'The Full Transformation',
                        perSession: '$499.99',
                        sixSessions: '$2,499.99',
                        savings: 'Save $500'
                    }
                ],
                columns: ['Curated Pack', 'Per Session', '6-Session Course', 'Savings']
            }
        ]
    }
];

