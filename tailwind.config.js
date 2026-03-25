/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'deep-rose': '#A0134D',
                'deep-rose-light': '#C2185B',
                'deep-rose-dark': '#7A0F3D',
                'blush-pink': '#F8EDF0',
                'blush-pink-light': '#FDF6F8',
                'warm-gold': '#9A7B4F',
                'warm-gold-light': '#B8956A',
                'champagne': '#E8DCC8',
                'ivory': '#FBF8F5',
                'charcoal': '#0F0E12',
                'charcoal-light': '#1C1B21',
                'soft-gray': '#6B6B75',
                'soft-gray-light': '#8E8E98',
            },
            fontFamily: {
                display: ['var(--font-playfair)', 'Georgia', 'serif'],
                body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
                sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
            },
            letterSpacing: {
                'luxury': '0.02em',
                'elegant': '0.08em',
                'wide-luxury': '0.2em',
            },
            boxShadow: {
                'premium': '0 24px 64px rgba(15, 14, 18, 0.08)',
                'glass': '0 8px 32px rgba(160, 19, 77, 0.06)',
                'soft': '0 4px 24px rgba(15, 14, 18, 0.04)',
            },
            transitionTimingFunction: {
                'expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
                'ease-luxury': 'cubic-bezier(0.4, 0, 0.2, 1)',
            },
            animation: {
                'spin-slow':    'spin 28s linear infinite',
                'pulse-soft':   'pulseSoft 4s ease-in-out infinite',
                'float':        'float 6s ease-in-out infinite',
            },
            keyframes: {
                pulseSoft: {
                    '0%, 100%': { opacity: '1' },
                    '50%':      { opacity: '0.5' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%':      { transform: 'translateY(-12px)' },
                },
            },
        },
    },
    plugins: [],
};
