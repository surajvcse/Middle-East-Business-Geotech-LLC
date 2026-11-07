export const company = {
  name: "Middle East Business Geotech LLC",
  shortName: "MEB Geotech",
  tagline: "Specialist Geotechnical Engineering & Contracting",
  description:
    "Specialist geotechnical contractor in Oman. We protect steep slopes, strengthen weak ground, install deep foundations, and build underground structures safely and on time.",
  shortDescription:
    "Specialist geotechnical engineering and ground construction across the Sultanate of Oman.",
  phone: "+968 9094 0953",
  phoneHref: "+96890940953",
  whatsapp: "+968 9094 0953",
  whatsappHref: "https://wa.me/96890940953?text=Hello%20MEB%20Geotech%20Team%2C%20I%20would%20like%20to%20discuss%20a%20geotechnical%20requirement%20in%20Oman.",
  email: "info@mebgeo.com",
  crNumber: "1583382",
  address: {
    line1: "Flat 12/6, Building 1040, Way 3513",
    line2: "Block 235, South Al Khuwair",
    postal: "PO Box 2156, PC 112",
    city: "Muscat",
    country: "Sultanate of Oman",
  },
  location: "Muscat, Sultanate of Oman",
  coordinates: "23.5880° N, 58.4059° E",
} as const;

export const primaryNavigation = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
] as const;
