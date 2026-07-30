interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "accent" | "success" | "warning" | "danger";
  className?: string;
}

const variants = {
  default: "bg-gray-100 text-gray-700",
  primary: "bg-[var(--color-primary)]/10 text-[var(--color-primary)]",
  accent: "bg-[var(--color-accent)]/10 text-[var(--color-accent-dark)]",
  success: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-700",
  danger: "bg-red-100 text-red-700",
};

function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export { Badge };
