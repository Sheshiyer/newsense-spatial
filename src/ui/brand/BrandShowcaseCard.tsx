import {
  PROJECT_TYPE_LABELS,
  type ProjectRecord,
} from "../../content/siteContent";

type BrandShowcaseCardProps = {
  project: ProjectRecord;
  onOpen: (path: string) => void;
  mode?: "standard" | "feature" | "archive";
};

export function BrandShowcaseCard({
  project,
  onOpen,
  mode = "standard",
}: BrandShowcaseCardProps) {
  const proofLabel =
    mode === "feature" ? "Lead proof" : mode === "archive" ? "Archive memory" : "Case study";
  const servicePills = project.services.slice(0, 2);
  const imageStyle = project.media.cover_image
    ? {
        backgroundImage: `linear-gradient(180deg, rgba(8, 8, 10, 0.04), rgba(8, 8, 10, 0.86)), url(${project.media.cover_image})`,
      }
    : undefined;

  return (
    <button
      className={`project-card project-card-${mode}`}
      onClick={() => onOpen(project.route)}
      type="button"
    >
      <div className="project-card-media" data-parallax="-8" style={imageStyle} />
      <div className="project-card-chrome">
        <div className="project-card-crest">
          <span className="project-card-proof">{proofLabel}</span>
          <span className="project-card-meta">{project.primary_client}</span>
        </div>
        <div className="project-card-copy">
          <span className="project-card-type">
            {PROJECT_TYPE_LABELS[project.case_study_type] ?? project.case_study_type}
          </span>
          <strong>{project.hero_heading}</strong>
          <p>{project.hero_summary}</p>
        </div>
        <div className="project-card-footer">
          <div className="pill-grid">
            {servicePills.map((service) => (
              <span key={service} className="info-pill">
                {service}
              </span>
            ))}
          </div>
          <span className="project-card-meta project-card-meta-footer">
            {project.year ?? project.primary_service}
          </span>
        </div>
      </div>
    </button>
  );
}
