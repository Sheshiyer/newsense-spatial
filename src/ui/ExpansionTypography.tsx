import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, type ReactNode } from "react";

gsap.registerPlugin(Flip, ScrollTrigger);

type ExpansionTextSegment = {
  kind: "text";
  text: string;
  className?: string;
};

type ExpansionImageSegment = {
  kind: "expand";
  image: string;
  alt: string;
  text: string;
  lead?: string;
  trail?: string;
  motion?: "plain" | "skewed" | "rotated";
  ratio?: "landscape" | "square" | "portrait" | "strip";
};

type ExpansionSegment = ExpansionTextSegment | ExpansionImageSegment;

type ExpansionTypographyProps = {
  body: string;
  eyebrow: string;
  index: string;
  lines: ExpansionSegment[][];
  titleTag?: "h1" | "h2";
  note?: string;
  metrics?: ReactNode;
  variant?: "projects" | "studio" | "team" | "archive";
};

export function ExpansionTypography({
  body,
  eyebrow,
  index,
  lines,
  metrics,
  note,
  titleTag = "h1",
  variant = "projects",
}: ExpansionTypographyProps) {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const scroller = root.closest(".content-shell") as HTMLElement | null;

    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>(".expansion-phrase").forEach((phrase) => {
        const image = phrase.querySelector<HTMLElement>(".expansion-image");
        const words = Array.from(
          phrase.querySelectorAll<HTMLElement>(".expansion-word"),
        );

        if (!image) {
          return;
        }

        phrase.classList.add("is-open");
        const state = Flip.getState([image, ...words], {
          props: "transform,width,height,borderRadius",
        });
        phrase.classList.remove("is-open");

        Flip.to(state, {
          ease: "none",
          scrollTrigger: {
            trigger: phrase,
            start: "top 82%",
            end: "+=130%",
            scrub: true,
            scroller: scroller ?? undefined,
          },
        });
      });

      root.querySelectorAll<HTMLElement>(".expansion-body, .expansion-note").forEach((node) => {
        gsap.fromTo(
          node,
          { autoAlpha: 0.28, yPercent: 12 },
          {
            autoAlpha: 1,
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top 82%",
              end: "bottom 28%",
              scrub: true,
              scroller: scroller ?? undefined,
            },
          },
        );
      });
    }, root);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      ctx.revert();
    };
  }, [body, eyebrow, index, lines, note, variant]);

  const HeadingTag = titleTag;

  return (
    <section
      ref={rootRef}
      className={`expansion-surface expansion-surface-${variant}`}
      data-reveal="hero"
    >
      <div className="expansion-copy">
        <span className="route-index">{index}</span>
        <p className="eyebrow">{eyebrow}</p>
        <HeadingTag className="expansion-type">
          {lines.map((line, lineIndex) => (
            <span key={`line-${lineIndex}`} className="expansion-line">
              {line.map((segment, segmentIndex) => {
                if (segment.kind === "text") {
                  return (
                    <span
                      key={`text-${lineIndex}-${segmentIndex}`}
                      className={`expansion-text ${segment.className ?? ""}`.trim()}
                    >
                      {segment.text}
                    </span>
                  );
                }

                return (
                  <span
                    key={`expand-${lineIndex}-${segmentIndex}`}
                    className="expansion-phrase"
                  >
                    {segment.lead ? (
                      <span className="expansion-word expansion-word-lead">
                        {segment.lead}
                      </span>
                    ) : null}
                    <span
                      className={`expansion-image expansion-image-${segment.ratio ?? "landscape"}`}
                      role="img"
                      aria-label={segment.alt}
                    >
                      <span
                        className="expansion-image-inner"
                        style={{ backgroundImage: `url(${segment.image})` }}
                      />
                    </span>
                    <span
                      className={`expansion-word ${segment.motion ?? "plain"}`.trim()}
                    >
                      {segment.text}
                    </span>
                    {segment.trail ? (
                      <span className="expansion-word expansion-word-trail">
                        {segment.trail}
                      </span>
                    ) : null}
                  </span>
                );
              })}
            </span>
          ))}
        </HeadingTag>
        <p className="support-copy expansion-body">{body}</p>
      </div>

      <div className="expansion-aside">
        {note ? <p className="story-aside-copy expansion-note">{note}</p> : null}
        {metrics ? <div className="hero-ledger">{metrics}</div> : null}
      </div>
    </section>
  );
}
