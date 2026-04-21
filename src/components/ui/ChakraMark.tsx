import { cn } from "@/lib/cn";

export function ChakraMark({
  size = 24,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const spokes = Array.from({ length: 24 });
  const center = 50;
  const outer = 46;
  const inner = 12;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={cn("block", className)}
      aria-hidden="true"
    >
      <circle
        cx={center}
        cy={center}
        r={outer}
        fill="none"
        stroke="#D4AF37"
        strokeWidth={1.5}
      />
      <circle
        cx={center}
        cy={center}
        r={inner - 4}
        fill="#D4AF37"
      />
      {spokes.map((_, i) => {
        const angle = (i * 360) / 24;
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={center}
            y2={center - outer + 1}
            stroke="#D4AF37"
            strokeWidth={1.5}
            strokeLinecap="round"
            transform={`rotate(${angle} ${center} ${center})`}
          />
        );
      })}
    </svg>
  );
}
