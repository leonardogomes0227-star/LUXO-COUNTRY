import { Placeholder } from "../components/Img";
import { Reveal } from "../components/Reveal";
import { CATEGORIAS } from "../data/products";
import { useFiltros } from "../store/filters";

export function Categorias() {
  const { ir } = useFiltros();
  return (
    <section id="categorias" className="section-cream pb-14 pt-4 lg:pb-20">
      <div className="container-x">
        <Reveal><h2 className="font-display text-3xl font-bold sm:text-4xl">Compre por categoria</h2></Reveal>
        <ul className="no-scrollbar -mx-5 mt-8 flex gap-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-7">
          {CATEGORIAS.map((c) => (
            <li key={c.id} className="shrink-0">
              <button onClick={() => ir({ categoria: c.id })} className="group flex w-24 flex-col items-center gap-3 sm:w-full">
                <span className="block aspect-square w-full overflow-hidden rounded-full border-2 border-couro/20 transition-all group-hover:border-couro group-hover:shadow-lg group-hover:shadow-couro/25">
                  {/* CONFIRMAR: trocar pelas fotos reais de cada categoria */}
                  <Placeholder forma={c.id} className="transition-transform duration-500 group-hover:scale-110" />
                </span>
                <span className="text-sm font-semibold group-hover:text-couro">{c.nome}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
