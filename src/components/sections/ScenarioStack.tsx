"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { StackedGlassCards, type GlassCardItem } from "@/components/ui/glass-cards";

const scenarios: GlassCardItem[] = [
  {
    id: 1,
    eyebrow: "Behavioral",
    title: "De-escalation Drill",
    description:
      "An agitated citizen is shouting at your thana counter. Talk them down without escalating — Gemini judges tone, pace, and word choice against a de-escalation rubric.",
    tag: "Tier II",
  },
  {
    id: 2,
    eyebrow: "Investigative",
    title: "Witness Interview",
    description:
      "A reluctant witness. Extract a clean statement without a single leading question. The simulator flags every time you prime, paraphrase, or interrupt.",
    tag: "Tier II",
  },
  {
    id: 3,
    eyebrow: "Legal",
    title: "BNSS Procedural Quiz",
    description:
      "A senior IO cross-examines you on section citations during a case-file review. Miss an amendment and the scenario escalates to a Court-review branch.",
    tag: "Tier III",
  },
  {
    id: 4,
    eyebrow: "Communications",
    title: "Media Briefing",
    description:
      "A hostile journalist wants a quote on a sub-judice matter. Hold the line — officers learn what stays on record, what's privileged, and what needs DCP sign-off.",
    tag: "Tier III",
  },
  {
    id: 5,
    eyebrow: "Public Service",
    title: "Community Liaison",
    description:
      "A resident walks in with a grievance that's more personal than procedural. Listen well. The rubric rewards empathy markers, not the shortest resolution.",
    tag: "Tier I",
  },
  {
    id: 6,
    eyebrow: "Emergency",
    title: "First Responder Triage",
    description:
      "Multiple injured at an accident scene. Sequence the first 90 seconds — airway, bleeding, bystander control, radio-in — under live countdown pressure.",
    tag: "Tier III",
  },
];

export function ScenarioStack() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="scenarios"
      className="relative bg-transparent"
      style={{ minHeight: 900 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-25" />

      <div className="section-num">
        <span className="text-[#D4AF37]">04</span>
        <span className="text-white/20"> / 09</span>
      </div>

      {/* intro copy */}
      <div className="relative mx-auto max-w-6xl px-6 pt-24 md:px-10 md:pt-32">
        <div className="max-w-2xl">
          <SectionBadge className="mb-5" hindi="अभ्यास">
            Scenario Simulator
          </SectionBadge>
          <h2 className="text-balance font-display text-4xl font-medium leading-[0.95] tracking-tight text-white md:text-5xl lg:text-6xl">
            Real drills. Without the risk.
          </h2>
          <p className="mt-6 max-w-xl font-body text-sm font-light leading-relaxed text-white/60 md:text-base">
            Gemini-powered role-play. De-escalation at the counter. Hostile
            reporter at a presser. BNSS procedural quiz. Officers practice what
            policy can&apos;t teach on paper. Scroll to stack.
          </p>
        </div>

        <p className="mt-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-white/20" />
          06 scenarios · त्वरित
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-white/20" />
        </p>
      </div>

      {/* stacking glass cards + sticky rail */}
      <div className="relative mt-10 lg:grid lg:grid-cols-[minmax(220px,260px)_1fr] lg:gap-6">
        {/* sticky rail — sticks for the whole stack scroll, bouncing gold dot
            tracks the active card */}
        <aside
          aria-label="Scenario rail"
          className="relative hidden lg:block"
        >
          <div
            className="sticky z-10 pl-10 xl:pl-16"
            style={{ top: "50vh", transform: "translateY(-50%)" }}
          >
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
              All scenarios
            </p>
            <ul className="space-y-1">
              {scenarios.map((s, i) => {
                const isActive = i === active;
                return (
                  <li
                    key={s.id}
                    className={`group flex items-center gap-3 py-2 font-display text-sm transition-colors duration-500 ${
                      isActive ? "text-[#D4AF37]" : "text-white/30"
                    }`}
                  >
                    <span className="w-5 font-mono text-[10px] tracking-[0.2em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="relative">
                      {s.title}
                      {isActive && (
                        <motion.span
                          layoutId="scenario-rail-dot"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 18,
                            mass: 0.9,
                          }}
                          className="absolute -left-4 top-1/2 h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-[#D4AF37]"
                          style={{
                            boxShadow: "0 0 12px rgba(212,175,55,0.7)",
                          }}
                        />
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
              Now · {scenarios[active].eyebrow}
            </p>
          </div>
        </aside>

        <div className="lg:col-start-2">
          <StackedGlassCards items={scenarios} onActiveChange={setActive} />
        </div>
      </div>
    </section>
  );
}
