interface PageHeroProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  meta?: string;
}

/**
 * Shared editorial page hero — flat deep-pine background, left-aligned,
 * eyebrow label + hairline. Replaces the old centered "hero-bg" pattern.
 */
export function PageHero({ title, subtitle, eyebrow, meta }: PageHeroProps) {
  return (
    <section className="hero-bg">
      <div className="container-custom py-20 md:py-24">
        <div className="max-w-2xl">
          {eyebrow && (
            <div className="eyebrow text-[var(--color-accent-light)] mb-5">
              {eyebrow}
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-[1.08]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 text-lg md:text-xl text-white/60 leading-relaxed max-w-xl">
              {subtitle}
            </p>
          )}
          {meta && (
            <p className="mt-5 text-sm text-white/40">{meta}</p>
          )}
        </div>
      </div>
    </section>
  );
}
