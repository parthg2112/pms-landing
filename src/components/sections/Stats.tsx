import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

const stats = [
  { value: "2,400+", label: "Officers onboarded in pilot", sub: "across 18 precincts" },
  { value: "12", label: "Live scenario templates", sub: "6 more in review" },
  { value: "180 hrs", label: "Training delivered this quarter", sub: "Q1 · 2026" },
  { value: "94%", label: "Module completion rate", sub: "vs. 42% classroom baseline" },
];

export function Stats() {
  return (
    <section id="security" className="relative bg-[#0A0E1A] section-pad">
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
          {/* slow rotating gold beam — adds premium motion to an otherwise static block */}
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
                    {value}
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
