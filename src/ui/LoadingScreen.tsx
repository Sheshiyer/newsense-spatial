import { useProgress } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSceneStore } from "../store/sceneStore";

function getModeLabel(renderTier: string): string {
  switch (renderTier) {
    case "immersive":
      return "Immersive mode";
    case "reduced3d":
      return "Reduced scene mode";
    default:
      return "Editorial mode";
  }
}

export function LoadingScreen() {
  const { active, progress } = useProgress();
  const ready = useSceneStore((state) => state.ready);
  const renderTier = useSceneStore((state) => state.renderTier);
  const fallbackReason = useSceneStore((state) => state.fallbackReason);
  const hasEnteredWorld = useSceneStore((state) => state.hasEnteredWorld);
  const setEnteredWorld = useSceneStore((state) => state.setEnteredWorld);
  const [isVisible, setIsVisible] = useState(true);
  const shellRef = useRef<HTMLDivElement>(null);

  const isReadyToEnter = ready && !active;
  const displayProgress = useMemo(() => {
    if (isReadyToEnter) {
      return 100;
    }

    return Math.max(8, Math.min(99, Math.round(progress)));
  }, [isReadyToEnter, progress]);

  useEffect(() => {
    if (!hasEnteredWorld) {
      return;
    }

    const shell = shellRef.current;
    if (!shell) {
      return;
    }

    const tween = gsap.to(shell, {
      opacity: 0,
      duration: 0.9,
      ease: "power2.inOut",
      onComplete: () => setIsVisible(false),
    });

    return () => {
      tween.kill();
    };
  }, [hasEnteredWorld]);

  if (!isVisible) {
    return null;
  }

  const buttonLabel = isReadyToEnter
    ? renderTier === "immersive"
      ? "[ ENTER FIELD ]"
      : "[ ENTER REDUCED MODE ]"
    : `[ PREPARING ${displayProgress}% ]`;

  const supportLine =
    fallbackReason === "missing-webgpu"
      ? "WebGPU is unavailable here, so the world opens in a reduced scene tier."
      : fallbackReason === "prefers-reduced-motion"
        ? "Motion has been softened to respect device and user preferences."
        : fallbackReason === "manual"
          ? "The threshold is live now in a reduced scene bridge while the immersive renderer is tuned for Newsense-specific materials."
        : "Scattered work, ideas, and image-making resolve into a clearer field.";

  return (
    <div ref={shellRef} className="loading-screen">
      <div className="loading-panel">
        <div className="loading-copy">
          <p className="loading-kicker">Newsense</p>
          <h1>Leave the nuisance behind. Enter a field where signal sharpens.</h1>
          <p>
            Newsense is a design and film studio building clarity out of launches,
            spaces, stories, and moving image systems.
          </p>
          <p>{supportLine}</p>
        </div>

        <div className="loading-actions">
          <button
            className="enter-button"
            disabled={!isReadyToEnter}
            onClick={() => setEnteredWorld(true)}
            type="button"
          >
            {buttonLabel}
          </button>
          <div className="loading-meta">
            <span>{getModeLabel(renderTier)}</span>
            <span>{isReadyToEnter ? "Scene ready" : "Calibrating threshold"}</span>
          </div>
          <div className="loading-bar" aria-hidden="true">
            <div
              className="loading-bar-fill"
              style={{ width: `${displayProgress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
