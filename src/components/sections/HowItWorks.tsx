import {
  ClipboardDocumentListIcon,
  VideoCameraIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/outline";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

const steps = [
  {
    step: "Step 01",
    Icon: ClipboardDocumentListIcon,
    title: "Assign duty and modules",
    body: "Push rosters, case assignments, and learning modules to officers or precincts in one click.",
  },
  {
    step: "Step 02",
    Icon: VideoCameraIcon,
    title: "Run the day",
    body: "Live briefings and drills with attendance, watermarked playback, and auto-recorded sessions.",
  },
  {
    step: "Step 03",
    Icon: PresentationChartLineIcon,
    title: "Measure what matters",
    body: "Precinct compliance, pending certifications by rank, and skill gaps — the view the IG needs.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="platform"
      className="relative bg-transparent section-pad"
      style={{ minHeight: 700 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#0A0E1A] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0A0E1A] to-transparent" />

      <div className="section-num">
        <span className="text-[#D4AF37]">03</span>
        <span className="text-white/20"> / 09</span>
      </div>
      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <SectionBadge className="mb-5" hindi="कार्यप्रणाली">How it works</SectionBadge>
          <h2 className="text-balance font-display text-4xl font-medium leading-[0.95] tracking-tight text-white md:text-5xl lg:text-6xl">
            You lead. Saarthi runs the floor.
          </h2>
          <p className="mt-6 max-w-xl font-body text-sm font-light leading-relaxed text-white/60 md:text-base">
            Rosters, modules, and compliance — assigned, tracked, and audited
            from one screen.
          </p>
        </div>

        <AnimatedSection
          as="div"
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {steps.map(({ step, Icon, title, body }) => (
            <AnimatedItem
              key={step}
              className="glass-navy card-hover group rounded-2xl p-8"
            >
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
                  {step}
                </p>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 transition-colors group-hover:text-[#D4AF37]/60">
                  ·
                </span>
              </div>
              <div className="glass-navy-strong mt-6 flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                <Icon className="h-5 w-5 text-[#D4AF37]" />
              </div>
              <h3 className="mt-6 font-display text-xl font-medium text-white">
                {title}
              </h3>
              <p className="mt-3 font-body text-sm font-light leading-relaxed text-white/60">
                {body}
              </p>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
