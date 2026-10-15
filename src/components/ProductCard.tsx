import { motion } from "framer-motion";
import { useState } from "react";
import { categoriaNome, formatPreco, publicoNome, type Product } from "../data/products";
import { mensagemPeca, waLink } from "../lib/whatsapp";
import { useCart } from "../store/cart";
import { IconBag, IconWhatsapp } from "./Icons";
import { Img } from "./Img";

export function ProductCard({ p }: { p: Product }) {
  const { add, setAberta } = useCart();
  const [tam, setTam] = useState(p.tamanhos[0]);
  const [detalhe, setDetalhe] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      onPointerEnter={(e) => e.pointerType === "mouse" && setDetalhe(true)}
      onPointerLeave={() => setDetalhe(false)}
      className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] bg-white shadow-[0_1px_0_rgba(90,58,38,.12)] ring-1 ring-couro/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(90,58,38,.55)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-creme" onClick={() => setDetalhe((d) => !d)}>
        <Img src={detalhe && p.fotos?.[1] ? p.fotos[1] : p.fotos?.[0]} alt={`${p.nome}, ${detalhe ? "detalhe" : "vista frontal"}`} forma={p.categoria} detalhe={detalhe} sizes="(min-width:1280px) 22vw, (min-width:640px) 40vw, 80vw" className="transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute left-1.5 top-1.5 rounded-md bg-carvao/85 px-1.5 py-0.5 text-[9px] sm:left-2 sm:top-2 sm:px-2 sm:py-1 sm:text-[10px] font-bold uppercase tracking-wider text-creme">{publicoNome(p.publico)}</span>
        {p.exemplo && <span className="absolute bottom-2 left-2 rounded-full bg-white/85 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-couro backdrop-blur">Exemplo</span>}
        <div onClick={(e) => e.stopPropagation()} className="absolute right-2 top-2 hidden gap-1 rounded-full sm:flex bg-carvao/75 p-1 backdrop-blur" role="group" aria-label="Foto">
          {[false, true].map((d) => (
            <button key={String(d)} aria-pressed={detalhe === d} onClick={() => setDetalhe(d)} className={`min-h-7 rounded-full px-2.5 text-[10px] font-semibold ${detalhe === d ? "bg-ouro text-carvao" : "text-creme"}`}>{d ? "Detalhe" : "Frente"}</button>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3 sm:gap-2.5 sm:p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-terra sm:text-[11px]">{categoriaNome(p.categoria)}</p>
        <h3 className="line-clamp-2 min-h-[2.6em] font-display text-[15px] font-semibold leading-tight sm:text-lg text-carvao">{p.nome}</h3>
        <div>
          <p className="text-base font-bold text-couro sm:text-lg">{formatPreco(p.preco)}</p>
          <p className="text-[11px] text-carvao/60 sm:text-xs">Parcelamos no cartão</p>
        </div>
        <div role="group" aria-label={`Tamanho de ${p.nome}`} className="flex flex-wrap gap-1.5">
          {p.tamanhos.map((t) => (
            <button key={t} aria-pressed={tam === t} onClick={() => setTam(t)} className="chip !min-h-8 !min-w-8 !px-2 !text-[11px] sm:!min-w-9 sm:!px-2.5 sm:!text-xs">{t}</button>
          ))}
        </div>
        <div className="mt-auto grid grid-cols-[1fr_auto] gap-1.5 pt-1.5 sm:gap-2 sm:pt-2">
          <a href={waLink(mensagemPeca(p, tam))} target="_blank" rel="noopener noreferrer" className="btn !min-h-10 !px-2 !text-[12px] sm:!min-h-11 sm:!px-3 sm:!text-[13px] bg-carvao text-creme hover:bg-terra">
            <IconWhatsapp width={16} height={16} className="text-[#3ddc84]" /> Pedir
          </a>
          <button aria-label={`Adicionar ${p.nome}, tamanho ${tam}, à sacola`} onClick={() => { add(p, tam); setAberta(true); }} className="grid h-10 w-10 place-items-center rounded-full border border-couro/40 sm:h-11 sm:w-11 text-couro transition-colors hover:bg-couro hover:text-creme"><IconBag width={18} height={18} /></button>
        </div>
      </div>
    </motion.article>
  );
}
