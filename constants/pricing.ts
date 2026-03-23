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
    icon: string;
    image: string;
    sections: PricingSection[];
}

export interface PricingSection {
    subtitle?: string;
    items: PricingItem[];
    columns?: string[];
}

export const PRICING_DATA: PricingCategory[] = [
    {
        id: 'laser-hair-removal',
        title: 'Laser Treatments',
        icon: '✨',
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=85&auto=format&fit=crop',
        sections: [
            {
                subtitle: 'Small Areas',
                columns: ['Treatment', 'Per Session', '6-Session', 'Savings'],
                items: [
                    { name: 'Upper Lip',   perSession: '$35',       sixSessions: '$149',       savings: 'Save $61'   },
                    { name: 'Chin',        perSession: '$35 & up',  sixSessions: '$149 & up',  savings: 'Save $61+'  },
                    { name: 'Lip & Chin',  perSession: '$69',       sixSessions: '$299',       savings: 'Save $115'  },
                    { name: 'Neck',        perSession: '$39',       sixSessions: '$159',       savings: 'Save $75'   },
                    { name: 'Face Sides',  perSession: '$59',       sixSessions: '$249',       savings: 'Save $105'  },
                ],
            },
            {
                subtitle: 'Full Face',
                columns: ['Treatment', 'Per Session', '6-Session', 'Savings'],
                items: [
                    { name: 'Full Face',   perSession: '$120',      sixSessions: '$499',       savings: 'Save $221'  },
                ],
            },
            {
                subtitle: 'Upper Body',
                columns: ['Treatment', 'Per Session', '6-Session', 'Savings'],
                items: [
                    { name: 'Underarms',   perSession: '$35',       sixSessions: '$149',       savings: 'Save $61'   },
                    { name: 'Half Arms',   perSession: '$79',       sixSessions: '$299',       savings: 'Save $175'  },
                    { name: 'Full Arms',   perSession: '$99',       sixSessions: '$349',       savings: 'Save $245'  },
                    { name: 'Chest',       perSession: '$149',      sixSessions: '$599',       savings: 'Save $295'  },
                    { name: 'Shoulders',   perSession: '$99',       sixSessions: '$399',       savings: 'Save $195'  },
                    { name: 'Full Back',   perSession: '$149',      sixSessions: '$599',       savings: 'Save $295'  },
                    { name: 'Half Back',   perSession: '$99',       sixSessions: '$399',       savings: 'Save $195'  },
                    { name: 'Stomach',     perSession: '$99',       sixSessions: '$349',       savings: 'Save $245'  },
                ],
            },
            {
                subtitle: 'Lower Body',
                columns: ['Treatment', 'Per Session', '6-Session', 'Savings'],
                items: [
                    { name: 'Bikini Line', perSession: '$89',       sixSessions: '$349',       savings: 'Save $185'  },
                    { name: 'Brazilian',   perSession: '$129',      sixSessions: '$549',       savings: 'Save $225'  },
                    { name: 'Half Legs',   perSession: '$119',      sixSessions: '$499',       savings: 'Save $215'  },
                    { name: 'Full Legs',   perSession: '$159',      sixSessions: '$599',       savings: 'Save $355'  },
                ],
            },
            {
                subtitle: 'Full Body',
                columns: ['Treatment', 'Per Session', '6-Session', 'Savings'],
                items: [
                    { name: 'Full Body',   perSession: '$599',      sixSessions: '$1,999',     savings: 'Save $1,595' },
                ],
            },
            {
                subtitle: 'Popular Packages',
                items: [
                    { name: 'Legs + Arms + Underarms',              price: '$899'   },
                    { name: 'Legs + Arms + Underarms + Brazilian',  price: '$1,199' },
                ],
            },
        ],
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
                    { name: 'Signature HydraFacial',  price: '$195' },
                    { name: 'Face Cleansing',          price: '$40'  },
                    { name: 'Microdermabrasion',        price: '$85'  },
                    { name: 'Dermaplaning',             price: '$75'  },
                    { name: 'Custom Ritual Facial',    price: '$110' },
                ],
            },
        ],
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
                    { name: 'Medical Peel',                    price: '$120' },
                    { name: 'Micro-Needling (Individual)',     price: '$175' },
                    { name: 'Micro-Needling (Course of 3)',   price: '$400' },
                    { name: 'Dermal Rejuvenation',             price: '$250' },
                ],
            },
        ],
    },
    {
        id: 'packages',
        title: 'Packages',
        icon: '🎁',
        image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&q=85&auto=format&fit=crop',
        sections: [
            {
                columns: ['Curated Pack', 'Per Session', '6-Session Course', 'Savings'],
                items: [
                    {
                        name: 'The Radiance Pack (Face + Neck)',
                        perSession: '$249.99',
                        sixSessions: '$1,199.99',
                        savings: 'Save $300',
                    },
                    {
                        name: 'The Full Transformation',
                        perSession: '$499.99',
                        sixSessions: '$2,499.99',
                        savings: 'Save $500',
                    },
                ],
            },
        ],
    },
];
