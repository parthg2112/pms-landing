"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

type Stat = {
  value: string;
  label: string;
  sub: string;
  target: number;
  format: (n: number) => string;
};

const stats: Stat[] = [
  {
    value: "2,400+",
    label: "Officers onboarded in pilot",
    sub: "across 18 precincts",
    target: 2400,
    format: (n) => `${Math.round(n).toLocaleString("en-IN")}+`,
  },
  {
    value: "12",
    label: "Live scenario templates",
    sub: "6 more in review",
    target: 12,
    format: (n) => `${Math.round(n)}`,
  },
  {
    value: "180 hrs",
    label: "Training delivered this quarter",
    sub: "Q1 · 2026",
    target: 180,
    format: (n) => `${Math.round(n)} hrs`,
  },
  {
    value: "94%",
    label: "Module completion rate",
    sub: "vs. 42% classroom baseline",
    target: 94,
    format: (n) => `${Math.round(n)}%`,
  },
];

export function Stats() {
  const rootRef = useRef<HTMLElement>(null);
  const valueRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      valueRefs.current.forEach((el, i) => {
        if (el) el.textContent = stats[i].value;
      });
      return;
    }

    const ctx = gsap.context(() => {
      valueRefs.current.forEach((el, i) => {
        if (!el) return;
        const stat = stats[i];
        const obj = { n: 0 };
        gsap.to(obj, {
          n: stat.target,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = stat.format(obj.n);
          },
          onComplete: () => {
            el.textContent = stat.value;
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="security"
      className="relative bg-transparent section-pad"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="section-num">
        <span className="text-[#D4AF37]">06</span>
        <span className="text-white/20"> / 09</span>
      </div>
      <div className="relative mx-auto max-w-6xl">
        <AnimatedSection
          as="div"
          className="glass-navy relative overflow-hidden rounded-3xl p-12 md:p-16"
        >
          <div
            className="pointer-events-none absolute -inset-1 opacity-40"
            aria-hidden="true"
            style={{
              background:
                "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(212,175,55,0.3) 40deg, transparent 80deg, transparent 360deg)",
              animation: "beam-spin 18s linear infinite",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              padding: "1px",
              borderRadius: "inherit",
            }}
          />
          <div className="relative grid grid-cols-2 gap-8 text-center lg:grid-cols-4 lg:gap-4">
            {stats.map(({ value, label, sub }, i) => (
              <AnimatedItem key={label}>
                <div className="relative flex h-full flex-col items-center">
                  {i > 0 && (
                    <div
                      aria-hidden
                      className="absolute -left-2 top-1/2 hidden h-16 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent lg:block"
                    />
                  )}
                  <p className="text-gold-gradient flex h-16 items-center whitespace-nowrap font-display text-5xl font-medium leading-none tabular-nums tracking-tight md:h-20 md:text-6xl">
                    <span
                      ref={(el) => {
                        valueRefs.current[i] = el;
                      }}
                    >
                      {value}
                    </span>
                  </p>
                  <p className="mt-5 flex h-8 items-start font-mono text-xs uppercase tracking-[0.2em] text-white/60">
                    {label}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                    {sub}
                  </p>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
