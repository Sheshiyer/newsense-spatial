import type { NarrativeSection } from "../../content/siteContent";

type BrandNarrativeCardProps = {
  chapter: NarrativeSection;
  index: string;
  kind: string;
};

export function BrandNarrativeCard({
  chapter,
  index,
  kind,
}: BrandNarrativeCardProps) {
  return (
    <article className="chapter-card" data-reveal="section">
      <div className="chapter-card-head">
        <span className="chapter-card-index">{index}</span>
        <div>
          <span className="section-kicker">{kind}</span>
          <h3>{chapter.heading}</h3>
        </div>
      </div>
      <p>{chapter.content}</p>
    </article>
  );
}
