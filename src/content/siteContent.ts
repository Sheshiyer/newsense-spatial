import rawContent from "../../content/site-content.json";

export type SceneRoute = "/" | "/projects" | "/studio" | "/team" | "/contact" | "/archive";
export type ProjectStatus = "featured" | "live" | "archive";
export type CaseStudyType =
  | "motion"
  | "campaign-system"
  | "editorial-stills"
  | "archive-fragment";

export type NarrativeSection = {
  heading: string;
  content: string;
};

export type ProjectRecord = {
  id: string;
  slug: string;
  route: string;
  title: string;
  status: ProjectStatus;
  case_study_type: CaseStudyType;
  page_kind: string;
  hero_heading: string;
  hero_summary: string;
  primary_client: string;
  clients: string[];
  primary_service: string;
  services: string[];
  year: string | null;
  years: string[];
  featured_rank: number | null;
  gallery_mode: string;
  credits: Record<string, string | undefined>;
  credits_text: string;
  narrative_sections: NarrativeSection[];
  outcome_sections: NarrativeSection[];
  media: {
    cover_image: string | null;
    local_image_count: number;
    local_video_count: number;
    gallery_images: Array<{
      id: string;
      src: string;
      alt: string;
      emphasis: "primary" | "support";
    }>;
  };
  clean_text: string;
  source_warnings: string[];
  source_refs: string[];
  placeholder: boolean;
};

export type TeamRecord = {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio_full: string;
  bio_short: string;
  order: number;
  portrait_asset: string | null;
  scene_asset?: string | null;
  asset_status?: string;
  asset_notes?: string[];
  specialties: string[];
};

export type ClientRecord = {
  id: string;
  slug: string;
  name: string;
  proof_sources: string[];
  project_slugs: string[];
  about_page_presence: boolean;
  notes: string[];
};

export type SiteContent = {
  generated_at: string;
  metadata: {
    featured_order: string[];
    placeholder_routes: string[];
    total_projects: number;
    total_archive: number;
  };
  studio: {
    id: string;
    slug: string;
    name: string;
    wordmark_asset: string | null;
    website: string;
    positioning: string;
    support_copy: string;
    about_summary: string;
    about_support: string;
    location_city: string;
    location_country: string;
    contact: {
      emails: string[];
      phones: string[];
      address: string;
      form_prompt: string;
    };
    services: string[];
    client_roster: string[];
    brand_tokens: {
      palette: string[];
      notes: string[];
    };
    source_refs: string[];
  };
  team: TeamRecord[];
  services: {
    studio_services: Array<{ id: string; slug: string; label: string; kind: string }>;
    project_service_tags: Array<{ id: string; slug: string; label: string; kind: string }>;
    source_refs: string[];
  };
  clients: ClientRecord[];
  projects: ProjectRecord[];
  archive: ProjectRecord[];
  media_manifest: {
    images: Array<Record<string, string>>;
    videos: Array<Record<string, string>>;
    missing_assets: string[];
    source_warnings: string[];
  };
};

export const siteContent = rawContent as unknown as SiteContent;
export const PROJECT_TYPE_ORDER: CaseStudyType[] = [
  "campaign-system",
  "motion",
  "editorial-stills",
];

export const PROJECT_TYPE_LABELS: Record<CaseStudyType, string> = {
  motion: "Signal release",
  "campaign-system": "Signal construction",
  "editorial-stills": "Signal framing",
  "archive-fragment": "Noise shadow",
};

export function getFeaturedProjects(): ProjectRecord[] {
  return [...siteContent.projects].sort((left, right) => {
    const leftRank = left.featured_rank ?? Number.MAX_SAFE_INTEGER;
    const rightRank = right.featured_rank ?? Number.MAX_SAFE_INTEGER;
    return leftRank - rightRank;
  });
}

export function getProjectBySlug(slug: string | null): ProjectRecord | null {
  if (!slug) {
    return null;
  }
  return siteContent.projects.find((project) => project.slug === slug) ?? null;
}

export function getArchiveBySlug(slug: string | null): ProjectRecord | null {
  if (!slug) {
    return null;
  }
  return siteContent.archive.find((record) => record.slug === slug) ?? null;
}

export function getProjectsByType(): Array<{
  type: CaseStudyType;
  label: string;
  projects: ProjectRecord[];
}> {
  return PROJECT_TYPE_ORDER.map((type) => ({
    type,
    label: PROJECT_TYPE_LABELS[type],
    projects: siteContent.projects.filter(
      (project) => project.status !== "featured" && project.case_study_type === type,
    ),
  })).filter((group) => group.projects.length > 0);
}

export function getArchiveRecords(): ProjectRecord[] {
  return [...siteContent.archive];
}

export function getClientProofCount(): number {
  return siteContent.clients.filter((client) => client.project_slugs.length > 0).length;
}

export function getTopLevelNav(): Array<{ label: string; path: string }> {
  return [
    { label: "Work", path: "/projects" },
    { label: "Studio", path: "/studio" },
    { label: "Team", path: "/team" },
    { label: "Contact", path: "/contact" },
    { label: "Archive", path: "/archive" },
  ];
}
