import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Categoria, Publico } from "../data/products";

export type Ordem = "relevancia" | "nome";

export interface Filtros {
  publico: Publico | "todos";
  categoria: Categoria | "todas";
  tamanho: string | "todos";
  busca: string;
  ordem: Ordem;
}

const INICIAL: Filtros = { publico: "todos", categoria: "todas", tamanho: "todos", busca: "", ordem: "relevancia" };

interface Ctx {
  filtros: Filtros;
  set: (p: Partial<Filtros>) => void;
  /** Aplica filtros (zerando os demais) e rola até o catálogo. */
  ir: (p: Partial<Filtros>) => void;
  limpar: () => void;
}

const FiltrosCtx = createContext<Ctx | null>(null);

export function FiltrosProvider({ children }: { children: ReactNode }) {
  const [filtros, setFiltros] = useState<Filtros>(INICIAL);
  const set = useCallback((p: Partial<Filtros>) => setFiltros((f) => ({ ...f, ...p })), []);
  const ir = useCallback((p: Partial<Filtros>) => {
    setFiltros({ ...INICIAL, ...p });
    window.setTimeout(() => document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth", block: "start" }), 30);
  }, []);
  const limpar = useCallback(() => setFiltros(INICIAL), []);
  const value = useMemo(() => ({ filtros, set, ir, limpar }), [filtros, set, ir, limpar]);
  return <FiltrosCtx.Provider value={value}>{children}</FiltrosCtx.Provider>;
}

export function useFiltros() {
  const c = useContext(FiltrosCtx);
  if (!c) throw new Error("useFiltros fora do FiltrosProvider");
  return c;
}
