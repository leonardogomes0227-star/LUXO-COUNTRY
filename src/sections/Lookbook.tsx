import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { IconArrow } from "../components/Icons";
import type { Publico } from "../data/products";
import { useFiltros } from "../store/filters";

const LOOKS: { id: Publico; n: string; t: string; d: string }[] = [
  { id: "masculino", n: "01", t: "Masculina", d: "Camisa xadrez, jeans, chapéu de feltro e bota de couro. Presença do curral à cidade." },
  { id: "feminino", n: "02", t: "Feminina", d: "Bordados, palha, jeans de cintura alta e couro natural. Delicada e cheia de atitude." },
  { id: "infantil", n: "03", t: "Infantil", d: "Chapéu, bota e xadrez no tamanho dos pequenos, para a família toda combinar." },
];

function useDesktop() {
  const [d, setD] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setD(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return d;
}

/** Lookbook: no computador a seção fica fixa e os looks correm na horizontal com a rolagem; no celular, desliza com o dedo. */
export function Lookbook() {
  const { ir } = useFiltros();
  const sec = useRef<HTMLElement>(null);
  const trilho = useRef<HTMLDivElement>(null);
  const desktop = useDesktop();
  const [dist, setDist] = useState(0);
  const { scrollYProgress } = useScroll({ target: sec, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -dist]);
  const barra = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"]);

  useEffect(() => {
    const medir = () => trilho.current && setDist(Math.max(0, trilho.current.scrollWidth - window.innerWidth));
    medir();
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, [desktop]);

  return (
    <section id="colecoes" ref={sec} aria-label="Coleções" className="relative bg-carvao text-creme lg:h-[320vh]">
      <div className="py-16 lg:sticky lg:top-[128px] lg:flex lg:h-[calc(100vh-128px)] lg:flex-col lg:justify-center lg:overflow-hidden lg:py-0">
        <motion.div
          ref={trilho}
          style={desktop ? { x } : undefined}
          className="no-scrollbar flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 sm:scroll-px-8 sm:gap-6 sm:px-8 lg:w-max lg:snap-none lg:overflow-visible lg:px-[6vw]"
        >
          <div className="flex w-[78vw] shrink-0 snap-start flex-col justify-end pb-2 sm:w-[46vw] lg:w-[30vw] lg:pr-10">
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-sol">
              <span className="font-display text-sm normal-case italic tracking-normal">(01)</span> Lookbook
            </p>
            <h2 className="mt-4 font-display text-5xl font-semibold leading-[0.92] tracking-[-0.03em] lg:text-[5.6vw]">
              Três estilos, <em className="font-normal italic text-sol">uma família</em>
            </h2>
            <p className="mt-5 max-w-sm text-creme/70">Escolha a coleção e veja as peças separadas para você. Deslize para o lado.</p>
          </div>

          {LOOKS.map((l) => (
            <article key={l.id} className="group relative h-[62svh] max-h-[640px] w-[78vw] shrink-0 snap-start overflow-hidden rounded-[1.6rem] sm:w-[46vw] lg:h-[70vh] lg:max-h-none lg:w-[38vw]">
              <img
                src={`/images/arte/look-${l.id}.webp`}
                srcSet={`/images/arte/look-${l.id}-600.webp 600w, /images/arte/look-${l.id}.webp 900w`}
                sizes="(min-width:1024px) 38vw, 78vw"
                alt={`Composição de peças da coleção ${l.t.toLowerCase()}`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-carvao via-carvao/20 to-transparent" />
              <span aria-hidden className="absolute left-5 top-3 font-display text-[7rem] font-black leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(244,237,224,.55)] lg:text-[9rem]">{l.n}</span>
              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                <h3 className="font-display text-4xl font-semibold tracking-tight lg:text-5xl">{l.t}</h3>
                <p className="mt-2 max-w-xs text-sm text-creme/80">{l.d}</p>
                <button onClick={() => ir({ publico: l.id })} className="btn mt-5 bg-creme !min-h-11 text-carvao hover:bg-sol">
                  Ver peças <IconArrow width={18} height={18} />
                </button>
              </div>
            </article>
          ))}
          <div aria-hidden className="w-1 shrink-0 lg:w-[4vw]" />
        </motion.div>

        <div aria-hidden className="mx-[6vw] mt-10 hidden h-px bg-creme/15 lg:block">
          <motion.div style={{ width: barra }} className="h-px bg-sol" />
        </div>
      </div>
    </section>
  );
}
