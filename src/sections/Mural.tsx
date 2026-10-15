import { useRef } from "react";
import { IconArrow } from "../components/Icons";
import { SectionHeader } from "../components/SectionHeader";
import { CLIENTES, FEEDBACKS, type Foto } from "../data/vitrine";

const GIROS = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "-rotate-2", "rotate-1"];

function Moldura({ f, texto }: { f: Foto; texto: string }) {
  if (f.src) return <img src={f.src} srcSet={f.srcSet} alt={f.alt} loading="lazy" className="h-full w-full object-cover" />;
  return (
    <div className="grid h-full w-full place-items-center bg-[repeating-linear-gradient(45deg,#e9dfcc_0_10px,#e2d6bf_10px_20px)] p-4 text-center text-couro" role="img" aria-label={f.alt}>
      <div>
        <svg viewBox="0 0 24 24" className="mx-auto h-8 w-8 opacity-60" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 8h3l2-3h6l2 3h3v11H4z" /><circle cx="12" cy="13" r="3.5" /></svg>
        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] opacity-70">{texto}</p>
      </div>
    </div>
  );
}

export function Mural() {
  const trilho = useRef<HTMLUListElement>(null);
  const rolar = (dir: 1 | -1) => trilho.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  return (
    <section id="clientes" className="section-cream overflow-hidden py-16 lg:py-28">
      <div className="container-x">
        <SectionHeader
          n="09"
          eyebrow="Mural de clientes"
          title={<>Quem veste, <em className="font-normal italic text-terra">conta</em></>}
          desc="Espaço para fotos de clientes e prints de feedback (com autorização). Os quadros abaixo estão vazios até o cliente enviar as imagens."
          action={
            <div className="flex gap-2">
              <button onClick={() => rolar(-1)} aria-label="Fotos anteriores" className="grid h-12 w-12 rotate-180 place-items-center rounded-full border border-couro/40 hover:bg-carvao hover:text-creme"><IconArrow /></button>
              <button onClick={() => rolar(1)} aria-label="Próximas fotos" className="grid h-12 w-12 place-items-center rounded-full border border-couro/40 hover:bg-carvao hover:text-creme"><IconArrow /></button>
            </div>
          }
        />

        <ul ref={trilho} aria-label="Fotos de clientes" tabIndex={0} className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 py-6 sm:mx-0 sm:px-2">
          {CLIENTES.map((c, i) => (
            <li key={c.id} className={`w-[64%] shrink-0 snap-start sm:w-[270px] ${GIROS[i % GIROS.length]} transition-transform duration-300 hover:rotate-0`}>
              <figure className="relative bg-white p-3 pb-12 shadow-[0_20px_40px_-18px_rgba(14,12,10,.45)]">
                <span aria-hidden className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-[-4deg] bg-sol/60" />
                <div className="aspect-square overflow-hidden"><Moldura f={c} texto="Foto de cliente" /></div>
                <figcaption className="absolute inset-x-0 bottom-2 text-center font-script text-2xl text-couro">Luxo Country</figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <h3 className="mt-14 font-display text-3xl font-semibold">Feedbacks</h3>
        <ul className="no-scrollbar -mx-5 mt-6 flex gap-5 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-3 sm:px-0">
          {FEEDBACKS.map((f) => (
            <li key={f.id} className="w-[62%] shrink-0 sm:w-auto">
              <div className="mx-auto max-w-[260px] rounded-[2.2rem] bg-carvao p-2.5 shadow-xl">
                <div className="aspect-[9/16] overflow-hidden rounded-[1.8rem]"><Moldura f={f} texto="Print de feedback" /></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
