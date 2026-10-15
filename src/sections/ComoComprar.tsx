import { Reveal } from "../components/Reveal";
import { PASSOS } from "../data/content";

export function ComoComprar() {
  return (
    <section id="como-comprar" className="section-dark py-20 lg:py-28">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Como comprar</p>
          <h2 className="h-section mt-3">Três passos, do site à sua porta</h2>
        </Reveal>
        <ol className="relative mt-14 grid gap-10 md:grid-cols-3">
          <div aria-hidden className="absolute left-0 right-0 top-8 hidden border-t-2 border-dashed border-ouro/40 md:block" />
          {PASSOS.map((p, i) => (
            <li key={p.n} className="list-none">
              <Reveal delay={i * 0.12} className="relative">
                <span className="relative grid h-16 w-16 place-items-center rounded-full border-2 border-ouro bg-carvao font-rye text-xl text-ouro">{p.n}</span>
                <h3 className="mt-6 text-2xl font-bold">{p.t}</h3>
                <p className="mt-2 max-w-xs text-creme/75">{p.d}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
