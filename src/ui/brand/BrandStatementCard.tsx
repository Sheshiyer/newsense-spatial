type BrandStatementCardProps = {
  index: string;
  title: string;
  body?: string;
  label?: string;
};

export function BrandStatementCard({
  index,
  title,
  body,
  label = "Principle",
}: BrandStatementCardProps) {
  return (
    <article className="brand-statement-card service-card" data-reveal="section">
      <span className="story-section-index">{index}</span>
      <span className="brand-statement-label">{label}</span>
      <h3>{title}</h3>
      {body ? <p>{body}</p> : null}
    </article>
  );
}
