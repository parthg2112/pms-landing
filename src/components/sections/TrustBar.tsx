import { SectionBadge } from "@/components/ui/SectionBadge";

const orgs = [
  "Mumbai Police",
  "Maharashtra Police",
  "SVPNPA Hyderabad",
  "NPA Hyderabad",
  "IPS Association",
  "BPR&D",
];

export function TrustBar() {
  const doubled = [...orgs, ...orgs];
  return (
    <section className="relative py-20 md:py-24" id="trust">
      <div className="section-num">
        <span className="text-[#D4AF37]">02</span>
        <span className="text-white/20"> / 09</span>
      </div>
      <div className="mx-auto mb-10 flex max-w-xl justify-center">
        <SectionBadge hindi="सेवा">Trusted by the services that serve</SectionBadge>
      </div>
      <div className="mask-edges-x overflow-hidden">
        <div className="animate-marquee flex min-w-max gap-14 whitespace-nowrap px-6 md:gap-20">
          {doubled.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-display text-2xl font-medium tracking-tight text-white/70 md:text-3xl"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
