import { useEffect } from "react";
import { useGameStore as useFalseEarthStore } from "../falseEarth/core/store/gameStore";
import { input } from "../falseEarth/core/input/controls";
import { useSceneStore } from "../store/sceneStore";
import { Overlay } from "./Overlay";

function getFieldLabel(pathname: string) {
  if (pathname.startsWith("/projects/")) {
    return "Case study remembered. Walk the field.";
  }

  if (pathname === "/projects") {
    return "Atlas dismissed. The plane is live.";
  }

  if (pathname === "/studio") {
    return "Method archived in memory. Stay in the field.";
  }

  if (pathname === "/team") {
    return "Cast remembered. Explore the plane.";
  }

  if (pathname === "/contact") {
    return "Brief set aside. Keep moving.";
  }

  if (pathname.startsWith("/archive")) {
    return "Archive folded away. The world remains.";
  }

  return "Threshold passed. The field is primary now.";
}

export function UI() {
  const hasEnteredWorld = useSceneStore((state) => state.hasEnteredWorld);
  const overlayMode = useSceneStore((state) => state.overlayMode);
  const pathname = useSceneStore((state) => state.pathname);
  const hideOverlay = useSceneStore((state) => state.hideOverlay);
  const toggleOverlay = useSceneStore((state) => state.toggleOverlay);
  const isMobile = useFalseEarthStore((state) => state.isMobile);

  useEffect(() => {
    if (!hasEnteredWorld) {
      return;
    }

    const hideOnMovement = () => hideOverlay();
    const unsubscribers = [
      input.subscribe("MoveForward", hideOnMovement),
      input.subscribe("MoveBackward", hideOnMovement),
      input.subscribe("RotateLeft", hideOnMovement),
      input.subscribe("RotateRight", hideOnMovement),
      input.subscribe("Run", hideOnMovement),
      input.subscribe("Jump", hideOnMovement),
    ];

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tagName = target?.tagName?.toLowerCase();
      if (tagName === "input" || tagName === "textarea") {
        return;
      }

      if (event.code === "KeyO") {
        event.preventDefault();
        toggleOverlay();
      }

      if (event.code === "Escape") {
        hideOverlay();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [hasEnteredWorld, hideOverlay, toggleOverlay]);

  const isOverlayVisible = hasEnteredWorld && overlayMode === "reference";
  const isFieldHintVisible = hasEnteredWorld && overlayMode === "world";

  return (
    <div className="ui-shell">
      <div className={`world-ui ${isOverlayVisible ? "visible" : ""}`}>
        <Overlay />
      </div>
      <div className={`field-hint ${isFieldHintVisible ? "visible" : ""}`}>
        <span className="field-hint-kicker">Field mode</span>
        <p>{getFieldLabel(pathname)}</p>
        <span className="field-hint-meta">
          {isMobile ? "Use the atlas icon to reopen reference." : "Press O or use the atlas icon to reopen reference."}
        </span>
      </div>
    </div>
  );
}
