import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/** Cursor de estrela dourada. Só em ponteiro fino (mouse); some no toque. */
export function Cursor() {
  const [ativo, setAtivo] = useState(false);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 36, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 36, mass: 0.4 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine) and (min-width: 1024px)").matches) return;
    setAtivo(true);
    document.documentElement.classList.add("cursor-on");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHover(!!(e.target as Element | null)?.closest("a, button, input, select, [role=button]"));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      document.documentElement.classList.remove("cursor-on");
      window.removeEventListener("pointermove", move);
    };
  }, [x, y]);

  if (!ativo) return null;
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 24 24"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{ scale: hover ? 1.9 : 1, rotate: hover ? 36 : 0 }}
      className="pointer-events-none fixed left-0 top-0 z-[100] h-6 w-6 text-ouro mix-blend-difference"
    >
      <path fill="currentColor" d="m12 2 2.6 6.4 6.9.5-5.3 4.5 1.7 6.7L12 16.4 6.1 20.1l1.7-6.7L2.5 8.9l6.9-.5L12 2Z" />
    </motion.svg>
  );
}
