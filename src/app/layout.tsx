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
        {/* Sitewide backdrop — gold-aurora + subtle diagonal hatch.
            Fixed so it stays anchored to the viewport as the user scrolls.
            Two layers: (1) cosmic aurora (radials + inset edge-glows +
            soft-light blend) gives the page warmth and cinematic framing;
            (2) faint gold crosshatch adds fine grain so the backdrop
            doesn't read as dead space. */}
        <div className="fixed inset-0 -z-10 bg-[#16213d]" aria-hidden="true">
          {/* gold-aurora wash — edge-only, very subtle. Navy base + two
              narrow inset side-glows that die off well before center. */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, #1a2747 0%, #16213d 100%)",
              boxShadow: [
                "inset 80px 0 120px -40px rgba(212,175,55,0.05)",
                "inset -80px 0 120px -40px rgba(212,175,55,0.05)",
              ].join(", "),
            }}
          />
          {/* diagonal gold crosshatch — barely-there texture */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: [
                "repeating-linear-gradient(45deg, rgba(212,175,55,0.03) 0, rgba(212,175,55,0.03) 1px, transparent 1px, transparent 22px)",
                "repeating-linear-gradient(-45deg, rgba(212,175,55,0.02) 0, rgba(212,175,55,0.02) 1px, transparent 1px, transparent 22px)",
              ].join(", "),
              backgroundSize: "44px 44px",
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
