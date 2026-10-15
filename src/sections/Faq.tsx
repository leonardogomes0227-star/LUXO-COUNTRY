import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IconPlus } from "../components/Icons";
import { Reveal } from "../components/Reveal";
import { FAQ } from "../data/content";

export function Faq() {
  const [aberta, setAberta] = useState<number | null>(0);
  return (
    <section id="faq" className="section-dark py-14 lg:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <p className="eyebrow">Dúvidas</p>
          <h2 className="h-section mt-3">Perguntas frequentes</h2>
          <p className="mt-4 text-creme/70">Não achou o que procurava? Chame a gente no WhatsApp.</p>
        </Reveal>
        <div className="divide-y divide-creme/15 border-y border-creme/15">
          {FAQ.map((f, i) => {
            const on = aberta === i;
            return (
              <div key={f.p}>
                <h3>
                  <button id={`faq-b-${i}`} aria-expanded={on} aria-controls={`faq-p-${i}`} onClick={() => setAberta(on ? null : i)} className="flex min-h-14 w-full items-center justify-between gap-4 py-5 text-left font-display text-xl font-bold hover:text-ouro">
                    {f.p}
                    <IconPlus className={`shrink-0 text-ouro transition-transform duration-300 ${on ? "rotate-45" : ""}`} />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div id={`faq-p-${i}`} role="region" aria-labelledby={`faq-b-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <p className="pb-6 pr-10 text-creme/75">{f.r}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
