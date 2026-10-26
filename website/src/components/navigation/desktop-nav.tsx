"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ButtonLink } from "@/components/ui/button-link";

export function DesktopNav() {
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);

  // Close dropdown during render when pathname changes
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsServicesOpen(false);
  }

  // Handle escape key and clicks outside
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isServicesOpen) {
        setIsServicesOpen(false);
        triggerRef.current?.focus();
      }
    }

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isServicesOpen]);

  function isItemActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const isServicesActive = isItemActive("/services");

  return (
    <nav className="desktop-nav" aria-label="Primary navigation">
      <ul className="desktop-nav__links">
        <li>
          <Link
            href="/about"
            className={`desktop-nav__link ${isItemActive("/about") ? "desktop-nav__link--active" : ""}`}
            aria-current={isItemActive("/about") ? "page" : undefined}
          >
            About
          </Link>
        </li>

        {/* Services with Dropdown Mega-Menu */}
        <li
          ref={dropdownRef}
          className="desktop-nav__dropdown-wrapper"
          onMouseEnter={() => setIsServicesOpen(true)}
          onMouseLeave={() => setIsServicesOpen(false)}
        >
          <Link
            ref={triggerRef}
            href="/services"
            className={`desktop-nav__link desktop-nav__link--has-dropdown ${isServicesActive ? "desktop-nav__link--active" : ""}`}
            aria-current={isServicesActive ? "page" : undefined}
            aria-expanded={isServicesOpen}
            aria-haspopup="true"
            onClick={() => setIsServicesOpen(false)}
          >
            <span>Services</span>
            <svg
              className={`desktop-nav__chevron ${isServicesOpen ? "desktop-nav__chevron--open" : ""}`}
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 6l4 4 4-4" />
            </svg>
          </Link>

          {/* Floating Dropdown Panel */}
          <div
            className={`nav-dropdown__menu ${isServicesOpen ? "is-open" : ""}`}
            role="region"
            aria-label="Specialist geotechnical services"
          >
            <div className="nav-dropdown__header">
              <div className="nav-dropdown__header-badge">
                <span className="nav-dropdown__header-dot" aria-hidden="true" />
                <span>CORE GEOTECHNICAL DISCIPLINES</span>
              </div>
              <Link
                href="/services"
                className="nav-dropdown__view-all"
                onClick={() => setIsServicesOpen(false)}
              >
                <span>All 8 Capabilities</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="nav-dropdown__grid">
              {/* Column 1: Slope & Rockfall */}
              <div className="nav-dropdown__col">
                <div className="nav-dropdown__col-title">
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
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  </svg>
                  <span>Slope & Rockfall</span>
                </div>
                <ul className="nav-dropdown__list">
                  <li>
                    <Link
                      href="/services/slope-stabilisation"
                      className={pathname === "/services/slope-stabilisation" ? "active" : ""}
                      onClick={() => setIsServicesOpen(false)}
                    >
                      Slope Stabilisation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/ground-anchors-and-rock-bolting"
                      className={pathname === "/services/ground-anchors-and-rock-bolting" ? "active" : ""}
                      onClick={() => setIsServicesOpen(false)}
                    >
                      Ground Anchors & Bolting
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/shotcrete-and-wire-netting"
                      className={pathname === "/services/shotcrete-and-wire-netting" ? "active" : ""}
                      onClick={() => setIsServicesOpen(false)}
                    >
                      Shotcrete & Wire Netting
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/rockfall-protection"
                      className={pathname === "/services/rockfall-protection" ? "active" : ""}
                      onClick={() => setIsServicesOpen(false)}
                    >
                      Rockfall Protection
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 2: Ground Improvement & Foundations */}
              <div className="nav-dropdown__col">
                <div className="nav-dropdown__col-title">
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
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                    <line x1="6" y1="6" x2="6.01" y2="6" />
                    <line x1="6" y1="18" x2="6.01" y2="18" />
                  </svg>
                  <span>Ground & Foundations</span>
                </div>
                <ul className="nav-dropdown__list">
                  <li>
                    <Link
                      href="/services/ground-improvement-grouting"
                      className={pathname === "/services/ground-improvement-grouting" ? "active" : ""}
                      onClick={() => setIsServicesOpen(false)}
                    >
                      Ground Improvement & Grouting
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/piling-and-foundations"
                      className={pathname === "/services/piling-and-foundations" ? "active" : ""}
                      onClick={() => setIsServicesOpen(false)}
                    >
                      Piling & Deep Foundations
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 3: Retaining & Underground Works */}
              <div className="nav-dropdown__col">
                <div className="nav-dropdown__col-title">
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
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span>Retaining & Underground</span>
                </div>
                <ul className="nav-dropdown__list">
                  <li>
                    <Link
                      href="/services/shoring-and-excavation-support"
                      className={pathname === "/services/shoring-and-excavation-support" ? "active" : ""}
                      onClick={() => setIsServicesOpen(false)}
                    >
                      Shoring & Excavation Support
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/tunnelling-and-underground-works"
                      className={pathname === "/services/tunnelling-and-underground-works" ? "active" : ""}
                      onClick={() => setIsServicesOpen(false)}
                    >
                      Microtunneling & Shafts
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="nav-dropdown__footer">
              <span className="nav-dropdown__footer-note">
                Engineered design calculations, anchor verification & field execution across Oman.
              </span>
              <Link
                href="/contact"
                className="nav-dropdown__footer-link"
                onClick={() => setIsServicesOpen(false)}
              >
                <span>Tender Enquiries</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </li>

        <li>
          <Link
            href="/projects"
            className={`desktop-nav__link ${isItemActive("/projects") ? "desktop-nav__link--active" : ""}`}
            aria-current={isItemActive("/projects") ? "page" : undefined}
          >
            <span>Projects</span>
            {/* <span className="desktop-nav__badge"></span> */}
          </Link>
        </li>

        <li>
          <Link
            href="/contact"
            className={`desktop-nav__link ${isItemActive("/contact") ? "desktop-nav__link--active" : ""}`}
            aria-current={isItemActive("/contact") ? "page" : undefined}
          >
            Contact
          </Link>
        </li>
      </ul>

      <div className="desktop-nav__actions">
        {/* Consultation CTA */}
        <ButtonLink href="/contact" variant="primary" className="desktop-nav__cta">
          <span>Request Consultation</span>
          <svg
            width="13"
            height="13"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3.333 8h9.334M8.667 4l4 4-4 4" />
          </svg>
        </ButtonLink>
      </div>
    </nav>
  );
}
