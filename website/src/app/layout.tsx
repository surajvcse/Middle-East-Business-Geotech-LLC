import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { company } from "@/content/company";
import { withBasePath } from "@/lib/site-path";
import { getOrganizationJsonLd } from "@/lib/structured-data";

import "./globals.css"; // v2.1

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mebgeo.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} | Geotechnical Engineering in Oman`,
    template: `%s | ${company.name}`,
  },
  description: company.description,
  applicationName: company.name,
  category: "Geotechnical Engineering & Construction",
  keywords: [
    "Geotechnical Engineering Oman",
    "Slope Stabilisation Oman",
    "Rockfall Protection Oman",
    "Rock Bolting Muscat",
    "Shotcrete Contractor Oman",
    "Ground Anchoring Oman",
    "Ground Improvement Oman",
    "Piling and Foundation Engineering",
    "Tunnelling Oman",
  ],
  authors: [{ name: company.name, url: siteUrl }],
  creator: company.name,
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    title: `${company.name} | Geotechnical Engineering in Oman`,
    description: company.shortDescription,
    siteName: company.name,
  },
  icons: {
    icon: [
      { url: withBasePath("/favicon.ico"), sizes: "any" },
      { url: withBasePath("/icon.png"), type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: withBasePath("/apple-icon.png"), sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const orgJsonLd = getOrganizationJsonLd();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <div className="site-shell">
          <SiteHeader />
          <main id="main-content" className="site-main">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
