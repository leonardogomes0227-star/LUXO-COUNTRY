import { motion, useScroll, useTransform } from "framer-motion";
import { lazy, Suspense, useRef, useState } from "react";
import { useCan3D, useVisible } from "../lib/device";
import { waLink } from "../lib/whatsapp";
import { HatIllustration } from "./HatIllustration";
import { IconArrow, IconCard, IconTruck, IconWhatsapp } from "./Icons";
import { Parallax } from "./Parallax";

const HeroCanvas = lazy(() => import("../three/HeroCanvas"));

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const can3D = useCan3D();
  const [pronto, setPronto] = useState(false);
  const [setStage, visivel] = useVisible<HTMLDivElement>();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.55]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.9, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section id="topo" ref={ref} className="section-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-[68px] lg:flex-row lg:items-center">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_40%,rgba(176,122,69,.28),transparent_60%),radial-gradient(ellipse_at_10%_90%,rgba(63,143,138,.14),transparent_55%)]" />
      <Parallax progress={scrollYProgress} />

      <motion.div style={{ y: textY }} className="container-x relative z-10 pt-8 lg:w-1/2 lg:max-w-none lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-8">
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="eyebrow">Moda country para toda a família</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.8 }} className="mt-4 text-[2.9rem] font-bold leading-[1.02] sm:text-6xl lg:text-7xl xl:text-[5.2rem]">
          Moda country <span className="italic text-ouro">com o seu jeito</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} className="mt-5 max-w-lg text-base leading-relaxed text-creme/80 sm:text-lg">
          Camisas, jeans, chapéus, cintos e botas para homens, mulheres e crianças. Escolha a peça, peça pelo WhatsApp e receba onde estiver.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#colecoes" className="btn-ghost">Ver coleção <IconArrow width={18} height={18} /></a>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-gold"><IconWhatsapp width={18} height={18} /> Pedir no WhatsApp</a>
        </motion.div>
        <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-creme/75">
          <li className="flex items-center gap-2"><IconTruck className="text-ouro" /> Enviamos para todo o Brasil</li>
          <li className="flex items-center gap-2"><IconCard className="text-ouro" /> Parcelamos no cartão</li>
        </motion.ul>
      </motion.div>

      <motion.div
        ref={setStage}
        style={{ scale, y, opacity }}
        className="relative z-0 mx-auto mt-2 h-[46svh] min-h-[300px] w-full max-w-xl lg:mt-0 lg:h-[88svh] lg:w-1/2 lg:max-w-none"
      >
        <HatIllustration className={`absolute inset-0 m-auto h-full w-full max-w-lg transition-opacity duration-700 ${pronto ? "opacity-0" : "opacity-100"}`} />
        {can3D && (
          <Suspense fallback={null}>
            <div className={`absolute inset-0 transition-opacity duration-700 ${pronto ? "opacity-100" : "opacity-0"}`}>
              <HeroCanvas progress={scrollYProgress} ativo={visivel} onPronto={() => setPronto(true)} />
            </div>
          </Suspense>
        )}
        {pronto && <p className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.25em] text-creme/50">Arraste para girar</p>}
      </motion.div>
    </section>
  );
}
