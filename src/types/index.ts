// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  pagination?: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
}

// Navigation types
export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

// Booking types
export interface BookingFormData {
  serviceType: "tour" | "adventure" | "hotel" | "taxi" | "consultation";
  serviceId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guests: number;
  date: string;
  endDate?: string;
  specialRequests?: string;
  totalAmount: number;
}

// Payment types
export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
}

export interface RazorpayPaymentResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

// Gallery types
export interface GalleryImage {
  src: string;
  title: string;
  category: string;
}

// Testimonial types
export interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
  package: string;
  avatar: string;
}

// SEO types
export interface SEOData {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
}
