"use client";

import { company } from "@/content/company";

export function FloatingWhatsApp() {
  return (
    <aside aria-label="WhatsApp quick contact">
      <a
        href={company.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp"
        aria-label="Chat with MEB Geotech on WhatsApp"
        title="Chat with MEB Geotech on WhatsApp"
      >
        <span className="floating-whatsapp__pulse" aria-hidden="true" />
        <span className="floating-whatsapp__icon" aria-hidden="true">
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
            style={{ display: "block" }}
          >
            {/* Uniform solid pure white speech bubble */}
            <path
              fill="#FFFFFF"
              d="M16 3C8.82 3 3 8.82 3 16c0 2.55.73 4.93 2 6.96L3.2 29l6.23-1.76A12.92 12.92 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3z"
            />
            {/* Authentic official WhatsApp green receiver */}
            <path
              fill="#25D366"
              d="M21.9 19.34c-.26-.13-1.55-.77-1.79-.86-.24-.09-.41-.13-.59.13-.18.26-.68.86-.83 1.03-.15.17-.31.2-.57.07-.26-.13-1.11-.41-2.11-1.3-.78-.7-1.31-1.56-1.47-1.82-.15-.26-.02-.4.11-.53.12-.12.26-.31.39-.46.13-.15.17-.26.26-.44.09-.17.04-.33-.02-.46-.07-.13-.59-1.42-.81-1.95-.21-.51-.43-.44-.59-.45-.15-.01-.33-.01-.5-.01-.17 0-.46.07-.7.33-.24.26-.92.9-.92 2.19 0 1.29.94 2.54 1.07 2.71.13.17 1.85 2.83 4.49 3.97.63.27 1.12.43 1.5.55.63.2 1.2.17 1.66.1.5-.07 1.55-.63 1.77-1.25.22-.61.22-1.14.15-1.25-.07-.11-.24-.17-.5-.3z"
            />
          </svg>
        </span>
        <span className="floating-whatsapp__label">WhatsApp</span>
      </a>
    </aside>
  );
}
