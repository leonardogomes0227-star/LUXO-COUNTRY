import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { CATEGORIAS, PRODUCTS, PUBLICOS } from "../data/products";
import { useFiltros } from "../store/filters";

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const ordemTamanho = (a: string, b: string) => (isNaN(+a) || isNaN(+b) ? a.localeCompare(b, "pt-BR") : +a - +b);

function Painel() {
  const { filtros, set } = useFiltros();
  const base = PRODUCTS.filter((p) => filtros.publico === "todos" || p.publico === filtros.publico);
  const tamanhos = [...new Set(base.filter((p) => filtros.categoria === "todas" || p.categoria === filtros.categoria).flatMap((p) => p.tamanhos))].sort(ordemTamanho);

  const grupo = "border-b border-couro/15 py-5";
  const titulo = "mb-3 text-xs font-bold uppercase tracking-[0.2em] text-couro";
  const item = "flex min-h-10 w-full items-center justify-between rounded-lg px-3 text-left text-[15px] transition-colors hover:bg-couro/10 aria-pressed:bg-couro aria-pressed:font-semibold aria-pressed:text-creme";

  return (
    <div>
      <div className={grupo}>
        <h3 className={titulo}>Público</h3>
        {[{ id: "todos" as const, nome: "Todos" }, ...PUBLICOS].map((p) => (
          <button key={p.id} className={item} aria-pressed={filtros.publico === p.id} onClick={() => set({ publico: p.id, tamanho: "todos" })}>{p.nome}</button>
        ))}
      </div>
      <div className={grupo}>
        <h3 className={titulo}>Categoria</h3>
        <button className={item} aria-pressed={filtros.categoria === "todas"} onClick={() => set({ categoria: "todas", tamanho: "todos" })}>Todas <span className="text-xs opacity-70">{base.length}</span></button>
        {CATEGORIAS.map((c) => {
          const n = base.filter((p) => p.categoria === c.id).length;
          return (
            <button key={c.id} disabled={n === 0} className={`${item} disabled:opacity-40`} aria-pressed={filtros.categoria === c.id} onClick={() => set({ categoria: c.id, tamanho: "todos" })}>{c.nome} <span className="text-xs opacity-70">{n}</span></button>
          );
        })}
      </div>
      <div className="py-5">
        <h3 className={titulo}>Tamanho</h3>
        <div className="flex flex-wrap gap-1.5">
          {tamanhos.map((t) => (
            <button key={t} className="chip !min-h-9 !min-w-10 !px-2.5 !text-xs" aria-pressed={filtros.tamanho === t} onClick={() => set({ tamanho: filtros.tamanho === t ? "todos" : t })}>{t}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Catalogo() {
  const { filtros, set, limpar } = useFiltros();
  const [painel, setPainel] = useState(false);

  const lista = useMemo(() => {
    const q = norm(filtros.busca.trim());
    const r = PRODUCTS.filter(
      (p) =>
        (filtros.publico === "todos" || p.publico === filtros.publico) &&
        (filtros.categoria === "todas" || p.categoria === filtros.categoria) &&
        (filtros.tamanho === "todos" || p.tamanhos.includes(filtros.tamanho)) &&
        (!q || norm(p.nome).includes(q)),
    );
    return filtros.ordem === "nome" ? [...r].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR")) : r;
  }, [filtros]);

  const ativos = [
    filtros.publico !== "todos" && { k: "publico", t: PUBLICOS.find((p) => p.id === filtros.publico)!.nome, off: () => set({ publico: "todos" }) },
    filtros.categoria !== "todas" && { k: "cat", t: CATEGORIAS.find((c) => c.id === filtros.categoria)!.nome, off: () => set({ categoria: "todas" }) },
    filtros.tamanho !== "todos" && { k: "tam", t: `Tam. ${filtros.tamanho}`, off: () => set({ tamanho: "todos" }) },
    filtros.busca.trim() && { k: "q", t: `“${filtros.busca.trim()}”`, off: () => set({ busca: "" }) },
  ].filter(Boolean) as { k: string; t: string; off: () => void }[];

  return (
    <section id="catalogo" className="section-cream py-12 lg:py-16">
      <div className="container-x">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Todos os produtos</h2>
            <p className="mt-1 text-sm text-carvao/65">Peças de exemplo até o catálogo real ser cadastrado. Compre pelo WhatsApp ou monte sua sacola.</p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[17rem_1fr]">
          <aside aria-label="Filtros" className={`${painel ? "block" : "hidden"} rounded-2xl border border-couro/15 bg-white px-5 lg:block lg:self-start lg:sticky lg:top-36`}>
            <Painel />
          </aside>

          <div>
            <div className="mb-5 flex flex-wrap items-center gap-3 rounded-xl border border-couro/15 bg-white px-4 py-3">
              <button className="btn-dark !min-h-10 !px-4 lg:hidden" aria-expanded={painel} onClick={() => setPainel(!painel)}>{painel ? "Ocultar filtros" : "Filtrar"}</button>
              <p className="text-sm font-semibold" role="status" aria-live="polite">{lista.length} {lista.length === 1 ? "produto" : "produtos"}</p>
              <label className="ml-auto flex items-center gap-2 text-sm">
                <span className="text-carvao/65">Ordenar</span>
                <select value={filtros.ordem} onChange={(e) => set({ ordem: e.target.value as "relevancia" | "nome" })} className="min-h-10 rounded-lg border border-couro/30 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-couro">
                  <option value="relevancia">Relevância</option>
                  <option value="nome">Nome (A–Z)</option>
                </select>
              </label>
            </div>

            {ativos.length > 0 && (
              <div className="mb-5 flex flex-wrap items-center gap-2">
                {ativos.map((a) => (
                  <button key={a.k} onClick={a.off} className="flex min-h-9 items-center gap-2 rounded-full bg-couro/10 px-3 text-sm font-medium hover:bg-couro/20">{a.t}<span aria-hidden>×</span><span className="sr-only">remover filtro</span></button>
                ))}
                <button onClick={limpar} className="text-sm font-semibold text-couro underline underline-offset-2">Limpar tudo</button>
              </div>
            )}

            <motion.div layout className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">{lista.map((p) => <ProductCard key={p.id} p={p} />)}</AnimatePresence>
            </motion.div>
            {lista.length === 0 && (
              <div className="rounded-2xl border border-dashed border-couro/30 p-10 text-center text-carvao/70" role="status">
                Nenhuma peça encontrada com esses filtros. <button onClick={limpar} className="font-semibold text-couro underline">Limpar filtros</button> ou chame a gente no WhatsApp: podemos ter o que você procura.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
