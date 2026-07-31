interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "accent" | "success" | "warning" | "danger";
  className?: string;
}

const variants = {
  default: "bg-[var(--color-paper)] text-[var(--color-ink-soft)] border border-[var(--color-line)]",
  primary: "bg-[var(--color-pine)] text-white",
  accent: "bg-[var(--color-accent-soft)] text-[var(--color-accent-deep)]",
  success: "bg-[#e5efe8] text-[var(--color-pine)]",
  warning: "bg-[#f3ead9] text-[var(--color-accent-deep)]",
  danger: "bg-[#f2dcd6] text-[var(--color-danger)]",
};

function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export { Badge };
