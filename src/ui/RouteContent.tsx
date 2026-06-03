import { type ReactNode, useRef, useState } from "react";
import {
  getArchiveBySlug,
  getArchiveRecords,
  getClientProofCount,
  getFeaturedProjects,
  getProjectBySlug,
  getProjectsByType,
  PROJECT_TYPE_ORDER,
  PROJECT_TYPE_LABELS,
  siteContent,
  type ProjectRecord,
  type TeamRecord,
} from "../content/siteContent";
import { useSceneStore } from "../store/sceneStore";
import { ExpansionTypography } from "./ExpansionTypography";
import { TeamMemberScenePreview } from "./TeamMemberScenePreview";
import { BrandClientChorus } from "./brand/BrandClientChorus";
import { BrandDetailFactsStrip } from "./brand/BrandDetailFactsStrip";
import { BrandImageGallery } from "./brand/BrandImageGallery";
import { BrandNarrativeCard } from "./brand/BrandNarrativeCard";
import { BrandShowcaseCard } from "./brand/BrandShowcaseCard";
import { BrandStatementCard } from "./brand/BrandStatementCard";
import { useRouteStoryMotion } from "./useRouteStoryMotion";
import { useRouteScrollProgress } from "./useRouteScrollProgress";

const GROUP_INTROS: Record<string, string> = {
  "campaign-system":
    "These are the projects where the frame is built before the audience ever sees the release.",
  motion:
    "These projects move through atmosphere, rhythm, and timing to make the signal felt in motion.",
  "editorial-stills":
    "These projects rely on restraint, surface, and image sequencing to hold attention without noise.",
};

const FAMILY_OBJECT_LANGUAGE: Record<string, string> = {
  "campaign-system": "Monoliths, marks, posters, activation frames",
  motion: "Launch vectors, motion nodes, release surfaces",
  "editorial-stills": "Frames, rooms, light studies, material planes",
};

const GROUP_SECTION_TITLES: Record<string, string> = {
  "campaign-system": "Campaign systems that shape the release before it lands.",
  motion: "Motion work that carries the signal through rhythm and atmosphere.",
  "editorial-stills": "Editorial images that hold attention with restraint.",
};

const PALETTE_SWATCHES: Record<string, string> = {
  "near-black": "#0f0f10",
  charcoal: "#232224",
  stone: "#71695d",
  "aged bronze": "#8b6841",
  "smoked neutral": "#cfc3af",
};

function WordmarkStamp({ muted = false }: { muted?: boolean }) {
  if (!siteContent.studio.wordmark_asset) {
    return null;
  }

  return (
    <img
      alt="Newsense wordmark"
      className={`wordmark-stamp ${muted ? "muted" : ""}`}
      src={siteContent.studio.wordmark_asset}
    />
  );
}

function StoryMetric({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <article className="story-metric" data-float="">
      <span className="story-metric-label">{label}</span>
      <strong>{value}</strong>
      <p>{note}</p>
    </article>
  );
}

function RouteProgress({
  progress,
  label,
  note,
}: {
  progress: number;
  label: string;
  note: string;
}) {
  return (
    <section className="route-progress" data-reveal="hero">
      <div>
        <span className="story-metric-label">Reading layer</span>
        <p>{label}</p>
      </div>
      <div className="route-progress-rail" aria-hidden="true">
        <span style={{ transform: `scaleX(${Math.max(progress, 0.03)})` }} />
      </div>
      <div className="route-progress-meta">
        <span>{Math.round(progress * 100)}%</span>
        <p>{note}</p>
      </div>
    </section>
  );
}

function StoryHero({
  index,
  eyebrow,
  title,
  body,
  aside,
  metrics,
  variant = "manifesto",
}: {
  index: string;
  eyebrow: string;
  title: string;
  body: string;
  aside: string;
  metrics: Array<{ label: string; value: string; note: string }>;
  variant?: "manifesto" | "atlas" | "detail" | "statement" | "compact";
}) {
  return (
    <section className={`story-hero story-hero-${variant}`} data-reveal="hero">
      <div className="story-hero-copy">
        <span className="route-index" data-reveal="hero">
          {index}
        </span>
        <p className="eyebrow" data-reveal="hero">
          {eyebrow}
        </p>
        <h1 data-reveal="hero">{title}</h1>
        <p className="support-copy story-support" data-reveal="hero">
          {body}
        </p>
      </div>

      <div className="story-hero-aside" data-reveal="hero">
        <WordmarkStamp muted />
        <p className="story-aside-copy">{aside}</p>
        <div className="hero-ledger" data-stagger="">
          {metrics.map((metric) => (
            <StoryMetric
              key={metric.label}
              label={metric.label}
              note={metric.note}
              value={metric.value}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StorySection({
  index,
  kicker,
  title,
  body,
  aside,
  children,
  muted = false,
}: {
  index: string;
  kicker: string;
  title: string;
  body: string;
  aside?: string;
  children?: ReactNode;
  muted?: boolean;
}) {
  return (
    <section className={`story-section ${muted ? "muted" : ""}`} data-reveal="section">
      <div className="story-section-head">
        <span className="story-section-index">{index}</span>
        <div>
          <span className="section-kicker">{kicker}</span>
          <h2>{title}</h2>
        </div>
      </div>
      <div className="story-section-body">
        <div className="story-prose">
          <p>{body}</p>
        </div>
        {aside ? <p className="story-side-note">{aside}</p> : null}
      </div>
      {children}
    </section>
  );
}

function SignalFamilyCard({
  label,
  objectLanguage,
  count,
  body,
}: {
  label: string;
  objectLanguage: string;
  count: number;
  body: string;
}) {
  return (
    <article className="signal-family-card" data-reveal="section">
      <span className="story-metric-label">{label}</span>
      <strong>{String(count).padStart(2, "0")}</strong>
      <p>{body}</p>
      <span className="signal-family-object">{objectLanguage}</span>
    </article>
  );
}

function PaletteToken({ label }: { label: string }) {
  return (
    <article className="palette-token" data-float="">
      <span
        className="palette-swatch"
        style={{ background: PALETTE_SWATCHES[label] ?? "#55514c" }}
      />
      <div>
        <span className="story-metric-label">Brand tone</span>
        <strong>{label}</strong>
      </div>
    </article>
  );
}

function TeamStageCard({ member, index }: { member: TeamRecord; index: number }) {
  const hasPortrait = Boolean(member.portrait_asset);
  const hasScene = Boolean(member.scene_asset);
  const canTogglePreview = hasPortrait && hasScene;
  const [showScene, setShowScene] = useState(Boolean(hasScene && !hasPortrait));

  return (
    <article className="team-stage-card" data-reveal="section">
      <span className="team-stage-index">{String(index + 1).padStart(2, "0")}</span>
      <span className="team-role">{member.role}</span>
      <div className={`team-stage-preview ${showScene ? "scene-visible" : "portrait-visible"}`}>
        {hasPortrait ? (
          <div className="team-stage-portrait">
            <img alt={member.name} src={member.portrait_asset ?? undefined} />
          </div>
        ) : null}
        {showScene && member.scene_asset ? (
          <div className="team-stage-scene">
            <TeamMemberScenePreview name={member.name} path={member.scene_asset} />
          </div>
        ) : null}
        {!hasPortrait && !hasScene ? (
          <div className="team-stage-placeholder" aria-hidden="true">
            {member.name
              .split(" ")
              .slice(0, 2)
              .map((part) => part[0])
              .join("")}
          </div>
        ) : null}
      </div>
      {canTogglePreview ? (
        <button
          className="team-stage-toggle"
          onClick={() => setShowScene((value) => !value)}
          type="button"
        >
          {showScene ? "Show portrait" : "View object"}
        </button>
      ) : null}
      <h2>{member.name}</h2>
      <p className="team-summary">{member.bio_short}</p>
      <p className="team-detail">{member.bio_full}</p>
      {member.asset_status || member.scene_asset ? (
        <div className="team-stage-meta">
          {member.scene_asset ? (
            <span className="info-pill">3D identity asset ready</span>
          ) : null}
          {member.asset_status ? (
            <span className="info-pill subtle">{member.asset_status.split("-").join(" ")}</span>
          ) : null}
        </div>
      ) : null}
      <div className="team-monogram" aria-hidden="true">
        {member.name
          .split(" ")
          .slice(0, 2)
          .map((part) => part[0])
          .join("")}
      </div>
      <div className="pill-grid compact">
        {member.specialties.map((specialty) => (
          <span key={specialty} className="info-pill">
            {specialty}
          </span>
        ))}
      </div>
    </article>
  );
}

function HomeContent({ navigate }: { navigate: (path: string) => void }) {
  const featured = getFeaturedProjects().slice(0, 4);

  return (
    <>
      <StoryHero
        aside="The field opens as atmosphere. The reading layer adds clarity, restraint, and a deliberate path through the work."
        body="Newsense shapes launches, campaigns, spaces, and moving image into clearer brand systems."
        eyebrow="Threshold into signal"
        index="00"
        metrics={[
          {
            label: "Live signals",
            value: String(siteContent.metadata.total_projects),
            note: "Project routes carried into the first atlas.",
          },
          {
            label: "Client proof",
            value: String(getClientProofCount()),
            note: "Brands preserved inside the recovered archive.",
          },
          {
            label: "Base mode",
            value: "Field",
            note: "Astronaut, grassland, and traversal stay live underneath.",
          },
        ]}
        title="Brand noise, shaped into signal."
        variant="manifesto"
      />

      <StorySection
        aside="The landing page can hold atmosphere without losing the path through the work."
        body="Campaign systems, motion releases, and editorial framing give the archive a clear spine. The page lets them unfold as a paced story."
        index="01"
        kicker="Route thesis"
        title="The world unfolds in chapters, not panels."
      >
        <div className="cta-row story-cta-row" data-stagger="">
          <button className="cta-button primary" onClick={() => navigate("/projects")} type="button">
            Enter the atlas
          </button>
          <button className="cta-button secondary" onClick={() => navigate("/studio")} type="button">
            Read the method
          </button>
          <button className="cta-button secondary" onClick={() => navigate("/contact")} type="button">
            Start the brief
          </button>
        </div>
      </StorySection>

      <StorySection
        aside="The first four signals give the visitor a strong read before the wider atlas opens."
        body="Featured work arrives as a sequence with weight and air, not as a wall of equally loud cards."
        index="02"
        kicker="First-wave signals"
        title="Featured work opens the field with conviction."
      >
        <div className="atlas-feature-grid" data-stagger="">
          {featured.map((project) => (
            <BrandShowcaseCard
              key={project.slug}
              mode="feature"
              onOpen={navigate}
              project={project}
            />
          ))}
        </div>
      </StorySection>
    </>
  );
}

function ProjectsIndexContent({ navigate }: { navigate: (path: string) => void }) {
  const featured = getFeaturedProjects();
  const groups = getProjectsByType();
  const featuredCover =
    featured[0]?.media.cover_image ??
    groups[0]?.projects[0]?.media.cover_image ??
    siteContent.studio.wordmark_asset ??
    "";
  const familySummaries = PROJECT_TYPE_ORDER.map((type) => ({
    type,
    label: PROJECT_TYPE_LABELS[type],
    count: siteContent.projects.filter((project) => project.case_study_type === type).length,
  })).filter((group) => group.count > 0);

  return (
    <>
      <ExpansionTypography
        body="Newsense builds campaigns, launches, and image systems that sharpen attention rather than add more noise to the field."
        eyebrow="Signal field"
        index="01"
        lines={[
          [{ kind: "text", text: "Campaigns" }],
          [{ kind: "text", text: "that cut" }],
          [
            {
              kind: "expand",
              image: featuredCover,
              alt: "Featured Newsense project detail",
              text: "through.",
              motion: "skewed",
            },
          ],
        ]}
        metrics={
          <>
            <StoryMetric
              label="Featured"
              note="Projects carrying the first narrative weight."
              value={String(featured.length)}
            />
            <StoryMetric
              label="Field state"
              note="The atlas floats above the live field."
              value="Explorable"
            />
            <StoryMetric
              label="Project families"
              note="Clusters with distinct forms of signal."
              value={String(familySummaries.length)}
            />
          </>
        }
        note="The work arrives as authored proof, not as a flat media wall. The world stays visible underneath while the atlas sharpens into view."
        variant="projects"
      />

      <BrandClientChorus clients={siteContent.studio.client_roster} />

      <StorySection
        aside="These pieces stop the scroll quickly. They deserve more air, more rhythm, and more cinematic weight."
        body="The featured strip acts like the studio’s opening argument. It establishes authority before the route opens into taxonomy."
        index="02"
        kicker="Opening argument"
        title="Featured work establishes the studio before the field expands."
      >
        <div className="signal-family-grid" data-stagger="">
          {familySummaries.map((group) => (
            <SignalFamilyCard
              key={group.type}
              body={GROUP_INTROS[group.type] ?? "A distinct family inside the Newsense atlas."}
              count={group.count}
              label={group.label}
              objectLanguage={FAMILY_OBJECT_LANGUAGE[group.type] ?? "Editorial object family"}
            />
          ))}
        </div>
        <div className="atlas-feature-grid" data-stagger="">
          {featured.map((project) => (
            <BrandShowcaseCard
              key={project.slug}
              mode="feature"
              onOpen={navigate}
              project={project}
            />
          ))}
        </div>
      </StorySection>

      {groups.map((group, index) => (
        <StorySection
          key={group.type}
          aside={GROUP_INTROS[group.type] ?? "This cluster helps the visitor read the work through a clearer lens."}
          body={`Rather than flattening everything into one endlessly equal stream, this band lets the visitor understand how ${group.label.toLowerCase()} behaves inside the studio.`}
          index={String(index + 3).padStart(2, "0")}
          kicker={group.label}
          title={GROUP_SECTION_TITLES[group.type] ?? group.label}
        >
          <div className="atlas-band-grid" data-stagger="">
            {group.projects.map((project) => (
              <BrandShowcaseCard key={project.slug} onOpen={navigate} project={project} />
            ))}
          </div>
        </StorySection>
      ))}
    </>
  );
}

function ProjectDetailContent({
  navigate,
  project,
}: {
  navigate: (path: string) => void;
  project: ProjectRecord;
}) {
  return (
    <>
      <StoryHero
        aside="The case-study route lets the camera stop moving long enough for one signal to come fully into focus."
        body={project.hero_summary}
        eyebrow={PROJECT_TYPE_LABELS[project.case_study_type] ?? project.case_study_type}
        index="02"
        metrics={[
          {
            label: "Client",
            value: project.primary_client,
            note: "The lead brand carried by this signal.",
          },
          {
            label: "Service",
            value: project.primary_service,
            note: "The primary entry point into the work.",
          },
          {
            label: "Assets",
            value: `${project.media.local_image_count} / ${project.media.local_video_count}`,
            note: "Local image and video surfaces preserved from the scrape.",
          },
        ]}
        title={project.hero_heading}
        variant="detail"
      />

      <BrandDetailFactsStrip project={project} />

      <section className="detail-layout" data-reveal="section">
        <aside className="detail-rail">
          <button className="text-button" onClick={() => navigate("/projects")} type="button">
            Back to atlas
          </button>
          <WordmarkStamp muted />
          <div className="detail-ledger">
            <StoryMetric
              label="Mode"
              note="How this route is categorized in the atlas."
              value={project.case_study_type.replace("-", " ")}
            />
            <StoryMetric
              label="Media"
              note="Current preserved media mode from the archive."
              value={project.gallery_mode}
            />
            <StoryMetric
              label="Year"
              note="Original date context carried into the rebuild package."
              value={project.year ?? "Preserved"}
            />
          </div>
          <div className="pill-grid">
            {project.services.map((service) => (
              <span key={service} className="info-pill">
                {service}
              </span>
            ))}
          </div>
        </aside>

        <div className="detail-scroll">
          <BrandImageGallery project={project} />

          <StorySection
            aside="The image field keeps the route from collapsing into text-only documentation. It lets the preserved asset memory carry part of the story."
            body="The case study unfolds like a sequence of surfaces, not a single poster image followed by plain notes. Preserved imagery gives each route atmosphere and proof."
            index="03"
            kicker="Image field"
            title="Recovered media now participates in the story."
          />

          <StorySection
            aside="Narrative cards explain what the project was trying to do and how the signal was shaped."
            body="This chapter set is the build-up: context, direction, and the choices that gave the project its recognisable form."
            index="04"
            kicker="Narrative arc"
            title="The signal gets built in visible steps."
          >
            <div className="chapter-list" data-stagger="">
              {project.narrative_sections.map((chapter, index) => (
                <BrandNarrativeCard
                  key={`narrative-${chapter.heading}`}
                  chapter={chapter}
                  index={String(index + 1).padStart(2, "0")}
                  kind="Narrative"
                />
              ))}
            </div>
          </StorySection>

          {project.outcome_sections.length > 0 ? (
            <StorySection
              aside="Outcome cards make the route feel resolved. They show what finally reached the audience, not just what was planned."
              body="The second movement is what landed: launch behavior, release form, spatial experience, or final image logic."
              index="05"
              kicker="Outcome arc"
              title="The signal leaves the studio and meets the audience."
            >
              <div className="chapter-list" data-stagger="">
                {project.outcome_sections.map((chapter, index) => (
                  <BrandNarrativeCard
                    key={`outcome-${chapter.heading}`}
                    chapter={chapter}
                    index={String(index + 1).padStart(2, "0")}
                    kind="Outcome"
                  />
                ))}
              </div>
            </StorySection>
          ) : null}

          <StorySection
            aside="Credits stay readable and structured so the case study remains a document, not just a poster."
            body="The project ledger matters because Newsense is not only producing images. It is producing systems, direction, execution, and coordinated release."
            index="06"
            kicker="Contributors"
            title="Project credits stay explicit."
          >
            <div className="credits-grid" data-stagger="">
              {Object.entries(project.credits).map(([label, value]) => (
                <article key={label} className="meta-row">
                  <span>{label}</span>
                  <p>{value || "n/a"}</p>
                </article>
              ))}
            </div>
          </StorySection>

          {project.source_warnings.length > 0 ? (
            <StorySection
              aside="Preservation notes stay visible so replacement-site work can distinguish clean source from noisy residue."
              body={project.source_warnings.join(" ")}
              index="07"
              kicker="Preservation note"
              title="This route still carries source warnings from the legacy scrape."
              muted
            />
          ) : null}
        </div>
      </section>
    </>
  );
}

function StudioContent({ navigate }: { navigate: (path: string) => void }) {
  const studioCover =
    getFeaturedProjects()[1]?.media.cover_image ??
    getFeaturedProjects()[0]?.media.cover_image ??
    siteContent.studio.wordmark_asset ??
    "";
  const methodSteps = [
    {
      title: "Sense the brief",
      body: "The first job is to identify what is noise, what is signal, and what actually deserves emphasis.",
    },
    {
      title: "Frame the system",
      body: "The second job is to turn that signal into a visual, spatial, or motion system that can hold attention.",
    },
    {
      title: "Release with control",
      body: "The third job is to let the work land across media, campaigns, environments, and image without losing coherence.",
    },
  ];

  return (
    <>
      <ExpansionTypography
        body="Newsense works across design, film, motion, and brand storytelling to bring unresolved ideas into clearer systems."
        eyebrow="Interpretation engine"
        index="03"
        lines={[
          [{ kind: "text", text: "Sense" }],
          [{ kind: "text", text: "before" }],
          [
            {
              kind: "expand",
              image: studioCover,
              alt: "Newsense studio project still",
              text: "style.",
              motion: "plain",
              ratio: "strip",
            },
          ],
        ]}
        metrics={
          <>
            <StoryMetric
              label="Base"
              note="Physical grounding for the current studio identity."
              value={siteContent.studio.location_city}
            />
            <StoryMetric
              label="Services"
              note="Capabilities currently preserved from the original site."
              value={String(siteContent.services.studio_services.length)}
            />
            <StoryMetric
              label="Clients"
              note="Names already carried into the rebuilt content runtime."
              value={String(siteContent.studio.client_roster.length)}
            />
          </>
        }
        note="This page explains how the studio thinks before it lists what the studio does. The surface stays authored, calm, and exact."
        variant="studio"
      />

      <StorySection
        aside="This is the narrative backbone of the studio: not style for its own sake, but the movement from clutter into a clear system."
        body="Newsense works best when the brief still feels unresolved. The studio does not add decoration to clarity. It builds clarity where it does not yet exist."
        index="04"
        kicker="Method"
        title="The studio moves through three deliberate acts."
      >
        <div className="method-grid" data-stagger="">
          {methodSteps.map((step, index) => (
            <article key={step.title} className="story-metric method-card">
              <span className="story-metric-label">Act {String(index + 1).padStart(2, "0")}</span>
              <strong>{step.title}</strong>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </StorySection>

      <StorySection
        aside="The brand work we already did has to appear here as studio logic, not remain trapped in separate planning docs."
        body="Newsense means a move toward new sense: less nuisance, more legibility, more emotional precision, and stronger release control. The visual world stays calm, tactile, and exact enough to let the signal emerge."
        index="05"
        kicker="Brand reading"
        title="The studio identity is editorial, spatial, and materially restrained."
      >
        <div className="palette-grid" data-stagger="">
          {siteContent.studio.brand_tokens.palette.map((token) => (
            <PaletteToken key={token} label={token} />
          ))}
        </div>
        <div className="chapter-list" data-stagger="">
          {siteContent.studio.brand_tokens.notes.map((note, index) => (
            <article key={note} className="chapter-card">
              <div className="chapter-card-head">
                <span className="chapter-card-index">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <span className="section-kicker">Constraint</span>
                  <h3>Interior principle</h3>
                </div>
              </div>
              <p>{note}</p>
            </article>
          ))}
        </div>
      </StorySection>

      <StorySection
        aside="Capabilities read as a designed service system, not a pasted unordered list."
        body={siteContent.studio.support_copy}
        index="06"
        kicker="Capabilities"
        title="The practice spans design, film, motion, and campaign framing."
      >
        <div className="method-grid" data-stagger="">
          {siteContent.services.studio_services.map((service, index) => (
            <BrandStatementCard
              key={service.id}
              index={String(index + 1).padStart(2, "0")}
              label={service.kind === "studio-capability" ? "Capability" : "Service"}
              title={service.label}
            />
          ))}
        </div>
      </StorySection>

      <StorySection
        aside="Client proof arrives as a rhythm, not a static pile of brand names."
        body="The roster gives weight to the method. These names are not here as logos alone. They are evidence of range, trust, and sustained execution."
        index="07"
        kicker="Client chorus"
        title="The work is already in conversation with brands across launches, products, and spaces."
      >
        <BrandClientChorus clients={siteContent.studio.client_roster} compact />
        <div className="cta-row story-cta-row" data-stagger="">
          <button className="cta-button secondary" onClick={() => navigate("/team")} type="button">
            Meet the team
          </button>
          <button className="cta-button primary" onClick={() => navigate("/contact")} type="button">
            Open a brief
          </button>
        </div>
      </StorySection>
    </>
  );
}

function TeamContent() {
  const teamCover =
    siteContent.team.find((member) => member.portrait_asset)?.portrait_asset ??
    getFeaturedProjects()[0]?.media.cover_image ??
    "";

  return (
    <>
      <ExpansionTypography
        body="Newsense is built by strategists, directors, designers, and image-makers who keep the brief, the frame, and the release aligned."
        eyebrow="Signal-makers"
        index="04"
        lines={[
          [{ kind: "text", text: "People" }],
          [{ kind: "text", text: "behind" }],
          [
            {
              kind: "expand",
              image: teamCover,
              alt: "Newsense team portrait",
              text: "signal.",
              motion: "rotated",
              ratio: "portrait",
            },
          ],
        ]}
        metrics={
          <>
            <StoryMetric
              label="Core team"
              note="The current preserved public roster."
              value={String(siteContent.team.length)}
            />
            <StoryMetric
              label="Shared field"
              note="The two disciplines that keep crossing inside the work."
              value="Film + Design"
            />
            <StoryMetric
              label="Working mode"
              note="Framing, strategy, execution, and atmosphere must align."
              value="Intent"
            />
          </>
        }
        note="The team page works as a cast introduction, not a compliance roster. Visual identity matters here, even before the full 3D member pass lands."
        variant="team"
      />

      <StorySection
        aside="This route feels like meeting a cast, not reading a compliance roster."
        body="Each person brings a distinct discipline into the field, but the studio only works because those disciplines keep crossing: strategy, image, production, rhythm, and atmosphere."
        index="05"
        kicker="Ensemble"
        title="Different authorships, one shared sense-making practice."
      >
        <div className="method-grid" data-stagger="">
          {[
            "Campaign thought and visual strategy shape the argument.",
            "Production discipline keeps the ambitious idea executable.",
            "Image-making and cinematography give the work emotional surface.",
          ].map((line, index) => (
            <BrandStatementCard
              key={line}
              index={String(index + 1).padStart(2, "0")}
              label="Shared discipline"
              title={line}
            />
          ))}
        </div>
      </StorySection>

      <section className="team-stage-grid" data-stagger="">
        {siteContent.team.map((member, index) => (
          <TeamStageCard key={member.id} index={index} member={member} />
        ))}
      </section>
    </>
  );
}

function ContactContent() {
  const { contact } = siteContent.studio;
  const prompts = [
    "What signal in the brief feels strongest right now?",
    "Where is the launch still noisy or undefined?",
    "Which surfaces matter most: campaign, motion, environment, or image?",
  ];

  return (
    <>
      <StoryHero
        aside="This route feels precise and inviting, not like a generic contact page dropped in at the end of a portfolio."
        body="If the project still feels noisy, crowded, or undefined, that is usually the right moment to begin the conversation."
        eyebrow="Invitation to clarity"
        index="05"
        metrics={[
          {
            label: "Email",
            value: "Primary",
            note: contact.emails[0],
          },
          {
            label: "Phone",
            value: "Direct",
            note: contact.phones[0],
          },
          {
            label: "Base",
            value: siteContent.studio.location_city,
            note: siteContent.studio.location_country,
          },
        ]}
        title="Bring the brief into sharper form."
        variant="compact"
      />

      <section className="contact-path-grid" data-stagger="">
        <article className="story-metric contact-card">
          <span className="story-metric-label">Email</span>
          <strong>{contact.emails.join(", ")}</strong>
          <p>Start with the project, timeline, and the part of the brief that feels unresolved.</p>
        </article>
        <article className="story-metric contact-card">
          <span className="story-metric-label">Phone</span>
          <strong>{contact.phones.join(", ")}</strong>
          <p>Use this when the project needs a faster read or the brief is already moving.</p>
        </article>
        <article className="story-metric contact-card">
          <span className="story-metric-label">Address</span>
          <strong>{siteContent.studio.location_city}</strong>
          <p>{contact.address}</p>
        </article>
      </section>

      <StorySection
        aside="A better prompt produces a better first conversation. This keeps the route useful instead of decorative."
        body={contact.form_prompt}
        index="06"
        kicker="Conversation prompts"
        title="Bring the essentials and let the signal sharpen from there."
      >
        <div className="method-grid" data-stagger="">
          {prompts.map((prompt, index) => (
            <BrandStatementCard
              key={prompt}
              index={String(index + 1).padStart(2, "0")}
              label="Prompt"
              title={prompt}
            />
          ))}
        </div>
      </StorySection>

      <StorySection
        aside="The route explains what happens after the first message so the invitation feels grounded."
        body="The first conversation is not a formality. It is where the studio starts separating noise from what actually deserves weight."
        index="07"
        kicker="Engagement path"
        title="Three quick moves bring the brief into focus."
      >
        <div className="method-grid" data-stagger="">
          {[
            "Share the brief, launch context, and the surfaces that matter most.",
            "Align on what feels noisy, unfinished, or under-defined in the current idea.",
            "Build the visual and production system that lets the signal land cleanly.",
          ].map((step, index) => (
            <BrandStatementCard
              key={step}
              index={String(index + 1).padStart(2, "0")}
              label="Move"
              title={step}
            />
          ))}
        </div>
      </StorySection>
    </>
  );
}

function ArchiveContent({ navigate }: { navigate: (path: string) => void }) {
  const archiveRecords = getArchiveRecords();
  const selectedArchiveSlug = useSceneStore((state) => state.selectedArchiveSlug);
  const archiveRecord = getArchiveBySlug(selectedArchiveSlug);
  const archiveCover =
    archiveRecord?.media.cover_image ??
    archiveRecords[0]?.media.cover_image ??
    getFeaturedProjects()[0]?.media.cover_image ??
    "";

  if (archiveRecord) {
    return (
      <>
        <StoryHero
          aside="Archive routes stay accessible for provenance, but remain quieter and more obviously secondary than the active field."
          body={archiveRecord.hero_summary}
          eyebrow="Noise shadow"
          index="06"
          metrics={[
            {
              label: "Archive state",
              value: "Preserved",
              note: "Retained for rebuild provenance rather than featured promotion.",
            },
            {
              label: "Route kind",
              value: archiveRecord.page_kind,
              note: "Original route classification from the legacy scrape.",
            },
            {
              label: "Warnings",
              value: String(archiveRecord.source_warnings.length),
              note: "Source warnings currently attached to this record.",
            },
          ]}
          title={archiveRecord.hero_heading}
          variant="detail"
        />

        <StorySection
          aside="The archive must explain why it exists so it never confuses placeholders with active portfolio signals."
          body="This route remains visible because replacement-site work benefits from provenance. It does not belong in the main atlas because it originated from placeholder or template-led legacy content."
          index="07"
          kicker="Preserved without promotion"
          title="The archive is visible, but it does not lead."
          muted
        >
          <div className="cta-row story-cta-row" data-stagger="">
            <button className="cta-button secondary" onClick={() => navigate("/archive")} type="button">
              Back to archive
            </button>
            <button className="cta-button primary" onClick={() => navigate("/projects")} type="button">
              Return to live atlas
            </button>
          </div>
        </StorySection>
      </>
    );
  }

  return (
    <>
      <ExpansionTypography
        body="Historical and placeholder routes remain visible because the rebuild needs memory. They are part of the site’s provenance, not its lead argument."
        eyebrow="Shadow memory"
        index="06"
        lines={[
          [{ kind: "text", text: "Memory" }],
          [{ kind: "text", text: "kept in" }],
          [
            {
              kind: "expand",
              image: archiveCover,
              alt: "Newsense archive memory image",
              text: "shadow.",
              motion: "plain",
              ratio: "square",
            },
          ],
        ]}
        metrics={
          <>
            <StoryMetric
              label="Archive routes"
              note="Template and placeholder surfaces retained for provenance."
              value={String(siteContent.metadata.total_archive)}
            />
            <StoryMetric
              label="Live routes"
              note="Current project routes that still lead the site narrative."
              value={String(siteContent.metadata.total_projects)}
            />
            <StoryMetric
              label="Use"
              note="Held for migration clarity rather than front-stage promotion."
              value="Reference"
            />
          </>
        }
        note="The archive stays atmospheric, but remains visibly quieter than the live work. This is preserved memory, not the opening claim."
        variant="archive"
      />

      <StorySection
        aside="The archive remains important because replacement-site work needs provenance. It does not compete with the live argument of the studio."
        body="These routes are held as migration memory, source breadcrumbs, and caution markers. They are useful when rebuilding, but read quieter than every live route."
        index="07"
        kicker="Archive protocol"
        title="Keep the shadow visible, but do not let it lead."
        muted
      />

      <section className="archive-grid" data-stagger="">
        {archiveRecords.map((record) => (
          <BrandShowcaseCard
            key={record.slug}
            mode="archive"
            onOpen={navigate}
            project={record}
          />
        ))}
      </section>
    </>
  );
}

export function RouteContent({ navigate }: { navigate: (path: string) => void }) {
  const pathname = useSceneStore((state) => state.pathname);
  const route = useSceneStore((state) => state.route);
  const selectedProjectSlug = useSceneStore((state) => state.selectedProjectSlug);
  const project = getProjectBySlug(selectedProjectSlug);
  const rootRef = useRef<HTMLDivElement>(null);
  const progress = useRouteScrollProgress(rootRef, pathname);

  useRouteStoryMotion(rootRef, pathname);

  const routeKind = pathname.startsWith("/projects/")
    ? "project-detail"
    : pathname === "/projects"
      ? "projects"
      : pathname === "/studio"
        ? "studio"
        : pathname === "/team"
          ? "team"
          : pathname === "/contact"
            ? "contact"
            : pathname.startsWith("/archive")
              ? "archive"
              : "home";

  const routeLabel =
    routeKind === "project-detail"
      ? project?.hero_heading ?? "Case study"
      : routeKind === "projects"
        ? "Project atlas"
        : routeKind === "studio"
          ? "Studio method"
          : routeKind === "team"
            ? "Team ensemble"
            : routeKind === "contact"
              ? "Brief opening"
              : routeKind === "archive"
                ? "Archive provenance"
                : "Threshold";

  const routeNote =
    routeKind === "project-detail"
      ? "One signal in focus while the field remains live underneath."
      : routeKind === "projects"
        ? "Atlas reading over the playable field."
        : routeKind === "studio"
          ? "Method layered over atmosphere."
          : routeKind === "team"
            ? "Cast and craft inside the same world."
            : routeKind === "contact"
              ? "Invitation without losing the scene."
              : routeKind === "archive"
                ? "Shadow layer kept for rebuild clarity."
                : "Entry state before the atlas opens.";

  return (
    <div
      ref={rootRef}
      className={`route-content story-route route-${route.replace("/", "") || "home"}`}
      data-route-kind={routeKind}
    >
      <RouteProgress label={routeLabel} note={routeNote} progress={progress} />
      {route === "/" && !selectedProjectSlug ? <HomeContent navigate={navigate} /> : null}
      {route === "/projects" && project ? (
        <ProjectDetailContent navigate={navigate} project={project} />
      ) : null}
      {route === "/projects" && !project ? <ProjectsIndexContent navigate={navigate} /> : null}
      {route === "/studio" ? <StudioContent navigate={navigate} /> : null}
      {route === "/team" ? <TeamContent /> : null}
      {route === "/contact" ? <ContactContent /> : null}
      {route === "/archive" ? <ArchiveContent navigate={navigate} /> : null}
    </div>
  );
}
