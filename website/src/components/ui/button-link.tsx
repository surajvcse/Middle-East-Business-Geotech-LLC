import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type ButtonLinkProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "steel";
  className?: string;
} & Omit<ComponentProps<typeof Link>, "className">;

export function ButtonLink({
  children,
  variant = "primary",
  className = "",
  ...linkProps
}: ButtonLinkProps) {
  return (
    <Link
      className={`button-link button-link--${variant}${className ? ` ${className}` : ""}`}
      {...linkProps}
    >
      {children}
    </Link>
  );
}
