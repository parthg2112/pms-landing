import { cn } from "@/lib/cn";
import { forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  asChild?: boolean;
}

const base =
  "inline-flex items-center gap-2 rounded-full px-6 py-3 font-display font-medium text-sm transition-colors duration-300 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "glass-navy-strong text-white hover:border-[rgba(212,175,55,0.6)] [&:hover]:text-[#D4AF37]",
  secondary:
    "bg-[#D4AF37] text-[#0A0E1A] hover:bg-[#e6c04a] hover:shadow-[0_0_32px_-8px_rgba(212,175,55,0.6)]",
  ghost:
    "text-white/70 hover:text-white px-5",
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = "primary", className, children, ...rest }, ref) => (
    <button ref={ref} className={cn(base, variants[variant], className)} {...rest}>
      {children}
    </button>
  ),
);
Button.displayName = "Button";
