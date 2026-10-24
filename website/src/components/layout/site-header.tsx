"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { DesktopNav } from "@/components/navigation/desktop-nav";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { Container } from "@/components/ui/container";
import { company } from "@/content/company";
import { withBasePath } from "@/lib/site-path";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? "site-header--scrolled" : ""}`}>
      {/* Top Pre-Header Utility Bar */}
      <div className="top-bar">
        <Container className="top-bar__inner">
          <div className="top-bar__left">
            <span className="top-bar__item">
              <span className="top-bar__dot" aria-hidden="true" />
              <span>Muscat, Sultanate of Oman</span>
            </span>
            <span className="top-bar__sep" aria-hidden="true">
              |
            </span>
            <span className="top-bar__item top-bar__cr">
              CR: <strong className="top-bar__mono">{company.crNumber}</strong>
            </span>
            <span className="top-bar__sep" aria-hidden="true">
              |
            </span>
            <span className="top-bar__item">
              Tender Desk:{" "}
              <span className="top-bar__hours">Sun–Thu 08:00–17:00 GST</span>
            </span>
          </div>

          <div className="top-bar__right">
            <a
              href={`tel:${company.phoneHref}`}
              className="top-bar__link"
              aria-label={`Telephone ${company.phone}`}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>{company.phone}</span>
            </a>
            <span className="top-bar__sep" aria-hidden="true">
              |
            </span>
            <a
              href={`mailto:${company.email}`}
              className="top-bar__link"
              aria-label={`Email ${company.email}`}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>{company.email}</span>
            </a>
          </div>
        </Container>
      </div>

      {/* Main Navigation Bar */}
      <div className="site-header__main">
        <Container className="site-header__inner">
          <div className="brand-group">
            <Link className="brand" href="/" aria-label={`${company.name} home`}>
              <Image
                src={withBasePath("/images/brand/meb-geotech-logo.jpeg")}
                alt={company.name}
                width={220}
                height={56}
                priority
              />
            </Link>
            <div className="brand-badge">
              <span className="brand-badge__title">Specialist Geotechnical</span>
              <span className="brand-badge__location">Muscat · Sultanate of Oman</span>
            </div>
          </div>

          <DesktopNav />
          <MobileMenu />
        </Container>
      </div>
    </header>
  );
}
