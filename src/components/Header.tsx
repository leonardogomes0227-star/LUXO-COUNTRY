import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SITE } from "../config";
import { useCart } from "../store/cart";
import { waLink } from "../lib/whatsapp";
import { IconBag, IconClose, IconMenu, IconWhatsapp } from "./Icons";
import { Logo } from "./Logo";

const LINKS = [
  { href: "#colecoes", t: "Coleções" },
  { href: "#infantil", t: "Infantil" },
  { href: "#como-comprar", t: "Como comprar" },
  { href: "#loja", t: "Loja" },
  { href: "#contato", t: "Contato" },
];

export function Header() {
  const { total, setAberta } = useCart();
  const [menu, setMenu] = useState(false);
  const [rolou, setRolou] = useState(false);

  useEffect(() => {
    const on = () => setRolou(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!menu) return;
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", esc); };
  }, [menu]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${rolou || menu ? "bg-carvao/80 backdrop-blur-xl" : "bg-transparent"} border-b ${rolou ? "border-ouro/15" : "border-transparent"}`}>
        <div className="container-x flex h-[68px] items-center justify-between gap-4">
          <a href="#topo" aria-label={`${SITE.nome}, início`} className="flex items-center gap-3">
            <Logo size={44} />
            <span className="hidden font-display text-lg font-bold tracking-wide sm:block">{SITE.nome}</span>
          </a>

          <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-creme/80 transition-colors hover:text-ouro">{l.t}</a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={() => setAberta(true)} className="relative grid h-11 w-11 place-items-center rounded-full border border-creme/25 text-creme transition-colors hover:border-ouro hover:text-ouro" aria-label={`Abrir sacola, ${total} ${total === 1 ? "item" : "itens"}`}>
              <IconBag />
              {total > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-ouro px-1 text-[11px] font-bold text-carvao">{total}</span>}
            </button>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-gold hidden !min-h-11 !px-5 sm:inline-flex">
              <IconWhatsapp width={18} height={18} /> Pedir no WhatsApp
            </a>
            <button onClick={() => setMenu(true)} className="grid h-11 w-11 place-items-center rounded-full border border-creme/25 lg:hidden" aria-label="Abrir menu" aria-expanded={menu}>
              <IconMenu />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: "circle(0% at 90% 4%)" }}
            animate={{ clipPath: "circle(150% at 90% 4%)" }}
            exit={{ clipPath: "circle(0% at 90% 4%)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[70] flex flex-col bg-carvao px-6 pb-8 pt-4"
          >
            <div className="flex h-[60px] items-center justify-between">
              <Logo size={44} />
              <button onClick={() => setMenu(false)} className="grid h-11 w-11 place-items-center rounded-full border border-creme/25" aria-label="Fechar menu"><IconClose /></button>
            </div>
            <nav aria-label="Menu móvel" className="mt-8 flex flex-1 flex-col justify-center gap-2">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenu(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.06 }}
                  className="border-b border-creme/10 py-3 font-display text-4xl font-bold hover:text-ouro"
                >
                  {l.t}
                </motion.a>
              ))}
            </nav>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-gold w-full"><IconWhatsapp width={18} height={18} /> Pedir no WhatsApp</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
