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
        id: 'threading',
        title: 'Threading',
        icon: '🪡',
        image: 'https://images.unsplash.com/photo-1487412840181-b39ce5fa3ac9?w=800&q=85&auto=format&fit=crop',
        sections: [
            {
                items: [
                    { name: 'Eyebrow Threading',   price: '$4'  },
                    { name: 'Upper Lip Threading', price: '$3'  },
                    { name: 'Chin Threading',      price: '$3'  },
                    { name: 'Forehead Threading',  price: '$3'  },
                    { name: 'Full Face Threading', price: '$20' },
                ],
            },
        ],
    },
    {
        id: 'waxing',
        title: 'Waxing',
        icon: '🌿',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=85&auto=format&fit=crop',
        sections: [
            {
                subtitle: 'Regular Wax',
                items: [
                    { name: 'Eyebrow Wax',    price: '$8'   },
                    { name: 'Upper Lip Wax',  price: '$4'   },
                    { name: 'Chin Wax',       price: '$4'   },
                    { name: 'Face Sides Wax', price: '$8'   },
                    { name: 'Full Face Wax',  price: '$20'  },
                    { name: 'Underarms Wax',  price: '$7'   },
                    { name: 'Half Arms Wax',  price: '$15'  },
                    { name: 'Full Arms Wax',  price: '$20'  },
                    { name: 'Half Back Wax',  price: '$15'  },
                    { name: 'Full Back Wax',  price: '$25'  },
                    { name: 'Full Front Wax', price: '$15'  },
                    { name: 'Buttocks Wax',   price: '$10'  },
                    { name: 'Half Legs Wax',  price: '$20'  },
                    { name: 'Full Legs Wax',  price: '$30'  },
                    { name: 'Full Body Wax',  price: '$135' },
                ],
            },
            {
                subtitle: 'Nufree Organic Wax',
                items: [
                    { name: 'Upper Lip Nufree',       price: '$6'   },
                    { name: 'Chin Nufree',            price: '$6'   },
                    { name: 'Face Sides Nufree',      price: '$12'  },
                    { name: 'Full Face Nufree',       price: '$28'  },
                    { name: 'Underarms Nufree',       price: '$10'  },
                    { name: 'Half Arms Nufree',       price: '$30'  },
                    { name: 'Full Arms Nufree',       price: '$40'  },
                    { name: 'Bikini Line Nufree',     price: '$25'  },
                    { name: 'Extended Bikini Nufree', price: '$35'  },
                    { name: 'Brazilian Nufree',       price: '$50'  },
                    { name: 'Full Legs Nufree',       price: '$60'  },
                    { name: 'Full Body Nufree',       price: '$299' },
                ],
            },
            {
                subtitle: "Men's Waxing",
                items: [
                    { name: "Men's Half Arms",       price: '$30' },
                    { name: "Men's Half Lower Legs", price: '$40' },
                    { name: "Men's Chest Wax",       price: '$45' },
                    { name: "Men's Full Back Wax",   price: '$45' },
                ],
            },
        ],
    },
    {
        id: 'facial-treatments',
        title: 'Facial Treatments',
        icon: '✨',
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=85&auto=format&fit=crop',
        sections: [
            {
                subtitle: 'Facials & Glow',
                items: [
                    { name: 'Express Deep Cleansing Facial',  price: '$40'  },
                    { name: "Classic Fernanda's Facial",      price: '$60'  },
                    { name: 'Korean Glow Facial',             price: '$85'  },
                    { name: 'Skeyndor Essential Facial',      price: '$75'  },
                    { name: 'HydraFacial Treatment',          price: '$120' },
                    { name: 'Dermaplaning Facial',            price: '$75'  },
                    { name: 'Microdermabrasion Skin Renewal', price: '$99'  },
                    { name: 'Eyebrow Tint',                   price: '$10'  },
                ],
            },
            {
                subtitle: 'Advanced Treatments',
                items: [
                    { name: 'Radiance Brightening Facial',              price: '$130'         },
                    { name: 'Exosomes Anti-Aging Facial',               price: '$145'         },
                    { name: 'Microneedling (Collagen Induction Therapy)', price: '$175 / 3 for $400' },
                    { name: 'Skin Consultation',                        price: 'Free'         },
                ],
            },
        ],
    },
    {
        id: 'laser-hair-removal',
        title: 'Laser Treatments',
        icon: '⚡',
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
                    { name: 'Legs + Arms + Underarms',             price: '$899'   },
                    { name: 'Legs + Arms + Underarms + Brazilian', price: '$1,199' },
                ],
            },
        ],
    },
];
