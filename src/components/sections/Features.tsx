import {
  ShieldCheckIcon,
  LanguageIcon,
  SignalSlashIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

const features = [
  {
    Icon: ShieldCheckIcon,
    title: "Secure by default",
    body: "On-prem deploy. Watermarked playback. No tenant data leaves your network.",
  },
  {
    Icon: LanguageIcon,
    title: "हिंदी first",
    body: "Every screen in Hindi and English, day one. Regional languages next.",
  },
  {
    Icon: SignalSlashIcon,
    title: "Works when the net doesn't",
    body: "Modules cache offline. Attendance and case updates sync when you're back.",
  },
  {
    Icon: ChartPieIcon,
    title: "Evidence-grade analytics",
    body: "Precinct rollups, rank-wise completion, SP-ready dashboards in 30 seconds.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative bg-transparent section-pad">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="section-num">
        <span className="text-[#D4AF37]">05</span>
        <span className="text-white/20"> / 09</span>
      </div>
      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <SectionBadge className="mb-5" hindi="क्यों सारथी">Why Saarthi</SectionBadge>
          <h2 className="text-balance font-display text-4xl font-medium leading-[0.95] tracking-tight text-white md:text-5xl lg:text-6xl">
            Built for how Indian policing actually runs.
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
                <Icon className="h-[18px] w-[18px] text-[#D4AF37]" />
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
