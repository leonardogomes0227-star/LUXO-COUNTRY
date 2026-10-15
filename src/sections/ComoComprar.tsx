import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { PASSOS } from "../data/content";

export function ComoComprar() {
  return (
    <section id="como-comprar" className="section-dark py-16 lg:py-28">
      <div className="container-x">
        <SectionHeader n="08" eyebrow="Como comprar" title={<>Do site <em className="font-normal italic text-sol">à sua porta</em></>} desc="Sem cadastro e sem complicação: o atendimento é feito por gente de verdade, pelo WhatsApp." />
        <ol className="grid border-t border-creme/15 md:grid-cols-3">
          {PASSOS.map((p, i) => (
            <li key={p.n} className={`border-b border-creme/15 py-8 md:border-b-0 md:py-12 ${i > 0 ? "md:border-l md:pl-10" : ""} ${i < 2 ? "md:pr-10" : ""}`}>
              <Reveal delay={i * 0.12}>
                <span className="block font-display text-[5.5rem] font-black leading-none text-transparent [-webkit-text-stroke:1.5px_#E9A85A] lg:text-[8rem]">{p.n}</span>
                <h3 className="mt-4 font-display text-3xl font-semibold">{p.t}</h3>
                <p className="mt-3 max-w-xs text-creme/70">{p.d}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
