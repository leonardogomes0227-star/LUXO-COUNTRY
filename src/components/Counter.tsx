import { animate, useInView, useMotionValue, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";

/** Contador animado ao entrar na tela. */
export function Counter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const v = useMotionValue(0);
  const text = useTransform(v, (n) => `${prefix}${Math.round(n).toLocaleString("pt-BR")}${suffix}`);
  useEffect(() => {
    if (inView) {
      const c = animate(v, to, { duration: 1.8, ease: "easeOut" });
      return () => c.stop();
    }
  }, [inView, to, v]);
  return <motion.span ref={ref}>{text}</motion.span>;
}
