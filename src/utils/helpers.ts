// Format price in Indian Rupees
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

// Format date
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

// Format short date
export function formatShortDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
  }).format(new Date(date));
}

// Truncate text
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

// Generate slug from text
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Smooth scroll to element
export function scrollToElement(elementId: string) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Calculate discount percentage
export function getDiscountPercentage(
  originalPrice: number,
  discountedPrice: number
): number {
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
}

// Generate WhatsApp link
export function getWhatsAppLink(phone: string, message?: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const baseUrl = `https://wa.me/${cleanPhone}`;
  return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl;
}

// Get difficulty badge color
export function getDifficultyColor(difficulty: string): string {
  const colors: Record<string, string> = {
    easy: "text-green-600 bg-green-50",
    moderate: "text-yellow-600 bg-yellow-50",
    challenging: "text-orange-600 bg-orange-50",
    extreme: "text-red-600 bg-red-50",
  };
  return colors[difficulty] || "text-gray-600 bg-gray-50";
}

// Get activity category icon name
export function getActivityCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    trekking: "text-emerald-600 bg-emerald-50",
    camping: "text-amber-600 bg-amber-50",
    "snow-activities": "text-sky-600 bg-sky-50",
    "water-activities": "text-blue-600 bg-blue-50",
    sightseeing: "text-purple-600 bg-purple-50",
    pilgrimage: "text-orange-600 bg-orange-50",
  };
  return colors[category] || "text-gray-600 bg-gray-50";
}

// Debounce function
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
