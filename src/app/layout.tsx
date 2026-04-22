import type { Metadata } from "next";
import { Space_Grotesk, Inter, Noto_Sans_Devanagari, Space_Mono } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const notoHindi = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600"],
  variable: "--font-noto-hindi",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saarthi — Training that guides",
  description:
    "The modern training platform for India's uniformed services. Live sessions, scenario simulators, and compliance analytics — in one command center.",
  metadataBase: new URL("https://saarthi.gov.in"),
  openGraph: {
    title: "Saarthi — सारथी",
    description:
      "AI-powered training for Mumbai Police and India's uniformed services. Bilingual, on-prem ready, built in India.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${notoHindi.variable} ${spaceMono.variable}`}
    >
      <body className="font-body text-white antialiased">
        {/* Sitewide backdrop: navy base + single gold radial, viewport-centered.
            Fixed so it stays anchored to the viewport as the user scrolls —
            one uniform gradient across the entire site, no competing layers. */}
        <div className="fixed inset-0 -z-10 bg-[#0E1628]" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle 1200px at 50% 50%, rgba(212,175,55,0.32), transparent 70%)",
            }}
          />
        </div>
        <SmoothScrollProvider>
          <main className="overflow-x-clip">{children}</main>
        </SmoothScrollProvider>
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
