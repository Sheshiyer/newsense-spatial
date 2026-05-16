import { RefObject, useLayoutEffect, useState } from "react";

export function useRouteScrollProgress(
  rootRef: RefObject<HTMLElement | null>,
  pathname: string,
) {
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const scroller = root.closest(".content-shell") as HTMLElement | null;
    if (!scroller) {
      setProgress(0);
      root.style.setProperty("--route-progress", "0");
      return;
    }

    const update = () => {
      const maxScroll = Math.max(scroller.scrollHeight - scroller.clientHeight, 0);
      const nextProgress = maxScroll === 0 ? 0 : Math.min(scroller.scrollTop / maxScroll, 1);

      setProgress(nextProgress);
      root.style.setProperty("--route-progress", String(nextProgress));
    };

    update();
    scroller.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      scroller.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname, rootRef]);

  return progress;
}
