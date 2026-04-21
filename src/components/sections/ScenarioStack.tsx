"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionBadge } from "@/components/ui/SectionBadge";

const scenarios = [
  {
    id: 1,
    category: "Behavioral",
    title: "De-escalation Drill",
    body: "An agitated citizen is shouting at your thana counter. Talk them down without escalating.",
    tier: "Tier II",
  },
  {
    id: 2,
    category: "Investigative",
    title: "Witness Interview",
    body: "A reluctant witness. Extract a clean statement without a single leading question.",
    tier: "Tier II",
  },
  {
    id: 3,
    category: "Legal",
    title: "BNSS Procedural Quiz",
    body: "A senior IO cross-examines you on section citations during a case-file review.",
    tier: "Tier III",
  },
  {
    id: 4,
    category: "Communications",
    title: "Media Briefing",
    body: "A hostile journalist wants a quote on a sub-judice matter. Hold the line.",
    tier: "Tier III",
  },
  {
    id: 5,
    category: "Public Service",
    title: "Community Liaison",
    body: "A resident walks in with a grievance that's more personal than procedural. Listen well.",
    tier: "Tier I",
  },
  {
    id: 6,
    category: "Emergency",
    title: "First Responder Triage",
    body: "Multiple injured at an accident scene. Sequence the first 90 seconds.",
    tier: "Tier III",
  },
];

const CYCLE_MS = 5200;

export function ScenarioStack() {
  const [active, setActive] = useState(0);
  const hovering = useRef(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tick = window.setInterval(() => {
      if (!hovering.current) setActive((i) => (i + 1) % scenarios.length);
    }, CYCLE_MS);
    return () => window.clearInterval(tick);
  }, []);

  // flashlight hover via direct DOM
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    const onEnter = () => {
      hovering.current = true;
      el.style.setProperty("--flashlight", "1");
    };
    const onLeave = () => {
      hovering.current = false;
      el.style.setProperty("--flashlight", "0");
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const current = scenarios[active];

  return (
    <section
      id="scenarios"
      className="relative bg-[#0A0E1A] section-pad"
      style={{ minHeight: 900 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-25" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.08), transparent 70%)",
        }}
      />

      <div className="section-num">
        <span className="text-[#D4AF37]">04</span>
        <span className="text-white/20"> / 09</span>
      </div>
      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <SectionBadge className="mb-5" hindi="अभ्यास">Scenario Simulator</SectionBadge>
          <h2 className="font-display text-4xl font-medium leading-[0.95] tracking-tight text-white md:text-5xl lg:text-6xl">
            Real drills. Without the risk.
          </h2>
          <p className="mt-6 max-w-xl font-body text-sm font-light leading-relaxed text-white/60 md:text-base">
            Gemini-powered role-play. De-escalation at the counter. Hostile
            reporter at a presser. BNSS procedural quiz. Officers practice what
            policy can&apos;t teach on paper.
          </p>
        </div>

        <div className="relative mt-20 grid grid-cols-1 items-center gap-16 lg:grid-cols-[1fr,auto]">
          {/* card stack */}
          <div className="relative mx-auto flex h-[340px] w-full max-w-[480px] items-center justify-center">
            {scenarios.map((s, i) => {
              const offset = (i - active + scenarios.length) % scenarios.length;
              // offset 0 = front, 1 = mid, 2 = back, rest hidden
              const zIndex = 10 - offset;
              let translateY = 0;
              let scale = 1;
              let blur = 0;
              let opacity = 1;

              if (offset === 0) {
                translateY = 0;
                scale = 1;
                blur = 0;
                opacity = 1;
              } else if (offset === 1) {
                translateY = 18;
                scale = 0.94;
                blur = 2;
                opacity = 0.85;
              } else if (offset === 2) {
                translateY = 36;
                scale = 0.88;
                blur = 4;
                opacity = 0.55;
              } else {
                translateY = 60;
                scale = 0.82;
                blur = 6;
                opacity = 0;
              }

              return (
                <motion.div
                  key={s.id}
                  ref={offset === 0 ? cardRef : undefined}
                  animate={{
                    y: translateY,
                    scale,
                    filter: `blur(${blur}px)`,
                    opacity,
                  }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    zIndex,
                    // @ts-expect-error custom props
                    "--mx": "50%",
                    "--my": "50%",
                    "--flashlight": "0",
                  }}
                  className="surface-navy absolute h-[280px] w-[440px] overflow-hidden rounded-3xl p-8"
                >
                  {/* flashlight pseudo */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[var(--flashlight)] transition-opacity duration-500"
                    style={{
                      background:
                        "radial-gradient(600px circle at var(--mx) var(--my), rgba(212,175,55,0.18), transparent 40%)",
                    }}
                  />
                  <div className="absolute right-6 top-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                    {String(i + 1).padStart(2, "0")} / 06
                  </div>
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
                    {s.category}
                  </p>
                  <h3 className="mt-2 max-w-[85%] font-display text-2xl font-medium leading-tight tracking-tight text-white">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-[80%] font-body text-sm font-light leading-relaxed text-white/60">
                    {s.body}
                  </p>
                  <div className="absolute bottom-6 left-8">
                    <span className="glass-navy rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                      {s.tier}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* rail */}
          <div className="hidden min-w-[260px] lg:block">
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
              All scenarios
            </p>
            <ul className="space-y-1">
              {scenarios.map((s, i) => {
                const isActive = i === active;
                return (
                  <li key={s.id}>
                    <button
                      onClick={() => setActive(i)}
                      className={`group flex w-full items-center gap-3 py-2 text-left font-display text-sm transition-colors ${
                        isActive ? "text-[#D4AF37]" : "text-white/30 hover:text-white/70"
                      }`}
                    >
                      <span className="font-mono text-[10px] tracking-[0.2em]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="relative">
                        {s.title}
                        <AnimatePresence>
                          {isActive && (
                            <motion.span
                              layoutId="scenario-rail"
                              className="absolute -left-3 top-1/2 h-[6px] w-[6px] -translate-y-1/2 rounded-full bg-[#D4AF37]"
                            />
                          )}
                        </AnimatePresence>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
              Now showing · {current.category}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
