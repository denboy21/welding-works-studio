import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
  children: ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-2 font-display font-semibold rounded-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-industrial text-primary-foreground hover:shadow-glow hover:scale-[1.02] active:scale-[0.98]",
  outline:
    "border border-white/15 text-foreground bg-white/5 hover:bg-white/10 hover:border-primary/60 backdrop-blur",
  ghost: "text-foreground/80 hover:text-foreground hover:bg-white/5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

export const GlowButton = forwardRef<HTMLButtonElement, Props>(function GlowButton(
  {
    variant = "primary",
    size = "md",
    className,
    as = "button",
    href,
    target,
    rel,
    children,
    ...rest
  },
  ref,
) {
  const cls = cn(base, variants[variant], sizes[size], className);
  if (as === "a" && href) {
    return (
      <a href={href} target={target} rel={rel} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button ref={ref} className={cls} {...rest}>
      {children}
    </button>
  );
});
