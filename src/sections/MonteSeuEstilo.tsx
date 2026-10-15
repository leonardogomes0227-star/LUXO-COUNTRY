import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IconWhatsapp } from "../components/Icons";
import { Reveal } from "../components/Reveal";
import { CHAPEUS, CINTOS, type Variante } from "../data/estilo";
import { waLink } from "../lib/whatsapp";

function Seletor({ titulo, opcoes, valor, onChange }: { titulo: string; opcoes: Variante[]; valor: Variante; onChange: (v: Variante) => void }) {
  return (
    <fieldset>
      <legend className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sol">{titulo}: <span className="text-creme">{valor.nome}</span></legend>
      <div className="mt-3 flex flex-wrap gap-3">
        {opcoes.map((o) => (
          <label key={o.id} className="cursor-pointer">
            <input type="radio" name={titulo} checked={valor.id === o.id} onChange={() => onChange(o)} className="peer sr-only" />
            <span
              title={o.nome}
              className="block h-12 w-12 rounded-full border-2 border-creme/15 shadow-inner transition-all peer-checked:scale-110 peer-checked:border-sol peer-checked:shadow-[0_0_0_4px_rgba(233,168,90,.25)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-sol"
              style={{ background: `radial-gradient(circle at 30% 30%, ${o.cor}, ${o.cor} 55%, #000 170%)` }}
            >
              <span className="sr-only">{o.nome}</span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Peca({ src, alt, className }: { src: string; alt: string; className: string }) {
  return (
    <div className={className}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.img
        key={src}
        src={src}
        alt={alt}
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 1.02 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        />
      </AnimatePresence>
    </div>
  );
}

export function MonteSeuEstilo() {
  const [chapeu, setChapeu] = useState(CHAPEUS[0]);
  const [cinto, setCinto] = useState(CINTOS[1]);
  const msg = `Olá! Vim pelo site da Luxo Country e montei meu estilo: chapéu ${chapeu.nome.toLowerCase()} e cinto ${cinto.nome.toLowerCase()}. Pode me mostrar as opções disponíveis?`;

  return (
    <section id="estilo" className="section-dark relative overflow-hidden py-16 lg:py-28">
      <div className="container-x relative grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-terra lg:mx-auto lg:w-full lg:max-w-[560px]">
          <div aria-hidden className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#F8C774_0%,#E9A85A_45%,transparent_70%)] opacity-60" />
          <div aria-hidden className="absolute inset-4 rounded-[1.5rem] border-2 border-dashed border-creme/25" />
          <span aria-hidden className="absolute left-6 top-4 font-script text-5xl text-creme/90 lg:text-6xl">seu estilo</span>
          <Peca src={`/images/estilo/cinto-${cinto.id}.webp`} alt={`Cinto ${cinto.nome.toLowerCase()} com fivela dourada`} className="absolute left-1/2 top-[38%] w-[84%] -translate-x-1/2" />
          <Peca src={`/images/estilo/chapeu-${chapeu.id}.webp`} alt={`Chapéu ${chapeu.nome.toLowerCase()}`} className="absolute left-1/2 top-[-2%] w-[66%] -translate-x-1/2" />
        </div>

        <Reveal className="space-y-8">
          <div>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-sol"><span className="font-display text-sm normal-case italic tracking-normal">(07)</span> Monte seu estilo</p>
            <h2 className="h-section mt-4">Combine as cores, <em className="font-normal italic text-sol">veja na hora</em></h2>
            <p className="mt-4 text-creme/75">Escolha o chapéu e o cinto e envie a combinação pelo WhatsApp. A disponibilidade de cada cor é confirmada no atendimento.</p>
          </div>
          <Seletor titulo="Chapéu" opcoes={CHAPEUS} valor={chapeu} onChange={setChapeu} />
          <Seletor titulo="Cinto" opcoes={CINTOS} valor={cinto} onChange={setCinto} />
          <a href={waLink(msg)} target="_blank" rel="noopener noreferrer" className="btn-gold w-full sm:w-auto"><IconWhatsapp width={18} height={18} /> Pedir esta combinação</a>
        </Reveal>
      </div>
    </section>
  );
}
