// @ts-nocheck
import { useProgress } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import { useGameStore } from "../core/store/gameStore";

function getSupportLine(gpuError: string | null) {
  if (gpuError) {
    return "This device cannot open the fully playable field right now. The world needs WebGPU to run as intended.";
  }

  return "Walk the field first. Open the atlas when you want the editorial read. Let the work resolve from atmosphere into signal.";
}

function getControlLine(isMobile: boolean) {
  if (isMobile) {
    return "Joystick to move. Touch to look. Reopen the atlas from the world controls.";
  }

  return "WASD to move. Mouse to look. Shift to run. Reopen the atlas from the world controls.";
}

export function LoadingScreen() {
  const { active, progress: downloadProgress } = useProgress();
  const activeTargets = useGameStore((state) => state.activeTargets);
  const readyStatus = useGameStore((state) => state.readyStatus);
  const isMobile = useGameStore((state) => state.isMobile);
  const setIsGameStarted = useGameStore((state) => state.setIsGameStarted);
  const gpuError = useGameStore((state) => state.gpuError);
  const [isReadyToStart, setIsReadyToStart] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const shellRef = useRef<HTMLDivElement>(null);

  const total = activeTargets.length;
  const loaded = activeTargets.filter((id) => readyStatus[id]).length;
  const compileProgress = total === 0 ? 0 : (loaded / total) * 100;

  const displayProgress = useMemo(() => {
    if (active) {
      return Math.round(downloadProgress * 0.5);
    }

    return Math.min(Math.round(50 + compileProgress * 0.5), 99);
  }, [active, downloadProgress, compileProgress]);

  useEffect(() => {
    if (!active && loaded === total && total > 0) {
      const timer = window.setTimeout(() => setIsReadyToStart(true), 200);
      return () => window.clearTimeout(timer);
    }
  }, [active, loaded, total]);

  useEffect(() => {
    return () => {
      gsap.killTweensOf(shellRef.current);
    };
  }, []);

  const handleStart = () => {
    if (!isReadyToStart || gpuError) {
      return;
    }

    setIsGameStarted(true);

    if (!shellRef.current) {
      setIsVisible(false);
      return;
    }

    gsap.to(shellRef.current, {
      opacity: 0,
      duration: 0.9,
      ease: "power2.inOut",
      onComplete: () => setIsVisible(false),
    });
  };

  if (!isVisible) {
    return null;
  }

  const buttonLabel = gpuError
    ? "System incompatible"
    : isReadyToStart
      ? "[ ENTER FIELD ]"
      : `[ CALIBRATING ${displayProgress}% ]`;

  return (
    <div ref={shellRef} className="loading-screen">
      <div className="loading-panel">
        <div className="loading-copy">
          <p className="loading-kicker">Newsense</p>
          <h1>Leave the nuisance behind. Enter the field.</h1>
          <p>
            Newsense is an independent design and film studio shaping launches,
            campaigns, spaces, and moving image into clearer form.
          </p>
          <p className="loading-note">{getSupportLine(gpuError)}</p>
        </div>

        <div className="loading-actions">
          <button
            className="enter-button"
            disabled={!isReadyToStart || Boolean(gpuError)}
            onClick={handleStart}
            type="button"
          >
            {buttonLabel}
          </button>
          <div className="loading-meta">
            <span>{gpuError ? `Error code: ${gpuError}` : "Playable field readying"}</span>
            <span>{isReadyToStart && !gpuError ? "Scene ready" : "Calibrating threshold"}</span>
          </div>
          <div className="loading-bar" aria-hidden="true">
            <div
              className="loading-bar-fill"
              style={{ width: `${isReadyToStart && !gpuError ? 100 : displayProgress}%` }}
            />
          </div>
          <div className="loading-instructions">
            <span>{getControlLine(isMobile)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
