import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const LINHA = ["Luxo Country", "✦", "Rio Verde · MS", "✦", "Brasil inteiro", "✦", "Desde o campo", "✦"];

/** Faixa de tipografia gigante que corre com a rolagem (duas linhas em sentidos opostos). */
export function GiantMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const a = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const b = useTransform(scrollYProgress, [0, 1], ["-35%", "0%"]);
  const itens = [...LINHA, ...LINHA, ...LINHA];
  return (
    <div ref={ref} aria-hidden className="overflow-hidden bg-terra py-8 text-creme lg:py-12">
      <motion.p style={{ x: a }} className="whitespace-nowrap font-display text-[17vw] font-semibold leading-[0.9] tracking-[-0.03em] lg:text-[11vw]">
        {itens.map((t, i) => <span key={i} className={`mr-[0.3em] ${i % 4 === 2 ? "italic font-normal text-sol" : ""}`}>{t}</span>)}
      </motion.p>
      <motion.p style={{ x: b }} className="whitespace-nowrap font-display text-[17vw] font-black uppercase leading-[0.9] tracking-[-0.03em] text-transparent [-webkit-text-stroke:1.5px_rgba(244,237,224,.6)] lg:text-[11vw]">
        {itens.map((t, i) => <span key={i} className="mr-[0.3em]">{t}</span>)}
      </motion.p>
    </div>
  );
}
