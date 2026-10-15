import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { IconSearch } from "../components/Icons";
import { ProductCard } from "../components/ProductCard";
import { Reveal } from "../components/Reveal";
import { CATEGORIAS, PRODUCTS, PUBLICOS, type Categoria, type Publico } from "../data/products";

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function Catalogo({ publico, setPublico }: { publico: Publico | "todos"; setPublico: (p: Publico | "todos") => void }) {
  const [categoria, setCategoria] = useState<Categoria | "todas">("todas");
  const [busca, setBusca] = useState("");

  const lista = useMemo(() => {
    const q = norm(busca.trim());
    return PRODUCTS.filter(
      (p) =>
        (publico === "todos" || p.publico === publico) &&
        (categoria === "todas" || p.categoria === categoria) &&
        (!q || norm(p.nome).includes(q)),
    );
  }, [publico, categoria, busca]);

  return (
    <section id="catalogo" className="section-cream pb-20 pt-4 lg:pb-28">
      <div className="container-x">
        <Reveal className="flex flex-col gap-6">
          <div>
            <p className="eyebrow">Catálogo</p>
            <h2 className="h-section mt-3">Escolha sua peça</h2>
            <p className="mt-3 max-w-xl text-carvao/70">
              Selecione o tamanho e peça direto pelo WhatsApp, ou monte uma sacola com várias peças.
              <span className="ml-1 font-semibold text-couro">As peças abaixo são exemplos até o catálogo real ser cadastrado.</span>
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div role="group" aria-label="Filtrar por público" className="flex flex-wrap gap-2">
              <button className="chip" aria-pressed={publico === "todos"} onClick={() => setPublico("todos")}>Todos</button>
              {PUBLICOS.map((p) => (
                <button key={p.id} className="chip" aria-pressed={publico === p.id} onClick={() => setPublico(p.id)}>{p.nome}</button>
              ))}
            </div>
            <div role="group" aria-label="Filtrar por categoria" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
              <button className="chip shrink-0" aria-pressed={categoria === "todas"} onClick={() => setCategoria("todas")}>Todas</button>
              {CATEGORIAS.map((c) => (
                <button key={c.id} className="chip shrink-0" aria-pressed={categoria === c.id} onClick={() => setCategoria(c.id)}>{c.nome}</button>
              ))}
            </div>
            <label className="relative block max-w-md">
              <span className="sr-only">Buscar peça</span>
              <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-couro" />
              <input
                type="search"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar camisa, bota, chapéu..."
                className="min-h-12 w-full rounded-full border border-couro/30 bg-white/70 pl-12 pr-4 text-base placeholder:text-carvao/45 focus:border-couro focus:outline-none"
              />
            </label>
          </div>
        </Reveal>

        <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {lista.map((p) => <ProductCard key={p.id} p={p} />)}
          </AnimatePresence>
        </motion.div>
        {lista.length === 0 && (
          <p className="mt-12 text-center text-carvao/70" role="status">Nenhuma peça encontrada. Que tal chamar a gente no WhatsApp? Podemos ter o que você procura.</p>
        )}
      </div>
    </section>
  );
}
