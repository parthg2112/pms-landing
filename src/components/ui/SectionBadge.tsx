import { cn } from "@/lib/cn";

export function SectionBadge({
  children,
  hindi,
  className,
}: {
  children: React.ReactNode;
  hindi?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="glass-navy inline-block rounded-full px-3.5 py-1 text-xs font-mono uppercase tracking-[0.2em] text-white/70">
        {children}
      </span>
      {hindi && (
        <span className="font-hindi text-xs text-[#D4AF37]/70">{hindi}</span>
      )}
    </div>
  );
}
