import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const contentRoot = path.join(repoRoot, "content");
const publicMediaRoot = path.join(repoRoot, "public", "content-media");
const bundledLegacyRoot = path.join(repoRoot, "sources", "old-website");
const envLegacyRoot = process.env.NEWSENSE_LEGACY_ROOT;
const legacyRoot = [envLegacyRoot, bundledLegacyRoot].find((candidate) => candidate && fs.existsSync(candidate));

if (!legacyRoot) {
  throw new Error(
    "Unable to locate the Newsense legacy source bundle. Set NEWSENSE_LEGACY_ROOT or restore sources/old-website.",
  );
}

const legacyDataRoot = path.join(legacyRoot, "data");

const FEATURED_ORDER = [
  "re-outland",
  "oneplus-softgold",
  "oneplus-lava-red",
  "ikodoo",
  "agm-glory",
  "oneplus-experience-store",
  "divine-heritage",
];

const PROJECT_TYPE_BY_SLUG = {
  "agm-glory": "motion",
  "agm-x2": "motion",
  "agm-x2-football": "campaign-system",
  "agm-x3": "motion",
  "agm-x5": "motion",
  "alpha-source": "archive-fragment",
  "arte-artifacts": "archive-fragment",
  "cider-and-milk": "archive-fragment",
  "divine-heritage": "editorial-stills",
  ikodoo: "motion",
  kaa: "campaign-system",
  "oneplus-experience-store": "editorial-stills",
  "oneplus-lava-red": "campaign-system",
  "oneplus-softgold": "campaign-system",
  "op-roadtrip": "motion",
  "re-outland": "campaign-system",
  seasalt: "archive-fragment",
  "tune-speaker": "archive-fragment",
  "vito-coffee": "archive-fragment",
};

const TEAM_ROLE_BY_NAME = {
  "Amyth Venkataramaiah": "Founder and Executive Producer",
  "Sant Mote": "Creative Director",
  "Suraj Singh Thakur": "Director of Photography",
};

const HOME_SUPPORT_COPY =
  "We are a multi-disciplinary team of creators who strive to understand brands and work with them to bring great ideas to life.";
const STUDIO_SUMMARY =
  "We specialise in Film and Design with a strong focus on understanding brands and crafting creative solutions which delight.";
const STUDIO_SUPPORT =
  "Newsense is based in Bangalore, India. We are a team of creatives who are passionate to bring unique ideas to life.";

function readJson(name) {
  return JSON.parse(fs.readFileSync(path.join(legacyDataRoot, `${name}.json`), "utf8"));
}

function readOptionalRepoJson(relativePath, fallbackValue) {
  const targetPath = path.join(repoRoot, relativePath);
  if (!fs.existsSync(targetPath)) {
    return fallbackValue;
  }

  return JSON.parse(fs.readFileSync(targetPath, "utf8"));
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeJson(filePath, data) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

function cleanSummary(text) {
  return (text || "").replace(/\s+/g, " ").trim();
}

function makeShortBio(role, bio) {
  const withoutRole = bio.startsWith(role) ? bio.slice(role.length).trim() : bio;
  const firstSentence = withoutRole.split(". ")[0]?.trim() ?? withoutRole;
  return firstSentence.endsWith(".") ? firstSentence : `${firstSentence}.`;
}

function copyPublicAsset(sourceRelativePath, targetRelativePath) {
  const sourcePath = path.join(legacyRoot, sourceRelativePath);
  const targetPath = path.join(publicMediaRoot, targetRelativePath);

  if (!fs.existsSync(sourcePath)) {
    return null;
  }

  ensureDir(path.dirname(targetPath));
  fs.copyFileSync(sourcePath, targetPath);
  return `/content-media/${targetRelativePath.replaceAll(path.sep, "/")}`;
}

function chooseCoverAsset(project) {
  const imageAssets = project.local_image_assets || [];
  return (
    imageAssets.find((asset) => !asset.includes("cedf7c7c65604fe4b55695791e9f634c")) ||
    imageAssets[0] ||
    null
  );
}

function buildMediaRecord(project, coverImageUrl, galleryImages) {
  return {
    cover_image: coverImageUrl,
    local_image_count: (project.local_image_assets || []).length,
    local_video_count: (project.local_video_assets || []).length,
    gallery_images: galleryImages,
    gallery_items: (project.gallery_items || []).slice(0, 6).map((item) => ({
      id: item.item_id || `${project.slug}-${item.gallery_index}`,
      title: item.title || project.hero_heading,
      description: item.description || "",
      media_type: item.media_type || "image",
      quality_count: (item.qualities || []).length,
    })),
    source_image_assets: (project.local_image_assets || []).slice(0, 12),
    source_video_assets: (project.local_video_assets || []).slice(0, 8),
    video_asset_ids: project.video_asset_ids || [],
  };
}

function titleWithoutSuffix(title, heroHeading) {
  if (!title) {
    return heroHeading;
  }
  return title.replace(/\s*\|\s*Newsense\s*$/i, "").trim();
}

function buildServiceRecords(serviceLabels, kind) {
  return serviceLabels.map((label) => ({
    id: `${kind}-${slugify(label)}`,
    slug: slugify(label),
    label,
    kind,
  }));
}

function main() {
  const brandSummary = readJson("brand-summary");
  const clientsSummary = readJson("clients");
  const contact = readJson("contact");
  const team = readJson("team");
  const services = readJson("services");
  const projects = readJson("projects");
  const rebuildBrief = readJson("rebuild-brief");
  const teamAssetMap = readOptionalRepoJson("sources/team-asset-map.json", {
    members: {},
    candidates: {},
  });

  ensureDir(contentRoot);
  ensureDir(path.join(contentRoot, "projects"));
  ensureDir(path.join(contentRoot, "archive"));
  ensureDir(path.join(publicMediaRoot, "projects"));
  ensureDir(path.join(publicMediaRoot, "brand"));

  const logoAsset = copyPublicAsset(
    "assets/images/bf852dca99-dd4e19_cedf7c7c65604fe4b55695791e9f634c-mv2.png",
    "brand/newsense-wordmark.png",
  );

  const studio = {
    id: "newsense-studio",
    slug: "studio",
    name: brandSummary.name,
    wordmark_asset: logoAsset,
    website: brandSummary.website,
    positioning: brandSummary.description,
    support_copy: HOME_SUPPORT_COPY,
    about_summary: STUDIO_SUMMARY,
    about_support: STUDIO_SUPPORT,
    location_city: brandSummary.contact.address.addressLocality,
    location_country: brandSummary.contact.address.addressCountry,
    contact,
    services: services.studio_services,
    client_roster: clientsSummary.about_page_clients,
    brand_tokens: {
      palette: [
        "near-black",
        "charcoal",
        "stone",
        "aged bronze",
        "smoked neutral",
      ],
      notes: brandSummary.notes,
    },
    source_refs: [
      "sources/old-website/data/brand-summary.json",
      "sources/old-website/content/pages/home.md",
      "sources/old-website/content/pages/about.md",
    ],
  };

  const teamRecords = team.map((member, index) => {
    const role = TEAM_ROLE_BY_NAME[member.name] || "Team";
    const slug = slugify(member.name);
    const assetEntry = teamAssetMap.members?.[slug] || {};
    return {
      id: `team-${slug}`,
      slug,
      name: member.name,
      role,
      bio_full: member.bio,
      bio_short: makeShortBio(role, member.bio),
      order: index + 1,
      portrait_asset: assetEntry.portrait_asset || null,
      scene_asset: assetEntry.scene_asset || null,
      asset_status: assetEntry.asset_status || "pending",
      asset_notes: assetEntry.asset_notes || [],
      specialties:
        member.name === "Sant Mote"
          ? ["Campaign Strategy", "Design", "3D", "VFX"]
          : member.name === "Amyth Venkataramaiah"
            ? ["Production", "Photography", "Execution"]
            : ["Cinematography", "Framing", "Atmosphere"],
      source_refs: [
        "sources/old-website/data/team.json",
        "sources/old-website/content/pages/about.md",
      ],
    };
  });

  const serviceRecords = {
    studio_services: buildServiceRecords(services.studio_services, "studio"),
    project_service_tags: buildServiceRecords(services.project_services, "project-tag"),
    source_refs: [
      "sources/old-website/data/services.json",
      "sources/old-website/content/pages/about.md",
    ],
  };

  const clientNames = Array.from(
    new Set([...clientsSummary.about_page_clients, ...clientsSummary.project_clients]),
  ).sort((a, b) => a.localeCompare(b));

  const allProjectRecords = [];
  const archiveRecords = [];
  const imageManifest = [];

  for (const project of projects) {
    const isArchive = Boolean(project.placeholder);
    const coverSource = chooseCoverAsset(project);
    const ext = coverSource ? path.extname(coverSource) || ".jpg" : ".jpg";
    const coverImageUrl = coverSource
      ? copyPublicAsset(coverSource, `projects/${project.slug}-cover${ext}`)
      : null;

    if (coverImageUrl) {
      imageManifest.push({
        id: `cover-${project.slug}`,
        kind: "image",
        local_path: coverImageUrl,
        source_url: coverSource,
        owner_record_type: isArchive ? "archive" : "project",
        owner_record_slug: project.slug,
        purpose: "cover",
        status: "available-local",
      });
    }

    const galleryImages = (project.local_image_assets || [])
      .slice(0, 6)
      .map((sourcePath, index) => {
        if (sourcePath === coverSource && coverImageUrl) {
          return {
            id: `${project.slug}-gallery-${index + 1}`,
            src: coverImageUrl,
            alt: `${project.hero_heading} frame ${index + 1}`,
            emphasis: index === 0 ? "primary" : "support",
          };
        }

        const ext = path.extname(sourcePath) || ".jpg";
        const copied = copyPublicAsset(
          sourcePath,
          `projects/${project.slug}-gallery-${index + 1}${ext}`,
        );

        if (!copied) {
          return null;
        }

        imageManifest.push({
          id: `gallery-${project.slug}-${index + 1}`,
          kind: "image",
          local_path: copied,
          source_url: sourcePath,
          owner_record_type: isArchive ? "archive" : "project",
          owner_record_slug: project.slug,
          purpose: `gallery-${index + 1}`,
          status: "available-local",
        });

        return {
          id: `${project.slug}-gallery-${index + 1}`,
          src: copied,
          alt: `${project.hero_heading} frame ${index + 1}`,
          emphasis: index === 0 ? "primary" : "support",
        };
      })
      .filter(Boolean);

    const baseRecord = {
      id: project.slug,
      slug: project.slug,
      route: isArchive ? `/archive/${project.slug}` : `/projects/${project.slug}`,
      title: titleWithoutSuffix(project.title, project.hero_heading),
      status: isArchive
        ? "archive"
        : FEATURED_ORDER.includes(project.slug)
          ? "featured"
          : "live",
      case_study_type: PROJECT_TYPE_BY_SLUG[project.slug],
      page_kind: project.page_kind,
      hero_heading: project.hero_heading,
      hero_summary: cleanSummary(project.hero_summary),
      primary_client: project.primary_client,
      clients: project.clients || [],
      primary_service: project.primary_service,
      services: project.services || [],
      year: project.years?.[0] || null,
      years: project.years || [],
      featured_rank: FEATURED_ORDER.indexOf(project.slug) >= 0 ? FEATURED_ORDER.indexOf(project.slug) + 1 : null,
      gallery_mode:
        (project.local_video_assets || []).length > 0
          ? "video-first"
          : PROJECT_TYPE_BY_SLUG[project.slug] === "editorial-stills"
            ? "stills-first"
            : "story-first",
      credits: project.credits || {},
      credits_text: project.credits_text || "",
      narrative_sections: project.narrative_sections || [],
      outcome_sections: project.outcome_sections || [],
      media: buildMediaRecord(project, coverImageUrl, galleryImages),
      clean_text: cleanSummary(project.clean_text),
      source_warnings: project.source_warnings || [],
      source_refs: [
        `sources/old-website/data/projects.json#${project.slug}`,
        `sources/old-website/content/pages/${project.slug}.md`,
      ],
    };

    if (isArchive) {
      archiveRecords.push({
        ...baseRecord,
        archive_reason: "placeholder-template-route",
        placeholder: true,
      });
    } else {
      allProjectRecords.push({
        ...baseRecord,
        placeholder: false,
      });
    }
  }

  const clients = clientNames.map((name) => {
    const projectSlugs = allProjectRecords
      .filter((project) => project.clients.includes(name))
      .map((project) => project.slug);

    return {
      id: `client-${slugify(name)}`,
      slug: slugify(name),
      name,
      proof_sources: [
        ...(clientsSummary.about_page_clients.includes(name) ? ["about-page"] : []),
        ...(projectSlugs.length > 0 ? ["project-routes"] : []),
      ],
      project_slugs: projectSlugs,
      about_page_presence: clientsSummary.about_page_clients.includes(name),
      notes: [],
    };
  });

  const mediaManifest = {
    images: imageManifest,
    videos: [],
    missing_assets: [],
    source_warnings: [],
  };

  for (const project of allProjectRecords) {
    writeJson(path.join(contentRoot, "projects", `${project.slug}.json`), project);
  }

  for (const archive of archiveRecords) {
    writeJson(path.join(contentRoot, "archive", `${archive.slug}.json`), archive);
  }

  writeJson(path.join(contentRoot, "studio.json"), studio);
  writeJson(path.join(contentRoot, "team.json"), teamRecords);
  writeJson(path.join(contentRoot, "services.json"), serviceRecords);
  writeJson(path.join(contentRoot, "clients.json"), clients);
  writeJson(path.join(contentRoot, "media-manifest.json"), mediaManifest);

  const siteContent = {
    generated_at: new Date().toISOString(),
    metadata: {
      featured_order: FEATURED_ORDER,
      placeholder_routes: rebuildBrief.placeholder_routes,
      total_projects: allProjectRecords.length,
      total_archive: archiveRecords.length,
    },
    studio,
    team: teamRecords,
    services: serviceRecords,
    clients,
    projects: allProjectRecords,
    archive: archiveRecords,
    media_manifest: mediaManifest,
  };

  writeJson(path.join(contentRoot, "site-content.json"), siteContent);

  console.log(
    `Built Newsense content runtime with ${allProjectRecords.length} live projects and ${archiveRecords.length} archive records.`,
  );
}

main();
