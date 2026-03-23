/** @type {import('next').NextConfig} */
const nextConfig = {
    compress: true,
    poweredByHeader: false,

    // Tree-shake lucide-react — cuts JS bundle by ~70-100kb
    experimental: {
        optimizePackageImports: ['lucide-react'],
    },

    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'images.unsplash.com' },
            { protocol: 'https', hostname: 'plus.unsplash.com' },
        ],
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 604800, // 7 days
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256],
    },

    eslint: { ignoreDuringBuilds: true },
    typescript: { ignoreBuildErrors: true },

    async headers() {
        return [
            {
                // Next.js static chunks — immutable, cache 1 year
                source: '/_next/static/:path*',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
                ],
            },
            {
                // Static files in /public — cache 1 year
                source: '/:path(.*\\.(?:ico|png|jpg|jpeg|svg|webp|avif|woff2|woff))',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
                ],
            },
            {
                // All routes — security + performance hints
                source: '/:path*',
                headers: [
                    { key: 'X-Content-Type-Options',   value: 'nosniff' },
                    { key: 'X-Frame-Options',           value: 'SAMEORIGIN' },
                    { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
                    { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=()' },
                    { key: 'X-DNS-Prefetch-Control',    value: 'on' },
                    { key: 'Vary',                      value: 'Accept-Encoding' },
                ],
            },
        ];
    },
};

export default nextConfig;
