const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const siteBasePath = configuredBasePath
  ? `/${configuredBasePath.replace(/^\/+|\/+$/g, "")}`
  : "";

export function withBasePath(pathname: string) {
  if (!pathname || !pathname.startsWith("/") || !siteBasePath) return pathname;
  if (pathname.startsWith(siteBasePath)) return pathname;
  return `${siteBasePath}${pathname}`;
}
