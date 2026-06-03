export function BrandClientChorus({
  clients,
  compact = false,
}: {
  clients: string[];
  compact?: boolean;
}) {
  const repeated = clients.concat(clients);

  return (
    <section
      className={`story-marquee${compact ? " compact" : ""}`}
      data-reveal="section"
    >
      <div className="story-marquee-track">
        {repeated.map((client, index) => (
          <span key={`${client}-${index}`}>{client}</span>
        ))}
      </div>
    </section>
  );
}
