import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject, useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function useRouteStoryMotion(
  rootRef: RefObject<HTMLElement | null>,
  pathname: string,
) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const scroller = root.closest(".content-shell") as HTMLElement | null;
    if (scroller) {
      scroller.scrollTop = 0;
    }

    const ctx = gsap.context(() => {
      const heroNodes = root.querySelectorAll<HTMLElement>("[data-reveal='hero']");
      if (heroNodes.length > 0) {
        gsap.fromTo(
          heroNodes,
          { autoAlpha: 0, y: 34, filter: "blur(12px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.1,
            stagger: 0.08,
            ease: "power3.out",
          },
        );
      }

      root.querySelectorAll<HTMLElement>("[data-stagger]").forEach((group) => {
        const children = Array.from(group.children) as HTMLElement[];
        if (children.length === 0) {
          return;
        }

        gsap.fromTo(
          children,
          { autoAlpha: 0, y: 28, scale: 0.985 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: group,
              start: "top 78%",
              scroller: scroller ?? undefined,
            },
          },
        );
      });

      root
        .querySelectorAll<HTMLElement>("[data-reveal]:not([data-reveal='hero'])")
        .forEach((node) => {
          gsap.fromTo(
            node,
            { autoAlpha: 0, y: 42, filter: "blur(10px)" },
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: node,
                start: "top 80%",
                scroller: scroller ?? undefined,
              },
            },
          );
        });

      root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((node) => {
        const depth = Number(node.dataset.parallax ?? "-12");
        gsap.to(node, {
          yPercent: depth,
          ease: "none",
          scrollTrigger: {
            trigger: node,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            scroller: scroller ?? undefined,
          },
        });
      });

      root.querySelectorAll<HTMLElement>("[data-float]").forEach((node, index) => {
        gsap.to(node, {
          y: index % 2 === 0 ? -8 : -12,
          duration: 2.8 + index * 0.15,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, root);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      ctx.revert();
    };
  }, [pathname, rootRef]);
}
