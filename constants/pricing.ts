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
        title: 'Laser Hair Removal',
        icon: '✨',
        image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1200&auto=format&fit=crop',
        sections: [
            {
                items: [
                    { name: 'Lip', perSession: '$35', sixSessions: '$149.99', savings: 'Save $60' },
                    { name: 'Chin', perSession: '$35 & Up', sixSessions: '$149.99 & Up', savings: 'Save $60' },
                    { name: 'Lip & Chin', perSession: '$69.99', sixSessions: '$299.99', savings: 'Save $120' },
                    { name: 'Neck', perSession: '$39.99', sixSessions: '$159.99', savings: 'Save $80' },
                    { name: 'Full Face', perSession: '$120', sixSessions: '$499.99', savings: 'Save $220' },
                    { name: 'Under Arm', perSession: '$35', sixSessions: '$149.99', savings: 'Save $60' },
                    { name: 'Full Arm', perSession: '$99.99', sixSessions: '$349.99', savings: 'Save $250' },
                    { name: 'Half Arm', perSession: '$79.99', sixSessions: '$299.99', savings: 'Save $180' },
                    { name: 'Legs (Full)', perSession: '$159.99', sixSessions: '$599.99', savings: 'Save $360' },
                    { name: 'Half Legs', perSession: '$119.99', sixSessions: '$499.99', savings: 'Save $220' },
                    { name: 'Bikini Line', perSession: '$89.99', sixSessions: '$349.99', savings: 'Save $190' },
                    { name: 'Brazilian', perSession: '$129.99', sixSessions: '$549.99', savings: 'Save $230' },
                    { name: 'Chest', perSession: '$149.99', sixSessions: '$599.99', savings: 'Save $300' },
                    { name: 'Shoulders', perSession: '$99.99', sixSessions: '$399.99', savings: 'Save $200' },
                    { name: 'Full Back', perSession: '$149.99', sixSessions: '$599.99', savings: 'Save $300' },
                    { name: 'Half Back', perSession: '$99.99', sixSessions: '$399.99', savings: 'Save $200' },
                    { name: 'Stomach', perSession: '$99.99', sixSessions: '$349.99', savings: 'Save $350' },
                    { name: 'Buttocks', perSession: '$89.99', sixSessions: '$349.99', savings: 'Save $190' },
                    { name: 'Face Sides', perSession: '$59.99', sixSessions: '$249.99', savings: 'Save $110' },
                    { name: 'Full Body', perSession: '$599.99', sixSessions: '$1,999.99', savings: 'Save $1,600' },
                ],
                columns: ['Treatment Area', 'Per Session', '6-Session Package', 'Savings']
            }
        ]
    },
    {
        id: 'laser-combos',
        title: 'Laser Combo Packages',
        icon: '🎁',
        image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1200&auto=format&fit=crop',
        sections: [
            {
                items: [
                    {
                        name: 'Legs + Arms + Underarm',
                        perSession: '$249.99',
                        sixSessions: '$899.99',
                        savings: 'Save $300'
                    },
                    {
                        name: 'Legs + Arms + Underarm + Bikini',
                        perSession: '$349.99 – $399.99',
                        sixSessions: '$1,199.99',
                        savings: 'Save $1,100'
                    }
                ],
                columns: ['Combo Package', 'Per Session', '6-Session Package', 'Savings']
            }
        ]
    },
    {
        id: 'threading',
        title: 'Threading',
        icon: '🪡',
        image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=1200&auto=format&fit=crop',
        sections: [
            {
                subtitle: 'Threading Services',
                items: [
                    { name: 'Eyebrows', price: '$4' },
                    { name: 'Upper Lip', price: '$3' },
                    { name: 'Chin', price: '$3' },
                    { name: 'Forehead', price: '$3' },
                    { name: 'Side', price: '$8' },
                    { name: 'Full Face', price: '$20 & Up' }
                ]
            }
        ]
    },
    {
        id: 'waxing',
        title: 'Waxing',
        icon: '🌸',
        image: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?q=80&w=1200&auto=format&fit=crop',
        sections: [
            {
                subtitle: 'Regular Wax',
                items: [
                    { name: 'Upper Lip', price: '$4' },
                    { name: 'Forehead', price: '$4' },
                    { name: 'Chin', price: '$4 & Up' },
                    { name: 'Side', price: '$8' },
                    { name: 'Full Face', price: '$20 & Up' },
                    { name: 'Full Arms', price: '$20' },
                    { name: 'Half Arms', price: '$15' },
                    { name: 'Full Legs', price: '$30' },
                    { name: 'Half Legs', price: '$20' },
                    { name: 'Underarms', price: '$7' },
                    { name: 'Full Back', price: '$25' },
                    { name: 'Half Back', price: '$15' },
                    { name: 'Full Front', price: '$25' },
                    { name: 'Half Front', price: '$15' },
                    { name: 'Butt', price: '$10' },
                    { name: 'Full Body', price: '$135' }
                ]
            },
            {
                subtitle: 'Nupree Wax',
                items: [
                    { name: 'Eyebrow', price: '$8' },
                    { name: 'Upper Lip', price: '$6' },
                    { name: 'Chin', price: '$6 & Up' },
                    { name: 'Side', price: '$12' },
                    { name: 'Full Face', price: '$28 & Up' },
                    { name: 'Full Arms', price: '$40' },
                    { name: 'Half Arms', price: '$25' },
                    { name: 'Full Legs', price: '$60' },
                    { name: 'Half Legs', price: '$40' },
                    { name: 'Full Body', price: '$299' },
                    { name: 'Brazillian', price: '$50' },
                    { name: 'Bikini Line', price: '$25' }
                ]
            }
        ]
    },
    {
        id: 'facial-body',
        title: 'Facial & Body Treatments',
        icon: '🧴',
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop',
        sections: [
            {
                subtitle: 'Face & Body',
                items: [
                    { name: 'Face Cleansing', price: '$40' },
                    { name: 'Basic Facial', price: '$60' },
                    { name: 'Microdermabrasion', price: '$85' },
                    { name: 'Dermaplaning', price: '$75' },
                    { name: 'R.D. Signature Custom Facial', price: '$110' },
                    { name: 'Vajaical', price: '$50' },
                    { name: 'Butt Treatment', price: '$50' },
                    { name: 'Full Body Bleach', price: '$90' }
                ]
            }
        ]
    },
    {
        id: 'hair-services',
        title: 'Hair Services',
        icon: '💇',
        image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=1200&auto=format&fit=crop',
        sections: [
            {
                subtitle: 'Hair Services',
                items: [
                    { name: 'Hair Wash', price: '$15' },
                    { name: 'Hair Wash & Style', price: '$55 & Up' },
                    { name: 'Hair Oil Massage (20 min)', price: '$30' },
                    { name: 'Hair Spa', price: '$55' }
                ]
            }
        ]
    },
    {
        id: 'massage',
        title: 'Massage',
        icon: '🤲',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop',
        sections: [
            {
                subtitle: 'Massage Services',
                items: [
                    { name: 'Full Body (45 min)', price: '$60' },
                    { name: 'Back & Shoulder (30 min)', price: '$45' },
                    { name: 'Legs & Feet (30 min)', price: '$45' }
                ]
            }
        ]
    },
    {
        id: 'microneedling',
        title: 'Micro-Needling',
        icon: '💉',
        image: 'https://images.unsplash.com/photo-1616391182219-e080b4d1043a?q=80&w=1200&auto=format&fit=crop',
        sections: [
            {
                subtitle: 'Micro-Needling',
                items: [
                    { name: '1 Treatment', price: '$175' },
                    { name: 'Buy 3 Treatments', price: '$400' }
                ]
            }
        ]
    },
    {
        id: 'mens-services',
        title: 'Men\'s Services',
        icon: '👔',
        image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1200&auto=format&fit=crop',
        sections: [
            {
                subtitle: 'Men\'s Services',
                items: [
                    { name: 'Eyebrows', price: '$6' },
                    { name: 'Face', price: '$20' },
                    { name: 'Half Arms', price: '$30' },
                    { name: 'Half Lower Legs', price: '$40' },
                    { name: 'Chest', price: '$45' },
                    { name: 'Full Back', price: '$45' },
                    { name: 'Basic Facial', price: '$75' },
                    { name: 'Cleansing', price: '$50' },
                    { name: 'Microderma', price: '$95' }
                ]
            }
        ]
    },
    {
        id: 'addons',
        title: 'Add-Ons',
        icon: '⭐',
        image: 'https://images.unsplash.com/photo-1512496011951-a6994413c2ae?q=80&w=1200&auto=format&fit=crop',
        sections: [
            {
                subtitle: 'Treatment Add-Ons',
                items: [
                    { name: 'Jelly Mask', price: '$15' },
                    { name: 'LED Therapy', price: '$10' },
                    { name: 'High Frequency', price: '$10' }
                ]
            }
        ]
    }
];
