export const siteConfig = {
  name: "Shri Mata Vaishno Devi",
  tagline: "Your Katra Team for Vaishno Devi Yatra & Kashmir",
  description:
    "Licensed Katra travel agency for Vaishno Devi yatra packages — registration, helicopter booking, Katra hotels and Jammu taxi — plus Kashmir tour packages to Srinagar, Gulmarg and Pahalgam with trusted local operators.",
  phone: process.env.NEXT_PUBLIC_PHONE || "916006465184",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "916006465184",
  email: process.env.NEXT_PUBLIC_EMAIL || "Sharmasidhant129@gmail.com",
  address: "Katra, Vaishno Devi, Jammu & Kashmir",
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
      label: "Vaishno Devi",
      href: "/vaishno-devi",
      children: [
        { label: "Yatra Guide", href: "/vaishno-devi" },
        { label: "First-Timer Guide", href: "/blog/vaishno-devi-yatra-first-timer-guide" },
        { label: "Where to Stay", href: "/blog/vaishno-devi-bhawan-room-booking" },
        { label: "Katra Hotels", href: "/hotels/location/katra" },
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
    { label: "Contact", href: "/contact" },
  ],
};
