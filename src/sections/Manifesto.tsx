import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { MANIFESTO } from "../data/content";

function Palavra({ p, i, total, progress }: { p: string; i: number; total: number; progress: MotionValue<number> }) {
  const ini = i / total;
  const opacity = useTransform(progress, [ini, ini + 1.5 / total], [0.14, 1]);
  return <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">{p}</motion.span>;
}

/** Manifesto da marca: as palavras acendem conforme a rolagem. */
export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 45%"] });
  const palavras = MANIFESTO.split(" ");
  return (
    <section aria-label="Manifesto" className="section-cream py-20 lg:py-36">
      <div ref={ref} className="container-x">
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-couro">
          <span className="font-display text-sm normal-case italic tracking-normal">(02)</span> A casa
        </p>
        <p className="mt-8 max-w-6xl font-display text-[2rem] font-medium leading-[1.12] tracking-[-0.02em] sm:text-5xl lg:text-[4.4rem]">
          {palavras.map((p, i) => <Palavra key={i} p={p} i={i} total={palavras.length} progress={scrollYProgress} />)}
        </p>
        <p className="mt-10 font-script text-5xl text-terra">Luxo Country</p>
      </div>
    </section>
  );
}
