import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import { categoriaNome, formatPreco, type Product } from "../data/products";
import { useReducedMotion } from "../lib/device";
import { mensagemPeca, waLink } from "../lib/whatsapp";
import { useCart } from "../store/cart";
import { IconBag, IconWhatsapp } from "./Icons";
import { Img } from "./Img";

export function ProductCard({ p }: { p: Product }) {
  const { add, setAberta } = useCart();
  const [tam, setTam] = useState(p.tamanhos[0]);
  const [detalhe, setDetalhe] = useState(false);
  const [adicionado, setAdicionado] = useState(false);
  const reduzido = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 200, damping: 20 });

  const mover = (e: React.PointerEvent<HTMLElement>) => {
    if (reduzido || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const sair = () => { mx.set(0); my.set(0); setDetalhe(false); };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      onPointerMove={mover}
      onPointerEnter={(e) => e.pointerType === "mouse" && setDetalhe(true)}
      onPointerLeave={sair}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-couro/15 bg-white/60 shadow-sm transition-shadow hover:shadow-xl hover:shadow-couro/20"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Img src={detalhe && p.fotos?.[1] ? p.fotos[1] : p.fotos?.[0]} alt={`${p.nome}, ${detalhe ? "detalhe" : "vista frontal"}`} forma={p.categoria} detalhe={detalhe} rotulo={p.exemplo ? "Exemplo" : undefined} sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute right-2 top-2 flex gap-1 rounded-full bg-carvao/70 p-1 backdrop-blur" role="group" aria-label="Foto">
          {[false, true].map((d) => (
            <button key={String(d)} aria-pressed={detalhe === d} onClick={() => setDetalhe(d)} className={`min-h-8 rounded-full px-3 text-[11px] font-semibold ${detalhe === d ? "bg-ouro text-carvao" : "text-creme"}`}>
              {d ? "Detalhe" : "Frente"}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-turquesa">{categoriaNome(p.categoria)}</p>
          <h3 className="mt-1 text-xl font-bold leading-tight">{p.nome}</h3>
          <p className="mt-1 text-sm font-semibold text-couro">{formatPreco(p.preco)}</p>
        </div>
        <div role="group" aria-label={`Tamanho de ${p.nome}`} className="flex flex-wrap gap-1.5">
          {p.tamanhos.map((t) => (
            <button key={t} aria-pressed={tam === t} onClick={() => setTam(t)} className="chip !min-h-9 !px-3 !text-xs">{t}</button>
          ))}
        </div>
        <div className="mt-auto grid grid-cols-[1fr_auto] gap-2 pt-1">
          <a href={waLink(mensagemPeca(p, tam))} target="_blank" rel="noopener noreferrer" className="btn-dark !min-h-11 !px-4 !text-[13px]">
            <IconWhatsapp width={16} height={16} /> Pedir pelo WhatsApp
          </a>
          <button
            aria-label={`Adicionar ${p.nome}, tamanho ${tam}, à sacola`}
            onClick={() => { add(p, tam); setAdicionado(true); setAberta(true); window.setTimeout(() => setAdicionado(false), 1400); }}
            className="grid h-11 w-11 place-items-center rounded-full border border-couro/40 text-couro transition-colors hover:bg-couro hover:text-creme"
          >
            <IconBag width={18} height={18} />
          </button>
        </div>
        <p className="sr-only" aria-live="polite">{adicionado ? "Adicionado à sacola" : ""}</p>
      </div>
    </motion.article>
  );
}
