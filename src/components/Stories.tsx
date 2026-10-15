import { useFiltros } from "../store/filters";
import type { Categoria, Publico } from "../data/products";

interface Story { t: string; img: string; href: string; filtro?: { publico?: Publico; categoria?: Categoria } }

const STORIES: Story[] = [
  { t: "Novidades", img: "ig-1", href: "#destaques" },
  { t: "Infantil", img: "look-infantil-600", href: "#catalogo", filtro: { publico: "infantil" } },
  { t: "Botas", img: "cat-botas", href: "#catalogo", filtro: { categoria: "botas" } },
  { t: "Chapéus", img: "cat-chapeus", href: "#catalogo", filtro: { categoria: "chapeus" } },
  { t: "Cintos", img: "cat-cintos", href: "#catalogo", filtro: { categoria: "cintos" } },
  { t: "Clientes", img: "ig-8", href: "#clientes" },
  { t: "Loja", img: "ig-4", href: "#loja" },
  { t: "Instagram", img: "ig-6", href: "#instagram" },
];

/** Atalhos redondos com anel dourado, como os destaques do Instagram da loja. Só no celular. */
export function Stories() {
  const { ir } = useFiltros();
  return (
    <section aria-label="Atalhos" className="bg-carvao pb-4 lg:hidden">
      <ul className="no-scrollbar flex gap-4 overflow-x-auto px-5">
        {STORIES.map((s) => (
          <li key={s.t} className="shrink-0">
            <a href={s.href} onClick={s.filtro ? (e) => { e.preventDefault(); ir(s.filtro!); } : undefined} className="flex w-[68px] flex-col items-center gap-1.5 text-[11px] font-medium text-creme/85">
              <span className="block rounded-full bg-gradient-to-tr from-ouro via-caramelo to-turquesa p-[2.5px]">
                <span className="block h-[62px] w-[62px] overflow-hidden rounded-full border-2 border-carvao"><img src={`/images/arte/${s.img}.webp`} alt="" loading="lazy" className="h-full w-full object-cover" /></span>
              </span>
              {s.t}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
