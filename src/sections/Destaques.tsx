import { useRef } from "react";
import { IconArrow } from "../components/Icons";
import { ProductCard } from "../components/ProductCard";
import { PRODUCTS } from "../data/products";

/** CONFIRMAR: trocar a seleção pelos produtos que a loja quer destacar (ex.: lançamentos). */
const DESTAQUES = PRODUCTS.filter((p) => ["ex-chapeu-preto", "ex-bota-masc", "ex-camisa-fem", "ex-cinto-couro", "ex-bota-fem", "ex-camisa-kids", "ex-jeans-masc", "ex-chapeu-palha"].includes(p.id));

export function Destaques() {
  const trilho = useRef<HTMLUListElement>(null);
  const rolar = (d: 1 | -1) => trilho.current?.scrollBy({ left: d * 300, behavior: "smooth" });
  return (
    <section id="destaques" className="section-cream pb-14 lg:pb-20">
      <div className="container-x">
        <div className="mb-6 flex items-end justify-between gap-4 border-b-2 border-couro pb-3">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Em destaque</h2>
          <div className="flex gap-2">
            <button onClick={() => rolar(-1)} aria-label="Anteriores" className="grid h-10 w-10 rotate-180 place-items-center rounded-full border border-couro/40 hover:bg-couro hover:text-creme"><IconArrow width={18} height={18} /></button>
            <button onClick={() => rolar(1)} aria-label="Próximos" className="grid h-10 w-10 place-items-center rounded-full border border-couro/40 hover:bg-couro hover:text-creme"><IconArrow width={18} height={18} /></button>
          </div>
        </div>
        <ul ref={trilho} className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 sm:mx-0 sm:px-0">
          {DESTAQUES.map((p) => <li key={p.id} className="w-[72%] shrink-0 snap-start sm:w-[270px]"><ProductCard p={p} /></li>)}
        </ul>
      </div>
    </section>
  );
}
