import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SITE } from "../config";
import { CATEGORIAS, PUBLICOS, type Publico } from "../data/products";
import { waLink } from "../lib/whatsapp";
import { useFiltros } from "../store/filters";
import { useCart } from "../store/cart";
import { IconBag, IconClose, IconMenu, IconSearch, IconWhatsapp } from "./Icons";
import { Logo } from "./Logo";

const DESTAQUES = [
  { id: "botas", t: "Botas" },
  { id: "chapeus", t: "Chapéus" },
  { id: "cintos", t: "Cintos" },
  { id: "jeans", t: "Jeans" },
] as const;

function Busca({ className = "" }: { className?: string }) {
  const { ir } = useFiltros();
  const [q, setQ] = useState("");
  return (
    <form role="search" onSubmit={(e) => { e.preventDefault(); ir({ busca: q }); }} className={`relative ${className}`}>
      <label className="sr-only" htmlFor="busca-topo">Buscar produtos</label>
      <input id="busca-topo" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="O que você procura? Ex.: bota, chapéu, camisa" className="h-12 w-full rounded-full border border-creme/20 bg-creme pl-5 pr-14 text-[15px] text-carvao placeholder:text-carvao/50 focus:outline-none focus:ring-2 focus:ring-ouro" />
      <button type="submit" aria-label="Buscar" className="absolute right-1.5 top-1.5 grid h-9 w-9 place-items-center rounded-full bg-couro text-creme transition-colors hover:bg-caramelo"><IconSearch width={18} height={18} /></button>
    </form>
  );
}

export function Header() {
  const { total, setAberta } = useCart();
  const { ir } = useFiltros();
  const [menu, setMenu] = useState(false);
  const [aberto, setAbertoAcc] = useState<Publico | null>(null);

  useEffect(() => {
    if (!menu) return;
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", esc); };
  }, [menu]);

  const go = (p: Parameters<typeof ir>[0]) => { setMenu(false); ir(p); };

  return (
    <>
      <header className="sticky top-0 z-50 bg-carvao shadow-[0_8px_24px_-12px_rgba(0,0,0,.8)]">
        <div className="container-x flex h-16 items-center gap-3 lg:h-20 lg:gap-8">
          <button onClick={() => setMenu(true)} className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-creme/25 lg:hidden" aria-label="Abrir menu" aria-expanded={menu}><IconMenu /></button>
          <a href="#topo" aria-label={`${SITE.nome}, início`} className="flex shrink-0 items-center gap-3">
            <Logo size={48} />
            <span className="hidden font-display text-xl font-bold leading-none xl:block">Luxo<br /><span className="text-xs tracking-[0.3em] text-ouro">COUNTRY</span></span>
          </a>
          <Busca className="hidden max-w-2xl flex-1 lg:block" />
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="hidden items-center gap-2 pr-2 text-left text-xs leading-tight text-creme/80 hover:text-ouro xl:flex">
              <IconWhatsapp width={26} height={26} className="text-[#25D366]" />
              <span>Atendimento<br /><strong className="text-sm text-creme">Pelo WhatsApp</strong></span>
            </a>
            <button onClick={() => setAberta(true)} className="relative flex h-11 items-center gap-2 rounded-full border border-creme/25 px-3.5 text-sm font-semibold transition-colors hover:border-ouro hover:text-ouro" aria-label={`Abrir sacola, ${total} ${total === 1 ? "item" : "itens"}`}>
              <IconBag width={20} height={20} /><span className="hidden sm:inline">Sacola</span>
              {total > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-ouro px-1 text-[11px] font-bold text-carvao">{total}</span>}
            </button>
          </div>
        </div>
        <div className="container-x pb-3 lg:hidden"><Busca /></div>

        <nav aria-label="Categorias" className="hidden border-t border-creme/10 lg:block">
          <ul className="container-x flex items-center gap-1 text-sm font-semibold">
            {PUBLICOS.map((p) => (
              <li key={p.id} className="group relative">
                <button onClick={() => ir({ publico: p.id })} className="flex h-12 items-center px-4 uppercase tracking-wider hover:text-ouro group-focus-within:text-ouro">{p.nome}</button>
                <div className="invisible absolute left-0 top-full z-10 w-64 translate-y-1 rounded-b-2xl border border-t-0 border-couro/20 bg-creme p-3 text-carvao opacity-0 shadow-2xl transition-all group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <button onClick={() => ir({ publico: p.id })} className="block w-full rounded-lg px-3 py-2 text-left font-bold text-couro hover:bg-couro/10">Ver tudo: {p.nome.toLowerCase()}</button>
                  {CATEGORIAS.map((c) => (
                    <button key={c.id} onClick={() => ir({ publico: p.id, categoria: c.id })} className="block w-full rounded-lg px-3 py-2 text-left font-medium hover:bg-couro/10">{c.nome}</button>
                  ))}
                </div>
              </li>
            ))}
            <li aria-hidden className="mx-2 h-5 w-px bg-creme/20" />
            {DESTAQUES.map((d) => (
              <li key={d.id}><button onClick={() => ir({ categoria: d.id })} className="h-12 px-3 font-medium text-creme/85 hover:text-ouro">{d.t}</button></li>
            ))}
            <li className="ml-auto"><a href="#estilo" className="inline-flex h-12 items-center px-3 font-medium text-ouro hover:text-creme">Monte seu estilo</a></li>
            <li><a href="#loja" className="inline-flex h-12 items-center px-3 font-medium text-creme/85 hover:text-ouro">Nossa loja</a></li>
            <li><a href="#contato" className="inline-flex h-12 items-center px-3 font-medium text-creme/85 hover:text-ouro">Contato</a></li>
          </ul>
        </nav>
      </header>

      <AnimatePresence>
        {menu && (
          <div className="fixed inset-0 z-[70]">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMenu(false)} className="absolute inset-0 bg-carvao/70" />
            <motion.div role="dialog" aria-modal="true" aria-label="Menu" initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", damping: 34, stiffness: 320 }} className="absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col bg-carvao">
              <div className="flex h-16 items-center justify-between border-b border-creme/10 px-5">
                <Logo size={44} />
                <button onClick={() => setMenu(false)} className="grid h-11 w-11 place-items-center rounded-full border border-creme/25" aria-label="Fechar menu"><IconClose /></button>
              </div>
              <nav aria-label="Menu móvel" className="flex-1 overflow-y-auto px-5 py-3">
                {PUBLICOS.map((p) => (
                  <div key={p.id} className="border-b border-creme/10">
                    <button aria-expanded={aberto === p.id} onClick={() => setAbertoAcc(aberto === p.id ? null : p.id)} className="flex min-h-14 w-full items-center justify-between font-display text-2xl font-bold">
                      {p.nome}<span aria-hidden className={`text-ouro transition-transform ${aberto === p.id ? "rotate-45" : ""}`}>+</span>
                    </button>
                    {aberto === p.id && (
                      <div className="grid gap-1 pb-3">
                        <button onClick={() => go({ publico: p.id })} className="min-h-11 text-left font-semibold text-ouro">Ver tudo</button>
                        {CATEGORIAS.map((c) => <button key={c.id} onClick={() => go({ publico: p.id, categoria: c.id })} className="min-h-11 text-left text-creme/80">{c.nome}</button>)}
                      </div>
                    )}
                  </div>
                ))}
                {[["#estilo", "Monte seu estilo"], ["#como-comprar", "Como comprar"], ["#loja", "Nossa loja"], ["#contato", "Contato"]].map(([h, t]) => (
                  <a key={h} href={h} onClick={() => setMenu(false)} className="flex min-h-14 items-center border-b border-creme/10 text-lg font-medium text-creme/90">{t}</a>
                ))}
              </nav>
              <div className="p-5"><a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-gold w-full"><IconWhatsapp width={18} height={18} /> Pedir no WhatsApp</a></div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
