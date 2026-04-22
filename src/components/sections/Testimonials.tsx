import { SectionBadge } from "@/components/ui/SectionBadge";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

const quotes = [
  {
    quote:
      "Rosters, refresher modules, compliance — all in one screen. Completion is up 4x, and the Commissioner sees it live.",
    name: "Sr. Inspector A. Deshmukh",
    role: "Mumbai Police · Pilot precinct",
    initials: "AD",
  },
  {
    quote:
      "The scenario drills actually teach de-escalation. Officers run them on their off shift.",
    name: "DCP (Trg.) R. Iyer",
    role: "Training Directorate",
    initials: "RI",
  },
  {
    quote:
      "Hindi-first, on-prem, and analytics in the IG's language. All three boxes, checked.",
    name: "Commandant V. Kulkarni",
    role: "State Police Academy",
    initials: "VK",
  },
];

export function Testimonials() {
  return (
    <section className="relative bg-transparent section-pad">
      <div className="section-num">
        <span className="text-[#D4AF37]">08</span>
        <span className="text-white/20"> / 09</span>
      </div>
      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <SectionBadge className="mb-5" hindi="मैदान से">From the field</SectionBadge>
          <h2 className="text-balance font-display text-4xl font-medium leading-[0.95] tracking-tight text-white md:text-5xl lg:text-6xl">
            What commandants are saying.
          </h2>
        </div>

        <AnimatedSection
          as="div"
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {quotes.map((q) => (
            <AnimatedItem
              key={q.initials}
              className="glass-navy card-hover group flex flex-col rounded-2xl p-8"
            >
              <div className="font-display text-5xl leading-none text-[#D4AF37] opacity-40">
                &ldquo;
              </div>
              <p className="mt-3 flex-1 font-body text-sm font-light italic leading-relaxed text-white/80">
                {q.quote}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="glass-navy-strong flex h-10 w-10 items-center justify-center rounded-full font-display text-sm text-[#D4AF37]">
                  {q.initials}
                </div>
                <div className="leading-tight">
                  <p className="font-display text-sm font-medium text-white">
                    {q.name}
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                    {q.role}
                  </p>
                </div>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
