import { useEffect } from "react";
import { prefersReducedMotion } from "./device";

/** Scroll suave carregado sob demanda; desligado com movimento reduzido. */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = 0;
    let destroy = () => {};
    let cancelado = false;
    import("lenis").then(({ default: Lenis }) => {
      if (cancelado) return;
      const lenis = new Lenis({ duration: 1.1, anchors: { offset: window.innerWidth < 1024 ? -76 : -120 } });
      const tick = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(tick); };
      raf = requestAnimationFrame(tick);
      destroy = () => lenis.destroy();
    });
    return () => { cancelado = true; cancelAnimationFrame(raf); destroy(); };
  }, []);
}
