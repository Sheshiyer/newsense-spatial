import { create } from "zustand";

export type FocusTarget =
  | "home"
  | "projects"
  | "studio"
  | "team"
  | "contact"
  | "archive";
export type SceneRoute = "/" | "/projects" | "/studio" | "/team" | "/contact" | "/archive";
export type RenderTier = "immersive" | "reduced3d" | "editorial";
export type OverlayMode = "reference" | "world";
export type FallbackReason =
  | "missing-webgpu"
  | "prefers-reduced-motion"
  | "performance"
  | "manual"
  | null;

const ROUTE_TO_FOCUS: Record<SceneRoute, FocusTarget> = {
  "/": "home",
  "/projects": "projects",
  "/studio": "studio",
  "/team": "team",
  "/contact": "contact",
  "/archive": "archive",
};

function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname || "/";
}

function parsePath(pathname: string) {
  const normalizedPath = normalizePath(pathname);

  if (normalizedPath.startsWith("/projects/")) {
    return {
      route: "/projects" as SceneRoute,
      pathname: normalizedPath,
      focusTarget: "projects" as FocusTarget,
      selectedProjectSlug: normalizedPath.replace("/projects/", ""),
      selectedArchiveSlug: null,
    };
  }

  if (normalizedPath.startsWith("/archive/")) {
    return {
      route: "/archive" as SceneRoute,
      pathname: normalizedPath,
      focusTarget: "archive" as FocusTarget,
      selectedProjectSlug: null,
      selectedArchiveSlug: normalizedPath.replace("/archive/", ""),
    };
  }

  if (normalizedPath in ROUTE_TO_FOCUS) {
    const route = normalizedPath as SceneRoute;
    return {
      route,
      pathname: normalizedPath,
      focusTarget: ROUTE_TO_FOCUS[route],
      selectedProjectSlug: null,
      selectedArchiveSlug: null,
    };
  }

  return {
    route: "/" as SceneRoute,
    pathname: "/",
    focusTarget: "home" as FocusTarget,
    selectedProjectSlug: null,
    selectedArchiveSlug: null,
  };
}

function getInitialPathState() {
  if (typeof window === "undefined") {
    return parsePath("/");
  }

  return parsePath(window.location.pathname);
}

type SceneState = {
  pathname: string;
  route: SceneRoute;
  focusTarget: FocusTarget;
  selectedProjectSlug: string | null;
  selectedArchiveSlug: string | null;
  ready: boolean;
  hasEnteredWorld: boolean;
  overlayMode: OverlayMode;
  gpuSupported: boolean | null;
  renderTier: RenderTier;
  fallbackReason: FallbackReason;
  setRoute: (route: SceneRoute) => void;
  setPath: (pathname: string) => void;
  setFocusTarget: (focusTarget: FocusTarget) => void;
  setReady: (ready: boolean) => void;
  setEnteredWorld: (entered: boolean) => void;
  setOverlayMode: (overlayMode: OverlayMode) => void;
  showOverlay: () => void;
  hideOverlay: () => void;
  toggleOverlay: () => void;
  setGpuSupported: (supported: boolean) => void;
  setRenderTier: (renderTier: RenderTier, fallbackReason?: FallbackReason) => void;
};

export const useSceneStore = create<SceneState>((set) => ({
  ...getInitialPathState(),
  ready: false,
  hasEnteredWorld: false,
  overlayMode: "reference",
  gpuSupported: null,
  renderTier: "reduced3d",
  fallbackReason: null,
  setRoute: (route) =>
    set({
      pathname: route,
      route,
      focusTarget: ROUTE_TO_FOCUS[route],
      selectedProjectSlug: null,
      selectedArchiveSlug: null,
    }),
  setPath: (pathname) => set(parsePath(pathname)),
  setFocusTarget: (focusTarget) => set({ focusTarget }),
  setReady: (ready) => set({ ready }),
  setEnteredWorld: (hasEnteredWorld) => set({ hasEnteredWorld }),
  setOverlayMode: (overlayMode) => set({ overlayMode }),
  showOverlay: () => set({ overlayMode: "reference" }),
  hideOverlay: () => set({ overlayMode: "world" }),
  toggleOverlay: () =>
    set((state) => ({
      overlayMode: state.overlayMode === "reference" ? "world" : "reference",
    })),
  setGpuSupported: (gpuSupported) => set({ gpuSupported }),
  setRenderTier: (renderTier, fallbackReason = null) =>
    set({
      renderTier,
      fallbackReason,
    }),
}));
