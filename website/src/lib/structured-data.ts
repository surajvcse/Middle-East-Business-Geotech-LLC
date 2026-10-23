import { company } from "@/content/company";

export function getOrganizationJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mebgeo.com";

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    legalName: company.name,
    url: baseUrl,
    logo: `${baseUrl}/images/brand/meb-geotech-logo.jpeg`,
    description: company.description,
    telephone: company.phone,
    email: company.email,
    identifier: company.crNumber,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${company.address.line1}, ${company.address.line2}`,
      postOfficeBoxNumber: "2156",
      postalCode: "112",
      addressLocality: company.address.city,
      addressCountry: "OM",
    },
    areaServed: {
      "@type": "Country",
      name: "Oman",
    },
    knowsAbout: [
      "Geotechnical Engineering",
      "Slope Stabilisation",
      "Rock Bolting & Ground Anchoring",
      "Shotcrete & Wire Netting",
      "Rockfall Protection",
      "Ground Improvement & Grouting",
      "Piling & Foundation Engineering",
      "Tunnelling & Underground Works",
    ],
  };
}

export function getBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mebgeo.com";

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`,
    })),
  };
}

