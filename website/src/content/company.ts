export const company = {
  name: "Middle East Business Geotech LLC",
  shortName: "MEB Geotech",
  tagline: "Specialist Geotechnical Engineering & Construction",
  description:
    "Specialist geotechnical engineering and construction solutions for slopes, ground improvement, foundations and underground works in the Sultanate of Oman.",
  shortDescription:
    "Specialist geotechnical design and execution solutions for demanding infrastructure projects in Oman.",
  phone: "+968 7721 8808",
  phoneHref: "+96877218808",
  email: "sudhan@mebgeo.com",
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
