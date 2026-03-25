import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import WhatsAppButton from '../components/WhatsAppButton';

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const SITE_URL = "https://rdbeauty.ca";
const SITE_NAME = "R.D. Beauty & Laser Clinic";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "R.D. Beauty & Laser Clinic | Beaumont, Alberta",
    template: "%s | R.D. Beauty & Laser Clinic",
  },
  description:
    "R.D. Beauty & Laser Clinic in Beaumont, Alberta — advanced laser hair removal, HydraFacials, microneedling, threading, waxing & skin rejuvenation. Book online today.",
  keywords: [
    "laser hair removal Beaumont",
    "laser hair removal Beaumont Alberta",
    "beauty clinic Beaumont Alberta",
    "HydraFacial Beaumont",
    "microneedling Beaumont",
    "threading Beaumont",
    "waxing Beaumont Alberta",
    "skin treatment Alberta",
    "facial Beaumont",
    "dermaplaning Beaumont",
    "Nufree waxing Alberta",
    "R.D. Beauty",
    "beauty salon Beaumont",
    "laser clinic near Edmonton",
    "laser clinic Alberta",
    "Brazilian laser Beaumont",
    "book beauty appointment Beaumont",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Beauty & Wellness",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "R.D. Beauty & Laser Clinic | Beaumont, Alberta",
    description:
      "Advanced laser hair removal, HydraFacials, threading & more — beautifully crafted for your unique skin in Beaumont, Alberta.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "R.D. Beauty & Laser Clinic — Beaumont Alberta",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "R.D. Beauty & Laser Clinic | Beaumont, Alberta",
    description:
      "Advanced laser and beauty treatments with visible, lasting results — Beaumont, Alberta.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your Google Search Console verification token here when ready
    // google: "your-verification-token",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#A0134D",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: SITE_NAME,
  image: `${SITE_URL}/og-image.jpg`,
  description:
    "Advanced laser hair removal, HydraFacials, microneedling, threading, and waxing services in Beaumont, Alberta.",
  url: SITE_URL,
  telephone: "+16478904871",
  email: "info@rbbeauty.ca",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "3913 49 Ave",
    addressLocality: "Beaumont",
    addressRegion: "Alberta",
    postalCode: "T4X 1Y7",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 53.357,
    longitude: -113.414,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "11:00",
      closes: "19:00",
    },
  ],
  hasMap: `https://www.openstreetmap.org/?mlat=53.357&mlon=-113.414#map=15/53.357/-113.414`,
  sameAs: [],
  servesCuisine: [],
  currenciesAccepted: "CAD",
  paymentAccepted: "Cash, Credit Card, Debit Card",
  areaServed: [
    { "@type": "City", name: "Beaumont" },
    { "@type": "City", name: "Edmonton" },
    { "@type": "AdministrativeArea", name: "Alberta" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Beauty & Laser Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Laser Hair Removal" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "HydraFacial" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Microneedling" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Threading" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Waxing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dermaplaning" } },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        {/*
          next/font self-hosts Google Fonts — no need to preconnect to fonts.googleapis.com.
          Preconnect only to domains that are actually hit at runtime.
        */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://app.squareup.com" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//app.squareup.com" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />

        {/* Mobile web app */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="R.D. Beauty" />
        <meta name="format-detection" content="telephone=no" />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="antialiased font-body bg-ivory text-charcoal min-h-screen selection:bg-deep-rose selection:text-white">
        <WhatsAppButton />
        {children}
      </body>
    </html>
  );
}
