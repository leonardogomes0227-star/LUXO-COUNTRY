import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { mensagemPedido, waLink } from "../lib/whatsapp";
import { useCart } from "../store/cart";
import { IconClose, IconMinus, IconPlus, IconWhatsapp } from "./Icons";

export function CartDrawer() {
  const { itens, aberta, setAberta, qty, remove, clear, cidade, setCidade } = useCart();

  useEffect(() => {
    if (!aberta) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAberta(false);
    window.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [aberta, setAberta]);

  return (
    <AnimatePresence>
      {aberta && (
        <div className="fixed inset-0 z-[80]">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setAberta(false)} className="absolute inset-0 bg-carvao/70 backdrop-blur-sm" />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Sacola"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 300 }}
            className="section-cream absolute inset-y-0 right-0 flex w-full max-w-md flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-couro/20 p-5">
              <h2 className="text-2xl font-bold">Sua sacola</h2>
              <button autoFocus onClick={() => setAberta(false)} aria-label="Fechar sacola" className="grid h-11 w-11 place-items-center rounded-full border border-couro/30"><IconClose /></button>
            </div>

            {itens.length === 0 ? (
              <p className="m-auto max-w-xs p-8 text-center text-carvao/70">Sua sacola está vazia. Escolha uma peça e o tamanho para começar.</p>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-couro/15 overflow-y-auto px-5">
                  {itens.map((i) => (
                    <li key={i.key} className="flex items-center justify-between gap-3 py-4">
                      <div className="min-w-0">
                        <p className="font-semibold leading-tight">{i.nome}</p>
                        <p className="text-sm text-carvao/65">Tamanho {i.tamanho}</p>
                        <button onClick={() => remove(i.key)} className="mt-1 text-xs font-semibold text-couro underline underline-offset-2">Remover</button>
                      </div>
                      <div className="flex items-center gap-2" role="group" aria-label={`Quantidade de ${i.nome}`}>
                        <button onClick={() => qty(i.key, -1)} aria-label="Diminuir" className="grid h-9 w-9 place-items-center rounded-full border border-couro/30"><IconMinus width={16} height={16} /></button>
                        <span className="w-5 text-center font-semibold" aria-live="polite">{i.qtd}</span>
                        <button onClick={() => qty(i.key, 1)} aria-label="Aumentar" className="grid h-9 w-9 place-items-center rounded-full border border-couro/30"><IconPlus width={16} height={16} /></button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="space-y-4 border-t border-couro/20 p-5">
                  <label className="block text-sm font-semibold">
                    Cidade para envio
                    <input value={cidade} onChange={(e) => setCidade(e.target.value)} placeholder="Ex.: Campo Grande, MS" autoComplete="address-level2" className="mt-1 min-h-12 w-full rounded-xl border border-couro/30 bg-white/70 px-4 text-base font-normal focus:border-couro focus:outline-none" />
                  </label>
                  <a href={waLink(mensagemPedido(itens, cidade))} target="_blank" rel="noopener noreferrer" className="btn-gold w-full"><IconWhatsapp width={18} height={18} /> Enviar pedido pelo WhatsApp</a>
                  <button onClick={clear} className="w-full text-center text-sm text-carvao/60 underline underline-offset-2">Esvaziar sacola</button>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
