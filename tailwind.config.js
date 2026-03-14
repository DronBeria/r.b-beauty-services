/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'deep-rose': '#C2185B',
                'deep-rose-light': '#E91E6B',
                'deep-rose-dark': '#9A1248',
                'blush-pink': '#FCE4EC',
                'blush-pink-light': '#FFF0F5',
                'warm-gold': '#B8860B',
                'warm-gold-light': '#D4A223',
                'ivory': '#FFFBF8',
                'charcoal': '#1A1A2E',
                'charcoal-light': '#2D2D44',
                'soft-gray': '#757575',
                'soft-gray-light': '#9E9E9E',
            },
            fontFamily: {
                display: ['var(--font-cormorant)', 'serif'],
                body: ['var(--font-outfit)', 'sans-serif'],
                sans: ['var(--font-inter)', 'sans-serif'],
            },
            boxShadow: {
                'premium': '0 20px 50px rgba(0, 0, 0, 0.05)',
                'glass': '0 8px 32px 0 rgba(194, 24, 91, 0.1)',
            },
            transitionTimingFunction: {
                'expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
            },
        },
    },
    plugins: [],
};
