/** Slug for programmatic SEO URLs: "Leh Ladakh" → "leh-ladakh". */
export function toSlug(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, "-");
}

/** Human label from slug: "leh-ladakh" → "Leh Ladakh". */
export function fromSlug(value: string): string {
  return value.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
