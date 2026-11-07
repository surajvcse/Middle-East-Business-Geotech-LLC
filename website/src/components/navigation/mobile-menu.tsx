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
              <span className="eyebrow" style={{ margin: "0 0 0.25rem" }}>Direct Engineering Contacts</span>
              <div className="mobile-nav__actions">
                <a href={`tel:${company.phoneHref}`} className="mobile-nav__action-btn mobile-nav__action-btn--primary">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span>Call Us</span>
                </a>
                <a
                  href={company.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-nav__action-btn mobile-nav__action-btn--whatsapp"
                  aria-label={`Chat on WhatsApp ${company.whatsapp}`}
                >
                  <svg width="15" height="15" viewBox="0 0 32 32" fill="none" aria-hidden="true" style={{ display: "inline-block", verticalAlign: "middle" }}>
  <path fill="#25D366" d="M16 3C8.82 3 3 8.82 3 16c0 2.55.73 4.93 2 6.96L3.2 29l6.23-1.76A12.92 12.92 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3z"/>
  <path fill="#FFFFFF" d="M21.9 19.34c-.26-.13-1.55-.77-1.79-.86-.24-.09-.41-.13-.59.13-.18.26-.68.86-.83 1.03-.15.17-.31.2-.57.07-.26-.13-1.11-.41-2.11-1.3-.78-.7-1.31-1.56-1.47-1.82-.15-.26-.02-.4.11-.53.12-.12.26-.31.39-.46.13-.15.17-.26.26-.44.09-.17.04-.33-.02-.46-.07-.13-.59-1.42-.81-1.95-.21-.51-.43-.44-.59-.45-.15-.01-.33-.01-.5-.01-.17 0-.46.07-.7.33-.24.26-.92.9-.92 2.19 0 1.29.94 2.54 1.07 2.71.13.17 1.85 2.83 4.49 3.97.63.27 1.12.43 1.5.55.63.2 1.2.17 1.66.1.5-.07 1.55-.63 1.77-1.25.22-.61.22-1.14.15-1.25-.07-.11-.24-.17-.5-.3z"/>
</svg>
                  <span>WhatsApp</span>
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
