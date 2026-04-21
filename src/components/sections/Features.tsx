import {
  ShieldCheck,
  Translate,
  CloudSlash,
  ChartPieSlice,
} from "@phosphor-icons/react/dist/ssr";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

const features = [
  {
    Icon: ShieldCheck,
    title: "Secure by default",
    body: "On-prem deploy, air-gapped video, watermarked playback. No tenant data leaves your network.",
  },
  {
    Icon: Translate,
    title: "हिंदी first",
    body: "Every screen ships in Hindi and English on day one. Regional languages on the roadmap.",
  },
  {
    Icon: CloudSlash,
    title: "Works when the net doesn't",
    body: "Lectures cache for offline playback. Attendance syncs when you're back online.",
  },
  {
    Icon: ChartPieSlice,
    title: "Evidence-grade analytics",
    body: "Precinct rollups, rank-wise completion, and a compliance dashboard the SP can read in 30 seconds.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative bg-[#0A0E1A] section-pad">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="section-num">
        <span className="text-[#D4AF37]">05</span>
        <span className="text-white/20"> / 09</span>
      </div>
      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <SectionBadge className="mb-5" hindi="क्यों सारथी">Why Saarthi</SectionBadge>
          <h2 className="font-display text-4xl font-medium leading-[0.95] tracking-tight text-white md:text-5xl lg:text-6xl">
            Built for the realities of Indian policing.
          </h2>
        </div>

        <AnimatedSection
          as="div"
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {features.map(({ Icon, title, body }) => (
            <AnimatedItem
              key={title}
              className="glass-navy card-hover group rounded-2xl p-6"
            >
              <div className="glass-navy-strong flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                <Icon size={18} weight="regular" className="text-[#D4AF37]" />
              </div>
              <h3 className="mt-5 font-display text-lg font-medium text-white">
                {title}
              </h3>
              <p className="mt-2 font-body text-sm font-light leading-relaxed text-white/60">
                {body}
              </p>
              <div className="mt-5 h-px w-0 bg-gradient-to-r from-[#D4AF37] via-[#D4AF37]/40 to-transparent transition-[width] duration-700 ease-out group-hover:w-full" />
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
