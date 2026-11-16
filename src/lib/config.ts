export const siteConfig = {
  name: "Shri Mata Vaishno Devi Travels",
  tagline: "Your Gateway to Kashmir's Untouched Beauty",
  description:
    "Katra-based travel agency for Vaishno Devi yatra packages, Kashmir tour packages from Delhi, hotels in Katra, taxi service and guided adventures across Srinagar, Gulmarg, Pahalgam and Sonmarg with licensed local operators.",
  url: "https://www.shrimatavaishnodevitravels.in",
  phone: "916006465184",
  whatsapp: "916006465184",
  email: "Sharmasidhant129@gmail.com",
  address: "Katra, Vaishno Devi, Jammu & Kashmir",
  license: "JKAT00003494",
  workingHours: "7:00 AM - 10:00 PM (7 days a week)",
  social: {
    facebook: "https://facebook.com/chanderbhagaadventure",
    instagram: "https://instagram.com/chanderbhagaadventure",
    youtube: "https://youtube.com/@chanderbhagaadventure",
  },
  seo: {
    defaultTitle: "Shri Mata Vaishno Devi Travels — Vaishno Devi Yatra & Kashmir Tour Packages",
    titleTemplate: "%s | Shri Mata Vaishno Devi Travels",
    keywords: [
      "Vaishno Devi yatra package",
      "Kashmir tour package from Delhi",
      "Katra travel agent",
      "Vaishno Devi helicopter booking",
      "Katra hotel booking",
      "Srinagar Gulmarg Pahalgam tour",
      "Jammu to Katra taxi",
      "Kashmir honeymoon package",
    ],
  },
  navLinks: [
    { label: "Home", href: "/" },
    {
      label: "Tours",
      href: "/tours",
      children: [
        { label: "Kashmir", href: "/tours?category=kashmir" },
        { label: "Pilgrimage", href: "/tours?category=pilgrimage" },
        { label: "Ladakh", href: "/tours?category=ladakh" },
      ],
    },
    {
      label: "Adventures",
      href: "/adventures",
      children: [
        { label: "Trekking", href: "/adventures/category/trekking" },
        { label: "Camping", href: "/adventures/category/camping" },
        { label: "Skiing", href: "/adventures/category/skiing" },
        { label: "Rafting", href: "/adventures/category/rafting" },
      ],
    },
    { label: "Hotels", href: "/hotels" },
    { label: "Taxi", href: "/taxi" },
    { label: "Gallery", href: "/gallery" },
    { label: "Blog", href: "/blog" },
    { label: "Compare", href: "/compare" },
    { label: "Contact", href: "/contact" },
  ],
  stats: {
    happyTravelers: "5000+",
    toursOrganized: "500+",
    destinations: "25+",
    yearsExperience: "10+",
  },
};

export const adventureCategories = [
  { name: "Trekking", slug: "trekking", icon: "Mountain", description: "Guided treks through breathtaking Himalayan trails" },
  { name: "Camping", slug: "camping", icon: "Tent", description: "Starlit nights in the lap of nature" },
  { name: "Skiing", slug: "skiing", icon: "Snowflake", description: "World-class slopes in Gulmarg and beyond" },
  { name: "Rafting", slug: "rafting", icon: "Waves", description: "Thrilling white water rafting experiences" },
  { name: "Sightseeing", slug: "sightseeing", icon: "Camera", description: "Explore stunning landscapes and hidden gems" },
  { name: "Pilgrimage", slug: "pilgrimage", icon: "Church", description: "Sacred journeys to holy destinations" },
] as const;

export const stats = [
  { value: "5000+", label: "Happy Travelers", suffix: "" },
  { value: "500+", label: "Tours Organized", suffix: "" },
  { value: "50+", label: "Destinations", suffix: "" },
  { value: "4.9", label: "Average Rating", suffix: "★" },
] as const;

export const featureFlags = {
  showPlaceholderBanners: false,
  enableBookingPayments: false,
  enableNewsletter: true,
  enableChatWidget: false,
} as const;
