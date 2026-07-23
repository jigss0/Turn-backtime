import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/cn";

type Variant = "primary" | "ghost" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

/**
 * The site's single button primitive. Deliberately quiet — small caps,
 * generous letter-spacing, a hairline border rather than a filled block
 * — so it reads as an invitation rather than a marketing CTA. Breathes
 * gently at rest, and catches a soft diagonal sheen of light on hover.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    const base =
      "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-3.5 " +
      "text-whisper uppercase tracking-wider2 transition-all duration-500 ease-cinematic " +
      "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-rosegold " +
      "disabled:opacity-40 disabled:pointer-events-none disabled:animate-none active:scale-[0.97]";

    const variants: Record<Variant, string> = {
      // Deep burgundy pill, gold text, soft elevated shadow — the site's primary CTA
      primary: cn(
        "bg-burgundy text-rosegold-light shadow-gold hover:-translate-y-0.5 hover:bg-burgundy-wine hover:shadow-page"
      ),
      // A hairline gold-on-paper pill for secondary actions
      outline: cn(
        "border border-rosegold/50 text-burgundy hover:-translate-y-0.5 hover:border-rosegold hover:bg-rosegold/10"
      ),
      ghost: "text-cream/70 hover:text-burgundy",
    };

    return (
      <button ref={ref} className={cn(base, variants[variant], className)} {...props}>
        {/* Soft gold sheen, sweeps across on hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-cinematic group-hover:translate-x-full"
        />
        <span className="relative">{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";
