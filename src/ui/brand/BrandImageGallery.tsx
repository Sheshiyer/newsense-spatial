import type { ProjectRecord } from "../../content/siteContent";

export function BrandImageGallery({ project }: { project: ProjectRecord }) {
  const images = project.media.gallery_images.slice(0, 5);
  if (images.length === 0) {
    return null;
  }

  return (
    <section className="detail-gallery-grid" data-stagger="">
      {images.map((image, index) => (
        <figure
          key={image.id}
          className={`detail-gallery-card ${index === 0 ? "primary" : "support"}`}
          data-parallax={index === 0 ? "-4" : "-8"}
        >
          <img alt={image.alt} src={image.src} />
        </figure>
      ))}
    </section>
  );
}
