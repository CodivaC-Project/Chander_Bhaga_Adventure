export const siteConfig = {
  name: "Shri Mata Vaishno Devi",
  tagline: "Your Gateway to Kashmir's Untouched Beauty",
  description:
    "Premium tourism, adventure, hotel, taxi, and consultation booking platform for exploring Kashmir and beyond.",
  phone: process.env.NEXT_PUBLIC_PHONE || "916006465184",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "916006465184",
  email: "Sharmasidhant129@gmail.com",
  address: "Katra, Vaishno Devi, Jammu & Kashmir",
  license: "JKAT00003494",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  social: {
    facebook: "https://facebook.com/chanderbhagaadventure",
    instagram: "https://instagram.com/chanderbhagaadventure",
    youtube: "https://youtube.com/@chanderbhagaadventure",
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
        { label: "Trekking", href: "/adventures?category=trekking" },
        { label: "Rafting", href: "/adventures?category=rafting" },
        { label: "Camping", href: "/adventures?category=camping" },
      ],
    },
    { label: "Hotels", href: "/hotels" },
    { label: "Taxi", href: "/taxi" },
    { label: "Gallery", href: "/gallery" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
};
