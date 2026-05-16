import { useEffect } from "react";
import FalseEarthApp from "../falseEarth/app/App";
import { useGameStore as useFalseEarthStore } from "../falseEarth/core/store/gameStore";
import { useSceneStore } from "../store/sceneStore";
import { UI } from "../ui/UI";

export default function App() {
  const activeTargets = useFalseEarthStore((state) => state.activeTargets);
  const readyStatus = useFalseEarthStore((state) => state.readyStatus);
  const isGameStarted = useFalseEarthStore((state) => state.isGameStarted);
  const isControlEnabled = useFalseEarthStore((state) => state.isControlEnabled);
  const gpuError = useFalseEarthStore((state) => state.gpuError);
  const setPath = useSceneStore((state) => state.setPath);
  const setEnteredWorld = useSceneStore((state) => state.setEnteredWorld);
  const setGpuSupported = useSceneStore((state) => state.setGpuSupported);
  const setReady = useSceneStore((state) => state.setReady);
  const setRenderTier = useSceneStore((state) => state.setRenderTier);

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [setPath]);

  useEffect(() => {
    const sceneReady =
      activeTargets.length > 0 && activeTargets.every((target) => readyStatus[target] === true);
    setReady(sceneReady);
  }, [activeTargets, readyStatus, setReady]);

  useEffect(() => {
    setEnteredWorld(isGameStarted || isControlEnabled);
  }, [isControlEnabled, isGameStarted, setEnteredWorld]);

  useEffect(() => {
    const hasGpuError = Boolean(gpuError);
    setGpuSupported(!hasGpuError);
    setRenderTier(hasGpuError ? "editorial" : "immersive", hasGpuError ? "missing-webgpu" : null);
  }, [gpuError, setGpuSupported, setRenderTier]);

  return (
    <>
      <FalseEarthApp />
      <UI />
    </>
  );
}
