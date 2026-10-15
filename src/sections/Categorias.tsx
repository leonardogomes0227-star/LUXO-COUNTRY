import { SectionHeader } from "../components/SectionHeader";
import { CATEGORIAS } from "../data/products";
import { useFiltros } from "../store/filters";

export function Categorias() {
  const { ir } = useFiltros();
  return (
    <section id="categorias" className="section-cream pb-16 lg:pb-24">
      <div className="container-x">
        <SectionHeader n="03" eyebrow="Categorias" title={<>Compre por <em className="font-normal italic text-terra">categoria</em></>} desc="Do chapéu à bota: encontre a peça certa e peça direto pelo WhatsApp." />
        <ul className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-7">
          {CATEGORIAS.map((c) => (
            <li key={c.id} className="w-[38vw] shrink-0 sm:w-auto">
              <button onClick={() => ir({ categoria: c.id })} className="group block w-full text-left">
                <span className="relative block aspect-[4/5] overflow-hidden rounded-2xl">
                  {/* CONFIRMAR: trocar pela foto real da categoria */}
                  <img src={`/images/arte/cat-${c.id}.webp`} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <span className="absolute inset-0 bg-gradient-to-t from-carvao/70 via-transparent to-transparent" />
                  <span className="absolute inset-x-3 bottom-3 flex items-center justify-between font-display text-lg font-semibold text-creme">
                    {c.nome}
                    <span aria-hidden className="grid h-7 w-7 place-items-center rounded-full bg-creme/90 text-sm text-carvao transition-transform group-hover:-rotate-45">→</span>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
