import { ArrowUpRight, DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { ChakraMark } from "@/components/ui/ChakraMark";

export function CTAFooter() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#0A0E1A]"
      style={{ minHeight: 600 }}
    >
      <div className="section-num">
        <span className="text-[#D4AF37]">09</span>
        <span className="text-white/20"> / 09</span>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-25" />
      {/* faint chakra silhouette */}
      <div
        className="pointer-events-none absolute left-1/2 top-[18%] -translate-x-1/2 opacity-[0.12]"
        aria-hidden="true"
      >
        <ChakraMark size={520} />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(212,175,55,0.1), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-6 pb-16 pt-32 text-center md:px-16">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
          Ready to serve?
        </p>
        <h2 className="mt-5 font-display text-5xl font-medium leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
          Your next training cycle
          <br />
          starts here.
        </h2>
        <p className="mx-auto mt-6 max-w-xl font-body text-sm font-light leading-relaxed text-white/60 md:text-base">
          Book a 30-minute demo. We&apos;ll show you Saarthi running live —
          with your department&apos;s modules loaded in before the call.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary">
            Request a demo
            <ArrowUpRight weight="bold" size={16} />
          </Button>
          <Button variant="secondary">
            Download the brochure
            <DownloadSimple weight="bold" size={16} />
          </Button>
        </div>

        <div className="mt-10 inline-flex items-center gap-2">
          <span className="animate-pulse-dot inline-block h-2 w-2 rounded-full bg-[#D4AF37]" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/50">
            Currently piloting with Mumbai Police
          </span>
        </div>
      </div>

      <footer className="relative mt-16 border-t border-white/[0.06] pb-10 pt-8">
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
