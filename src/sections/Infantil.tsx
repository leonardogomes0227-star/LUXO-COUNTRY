import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { IconArrow, IconStar } from "../components/Icons";
import { Reveal } from "../components/Reveal";
import { SITE } from "../config";
import { waLink } from "../lib/whatsapp";
import { useFiltros } from "../store/filters";

export function Infantil() {
  const { ir } = useFiltros();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const r = useTransform(scrollYProgress, [0, 1], [-6, 4]);

  return (
    <section id="infantil" ref={ref} className="relative overflow-hidden bg-turquesa py-16 text-creme lg:py-28">
      <div aria-hidden className="absolute -left-24 top-10 font-script text-[40vw] leading-none text-white/[0.06] lg:text-[22vw]">kids</div>
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <Reveal>
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-creme/80">
            <span className="font-display text-sm normal-case italic tracking-normal">(06)</span> Linha infantil
          </p>
          <h2 className="mt-4 font-display text-[2.6rem] font-semibold leading-[0.95] tracking-[-0.025em] sm:text-6xl lg:text-7xl">
            Os pequenos também <em className="font-normal italic text-sol">cavalgam em estilo</em>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-creme/85">
            Chapéu, bota, camisa e jeans no tamanho das crianças, com o mesmo cuidado da linha adulta. Para os pais que gostam de ver a família toda combinando.
          </p>
          <ul className="mt-6 space-y-2.5 text-creme/90">
            {["Peças do tamanho certo para cada idade", "Ajuda com tamanhos pelo WhatsApp", "Envio para todo o Brasil"].map((t) => (
              <li key={t} className="flex items-center gap-3"><IconStar width={14} height={14} className="shrink-0 text-sol" /> {t}</li>
            ))}
          </ul>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#catalogo" onClick={(e) => { e.preventDefault(); ir({ publico: "infantil" }); }} className="btn bg-creme text-carvao hover:bg-sol">Ver linha infantil <IconArrow width={18} height={18} /></a>
            <a href={waLink(`Olá! Vim pelo site da ${SITE.nome} e quero ver peças infantis.`)} target="_blank" rel="noopener noreferrer" className="btn-ghost">Tirar dúvida de tamanho</a>
          </div>
        </Reveal>

        <motion.div style={{ y, rotate: r }} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-30px_rgba(0,0,0,.6)] ring-8 ring-creme/95">
            {/* CONFIRMAR: trocar por foto real das crianças (com autorização dos responsáveis) */}
            <img src="/images/arte/look-infantil.webp" srcSet="/images/arte/look-infantil-600.webp 600w, /images/arte/look-infantil.webp 900w" sizes="(min-width:1024px) 45vw, 90vw" alt="Composição de peças da linha infantil" loading="lazy" className="aspect-[3/4] w-full object-cover" />
          </div>
          <span className="absolute -bottom-5 -left-3 rotate-[-6deg] rounded-full bg-sol px-5 py-2.5 font-display text-lg font-semibold italic text-carvao shadow-xl">linha kids</span>
        </motion.div>
      </div>
    </section>
  );
}
