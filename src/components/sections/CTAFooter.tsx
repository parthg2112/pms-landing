"use client";

import { useEffect, useState } from "react";
import { ArrowUpRightIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import {
  Home,
  LayoutGrid,
  Sparkles,
  ShieldCheck,
  Languages,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ChakraMark } from "@/components/ui/ChakraMark";
import { GlassDock } from "@/components/ui/glass-dock";

const dockItems = [
  { title: "Top", icon: Home, onClick: () => scrollToId("hero") },
  { title: "Platform", icon: LayoutGrid, onClick: () => scrollToId("platform") },
  { title: "Scenarios", icon: Sparkles, onClick: () => scrollToId("scenarios") },
  { title: "Security", icon: ShieldCheck, onClick: () => scrollToId("security") },
  { title: "Bilingual", icon: Languages, onClick: () => scrollToId("bilingual") },
  { title: "Contact", icon: Mail, onClick: () => scrollToId("contact") },
];

function scrollToId(id: string) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Hand-tuned stagger for the 4 traveling ray pulses — spread so no two start
// together and the loop feels "occasional" rather than metronomic.
const PULSES = [
  { rayIndex: 2, dur: 5.2, begin: 0 },
  { rayIndex: 6, dur: 6.1, begin: 1.8 },
  { rayIndex: 10, dur: 5.6, begin: 3.4 },
  { rayIndex: 14, dur: 6.8, begin: 5.1 },
];

export function CTAFooter() {
  const [animatePulses, setAnimatePulses] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setAnimatePulses(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-transparent"
      style={{ minHeight: 600 }}
    >
      <div className="section-num">
        <span className="text-[#D4AF37]">09</span>
        <span className="text-white/20"> / 09</span>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-25" />

      {/* horizon rays — perspective fan radiating outward from above-center.
          Different motif from the hero chakra so the footer reads fresh while
          staying brand-consistent (navy + gold only). */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="footer-ray" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="rgba(212,175,55,0)" />
            <stop offset="35%" stopColor="rgba(212,175,55,0.18)" />
            <stop offset="65%" stopColor="rgba(212,175,55,0.22)" />
            <stop offset="100%" stopColor="rgba(212,175,55,0)" />
          </linearGradient>
          <radialGradient id="footer-anchor" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(212,175,55,0.55)" />
            <stop offset="60%" stopColor="rgba(212,175,55,0.08)" />
            <stop offset="100%" stopColor="rgba(212,175,55,0)" />
          </radialGradient>
          {/* streak gradient — fades in/out along the streak's long axis so
              the light trail has no hard edges */}
          <linearGradient id="pulse-streak" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="rgba(212,175,55,0)" />
            <stop offset="30%" stopColor="rgba(232,200,100,0.75)" />
            <stop offset="55%" stopColor="rgba(244,215,107,0.95)" />
            <stop offset="75%" stopColor="rgba(232,200,100,0.55)" />
            <stop offset="100%" stopColor="rgba(212,175,55,0)" />
          </linearGradient>
          <filter id="pulse-bloom" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <style>
          {`
            @keyframes footer-bulb-flicker {
              0%   { opacity: 1;    }
              12%  { opacity: 0.55; }
              19%  { opacity: 0.95; }
              27%  { opacity: 0.4;  }
              34%  { opacity: 1;    }
              47%  { opacity: 0.7;  }
              58%  { opacity: 1;    }
              76%  { opacity: 0.45; }
              88%  { opacity: 0.9;  }
              100% { opacity: 1;    }
            }
            @keyframes footer-bulb-breath {
              0%, 100% { r: 18; }
              50%      { r: 22; }
            }
            .footer-bulb {
              animation: footer-bulb-flicker 5.2s ease-in-out infinite;
              transform-origin: center;
            }
            .footer-bulb-glow {
              animation:
                footer-bulb-flicker 5.2s ease-in-out infinite -1.3s,
                footer-bulb-breath 6.4s ease-in-out infinite;
              transform-origin: center;
            }
            @media (prefers-reduced-motion: reduce) {
              .footer-bulb, .footer-bulb-glow { animation: none; }
            }
          `}
        </style>

        {/* 17 rays fanning from (600, -120) outward through the lower half */}
        {Array.from({ length: 17 }).map((_, i) => {
          const t = (i - 8) / 8;
          const dx = t * 1500;
          return (
            <line
              key={i}
              x1={600}
              y1={-120}
              x2={600 + dx}
              y2={900}
              stroke="url(#footer-ray)"
              strokeWidth={i === 8 ? 1.4 : 0.7}
              opacity={i === 8 ? 0.85 : 0.55 - Math.abs(t) * 0.15}
            />
          );
        })}

        {/* horizon hairline with gold node */}
        <line
          x1={0}
          y1={420}
          x2={1200}
          y2={420}
          stroke="rgba(212,175,55,0.18)"
          strokeWidth={0.6}
        />
        <line
          x1={440}
          y1={420}
          x2={760}
          y2={420}
          stroke="rgba(212,175,55,0.5)"
          strokeWidth={0.9}
        />
        <circle
          className="footer-bulb"
          cx={600}
          cy={420}
          r={3}
          fill="#D4AF37"
        />
        <circle
          className="footer-bulb-glow"
          cx={600}
          cy={420}
          r={18}
          fill="url(#footer-anchor)"
        />

        {/* coordinate tick marks along horizon */}
        {[300, 420, 540, 660, 780, 900].map((x) => (
          <line
            key={x}
            x1={x}
            y1={415}
            x2={x}
            y2={425}
            stroke="rgba(212,175,55,0.35)"
            strokeWidth={0.6}
          />
        ))}

        {/* traveling streaks — slim gold rectangles that ride a spread of
            rays, long axis aligned with the ray direction. Subtle, feels like
            a sweep of light along a single lane rather than a pixel dot. */}
        {animatePulses &&
          PULSES.map(({ rayIndex, dur, begin }) => {
            const t = (rayIndex - 8) / 8;
            const dx = t * 1500;
            const path = `M 600 -120 L ${600 + dx} 900`;
            const STREAK_LEN = 70;
            const STREAK_THICK = 3.2;
            return (
              <g key={rayIndex} filter="url(#pulse-bloom)">
                <rect
                  x={-STREAK_LEN / 2}
                  y={-STREAK_THICK / 2}
                  width={STREAK_LEN}
                  height={STREAK_THICK}
                  rx={STREAK_THICK / 2}
                  fill="url(#pulse-streak)"
                  opacity={0}
                >
                  <animateMotion
                    dur={`${dur}s`}
                    begin={`${begin}s`}
                    repeatCount="indefinite"
                    path={path}
                    rotate="auto"
                  />
                  <animate
                    attributeName="opacity"
                    dur={`${dur}s`}
                    begin={`${begin}s`}
                    repeatCount="indefinite"
                    values="0; 0.85; 0.85; 0"
                    keyTimes="0; 0.18; 0.82; 1"
                  />
                </rect>
              </g>
            );
          })}
      </svg>

      {/* soft gold ambient wash under the CTA — anchors the CTA block without
          competing with the rays */}
      <div
        className="pointer-events-none absolute inset-x-0 top-[22%] h-[60%]"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(212,175,55,0.08), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-6 pb-16 pt-32 text-center md:px-16">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
          Ready to serve?
        </p>
        <h2 className="mt-5 text-balance font-display text-5xl font-medium leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
          Your next training cycle
          <br />
          starts here.
        </h2>
        <p className="mx-auto mt-6 max-w-xl font-body text-sm font-light leading-relaxed text-white/60 md:text-base">
          Book a 30-minute demo. We&apos;ll show you Saarthi running live —
          with your department&apos;s modules loaded in before the call.
        </p>

        <div className="mt-40 flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary">
            Request a demo
            <ArrowUpRightIcon className="h-4 w-4 stroke-[2.5]" />
          </Button>
          <Button variant="secondary">
            Download the brochure
            <ArrowDownTrayIcon className="h-4 w-4 stroke-[2.5]" />
          </Button>
        </div>

        <div className="mt-10 inline-flex items-center gap-2">
          <span className="animate-pulse-dot inline-block h-2 w-2 rounded-full bg-[#D4AF37]" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/50">
            Currently piloting with Mumbai Police
          </span>
        </div>

      </div>

      {/* GlassDock — command-center quick-jump chrome */}
      <div className="relative mt-20 flex flex-col items-center gap-4 px-6">
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-white/20" />
          <span>Quick jump · त्वरित</span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-white/20" />
        </div>
        <GlassDock items={dockItems} />
      </div>

      <footer className="relative mt-10 border-t border-white/[0.06] pb-10 pt-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-6 md:flex-row md:justify-between md:gap-0 md:px-10">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
            <ChakraMark size={14} />
            <span>© 2026 VisionRise Technosoft Pvt. Ltd.</span>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {["Privacy", "Security", "Accessibility", "Contact"].map((l) => (
              <a
                key={l}
                href="#"
                className="font-display text-xs text-white/40 transition-colors hover:text-white/70"
              >
                {l}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
            <span>Built in Mumbai · Made in India</span>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
          </div>
        </div>
      </footer>
    </section>
  );
}
