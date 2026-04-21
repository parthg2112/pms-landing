import { ClipboardText, VideoConference, ChartLineUp } from "@phosphor-icons/react/dist/ssr";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

const steps = [
  {
    step: "Step 01",
    Icon: ClipboardText,
    title: "Assign the right module",
    body: "Commandants and training officers push curriculum to individual officers, squads, or whole precincts in a click.",
  },
  {
    step: "Step 02",
    Icon: VideoConference,
    title: "Run live drills",
    body: "Zoom-native live sessions with attendance, watermarked playback, and automatic session recordings.",
  },
  {
    step: "Step 03",
    Icon: ChartLineUp,
    title: "Measure what matters",
    body: "Precinct-level compliance, scenario pass rates, and pending certifications by rank — every metric the IG wants.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="platform"
      className="relative bg-[#0A0E1A] section-pad"
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
          <h2 className="font-display text-4xl font-medium leading-[0.95] tracking-tight text-white md:text-5xl lg:text-6xl">
            You lead. Saarthi trains.
          </h2>
          <p className="mt-6 max-w-xl font-body text-sm font-light leading-relaxed text-white/60 md:text-base">
            Assign modules. Schedule live drills. Let officers train at their
            own pace — or under a trainer&apos;s eye. Track compliance to the
            precinct.
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
                <Icon size={20} weight="regular" className="text-[#D4AF37]" />
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
