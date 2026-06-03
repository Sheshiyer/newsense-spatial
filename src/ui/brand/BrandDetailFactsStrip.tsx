import type { ProjectRecord } from "../../content/siteContent";

export function BrandDetailFactsStrip({ project }: { project: ProjectRecord }) {
  return (
    <section className="detail-facts-strip" data-stagger="">
      <article className="story-metric detail-fact-card">
        <span className="story-metric-label">Assignment</span>
        <strong>{project.clients.join(", ") || project.primary_client}</strong>
        <p>The client context and mandate carried by this route.</p>
      </article>
      <article className="story-metric detail-fact-card">
        <span className="story-metric-label">System scope</span>
        <strong>{project.services.join(" · ") || project.primary_service}</strong>
        <p>The design, film, and campaign surfaces shaped into one release system.</p>
      </article>
      <article className="story-metric detail-fact-card">
        <span className="story-metric-label">Format</span>
        <strong>{project.gallery_mode.replace("-", " ")}</strong>
        <p>The current storytelling format preserved for the rebuilt atlas.</p>
      </article>
    </section>
  );
}
