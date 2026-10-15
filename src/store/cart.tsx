import { createContext, useContext, useEffect, useMemo, useReducer, useState, type ReactNode } from "react";
import type { Product } from "../data/products";

export interface CartItem {
  key: string;
  id: string;
  nome: string;
  tamanho: string;
  qtd: number;
}

type Action =
  | { type: "add"; item: Omit<CartItem, "key" | "qtd"> }
  | { type: "qty"; key: string; delta: number }
  | { type: "remove"; key: string }
  | { type: "clear" };

const STORAGE = "luxo-country:sacola";
const STORAGE_CIDADE = "luxo-country:cidade";

function reducer(state: CartItem[], a: Action): CartItem[] {
  switch (a.type) {
    case "add": {
      const key = `${a.item.id}|${a.item.tamanho}`;
      const found = state.find((i) => i.key === key);
      if (found) return state.map((i) => (i.key === key ? { ...i, qtd: i.qtd + 1 } : i));
      return [...state, { ...a.item, key, qtd: 1 }];
    }
    case "qty":
      return state.map((i) => (i.key === a.key ? { ...i, qtd: i.qtd + a.delta } : i)).filter((i) => i.qtd > 0);
    case "remove":
      return state.filter((i) => i.key !== a.key);
    case "clear":
      return [];
  }
}

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* armazenamento indisponível: a sacola continua funcionando em memória */
  }
}

interface CartCtx {
  itens: CartItem[];
  total: number;
  cidade: string;
  setCidade: (c: string) => void;
  aberta: boolean;
  setAberta: (v: boolean) => void;
  add: (p: Product, tamanho: string) => void;
  qty: (key: string, delta: number) => void;
  remove: (key: string) => void;
  clear: () => void;
}

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [itens, dispatch] = useReducer(reducer, [], () => load<CartItem[]>(STORAGE, []));
  const [cidade, setCidade] = useState(() => load(STORAGE_CIDADE, ""));
  const [aberta, setAberta] = useState(false);

  useEffect(() => save(STORAGE, itens), [itens]);
  useEffect(() => save(STORAGE_CIDADE, cidade), [cidade]);

  const value = useMemo<CartCtx>(
    () => ({
      itens,
      total: itens.reduce((s, i) => s + i.qtd, 0),
      cidade,
      setCidade,
      aberta,
      setAberta,
      add: (p, tamanho) => {
        dispatch({ type: "add", item: { id: p.id, nome: p.nome, tamanho } });
      },
      qty: (key, delta) => dispatch({ type: "qty", key, delta }),
      remove: (key) => dispatch({ type: "remove", key }),
      clear: () => dispatch({ type: "clear" }),
    }),
    [itens, cidade, aberta],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart fora do CartProvider");
  return c;
}
