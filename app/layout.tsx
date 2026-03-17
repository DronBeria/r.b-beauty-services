import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "R.D. Beauty & Laser Clinic | Advanced Laser & Skincare Treatments in Beaumont",
  description: "Welcome to R.D. Beauty & Laser Clinic — advanced laser hair removal, HydraFacials, microneedling, skin rejuvenation, and professional waxing. Serving Beaumont with modern equipment and personalized care.",
  keywords: "laser hair removal Beaumont, beauty clinic, skincare treatments, HydraFacial, microneedling, skin rejuvenation, professional waxing, R.D. Beauty",
  openGraph: {
    title: "R.D. Beauty & Laser Clinic | Beaumont",
    description: "Advanced Beauty & Laser Treatments for Men & Women in Beaumont.",
    url: "https://rdbeauty.ca",
    siteName: "R.D. Beauty & Laser Clinic",
    images: [{ url: "https://rdbeauty.ca/og-image.jpg" }],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "R.D. Beauty & Laser Clinic | Beaumont",
    description: "Advanced laser and beauty treatments with visible, lasting results.",
    images: ["https://rdbeauty.ca/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#A0134D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <body className="antialiased font-body bg-ivory text-charcoal min-h-screen selection:bg-deep-rose selection:text-white">
        {children}
      </body>
    </html>
  );
}
