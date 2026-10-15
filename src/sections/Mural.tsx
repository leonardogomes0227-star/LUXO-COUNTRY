import { useRef } from "react";
import { Img } from "../components/Img";
import { IconArrow } from "../components/Icons";
import { Reveal } from "../components/Reveal";
import { CLIENTES, FEEDBACKS } from "../data/vitrine";

export function Mural() {
  const trilho = useRef<HTMLUListElement>(null);
  const rolar = (dir: 1 | -1) => trilho.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  return (
    <section id="clientes" className="section-cream py-14 lg:py-28">
      <div className="container-x">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">Mural de clientes</p>
            <h2 className="h-section mt-3">Quem veste, conta</h2>
            <p className="mt-3 text-carvao/70">Fotos de clientes e feedbacks que chegam pelo WhatsApp. <span className="font-semibold text-couro">Espaços de exemplo: substituir por fotos reais autorizadas.</span></p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => rolar(-1)} aria-label="Fotos anteriores" className="grid h-12 w-12 rotate-180 place-items-center rounded-full border border-couro/40 hover:bg-couro hover:text-creme"><IconArrow /></button>
            <button onClick={() => rolar(1)} aria-label="Próximas fotos" className="grid h-12 w-12 place-items-center rounded-full border border-couro/40 hover:bg-couro hover:text-creme"><IconArrow /></button>
          </div>
        </Reveal>

        <ul ref={trilho} aria-label="Fotos de clientes" tabIndex={0} className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          {CLIENTES.map((c, i) => (
            <li key={c.id} className="aspect-[3/4] w-[70%] shrink-0 snap-start overflow-hidden rounded-3xl sm:w-[300px]">
              <Img src={c.src} srcSet={c.srcSet} alt={c.alt} forma={i % 2 ? "pessoa" : "chapeus"} rotulo="Foto de cliente · exemplo" />
            </li>
          ))}
        </ul>

        <h3 className="mt-14 text-2xl font-bold">Feedbacks</h3>
        <ul className="mt-5 grid gap-4 sm:grid-cols-3">
          {FEEDBACKS.map((f) => (
            <li key={f.id} className="aspect-[9/12] overflow-hidden rounded-3xl border border-couro/20">
              <Img src={f.src} srcSet={f.srcSet} alt={f.alt} forma="camisetas" rotulo="Print de feedback · exemplo" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
