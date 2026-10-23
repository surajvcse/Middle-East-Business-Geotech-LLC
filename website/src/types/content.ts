export type ServiceCategory =
  | "Slope Stabilization & Rockfall"
  | "Ground Improvement & Grouting"
  | "Piling & Deep Foundations"
  | "Underground & Specialist Works";

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  category: ServiceCategory;
  summary: string;
  introduction: string;
  capabilities: readonly string[];
  applications: readonly string[];
  methods?: readonly string[];
  relatedProjectSlugs: readonly string[];
  relatedServiceSlugs?: readonly string[];
};

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  aspectRatio?: "landscape" | "portrait" | "panoramic";
};

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  documentStatus: "Ongoing in supplied document" | "Completed in supplied document";
  location: string;
  governorate?: string;
  client: string;
  scope: string;
  sector?: string;
  serviceSlugs: readonly string[];
  images: readonly ProjectImage[];
};
