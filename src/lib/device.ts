import { useEffect, useState } from "react";

const hasWebGL = () => {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
};

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** O aparelho aguenta 3D? Falso sem WebGL, com movimento reduzido ou hardware fraco. */
export const canRun3D = () => {
  if (typeof window === "undefined") return false;
  const nav = navigator as Navigator & { deviceMemory?: number };
  if (prefersReducedMotion()) return false;
  if (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) return false;
  if (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= 2) return false;
  return hasWebGL();
};

export const isTouch = () => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

export function useCan3D() {
  const [ok, setOk] = useState(false);
  useEffect(() => setOk(canRun3D()), []);
  return ok;
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(prefersReducedMotion);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/** Renderiza algo só quando o elemento entra (ou chega perto) da tela. */
export function useInView<T extends Element>(rootMargin = "200px") {
  const [el, setEl] = useState<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!el || seen) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [el, seen, rootMargin]);
  return [setEl, seen] as const;
}

/** Verdadeiro enquanto o elemento está visível; usado para pausar o 3D fora da tela. */
export function useVisible<T extends Element>() {
  const [el, setEl] = useState<T | null>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, [el]);
  return [setEl, visible] as const;
}
