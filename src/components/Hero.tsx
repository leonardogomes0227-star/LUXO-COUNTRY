import { motion, useScroll, useTransform } from "framer-motion";
import { lazy, Suspense, useRef, useState } from "react";
import { useCan3D, useVisible } from "../lib/device";
import { waLink } from "../lib/whatsapp";
import { HatIllustration } from "./HatIllustration";
import { IconArrow, IconWhatsapp } from "./Icons";
import { Selo } from "./Selo";
import { Sunset } from "./Sunset";

const HeroCanvas = lazy(() => import("../three/HeroCanvas"));
const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const can3D = useCan3D();
  const [pronto, setPronto] = useState(false);
  const [setStage, visivel] = useVisible<HTMLDivElement>();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const xGigante = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const yStage = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const sStage = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const yTexto = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const oTexto = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section id="topo" ref={ref} className="relative isolate h-[86svh] min-h-[640px] overflow-hidden bg-carvao text-creme lg:h-[calc(100svh-128px)] lg:min-h-[680px]">
      <Sunset progress={scrollYProgress} />

      {/* tipografia gigante atrás do chapéu */}
      <motion.div aria-hidden style={{ x: xGigante }} className="pointer-events-none absolute inset-x-0 top-[9%] select-none whitespace-nowrap text-center lg:top-[7%]">
        <motion.span
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease }}
          className="inline-block font-display text-[24vw] font-black uppercase leading-[0.8] tracking-[-0.04em] text-transparent [-webkit-text-stroke:1.5px_rgba(244,237,224,.42)] lg:text-[17vw]"
        >
          Country
        </motion.span>
        <motion.span
          initial={{ opacity: 0, scale: 0.8, rotate: -14 }}
          animate={{ opacity: 1, scale: 1, rotate: -9 }}
          transition={{ delay: 0.5, duration: 1, ease }}
          className="absolute left-[6%] top-[-30%] font-script text-[16vw] leading-none text-sol drop-shadow-[0_6px_24px_rgba(0,0,0,.5)] lg:left-[12%] lg:top-[-12%] lg:text-[10vw]"
        >
          Luxo
        </motion.span>
      </motion.div>

      {/* chapéu 3D */}
      <motion.div
        ref={setStage}
        style={{ y: yStage, scale: sStage }}
        className="absolute inset-x-0 top-[13%] h-[40%] lg:left-[18%] lg:right-[2%] lg:top-[6%] lg:h-[72%]"
      >
        <HatIllustration className={`absolute inset-0 m-auto h-full w-full max-w-xl transition-opacity duration-700 ${pronto ? "opacity-0" : "opacity-100"}`} />
        {can3D && (
          <Suspense fallback={null}>
            <div className={`absolute inset-0 transition-opacity duration-1000 ${pronto ? "opacity-100" : "opacity-0"}`}>
              <HeroCanvas progress={scrollYProgress} ativo={visivel} onPronto={() => setPronto(true)} />
            </div>
          </Suspense>
        )}
      </motion.div>

      {/* texto */}
      <motion.div style={{ y: yTexto, opacity: oTexto }} className="container-x absolute inset-x-0 bottom-0 z-10 pb-10 lg:pb-14">
        <div className="flex items-end justify-between gap-8">
          <div className="max-w-xl">
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="eyebrow !text-sol">Moda country · masculina, feminina e infantil</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.9, ease }} className="mt-3 text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.02em] sm:text-6xl lg:text-[4.6rem]">
              Moda country <em className="block font-normal italic text-sol">com o seu jeito</em>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-4 max-w-md text-[15px] leading-relaxed text-creme/80 sm:text-base">
              Camisas, jeans, chapéus, cintos e botas escolhidos a dedo. Peça pelo WhatsApp e receba em qualquer lugar do Brasil.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#colecoes" className="btn bg-creme text-carvao hover:bg-white">Explorar coleções <IconArrow width={18} height={18} /></a>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-gold"><IconWhatsapp width={18} height={18} /> Pedir no WhatsApp</a>
            </motion.div>
          </div>
          <Selo texto="ENVIAMOS PARA TODO O BRASIL ✦ PARCELAMOS NO CARTÃO ✦ " className="hidden h-36 w-36 shrink-0 text-creme/85 md:grid lg:h-40 lg:w-40" />
        </div>
      </motion.div>

      {pronto && <p className="pointer-events-none absolute right-5 top-4 hidden text-[11px] uppercase tracking-[0.3em] text-creme/50 lg:block">Arraste o chapéu ↔</p>}
    </section>
  );
}
