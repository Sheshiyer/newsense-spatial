import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { getTopLevelNav, siteContent } from "../content/siteContent";
import { useSceneStore } from "../store/sceneStore";
import { RouteContent } from "./RouteContent";

function getSceneCaption(pathname: string) {
  if (pathname.startsWith("/projects/")) {
    return {
      objects:
        "One case study comes forward while the astronaut and field remain live underneath, so the reading layer never replaces the world.",
      runtime: "WASD to move, mouse to look, project detail floating in focus.",
    };
  }

  if (pathname === "/projects") {
    return {
      objects:
        "The field stays explorable while the Newsense atlas floats above it as grouped signal, not poster noise.",
      runtime: `${siteContent.metadata.total_projects} live projects in the atlas, with field traversal underneath`,
    };
  }

  if (pathname.startsWith("/archive/")) {
    return {
      objects:
        "The archive remains readable as an upper layer, but the terrain and astronaut keep the site grounded in the active world.",
      runtime: "Archive detail mode: preserved content over a still-live field.",
    };
  }

  if (pathname === "/archive") {
    return {
      objects:
        "Archived work is available as a quieter overlay while the field remains navigable and active.",
      runtime: `${siteContent.metadata.total_archive} archive routes preserved above the base world`,
    };
  }

  if (pathname === "/studio") {
    return {
      objects:
        "The studio layer now sits on top of the grassland and astronaut loop, turning the world into a navigable method space instead of a static panel stack.",
      runtime: `${siteContent.team.length} core team members, one shared field, live WASD traversal`,
    };
  }

  if (pathname === "/team") {
    return {
      objects:
        "The team story floats over the same terrain so the people layer reads as part of the world, not a disconnected about page.",
      runtime: `${siteContent.team.length} core team members, over the active field base`,
    };
  }

  if (pathname === "/contact") {
    return {
      objects:
        "The contact layer stays lightweight so the world remains present and the invitation to collaborate feels immediate.",
      runtime: "Contact mode: floating panel over the live field.",
    };
  }

  return {
    objects:
      "The grassland, astronaut, and endless field now remain intact while Newsense floats above as the reading and storytelling layer.",
    runtime: "Base world mode: field traversal plus floating Newsense interface.",
  };
}

function getBrandSummary(pathname: string) {
  if (pathname === "/projects") {
    return "Design and film studio. Work arranged as signal.";
  }

  if (pathname.startsWith("/projects/")) {
    return "Design and film studio. One case study in focus.";
  }

  if (pathname === "/studio") {
    return "Design and film studio. Method made legible.";
  }

  if (pathname === "/team") {
    return "Design and film studio. People behind the signal.";
  }

  if (pathname === "/contact") {
    return "Design and film studio. Briefs brought into focus.";
  }

  if (pathname.startsWith("/archive")) {
    return "Design and film studio. Provenance kept visible.";
  }

  return "Independent design and film studio.";
}

function getBrandRailState(pathname: string) {
  if (pathname.startsWith("/projects/")) {
    return "Case study focus";
  }

  if (pathname === "/projects") {
    return "Atlas sequencing";
  }

  if (pathname === "/studio") {
    return "Studio method";
  }

  if (pathname === "/team") {
    return "Cast and craft";
  }

  if (pathname === "/contact") {
    return "Open brief";
  }

  if (pathname.startsWith("/archive")) {
    return "Provenance layer";
  }

  return "Threshold";
}

export function Overlay() {
  const shellRef = useRef<HTMLDivElement>(null);
  const pathname = useSceneStore((state) => state.pathname);
  const overlayMode = useSceneStore((state) => state.overlayMode);
  const ready = useSceneStore((state) => state.ready);
  const renderTier = useSceneStore((state) => state.renderTier);
  const setPath = useSceneStore((state) => state.setPath);
  const caption = getSceneCaption(pathname);
  const railState = getBrandRailState(pathname);
  const brandSummary = getBrandSummary(pathname);

  useLayoutEffect(() => {
    if (overlayMode !== "reference") {
      return;
    }

    const shell = shellRef.current;
    if (!shell) {
      return;
    }

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline.fromTo(
        ".brand-rail",
        { opacity: 0, y: -18 },
        { opacity: 1, y: 0, duration: 0.9 },
      );
      timeline.fromTo(
        ".route-content > *",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.08 },
        "-=0.55",
      );
      timeline.fromTo(
        ".scene-caption > div",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 },
        "-=0.45",
      );
    }, shell);

    return () => {
      ctx.revert();
    };
  }, [pathname, overlayMode]);

  const navigate = (nextPath: string) => {
    window.history.pushState({}, "", nextPath);
    setPath(nextPath);
  };

  return (
    <div ref={shellRef} className="overlay-shell">
      <header className="brand-rail">
        <button className="brand-mark" onClick={() => navigate("/")} type="button">
          {siteContent.studio.wordmark_asset ? (
            <img alt="Newsense" src={siteContent.studio.wordmark_asset} />
          ) : (
            "newsense"
          )}
        </button>
        <nav className="top-nav">
          {getTopLevelNav().map((item) => (
            <button
              key={item.path}
              className={`top-nav-link ${pathname.startsWith(item.path) ? "active" : ""}`}
              onClick={() => navigate(item.path)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="brand-meta">
          <span>{railState}</span>
          <span>{brandSummary}</span>
          <span>{ready ? renderTier : "Loading threshold"}</span>
        </div>
      </header>

      <main className="content-shell">
        <RouteContent navigate={navigate} />
      </main>

      <aside className="scene-caption">
        <div>
          <span className="caption-label">Objects</span>
          <p>{caption.objects}</p>
        </div>
        <div>
          <span className="caption-label">Runtime</span>
          <p>{caption.runtime}</p>
        </div>
      </aside>
    </div>
  );
}
