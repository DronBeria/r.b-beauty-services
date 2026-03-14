import type { Metadata, Viewport } from "next";
import { Inter, Outfit, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant"
});

export const metadata: Metadata = {
  title: "R.B Beauty Services | Best Laser Clinic & Beauty Studio in Canada",
  description: "Reveal your most radiant self with premium laser hair removal, facial treatments, and skincare. 500+ happy clients. Certified professionals. Advanced technology.",
  keywords: "laser hair removal Canada, beauty clinic Toronto, skincare treatments, HydraFacial, IPL Photofacial, microneedling",
  openGraph: {
    title: "R.B Beauty Services | Reveal Your Most Radiant Self",
    description: "Premium laser & beauty treatments in Canada — crafted for you.",
    url: "https://rbbeauty.ca",
    siteName: "R.B Beauty Services",
    images: [{ url: "https://rbbeauty.ca/og-image.jpg" }],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "R.B Beauty Services | Laser Clinic Canada",
    description: "Premium beauty and laser treatments with clinical precision.",
    images: ["https://rbbeauty.ca/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#C2185B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${cormorant.variable}`}>
      <body className="antialiased font-body bg-ivory text-charcoal min-h-screen selection:bg-deep-rose selection:text-white">
        {children}
      </body>
    </html>
  );
}
