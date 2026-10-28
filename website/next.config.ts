import type { NextConfig } from "next";

const envBasePath = process.env.NEXT_PUBLIC_BASE_PATH;
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] || "";
const isGitHubPages = process.env.GITHUB_ACTIONS === "true" && Boolean(repositoryName);
const basePath = envBasePath
  ? `/${envBasePath.replace(/^\/+|\/+$/g, "")}`
  : isGitHubPages
    ? `/${repositoryName}`
    : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
  devIndicators: false,
};

export default nextConfig;
