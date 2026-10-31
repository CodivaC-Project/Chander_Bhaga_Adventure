export const siteConfig = {
  name: "Shri Mata Vaishno Devi Travels",
  tagline: "Your Gateway to Kashmir's Untouched Beauty",
  description:
    "Katra-based travel agency for Vaishno Devi yatra packages, Kashmir tour packages from Delhi, hotels in Katra, taxi service and guided adventures — Srinagar, Gulmarg, Pahalgam with licensed local operators.",
  phone: process.env.NEXT_PUBLIC_PHONE || "916006465184",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "916006465184",
  email: process.env.NEXT_PUBLIC_EMAIL || "Sharmasidhant129@gmail.com",
  address: "Katra Main Market, Katra, Vaishno Devi, Jammu & Kashmir 182301",
  postalCode: "182301",
  // ponytail: add hours/areaServed here so schema + UI stay single-source
  openingHours: { opens: "09:00", closes: "20:00", days: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"] as const },
  areaServed: ["Katra","Jammu","Srinagar","Gulmarg","Pahalgam","Sonmarg"] as const,
  geo: { latitude: 32.98590, longitude: 74.94610 } as const,
  license: "JKAT00003494",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://shrimatavaishnodevitravels.in",
  social: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com/shrimatavaishnodevi",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/shrimatavaishnodevi",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://youtube.com/@shrimatavaishnodevi",
  },
  navLinks: [
    { label: "Home", href: "/" },
    {
      label: "Tours",
      href: "/tours",
      children: [
        { label: "All Packages", href: "/tours" },
        { label: "Kashmir Explorer", href: "/tours/kashmir-explorer" },
        { label: "Vaishno Devi Yatra", href: "/tours/vaishno-devi-yatra" },
      ],
    },
    {
      label: "Adventures",
      href: "/adventures",
      children: [
        { label: "All Activities", href: "/adventures" },
        { label: "Trekking", href: "/adventures/category/trekking" },
        { label: "Rafting", href: "/adventures/category/rafting" },
        { label: "Camping", href: "/adventures/category/camping" },
        { label: "Skiing", href: "/adventures/category/skiing" },
      ],
    },
    { label: "Hotels", href: "/hotels" },
    { label: "Taxi", href: "/taxi" },
    { label: "Gallery", href: "/gallery" },
    { label: "Blog", href: "/blog" },
    { label: "Compare", href: "/compare" },
    { label: "Contact", href: "/contact" },
  ],
};
