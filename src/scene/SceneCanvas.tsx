import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor, PerspectiveCamera, Preload } from "@react-three/drei";
import { Suspense, useState } from "react";
import { useSceneStore } from "../store/sceneStore";
import { HomeScene } from "./HomeScene";

export function SceneCanvas() {
  const gpuSupported = useSceneStore((state) => state.gpuSupported);
  const renderTier = useSceneStore((state) => state.renderTier);
  const setRenderTier = useSceneStore((state) => state.setRenderTier);
  const [dpr, setDpr] = useState(1.35);

  return (
    <Canvas
      dpr={dpr}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      key={`${renderTier}-${gpuSupported ?? "unknown"}`}
      shadows
    >
        <PerspectiveCamera makeDefault fov={36} position={[0, 2.8, 12.5]} />
        <color attach="background" args={["#0b0b0c"]} />
        <fog attach="fog" args={["#0b0b0c", 10, 34]} />
        <PerformanceMonitor
          bounds={() => [24, 32]}
          onChange={({ factor }) => {
            setDpr(1 + factor * 0.7);
          }}
          onFallback={() => {
            setDpr(1);
            setRenderTier("reduced3d", "performance");
          }}
        />
        <Suspense fallback={null}>
          <HomeScene />
          <Preload all />
        </Suspense>
    </Canvas>
  );
}
