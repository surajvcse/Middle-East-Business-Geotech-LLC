"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ButtonLink } from "@/components/ui/button-link";
import { company } from "@/content/company";

const serviceList = [
  { label: "Slope Stabilisation", href: "/services/slope-stabilisation" },
  { label: "Ground Anchors & Bolting", href: "/services/ground-anchors-and-rock-bolting" },
  { label: "Shotcrete & Wire Netting", href: "/services/shotcrete-and-wire-netting" },
  { label: "Rockfall Protection", href: "/services/rockfall-protection" },
  { label: "Ground Improvement & Grouting", href: "/services/ground-improvement-grouting" },
  { label: "Piling & Deep Foundations", href: "/services/piling-and-foundations" },
  { label: "Shoring & Excavation Support", href: "/services/shoring-and-excavation-support" },
  { label: "Microtunneling & Shafts", href: "/services/microtunneling-underground-works" },
] as const;

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close menu during render if pathname changed
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // Close menu and return focus to trigger
  function closeMenu() {
    setIsOpen(false);
    triggerRef.current?.focus();
  }

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        closeMenu();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  function isItemActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <div className="mobile-nav">
      <button
        ref={triggerRef}
        className="mobile-nav__trigger"
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-panel"
        aria-label={isOpen ? "Close main menu" : "Open main menu"}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {/* Backdrop overlay */}
      <div
        className={`mobile-menu-overlay ${isOpen ? "mobile-menu-overlay--open" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Slide-in drawer panel */}
      <div
        id="mobile-navigation-panel"
        ref={panelRef}
        className={`mobile-nav__panel ${isOpen ? "mobile-nav__panel--open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
      >
        <div className="mobile-nav__header">
          <div>
            <span className="eyebrow" style={{ margin: 0 }}>MEB GEOTECH</span>
            <p style={{ margin: "2px 0 0", fontSize: "0.75rem", color: "var(--muted)" }}>
              Muscat, Sultanate of Oman
            </p>
          </div>
          <button
            type="button"
            className="mobile-nav__close"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="mobile-nav__body">
          <ul className="mobile-nav__links">
            <li>
              <Link
                href="/"
                className={pathname === "/" ? "active" : ""}
                onClick={closeMenu}
                aria-current={pathname === "/" ? "page" : undefined}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={isItemActive("/about") ? "active" : ""}
                onClick={closeMenu}
                aria-current={isItemActive("/about") ? "page" : undefined}
              >
                About
              </Link>
            </li>

            {/* Services with expandable sub-links */}
            <li>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Link
                  href="/services"
                  className={isItemActive("/services") ? "active" : ""}
                  onClick={closeMenu}
                  aria-current={isItemActive("/services") ? "page" : undefined}
                  style={{ flex: 1 }}
                >
                  Services
                </Link>
                <button
                  type="button"
                  aria-expanded={isServicesExpanded}
                  aria-label="Toggle services list"
                  onClick={() => setIsServicesExpanded((prev) => !prev)}
                  style={{
                    background: "transparent",
                    border: "none",
                    padding: "0.75rem",
                    color: "var(--steel)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transform: isServicesExpanded ? "rotate(180deg)" : "none",
                      transition: "transform 180ms ease",
                    }}
                    aria-hidden="true"
                  >
                    <path d="M4 6l4 4 4-4" />
                  </svg>
                </button>
              </div>

              {isServicesExpanded && (
                <ul className="mobile-nav__sublinks">
                  {serviceList.map((svc) => (
                    <li key={svc.href}>
                      <Link
                        href={svc.href}
                        className={`mobile-nav__sublink ${pathname === svc.href ? "active" : ""}`}
                        onClick={closeMenu}
                      >
                        {svc.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/services"
                      className="mobile-nav__sublink"
                      onClick={closeMenu}
                      style={{ color: "var(--accent)", fontWeight: 700 }}
                    >
                      All 8 Capabilities →
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link
                href="/projects"
                className={isItemActive("/projects") ? "active" : ""}
                onClick={closeMenu}
                aria-current={isItemActive("/projects") ? "page" : undefined}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
              >
                <span>Projects</span>
                <span className="mobile-nav__badge">5 Cases</span>
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                className={isItemActive("/contact") ? "active" : ""}
                onClick={closeMenu}
                aria-current={isItemActive("/contact") ? "page" : undefined}
              >
                Contact
              </Link>
            </li>
          </ul>

          <div style={{ marginTop: "0.5rem" }}>
            <ButtonLink href="/contact" variant="primary" onClick={closeMenu}>
              Request a consultation
            </ButtonLink>
          </div>

          <div className="mobile-nav__meta">
            <div>
              <span className="eyebrow" style={{ margin: "0 0 0.25rem" }}>Tender Desk & Direct</span>
              <div className="mobile-nav__actions">
                <a href={`tel:${company.phoneHref}`} className="mobile-nav__action-btn mobile-nav__action-btn--primary">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span>Call Us</span>
                </a>
                <a href={`mailto:${company.email}`} className="mobile-nav__action-btn">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <span>Email</span>
                </a>
              </div>
            </div>
            <div style={{ marginTop: "0.5rem", lineHeight: 1.4 }}>
              <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--muted)" }}>
                Sun–Thu 08:00–17:00 GST
              </p>
              <p style={{ margin: "2px 0 0", fontSize: "0.75rem", color: "var(--muted-light)" }}>
                CR {company.crNumber} · Muscat, Sultanate of Oman
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
